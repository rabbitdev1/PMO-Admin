import React, { useEffect, useState } from "react";

import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as PengajuanBerahasilIcon } from "../../assets/icon/ic_pengajuan_berhasil.svg";
import DynamicButton from "../../components/common/DynamicButton";
import TitleHeader from "../../components/layout/TitleHeader";
import { isPending } from "../../components/store/actions/todoActions";
import ConditionalRender from "../../components/ui/ConditionalRender";
import ModalContent from "../../components/ui/Modal/ModalContent";
import SubmissionStatus from "../../components/ui/SubmissionStatus";
import { apiClient } from "../../utils/api/apiClient";
import fetchUploadFiles from "../../utils/api/uploadFiles";
import DalamAntrianView from "./Logical/1.DalamAntrianView";
import ValidationStatus from "./Logical/2.ValidationStatus";
import FeasibilityAnalysisStatus from "./Logical/3.FeasibilityAnalysisStatus";
import ValidationAnalysisStatus from "./Logical/4.ValidationAnalysisStatus";
import TechnicalAnalysisStatus from "./Logical/5.TechnicalAnalysisStatus";
import RecommendationLetterProcessStatus from "./Logical/6.RecommendationLetterProcessStatus";
import FinishStatus from "./Logical/7.FinishStatus";
import ModalContentComponent from "../../components/ui/ModalContentComponent";

function DetailPermohonanSIPages() {
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
  const [technicalValidation, setTechnicalValidation] = useState({});
  const [recommendationLetterTechnical, setRecommendationLetterTechnical] = useState({});

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
        setValidationDataAnalysis(JSON.parse(response.result.data?.feasibility_validation))
        setTechnicalAnalysis(JSON.parse(response.result.data?.technical_analysis))
        setTechnicalValidation(JSON.parse(response.result.data?.technical_validation))
        setRecommendationLetterTechnical(JSON.parse(response.result.data?.recommendation_letter_technical))
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

  const fetchEditpermohonanSI = async (api_key, token, id, type, data) => {
    dispatch(isPending(true));
    let htmlConvert = "";
    if (
      ["validation", "feasibility_analysis", "feasibility_validation", "technical_analysis", "recommendation_letter_technical"].includes(type) &&
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
    } else if (["feasibility_analysis", "feasibility_validation", 'technical_analysis', 'technical_validation', 'recommendation_letter_technical'].includes(type)) {
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
            title: "Pembaharuan Sistem Informasi Berhasil",
            msg: "Selamat! Pengajuan Permohonan Sistem Informasi Anda Telah Berhasil Diperbarui.",
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
      fetchEditpermohonanSI(authApiKey, authToken, slug, type, data);
    }
    else if (type === "feasibility_validation") {
      fetchEditpermohonanSI(authApiKey, authToken, slug, type, data);
    }
    else if (type === "technical_analysis") {
      fetchEditpermohonanSI(authApiKey, authToken, slug, type, data);
    }
    else if (type === "technical_validation") {
      fetchEditpermohonanSI(authApiKey, authToken, slug, type, data);
    }
    else if (type === "recommendation_letter_technical") {
      if (
        data.recommendation_letter_technical
      ) {
        try {
          const uploadPromises = [];
          const resultMapping = {};
          if (data.recommendation_letter_technical) {
            uploadPromises.push(
              fetchUploadFiles(
                authApiKey,
                authToken,
                data.recommendation_letter_technical,
                "permohonanSI",
                dispatch
              ).then(result => {
                resultMapping.recommendation_letter_technical = result;
              })
            );
          }

          await Promise.all(uploadPromises);
          let combineData = { ...data };
          if (resultMapping.recommendation_letter_technical) {
            combineData.recommendation_letter_technical = resultMapping.recommendation_letter_technical;
          }
          fetchEditpermohonanSI(authApiKey, authToken, slug, type, combineData);
        } catch (error) {
          console.error("Error occurred during image upload:", error);
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
          <SubmissionStatus status={submissionStatus} data={[
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
              color: "bg-[#fba500]",
              border: "border-[#fba500]",
              text: "text-[#fba500]",
            },
            {
              title: 'Validasi Teknis',
              status: 9,
              color: submissionStatus === 9 ? "bg-[#fba500]" : submissionStatus === 10 ? "bg-[#FF0000]" : "bg-[#fba500]",
              border: submissionStatus === 9 ? "border-[#fba500]" : submissionStatus === 10 ? "border-[#FF0000]" : "border-[#fba500]",
              text: submissionStatus === 9 ? "text-[#fba500]" : submissionStatus === 10 ? "text-[#FF0000]" : "text-[#fba500]",
            },
            {
              title: "Proses Surat Rekomendasi",
              status: 11,
              color: "bg-[#13C39C]",
              border: "border-[#13C39C]",
              text: "text-[#13C39C]",
            },
            {
              title: "Pengajuan Selesai",
              status: 12,
              color: submissionStatus === 12 ? "bg-[#13C39C]" : submissionStatus === 15 ? "bg-[#FF0000]" : "bg-[#13C39C]",
              border: submissionStatus === 12 ? "border-[#13C39C]" : submissionStatus === 15 ? "border-[#FF0000]" : "border-[#13C39C]",
              text: submissionStatus === 12 ? "text-[#13C39C]" : submissionStatus === 15 ? "text-[#FF0000]" : "text-[#13C39C]",
            },
          ]} />
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
              authProfile={authProfile}
              detailData={detailData}
              loading={permohonanSILoading}
              checkingFormData={checkingFormData}
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
              technicalValidation={technicalValidation}
              validationDataAnalysis={validationDataAnalysis}
              technicalAnalysis={technicalAnalysis}
              authProfile={authProfile}
              detailData={detailData}
              loading={permohonanSILoading}
              checkingFormData={checkingFormData}
              setisModalVerif={setisModalVerif}
            />
            <RecommendationLetterProcessStatus
              slug={slug}
              validationData={validationData}
              technicalValidation={technicalValidation}
              recommendationLetterTechnical={recommendationLetterTechnical}
              submissionStatus={submissionStatus}
              feasibilityData={feasibilityDataAnalysis}
              setValidationData={setFeasibilityDataAnalysis}
              authProfile={authProfile}
              detailData={detailData}
              loading={permohonanSILoading}
              checkingFormData={checkingFormData}
              setisModalVerif={setisModalVerif}
            />
            <FinishStatus
              slug={slug}
              validationData={validationData}
              technicalValidation={technicalValidation}
              recommendationLetterTechnical={recommendationLetterTechnical}
              submissionStatus={submissionStatus}
              feasibilityData={feasibilityDataAnalysis}
              setValidationData={setFeasibilityDataAnalysis}
              authProfile={authProfile}
              detailData={detailData}
              loading={permohonanSILoading}
              checkingFormData={checkingFormData}
              setisModalVerif={setisModalVerif} />
          </div>
        </section>
      </ConditionalRender>

      <ModalContentComponent
        isModalVerif={isModalVerif}
        setisModalVerif={setisModalVerif}
        setisModalCreate={()=>{}}
        fetchData={fetchDataPermohonanSI}
        authApiKey={authApiKey}
        authToken={authToken}
        authProfile={authProfile}
      />
    </div>
  );
}

export default DetailPermohonanSIPages;
