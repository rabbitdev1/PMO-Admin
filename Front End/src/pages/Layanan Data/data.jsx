export const formData = [
  {
    name: "Pengajuan Layanan Pendampingan Pengolahan dan Analisis Data",
    type: "Layanan Data",
    role: [
      "op_pmo","kadis",
      "perangkat_daerah",
      "kabid_data",
      "katim_data",
      "teknis_data"
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel", },
      {
        name: "file_data", label: "File Data", value: "", type: "file_upload", noted:
          "File berekstensi: pdf, xlsx, docs"
      },
      {
        name: "surat_permohonan", label: "Surat Permohonan", value: "", type: "file_upload", noted:
          "File berekstensi: pdf, xlsx, docs"
      },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
    ],
  },
  {
    name: "Pengajuan Layanan Produksi Data dari Situs Web",
    type: "Layanan Data",
    role: [
      "op_pmo","kadis",
      "perangkat_daerah",
      "kabid_data",
      "katim_data",
      "teknis_data"
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "surat_permohonan", label: "Surat Permohonan", value: "", type: "file_upload", noted:
          "File berekstensi: pdf, xlsx, docs"
      },
      {
        name: "alamat_website", label: "Alamat Website", value: "", type: "text", noted:
          "Contoh: www.example.go.id"
      },
      { name: "needed_data", label: "Data yang dibutuhkan", value: "", type: "editor" },
      { name: "reason", label: "Alasan Pengajuan", value: "", type: "editor" },
    ],
  },
]

const getPendampinganPengolahanAnalisisDataValidateTechnique = (inputLocal) => [
  {
    label: "Tanggapan Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: 'team_response',
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "date",
    name: 'working_schedule',
  },
];

const getProduksiDataSitusWebValidateTechnique = (inputLocal) => [
  {
    label: "Tanggapan Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: 'team_response',
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "multi_date",
    name: 'working_schedule',
  },
];

const getPendampinganPengolahanAnalisisDataProcess = (inputLocal) => [
  {
    label: "Unggah Laporan Hasil Pengolahan dan Analisa Data",
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
    label: "Unggah Surat Pemberitahuan untuk OPD",
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
    label: "Unggah File Data Valid",
    value: inputLocal.upload_file_data_valid,
    type: "file_upload",
    name: 'upload_file_data_valid'
  },
];
const getProduksiDataSitusWebProcessKatim = (inputLocal) => [
  {
    label: "Unggah Laporan Hasil Analisa Data",
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
    label: "Unggah Surat Pemberitahuan untuk OPD",
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
  getPendampinganPengolahanAnalisisDataFinish, getPendampinganPengolahanAnalisisDataProcess, getProduksiDataSitusWebFinish, getProduksiDataSitusWebProcess, getProduksiDataSitusWebProcessKatim, 
  getPendampinganPengolahanAnalisisDataValidateTechnique,getProduksiDataSitusWebValidateTechnique
};
