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
import DalamAntrianView from "./Logical/DalamAntrianView";
import FinishStatus from "./Logical/FinishStatus";
import ProcessStatus from "./Logical/ProcessStatus";
import ValidationStatus from "./Logical/ValidationStatus";
import ConditionalRender from "../../components/ui/ConditionalRender";
import FeasibilityAnalysisStatus from "./Logical/FeasibilityAnalysisStatus";
import ValidationAnalysisStatus from "./Logical/ValidationAnalysisStatus";
import TechnicalAnalysisStatus from "./Logical/TechnicalAnalysisStatus";

function DetailPermohonanSIPages() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const authApiKey = Cookies.get("authApiKey");
  const authToken = Cookies.get("authToken");
  const authProfile = Cookies.get("authData");
  const location = useLocation();
  const slug = location?.state?.slug || "";

  const [permohonanSILoading, setPermohonanSILoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState(0);
  const [validationData, setValidationData] = useState({});
  const [feasibilityDataAnalysis, setFeasibilityDataAnalysis] = useState({});
  const [validationDataAnalysis, setValidationDataAnalysis] = useState({});
  const [technicalAnalysis, setTechnicalAnalysis] = useState({});
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
      fetchDataPermohonanSI(
        authApiKey,
        authToken,
        JSON.parse(authProfile)?.role
      );
    }
  }, [dispatch]);

  const fetchDataPermohonanSI = async (api_key, token, role) => {
    setPermohonanSILoading(true);
    const params = new URLSearchParams();
    params.append("id", slug);
    params.append("role", role);
    try {
      const response = await apiClient({
        baseurl: "permohonan-sistem-informasi/detail",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      setPermohonanSILoading(false);
      if (response?.statusCode === 200) {
        setDetailData(response.result.data.fields);
        setSubmissionStatus(response.result.data?.submission_status);
        setValidationData(JSON.parse(response.result.data?.on_validation));
        setFeasibilityDataAnalysis(
          JSON.parse(response.result.data?.feasibility_analysis)
        );
        setValidationDataAnalysis( JSON.parse(response.result.data?.feasibility_validation))
        setTechnicalAnalysis( JSON.parse(response.result.data?.technical_analysis))
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

  const fetchEditpermohonanSI = async (api_key, token, id, type, data) => {
    dispatch(isPending(true));
    let htmlConvert = "";
    if (
      ["validation", "feasibility_analysis", "feasibility_validation","technical_analysis"].includes(type) &&
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
    } else if (["feasibility_analysis", "feasibility_validation",'technical_analysis'].includes(type)) {
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
        baseurl: "permohonan-sistem-informasi/edit",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: "PermohonanSI Berhasil Diupdate",
            msg: "Selamat, Pengajuan permohonanSI sudah diupdate",
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
      fetchEditpermohonanSI(authApiKey, authToken, slug, type, data);
    }
    else if (type === "feasibility_analysis") {
      if (
        data.file_catatan_kelayakan 
      ) {
        try {
          const uploadPromises = [];
          const resultMapping = {};
          if (data.file_catatan_kelayakan) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.file_catatan_kelayakan,
                "permohonanSI",
                dispatch
              ).then(result => {
                resultMapping.file_catatan_kelayakan = result;
              })
            );
          }
          
          await Promise.all(uploadPromises);

          let combineData = { ...data };
          if (resultMapping.file_catatan_kelayakan) {
            combineData.file_catatan_kelayakan = resultMapping.file_catatan_kelayakan;
          }
          fetchEditpermohonanSI(authApiKey, authToken, slug, type, combineData);
        } catch (error) {
          console.error("Error occurred during image upload:", error);
        }
      } else {
        fetchEditpermohonanSI(authApiKey, authToken, slug, type, data);
      }
    } 
    else if (type === "feasibility_validation") {
      if (
        data.file_catatan_kelayakan 
      ) {
        try {
          const uploadPromises = [];
          const resultMapping = {};
          if (data.file_catatan_kelayakan) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.file_catatan_kelayakan,
                "permohonanSI",
                dispatch
              ).then(result => {
                resultMapping.file_catatan_kelayakan = result;
              })
            );
          }
          
          await Promise.all(uploadPromises);

          let combineData = { ...data };
          if (resultMapping.file_catatan_kelayakan) {
            combineData.file_catatan_kelayakan = resultMapping.file_catatan_kelayakan;
          }
          fetchEditpermohonanSI(authApiKey, authToken, slug, type, combineData);
        } catch (error) {
          console.error("Error occurred during image upload:", error);
        }
      } else {
        fetchEditpermohonanSI(authApiKey, authToken, slug, type, data);
      }
    } 
    else if (type === "technical_analysis") {
      if (
        data.file_catatan_kelayakan 
      ) {
        try {
          const uploadPromises = [];
          const resultMapping = {};
          if (data.file_catatan_kelayakan) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.file_catatan_kelayakan,
                "permohonanSI",
                dispatch
              ).then(result => {
                resultMapping.file_catatan_kelayakan = result;
              })
            );
          }
          
          await Promise.all(uploadPromises);

          let combineData = { ...data };
          if (resultMapping.file_catatan_kelayakan) {
            combineData.file_catatan_kelayakan = resultMapping.file_catatan_kelayakan;
          }
          fetchEditpermohonanSI(authApiKey, authToken, slug, type, combineData);
        } catch (error) {
          console.error("Error occurred during image upload:", error);
        }
      } else {
        fetchEditpermohonanSI(authApiKey, authToken, slug, type, data);
      }
    } 
    
    
    
    else if (type === "process") {
      if (
        data.upload_dokumen_hasil_integrasi ||
        data.upload_dokumen_laporan_modul_tte ||
        data.upload_dokumen_laporan_pembuatan_akun
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
                "permohonanSI",
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
                "permohonanSI",
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
                "permohonanSI",
                dispatch
              ).then(result => {
                resultMapping.upload_dokumen_laporan_pembuatan_akun = result;
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

          fetchEditpermohonanSI(authApiKey, authToken, slug, type, combineData);
        } catch (error) {
          console.error("Error occurred during image upload:", error);
        }
      } else {
        fetchEditpermohonanSI(authApiKey, authToken, slug, type, data);
      }

    } 
    else if (type === "finish") {
      if (data.file_submission) {
        const result = await fetchUploadFiles(
          authApiKey,
          authToken,
          data.file_submission,
          "permohonanSI",
          dispatch
        );
        if (result !== null) {
          let combineData = {};
          combineData = { ...data, file_upload: result };
          fetchEditpermohonanSI(
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
        fetchEditpermohonanSI(authApiKey, authToken, slug, type, data);
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
        loading={permohonanSILoading}
        className={"flex flex-col h-60"}
        model={"emptyData"}
      >
        <section className="flex flex-col gap-3">
          <div className="flex-1 flex flex-col gap-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              {[
                {
                  title: "Dalam Antrian",
                  status: 1,
                  color: "bg-[#333333]",
                  border: "border-[#333333]",
                  text: "text-[#333333]",
                },
                {
                  title: 'Validasi Dokumen',
                  status: 2,
                  color: submissionStatus === 2 ? "bg-[#F5CF08]" : submissionStatus === 3 ? "bg-[#FF0000]" : "bg-[#F5CF08]",
                  border: submissionStatus === 2 ? "border-[#F5CF08]" : submissionStatus === 3 ? "border-[#FF0000]" : "border-[#F5CF08]",
                  text: submissionStatus === 2 ? "text-[#F5CF08]" : submissionStatus === 3 ? "text-[#FF0000]" : "text-[#F5CF08]",
                },
                {
                  title: 'Analisis Kelayakan',
                  status: 4,
                  color: submissionStatus === 4 ? "bg-[#F5CF08]" : submissionStatus === 5 ? "bg-[#FF0000]" : "bg-[#F5CF08]",
                  border: submissionStatus === 4 ? "border-[#F5CF08]" : submissionStatus === 5 ? "border-[#FF0000]" : "border-[#F5CF08]",
                  text: submissionStatus === 4 ? "text-[#F5CF08]" : submissionStatus === 5 ? "text-[#FF0000]" : "text-[#F5CF08]",
                },
                {
                  title: 'Validasi Kelayakan',
                  status: 6,
                  color: submissionStatus === 6 ? "bg-[#F5CF08]" : submissionStatus === 7 ? "bg-[#FF0000]" : "bg-[#F5CF08]",
                  border: submissionStatus === 6 ? "border-[#F5CF08]" : submissionStatus === 7 ? "border-[#FF0000]" : "border-[#F5CF08]",
                  text: submissionStatus === 6 ? "text-[#F5CF08]" : submissionStatus === 7 ? "text-[#FF0000]" : "text-[#F5CF08]",
                },
                {
                  title: 'Analisis Teknis',
                  status: 8,
                  color: submissionStatus === 8 ? "bg-[#F5CF08]" : submissionStatus === 9 ? "bg-[#FF0000]" : "bg-[#F5CF08]",
                  border: submissionStatus === 8 ? "border-[#F5CF08]" : submissionStatus === 9 ? "border-[#FF0000]" : "border-[#F5CF08]",
                  text: submissionStatus === 8 ? "text-[#F5CF08]" : submissionStatus === 9 ? "text-[#FF0000]" : "text-[#F5CF08]",
                },
                {
                  title: 'Analisis Teknis',
                  status: 10,
                  color: submissionStatus === 10 ? "bg-[#F5CF08]" : submissionStatus === 11 ? "bg-[#FF0000]" : "bg-[#F5CF08]",
                  border: submissionStatus === 10 ? "border-[#F5CF08]" : submissionStatus === 11 ? "border-[#FF0000]" : "border-[#F5CF08]",
                  text: submissionStatus === 10 ? "text-[#F5CF08]" : submissionStatus === 11 ? "text-[#FF0000]" : "text-[#F5CF08]",
                },
                {
                  title: "Pengajuan Selesai",
                  status: 12,
                  color: submissionStatus === 12 ? "bg-[#13C39C]" : submissionStatus === 13 ? "bg-[#FF0000]" : "bg-[#13C39C]",
                  border: submissionStatus === 12 ? "border-[#13C39C]" : submissionStatus === 13 ? "border-[#FF0000]" : "border-[#13C39C]",
                  text: submissionStatus === 12 ? "text-[#13C39C]" : submissionStatus === 13 ? "text-[#FF0000]" : "text-[#13C39C]",
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col flex-1 ">
                  <div className="flex flex-1 gap-3 items-center flex-row py-2 text-center text-darkColor">
                    <div className={`${"border-b-2"}  flex-1 flex ${submissionStatus >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`} />
                    <div className={`flex p-2 rounded-full border-2 ${submissionStatus >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`}>
                      <div className={`flex items-center w-12 aspect-square justify-center ${submissionStatus >= item.status ? item.color : "bg-[#D9D9D9]"} rounded-full`}>
                        <span className="text-xl  aspect-square text-center align-text-bottom font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <div className={`${"border-b-2"}  flex-1 flex ${submissionStatus >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`} />
                  </div>
                  <div className={`flex flex-col items-center ${submissionStatus >= item.status ? item.text : "text-[#D9D9D9]"} `}>
                    <span className="text-sm font-semibold">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`flex  flex-col gap-3`}>
            <DalamAntrianView
              submissionStatus={submissionStatus}
              detailData={detailData}
              loading={permohonanSILoading}
            />
            <ValidationStatus
              submissionStatus={submissionStatus}
              validationData={validationData}
              authProfile={authProfile}
              detailData={detailData}
              loading={permohonanSILoading}
              setValidationData={setValidationData}
              checkingFormData={checkingFormData}
            />
            <FeasibilityAnalysisStatus
              slug={slug}
              validationData={validationData}
              submissionStatus={submissionStatus}
              feasibilityData={feasibilityDataAnalysis}
              setValidationData={setFeasibilityDataAnalysis}
              authProfile={authProfile}
              detailData={detailData}
              loading={permohonanSILoading}
              checkingFormData={checkingFormData}
              setisModalVerif={setisModalVerif}
            />
            <ValidationAnalysisStatus
              slug={slug}
              feasibilityDataAnalysis={feasibilityDataAnalysis}
              submissionStatus={submissionStatus}
              validationDataAnalysis={validationDataAnalysis}
              setValidationData={setValidationDataAnalysis}
              authProfile={authProfile}
              detailData={detailData}
              loading={permohonanSILoading}
              checkingFormData={checkingFormData}
              setisModalVerif={setisModalVerif}
            />
           <TechnicalAnalysisStatus
              slug={slug}
              validationData={validationData}
              submissionStatus={submissionStatus}
              feasibilityData={feasibilityDataAnalysis}
              validationDataAnalysis={validationDataAnalysis}
              technicalAnalysis={technicalAnalysis}
              // setValidationData={setTechnicalAnalysis}
              authProfile={authProfile}
              detailData={detailData}
              loading={permohonanSILoading}
              checkingFormData={checkingFormData}
              setisModalVerif={setisModalVerif}
            />
          </div>
        </section>
      </ConditionalRender>

      <ModalContent
        className={"sm:max-w-xl"}
        children={
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center ">
              {isModalVerif.data?.icon && (
                <isModalVerif.data.icon
                  className={`flex flex-col flex-1 max-w-[150%] aspect-square bg-[${isModalVerif.data.color}] rounded-full`}
                />
              )}
            </div>
            <div className="flex  flex-col items-center justify-center ">
              <span className="text-lg font-bold">
                {isModalVerif.data?.title}
              </span>
              <span className="text-sm font-light opacity-70">
                {isModalVerif.data?.msg}
              </span>
            </div>
            <div className="flex flex-col gap-2 ">
              <DynamicButton
                initialValue={"Kembali"}
                type="fill"
                color={"#ffffff"}
                className={`inline-flex flex-1 bg-[${isModalVerif.data.color}] text-darkColor`}
                onClick={() => {
                  setisModalVerif({ data: {}, status: false });
                  fetchDataPermohonanSI(
                    authApiKey,
                    authToken,
                    JSON.parse(authProfile)?.role
                  );
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

export default DetailPermohonanSIPages;
