import React from "react";
import { toast } from "react-toastify";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicInput from "../../../components/common/DynamicInput";
import DynamicShow from "../../../components/common/DynamicShow";
import DynamicDetails from '../DynamicDetails';

const ValidationStatus = ({
  submissionStatus,
  validationData,
  authProfile,
  setValidationData,
  checkingFormData,
  detailData,
  loading,
}) => {
  return (
    <>
      {submissionStatus === 2 && (JSON.parse(authProfile)?.role === "op_pmo" ?
        <div className="flex flex-col gap-3">
          <div className="flex flex-col bg-[#F5CF08]/10 border-1 border-[#F5CF08] text-[#F5CF08] p-3 gap-3 items-center rounded-lg">
            <span className="text-base font-semibold text-center">
              Cek Kelengkapan Berkas
            </span>
          </div>
          <DynamicDetails location={"sistem-virtual"} detailData={detailData} loading={loading} />
          <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <span className="text-lg font-bold">Status Validasi Dokumen</span>
            {[
              {
                value: validationData.status_validation,
                type: "radio_button",
                options: [
                  { value: "1", label: "Disetujui" },
                  { value: "0", label: "Ditolak" },
                ],
                name: "status_validation",
              },
              {
                label: "Tanggapan",
                value: validationData.response,
                type: "textarea",
                name: "response",
              },
            ].map((inputProps, index) => {
              if (
                inputProps.name === "response" &&
                (validationData.status_validation === "1" ||
                  validationData.status_validation === undefined)
              ) {
                return null;
              }

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
            <DynamicButton
              initialValue={"Lanjutkan"}
              type="fill"
              color={"#ffffff"}
              className="inline-flex  bg-[#0185FF] text-darkColor"
              onClick={() => {
                if (
                  validationData.status_validation === "0" &&
                  validationData?.response === undefined
                ) {
                  toast.error("Wajib masukan Tanggapan", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                } else {
                  checkingFormData("validation", validationData);
                }
              }}
            />
          </div>
        </div>
        :
        <div className='flex flex-col lg:flex-row gap-3'>
          <div className="flex flex-col flex-1">
            <div className="flex flex-col bg-lightColor dark:bg-cardDark p-5 gap-3 items-center rounded-lg">
              <img
                src={require('../../../assets/image/process.gif')}
                alt={'processing'}
                className="object-contain flex w-[20%] min-w-[200px] aspect-square"
                effect="blur"
              />
              <span className="text-base text-center">
                Pengajuan Sedang <b>Di Validasi</b> Oleh pihak DISKOMINFO Kota
                Bandung
              </span>
            </div>
          </div>
          <DynamicDetails location={"sistem-virtual"} detailData={detailData} loading={loading} />

        </div>
      )}
      {submissionStatus === 3 && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <div className="flex flex-row gap-2 items-center">
              <span className="text-lg font-bold">Status Validasi Dokumen :</span>
              <div
                className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor bg-[#FF0000]`}
              >
                <span className="text-base">
                  {validationData.status_validation}
                </span>
              </div>
            </div>
          </div>
          <div className='flex  flex-col lg:flex-row gap-3'>
            <div className={`flex-1 flex flex-col gap-3`}>
              <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              <span className='text-lg font-bold'>Tahapan Validasi Dokumen</span>
                <DynamicShow
                  label={"Tanggapan"}
                  location={'sistem-virtual'}
                  value={validationData?.response}
                  type={"textarea"}
                />
              </div>
            </div>
            <DynamicDetails location={"sistem-virtual"} detailData={detailData} loading={loading} />

          </div>
        </div>
      )}
    </>
  );
};

export default ValidationStatus;
