
export const formData = [
  {
    name: "Rekomendasi Sistem Informasi",
    type: "Pengajuan Layanan Permohonan Sistem Informasi",
    role: [
      'op_pmo',
      'perangkat_daerah',
      'katim_perencanaan',
      'kabid_perencanaan',
      'katim_aplikasi',
      'kabid_aplikasi',
      'kadis'
    ],
    fields: [
      { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      { name: "title_kak", label: "Judul KAK", value: "", type: "text" },
      { name: "name_PPK", label: "Nama PPK", value: "", type: "text" },
      { name: "besaran_anggaran", label: "Besaran Anggaran", value: "", type: "currency", noted: "Minimal 10 Ribu dan Maksimal 10 Triliun"},
      {
        name: "anggaran_attachment", label: "Sumber Anggaran", type: 'selection',
        options: [
          { label: 'Tidak Ada', value: 'Tidak Ada' },
          { label: 'APBN', value: 'APBN' },
          { label: 'APBD', value: 'APBD' }
        ]
      },
      { name: "lingkup_job", label: "Lingkup Pekerjaan", value: "", type: "text" },
      { name: "number_of_people_required", label: "Jumlah Tenaga yang di butuhkan", value: "", type: "select_number" },
      { name: "skpdRequestLetter", label: "Surat Permohonan SKPD", value: "", type: "file_upload", noted: "File berekstensi: pdf, xlsx, docs" },
      { name: "kakAttachment", label: "File KAK", value: "", type: "file_upload", noted: "File berekstensi: pdf, xlsx, docs" },
    ],
  },
]

const getFeasibilityAnalysis = (inputLocal) => [
  {
    label: "Catatan Analisis Kelayakan",
    value: inputLocal.feasibility_analysis_notes,
    type: "textarea",
    name: 'feasibility_analysis_notes'
  },
];

const getFeasibilityValidation = (inputLocal) => [
  {
    label: "Catatan Validasi Kelayakan",
    value: inputLocal.eligibility_validation_notes,
    type: "textarea",
    name: 'eligibility_validation_notes'
  },
];

const getTechnicalAnalysis = (inputLocal) => [
  {
    label: "Catatan Analisis Teknis",
    value: inputLocal.technical_analysis_notes,
    type: "textarea",
    name: 'technical_analysis_notes'
  },
];
const getTechnicalValidation = (inputLocal) => [
  {
    label: "Catatan Validasi Teknis",
    value: inputLocal.technical_validation_notes,
    type: "textarea",
    name: 'technical_validation_notes'
  },
];
const getRecommendationLetterProcess = (inputLocal) => [
  {
    label: "Surat Rekomendasi Teknis",
    value: inputLocal.recommendation_letter_technical,
    type: "file_upload",
    name: 'recommendation_letter_technical',
    noted: "File berekstensi: pdf, xlsx, docs"
  },
  {
    label: "Catatan Kepala Dinas",
    value: inputLocal.kepala_dinas_note,
    type: "textarea",
    name: 'kepala_dinas_note'
  },
];

export { getFeasibilityAnalysis,getFeasibilityValidation,getTechnicalAnalysis,getTechnicalValidation,getRecommendationLetterProcess};
