export const formData = [
  {
    name: "Pengajuan Layanan Pendaftaran Magang",
    type: "Layanan Sekretariat",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "sekretariat",
      "katim_sekre",
      "teknis_sekre",
    ],
    fields: [
      { name: "name_pemohon", label: "Nama Pemohon", value: "", type: "text" },
      {
        name: "surat_permohonan", label: "Surat Permohonan", value: "", type: "file_upload", noted:
          "File berekstensi: pdf, xlsx, docs"
      },
      {
        name: "period",
        label: "Waktu",
        value: "",
        type: "multi_date",
      },
      {
        name: "surat_ket_mahasiswa", label: "Surat Keterangan Mahasiswa Aktif", value: "", type: "file_upload", noted:
          "File berekstensi: pdf, xlsx, docs"
      },
      { name: "pict_ktp", label: "Foto KTP", value: "", type: "image_upload" },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
    ],
  },
  {
    name: "Pengajuan Layanan Pendataan Tenaga Ahli",
    type: "Layanan Sekretariat",
    role: ["op_pmo",
    "perangkat_daerah",
    "sekretariat",
    "katim_sekre",
    "teknis_sekre",],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "nama_ahli", label: "Nama Ahli", value: "", type: "text" },
      {
        name: "bidang_keahlian",
        label: "Bidang Keahlian",
        value: "",
        type: "selection",
        options: [
          { value: "ijazah", label: "Ijazah" },
          { value: "sertifikat", label: "Sertifikat" },
        ],
      },
      { name: "pengalaman", label: "Pengalaman", value: "", type: "editor" },
      { name: "job_desk", label: "Job Desk", value: "", type: "editor" },
      {
        name: "timeline_kontrak",
        label: "Timeline Kontrak",
        value: {
          startDate: null,
          endDate: null,
        },
        type: "multi_date",
        visible: true,
      },
      {
        name: "terdaftar_lpse",
        label: "Terdaftar di LPSE",
        value: "",
        type: "radio_button",
        options: [
          { value: "ya", label: "Ya" },
          { value: "tidak", label: "Tidak" },
        ],
      },
      {
        name: "nilai_kontrak",
        label: "Nilai Kontrak",
        value: "",
        type: "file_upload",
      },
    ],
  },
  
];

const getMagangProcess = (inputLocal) => [
  {
    label: "Unggah Dokumen Laporan Hasil Integrasi",
    value: inputLocal.upload_dokumen_hasil_integrasi,
    type: "file_upload",
    name: "upload_dokumen_hasil_integrasi",
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

export { getMagangProcess, getMagangFinish };
