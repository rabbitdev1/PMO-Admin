
export const formData = [
  {
    name: "Pengajuan Relokasi Alat",
    type: "Pengajuan Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi",
    role: ["op_pmo", "perangkat_daerah", "kabid_infra","katim_infra","teknis_infra"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
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
        noted:'Contoh: Ruang A ke Ruang B sekitar 30 Meter',
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
    role: ["op_pmo", "perangkat_daerah", "kabid_infra","katim_infra","teknis_infra"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "type_tools",
        label: "Jenis Alat yang dibutuhkan",
        value: [],
        type: "multi_selection",
        options: [
          { value: "Akses Point (Wifi)", label: "Akses Point (Wifi)" },
          { value: "Kabel LAN", label: "Kabel LAN" },
          { value: "Switch", label: "Switch" },
        ],
      },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
      {
        name: "distance_estimation",
        label: "Estimasi Jarak",
        value: "",
        type: "textarea",
        noted:'Contoh: Perangkat utama (router) ke lokasi perangkat yang akan ditambahkan (router) sekitar 30 Meter',
      },
    ],
  },
  {
    name: "Pengajuan Penambahan Bandwidth",
    type: "Pengajuan Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi",
    role: ["op_pmo", "perangkat_daerah", "kabid_infra","katim_infra","teknis_infra"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
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
        ]
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
        ]
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
      {
        name: "period",
        label: "Periode Jangka Waktu",
        value: {
          startDate: null,
          endDate: null,
        },
        type: "date",
        visible: true,
        // visible: false,
      },
    ],
  },
  {
    name: "Pengajuan Troubleshooting Aplikasi dan Jaringan",
    type: "Pengajuan Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi",
    role: ["op_pmo", "perangkat_daerah", "kabid_infra","katim_infra","teknis_infra"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
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
        label: "Screenshot",
        value: "",
        type: "image_upload",
      },
    ],
  },
  {
    name: "Pengajuan Hosting",
    type: "Pengajuan Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi",
    role: ["op_pmo", "perangkat_daerah", "kabid_infra","katim_infra","teknis_infra"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "app",
        label: "Nama Aplikasi",
        value: [],
        type: "selection",
        options: [
          { value: "aplikasi_1", label: "Aplikasi 1" },
          { value: "aplikasi_2", label: "Aplikasi 2" },
          { value: "aplikasi_3", label: "Aplikasi 3" },
        ],
      },
      {
        name: "other_requirements",
        label: "Requirement Lainnya",
        value: "",
        type: "textarea",
      },
      {
        name: "device_specifications",
        label: "Spesifikasi Perangkat",
        value: [
          { label: "RAM", name: "ram", value: "" },
          { label: "Processor", name: "processor", value: "" },
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
    role: ["op_pmo", "perangkat_daerah", "kabid_infra","katim_infra","teknis_infra"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "app",
        label: "Nama Aplikasi",
        value: [],
        type: "selection",
        options: [
          { value: "alat_1", label: "Alat 1" },
          { value: "alat_2", label: "Alat 2" },
          { value: "alat_3", label: "Alat 3" },
        ],
      },
      {
        name: "domain_name",
        label: "Usulan Nama Domain",
        value: "",
        type: "text",
      },
      {
        name: "ip_address",
        label: "Usulan IP Address",
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
]