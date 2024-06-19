export const formData = [
  {
    name: "Pengajuan Layanan Pendampingan Pengolahan dan Analisis Data",
    type: "Pengajuan Layanan Manajemen Infrastruktur Teknologi Informasi dan Komunikasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "katim_aplikasi",
      "teknis_aplikasi"
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "file_data", label: "File Data", value: "", type: "file_upload" },
      { name: "surat_permohonan", label: "Surat Permohonan", value: "", type: "file_upload" },
      { name: "reason", label: "Alasan Pengajuan", value: "", type: "editor" },
    ],
  },
  {
    name: "Pengajuan Layanan Produksi Data dari Situs Web",
    type: "Pengajuan Layanan Manajemen Infrastruktur Teknologi Informasi dan Komunikasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "katim_aplikasi",
      "teknis_aplikasi"
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },

      { name: "surat_permohonan", label: "Surat Permohonan", value: "", type: "file_upload" },
      { name: "alamat_website", label: "Alamat Website", value: "", type: "text" },
      { name: "needed_data", label: "Data yang dibutuhkan", value: "", type: "editor" },
      { name: "reason", label: "Alasan Pengajuan", value: "", type: "editor" },
    ],
  },
]

const getPendampinganPengolahanAnalisisDataProcess = (inputLocal) => [
  {
    label: "Upload Laporan Hasil Pengolahan dan Analisa Data",
    value: inputLocal.upload_dokumen_hasil_analisa,
    type: "file_upload",
    name: 'upload_dokumen_hasil_analisa'
  },
];
const getPendampinganPengolahanAnalisisDataFinish = (finishData) => [
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

const getProduksiDataSitusWebProcess = (inputLocal) => [
  {
    label: "Upload File Data Valid",
    value: inputLocal.upload_file_data_valid,
    type: "file_upload",
    name: 'upload_file_data_valid'
  },
];
const getProduksiDataSitusWebProcessKatim = (inputLocal) => [
  {
    label: "Upload Laporan Hasil Analisa Data",
    value: inputLocal.upload_hasil_analisa,
    type: "file_upload",
    name: 'upload_hasil_analisa'
  },
];

const getProduksiDataSitusWebFinish = (finishData) => [
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
  getPendampinganPengolahanAnalisisDataFinish, getPendampinganPengolahanAnalisisDataProcess, getProduksiDataSitusWebFinish, getProduksiDataSitusWebProcess, getProduksiDataSitusWebProcessKatim, getUserAccountSIProcess, getUserAccountSIFinish
};
