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
        options: [],
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
        options: [],
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
              { value: "2gb", label: "2 GB", labelItem: 'RAM' },
              { value: "4gb", label: "4 GB", labelItem: 'RAM' },
              { value: "8gb", label: "8 GB", labelItem: 'RAM' },
              { value: "16gb", label: "16 GB", labelItem: 'RAM' },
              { value: "32gb", label: "32 GB", labelItem: 'RAM' },
              { value: "64gb", label: "64 GB", labelItem: 'RAM' },
            ],
          },
          {
            label: "Processor",
            name: "processor",
            value: [],
            type: "selection",
            options: [
              { value: "i3", label: "Intel Core i3", labelItem: 'Processor' },
              { value: "i5", label: "Intel Core i5" , labelItem: 'Processor'},
              { value: "i7", label: "Intel Core i7", labelItem: 'Processor' },
              { value: "i9", label: "Intel Core i9", labelItem: 'Processor' },
              { value: "r5", label: "AMD Ryzen 5", labelItem: 'Processor' },
              { value: "r7", label: "AMD Ryzen 7", labelItem: 'Processor' },
            ],
          },
          {
            label: "Storage",
            name: "storage",
            value: [],
            type: "selection",
            options: [
              { value: "256gb", label: "256 GB" , labelItem: 'Storage'},
              { value: "512gb", label: "512 GB", labelItem: 'Storage' },
              { value: "1tb", label: "1 TB", labelItem: 'Storage' },
              { value: "2tb", label: "2 TB", labelItem: 'Storage'},
            ],
          },
          {
            label: "System Operation",
            name: "system_operation",
            value: [],
            type: "selection",
            options: [
              { value: "windows", label: "Windows" , labelItem: 'System Operation'},
              { value: "macos", label: "macOS", labelItem: 'System Operation' },
              { value: "linux", label: "Linux", labelItem: 'System Operation' },
              { value: "other", label: "Other", labelItem: 'System Operation' },
            ],
          },
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


const getRelokasiAlatValidation = (inputLocal) => [
  {
    label: "Tanggapan Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: 'team_response'
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "multi_date",
    name: 'working_schedule'
  }
];
const getPenambahanBandwidthValidation = (inputLocal) => [
  {
    label: "Tanggapan Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: 'team_response'
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "multi_date",
    name: 'working_schedule'
  }
];
const getPenambahanAlatValidation = (inputLocal) => [
  {
    label: "Tanggapan Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: 'team_response'
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "multi_date",
    name: 'working_schedule'
  }
];
const getTroubleshootingValidation = (inputLocal) => [
  {
    label: "Tanggapan Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: 'team_response'
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "multi_date",
    name: 'working_schedule'
  }
];
const getDomainValidation = (inputLocal) => [
  {
    label: "Tanggapan Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: 'team_response'
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "multi_date",
    name: 'working_schedule'
  }
];
const getHostingValidation = (inputLocal) => [
  {
    label: "Tanggapan Tim Teknis",
    value: inputLocal.team_response,
    type: "textarea",
    name: 'team_response'
  },
  {
    label: "Jadwal Pengerjaan",
    value: inputLocal.working_schedule,
    type: "multi_date",
    name: 'working_schedule'
  }
];

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
const getPenambahanBandwidthProcess = (inputLocal) => [
  {
    label: "Unggah Foto Kegiatan",
    value: inputLocal.upload_foto_kegiatan,
    type: "image_upload",
    name: "upload_foto_kegiatan",
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
const getDomainProcess = (inputLocal) => [
  {
    label: "Unggah Foto Kegiatan",
    value: inputLocal.upload_foto_kegiatan,
    type: "image_upload",
    name: "upload_foto_kegiatan",
  },
];
const getHostingProcess = (inputLocal) => [
  {
    label: "Unggah Foto Kegiatan",
    value: inputLocal.upload_foto_kegiatan,
    type: "image_upload",
    name: "upload_foto_kegiatan",
  },
];

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
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: "response",
  },
];
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
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: "response",
  },
];
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
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: "response",
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
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: "response",
  },
];
const getDomainFinish = (finishData) => [
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
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: "response",
  },
];
const getHostingFinish = (finishData) => [
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
    noted: "File berekstensi: pdf,xlsx,docs"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: "response",
  },
];

export {
  getRelokasiAlatValidation,
  getPenambahanAlatValidation,
  getPenambahanBandwidthValidation,
  getTroubleshootingValidation,
  getPenambahanAlatFinish,
  getPenambahanAlatProcess,
  getPenambahanBandwidthFinish,
  getPenambahanBandwidthProcess,
  getRelokasiAlatFinish,
  getRelokasiAlatProcess,
  getTroubleshotingProcess,
  getTroubleshotingFinish,
  getDomainValidation,
  getHostingValidation,
  getDomainProcess,
  getHostingProcess,
  getDomainFinish,
  getHostingFinish,
};
