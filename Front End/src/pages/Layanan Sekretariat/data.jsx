export const formData = [
  {
    name: "Pengajuan Pendaftaran Magang",
    type: "Pengajuan Layanan Sekretariat",
    role: [
      "op_pmo",
      "perangkat_daerah",
     "sekretariat",
     "katim_sekre",
     "teknis_sekre",
    ],
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
        value: "",
        type: "multi_date",
      },
    ],
  },
]

const getMagangProcess = (inputLocal) => [
  {
    label: "Upload Dokumen Laporan Hasil Integrasi",
    value: inputLocal.upload_dokumen_hasil_integrasi,
    type: "file_upload",
    name: 'upload_dokumen_hasil_integrasi'
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
  getMagangProcess, getMagangFinish,
};
