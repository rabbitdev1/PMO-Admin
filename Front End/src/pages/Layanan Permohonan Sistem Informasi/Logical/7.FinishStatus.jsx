import Cookies from "js-cookie";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DynamicInput from "../../../components/common/DynamicInput";
import DynamicShow from "../../../components/common/DynamicShow";
import DynamicDetails from "../DynamicDetails";
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
          <div className='flex flex-col  gap-3'>
            <div className={`flex-1 flex flex-col gap-3`}>
              <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                <span className='text-lg font-bold'>Surat Rekomendasi</span>
                {Object.entries(recommendationLetterTechnical).map(([key, value]) => (
                  <DynamicShow
                    key={key}
                    location={'permohonanSI'}
                    label={key === "recommendation_letter_technical" ? "Surat Rekomendasi" :"kepala_dinas_note" ? "Catatan Kepala Dinas" : key}
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
        </div>
      }
    </>
  );
};

export default FinishStatus;
