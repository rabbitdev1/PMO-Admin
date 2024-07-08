import React from "react";
import ConditionalRender from "../../components/ui/ConditionalRender";
import DynamicShow from "../../components/common/DynamicShow";

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
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(detailData).map(([key, value]) =>
                value &&
                <div
                  key={key}
                  className={`flex flex-col ${["name_pic", "telp_pic"].includes(key)
                    ? "sm:col-span-2 col-span-4"
                    : "col-span-4"
                    }`}
                >
                  <DynamicShow
                    name={key}
                    label={getKeyLabel(key)}
                    value={value}
                    location={location}
                    type={getFieldType(key)}
                    disabled={true}
                  />
                </div>
              )}
            </div>
          </div>
        </ConditionalRender>
      </div>
    </div>
  );
};

const getKeyLabel = (key) => {
  const labels = {
    createdAt: "Tanggal Pembuatan",
    submission_type: "Jenis Layanan",
    submission_title: "Nama Pengajuan",
    name_pic: "Nama PIC",
    telp_pic: "Nomor PIC",
    app_name: "Nama Aplikasi",
    app_desc: "Deskripsi Aplikasi",
    needed_data: "Data yang di Butuhkan",
    integration: "Tujuan Integrasi",
    file_process_bisiness: "Dokumen Proses Bisnis",
    period: "Jadwal Penerapan",
    occupation: "Jabatan",
    nip: "NIP",
    reason: "Alasan",
    peruntukan: "Peruntukan",
    domain_url: "Domain URL",
    password: "Password",
    username: "Username",
    app_ownership: "Kepemilikan Aplikasi",
    app_version: "Versi Aplikasi",
    app: "Aplikasi",
  };

  return labels[key] || key;
};

const getFieldType = (key) => {
  switch (key) {
    case "createdAt":
      return "single_date";
    case "period":
      return 'multi_date';
    case "needed_data":
    case "integration":
    case "app_desc":
    case "reason":
      return "html";
    case "file_process_bisiness":
      return "pdf";
    default:
      return "text";
  }
};

export default DynamicDetails;
