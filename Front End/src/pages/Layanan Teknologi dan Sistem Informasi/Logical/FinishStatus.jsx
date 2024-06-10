import React from "react";
import DynamicShow from "../../../components/common/DynamicShow";
import DynamicDetails from "../../../components/ui/DynamicDetails";

const FinishStatus = ({
  submissionStatus,
  finishData,
  validationData,
  processData,
  detailData,
  loading,
}) => {
  return (
    submissionStatus >= 7 && (
      <div className="flex flex-col lg:flex-row gap-3">
        <div className={`flex-1 flex flex-col gap-3`}>
          <div className="flex flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <div className="flex flex-row gap-2 items-center">
              <span className="text-base font-semibold">
                Status Pengajuan :
              </span>
              <div
                className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor ${finishData.submission_status === "Menyetujui" ? "bg-[#13C39C]" : "bg-[#FF0000]"}`}
              >
                <span className="text-base">
                  {finishData.submission_status}
                </span>
              </div>
            </div>
            {Object.entries(validationData).map(
              ([key, value]) =>
                key === "working_schedule" && (
                  <DynamicShow
                    key={key}
                    label={key === "working_schedule" ? "Jadwal Kerja" : key}
                    value={value}
                    type={"working_schedule" ? "multidate" : "text"}
                  />
                )
            )}
            {Object.entries(processData).map(([key, value]) => (
              <DynamicShow
                key={key}
                label={
                  key === "upload_foto_alat_sebelum_di_relokasi"
                    ? "Foto Alat Sebelum Di Relokasikan"
                    : key === "upload_foto_alat_sesudah_di_relokasi"
                      ? "Foto Alat Sesudah Di Relokasikan"
                      : key === "upload_foto_alat_sebelum_di_tambahkan"
                        ? "Foto Alat Sebelum Di Tambahkan"
                        : key === "upload_foto_alat_sesudah_di_tambahkan"
                          ? "Foto Alat Sesudah Di Tambahkan"
                          : key === "upload_foto_kegiatan"
                            ? "Foto Kegiatan"
                            : key
                }
                value={value}
                location={"teknologi sistem informasi"}
                type={
                  key === "upload_foto_alat_sebelum_di_relokasi" || key === "upload_foto_alat_sesudah_di_relokasi" || key === "upload_foto_alat_sebelum_di_tambahkan" || key === "upload_foto_alat_sesudah_di_tambahkan" || key === "upload_foto_kegiatan"
                    ? "images"
                    : "text"
                }
              />
            ))}

            {finishData?.response && (
              <DynamicShow
                label={"Tanggapan"}
                value={finishData?.response}
                type={"html"}
              />
            )}
            {finishData?.file_upload && (
              <DynamicShow
                label={"File Surat Pemberitahuan untuk OPD"}
                value={finishData?.file_upload}
                location={"teknologi sistem informasi"}
                type={"pdf"}
              />
            )}
          </div>
        </div>
        <DynamicDetails
          detailData={detailData}
          loading={loading}
        />
      </div>
    )
  );
};

export default FinishStatus;
