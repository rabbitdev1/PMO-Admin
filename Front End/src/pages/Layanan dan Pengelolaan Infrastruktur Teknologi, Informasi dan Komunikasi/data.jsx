export const formData = [
  {
    name: "Pengajuan Relokasi Alat",
    type: "Pengajuan Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_infra",
      "katim_infra",
      "teknis_infra",
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "type_tools",
        label: "Jenis Alat yang direlokasikan",
        value: [],
        type: "multi_selection",
        options: [
          { value: "alat_1", label: "Alat 1" },
          { value: "alat_2", label: "Alat 2" },
          { value: "alat_3", label: "Alat 3" },
        ],
      },
      {
        name: "distance_estimation",
        label: "Estimasi Jarak",
        value: "",
        type: "textarea",
        noted:
          "Contoh: Perangkat utama (router) ke lokasi perangkat yang akan ditambahkan (router) sekitar 30 Meter",
      },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
      {
        name: "status",
        label: "Status",
        value: "",
        type: "radio_button",
        options: [
          { value: "permanent", label: "Permanen" },
          { value: "temporary", label: "Sementara" },
        ],
      },
    ],
  },
  {
    name: "Pengajuan Penambahan Alat",
    type: "Pengajuan Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_infra",
      "katim_infra",
      "teknis_infra",
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "type_tools",
        label: "Jenis Alat yang dibutuhkan",
        value: [],
        type: "multi_selection",
        options: [
          { value: "Kabel Utp cat 6 (roll)", label: "Kabel Utp cat 6 (roll)" },
          { value: "Access Point Unifi", label: "Access Point Unifi" },
          { value: "Access Point Tp Link", label: "Access Point Tp Link" },
          { value: "Switch 8 port", label: "Switch 8 port" },
          { value: "Konektor Rj45", label: "Konektor Rj45" },
          { value: "Tang crimping", label: "Tang crimping" },
          { value: "Kabel ties (ripet)", label: "Kabel ties (ripet)" },
          { value: "Lan tester", label: "Lan tester" },
          { value: "Label", label: "Label" },
          { value: "Klem Kabel ukuran 10", label: "Klem Kabel ukuran 10" },
          { value: "Usb Hub TP Link", label: "Usb Hub TP Link" },
          { value: "Usb Hub TP Link Gigabite", label: "Usb Hub TP Link Gigabite" },
        ],
      },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
      // {
      //   name: "distance_estimation",
      //   label: "Estimasi Jarak",
      //   value: "",
      //   type: "textarea",
      //   noted:
      //     "Contoh: Perangkat utama (router) ke lokasi perangkat yang akan ditambahkan (router) sekitar 30 Meter",
      // },
    ],
  },
  {
    name: "Pengajuan Penambahan Bandwidth",
    type: "Pengajuan Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_infra",
      "katim_infra",
      "teknis_infra",
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "initial_bandwith",
        label: "Bandwith Awal",
        value: [],
        type: "selection",
        options: [
          { value: "15", label: "15 Mbps" },
          { value: "20", label: "20 Mbps" },
          { value: "25", label: "25 Mbps" },
          { value: "30", label: "30 Mbps" },
        ],
      },
      {
        name: "proposed_bandwidth",
        label: "Bandwith Usulan",
        value: [],
        type: "selection",
        options: [
          { value: "50", label: "50 Mbps" },
          { value: "55", label: "55 Mbps" },
          { value: "60", label: "60 Mbps" },
          { value: "65", label: "65 Mbps" },
          { value: "70", label: "70 Mbps" },
          { value: "75", label: "75 Mbps" },
          { value: "80", label: "80 Mbps" },
          { value: "85", label: "85 Mbps" },
          { value: "90", label: "90 Mbps" },
          { value: "95", label: "95 Mbps" },
          { value: "100", label: "100 Mbps" },
        ],
      },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
      // {
      //   name: "status_BDO",
      //   label: "Status BDO",
      //   value: "",
      //   type: "radio_button",
      //   options: [
      //     { value: "permanent", label: "Permanen" },
      //     { value: "temporary", label: "Sementara" },
      //   ],
      // },
      // {
      //   name: "period",
      //   label: "Periode Jangka Waktu",
      //   value: {
      //     startDate: null,
      //     endDate: null,
      //   },
      //   type: "multi_date",
      //   visible: true,
      //   // visible: false,
      // },
    ],
  },
  {
    name: "Pengajuan Troubleshooting Aplikasi dan Jaringan",
    type: "Pengajuan Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_infra",
      "katim_infra",
      "teknis_infra",
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "incident", label: "Waktu Kejadian", value: "", type: "text" },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
      {
        name: "image_screenshoot",
        label: "Tangkapan Layar",
        value: "",
        type: "image_upload",
      },
    ],
  },
  {
    name: "Pengajuan Hosting",
    type: "Pengajuan Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_infra",
      "katim_infra",
      "teknis_infra",
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "app",
        label: "Nama Aplikasi",
        value: [],
        type: "text",
      },
      {
        name: "other_requirements",
        label: "Kebutuhan Lainnya",
        value: "",
        type: "textarea",
      },
      {
        name: "device_specifications",
        label: "Spesifikasi Perangkat",
        value: [
          {
            label: "RAM",
            name: "ram",
            value: [],
            type: "selection",
            options: [
              { value: "2gb", label: "2 GB" },
              { value: "4gb", label: "4 GB" },
              { value: "8gb", label: "8 GB" },
              { value: "16gb", label: "16 GB" },
              { value: "32gb", label: "32 GB" },
              { value: "64gb", label: "64 GB" },
            ],
          },
          {
            label: "Processor",
            name: "processor",
            value: "",
            noted: "Contoh: ",
          },
          { label: "Storage", name: "storage", value: "" },
          { label: "System Operation", name: "system_operation", value: "" },
        ],
        type: "input_array",
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
    name: "Pengajuan Domain",
    type: "Pengajuan Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_infra",
      "katim_infra",
      "teknis_infra",
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "app",
        label: "Nama Aplikasi",
        value: "",
        type: "text",
      },
      {
        name: "domain_name",
        label: "Usulan Nama Domain",
        value: "",
        type: "text",
        noted: "Contoh: www.example.go.id"
      },
      {
        name: "ip_address",
        label: "Usulan Alamat IP ",
        value: "",
        type: "ipaddress",
      },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
    ],
  },
];

