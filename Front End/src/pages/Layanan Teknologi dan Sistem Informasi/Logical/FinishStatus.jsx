import React from "react";
import DynamicShow from "../../../components/common/DynamicShow";
import DynamicDetails from '../../../components/ui/DynamicDetails';

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
                  key === "upload_dokumen_hasil_integrasi"
                    ? "Dokumen Hasil Integrasi"
                    : "upload_dokumen_laporan_modul_tte"
                    ? "Surat Pengesahan"
                    : "upload_dokumen_laporan_pembuatan_akun"
                    ? "Dokumen Laporan Hasil Pembuatan Akun"
                    : key
                }
                value={value}
                location={"teknologisi"}
                type={
                  key === "upload_dokumen_hasil_integrasi" || "upload_dokumen_laporan_modul_tte" || "upload_dokumen_laporan_pembuatan_akun" ? "pdf"
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
                location={"teknologisi"}
                type={"pdf"}
              />
            )}
          </div>
        </div>
        <DynamicDetails

location={'teknologisi'}
          detailData={detailData}
          loading={loading}
        />
      </div>
    )
  );
};

export default FinishStatus;
