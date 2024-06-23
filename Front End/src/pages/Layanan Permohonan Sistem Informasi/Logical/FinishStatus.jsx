import Cookies from "js-cookie";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DynamicInput from "../../../components/common/DynamicInput";
import DynamicShow from "../../../components/common/DynamicShow";
import DynamicDetails from "../../../components/ui/DynamicDetails";
import { apiClient } from "../../../utils/api/apiClient";
import DynamicDetailsPermohonanSI from "../DynamicDetailsPermohonanSI";

const FinishStatus = ({
  submissionStatus,
  recommendationLetterTechnical,
  slug,
  detailData,
  loading,
}) => {

  const [inputLocal, setInputLocal] = useState({});
  const RecommendationLetterProcess = [
    {
      label: "Surat Rekomendasi Teknis",
      value: inputLocal.recommendation_letter_technical,
      type: "file_upload",
      name: 'recommendation_letter_technical'
    },
    {
      label: "Catatan Kepala Dinas",
      value: inputLocal.kepala_dinas_note,
      type: "textarea",
      name: 'kepala_dinas_note'
    },
  ];

  const fetchSetProgress = async (api_key, token, status) => {
    const params = new URLSearchParams();
    params.append("id", slug);
    params.append("status", status);

    try {
      const response = await apiClient({
        baseurl: "permohonan-sistem-informasi/set_process",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      if (response?.statusCode === 200) {

      } else {
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderProcessInputs = (inputs) => {
    return inputs.map((inputProps, index) => (
      <DynamicInput
        key={index}
        label={inputProps.label}
        value={inputProps.value}
        type={inputProps.type}
        options={inputProps.options}
        onChange={(value) => {
          setInputLocal(prevState => ({
            ...prevState,
            [inputProps.name]: value
          }));
        }}
      />
    ));
  };
  return (
    <>
      {submissionStatus === 12 &&
        <div className="flex flex-col gap-3">
          {/* <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <span className='text-lg font-bold'>Proses Pembuatan Surat Rekomendasi</span>
            {renderProcessInputs(RecommendationLetterProcess)}
            <div className='flex sm:flex-row flex-col gap-2'>
              <DynamicButton
                initialValue={"Setujui Permohonan Sistem Informasi Dan Selesai"}
                type="fill"
                color={"#ffffff"}
                className="inline-flex  bg-[#0185FF] text-darkColor"
                onClick={() => {
                  const result = {
                    ...inputLocal,
                  };
                  const filteredDataResult = Object.fromEntries(
                    Object.entries(result).filter(([_, value]) => {
                      return value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0);
                    })
                  );
                  let isValid = true;
                  isValid = isValid && validateFile(inputLocal.recommendation_letter_technical, "Pembuatan Surat Rekomendasi")
                  isValid = isValid && validateText(inputLocal.kepala_dinas_note, "Catatan Kepala Dinas")

                  if (isValid) {
                    checkingFormData('recommendation_letter_technical', filteredDataResult);
                    fetchSetProgress(authApiKey, authToken, 'Lanjutkan')
                  }
                }}
              />
            </div>
          </div> */}

          <div className='flex flex-col  gap-3'>
            <div className={`flex-1 flex flex-col gap-3`}>
              <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                <span className='text-lg font-bold'>Proses Pembuatan Surat Rekomendasi</span>
                <div className="flex flex-row gap-2 items-center">
                  <span className="text-base font-semibold">Status Analisis Kelayakan :</span>
                  <div
                    className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor bg-[#0185FF]`}
                  >
                    <span className="text-base">
                      Disetujui
                    </span>
                  </div>
                </div>
                {Object.entries(recommendationLetterTechnical).map(([key, value]) => (
                  <DynamicShow
                    key={key}
                    location={'permohonanSI'}
                    label={key === "recommendation_letter_technical" ? "Pembuatan Surat Rekomendasi" : key}
                    value={value}
                    type={key === "recommendation_letter_technical" ? 'pdf' : 'text'}
                  />
                ))}
              </div>
            </div>
            {detailData.submission_title === "Rekomendasi Sistem Informasi" ?
              <DynamicDetails location={"permohonanSI"} detailData={detailData} loading={loading} />
              :
              <DynamicDetailsPermohonanSI location={"permohonanSI"} detailData={detailData} loading={loading} />
            }
          </div>

          {detailData.submission_title === "Rekomendasi Sistem Informasi" ?
            <DynamicDetails location={"permohonanSI"} detailData={detailData} loading={loading} />
            :
            <DynamicDetailsPermohonanSI location={"permohonanSI"} detailData={detailData} loading={loading} />
          }
        </div>
      }
    </>
  );
};

export default FinishStatus;
