export const formData = [
  {
    name: "Pengajuan Layanan ZOOM",
    type: "Layanan Siaran dan Sistem Virtual",
    role: [
      "op_pmo", "kadis",
      "perangkat_daerah",
      "kabid_desiminasi",
      "katim_desiminasi",
      "teknis_desiminasi"
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "file_pengajuan_zoom",
        label: "Dokumen Pengajuan Zoom",
        value: "",
        type: "file_upload",
        noted: "File berekstensi: pdf, xlsx, docs"
      },
      { name: "reason", label: "Alasan Dibutuhkan", value: "", type: "editor" },
    ],
  },
  {
    name: "Pengajuan Permohonan Liputan",
    type: "Layanan Siaran dan Sistem Virtual",
    role: [
      "op_pmo", "kadis",
      "perangkat_daerah",
      "kabid_desiminasi",
      "katim_desiminasi",
      "teknis_desiminasi"
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "type_activity", label: "Jenis Kegiatan", value: "", type: "text" },
      { name: "location_implementation", label: "Tempat Pelaksanaan", value: "", type: "editor" },
      { name: "period", label: "Waktu", value: "", type: "multi_date" },
      { name: "needed_tools", label: "Kebutuhan Alat", value: "", type: "editor" },
      {
        name: "live_streaming",
        label: "Live Streaming",
        value: "",
        type: "radio_button",
        options: [
          { value: "Iya", label: "Iya" },
          { value: "Tidak", label: "Tidak" },
        ],
      },
      { name: "reason", label: "Alasan Pengajuan", value: "", type: "editor" },
    ],
  },
  {
    name: "Pengajuan Permohonan Podcast",
    type: "Layanan Siaran dan Sistem Virtual",
    role: [
      "op_pmo", "kadis",
      "perangkat_daerah",
      "kabid_desiminasi",
      "katim_desiminasi",
      "teknis_desiminasi"
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "type_activity", label: "Jenis Kegiatan", value: "", type: "text" },
      { name: "location_implementation", label: "Tempat Pelaksanaan", value: "", type: "editor" },
      { name: "period", label: "Waktu", value: "", type: "multi_date" },
      { name: "needed_tools", label: "Kebutuhan Alat", value: "", type: "editor" },
      { name: "speaker", label: "Narasumber/Pembicara", value: "", type: "text" },
      { name: "topic", label: "Tema/Topik", value: "", type: "text" },
      { name: "reason", label: "Alasan Pengajuan", value: "", type: "editor" },
    ],
  },
]

const getZoomValidateTechnique = (inputLocal) => [
  {
    label: "Tanggapan Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: "team_response",
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "date",
    name: "working_schedule",
  },
];

const getPermohonanLiputanValidateTechnique = (inputLocal) => [
  {
    label: "Tanggapan Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: "team_response",
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "date",
    name: "working_schedule",
  },
];

const getPodcastValidateTechnique = (inputLocal) => [
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

const getZoomProcess = (inputLocal) => [
  {
    label: "Upload Dokumen Hasil Pengajuan Permohonan Zoom",
    value: inputLocal.upload_dokumen_zoom,
    type: "file_upload",
    name: 'upload_dokumen_zoom',
    noted: "File berekstensi: pdf, xlsx, docs"
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
    type: "file_upload",
    noted: "File berekstensi: pdf, xlsx, docs"
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
    name: 'upload_dokumen_liputan',
    noted: "File berekstensi: pdf, xlsx, docs"
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
    type: "file_upload",
    noted: "File berekstensi: pdf, xlsx, docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];

const getPodcastProcess = (inputLocal) => [
  {
    label: "Upload Dokumen Hasil Pengajuan Permohonan Podcast",
    value: inputLocal.file_pengajuan_podcast,
    type: "file_upload",
    name: 'file_pengajuan_podcast',
    noted: "File berekstensi: pdf, xlsx, docs"
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
    type: "file_upload",
    noted: "File berekstensi: pdf, xlsx, docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];



export {
  getZoomValidateTechnique, getPermohonanLiputanValidateTechnique, getPodcastValidateTechnique,
  getZoomProcess, getZoomFinish, getPermohonanLiputanProcess, getPermohonanLiputanFinish, getPodcastProcess, getPodcastFinish
};
