
export const formData =[
  {
    name: "Rekomendasi Sistem Informasi",
    type: "Pengajuan Layanan Permohonan Sistem Informasi",
    role: [
      'op_pmo',
      'perangkat_daerah',
      'katim_perencanaan',
      'kabid_perencanaan',
      'katim_aplikasi',
      'kabid_aplikasi',
      'kadis'
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "title_kak", label: "Judul KAK", value: "", type: "text" },
      { name: "name_PPK", label: "Nama PPK", value: "", type: "text" },
      { name: "besaran_anggaran", label: "Besaran Anggaran", value: "", type: "text" },
      { name: "anggaran_attachment", label: "Sumber Anggaran", value: "", type: "text" },
      { name: "lingkup_job", label: "Lingkup Pekerjaan", value: "", type: "text" },
      { name: "number_of_people_required", label: "Jumlah Tenaga yang di butuhkan", value: "", type: "text" },
      { name: "skpd_request_letter", label: "Surat Permohonan SKPD", value: "", type: "file_upload" },
    ],
  },
]
// Integrasi
const getIntergasiSIProcess = (inputLocal) => [
  {
    label: "Upload File Hasil Integrasi",
    value: inputLocal.upload_dokumen_hasil_integrasi,
    type: "file_upload",
    name: 'upload_dokumen_hasil_integrasi'
  },
];
const getIntergasiSIFinish = (finishData) => [
  {
    label: "Status Pengajuan",
    value: finishData.submission_status,
    name: "submission_status",
    type: "radio_button",
    options: [
      { value: "1", label: "Menyetujui" },
      { value: "0", label: "Tidak Menyetujui" }
    ]
  },
  {
    label: "Upload Surat Pemberitahuan untuk OPD",
    value: finishData.file_submission,
    name: 'file_submission',
    type: "file_upload"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];

// Penerapan Modul TTE
const getModulTTEProcess = (inputLocal) => [
  {
    label: "Upload Surat Pengesahan",
    value: inputLocal.upload_dokumen_laporan_modul_tte,
    type: "file_upload",
    name: 'upload_dokumen_laporan_modul_tte'
  },
];

const getModulTTEFinish = (finishData) => [
  {
    label: "Status Pengajuan",
    value: finishData.submission_status,
    name: "submission_status",
    type: "radio_button",
    options: [
      { value: "1", label: "Menyetujui" },
      { value: "0", label: "Tidak Menyetujui" }
    ]
  },
  {
    label: "Upload Surat Pemberitahuan untuk OPD",
    value: finishData.file_submission,
    name: 'file_submission',
    type: "file_upload"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];

// User Account SI
const getUserAccountSIProcess = (inputLocal) => [
  {
    label: "Upload Dokumen Laporan Hasil Pembuatan Akun",
    value: inputLocal.upload_dokumen_laporan_pembuatan_akun,
    type: "file_upload",
    name: 'upload_dokumen_laporan_pembuatan_akun'
  },
];

const getUserAccountSIFinish = (finishData) => [
  {
    label: "Status Pengajuan",
    value: finishData.submission_status,
    name: "submission_status",
    type: "radio_button",
    options: [
      { value: "1", label: "Menyetujui" },
      { value: "0", label: "Tidak Menyetujui" }
    ]
  },
  {
    label: "Upload Surat Pemberitahuan untuk OPD",
    value: finishData.file_submission,
    name: 'file_submission',
    type: "file_upload"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];


export {
  getIntergasiSIProcess, getIntergasiSIFinish, getModulTTEProcess, getModulTTEFinish, getUserAccountSIProcess, getUserAccountSIFinish
};
