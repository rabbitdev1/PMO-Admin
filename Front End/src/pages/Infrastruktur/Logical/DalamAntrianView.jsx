import React from 'react';

const DalamAntrianView = ({ submissionStatus }) => {
  return (
    <>
      {submissionStatus === 1 ? (
        <div className="flex flex-col flex-1">
          <div className="flex flex-col bg-lightColor dark:bg-cardDark p-5 gap-3 items-center rounded-lg">
            <img
              src={require('../../../assets/image/process.gif')}
              alt={'processing'}
              className="object-contain flex w-[20%] min-w-[200px] aspect-square"
              effect="blur"
            />
            <span className="text-base text-center">
              Pengajuan Anda Sedang <b>Dalam Antrian</b> Oleh pihak DISKOMINFO Kota Bandung
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DalamAntrianView;
