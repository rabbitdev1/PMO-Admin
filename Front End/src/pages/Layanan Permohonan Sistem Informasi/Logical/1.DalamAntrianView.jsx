import React from 'react';
import DynamicDetailsPermohonanSI from '../DynamicDetailsPermohonanSI'; 
import DynamicDetails from '../DynamicDetails';

const DalamAntrianView = ({ submissionStatus, detailData, loading }) => {
  return (
    submissionStatus === 1 &&
    <div className={`flex flex-col  lg:flex-col gap-3`}>
      {detailData.submission_title === "Rekomendasi Sistem Informasi" ?
        <DynamicDetails location={"permohonanSI"} detailData={detailData} loading={loading} />
        :
        <DynamicDetailsPermohonanSI location={"permohonanSI"} detailData={detailData} loading={loading} />
      }
      <div className="flex flex-col flex-1">
        <div className="flex flex-col bg-lightColor dark:bg-cardDark p-5 gap-3 items-center rounded-lg">
          <img
            src={require('../../../assets/image/process.gif')}
            alt={'processing'}
            className="object-contain flex w-[20%] min-w-[200px] aspect-square"
            effect="blur"
          />
          <span className="text-base text-center">
            Pengajuan Sedang <b>Dalam Antrian</b> Oleh pihak DISKOMINFO Kota Bandung
          </span>
        </div>
      </div>
    </div>
  );
};

export default DalamAntrianView;
