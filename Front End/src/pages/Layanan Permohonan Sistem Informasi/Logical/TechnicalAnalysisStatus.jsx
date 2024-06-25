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

const TechnicalAnalysisStatus = ({
  submissionStatus,
  feasibilityData,
  technicalAnalysis,
  technicalValidation,
  validationDataAnalysis,
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
  const [selected, setSelected] = useState(1);
  const TechnicalAnalysis = [
    {
      label: "Catatan Analisis Teknis",
      value: inputLocal.technical_analysis_notes,
      type: "textarea",
      name: 'technical_analysis_notes'
    },
  ];
  const TechnicalAnalysisforOPD = [
    {
      label: "Dokumen Spesifikasi Kebutuhan",
      value: inputLocal.requirements_specification_document,
      type: "file_upload",
      name: 'requirements_specification_document'
    },
  ];
  const TechnicalAnalysisforOPD2 = [
    {
      label: "Dokumen Pembangunan",
      value: inputLocal.development_documents,
      type: "file_upload",
      name: 'development_documents'
    },
  ];
  const TechnicalAnalysisforOPD3 = [
    {
      label: "Dokumen Hasil Uji Keberterimaan Pemakai",
      value: inputLocal.user_acceptance_test_results_document,
      type: "file_upload",
      name: 'user_acceptance_test_results_document'
    },
    {
      label: "Dokumen Hasil Uji Stressing Test",
      value: inputLocal.stressing_test_results_document,
      type: "file_upload",
      name: 'stressing_test_results_document'
    },
  ];

  const TechnicalValidation = [
    {
      label: "Catatan Validasi Teknis",
      value: inputLocal.technical_validation_notes,
      type: "textarea",
      name: 'technical_validation_notes'
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
      {submissionStatus >= 8 && <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
        <div className="flex flex-row gap-2 items-center">
          <span className='text-lg font-bold'>Validasi Kelayakan</span>
        </div>
        {Object.entries(validationDataAnalysis).map(([key, value]) => (
          <DynamicShow
            key={key}
            location={'permohonanSI'}
            label={key === "eligibility_validation_notes" ? "Catatan Validasi Kelayakan" : key}
            value={value}
            type={key === "eligibility_validation_notes" ? 'text' : 'text'}
          />
        ))}
      </div>}
      {Object.entries(technicalAnalysis).length === 0 ? null :
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <div className="flex flex-row gap-2 items-center">
              <span className='text-lg font-bold'>Analisis Teknis</span>
            </div>
            {Object.entries(technicalAnalysis).map(([key, value]) => (
              <DynamicShow
                key={key}
                location={'permohonanSI'}
                label={key === "technical_analysis_notes" ? "Catatan Analisis Teknis" : key}
                value={value}
                type={key === "technical_analysis_notes" ? 'text' : 'text'}
              />
            ))}
          </div>
        </div>}
      {(submissionStatus === 8 || submissionStatus === 9) && (JSON.parse(authProfile)?.role === "katim_aplikasi" || JSON.parse(authProfile)?.role === "kabid_aplikasi" ?
        <div className="flex flex-col gap-3">
          {JSON.parse(authProfile)?.role === "katim_aplikasi" && (
            Object.entries(technicalAnalysis).length === 0 ?
              <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                <span className='text-lg font-bold'>Tahapan Analisis Teknis</span>
                {renderProcessInputs(TechnicalAnalysis)}
                <div className='flex sm:flex-row flex-col gap-2'>
                  <DynamicButton
                    // initialValue={"Update Analisis Teknis ke Perangkat Daerah"}
                    initialValue={"Update Analisis Teknis ke Kepala Bidang Aplikasi"}
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
                      isValid = isValid && validateText(inputLocal.technical_analysis_notes, "Catatan Analisis Teknis")

                      if (isValid) {
                        checkingFormData('technical_analysis', filteredDataResult);
                        fetchSetProgress(authApiKey, authToken, 'Lanjutkan')
                      }
                    }}
                  />
                </div>
              </div> :
              <div className="flex flex-col gap-3">
                <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                  <span className="text-base font-semibold text-center">
                    Proses sudah dikirim ke Kepala Bidang Aplikasi
                  </span>
                </div>
              </div>)}
          {JSON.parse(authProfile)?.role === "kabid_aplikasi" && (
            Object.entries(technicalAnalysis).length !== 0 ?
              // <div className="flex flex-col gap-3">
              //   {selected === 1 &&
              //     <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              //       <div className="flex flex-row gap-2 items-center">
              //         <span className='text-lg font-bold'>Dokumen Spesifikasi Kebutuhan</span>
              //       </div>
              //       {renderProcessInputs(TechnicalAnalysisforOPD)}
              //       <div className='flex sm:flex-row flex-col gap-2'>
              //         <DynamicButton
              //           initialValue={"Lanjut"}
              //           type="fill"
              //           color={"#ffffff"}
              //           className="inline-flex  bg-[#0185FF] text-darkColor"
              //           onClick={() => {
              //             const result = {
              //               ...inputLocal,
              //             };
              //             const filteredDataResult = Object.fromEntries(
              //               Object.entries(result).filter(([_, value]) => {
              //                 return value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0);
              //               })
              //             );
              //             let isValid = true;
              //             isValid = isValid && validateFile(inputLocal.requirements_specification_document, "Upload File Dokumen Spesifikasi Kebutuhan");

              //             if (isValid) {
              //               setSelected(2)
              //             }
              //           }}
              //         />
              //       </div>
              //     </div>
              //   }
              //   {selected === 2 &&
              //     <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              //       <div className="flex flex-row gap-2 items-center">
              //         <span className='text-lg font-bold'>Dokumen Pembangunan</span>
              //       </div>
              //       {renderProcessInputs(TechnicalAnalysisforOPD2)}
              //       <div className='flex sm:flex-row flex-col gap-2'>
              //         <DynamicButton
              //           initialValue={"Lanjut"}
              //           type="fill"
              //           color={"#ffffff"}
              //           className="inline-flex  bg-[#0185FF] text-darkColor"
              //           onClick={() => {
              //             const result = {
              //               ...inputLocal,
              //             };
              //             const filteredDataResult = Object.fromEntries(
              //               Object.entries(result).filter(([_, value]) => {
              //                 return value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0);
              //               })
              //             );
              //             let isValid = true;
              //             isValid = isValid && validateFile(inputLocal.development_documents, "Upload File Dokumen Pembangunan");

              //             if (isValid) {
              //               setSelected(3)
              //             }
              //           }}
              //         />
              //       </div>
              //     </div>
              //   }
              //   {selected === 3 &&
              //     <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              //       <div className="flex flex-row gap-2 items-center">
              //         <span className='text-lg font-bold'>Dokumen Hasil Uji</span>
              //       </div>
              //       {renderProcessInputs(TechnicalAnalysisforOPD3)}
              //       <div className='flex sm:flex-row flex-col gap-2'>
              //         <DynamicButton
              //           initialValue={"Lanjut"}
              //           type="fill"
              //           color={"#ffffff"}
              //           className="inline-flex  bg-[#0185FF] text-darkColor"
              //           onClick={() => {
              //             const result = {
              //               ...inputLocal,
              //             };
              //             const filteredDataResult = Object.fromEntries(
              //               Object.entries(result).filter(([_, value]) => {
              //                 return value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0);
              //               })
              //             );
              //             let isValid = true;
              //             isValid = isValid && validateFile(inputLocal.requirements_specification_document, "Upload File Dokumen Spesifikasi Kebutuhan");

              //             if (isValid) {
              //               // checkingFormData('technical_analysis', filteredDataResult);
              //               console.log('asdfad');
              //             }
              //           }}
              //         />
              //       </div>
              //     </div>
              //   }
              // </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                  <span className='text-lg font-bold'>Tahapan Validasi Teknis</span>
                  {renderProcessInputs(TechnicalValidation)}
                  <div className='flex sm:flex-row flex-col gap-2'>
                    <DynamicButton
                      initialValue={"Setujui dan laporkan kekepala dinas"}
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
                        isValid = isValid && validateText(inputLocal.technical_validation_notes, "Catatan Validasi Teknis")

                        if (isValid) {
                          checkingFormData('technical_validation', filteredDataResult);
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
                        isValid = isValid && validateText(inputLocal.technical_validation_notes, "Catatan Validasi Teknis")

                        if (isValid) {
                          checkingFormData('technical_validation', filteredDataResult);
                          fetchSetProgress(authApiKey, authToken, 'Ditolak')
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              :
              <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                <span className="text-base font-semibold text-center">
                  Menunggu Laporan dari Ketua Tim Aplikasi
                </span>
              </div>

          )}
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
                Pengajuan Sedang Proses <b>Analisis Tenkis</b> Oleh pihak DISKOMINFO Kota
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
      {submissionStatus === 10 && (
        <div className='flex flex-col  gap-3'>
          <div className={`flex-1 flex flex-col gap-3`}>
            <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              <span className='text-lg font-bold'>Validasi Teknis</span>
              <div className="flex flex-row gap-2 items-center">
                <span className="text-base font-semibold">Status Validasi Teknis :</span>
                <div
                  className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor bg-[#FF0000]`}
                >
                  <span className="text-base">
                    Ditolak
                  </span>
                </div>
              </div>
              {Object.entries(technicalValidation).map(([key, value]) => (
                <DynamicShow
                  key={key}
                  location={'permohonanSI'}
                  label={key === "technical_validation_notes" ? "Catatan Validasi Teknis" : key}
                  value={value}
                  type={key === "technical_validation_notes" ? 'text' : 'text'}
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

export default TechnicalAnalysisStatus;
