import React, { useEffect, useState } from "react";

import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as PengajuanBerahasilIcon } from "../../assets/icon/ic_pengajuan_berhasil.svg";
import DynamicButton from "../../components/common/DynamicButton";
import Breadcrumb from "../../components/layout/Breadcrumb";
import { isPending } from "../../components/store/actions/todoActions";
import ModalContent from "../../components/ui/Modal/ModalContent";
import SubmissionStatus from "../../components/ui/SubmissionStatus";
import { apiClient } from "../../utils/api/apiClient";
import fetchUploadFiles from "../../utils/api/uploadFiles";
import DalamAntrianView from "./Logical/1.DalamAntrianView";
import ValidationStatus from "./Logical/2.ValidationStatus";
import ValidationStatusTechnique from "./Logical/3.ValidationStatusTechnique";
import ProcessStatus from "./Logical/4.ProcessStatus";
import FinishStatus from "./Logical/5.FinishStatus";
import ModalContentComponent from "../../components/ui/ModalContentComponent";

function DetailSistemVirtualPages() {
  const navigate = useNavigate();
  const authApiKey = Cookies.get("authApiKey");
  const authToken = Cookies.get("authToken");
  const authProfile = Cookies.get("authData");
  const location = useLocation();
  const slug = location?.state?.slug || "";

  const [SistemVirtualLoading, setSistemVirtualLoading] = useState(true);
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
      fetchDataSistemVirtual(
        authApiKey,
        authToken,
        JSON.parse(authProfile)?.role
      );
    }
  }, [authApiKey, authToken, authProfile]);

  const fetchDataSistemVirtual = async (api_key, token, role) => {
    setSistemVirtualLoading(true);
    const params = new URLSearchParams();
    params.append("id", slug);
    params.append("role", role);
    try {
      const response = await apiClient({
        baseurl: "sistem-virtual/detail",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      setSistemVirtualLoading(false);
      if (response?.statusCode === 200) {
        setDetailData(response.result.data.fields);
        setSubmissionStatus(response.result.data?.submission_status);
        setValidationData(JSON.parse(response.result.data?.on_validation));
        setValidationDataTechnique(
          JSON.parse(response.result.data?.on_validation_technique)
        );
        setProcessData(JSON.parse(response.result.data?.on_process));
        setfinishData(JSON.parse(response.result.data?.on_finish));
      } else {
        setDetailData([]);
        navigate("/dashboard");
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEditSistemVirtual = async (api_key, token, id, type, data) => {
    dispatch(isPending(true));
    let htmlConvert = "";

    if (
      ["validation_technique", "process"].includes(type) &&
      data?.response
    ) {
      const contentState = convertToRaw(data.response.getCurrentContent());
      htmlConvert = draftToHtml(contentState);
    }
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("type", type);

    if (type === "validation") {
      params.append(
        "data",
        JSON.stringify({
          ...data,
          status_validation:
            parseInt(data.status_validation) === 0 ? "Ditolak" : "Disetujui",
          response: htmlConvert,
        })
      );
    } else if (["validation_technique", "process"].includes(type)) {
      const filteredData = {
        ...data,
        response: htmlConvert,
      };
      const cleanedData = Object.fromEntries(
        Object.entries(filteredData).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      );
      params.append("data", JSON.stringify(cleanedData));
    } else if (type === "finish") {
      params.append(
        "data",
        JSON.stringify({
          ...data,
          submission_status:
            parseInt(data.submission_status) === 0
              ? "Tidak Menyetujui"
              : "Menyetujui",
        })
      );
    }

    // if (filename) params.append("fileuploaded", filename);

    try {
      const response = await apiClient({
        baseurl: "sistem-virtual/edit",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: "Pembaharuan Layanan Siaran dan Virtual Berhasil",
            msg: "Selamat! Pengajuan Layanan Siaran dan Virtual Anda Telah Berhasil Diperbarui.",
            icon: PengajuanBerahasilIcon,
            color: "#13C39C",
          },
          status: true,
        });
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
      fetchEditSistemVirtual(authApiKey, authToken, slug, type, data);
    } else if (type === "validation_technique") {
      if (
        data.upload_dokumen_zoom ||
        data.upload_dokumen_liputan ||
        data.file_pengajuan_podcast
      ) {
        try {
          const uploadPromises = [];
          const resultMapping = {};
          if (data.upload_dokumen_zoom) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_dokumen_zoom,
                "sistem-virtual",
                dispatch
              ).then(result => {
                resultMapping.upload_dokumen_zoom = result;
              })
            );
          }

          if (data.upload_dokumen_liputan) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_dokumen_liputan,
                "sistem-virtual",
                dispatch
              ).then(result => {
                resultMapping.upload_dokumen_liputan = result;
              })
            );
          }

          if (data.file_pengajuan_podcast) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.file_pengajuan_podcast,
                "sistem-virtual",
                dispatch
              ).then(result => {
                resultMapping.file_pengajuan_podcast = result;
              })
            );
          }
          await Promise.all(uploadPromises);

          let combineData = { ...data };
          if (resultMapping.upload_dokumen_zoom) {
            combineData.upload_dokumen_zoom = resultMapping.upload_dokumen_zoom;
          }
          if (resultMapping.upload_dokumen_liputan) {
            combineData.upload_dokumen_liputan = resultMapping.upload_dokumen_liputan;
          }
          if (resultMapping.file_pengajuan_podcast) {
            combineData.file_pengajuan_podcast = resultMapping.file_pengajuan_podcast;
          }
          fetchEditSistemVirtual(authApiKey, authToken, slug, type, combineData);
        } catch (error) {
          console.error("Error occurred during image upload:", error);
        }
      } else {
        fetchEditSistemVirtual(authApiKey, authToken, slug, type, data);
      }
    } else if (type === "process") {
      if (
        data.upload_dokumen_zoom ||
        data.upload_dokumen_liputan ||
        data.file_pengajuan_podcast
      ) {
        try {
          const uploadPromises = [];
          const resultMapping = {};

          if (data.upload_dokumen_zoom) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_dokumen_zoom,
                "sistem-virtual",
                dispatch
              ).then(result => {
                resultMapping.upload_dokumen_zoom = result;
              })
            );
          }
          if (data.upload_dokumen_liputan) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_dokumen_liputan,
                "sistem-virtual",
                dispatch
              ).then(result => {
                resultMapping.upload_dokumen_liputan = result;
              })
            );
          }
          if (data.file_pengajuan_podcast) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.file_pengajuan_podcast,
                "sistem-virtual",
                dispatch
              ).then(result => {
                resultMapping.file_pengajuan_podcast = result;
              })
            );
          }

          await Promise.all(uploadPromises);

          let combineData = { ...data };
          if (resultMapping.upload_dokumen_zoom) {
            combineData.upload_dokumen_zoom = resultMapping.upload_dokumen_zoom;
          }
          if (resultMapping.upload_dokumen_liputan) {
            combineData.upload_dokumen_liputan = resultMapping.upload_dokumen_liputan;
          }
          if (resultMapping.file_pengajuan_podcast) {
            combineData.file_pengajuan_podcast = resultMapping.file_pengajuan_podcast;
          }

          fetchEditSistemVirtual(authApiKey, authToken, slug, type, combineData);
        } catch (error) {
          console.error("Error occurred during image upload:", error);
        }
      } else {
        fetchEditSistemVirtual(authApiKey, authToken, slug, type, data);
      }

    } else if (type === "finish") {
      if (data.file_submission) {
        const result = await fetchUploadFiles(
          authApiKey,
          authToken,
          data.file_submission,
          "sistem-virtual",
          dispatch
        );
        if (result !== null) {
          let combineData = {};
          combineData = { ...data, file_submission: result };
          fetchEditSistemVirtual(
            authApiKey,
            authToken,
            slug,
            type,
            combineData
          );
        } else {
          console.error("Error occurred during image upload.");
        }
      } else {
        fetchEditSistemVirtual(authApiKey, authToken, slug, type, data);
      }
    }
  };
  return (
    <div className="flex flex-col gap-3 flex-1 p-3">
      <Breadcrumb
        title={`Detail Pengajuan ${detailData.submission_title} #${slug}`}
        link1={"dashboard"}
        link2={"Layanan Siaran dan Sistem Virtual"}
      />
      <section className="flex flex-col gap-3">
        <SubmissionStatus status={submissionStatus} data={null} />
        <div className={`flex  flex-col gap-3`}>
          <DalamAntrianView
            submissionStatus={submissionStatus}
            detailData={detailData}
            loading={SistemVirtualLoading}
          />
          <ValidationStatus
            submissionStatus={submissionStatus}
            validationData={validationData}
            authProfile={authProfile}
            detailData={detailData}
            loading={SistemVirtualLoading}
            setValidationData={setValidationData}
            checkingFormData={checkingFormData}
          />
          <ValidationStatusTechnique
            slug={slug}
            submissionStatus={submissionStatus}
            validationData={validationData}
            validationDataTechnique={validationDataTechnique}
            setvalidationDataTechnique={setValidationDataTechnique}
            authProfile={authProfile}
            detailData={detailData}
            loading={SistemVirtualLoading}
            checkingFormData={checkingFormData}
            setisModalVerif={setisModalVerif}
          />
          <ProcessStatus
            slug={slug}
            validationDataTechnique={validationDataTechnique}
            processData={processData}
            submissionStatus={submissionStatus}
            authProfile={authProfile}
            detailData={detailData}
            loading={SistemVirtualLoading}
            checkingFormData={checkingFormData}
            setisModalVerif={setisModalVerif}
            finishData={finishData}
            setfinishData={setfinishData}
          />
          <FinishStatus
            detailData={detailData}
            loading={SistemVirtualLoading}
            validationData={validationData}
            validationDataTechnique={validationDataTechnique}
            processData={processData}
            submissionStatus={submissionStatus}
            finishData={finishData}
          />
        </div>
      </section>

      <ModalContentComponent
        isModalVerif={isModalVerif}
        setisModalVerif={setisModalVerif}
        setisModalCreate={() => { }}
        fetchData={fetchDataSistemVirtual}
        authApiKey={authApiKey}
        authToken={authToken}
        authProfile={authProfile}
      />
    </div>
  );
}

export default DetailSistemVirtualPages;
