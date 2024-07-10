import React from "react";
import DynamicShow from "../common/DynamicShow";
import ConditionalRender from "./ConditionalRender";

const DynamicDetails = ({ detailData, loading, location }) => {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
        <ConditionalRender
          data={detailData}
          loading={loading}
          className="flex flex-col min-h-[200px]"
          model="emptyData"
        >
          <div className="flex flex-col gap-3">
            <span className="text-lg font-bold">Rincian Pengajuan</span>
            {Object.entries(detailData).map(([key, value]) =>
              value ? (
                <DynamicShow
                  key={key}
                  name={key}
                  label={getKeyLabel(key)}
                  value={key === "device_specifications" ? JSON.stringify(value) : value}
                  location={location}
                  type={getFieldType(key)}
                  disabled={true}
                />
              ) : null
            )}
          </div>
        </ConditionalRender>
      </div>
    </div>
  );
};

const getKeyLabel = (key) => {
  const labels = {
    submission_type: "Jenis Layanan",
    name_pic: "Nama PIC",
    name: "Nama",
    telp: "Nomor Telepon",
    email: "Email",
    origin_agency: "Asal Instansi",
    new_password: "Kata Sandi Baru",
    repeat_password: "Ulangi Kata Sandi",
    telp_pic: "Nomor PIC",
    type_tools: "Jenis Alat",
    image_screenshoot: "Screenshot",
    period: "Periode Jangka Waktu",
    device_specifications: "Spesifikasi Alat",
    proposed_bandwidth: "Pengajuan Bandwidth",
    total_tools: "Total Alat",
    reason: "Alasan Pengajuan",
    location_implementation: "Tempat Pelaksanaan",
    full_address: "Alamat Lengkap",
    status: "Status",
    submission_title: "Nama Pengajuan",
    createdAt: "Tanggal Pembuatan",
    other_requirements: "Kebutuhan Lainnya",
    app: "Nama Aplikasi",
    distance_estimation: "Estimasi Jarak",
    initial_bandwith: "Bandwidth Awal",
    file_process_bisiness: "Proses Bisnis",
    app_name: "Nama Aplikasi",
    app_desc: "Deskripsi Aplikasi",
    fullname: "Nama Lengkap",
    account_type: "Jenis Akun",
    needed_data: "Data yang dibutuhkan",
    integration: "Tujuan Integrasi",
    file_scema_integration: "Skema Integrasi",
    ram: "RAM",
    name_PPK: "Nama PPK",
    title_kak: "Judul KAK",
    besaran_anggaran: "Besar Anggaran",
    anggaran_attachment: "Sumber Anggaran",
    lingkup_job: "Lingkup Pekerjaan",
    number_of_people_required: "Jumlah Tenaga Kerja yang Dibutuhkan",
    needed_tools: "Kebutuhan Alat",
    topic: "Tema/Topik",
    type_activity: "Jenis Kegiatan",
    speaker: "Narasumber/Pembicara",
    user_qty: "Jumlah User",
    incident: "Waktu Kejadian",
    app_version: "Versi Aplikasi",
    app_ownership: "Kepemilikan Aplikasi",
    username: "Nama Pengguna",
    password: "Kata Sandi",
    domain_url: "URL Domain",
    file_hasil_pengajuan_podcast: "Dokumen Hasil Podcast",
    submission_type_user_account: "Jenis Akun Pengguna",
    bidang: "Bidang",
    nip: "NIP",
    peruntukan: "Peruntukan",
    file_data: "File Data",
    surat_permohonan: "Surat Permohonan",
    alamat_website: "Alamat Website",
    jenis_kebijakan: "Jenis Kebijakan",
    ruang_lingkup: "Ruang Lingkup",
    draft_perwal: "Draft Perwal",
    nama_ahli: "Nama Ahli",
    bidang_keahlian: "Bidang Keahlian",
    pengalaman: "Pengalaman",
    job_desk: "Job Desk",
    timeline_kontrak: "Timeline Kontrak",
    terdaftar_lpse: "Terdaftar di LPSE",
    nilai_kontrak: "Nilai Kontrak",
    applicationType: "Jenis Aplikasi",
    applicationName: "Nama Aplikasi",
    developmentAspect: "Hal yang dikembangkan",
    developmentGoal: "Tujuan Pengembangan",
    applicationOwnership: "Kepemilikan Aplikasi",
    developerName1: "Nama Pengembang 1",
    developerName2: "Nama Pengembang 2",
    developmentDuration: "Durasi Pengembangan",
    fundingSource: "Sumber Anggaran",
    budgetAmount: "Besar Anggaran",
    clusterCategory: "Kategori Klaster",
    programmingLanguage: "Bahasa Pemrograman",
    applicationDescription: "Deskripsi Aplikasi",
    Otherdatabase: "Database Lainnya",
    otherProgrammingLanguage: "Bahasa Pemrograman Lainnya",
    developmentTechnique: "Teknik Pengembangan",
    storageMedia: "Media Penyimpanan",
    dataSource: "Sumber Data",
    reasonForChoosingStorageMedia: "Alasan Pemilihan Media Penyimpanan",
    serverRentalLocation: "Lokasi Penyewaan Server",
    serverRentalPeriod: "Periode Penyewaan Server",
    serverRentalCost: "Harga Penyewaan Server",
    kakAttachment: "Lampiran KAK",
    cloudLocation: "Lokasi Cloud",
    cloudStoragePeriod: "Periode Penyimpanan Cloud",
    cloudStorageCost: "Harga Penyimpanan Cloud",
    skpdRequestLetter: "Surat Permohonan SKPD",
    reformasiBirokrasi: "Reformasi Birokrasi (RB) Tematik",
    ramSpecifications: "Spesifikasi RAM",
    cpuSpecifications: "Spesifikasi CPU",
    storageSpecifications: "Spesifikasi Storage",
    gpuSpecifications: "Spesifikasi GPU",
    otherSpecifications: "Spesifikasi Lainnya",
    hardDiskSpecifications: "Spesifikasi Hard Disk",
    integrationWithSystem: "Integrasi dengan Sistem",
    reasonForIntegration: "Alasan Integrasi",
    exchangeFormat: "Format Penyimpanan",
    proposedDomain: "Domain Yang Diusulkan",
    letterNumber: "Nomor Surat",
    letterDate: "Tanggal Surat",
    otherRequirements: "Requirement Lainnya",
    spbePlan: "PETA Rencana SPBE OPD",
    riskManagement: "Manajemen Risiko SPBE",
    unit_price: "Harga Satuan",
    total_price: "Jumlah",
    
  };

  return labels[key] || key;
};

const getFieldType = (key) => {
  switch (key) {
    case "reason":
    case "app_desc":
    case "needed_data":
    case "needed_reason":
    case "integration":
    case "location_implementation":
    case "ruang_lingkup":
    case "pengalaman":
    case "job_desk":
      return "html";
    case "full_address":
      return "text";
    case "image_screenshoot":
    case "image":
      return "images";
    case "file_process_bisiness":
    case "anggaranAttachment":
    case "technicalRecommendationLetter":
    case "file_scema_integration":
    case "draft_perwal":
    case "nilai_kontrak":
    case "file_data":
    case "surat_permohonan":
    case "skpdRequestLetter":
    case "kakAttachment":
    case "file_decison":
      return "pdf";
    case "type_tools":
      return "array";
    case "createdAt":
      return "multi_date";
    case "period":
    case "date1":
    case "letterDate":
      return "multi_date";
    default:
      return "text";
  }
};

export default DynamicDetails;
