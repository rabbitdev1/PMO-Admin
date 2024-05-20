import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import DynamicInput from "../../components/common/DynamicInput";
import useTheme from "../../components/context/useTheme";
import TitleHeader from "../../components/layout/TitleHeader";
import { apiClient } from "../../utils/api/apiClient";
import ImageComponent from "../../utils/helpers/getImageURL";
import DynamicShow from "../../components/common/DynamicShow";
import SubmissionStatus from "./SubmissionStatus";
import DynamicDetails from "./DynamicDetails";
import DynamicButton from "../../components/common/DynamicButton";
import { ReactComponent as PengajuanBerahasilIcon } from "../../assets/icon/ic_pengajuan_berhasil.svg";
import ModalContent from "../../components/ui/Modal/ModalContent";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import fetchUploadImages from "../../utils/api/uploadImages";
import fetchUploadFiles from "../../utils/api/uploadFiles";
import { isPending } from "../../components/store/actions/todoActions";
import DalamAntrianView from "./Logical/DalamAntrianView";
import ValidationStatus from "./Logical/ValidationStatus";
import ProcessStatus from "./Logical/ProcessStatus";
import FinishStatus from "./Logical/FinishStatus";

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
        setProcessData(JSON.parse(response.result.data?.on_process));
        setfinishData(JSON.parse(response.result.data?.on_finish));
      } else {
        setDetailData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEditinfrastruktur = async (api_key, token, id, type, data) => {
    let htmlConvert = '';
    if (type === 'validation' || type === 'process') {
      if (data?.response) {
        const contentState = convertToRaw(data?.response.getCurrentContent());
        htmlConvert = draftToHtml(contentState);
      }
    }
    const params = new URLSearchParams();
    if (type === 'validation') {
      params.append("id", id);
      params.append("type", type);
      params.append("data", JSON.stringify({ status_validation: parseInt(data.statusValidasi) === 0 ? 'Ditolak' : 'Disetujui', response: htmlConvert }));
    } else if (type === 'process') {
      params.append("id", id);
      params.append("type", type);
      params.append("data", JSON.stringify({ checking_tools: data.checking_tools, working_schedule: data.working_schedule }));
    }
    else if (type === 'finish') {
      params.append("id", id);
      params.append("type", type);
      params.append("data", JSON.stringify({ submission_status: parseInt(data.submission_status) === 0 ? 'Ditolak' : 'Disetujui', file_upload: data.file_upload, response: data.response }));
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
    } else if (type === "process") {
      fetchEditinfrastruktur(authApiKey, authToken, slug, type, data)
    } else if (type === "finish") {
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
        <div className={`flex ${submissionStatus === 2 ? JSON.parse(authProfile)?.role === "perangkat_daerah" || JSON.parse(authProfile)?.role === "op_pmo" ? 'sm:flex-row' : 'sm:flex-col' :
          submissionStatus === 4 ? JSON.parse(authProfile)?.role === "perangkat_daerah" || JSON.parse(authProfile)?.role === "op_pmo" ? 'sm:flex-row' : 'sm:flex-col' :
            'sm:flex-row'} flex-col gap-3`}>
          <DalamAntrianView submissionStatus={submissionStatus} />
          <ValidationStatus
            submissionStatus={submissionStatus}
            validationData={validationData}
            authProfile={authProfile}
            position={'top'}
          />
          <ProcessStatus
            submissionStatus={submissionStatus}
            authProfile={authProfile}
            processData={processData}
            setProcessData={setProcessData}
            finishData={finishData}
            setfinishData={setfinishData}
            checkingFormData={checkingFormData}
          />
          <FinishStatus
            submissionStatus={submissionStatus}
            finishData={finishData}
          />
          <DynamicDetails detailData={detailData} loading={infrastrukturLoading} />

          <ValidationStatus
            submissionStatus={submissionStatus}
            validationData={validationData}
            authProfile={authProfile}
            setValidationData={setValidationData}
            checkingFormData={checkingFormData}
            position={'bottom'}
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
