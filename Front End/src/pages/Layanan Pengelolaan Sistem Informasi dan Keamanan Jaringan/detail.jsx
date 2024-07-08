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
import fetchUploadImages from "../../utils/api/uploadImages";
import DalamAntrianView from "./Logical/1.DalamAntrianView";
import FinishStatus from "./Logical/5.FinishStatus";
import ProcessStatus from "./Logical/4.ProcessStatus";
import ValidationStatus from "./Logical/2.ValidationStatus";
import ValidationStatusTechnique from "./Logical/3.ValidationStatusTechnique";
import ConditionalRender from "../../components/ui/ConditionalRender";
import ModalContentComponent from "../../components/ui/ModalContentComponent";

function DetailAplikasiPages() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const authApiKey = Cookies.get("authApiKey");
  const authToken = Cookies.get("authToken");
  const authProfile = Cookies.get("authData");
  const location = useLocation();
  const slug = location?.state?.slug || "";

  const [aplikasiLoading, setAplikasiLoading] = useState(true);
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
      fetchDataAplikasi(
        authApiKey,
        authToken,
        JSON.parse(authProfile)?.role
      );
    }
  }, [dispatch]);

  const fetchDataAplikasi = async (api_key, token, role) => {
    setAplikasiLoading(true);
    const params = new URLSearchParams();
    params.append("id", slug);
    params.append("role", role);
    try {
      const response = await apiClient({
        baseurl: "aplikasi/detail",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      setAplikasiLoading(false);
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
        navigate("/");
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEditaplikasi = async (api_key, token, id, type, data) => {
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
    try {
      const response = await apiClient({
        baseurl: "aplikasi/edit",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: "Pembaharuan Pengajuan Aplikasi Berhasil",
            msg: "Selamat! Pengajuan Aplikasi Anda telah berhasil diperbarui.",
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
      fetchEditaplikasi(authApiKey, authToken, slug, type, data);
    } else if (type === "validation_technique") {
      if (
        data.file_scema_integration ||
        data.upload_dokumen_laporan_modul_tte ||
        data.upload_dokumen_laporan_pembuatan_akun ||
        data.upload_surat_pengesahan ||
        data.dokumen_pembangunan ||
        data.dokumen_nda ||
        data.upload_hasil_pengujian ||
        data.upload_hasil_penetrasi
      ) {
        try {
          const uploadPromises = [];
          const resultMapping = {};
          if (data.file_scema_integration) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.file_scema_integration,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.file_scema_integration = result;
              })
            );
          }

          if (data.upload_dokumen_laporan_modul_tte) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_dokumen_laporan_modul_tte,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.upload_dokumen_laporan_modul_tte = result;
              })
            );
          }

          if (data.upload_dokumen_laporan_pembuatan_akun) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_dokumen_laporan_pembuatan_akun,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.upload_dokumen_laporan_pembuatan_akun = result;
              })
            );
          }
          if (data.upload_surat_pengesahan) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_surat_pengesahan,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.upload_surat_pengesahan = result;
              })
            );
          }
          if (data.dokumen_pembangunan) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.dokumen_pembangunan,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.dokumen_pembangunan = result;
              })
            );
          }
          if (data.dokumen_nda) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.dokumen_nda,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.dokumen_nda = result;
              })
            );
          }
          if (data.upload_hasil_pengujian) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_hasil_pengujian,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.upload_hasil_pengujian = result;
              })
            );
          }
          if (data.upload_hasil_penetrasi) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_hasil_penetrasi,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.upload_hasil_penetrasi = result;
              })
            );
          }
          await Promise.all(uploadPromises);

          let combineData = { ...data };
          if (resultMapping.file_scema_integration) {
            combineData.file_scema_integration = resultMapping.file_scema_integration;
          }
          if (resultMapping.upload_dokumen_laporan_modul_tte) {
            combineData.upload_dokumen_laporan_modul_tte = resultMapping.upload_dokumen_laporan_modul_tte;
          }
          if (resultMapping.upload_dokumen_laporan_pembuatan_akun) {
            combineData.upload_dokumen_laporan_pembuatan_akun = resultMapping.upload_dokumen_laporan_pembuatan_akun;
          }
          if (resultMapping.upload_surat_pengesahan) {
            combineData.upload_surat_pengesahan = resultMapping.upload_surat_pengesahan;
          }
          if (resultMapping.dokumen_pembangunan) {
            combineData.dokumen_pembangunan = resultMapping.dokumen_pembangunan;
          }
          if (resultMapping.dokumen_nda) {
            combineData.dokumen_nda = resultMapping.dokumen_nda;
          }
          if (resultMapping.upload_hasil_pengujian) {
            combineData.upload_hasil_pengujian = resultMapping.upload_hasil_pengujian;
          }
          if (resultMapping.upload_hasil_penetrasi) {
            combineData.upload_hasil_penetrasi = resultMapping.upload_hasil_penetrasi;
          }
          fetchEditaplikasi(authApiKey, authToken, slug, type, combineData);
        } catch (error) {
          console.error("Error occurred during image upload:", error);
        }
      } else {
        fetchEditaplikasi(authApiKey, authToken, slug, type, data);
      }
    } else if (type === "process") {
      if (
        data.upload_dokumen_hasil_integrasi ||
        data.upload_dokumen_laporan_modul_tte ||
        data.upload_dokumen_laporan_pembuatan_akun ||
        data.upload_surat_pengesahan ||
        data.dokumen_pembangunan ||

        data.dokumen_nda ||
        data.upload_hasil_pengujian ||
        data.upload_hasil_penetrasi
      ) {
        try {
          const uploadPromises = [];
          const resultMapping = {};

          if (data.upload_dokumen_hasil_integrasi) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_dokumen_hasil_integrasi,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.upload_dokumen_hasil_integrasi = result;
              })
            );
          }
          if (data.upload_dokumen_laporan_modul_tte) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_dokumen_laporan_modul_tte,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.upload_dokumen_laporan_modul_tte = result;
              })
            );
          }
          if (data.upload_dokumen_laporan_pembuatan_akun) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_dokumen_laporan_pembuatan_akun,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.upload_dokumen_laporan_pembuatan_akun = result;
              })
            );
          }
          if (data.upload_surat_pengesahan) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_surat_pengesahan,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.upload_surat_pengesahan = result;
              })
            );
          }
          if (data.dokumen_pembangunan) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.dokumen_pembangunan,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.dokumen_pembangunan = result;
              })
            );
          }
          if (data.dokumen_nda) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.dokumen_nda,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.dokumen_nda = result;
              })
            );
          }

          if (data.upload_hasil_pengujian) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_hasil_pengujian,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.upload_hasil_pengujian = result;
              })
            );
          }
          if (data.upload_hasil_penetrasi) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.upload_hasil_penetrasi,
                "aplikasi",
                dispatch
              ).then(result => {
                resultMapping.upload_hasil_penetrasi = result;
              })
            );
          }

          await Promise.all(uploadPromises);

          let combineData = { ...data };
          if (resultMapping.upload_dokumen_hasil_integrasi) {
            combineData.upload_dokumen_hasil_integrasi = resultMapping.upload_dokumen_hasil_integrasi;
          }
          if (resultMapping.upload_dokumen_laporan_modul_tte) {
            combineData.upload_dokumen_laporan_modul_tte = resultMapping.upload_dokumen_laporan_modul_tte;
          }
          if (resultMapping.upload_dokumen_laporan_pembuatan_akun) {
            combineData.upload_dokumen_laporan_pembuatan_akun = resultMapping.upload_dokumen_laporan_pembuatan_akun;
          }
          if (resultMapping.upload_surat_pengesahan) {
            combineData.upload_surat_pengesahan = resultMapping.upload_surat_pengesahan;
          }
          if (resultMapping.dokumen_pembangunan) {
            combineData.dokumen_pembangunan = resultMapping.dokumen_pembangunan;
          }
          if (resultMapping.dokumen_nda) {
            combineData.dokumen_nda = resultMapping.dokumen_nda;
          }

          if (resultMapping.upload_hasil_pengujian) {
            combineData.upload_hasil_pengujian = resultMapping.upload_hasil_pengujian;
          }
          if (resultMapping.upload_hasil_penetrasi) {
            combineData.upload_hasil_penetrasi = resultMapping.upload_hasil_penetrasi;
          }

          fetchEditaplikasi(authApiKey, authToken, slug, type, combineData);
        } catch (error) {
          console.error("Error occurred during image upload:", error);
        }
      } else {
        fetchEditaplikasi(authApiKey, authToken, slug, type, data);
      }

    } else if (type === "finish") {
      if (data.file_submission) {
        const result = await fetchUploadFiles(
          authApiKey,
          authToken,
          data.file_submission,
          "aplikasi",
          dispatch
        );
        if (result !== null) {
          let combineData = {};
          combineData = { ...data, file_submission: result };
          fetchEditaplikasi(
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
        fetchEditaplikasi(authApiKey, authToken, slug, type, data);
      }
    }
  };
  return (
    <div className="flex flex-col gap-3 flex-1 p-3">
      <TitleHeader
        title={`Detail Pengajuan ${detailData.submission_title} #${slug}`}
        link1={"dashboard"}
        link2={"Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan"}
      />
      <ConditionalRender
        data={detailData}
        loading={aplikasiLoading}
        className={"flex flex-col h-60"}
        model={"emptyData"}
      >
        <section className="flex flex-col gap-3">
          <SubmissionStatus status={submissionStatus} data={null} />
          <div className={`flex  flex-col gap-3`}>
            <DalamAntrianView
              submissionStatus={submissionStatus}
              detailData={detailData}
              loading={aplikasiLoading}
            />
            <ValidationStatus
              submissionStatus={submissionStatus}
              validationData={validationData}
              authProfile={authProfile}
              detailData={detailData}
              loading={aplikasiLoading}
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
              loading={aplikasiLoading}
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
              loading={aplikasiLoading}
              checkingFormData={checkingFormData}
              setisModalVerif={setisModalVerif}
              finishData={finishData}
              setfinishData={setfinishData}
            />
            <FinishStatus
              detailData={detailData}
              loading={aplikasiLoading}
              validationData={validationData}
              validationDataTechnique={validationDataTechnique}
              processData={processData}
              submissionStatus={submissionStatus}
              finishData={finishData}
            />
          </div>
        </section>
      </ConditionalRender>


      <ModalContentComponent
        isModalVerif={isModalVerif}
        setisModalVerif={setisModalVerif}
        setisModalCreate={() => { }}
        fetchData={fetchDataAplikasi}
        authApiKey={authApiKey}
        authToken={authToken}
        authProfile={authProfile}
      />
    </div>
  );
}

export default DetailAplikasiPages;
