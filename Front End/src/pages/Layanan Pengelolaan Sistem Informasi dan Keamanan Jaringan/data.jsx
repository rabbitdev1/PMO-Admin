export const formData = [
  {
    name: "Pengajuan Integrasi Sistem Informasi",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo","kadis",
      "perangkat_daerah",
      "kabid_aplikasi",
      "katim_aplikasi",
      "teknis_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Namq PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "app_name",
        label: "Nama Aplikasi",
        value: [],
        type: "selection",
        options: []
      },
      {
        name: "app_desc",
        label: "Deskripsi Aplikasi",
        value: "",
        type: "editor",
      },
      {
        name: "needed_data",
        label: "Data Yang di Butuhkan",
        value: "",
        type: "editor",
      },
      {
        name: "integration",
        label: "Tujuan Integrasi",
        value: "",
        type: "editor",
      },
    ],
  },
  {
    name: "Pengajuan Penerapan Modul TTE",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo","kadis",
      "perangkat_daerah",
      "kabid_aplikasi",
      "katim_aplikasi",
      "teknis_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "app_name",
        label: "Nama Aplikasi",
        value: [],
        type: "selection",
        options: []
      },
      {
        name: "app_desc",
        label: "Deskripsi Aplikasi",
        value: "",
        type: "editor",
      },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
      {
        name: "file_process_bisiness",
        label: "Dokumen Proses Bisnis",
        value: "",
        type: "file_upload",
        noted: "File berekstensi: pdf,xlsx,docs"
      },
      {
        name: "period",
        label: "Jadwal Penerapan",
        value:"",
        type: "date",
        visible: true,
      }
    ],
  },
  {
    name: "Pengajuan Permohonan Email",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo","kadis",
      "perangkat_daerah",
      "kabid_aplikasi",
      "katim_aplikasi",
      "teknis_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "occupation",
        label: "Jabatan",
        value: [],
        type: "selection",
        options: []
      },
      { name: "nip", label: "NIP", value: "", type: "text" },
      {
        name: "peruntukan",
        label: "Peruntukan",
        value: [],
        type: "selection",
        options: [
          { value: "instansi", label: "Instansi" },
          { value: "pribadi", label: "Pribadi" },
        ]
      },
      { name: "reason", label: "Alasan", value: "", type: "editor" },
    ]
  },
  {
    name: "Pengajuan Permohonan Pengujian Celah Keamanan",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo","kadis",
      "perangkat_daerah",
      "kabid_aplikasi",
      "katim_aplikasi",
      "teknis_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "app_name", label: "Nama Aplikasi", 
        value: [],
        type: "selection",
        options: []
      },
      { name: "app_desc", label: "Deskripsi Aplikasi", value: "", type: "editor" },
      { name: "app_version", label: "Versi Aplikasi", value: "", type: "text" },
      {
        name: "app_ownership", label: "Kepemilikan Aplikasi", value: "", type: "selection",
        options: [
          { value: "instansi", label: "Instansi" },
          { value: "pribadi", label: "Pribadi" },
        ]
      },
      { name: "username", label: "Nama Akun", value: "", type: "text" },
      { name: "password", label: "Kata Sandi", value: "", type: "password", noted: "Contoh: Example!123" },
      { name: "domain_url", label: "Domain URL", value: "", type: "text", noted: "Contoh: www.example.go.id" },
      { name: "file_process_bisiness", label: "Dokumen Proses Bisnis", value: "", type: "file_upload", noted: "File berekstensi: pdf,xlsx,docs" }
    ]
  }
]

