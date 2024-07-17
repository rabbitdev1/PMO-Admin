export const formData = [
  {
    name: "Pengajuan Layanan Pendataan Tenaga Ahli",
    type: "Layanan Sekretariat",
    role: ["op_pmo","kadis",
    "perangkat_daerah",
    "sekretariat",
    "katim_sekretariat",
    "teknis_sekretariat",],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "nama_ahli", label: "Nama Ahli", value: "", type: "text" },
      {
        name: "bidang_keahlian",
        label: "Bidang Keahlian",
        value: "",
        type: "selection",
        options: [
          { value: "ijazah", label: "Ijazah" },
          { value: "sertifikat", label: "Sertifikat" },
        ],
      },
      { name: "pengalaman", label: "Pengalaman", value: "", type: "editor" },
      { name: "job_desk", label: "Job Desk", value: "", type: "editor" },
      {
        name: "timeline_kontrak",
        label: "Timeline Kontrak",
        value: {
          startDate: null,
          endDate: null,
        },
        type: "multi_date",
        visible: true,
      },
      {
        name: "terdaftar_lpse",
        label: "Terdaftar di LPSE",
        value: "",
        type: "radio_button",
        options: [
          { value: "ya", label: "Ya" },
          { value: "tidak", label: "Tidak" },
        ],
      },
      {
        name: "nilai_kontrak",
        label: "Nilai Kontrak",
        value: "",
        type: "file_upload",
        noted: "File berekstensi: pdf, xlsx, docs"
      },
    ],
  },
  
];

const getPendataanTenagaAhliValidateTechnique = (inputLocal) => [
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
const getPendaftaranMagangValidateTechnique = (inputLocal) => [
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
const getMagangProcess = (inputLocal) => [
  {
    label: "Unggah Dokumen Laporan Hasil",
    value: inputLocal.upload_dokumen_hasil,
    type: "file_upload",
    name: "upload_dokumen_hasil",
  },
];
const getPendataanTenagaAhliProcess = (inputLocal) => [
  {
    label: "Unggah Dokumen Laporan Hasil Pendataan Ahli",
    value: inputLocal.upload_dokumen_hasil,
    type: "file_upload",
    name: "upload_dokumen_hasil",
    noted: "File berekstensi: pdf, xlsx, docs"
  },
];
const getPendataanTenagaAhliFinish = (finishData) => [
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
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: "response",
  },
];
const getMagangFinish = (finishData) => [
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
    noted: "File berekstensi: pdf, xlsx, docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: "response",
  },
];

export { getPendataanTenagaAhliFinish,getMagangProcess,getPendataanTenagaAhliProcess, getMagangFinish ,getPendataanTenagaAhliValidateTechnique,getPendaftaranMagangValidateTechnique};
