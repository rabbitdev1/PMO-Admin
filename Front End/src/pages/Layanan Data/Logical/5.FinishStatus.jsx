// import React from "react";
// import DynamicShow from "../../../components/common/DynamicShow";
// import DynamicDetails from '../../../components/ui/DynamicDetails';

// const FinishStatus = ({
//   submissionStatus,
//   finishData,
//   validationData,
//   processData,
//   detailData,
//   loading,
// }) => {
//   return (
//     submissionStatus >= 7 && (
//       <div className="flex flex-col lg:flex-row gap-3">
//         <div className={`flex-1 flex flex-col gap-3`}>
//           <div className="flex flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
//             <div className="flex flex-row gap-2 items-center">
//               <span className="text-base font-semibold">
//                 Status Pengajuan :
//               </span>
//               <div
//                 className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor ${finishData.submission_status === "Menyetujui" ? "bg-[#13C39C]" : "bg-[#FF0000]"}`}
//               >
//                 <span className="text-base">
//                   {finishData.submission_status}
//                 </span>
//               </div>
//             </div>
//             {Object.entries(validationData).map(
//               ([key, value]) =>
//                 key === "working_schedule" && (
//                   <DynamicShow
//                     key={key}
//                     label={key === "working_schedule" ? "Jadwal Kerja" : key}
//                     value={value}
//                     type={"working_schedule" ? "multi_date" : "text"}
//                   />
//                 )
//             )}
//             {Object.entries(processData).map(([key, value]) => (
//               <DynamicShow
//               key={key}
//               label={
//                   key === "upload_dokumen_hasil_analisa"
//                   ? "Dokumen Laporan Hasil Pengolahan dan Analisa Data"
//                   : "upload_file_data_valid"
//                   ? "File Data Valid"
//                   : "upload_dokumen_laporan_pembuatan_akun"
//                   ? "Upload Dokumen Laporan Hasil Pembuatan Akun"
//                   :
//                   key
//               }
//               value={value}
//               location={"layanan-data"}
//               type={
//                   key === "upload_dokumen_hasil_analisa" || "upload_file_data_valid" || "upload_dokumen_laporan_pembuatan_akun"
//                       ? "pdf"
//                       : "text"
//               }
//               />
//             ))}

//             {finishData?.response && (
//               <DynamicShow
//                 label={"Tanggapan"}
//                 value={finishData?.response}
//                 type={"html"}
//               />
//             )}
//             {finishData?.file_upload && (
//               <DynamicShow
//                 label={"File Surat Pemberitahuan untuk OPD"}
//                 value={finishData?.file_upload}
//                 location={"layanan-data"}
//                 type={"pdf"}
//               />
//             )}
//           </div>
//         </div>
//         <DynamicDetails
//           location={'layanan-data'}
//           detailData={detailData}
//           loading={loading}
//         />
//       </div>
//     )
//   );
// };

// export default FinishStatus;
// import React from "react";
// import DynamicShow from "../../../components/common/DynamicShow";
// import DynamicDetails from "../../../components/ui/DynamicDetails";

// const FinishStatus = ({
//   submissionStatus,
//   finishData,
//   validationData,
//   processData,
//   detailData,
//   loading,
// }) => {
//   return (
//     submissionStatus >= 7 && (
//       <div className="flex flex-col lg:flex-row gap-3">
//         <div className={`flex-1 flex flex-col gap-3`}>
//           <div className="flex flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
//             <div className="flex flex-row gap-2 items-center">
//               <span className="text-base font-semibold">
//                 Status Pengajuan :
//               </span>
//               <div
//                 className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor ${finishData.submission_status === "Menyetujui" ? "bg-[#13C39C]" : "bg-[#FF0000]"}`}
//               >
//                 <span className="text-base">
//                   {finishData.submission_status}
//                 </span>
//               </div>
//             </div>
//             {Object.entries(validationData).map(
//               ([key, value]) =>
//                 key === "working_schedule" && (
//                   <DynamicShow
//                     key={key}
//                     label={key === "working_schedule" ? "Jadwal Kerja" : key}
//                     value={value}
//                     type={"working_schedule" ? "multi_date" : "text"}
//                   />
//                 )
//             )}
//             {Object.entries(processData).map(([key, value]) => (
//               <DynamicShow
//                 key={key}
//                 label={
//                   key === "upload_foto_alat_sebelum_di_relokasi"
//                     ? "Foto Alat Sebelum Di Relokasikan"
//                     : key === "upload_foto_alat_sesudah_di_relokasi"
//                       ? "Foto Alat Sesudah Di Relokasikan"
//                       : key === "upload_foto_alat_sebelum_di_tambahkan"
//                         ? "Foto Alat Sebelum Di Tambahkan"
//                         : key === "upload_foto_alat_sesudah_di_tambahkan"
//                           ? "Foto Alat Sesudah Di Tambahkan"
//                           : key === "upload_foto_kegiatan"
//                             ? "Foto Kegiatan"
//                             : key
//                 }
//                 value={value}
//                 location={"layanan-data"}
//                 type={
//                   key === "upload_foto_alat_sebelum_di_relokasi" || key === "upload_foto_alat_sesudah_di_relokasi" || key === "upload_foto_alat_sebelum_di_tambahkan" || key === "upload_foto_alat_sesudah_di_tambahkan" || key === "upload_foto_kegiatan"
//                     ? "images"
//                     : "text"
//                 }
//               />
//             ))}

//             {finishData?.response && (
//               <DynamicShow
//                 label={"Tanggapan"}
//                 value={finishData?.response}
//                 type={"html"}
//               />
//             )}
//             {finishData?.file_upload && (
//               <DynamicShow
//                 label={"File Surat Pemberitahuan untuk OPD"}
//                 value={finishData?.file_upload}
//                 location={"layanan-data"}
//                 type={"pdf"}
//               />
//             )}
//           </div>
//         </div>
//         <DynamicDetails
//           detailData={detailData}
//           loading={loading}
//         />
//       </div>
//     )
//   );
// };

// export default FinishStatus;


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
                  location={'layanan-data'}
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
                  location={'layanan-data'}
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
                                 key === "upload_dokumen_hasil_analisa"
                                 ? "Dokumen Laporan Hasil Pengolahan dan Analisa Data"
                                 : "upload_file_data_valid"
                                 ? "File Data Valid"
                                 : "upload_dokumen_laporan_pembuatan_akun"
                                 ? "Upload Dokumen Laporan Hasil Pembuatan Akun"
                                 :
                                 key
                             }
                             value={value}
                             location={"layanan-data"}
                             type={
                                 key === "upload_dokumen_hasil_analisa" || "upload_file_data_valid" || "upload_dokumen_laporan_pembuatan_akun"
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
                  location={"layanan-data"}
                  type={
                    key === "file_submission" ? "pdf"
                      : "text"
                  }
                />
              ))}
            </div>
          </div>
          <DynamicDetails
            location={'layanan-data'}
            detailData={detailData}
            loading={loading}
          />
        </div>
      </div>
    )
  );
};

export default FinishStatus;
