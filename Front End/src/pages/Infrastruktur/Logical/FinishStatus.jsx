import React from 'react';
import DynamicShow from '../../../components/common/DynamicShow';

const FinishStatus = ({ submissionStatus, finishData }) => {
  return (
    <>
      {submissionStatus >= 5 ? (
        <div className={`flex-1 flex flex-col gap-3`}>
          <div className="flex flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <div className="flex flex-row gap-2 items-center">
              <span className="text-base font-semibold">Status Pengajuan :</span>
              <div className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor ${finishData.submission_status === "Disetujui" ? 'bg-[#13C39C]' : 'bg-[#FF0000]'}`}>
                <span className="text-base">{finishData.submission_status}</span>
              </div>
            </div>
            {finishData?.response &&
              <DynamicShow
                label={"Tanggapan"}
                value={finishData?.response}
                type={"html"}
              />}
            {finishData?.file_upload &&
              <DynamicShow
                label={"File Hasil Pengajuan"}
                value={finishData?.file_upload}
                location={'infrastruktur'}
                type={"pdf"}
              />
            }
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FinishStatus;
