export const formData = [
  {
    name: "Pengajuan Surat Keputusan",
    type: "Pengajuan Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi",
    role: [
      "op_pmo","kadis",
      "perangkat_daerah",
      'katim_perencanaan', 'kabid_perencanaan', 'teknis_perencanaan'
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { 
        name: "app_name", label: "Nama Aplikasi", value: "", type: "selection",
        options: [
          { value: "Aplikasi 1", label: "Aplikasi 1" },
        ] 
      },
      { name: "app_desc", label: "Deskripsi Aplikasi", value: "", type: "editor" },
      { name: "needed_data", label: "Data yang dibutuhkan", value: "", type: "editor" },
      { name: "integration", label: "Tujuan Integrasi", value: "", type: "editor" },
    ],
  },
  {
    name: "Pengajuan Permohonan Perwal dan Kepwal TIK",
    type: "Pengajuan Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi",
    role: [
      "op_pmo","kadis",
      "perangkat_daerah",
      'katim_perencanaan', 'kabid_perencanaan', 'teknis_perencanaan'
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "bidang", label: "Bidang", value: "", type: "text" },
      { name: "jenis_kebijakan", label: "Jenis Kebijakan", value: "", type: "selection",
        options: [
          { value: "perwal", label: "Perwal" },
          { value: "kepwal", label: "Kepwal" },
        ]
      },
      { name: "ruang_lingkup", label: "Ruang Lingkup", value: "", type: "editor" },
      { name: "draft_perwal", label: "Draft Perwal", value: "", type: "file_upload", noted: "File berekstensi: pdf,xlsx,docs"},
      { name: "reason", label: "Alasan dibutuhkan", value: "", type: "editor" },
    ],
  },
];



const getPenyusunanKebijakanProcess = (inputLocal) => [
  {
    label: "Unggah Dokumen Kebijakan",
    value: inputLocal.upload_dokumen_kebijakan,
    type: "file_upload",
    name: "upload_dokumen_kebijakan",
    noted: "File berekstensi: pdf,xlsx,docs"
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
    label: "Unggah Surat Pemberitahuan untuk OPD",
    value: finishData.file_submission,
    name: "file_submission",
    type: "file_upload",
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: "response",
  },
];

const getPerwalProcess = (inputLocal) => [
  {
    label: "Unggah Dokumen Laporan Permohonan Perwal dan Kepwal",
    value: inputLocal.upload_dokumen_laporan_perkep,
    type: "file_upload",
    name: "upload_dokumen_laporan_perkep",
    noted: "File berekstensi: pdf,xlsx,docs"
  },
];
const getPerwalFinish = (finishData) => [
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
    label: "Unggah Surat Pemberitahuan untuk OPD",
    value: finishData.file_submission,
    name: "file_submission",
    type: "file_upload",
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: "response",
  },
];


export {
  getPenyusunanKebijakanProcess, getPenyusunanKebijakanFinish, getPerwalProcess, getPerwalFinish, 
};
