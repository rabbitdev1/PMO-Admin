import React from 'react';
import DynamicShow from '../../../components/common/DynamicShow';

const DynamicDetails = ({ detailData }) => {
 // Destructure to remove unwanted keys
 const { fullname, image, role, ...filteredData } = detailData;

  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
        {Object.entries(filteredData).map(([key, value]) => (
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
    case "role":
      return "Role";
    case "telp":
      return "Nomor Telepon";
    case "email":
      return "E-mail";
    case "address":
      return "Alamat Lengkap";
    case "status":
      return "Status";
    case "fullname":
      return "Nama Lengkap";
    case "createdAt":
      return "Tanggal Pembuatan";
    default:
      return key;
  }
}

const getFieldType = (key) => {
  switch (key) {
    case "reason":
    case "address":
      return "html";
    case "image_screenshoot":
      return "images";
    default:
      return "text";
  }
}

export default DynamicDetails;
