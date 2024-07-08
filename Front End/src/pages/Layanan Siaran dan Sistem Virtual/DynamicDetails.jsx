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
                  {key === "device_specifications" ?
                    <div className="flex flex-col gap-3">
                      <span className="text-lg font-bold">{getKeyLabel(key)}</span>
                      <div className="flex flex-col gap-1">
                        {Object.values(value).map((spec, index) => (
                          <li key={index}>
                            <strong>{spec.labelItem}:</strong> {spec.label + " - " + spec.value}
                          </li>
                        ))}
                      </div>
                    </div>
                    :
                    <DynamicShow
                      name={key}
                      label={getKeyLabel(key)}
                      value={value}
                      location={location}
                      type={getFieldType(key)}
                      disabled={true}
                    />
                  }
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
    file_pengajuan_zoom: "Dokumen Pengajuan Zoom",
    type_activity: "Jenis Kegiatan",
    location_implementation: "Tempat Pelaksanaan",
    period: "Waktu",
    needed_tools: "Kebutuhan Alat",
    reason: "Alasan Pengajuan",
    type_tools: "Jenis Alat",
    live_streaming: "Live Streaming",
    speaker: "Narasumber/Pembicara",
    topic: "Tema/Topik",
  };

  return labels[key] || key;
};

const getFieldType = (key) => {
  switch (key) {
    case "createdAt":
      return "single_date";
    case "type_tools":
      return "array";
    case "reason": 
    case "needed_tools":
      case "location_implementation":
      return "html";
      case "period":
        return 'multi_date';
    case "file_pengajuan_zoom":
      return "pdf";
    default:
      return "text";
  }
};

export default DynamicDetails;
