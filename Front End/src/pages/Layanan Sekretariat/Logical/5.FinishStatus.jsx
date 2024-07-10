
import React from "react";
import DynamicShow from "../../../components/common/DynamicShow";
import DynamicDetails from '../DynamicDetails';

const FinishStatus = ({
  submissionStatus,
  validationData,
  finishData,
  validationDataTechnique,
  processData,
  detailData,
  loading,
}) => {
  return (
    submissionStatus >= 7 && (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
          <div className="flex flex-row gap-2 items-center">
            <span className="text-lg font-bold">
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
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-3">
          <div className={`flex-1 flex flex-col gap-3`}>
            <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              <div className="flex flex-row gap-2 items-center">
                <span className="text-lg font-bold">Status Validasi Dokumen :</span>
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
                  location={'sekretariat'}
                  value={validationData?.response}
                  type={"html"}
                />
              }
            </div>
            <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              <div className="flex flex-row gap-2 items-center">
                <span className='text-lg font-bold'>Tahapan Validasi Kelengkapan</span>
              </div>
              {Object.entries(validationDataTechnique).map(([key, value]) => (
                <DynamicShow
                  key={key}
                  label={key === "team_response" ? "Tanggapan dari Tim Teknis" :
                    key === "working_schedule" ? "Jadwal Kerja" : key}
                  value={value}
                  location={'sekretariat'}
                  type={
                    key === "file_scema_integration" ||
                      key === "dokumen_pembangunan" ||
                      key === "dokumen_nda" ? 'pdf' :
                      key === "working_schedule" ? "multi_date" : 'text'}
                />
              ))}
            </div>
            <div className="flex flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              <div className="flex flex-row gap-2 items-center">
                <span className='text-lg font-bold'>Tahapan Proses Pengajuan</span>
              </div>
              {Object.entries(processData).map(([key, value]) => (
                <DynamicShow
                  key={key}
                  label={
                    key === "upload_dokumen_hasil"
                      ? "Dokumen Laporan Hasil"
                      : key
                  }
                  value={value}
                  location={"sekretariat"}
                  type={
                    key === "upload_dokumen_hasil"
                      ? "pdf"
                      : "text"
                  }
                />
              ))}
            </div>
            <div className="flex flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              <div className="flex flex-row gap-2 items-center">
                <span className='text-lg font-bold'>Tahapan Proses Akhir</span>
              </div>
              {Object.entries(finishData).map(([key, value]) => (
                <DynamicShow
                  key={key}
                  label={
                    key === "response" ? "Tanggapan Ketua Tim Pokja" : key === "file_submission" ? "File Surat Pemberitahuan untuk OPD" : key === "submission_status" ? "Status Pengajuan" : key
                  }
                  value={value}
                  location={"sekretariat"}
                  type={
                    key === "file_submission" ? "pdf"
                      : "text"
                  }
                />
              ))}
            </div>
          </div>
          <DynamicDetails
            location={'sekretariat'}
            detailData={detailData}
            loading={loading}
          />
        </div>
      </div>
    )
  );
};

export default FinishStatus;