// Integrasi
const getIntergasiSIValidation = (inputLocal) => [
  {
    label: "Skema Integrasi",
    value: inputLocal.file_scema_integration,
    name: "file_scema_integration",
    type: "file_upload",
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: 'team_response'
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "date",
    name: 'working_schedule'
  },
];
const getIntergasiSIProcess = (inputLocal) => [
  {
    label: "Unggah File Hasil Integrasi",
    value: inputLocal.upload_dokumen_hasil_integrasi,
    type: "file_upload",
    name: 'upload_dokumen_hasil_integrasi',
    noted: "File berekstensi: pdf,xlsx,docs"
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
    label: "Unggah Surat Pemberitahuan untuk OPD",
    value: finishData.file_submission,
    type: "file_upload",
    name: 'file_submission',
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];

// Penerapan Modul TTE

const getModulTTEValidation = (inputLocal) => [
  {
    label: "Tanggapan Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: 'team_response'
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "date",
    name: 'working_schedule'
  },
];

const getModulTTEProcess = (inputLocal) => [
  {
    label: "Unggah Surat Pengesahan",
    value: inputLocal.upload_dokumen_laporan_modul_tte,
    type: "file_upload",
    name: 'upload_dokumen_laporan_modul_tte',
    noted: "File berekstensi: pdf,xlsx,docs"
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
    label: "Unggah Surat Pemberitahuan untuk OPD",
    value: finishData.file_submission,
    name: 'file_submission',
    type: "file_upload",
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];

// User Account SI
const getUserAccountSIValidation = (inputLocal) => 
  [
    {
      label: "Tanggapan Tim Teknis",
      value: inputLocal.team_response,
      type: "textarea",
      name: 'team_response'
    },
    {
      label: "Jadwal Pengerjaan",
      value: inputLocal.working_schedule,
      type: "date",
      name: 'working_schedule'
    },
  ];
const getUserAccountSIProcess = (inputLocal) => [
  {
    label: "Unggah Dokumen Laporan Hasil Pembuatan Akun",
    value: inputLocal.upload_dokumen_laporan_pembuatan_akun,
    type: "file_upload",
    name: 'upload_dokumen_laporan_pembuatan_akun',
    noted: "File berekstensi: pdf,xlsx,docs"
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
    label: "Unggah Surat Pemberitahuan untuk OPD",
    value: finishData.file_submission,
    name: 'file_submission',
    type: "file_upload",
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];

const getEmailProcess = (inputLocal) => [
  {
    label: "Unggah Surat Pengesahan",
    value: inputLocal.upload_surat_pengesahan,
    type: "file_upload",
    name: 'upload_surat_pengesahan',
    noted: "File berekstensi: pdf,xlsx,docs"
  },

];
const getEmailValidation = (inputLocal) => 
  [
    {
      label: "Tanggapan Tim Teknis",
      value: inputLocal.team_response,
      type: "textarea",
      name: 'team_response'
    },
    {
      label: "Jadwal Pengerjaan",
      value: inputLocal.working_schedule,
      type: "date",
      name: 'working_schedule'
    },
  ];

const getEmailFinish = (finishData) => [
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
    type: "file_upload",
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];

const getCelahKeamananValidation = (inputLocal) => [
  {
    label: "Upload Dokumen Pembangunan",
    value: inputLocal.dokumen_pembangunan,
    type: "file_upload",
    name: 'dokumen_pembangunan',
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Upload Dokumen NDA",
    value: inputLocal.dokumen_nda,
    type: "file_upload",
    name: 'dokumen_nda',
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan Ketua Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: 'team_response'
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "date",
    name: 'working_schedule'
  },
];
const getCelahKeamananProcess = (inputLocal) => [
  {
    label: "Unggah Dokumen Laporan Hasil Pengujian",
    value: inputLocal.upload_hasil_pengujian,
    type: "file_upload",
    name: 'upload_hasil_pengujian',
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Unggah Dokumen Hasil Uji Penetrasi",
    value: inputLocal.upload_hasil_penetrasi,
    type: "file_upload",
    name: 'upload_hasil_penetrasi',
    noted: "File berekstensi: pdf,xlsx,docs"
  },
];

const getCelahKeamananFinish = (finishData) => [
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
    type: "file_upload",
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];


export {
  getIntergasiSIValidation, getModulTTEValidation,getUserAccountSIValidation,getEmailValidation,getCelahKeamananValidation,
  getIntergasiSIProcess, getIntergasiSIFinish, getModulTTEProcess, getModulTTEFinish, getUserAccountSIProcess, getUserAccountSIFinish,
  getEmailProcess, getEmailFinish, getCelahKeamananProcess, getCelahKeamananFinish
};