// Function to get RelokasiAlatProcess
const getRelokasiAlatProcess = (inputLocal) => [
  {
    label: "Unggah Foto Alat Sebelum di Relokasi",
    value: inputLocal.upload_foto_alat_sebelum_di_relokasi,
    type: "image_upload",
    name: "upload_foto_alat_sebelum_di_relokasi",
  },
  {
    label: "Unggah Foto Alat Sesudah di Relokasi",
    value: inputLocal.upload_foto_alat_sesudah_di_relokasi,
    type: "image_upload",
    name: "upload_foto_alat_sesudah_di_relokasi",
  },
];

// Function to get PenambahanAlatProcess
const getPenambahanAlatProcess = (inputLocal) => [
  {
    label: "Unggah Foto Alat Sebelum Penambahan Alat",
    value: inputLocal.upload_foto_alat_sebelum_di_tambahkan,
    type: "image_upload",
    name: "upload_foto_alat_sebelum_di_tambahkan",
  },
  {
    label: "Unggah Foto Alat Sesudah Penambahan Alat",
    value: inputLocal.upload_foto_alat_sesudah_di_tambahkan,
    type: "image_upload",
    name: "upload_foto_alat_sesudah_di_tambahkan",
  },
];

// Function to get PenambahanBandwidthProcess
const getPenambahanBandwidthProcess = (inputLocal) => [
  {
    label: "Unggah Foto Kegiatan",
    value: inputLocal.upload_foto_kegiatan,
    type: "image_upload",
    name: "upload_foto_kegiatan",
  },
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

// Function to get PenambahanBandwidthFinish
const getPenambahanBandwidthFinish = (finishData) => [
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

// Function to get PenambahanAlatFinish
const getPenambahanAlatFinish = (finishData) => [
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

const getTroubleshotingProcess = (inputLocal) => [
  {
    label: "Unggah Foto Kegiatan",
    value: inputLocal.upload_foto_kegiatan,
    type: "image_upload",
    name: "upload_foto_kegiatan",
  },
];

const getTroubleshotingFinish = (finishData) => [
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
  getPenambahanAlatFinish,
  getPenambahanAlatProcess,
  getPenambahanBandwidthFinish,
  getPenambahanBandwidthProcess,
  getRelokasiAlatFinish,
  getRelokasiAlatProcess,
  getTroubleshotingProcess,
  getTroubleshotingFinish,
};
