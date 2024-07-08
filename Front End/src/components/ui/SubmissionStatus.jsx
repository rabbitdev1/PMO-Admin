import React from 'react';

const status = ({ status, data }) => {
  const items = [
    {
      title: "Dalam Antrian",
      status: 1,
      color: "bg-[#333333]",
      border: "border-[#333333]",
      text: "text-[#333333]",
    },
    {
      title: 'Validasi Dokumen',
      status: 2,
      color: status === 2 ? "bg-[#F5CF08]" : status === 3 ? "bg-[#FF0000]" : "bg-[#F5CF08]",
      border: status === 2 ? "border-[#F5CF08]" : status === 3 ? "border-[#FF0000]" : "border-[#F5CF08]",
      text: status === 2 ? "text-[#F5CF08]" : status === 3 ? "text-[#FF0000]" : "text-[#F5CF08]",
    },
    {
      title: 'Validasi Kelengkapan',
      status: 4,
      color: status === 4 ? "bg-[#F5CF08]" : status === 5 ? "bg-[#FF0000]" : "bg-[#F5CF08]",
      border: status === 4 ? "border-[#F5CF08]" : status === 5 ? "border-[#FF0000]" : "border-[#F5CF08]",
      text: status === 4 ? "text-[#F5CF08]" : status === 5 ? "text-[#FF0000]" : "text-[#F5CF08]",
    },
    {
      title: "Proses",
      status: 6,
      color: "bg-[#FFA500]",
      border: "border-[#FFA500]",
      text: "text-[#FFA500]",
    },
    {
      title: "Pengajuan Selesai",
      status: 7,
      color: status === 7 ? "bg-[#13C39C]" : status === 8 ? "bg-[#FF0000]" : "bg-[#13C39C]",
      border: status === 7 ? "border-[#13C39C]" : status === 8 ? "border-[#FF0000]" : "border-[#13C39C]",
      text: status === 7 ? "text-[#13C39C]" : status === 8 ? "text-[#FF0000]" : "text-[#13C39C]",
    },
  ]
  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="grid flex-1 bg-lightColor dark:bg-cardDark p-3 rounded-lg" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))' }}>
        {(data === null ? items : data).map((item, index) => (
          <div key={index} className="flex flex-col flex-1">
            <div className="flex flex-1 gap-2 items-center flex-row py-2 text-center text-darkColor min-h-[70px]">
              <div className={`${index !== 0 && "border-b-2"} flex-1 flex ${status >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`} />
              {status >= item.status ?
                <div className={`flex p-1 rounded-full border-2 ${status >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`}>
                  <div className={`flex items-center w-9 aspect-square justify-center ${status >= item.status ? item.color : "bg-[#D9D9D9]"} rounded-full`}>
                    <span className="text-lg  aspect-square text-center font-bold">{index + 1}</span>
                  </div>
                </div> :
                <div className={`flex p-2 rounded-full ${status >= item.status ? item.color : "bg-[#dddddd] dark:bg-[#ffffff20] "}`}>
                </div>
              }
              <div className={`${index !== (data === null ? items : data).length - 1 && "border-b-2"}   flex-1 flex ${status >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`} />
            </div>
            <div className={`flex flex-col items-center ${status >= item.status ? item.text : "text-[#D9D9D9]"} text-center flex-1 justify-center`}>
              <span className={`text-sm  ${status >= item.status ? 'font-semibold ' : "font-light"} `}>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default status;
