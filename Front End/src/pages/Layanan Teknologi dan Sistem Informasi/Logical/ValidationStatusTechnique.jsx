import Cookies from "js-cookie";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ReactComponent as PengajuanBerahasilIcon } from "../../../assets/icon/ic_pengajuan_berhasil.svg";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicInput from "../../../components/common/DynamicInput";
import DynamicShow from "../../../components/common/DynamicShow";
import DynamicDetails from "../../../components/ui/DynamicDetails";
import { apiClient } from "../../../utils/api/apiClient";
import {
  validateFile,
  validatePeriod,
  validateText,
} from "../../../utils/helpers/validateForm";

const ValidationStatusTechnique = ({
  submissionStatus,
  validationData,
  setValidationData,
  authProfile,
  slug,
  setisModalVerif,
  checkingFormData,
  detailData,
  loading,
}) => {
  const authApiKey = Cookies.get("authApiKey");
  const authToken = Cookies.get("authToken");

  const [inputLocal, setInputLocal] = useState({});
  const ZoomValidateTechnique = [
    // {
    //   label: "Skema Integrasi",
    //   value: inputLocal.file_scema_integration,
    //   type: "file_upload",
    //   name: "file_scema_integration",
    // },
    {
      label: "Tanggapan Tim Teknis",
      value: inputLocal.team_response,
      type: "textarea",
      name: "team_response",
    },
    {
      label: "Jadwal Pengerjaan",
      value: inputLocal.working_schedule,
      type: "multi_date",
      name: "working_schedule",
    },
  ];
  const PermohonanLiputanValidateTechnique = [
    // {
    //   label: "Skema Integrasi",
    //   value: inputLocal.file_scema_integration,
    //   type: "file_upload",
    //   name: "file_scema_integration",
    // },
    {
      label: "Tanggapan Tim Teknis",
      value: inputLocal.team_response,
      type: "textarea",
      name: "team_response",
    },
    {
      label: "Jadwal Pengerjaan",
      value: inputLocal.working_schedule,
      type: "multi_date",
      name: "working_schedule",
    },
  ];
  const ModulTTEValidateTechnique = [
    {
      label: "Tanggapan Tim Teknis",
      value: inputLocal.team_response,
      type: "textarea",
      name: "team_response",
    },
    {
      label: "Jadwal Pengerjaan",
      value: inputLocal.working_schedule,
      type: "multi_date",
      name: "working_schedule",
    },
  ];
  const UserAccountSIValidateTechnique = [
    {
      label: "Tanggapan Tim Teknis",
      value: inputLocal.team_response,
      type: "textarea",
      name: "team_response",
    },
    {
      label: "Jadwal Pengerjaan",
      value: inputLocal.working_schedule,
      type: "multi_date",
      name: "working_schedule",
    },
  ];

  const fetchSetProgress = async (api_key, token, status) => {
    const params = new URLSearchParams();
    params.append("id", slug);
    params.append("status", status);

    try {
      const response = await apiClient({
        baseurl: "teknologisi/set_process",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: "Teknologi dan Sistem Informasi Berhasil Diupdate",
            msg: "Selamat, Pengajuan Sudah di-update",
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

  const renderProcessInputs = (inputs) => {
    return inputs.map((inputProps, index) => (
      <DynamicInput
        key={index}
        label={inputProps.label}
        value={inputProps.value}
        type={inputProps.type}
        options={inputProps.options}
        onChange={(value) => {
          setInputLocal((prevState) => ({
            ...prevState,
            [inputProps.name]: value,
          }));
        }}
      />
    ));
  };
  return (
    <>
      {submissionStatus === 4 &&
        (JSON.parse(authProfile)?.role === "teknis_aplikasi" ||
        JSON.parse(authProfile)?.role === "katim_aplikasi" ? (
          <div className="flex flex-col gap-3">
            {JSON.parse(authProfile)?.role === "teknis_aplikasi" &&
              (Object.entries(validationData).length === 0 ? (
                <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                  <span className="text-lg font-bold">Tahapan Validasi</span>
                  {renderProcessInputs(
                    detailData.submission_title === "Layanan ZOOM"
                      ? ZoomValidateTechnique
                      : detailData.submission_title === "Permohonan Liputan"
                        ? PermohonanLiputanValidateTechnique
                          : []
                  )}
                  <div className="flex sm:flex-row flex-col gap-2">
                    <DynamicButton
                      initialValue={"Lapor Validasi Teknis ke Ketua Tim Teknis"}
                      type="fill"
                      color={"#ffffff"}
                      className="inline-flex  bg-[#0185FF] text-darkColor"
                      onClick={() => {
                        const { startDate, endDate } =
                          inputLocal.working_schedule || [];
                        const workingScheduleArray = [startDate, endDate];
                        const result = {
                          ...inputLocal,
                          working_schedule: workingScheduleArray,
                        };
                        const filteredDataResult = Object.fromEntries(
                          Object.entries(result).filter(([_, value]) => {
                            return (
                              value !== undefined &&
                              value !== null &&
                              value !== "" &&
                              !(Array.isArray(value) && value.length === 0)
                            );
                          })
                        );
                        let isValid = true;
                        // isValid =
                        //   isValid &&
                        //   validateFile(
                        //     inputLocal.file_scema_integration,
                        //     "Skema Integrasi"
                        //   );
                        isValid =
                          isValid &&
                          validateText(
                            inputLocal.team_response,
                            "Tanggapan Tim Teknis"
                          );
                        isValid =
                          isValid &&
                          validatePeriod(
                            inputLocal.working_schedule,
                            "Jadwal Pengerjaan"
                          );

                        if (isValid) {
                          checkingFormData(
                            "validation_technique",
                            filteredDataResult
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                    <span className="text-base font-semibold text-center">
                      Laporan sudah dikirimn ke Ketua Tim Teknis
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                    <span className="text-lg font-bold">Tahapan Validasi</span>
                    {Object.entries(validationData).map(([key, value]) => (
                      <DynamicShow
                        key={key}
                        label={
                          key === "file_scema_integration"
                            ? "Skema Integrasi"
                            : key === "team_response"
                              ? "Tanggapan dari Tim Teknis"
                              : key === "working_schedule"
                                ? "Jadwal Kerja"
                                : key
                        }
                        value={value}
                        type={
                          key === "file_scema_integration"
                            ? "pdf"
                            : key === "team_response"
                              ? "text"
                              : key === "working_schedule"
                                ? "multidate"
                                : "text"
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            {JSON.parse(authProfile)?.role === "katim_aplikasi" &&
              (Object.entries(validationData).length !== 0 ? (
                <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                  <span className="text-lg font-bold">Tahapan Validasi</span>
                  {Object.entries(validationData).map(([key, value]) =>
                    key === "response_katim" ? null : (
                      <DynamicShow
                        key={key}
                        location={"teknologisi"}
                        label={
                          key === "file_scema_integration"
                            ? "Skema Integrasi"
                            : key === "team_response"
                              ? "Tanggapan dari Tim Teknis"
                              : key === "working_schedule"
                                ? "Jadwal Kerja"
                                : key
                        }
                        value={value}
                        type={
                          key === "file_scema_integration"
                            ? "pdf"
                            : key === "team_response"
                              ? "text"
                              : key === "working_schedule"
                                ? "multidate"
                                : "text"
                        }
                      />
                    )
                  )}

                  {[
                    {
                      label: "Tanggapan Jika Proses Ditolak",
                      value: validationData.response_katim,
                      type: "textarea",
                      name: "response_katim",
                    },
                  ].map((inputProps, index) => {
                    return (
                      <DynamicInput
                        key={index}
                        label={inputProps.label}
                        value={inputProps.value}
                        type={inputProps.type}
                        options={inputProps.options}
                        onChange={(value) => {
                          setValidationData((prevState) => ({
                            ...prevState,
                            [inputProps.name]: value,
                          }));
                        }}
                      />
                    );
                  })}
                  <div className="flex sm:flex-row flex-col gap-2">
                    <DynamicButton
                      initialValue={"Setujui dan lanjut ke proses"}
                      type="fill"
                      color={"#ffffff"}
                      className="inline-flex  bg-[#0185FF] text-darkColor"
                      onClick={() => {
                        fetchSetProgress(authApiKey, authToken, "Lanjutkan");
                      }}
                    />
                    <DynamicButton
                      initialValue={"Tolak proses dan selesai"}
                      type="fill"
                      color={"#ffffff"}
                      className="inline-flex  bg-[#FF0000] text-darkColor"
                      onClick={() => {
                        if (validationData?.response_katim === undefined) {
                          toast.error(
                            "Wajib masukan Tanggapan Jika Proses Ditolak",
                            {
                              position: toast.POSITION.TOP_RIGHT,
                            }
                          );
                        } else {
                          checkingFormData(
                            "validation_technique",
                            validationData
                          );
                          fetchSetProgress(authApiKey, authToken, "Ditolak");
                        }
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                  <span className="text-base font-semibold text-center">
                    Menunggu Laporan dari Anggota Tim Teknis
                  </span>
                </div>
              ))}

            <DynamicDetails
              location={"teknologisi"}
              detailData={detailData}
              loading={loading}
            />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex flex-col flex-1">
              <div className="flex flex-col bg-lightColor dark:bg-cardDark p-5 gap-3 items-center rounded-lg">
                <img
                  src={require("../../../assets/image/process.gif")}
                  alt={"processing"}
                  className="object-contain flex w-[20%] min-w-[200px] aspect-square"
                  effect="blur"
                />
                <span className="text-base text-center">
                  Pengajuan Sedang <b>Di Validasi</b> untuk melanjutkan ke tahap
                  proses
                </span>
              </div>
            </div>
            <DynamicDetails
              location={"teknologisi"}
              detailData={detailData}
              loading={loading}
            />
          </div>
        ))}
      {submissionStatus === 5 && (
        <div className="flex flex-col lg:flex-row gap-3">
          <div className={`flex-1 flex flex-col gap-3`}>
            <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              <div className="flex flex-row gap-2 items-center">
                <span className="text-base font-semibold">
                  Status Validasi Teknis :
                </span>
                <div
                  className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor bg-[#FF0000]`}
                >
                  <span className="text-base">Ditolak</span>
                </div>
              </div>
              {Object.entries(validationData).map(([key, value]) => (
                <DynamicShow
                  key={key}
                  location={"teknologisi"}
                  label={
                    key === "team_response"
                      ? "Tanggapan dari Tim"
                      : key === "working_schedule"
                        ? "Jadwal Kerja"
                        : key === "response_katim"
                          ? "Tanggapan dari Ketua Tim"
                          : key
                  }
                  value={value}
                  type={
                    key === "team_response"
                      ? "text"
                      : key === "working_schedule"
                        ? "multidate"
                        : key === "response"
                          ? "html"
                          : "text"
                  }
                />
              ))}
            </div>
          </div>
          <DynamicDetails
            location={"teknologisi"}
            detailData={detailData}
            loading={loading}
          />
        </div>
      )}
    </>
  );
};

export default ValidationStatusTechnique;
