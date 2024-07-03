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
          className={"flex flex-col min-h-[200px]"}
          model={"emptyData"}
        >
          <div className="flex flex-col gap-3">
            <span className="text-lg font-bold">Rincian Pengajuan</span>
            {Object.entries(detailData).map(([key, value]) =>
              key === "device_specifications" ? (
                <DynamicShow
                  key={key}
                  name={key}
                  label={getKeyLabel(key)}
                  value={JSON.stringify(value)}
                  location={location}
                  type={getFieldType(key)}
                  disabled={true}
                />
              ) : (
                value  &&
                <DynamicShow
                  key={key}
                  name={key}
                  label={getKeyLabel(key)}
                  value={value}
                  location={location}
                  type={getFieldType(key)}
                  disabled={true}
                />
              )
            )}
          </div>
        </ConditionalRender>
      </div>
    </div>
  );
};

const getKeyLabel = (key) => {
  switch (key) {
    case "submission_type":
      return "Jenis Pengajuan";
    case "name_pic":
      return "Nama PIC";
    case "name":
      return "Nama";
    case "telp":
      return "Nomor Telepon";
    case "email":
      return "Email";
    case "origin_agency":
      return "Asal Instansi";
    case "new_password":
      return "Kata Sandi Baru";
    case "repeat_password":
      return "Ulangi Kata Sandi";
    case "telp_pic":
      return "Nomor PIC";
    case "type_tools":
      return "Jenis Alat";
    case "image_screenshoot":
      return "Screenshot";
    case "period":
      return "Periode Jangka Waktu";
    case "submission_type":
      return "Jenis Pengajuan";
    case "device_specifications":
      return "Spesifikasi Alat";
    case "proposed_bandwidth":
      return "Pengajuan Bandwidth";
    case "total_tools":
      return "Total Alat";
    case "reason":
      return "Alasan Pengajuan";
    case "location_implementation":
      return "Tempat Pelaksanaan";
    case "full_address":
      return "Alamat Lengkap";
    case "status":
      return "Status";
    case "submission_title":
      return "Nama Pengajuan";
    case "createdAt":
      return "Tanggal Pembuatan";
    case "other_requirements":
      return "Kebutuhan Lainnya";
    case "app":
      return "Nama Aplikasi";
    case "distance_estimation":
      return "Estimasi Jarak";
    case "initial_bandwith":
      return "Bandwidth Awal";
    case "file_process_bisiness":
      return "Proses Bisnis";
    case "app_name":
      return "Nama Aplikasi";
    case "app_desc":
      return "Deskripsi Aplikasi";
    case "fullname":
      return "Nama Lengkap";
    case "account_type":
      return "Jenis Akun";
    case "needed_data":
      return "Data yang dibutuhkan";
    case "integration":
      return "Tujuan Integrasi";
    case "file_scema_integration":
      return "Skema Integrasi";


      case "name_PPK":
      return "Nama PPK";
    case "title_kak":
      return "Judul KAK";
    case "besaran_anggaran":
      return "Besar Anggaran";
    case "anggaran_attachment":
      return "Sumber Anggaran";
    case "lingkup_job":
      return "Lingkup Pekerjaan";
    case "number_of_people_required":
      return "Jumlah Tenaga Kerja yang Dibutuhkan";

    case "needed_tools":
      return "Kebutuhan Alat";
    case "topic":
      return "Tema/Topik";
    case "type_activity":
      return "Jenis Kegiatan";
    case "speaker":
      return "Narasumber/Pembicara";
    case "user_qty":
      return "Jumlah User";

    case "incident":
      return "Waktu Kejadian";
    case "app_version":
      return "Versi Aplikasi"
    case "app_ownership":
      return "Kepemilikan Aplikasi";
    case "username":
      return "Nama Pengguna";
    case "password":
      return "Kata Sandi";
    case "domain_url":
      return "URL Domain";
    case "file_hasil_pengajuan_podcast":
      return "Dokumen Hasil Podcast";
    case "submission_type_user_account":
      return "Jenis Akun Pengguna";
    case "bidang":
      return "Bidang";
    case "nip":
      return "NIP";
    case "peruntukan":
      return "Peruntukan";
    case "file_data":
      return "File Data";
    case "surat_permohonan":
      return "Surat Permohonan";
    case "alamat_website":
      return "Alamat Website";
    case "jenis_kebijakan":
      return "Jenis Kebijakan";
    case "ruang_lingkup":
      return "Ruang Lingkup";
    case "draft_perwal":
      return "Draft Perwal";
    case "nama_ahli":
      return "Nama Ahli";
    case "bidang_keahlian":
      return "Bidang Keahlian";
    case "pengalaman":
      return "Pengalaman";
    case "job_desk":
      return "Job Desk";
    case "timeline_kontrak":
      return "Timeline Kontrak";
    case "terdaftar_lpse":
      return "Terdaftar di LPSE";
    case "nilai_kontrak":
      return "Nilai Kontrak";

    // case "applicationType":
    //   return "Jenis Aplikasi";
    // case "applicationName":
    //   return "Nama Aplikasi";
    // case "developmentAspect":
    //   return "Hal yang dikembangkan";
    // case "developmentGoal":
    //   return "Tujuan Pengembangan";
    // case "applicationOwnership":
    //   return "Kepemilikan Aplikasi";
    // case "developerName1":
    //   return "Developer 1";
    // case "developerName2":
    //   return "Developer 2";
    // case "developmentDuration":
    //   return "Durasi Pengembangan";
    // case "fundingSource":
    //   return "Sumber Anggaran";
    // case "budgetAmount":
    //   return "Besar Anggaran";
    // case "clusterCategory":
    //   return "Kategori Klaster";
    // case "programmingLanguage":
    //   return "Bahasa Pemrograman";
    // case "applicationDescription":
    //   return "Deskripsi Aplikasi";
    // case "Otherdatabase":
    //   return "Database Lainnya";
    // case "otherProgrammingLanguage":
    //   return "Bahasa Pemrograman Lainnya";
    // case "developmentTechnique":
    //   return "Teknik Pengembangan";
    // case "storageMedia":
    //   return "Media Penyimpanan";
    // case "dataSource":
    //   return "Sumber Data";
    // case "reasonForChoosingStorageMedia":
    //   return "Alasan Pemilihan Media Penyimpanan";
    // case "serverRentalLocation":
    //   return "Lokasi Penyewaan Server";
    // case "serverRentalPeriod":
    //   return "Periode Penyewaan Server";
    // case "serverRentalCost":
    //   return "Harga Penyewaan Server";
    // case "kakAttachment":
    //   return "Lampiran KAK";
    // case "cloudLocation":
    //   return "Lokasi Cloud";
    // case "cloudStoragePeriod":
    //   return "Periode Penyimpanan Cloud";
    // case "cloudStorageCost":
    //   return "Harga Penyimpanan Cloud";
    // case "skpdRequestLetter":
    //   return "Surat Permohonan SKPD";
    // case "reformasiBirokrasi":
    //   return "Reformasi Birokrasi (RB) Tematik";
    // case "reformasiBirokrasi2":
    //   return "Reformasi Birokrasi (RB) Tematik Lainnya";
    // case "reformasiBirokrasi3":
    //   return "Reformasi Birokrasi (RB) Tematik Lainnya";
    // case "reformasiBirokrasi4":
    // case 'ramSpecifications':
    //   return "Spesifikasi RAM";
    // case 'cpuSpecifications':
    //   return "Spesifikasi CPU";
    // case 'storageSpecifications':
    //   return "Spesifikasi Storage";
    // case 'gpuSpecifications':
    //   return "Spesifikasi GPU";
    // case 'otherSpecifications':
    //   return "Spesifikasi Lainnya";
    // case 'hardDiskSpecifications':
    //   return "Spesifikasi Hard Disk";
    // case 'integrationWithSystem':
    //   return "Integrasi dengan Sistem";
    // case 'reasonForIntegration':
    //   return "Alasan Integrasi";
    // case 'storage':
    //   return "Penyimpanan";
    // case 'exchangeFormat':
    //   return "Format Penyimpanan";
    // case 'proposedDomain':
    //   return "Domain Yang Diusulkan";
    // case 'letterNumber':
    //   return "Nomor Surat";
    // case 'letterDate':
    //   return "Tanggal Surat";
    // case 'otherRequirements':
    //   return "Requirement Lainnya";
    // case 'spbePlan':
    //   return "PETA Rencana SPBE OPD";
    // case 'riskManagement':
    //   return "manajemen risiko SPBE";
    case "submission_type_user_account":
      return "Jenis Akun User";
    case "file_data":
      return "File Data";
    case "file_permohonan":
      return "File Permohonan";

    case "applicationType":
      return "Jenis Aplikasi";
    case "applicationName":
      return "Nama Aplikasi";
    case "developmentAspect":
      return "Hal yang dikembangkan";
    case "developmentGoal":
      return "Tujuan Pengembangan";
    case "applicationOwnership":
      return "Kepemilikan Aplikasi";
    case "developerName1":
      return "Nama Pengebang 1";
    case "developerName2":
      return "Nama Pengebang 2";
    case "developmentDuration":
      return "Durasi Pengembangan";
    case "fundingSource":
      return "Sumber Anggaran";
    case "budgetAmount":
      return "Besar Anggaran";
    case "clusterCategory":
      return "Kategori Klaster";
    case "programmingLanguage":
      return "Bahasa Pemrograman";
    case "applicationDescription":
      return "Deskripsi Aplikasi";
    case "Otherdatabase":
      return "Database Lainnya";
    case "otherProgrammingLanguage":
      return "Bahasa Pemrograman Lainnya";
    case "developmentTechnique":
      return "Teknik Pengembangan";
    case "storageMedia":
      return "Media Penyimpanan";
    case "dataSource":
      return "Sumber Data";
    case "reasonForChoosingStorageMedia":
      return "Alasan Pemilihan Media Penyimpanan";
    case "serverRentalLocation":
      return "Lokasi Penyewaan Server";
    case "serverRentalPeriod":
      return "Periode Penyewaan Server";
    case "serverRentalCost":
      return "Harga Penyewaan Server";
    case "kakAttachment":
      return "Lampiran KAK";
    case "cloudLocation":
      return "Lokasi Cloud";
    case "cloudStoragePeriod":
      return "Periode Penyimpanan Cloud";
    case "cloudStorageCost":
      return "Harga Penyimpanan Cloud";
    case "skpdRequestLetter":
      return "Surat Permohonan SKPD";
    case "reformasiBirokrasi":
      return "Reformasi Birokrasi (RB) Tematik";
    case "reformasiBirokrasi2":
      return "Reformasi Birokrasi (RB) Tematik Lainnya";
    case "reformasiBirokrasi3":
      return "Reformasi Birokrasi (RB) Tematik Lainnya";
    case "reformasiBirokrasi4":
    case "ramSpecifications":
      return "Spesifikasi RAM";
    case "cpuSpecifications":
      return "Spesifikasi CPU";
    case "storageSpecifications":
      return "Spesifikasi Storage";
    case "gpuSpecifications":
      return "Spesifikasi GPU";
    case "otherSpecifications":
      return "Spesifikasi Lainnya";
    case "hardDiskSpecifications":
      return "Spesifikasi Hard Disk";
    case "integrationWithSystem":
      return "Integrasi dengan Sistem";
    case "reasonForIntegration":
      return "Alasan Integrasi";
    case "exchangeFormat":
      return "Format Penyimpanan";
    case "proposedDomain":
      return "Domain Yang Diusulkan";
    case "letterNumber":
      return "Nomor Surat";
    case "letterDate":
      return "Tanggal Surat";
    case "otherRequirements":
      return "Requirement Lainnya";
    case "spbePlan":
      return "PETA Rencana SPBE OPD";
    case "riskManagement":
      return "manajemen risiko SPBE";
    case "skpd_request_letter":
      return "Surat Permohonan SKPD";
    default:
      return key;
  }
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
    case "skpd_request_letter":
      return "pdf";
    case "type_tools":
      return "array";
    case "createdAt":
      return "multi_date";
    case "period":
    case "letterDate":
      return "multidate";

    default:
      return "text";
  }
};

export default DynamicDetails;
