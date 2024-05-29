import React, { useEffect, useState } from "react";

import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as PengajuanBerahasilIcon } from "../../assets/icon/ic_pengajuan_berhasil.svg";
import DynamicButton from "../../components/common/DynamicButton";
import useTheme from "../../components/context/useTheme";
import TitleHeader from "../../components/layout/TitleHeader";
import { isPending } from "../../components/store/actions/todoActions";
import ModalContent from "../../components/ui/Modal/ModalContent";
import SubmissionStatus from "../../components/ui/SubmissionStatus";
import { apiClient } from "../../utils/api/apiClient";
import fetchUploadFiles from "../../utils/api/uploadFiles";
import DynamicDetails from "./DynamicDetails";
import DalamAntrianView from "./Logical/DalamAntrianView";
import FinishStatus from "./Logical/FinishStatus";
import ProcessStatus from "./Logical/ProcessStatus";
import ValidationStatus from "./Logical/ValidationStatus";
import ValidationStatusTechnique from "./Logical/ValidationStatusTechnique";
import fetchUploadImages from "../../utils/api/uploadImages";

function DetailInfrastrukturPages() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');
  const authProfile = Cookies.get('authData');
  const location = useLocation();
  const slug = location?.state?.slug || "";

  const [infrastrukturLoading, setInfrastrukturLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState(0);
  const [validationData, setValidationData] = useState({});
  const [validationDataTechnique, setValidationDataTechnique] = useState({});
  const [processData, setProcessData] = useState({});
  const [finishData, setfinishData] = useState({});

  const [detailData, setDetailData] = useState([]);

  const [isModalVerif, setisModalVerif] = useState({
    status: false,
    data: {},
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken) {
      fetchDataInfrastruktur(authApiKey, authToken, JSON.parse(authProfile)?.role)
    }
  }, [dispatch]);

  const fetchDataInfrastruktur = async (api_key, token, role) => {
    setInfrastrukturLoading(true);
    const params = new URLSearchParams();
    params.append("id", slug);
    params.append("role", role);
    try {
      const response = await apiClient({
        baseurl: "infrastruktur/detail",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      setInfrastrukturLoading(false);
      if (response?.statusCode === 200) {
        setDetailData(response.result.data.fields);
        setSubmissionStatus(response.result.data?.submission_status);
        setValidationData(JSON.parse(response.result.data?.on_validation));
        setValidationDataTechnique(JSON.parse(response.result.data?.on_validation_technique));
        setProcessData(JSON.parse(response.result.data?.on_process));
        setfinishData(JSON.parse(response.result.data?.on_finish));
      } else {
        setDetailData([]);
        navigate("/");
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEditinfrastruktur = async (api_key, token, id, type, data) => {
    dispatch(isPending(true));
    let htmlConvert = '';

    if (['validation', 'validation_technique', 'process'].includes(type) && data?.response) {
      const contentState = convertToRaw(data.response.getCurrentContent());
      htmlConvert = draftToHtml(contentState);
    }
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("type", type);

    if (type === 'validation') {
      params.append("data", JSON.stringify({
        ...data,
        status_validation: parseInt(data.status_validation) === 0 ? 'Ditolak' : 'Disetujui',
        response: htmlConvert
      }));
    } else if (['validation_technique', 'process'].includes(type)) {
      const filteredData = {
        ...data,
        response: htmlConvert
      };
      const cleanedData = Object.fromEntries(
        Object.entries(filteredData).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );
      params.append("data", JSON.stringify(cleanedData));
    } else if (type === 'finish') {
      params.append("data", JSON.stringify({
        ...data,
        submission_status: parseInt(data.submission_status) === 0 ? 'Tidak Menyetujui' : 'Menyetujui',
      }));
    }

    // if (filename) params.append("fileuploaded", filename);

    try {
      const response = await apiClient({
        baseurl: "infrastruktur/edit",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: 'infrastruktur Berhasil diupdate',
            msg: 'Selamat, Pengajuan infrastruktur sudah diupdate',
            icon: PengajuanBerahasilIcon,
            color: '#13C39C'
          },
          status: true
        })
      } else {
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const checkingFormData = async (type, data) => {
    if (type === "validation") {
      fetchEditinfrastruktur(authApiKey, authToken, slug, type, data)
    } else if (type === "validation_technique") {
      fetchEditinfrastruktur(authApiKey, authToken, slug, type, data)
    } else if (type === "process") {
      if (data.upload_foto_alat_sebelum_di_relokasi || data.upload_foto_alat_sesudah_di_relokasi) {
        try {
          const uploadPromises = [];
          if (data.upload_foto_alat_sebelum_di_relokasi) {
            uploadPromises.push(fetchUploadImages(authApiKey, authToken, data.upload_foto_alat_sebelum_di_relokasi, 'infrastruktur', dispatch));
          }
          if (data.upload_foto_alat_sesudah_di_relokasi) {
            uploadPromises.push(fetchUploadImages(authApiKey, authToken, data.upload_foto_alat_sesudah_di_relokasi, 'infrastruktur', dispatch));
          }

          const [resultBefore, resultAfter] = await Promise.all(uploadPromises);

          let combineData = { ...data };
          if (resultBefore) {
            combineData.upload_foto_alat_sebelum_di_relokasi = resultBefore;
          }
          if (resultAfter) {
            combineData.upload_foto_alat_sesudah_di_relokasi = resultAfter;
          }

          fetchEditinfrastruktur(authApiKey, authToken, slug, type, combineData);
        } catch (error) {
          console.error("Error occurred during image upload:", error);
        }
      } else {
        fetchEditinfrastruktur(authApiKey, authToken, slug, type, data);
      }
    }
    else if (type === "finish") {
      if (data.file_submission) {
        const result = await fetchUploadFiles(authApiKey, authToken, data.file_submission, 'infrastruktur', dispatch);
        if (result !== null) {
          let combineData = {};
          combineData = { ...data, file_upload: result }
          fetchEditinfrastruktur(authApiKey, authToken, slug, type, combineData)
        } else {
          console.error("Error occurred during image upload.");
        }
      } else {
        fetchEditinfrastruktur(authApiKey, authToken, slug, type, data)
      }

    }
  }
  return (
    <div className="flex flex-col gap-3 flex-1 p-3">
      <TitleHeader
        title={`Detail Pengajuan #${slug}`}
        link1={"dashboard"}
        link2={"infrastruktur"}
      />
      <section className="flex flex-col gap-3">
        <SubmissionStatus status={submissionStatus} />
        <div className={`flex  flex-col gap-3`}>
          <DalamAntrianView
            submissionStatus={submissionStatus}
            detailData={detailData}
            infrastrukturLoading={infrastrukturLoading} />
          <ValidationStatus
            submissionStatus={submissionStatus}
            validationData={validationData}
            authProfile={authProfile}
            detailData={detailData}
            infrastrukturLoading={infrastrukturLoading}
            setValidationData={setValidationData}
            checkingFormData={checkingFormData}
          />
          <ValidationStatusTechnique
            slug={slug}
            submissionStatus={submissionStatus}
            validationData={validationDataTechnique}
            setValidationData={setValidationDataTechnique}
            authProfile={authProfile}
            detailData={detailData}
            infrastrukturLoading={infrastrukturLoading}
            checkingFormData={checkingFormData}
            setisModalVerif={setisModalVerif}
          />
          <ProcessStatus
            slug={slug}
            validationData={validationDataTechnique}
            submissionStatus={submissionStatus}
            processData={processData}
            authProfile={authProfile}
            detailData={detailData}
            infrastrukturLoading={infrastrukturLoading}
            checkingFormData={checkingFormData}
            setisModalVerif={setisModalVerif}
            finishData={finishData}
            setfinishData={setfinishData}
          />

          <FinishStatus
            detailData={detailData}
            infrastrukturLoading={infrastrukturLoading} 
            validationData={validationDataTechnique}
            processData={processData}
            submissionStatus={submissionStatus}
            finishData={finishData}
          />

        </div>
      </section>

      <ModalContent
        className={"sm:max-w-xl"}
        children={
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center ">
              {isModalVerif.data?.icon &&
                <isModalVerif.data.icon
                  className={`flex flex-col flex-1 max-w-[150%] aspect-square bg-[${isModalVerif.data.color}] rounded-full`}
                />}
            </div>
            <div className="flex  flex-col items-center justify-center ">
              <span className="text-lg font-bold">{isModalVerif.data?.title}</span>
              <span className="text-sm font-light opacity-70">{isModalVerif.data?.msg}</span>
            </div>
            <div className="flex flex-col gap-2 ">
              <DynamicButton
                initialValue={"Kembali"}
                type="fill"
                color={"#ffffff"}
                className={`inline-flex flex-1 bg-[${isModalVerif.data.color}] text-darkColor`}
                onClick={() => {
                  setisModalVerif({ data: {}, status: false })
                  fetchDataInfrastruktur(authApiKey, authToken, JSON.parse(authProfile)?.role)
                }}
              />
            </div>
          </div>
        }
        active={isModalVerif.status}
      />
    </div>
  );
}

export default DetailInfrastrukturPages;
