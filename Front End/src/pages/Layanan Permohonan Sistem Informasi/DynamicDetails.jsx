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
                  className={`flex flex-col ${["name_pic", "telp_pic", "title_kak", "name_PPK","besaran_anggaran", "anggaran_attachment"].includes(key)
                    ? "sm:col-span-2 col-span-4"
                    : "col-span-4"
                    }`}
                >
                  <DynamicShow
                    name={key}
                    label={getKeyLabel(key)}
                    value={key === "device_specifications" ? JSON.stringify(value) : value}
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
    title_kak: "Judul KAK",
    name_PPK: "Nama PPK",
    besaran_anggaran: "Besar Anggaran",
    anggaran_attachment: "Sumber Anggaran",
    lingkup_job: "Lingkup Pekerjaan",
    number_of_people_required: "Jumlah Tenaga Kerja yang Dibutuhkan",
    skpdRequestLetter: "Surat Permohonan SKPD",
    kakAttachment: "Lampiran KAK",
  };

  return labels[key] || key;
};

const getFieldType = (key) => {
  switch (key) {
    case "besaran_anggaran":
      return "currency";
    case "skpdRequestLetter":
    case "kakAttachment":
      return "pdf";
    case "createdAt":
      return "single_date";
    default:
      return "text";
  }
};

export default DynamicDetails;
