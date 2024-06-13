export const formData = [
  {
    name: "Pengajuan Layanan ZOOM",
    type: "Pengajuan Layanan Teknologi dan Sistem Informasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "teknis_aplikasi",
      "katim_aplikasi"
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "textarea",
      },
      {
        name: "period",
        label: "Periode Jangka Waktu",
        value: "",
        type: "date",
      },
    ],
  },
  {
    name: "Pengajuan Permohonan Liputan",
    type: "Pengajuan Layanan Teknologi dan Sistem Informasi",
    role: [
      "op_pmo",
      "perangkat_daerah",
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
    ],
  },
];



// Function to get RelokasiAlatProcess
const getRelokasiAlatProcess = (inputLocal) => [
  {
    label: "Upload Foto Alat Sebelum di Relokasi",
    value: inputLocal.upload_foto_alat_sebelum_di_relokasi,
    type: "image_upload",
    name: "upload_foto_alat_sebelum_di_relokasi",
  },
  {
    label: "Upload Foto Alat Sesudah di Relokasi",
    value: inputLocal.upload_foto_alat_sesudah_di_relokasi,
    type: "image_upload",
    name: "upload_foto_alat_sesudah_di_relokasi",
  },
];

// Function to get PenambahanAlatProcess
const getPenambahanAlatProcess = (inputLocal) => [
  {
    label: "Upload Foto Alat Sebelum Penambahan Alat",
    value: inputLocal.upload_foto_alat_sebelum_di_tambahkan,
    type: "image_upload",
    name: "upload_foto_alat_sebelum_di_tambahkan",
  },
  {
    label: "Upload Foto Alat Sesudah Penambahan Alat",
    value: inputLocal.upload_foto_alat_sesudah_di_tambahkan,
    type: "image_upload",
    name: "upload_foto_alat_sesudah_di_tambahkan",
  },
];

// Function to get PenambahanBandwidthProcess
const getPenambahanBandwidthProcess = (inputLocal) => [
  {
    label: "Upload Foto Kegiatan",
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
    label: "Upload Surat Pemberitahuan untuk OPD",
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
    label: "Upload Surat Pemberitahuan untuk OPD",
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
    label: "Upload Surat Pemberitahuan untuk OPD",
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
  getPenambahanAlatFinish, getPenambahanAlatProcess, getPenambahanBandwidthFinish, getPenambahanBandwidthProcess,
  getRelokasiAlatFinish, getRelokasiAlatProcess
};
