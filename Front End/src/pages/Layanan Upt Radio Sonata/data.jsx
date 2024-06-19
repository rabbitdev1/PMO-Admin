export const formData = [
  {
    name: "Permohonan Podcast",
    type: "Pengajuan Layanan Radio Sonata",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "katim_upt_radio",
      "kabid_upt_radio",
      "teknis_upt_radio",
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "needed_reason", label: "Alasan Dibutuhkan", value: "", type: "editor"},
      { name: "location_implementation", label: "Tempat Pelaksanaan", value: "", type: "editor"},
      { name: "period", label: "Periode Jangka Waktu", value: "", type: "date"}

    ],
  },
]

const getPodcastProcess = (inputLocal) => [
  {
    label: "Upload Dokumen Pengajuan Permohonan Podcast",
    value: inputLocal.file_pengajuan_podcast,
    type: "file_upload",
    name: 'file_pengajuan_podcast'
  },
];
const getPodcastFinish = (finishData) => [
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
  getPodcastProcess, getPodcastFinish,
};
