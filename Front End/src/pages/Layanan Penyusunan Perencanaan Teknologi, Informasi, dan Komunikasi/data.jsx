export const formData = [
  {
    name: "Pengajuan Penyusunan Kebijakan",
    type: "Pengajuan Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "teknis_aplikasi",
      "katim_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "app_name", label: "Nama Aplikasi", value: "", type: "selection",
      options: [
        { value: "15", label: "15 Mbps" },
        { value: "20", label: "20 Mbps" },
        { value: "25", label: "25 Mbps" },
        { value: "30", label: "30 Mbps" },
      ]
       },
      { name: "app_desc", label: "Deskripsi Aplikasi", value: "", type: "editor" },
      { name: "needed_data", label: "Data yang dibutuhkan", value: "", type: "editor" },
      { name: "integration", label: "Tujuan Integrasi", value: "", type: "editor" },
    ],
  },
];



const getPenyusunanKebijakanProcess = (inputLocal) => [
  {
    label: "Upload Foto Alat Sebelum di Relokasi",
    value: inputLocal.upload_foto_alat_sebelum_di_relokasi,
    type: "image_upload",
    name: "upload_foto_alat_sebelum_di_relokasi",
  },
  {
    label: "Upload Foto Alat Sesudah di Relokasi",
    value: inputLocal.upload_foto_alat_sesudah_di_relokasi,
    type: "image_upload",
    name: "upload_foto_alat_sesudah_di_relokasi",
  },
];
const getPenyusunanKebijakanFinish = (finishData) => [
  {
    label: "Status Pengajuan",
    value: finishData.submission_status,
    name: "submission_status",
    type: "radio_button",
    options: [
      { value: "1", label: "Menyetujui" },
      { value: "0", label: "Tidak Menyetujui" },
    ],
  },
  {
    label: "Upload Surat Pemberitahuan untuk OPD",
    value: finishData.file_submission,
    name: "file_submission",
    type: "file_upload",
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: "response",
  },
];

export {
  getPenyusunanKebijakanProcess, getPenyusunanKebijakanFinish
};
