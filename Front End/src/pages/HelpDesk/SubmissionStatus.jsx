// SubmissionStatus.jsx

import React from 'react';

const SubmissionStatus = ({ submissionStatus }) => {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex sm:flex-row flex-col bg-lightColor dark:bg-cardDark p-3 rounded-lg">
        {[
          {
            title: "Dalam Antrian",
            status: 1,
            color: "bg-[#333333]",
            border: "border-[#333333]",
            text: "text-[#333333]",
          },
          {
            title: "Validasi",
            status: 2,
            color: "bg-[#F5CF08]",
            border: "border-[#F5CF08]",
            text: "text-[#F5CF08]",
          },
          {
            title: "Proses",
            status: 3,
            color: "bg-[#F5CF08]",
            border: "border-[#F5CF08]",
            text: "text-[#F5CF08]",
          },
          {
            title: "Selesai",
            status: 4,
            color: submissionStatus === 4 ? "bg-[#FF0000]" : "bg-[#13C39C]",
            border: submissionStatus === 4 ? "border-[#FF0000]" : "border-[#13C39C]",
            text: submissionStatus === 4 ? "text-[#FF0000]" : "text-[#13C39C]",
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col flex-1 ">
            <div className="flex flex-1 gap-3 items-center flex-row py-2 text-center text-darkColor">
              <div className={`${ "border-b-2"}  flex-1 flex ${submissionStatus >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`} />
              <div className={`flex p-2 rounded-full border-2 ${submissionStatus >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`}>
                <div className={`flex items-center w-12 aspect-square justify-center ${submissionStatus >= item.status ? item.color : "bg-[#D9D9D9]"} rounded-full`}>
                  <span className="text-xl  aspect-square text-center align-text-bottom font-bold">{index + 1}</span>
                </div>
              </div>
              <div className={`${"border-b-2"}  flex-1 flex ${submissionStatus >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`} />
            </div>
            <div className={`flex flex-col items-center ${submissionStatus >= item.status ? item.text : "text-[#D9D9D9]"} `}>
              <span className="text-sm font-semibold">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubmissionStatus;
