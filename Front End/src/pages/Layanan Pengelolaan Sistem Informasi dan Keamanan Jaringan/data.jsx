export const formData = [
  {
    name: "Pengajuan User Account SI",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_infra",
      "katim_infra",
      "teknis_infra",
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "submission_type",
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
        field: [
          {
            name: "password",
            label: "Password Lama",
            value: "",
            type: "password",
            type_select: "reset_password",
          },
          {
            name: "new_password",
            label: "Password Baru",
            value: "",
            type: "password",
            type_select: "reset_password",
          },
          {
            name: "repeat_password",
            label: "Ulangi Password",
            value: "",
            type: "password",
            type_select: "reset_password",
          },
          {
            name: "account_type",
            label: "Jenis Akun",
            value: [],
            type: "selection",
            type_select: "new_account",
            options: [
              { value: "account_1", label: "Akun 1" },
              { value: "account_2", label: "Akun 2" },
            ],
          },
        ],
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
    name: "Pengajuan Integrasi",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_infra",
      "katim_infra",
      "teknis_infra",
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
]


// Function to get RelokasiAlatProcess
const getRelokasiAlatProcess = (inputLocal) => [
  {
    label: "Upload Foto Alat Sebelum di Relokasi",
    value: inputLocal.upload_foto_alat_sebelum_di_relokasi,
    type: "image_upload",
    name: 'upload_foto_alat_sebelum_di_relokasi'
  },
  {
    label: "Upload Foto Alat Sesudah di Relokasi",
    value: inputLocal.upload_foto_alat_sesudah_di_relokasi,
    type: "image_upload",
    name: 'upload_foto_alat_sesudah_di_relokasi'
  }
];

// Function to get PenambahanAlatProcess
const getPenambahanAlatProcess = (inputLocal) => [
  {
    label: "Upload Foto Alat Sebelum Penambahan Alat",
    value: inputLocal.upload_foto_alat_sebelum_di_tambahkan,
    type: "image_upload",
    name: 'upload_foto_alat_sebelum_di_tambahkan'
  },
  {
    label: "Upload Foto Alat Sesudah Penambahan Alat",
    value: inputLocal.upload_foto_alat_sesudah_di_tambahkan,
    type: "image_upload",
    name: 'upload_foto_alat_sesudah_di_tambahkan'
  }
];

// Function to get PenambahanBandwidthProcess
const getPenambahanBandwidthProcess = (inputLocal) => [
  {
    label: "Upload Foto Kegiatan",
    value: inputLocal.upload_foto_kegiatan,
    type: "image_upload",
    name: 'upload_foto_kegiatan'
  }
];

// Function to get RelokasiAlatFinish
const getRelokasiAlatFinish = (finishData) => [
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

// Function to get PenambahanBandwidthFinish
const getPenambahanBandwidthFinish = (finishData) => [
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

// Function to get PenambahanAlatFinish
const getPenambahanAlatFinish = (finishData) => [
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
  getRelokasiAlatProcess,
  getPenambahanAlatProcess,
  getPenambahanBandwidthProcess,
  getRelokasiAlatFinish,
  getPenambahanBandwidthFinish,
  getPenambahanAlatFinish
};
