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
                  key === "file_scema_integration" ? "File Dokumen Hasil Integrasi" :
                  key === "upload_dokumen_laporan_modul_tte" ? "Surat Pengesahan" :
                  key === "upload_dokumen_laporan_pembuatan_akun" ? "Upload Dokumen Laporan Hasil Pembuatan Akun" :
                  key === "upload_surat_pengesahan" ? "Surat Pengesahan" :
                  key === "upload_hasil_pengujian" ? "Dokumen Laporan Hasil Pengujian" :
                  key === "upload_hasil_penetrasi" ? "Dokumen Hasil Uji Penetrasi" :
                  key === "file_scema_integration" ? "File Skema Integrasi" : 
                  key
              }
              value={value}
              location={"aplikasi"}
              type={
                  key === "file_scema_integration" || "upload_dokumen_laporan_modul_tte" || 
                  "upload_dokumen_laporan_pembuatan_akun" || "upload_surat_pengesahan" ||
                  "upload_hasil_pengujian" || "upload_hasil_penetrasi"
                      ? "pdf"
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
                location={"aplikasi"}
                type={"pdf"}
              />
            )}
          </div>
        </div>
        <DynamicDetails
          location={'aplikasi'}
          detailData={detailData}
          loading={loading}
        />
      </div>
    )
  );
};

export default FinishStatus;
