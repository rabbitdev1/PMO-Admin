import Cookies from "js-cookie";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicInput from "../../../components/common/DynamicInput";
import DynamicShow from "../../../components/common/DynamicShow";
import { apiClient } from "../../../utils/api/apiClient";
import { validateFile, validateText } from "../../../utils/helpers/validateForm";
import DynamicDetails from "../DynamicDetails";
import DynamicDetailsPermohonanSI from "../DynamicDetailsPermohonanSI";
import { getRecommendationLetterProcess } from "../data";

const RecommendationLetterProcessStatus = ({
  submissionStatus,
  technicalValidation,
  authProfile,
  slug,
  checkingFormData,
  detailData,
  loading,
}) => {
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');

  const [inputLocal, setInputLocal] = useState({});
  const RecommendationLetterProcess = getRecommendationLetterProcess(inputLocal);

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
        noted={inputProps.noted}
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
      {submissionStatus >= 11 && <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
        <span className='text-lg font-bold'>Validasi Teknis</span>
        {Object.entries(technicalValidation).map(([key, value]) => (
          <DynamicShow
            key={key}
            location={'permohonanSI'}
            label={key === "technical_validation_notes" ? "Catatan Validasi Teknis" : key}
            value={value}
            type={key === "technical_validation_notes" ? 'text' : 'text'}
          />
        ))}
      </div>}
      {submissionStatus === 11 && (JSON.parse(authProfile)?.role === "kadis" ?
        <div className="flex flex-col gap-3">
          <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
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
          </div>
          {detailData.submission_title === "Rekomendasi Sistem Informasi" ?
            <DynamicDetails location={"permohonanSI"} detailData={detailData} loading={loading} />
            :
            <DynamicDetailsPermohonanSI location={"permohonanSI"} detailData={detailData} loading={loading} />
          }
        </div>
        :
        <div className='flex flex-col gap-3'>
          <div className="flex flex-col flex-1">
            <div className="flex flex-col bg-lightColor dark:bg-cardDark p-5 gap-3 items-center rounded-lg">
              <img
                src={require('../../../assets/image/process.gif')}
                alt={'processing'}
                className="object-contain flex w-[20%] min-w-[200px] aspect-square"
                effect="blur"
              />
              <span className="text-base text-center">
                Pengajuan Sedang Proses <b>Surat Rekomendasi</b> Oleh pihak Kepala Dinas DISKOMINFO Kota
                Bandung
              </span>
            </div>
          </div>
          {detailData.submission_title === "Rekomendasi Sistem Informasi" ?
            <DynamicDetails location={"permohonanSI"} detailData={detailData} loading={loading} />
            :
            <DynamicDetailsPermohonanSI location={"permohonanSI"} detailData={detailData} loading={loading} />
          }
        </div>
      )}
    </>
  );
};

export default RecommendationLetterProcessStatus;
