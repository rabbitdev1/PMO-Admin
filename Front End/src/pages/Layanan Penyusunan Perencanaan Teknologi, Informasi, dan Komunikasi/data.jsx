export const formData = [
  {
    name: "Pengajuan Surat Keputusan",
    type: "Pengajuan Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      'katim_perencanaan', 'kabid_perencanaan', 'teknis_perencanaan'
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "app_name", label: "Nama Aplikasi", value: "", type: "selection",
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
  {
    name: "Pengajuan Permohonan Perwal dan Kepwal TIK",
    type: "Pengajuan Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "teknis_aplikasi",
      "katim_aplikasi",
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
      { name: "draft_perwal", label: "Draft Perwal", value: "", type: "file_upload" },
      { name: "reason", label: "Alasan dibutuhkan", value: "", type: "editor" },
    ],
  },
  // {
  //   name: "Pendataan Tenaga Ahli",
  //   type: "Pengajuan Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi",
  //   role: [
  //     "op_pmo",
  //     "perangkat_daerah",
  //     "teknis_aplikasi",
  //     "katim_aplikasi",
  //   ],
  //   fields: [
  //     { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
  //     { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
  //     { name: "nama_ahli", label: "Nama Ahli", value: "", type: "text" },
  //     { name: "bidang_keahlian", label: "Bidang Keahlian", value: "", type: "selection",
  //       options: [
  //         { value: "ijazah", label: "Ijazah" },
  //         { value: "sertifikat", label: "Sertifikat" },
  //       ]
  //     },
  //     { name: "pengalaman", label: "Pengalaman", value: "", type: "editor"},
  //     { name: "job_desk", label: "Job Desk", value: "", type: "editor" },
  //     { name: "timeline_kontrak", label: "Timeline Kontrak", value: {
  //       startDate: null,
  //       endDate: null,
  //     },
  //     type: "date",
  //     visible: true, },
  //     { name: "terdaftar_lpse", label: "Terdaftar di LPSE", value: "", type: "radio_button",
  //     options: [
  //       { value: "ya", label: "Ya" },
  //       { value: "tidak", label: "Tidak" },
  //     ], },
  //     { name: "nilai_kontrak", label: "Nilai Kontrak", value: "", type: "file_upload"},
  //   ],
  // }
];



const getPenyusunanKebijakanProcess = (inputLocal) => [
  {
    label: "Unggah Dokumen Kebijakan",
    value: inputLocal.upload_dokumen_kebijakan,
    type: "file_upload",
    name: "upload_dokumen_kebijakan",
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
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: "response",
  },
];

const getAhliProcess = (inputLocal) => [
  {
    label: "Unggah Dokumen Pendataan Tenaga Ahli",
    value: inputLocal.upload_dokumen_ahli,
    type: "file_upload",
    name: "upload_dokumen_ahli",
  },
];
const getAhliFinish = (finishData) => [
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

export {
  getPenyusunanKebijakanProcess, getPenyusunanKebijakanFinish, getPerwalProcess, getPerwalFinish, getAhliProcess, getAhliFinish
};
