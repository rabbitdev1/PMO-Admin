export const formData = [
  {
    name: "Layanan ZOOM",
    type: "Pengajuan Layanan Teknologi dan Sistem Informasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "teknis_aplikasi",
      "katim_aplikasi"
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {name: "reason", label: "Alasan Dibutuhkan", value: "", type: "editor"},
      { name: "period", label: "Periode Jangka Waktu", value: "", type: "multi_date" },
    ],
  },
  {
    name: "Permohonan Liputan",
    type: "Pengajuan Layanan Teknologi dan Sistem Informasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "katim_aplikasi",
      "teknis_aplikasi"
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "reason", label: "Alasan Pengajuan", value: "", type: "editor" },
      { name: "location_implementation", label: "Tempat Pelaksanaan", value: "", type: "editor"},
      { name: "period", label: "Periode Jangka Waktu", value: "", type: "multi_date" },

    ],
  },
]

const getZoomProcess = (inputLocal) => [
  {
    label: "Upload Dokumen Hasil Pengajuan Permohonan Zoom",
    value: inputLocal.upload_dokumen_zoom,
    type: "file_upload",
    name: 'upload_dokumen_zoom'
  },
];
const getZoomFinish = (finishData) => [
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


//Permohonan Liputan
const getPermohonanLiputanProcess = (inputLocal) => [
  {
    label: "Upload Dokumen Hasil Pengajuan Permohonan Liputan",
    value: inputLocal.upload_dokumen_liputan,
    type: "file_upload",
    name: 'upload_dokumen_liputan'
  },
];
const getPermohonanLiputanFinish = (finishData) => [
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
  getZoomProcess, getZoomFinish, getPermohonanLiputanProcess, getPermohonanLiputanFinish,
};
