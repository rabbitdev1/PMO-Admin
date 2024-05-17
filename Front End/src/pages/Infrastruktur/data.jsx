
export const formData = [
  {
    name: "Pengajuan Relokasi Alat",
    type: "Pengajuan Helpdesk Infrastruktur",
    role: ["op_pmo", "perangkat_daerah", "kabid_infra","ketim_infra","teknis_infra"],
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
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
      {
        name: "full_address",
        label: "Alamat Lengkap",
        value: "",
        type: "textarea",
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
    type: "Pengajuan Helpdesk Infrastruktur",
    role: ["op_pmo", "perangkat_daerah", "kabid_infra","ketim_infra","teknis_infra"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "type_tools",
        label: "Jenis Alat yang dibutuhkan",
        value: [],
        type: "multi_selection",
        options: [
          { value: "alat_1", label: "Alat 1" },
          { value: "alat_2", label: "Alat 2" },
          { value: "alat_3", label: "Alat 3" },
        ],
      },
      {
        name: "total_tools",
        label: "Jumlah Usulan Alat",
        value: "",
        type: "select_number",
      },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
      {
        name: "full_address",
        label: "Alamat Lengkap",
        value: "",
        type: "textarea",
      },
    ],
  },
  {
    name: "Buat Pengajuan Penambahan Bandwidth",
    type: "Pengajuan Helpdesk Infrastruktur",
    role: ["op_pmo", "perangkat_daerah", "kabid_infra","ketim_infra","teknis_infra"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "initial_bandwith",
        label: "Bandwith Awal",
        value: [],
        type: "selection",
        options: [
          { value: "alat_1", label: "Alat 1" },
          { value: "alat_2", label: "Alat 2" },
          { value: "alat_3", label: "Alat 3" },
        ],
      },
      {
        name: "proposed_bandwidth",
        label: "Bandwith Usulan",
        value: [],
        type: "selection",
        options: [
          { value: "alat_1", label: "Alat 1" },
          { value: "alat_2", label: "Alat 2" },
          { value: "alat_3", label: "Alat 3" },
        ],
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
      {
        name: "period",
        label: "Periode Jangka Waktu",
        value: {
          startDate: null,
          endDate: null,
        },
        type: "date",
      },
    ],
  },
  {
    name: "Buat Pengajuan Troubleshooting Jaringan",
    type: "Pengajuan Helpdesk Infrastruktur",
    role: ["op_pmo", "perangkat_daerah", "kabid_infra","ketim_infra","teknis_infra"],
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
    name: "Buat Pengajuan Hosting",
    type: "Pengajuan Helpdesk Infrastruktur",
    role: ["op_pmo", "perangkat_daerah", "kabid_infra","ketim_infra","teknis_infra"],
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
    name: "Buat Pengajuan Domain",
    type: "Pengajuan Helpdesk Infrastruktur",
    role: ["op_pmo", "perangkat_daerah", "kabid_infra","ketim_infra","teknis_infra"],
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
        type: "number",
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