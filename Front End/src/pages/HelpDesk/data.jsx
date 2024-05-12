
export const formData = [
  {
    name: "test",
    type: "Pengajuan Helpdesk Infrastruktur",
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
      },  {
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
            type_select: 'reset_password'
          },
          {
            name: "new_password",
            label: "Password Baru",
            value: "",
            type: "password",
            type_select: 'reset_password'
          },
          {
            name: "repeat_password",
            label: "Ulangi Password",
            value: "",
            type: "password",
            type_select: 'reset_password'
          },
          {
            name: "account_type2",
            label: "Jenis Akun1",
            value: [],
            type: "selection",
            type_select: 'new_account',
            options: [
              { value: "account_1", label: "Akun 1" },
              { value: "account_2", label: "Akun 2" },
            ],
          },
        ],
      },
      {
        name: "image_screenshoot",
        label: "Screenshot",
        value: "",
        type: "image_upload",
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
    name: "Pengajuan Relokasi Alat",
    type: "Pengajuan Helpdesk Infrastruktur",
    role: ["operator_PMO","OPD","tim_teknis_infrastruktur"],
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
    role: ["operator_PMO","OPD","tim_teknis_infrastruktur"],
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
    role: ["operator_PMO","OPD","tim_teknis_infrastruktur"],
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
    name: "Buat Pengajuan Peubahan Akses",
    type: "Pengajuan Helpdesk Aplikasi",
    role: ["operator_PMO","OPD","tim_teknis_aplikasi"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "password",
        label: "Password Lama",
        value: "",
        type: "password",
      },
      {
        name: "new_password",
        label: "Password Baru",
        value: "",
        type: "password",
      },
      {
        name: "repeat_password",
        label: "Ulangi Password",
        value: "",
        type: "password",
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
    name: "Buat Pengajuan Troubleshooting Jaringan",
    type: "Pengajuan Helpdesk Infrastruktur",
    role: ["operator_PMO","OPD","tim_teknis_infrastruktur"],
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
    name: "Buat Pengajuan Akun Zoom",
    type: "Pengajuan Helpdesk Aplikasi",
    role: ["operator_PMO","OPD","tim_teknis_aplikasi"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
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
    name: "Buat Pengajuan Hosting",
    type: "Pengajuan Helpdesk Infrastruktur",
    role: ["operator_PMO","OPD","tim_teknis_infrastruktur"],
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
    role: ["operator_PMO","OPD","tim_teknis_infrastruktur"],
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
  {
    name: "Buat Pengajuan User Account SI",
    type: "Pengajuan Helpdesk Aplikasi",
    role: ["operator_PMO","OPD","tim_teknis_aplikasi"],
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
            type_select: 'reset_password'
          },
          {
            name: "new_password",
            label: "Password Baru",
            value: "",
            type: "password",
            type_select: 'reset_password'
          },
          {
            name: "repeat_password",
            label: "Ulangi Password",
            value: "",
            type: "password",
            type_select: 'reset_password'
          },
          {
            name: "account_type",
            label: "Jenis Akun",
            value: [],
            type: "selection",
            type_select: 'new_account',
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
    name: "Buat Pengajuan Permohonan Email",
    type: "Pengajuan Helpdesk Aplikasi",
    role: ["operator_PMO","OPD","tim_teknis_aplikasi"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "account_type",
        label: "Jenis Akun",
        value: [],
        type: "selection",
        options: [
          { value: "account_1", label: "Akun 1" },
          { value: "account_2", label: "Akun 2" },
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
    name: "Buat Pengajuan Permohonan Celah Keamanan SI",
    type: "Pengajuan Helpdesk Aplikasi",
    role: ["operator_PMO","OPD","tim_teknis_aplikasi"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
    ],
  },
  {
    name: "Buat Pengajuan Permohonan Integrai",
    type: "Pengajuan Helpdesk Integrasi",
    role: ["operator_PMO","OPD","tim_teknis_integrasi"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
    ],
  },
  {
    name: "Permohonan Penerapan Modul TTE",
    type: "Pengajuan Helpdesk Lainnya",
    role: ["operator_PMO","OPD"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
    ],
  },
  {
    name: "Pendampingan Analisis Data",
    type: "Pengajuan Helpdesk Lainnya",
    role: ["operator_PMO","OPD"],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
    ],
  }
]