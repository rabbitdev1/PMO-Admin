import Cookies from "js-cookie";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DynamicButton from "../../../components/common/DynamicButton";
import { ReactComponent as PengajuanBerahasilIcon } from "../../../assets/icon/ic_pengajuan_berhasil.svg";
import DynamicInput from "../../../components/common/DynamicInput";
import DynamicShow from "../../../components/common/DynamicShow";
import { apiClient } from "../../../utils/api/apiClient";
import { validateFile, validatePeriod, validateText } from "../../../utils/helpers/validateForm";
import DynamicDetailsPermohonanSI from "../DynamicDetailsPermohonanSI";
import DynamicDetails from "../../../components/ui/DynamicDetails";

const FeasibilityAnalysisStatus = ({
  submissionStatus,
  feasibilityData,
  validationData,
  authProfile,
  slug,
  setisModalVerif,
  checkingFormData,
  detailData,
  loading,
}) => {
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');

  const [inputLocal, setInputLocal] = useState({});
  const FeasibilityAnalysis = [
    {
      label: "Catatan Analisis Kelayakan",
      value: inputLocal.feasibility_analysis_notes,
      type: "textarea",
      name: 'feasibility_analysis_notes'
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
   {submissionStatus >= 3 &&   <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
        <div className="flex flex-row gap-2 items-center">
          <span className="text-base font-semibold">Status Kelengkapan Dokumen :</span>
          <div
            className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor ${validationData.status_validation === 'Disetujui' ? 'bg-[#0185FF]' : 'bg-[#FF0000]'}`}
          >
            <span className="text-base">
              {validationData.status_validation}
            </span>
          </div>
        </div>
        {validationData?.response &&
          <DynamicShow
            label={"Tanggapan"}
            location={'permohonanSI'}
            value={validationData?.response}
            type={"html"}
          />
        }
      </div>}
      {submissionStatus === 4 && (JSON.parse(authProfile)?.role === "katim_perencanaan" ?
        <div className="flex flex-col gap-3">
          <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <span className='text-lg font-bold'>Tahapan Analisis Kelayakan</span>
            {renderProcessInputs(FeasibilityAnalysis)}
            <div className='flex sm:flex-row flex-col gap-2'>
              <DynamicButton
                initialValue={"Setujui dan lanjut ke Validasi Kelayakan"}
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
                  isValid = isValid && validateText(inputLocal.feasibility_analysis_notes, "Catatan Analisis Kelayakan")

                  if (isValid) {
                    checkingFormData('feasibility_analysis', filteredDataResult);
                    fetchSetProgress(authApiKey, authToken, 'Lanjutkan')
                  }

                }}
              />
              <DynamicButton
                initialValue={"Tolak proses dan selesai"}
                type="fill"
                color={"#ffffff"}
                className="inline-flex  bg-[#FF0000] text-darkColor"
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
                  isValid = isValid && validateText(inputLocal.feasibility_analysis_notes, "Catatan Analisis Kelayakan")

                  if (isValid) {
                    checkingFormData('feasibility_analysis', filteredDataResult);
                    fetchSetProgress(authApiKey, authToken, 'Ditolak')
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
                Pengajuan Sedang Proses <b>Aanlisis Kelayakan</b> Oleh pihak DISKOMINFO Kota
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
      {submissionStatus === 5 && (
        <div className='flex flex-col  gap-3'>
          <div className={`flex-1 flex flex-col gap-3`}>
            <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <span className='text-lg font-bold'>Analisis Kelayakan</span>
            <div className="flex flex-row gap-2 items-center">
                <span className="text-base font-semibold">Status Analisis Kelayakan :</span>
                <div
                  className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor bg-[#FF0000]`}
                >
                  <span className="text-base">
                    Ditolak
                  </span>
                </div>
              </div>
              {Object.entries(feasibilityData).map(([key, value]) => (
                <DynamicShow
                  key={key}
                  location={'permohonanSI'}
                  label={key === "feasibility_analysis_notes" ? "Catatan Analisis Kelayakan" : key}
                  value={value}
                  type={key === "feasibility_analysis_notes" ? 'text' : 'text'}
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
      )}
    </>
  );
};

export default FeasibilityAnalysisStatus;
