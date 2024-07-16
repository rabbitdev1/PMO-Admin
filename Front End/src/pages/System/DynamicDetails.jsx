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
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(detailData).map(([key, value]) =>
                value &&
                <div
                  key={key}
                  className={`flex flex-col ${["email", "telp"].includes(key)
                    ? "sm:col-span-2 col-span-4"
                    : "col-span-4"
                    }`}
                >
                  {key === "image" || key === "role" ?
                    null
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
    createdAt: 'Tanggal Pembuatan',
    fullname: "Nama Lengkap",
    email: "Email Pengguna",
    address: 'Tempat Tinggal',
    telp: 'Nomor Telepon',
    status_account: 'Status Akun',
    role: 'Role',
    nip: 'Nomor Induk Pegawai',
    instansi:'Instansi'
  };

  return labels[key] || key;
};

const getFieldType = (key) => {
  switch (key) {
    case "createdAt":
      return "single_date";
    case "timeline_kontrak":
      return "multi_date";
    case "type_tools":
      return "array";
    case "reason":
    case "pengalaman":
    case "job_desk":
      return "html";
    case "nilai_kontrak":
      return "pdf";
    default:
      return "text";
  }
};

export default DynamicDetails;
