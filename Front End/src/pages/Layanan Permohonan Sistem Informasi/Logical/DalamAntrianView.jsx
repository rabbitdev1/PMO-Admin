import React from 'react';
import DynamicDetails from '../../../components/ui/DynamicDetails';

const DalamAntrianView = ({ submissionStatus, detailData, loading }) => {
  return (
    submissionStatus === 1 &&
    <div className={`flex flex-col  lg:flex-col gap-3`}>
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
      <DynamicDetails location={"permohonanSI"} detailData={detailData} loading={loading} />
    </div>
  );
};

export default DalamAntrianView;
