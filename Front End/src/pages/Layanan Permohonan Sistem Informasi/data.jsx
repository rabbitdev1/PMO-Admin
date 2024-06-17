
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
