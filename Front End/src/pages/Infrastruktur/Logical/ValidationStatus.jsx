import React from 'react';
import DynamicShow from '../../../components/common/DynamicShow';

const ValidationStatus = ({ submissionStatus, validationData,authProfile }) => {
  return (
    <>
     
     {submissionStatus === 2 ? JSON.parse(authProfile)?.role === "perangkat_daerah" || JSON.parse(authProfile)?.role === "op_pmo" ?
            <div className="flex flex-col flex-1">
              <div className="flex flex-col bg-lightColor dark:bg-cardDark p-5 gap-3 items-center rounded-lg">
                <img
                  src={require('../../../assets/image/process.gif')}
                  alt={'processing'}
                  className=" object-contain flex w-[20%] min-w-[200px] aspect-square "
                  effect="blur"
                />
                <span className="text-base text-center">Pengajuan Anda Sedang <b>Di Validasi</b> Oleh pihak DISKOMINFO Kota Bandung</span>
              </div>
            </div> :
            <div className="flex flex-col bg-[#F5CF08]/10 border-1 border-[#F5CF08] text-[#F5CF08] p-3 gap-3 items-center rounded-lg">
              <span className="text-base font-semibold text-center">Cek Kelengkapan Berkas</span>
            </div> : null
          }


          {submissionStatus === 3 ?
            <div
              className={`flex-1 flex flex-col gap-3`}
            >
              <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                <div className="flex flex-row gap-2 items-center">
                  <span className="text-base font-semibold">Status Validasi :</span>
                  <div className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor bg-[#FF0000]`}>
                    <span className="text-base">{validationData.status_validation}</span>
                  </div>
                </div>
                <DynamicShow
                  label={"Tanggapan"}
                  value={validationData?.response}
                  type={"html"}
                />
              </div>
            </div>
            : null
          }
    </>
  );
};

export default ValidationStatus;
