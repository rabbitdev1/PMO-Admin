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
      return "Requirement Lainnya";
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

    case "app_version":
      return "Versi Aplikasi"
    case "app_ownership":
      return "Kepemilikan Aplikasi";
    case "username":
      return "Username";
    case "password":
      return "Password";
    case "domain_url":
      return "URL Domain";
    

    case "file_hasil_pengajuan_podcast":
      return "Dokumen Hasil Podcast";
    case "submission_type_user_account":
      return "Jenis Akun User";
    case "bidang" :
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
      case "skpd_request_letter":
        return "Surat Permohonan SKPD"
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
