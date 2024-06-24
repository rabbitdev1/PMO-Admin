export const formData = [
  {
    name: "Pengajuan User Akun Sistem Informasi",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_aplikasi",
      "katim_aplikasi",
      "teknis_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "submission_type_user_account",
        label: "Jenis Pengajuan",
        value: [],
        type: "selection",
        options: [
          {
            value: "reset_password",
            label: "Reset Password",
          },
          {
            value: "new_account",
            label: "Pembuatan Akun Baru",
          },
        ],
      },
      {
        name: "account_type",
        label: "Jenis Akun",
        value: [],
        type: "selection",
        options: [
          { value: "account_1", label: "Akun 1" },
          { value: "account_2", label: "Akun 2" },
        ],
        visible: false,
      },
      {
        name: "password",
        label: "Password Lama",
        value: "",
        type: "password",
        visible: false,
      },
      {
        name: "new_password",
        label: "Password Baru",
        value: "",
        type: "password",
        visible: false,
      },
      {
        name: "repeat_password",
        label: "Ulangi Password",
        value: "",
        type: "password",
        visible: false,
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
    name: "Pengajuan Integrasi Sistem Informasi",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_aplikasi",
      "katim_aplikasi",
      "teknis_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "app_name",
        label: "Nama Aplikasi",
        value: [],
        type: "selection",
        options: [
          { value: "15", label: "15 Mbps" },
          { value: "20", label: "20 Mbps" },
          { value: "25", label: "25 Mbps" },
          { value: "30", label: "30 Mbps" },
        ]
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
      "op_pmo",
      "perangkat_daerah",
      "kabid_aplikasi",
      "katim_aplikasi",
      "teknis_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "app_name",
        label: "Nama Aplikasi",
        value: [],
        type: "selection",
        options: [
          { value: "15", label: "15 Mbps" },
          { value: "20", label: "20 Mbps" },
          { value: "25", label: "25 Mbps" },
          { value: "30", label: "30 Mbps" },
        ]
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
        type: "file_upload"
      },
      {
        name: "period",
        label: "Jadwal Penerapan",
        value: {
          startDate: null,
          endDate: null,
        },
        type: "multi_date",
        visible: true,
      }
    ],
  },
  { name: "Pengajuan Permohonan Email",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_aplikasi",
      "katim_aplikasi",
      "teknis_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "jabatan", label: "Jabatan", value: "", type: "text" },
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
  { name: "Pengajuan Permohonan Pengujian Celah Keamanan",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_aplikasi",
      "katim_aplikasi",
      "teknis_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "app", label: "Nama Aplikasi", value: "", type: "text" },
      { name: "app_desc", label: "Deskripsi Aplikasi", value: "", type: "editor"},
      { name: "app_version", label: "Versi Aplikasi", value: "", type: "text"},
      { name: "app_ownership", label: "Kepemilikan Aplikasi", value: "", type: "selection",
        options: [
          { value: "instansi", label: "Instansi" },
          { value: "pribadi", label: "Pribadi" },
        ]
      },
      { name: "username", label: "Username", value: "", type: "text"},
      { name: "password", label: "Password", value: "", type: "password"},
      { name: "domain_url", label: "Domain URL", value: "", type: "text"},
      { name: "file_process_bisiness", label: "Dokumen Proses Bisnis", value: "", type: "file_upload"}
    ]
  }
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

const getEmailProcess = (inputLocal) => [
  {
    label: "Upload Surat Pengesahan",
    value: inputLocal.upload_surat_pengesahan,
    type: "file_upload",
    name: 'upload_surat_pengesahan'
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
  getIntergasiSIProcess, getIntergasiSIFinish, getModulTTEProcess, getModulTTEFinish, getUserAccountSIProcess, getUserAccountSIFinish,
  getEmailProcess, getEmailFinish
};
