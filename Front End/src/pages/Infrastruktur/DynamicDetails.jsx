import React from 'react';
import DynamicShow from '../../components/common/DynamicShow';

const DynamicDetails = ({ detailData }) => {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
        {Object.entries(detailData).map(([key, value]) => (
          <DynamicShow
            key={key}
            name={key}
            label={getKeyLabel(key)}
            value={value}
            location="helpdesk"
            type={getFieldType(key)}
            disabled={true}
          />
        ))}
      </div>
    </div>
  );
}

const getKeyLabel = (key) => {
  switch (key) {
    case "helpdesk_type":
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
      return "Pengajuan Bandwith";
    case "total_tools":
      return "Total Alat";
    case "reason":
      return "Alasan Pengajuan";
    case "full_address":
      return "Alamat Lengkap";
    case "status":
      return "Status";
    case "helpdesk_title":
      return "Nama Pengajuan";
    case "createdAt":
      return "Tanggal Pembuatan";
    default:
      return key;
  }
}

const getFieldType = (key) => {
  switch (key) {
    case "reason":
    case "full_address":
      return "html";
    case "image_screenshoot":
      return "images";
    default:
      return "text";
  }
}

export default DynamicDetails;
