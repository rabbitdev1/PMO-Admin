import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import DynamicInput from "../../components/common/DynamicInput";
import useTheme from "../../components/context/useTheme";
import TitleHeader from "../../components/layout/TitleHeader";
import { apiClient } from "../../utils/api/apiClient";

function DetailHelpDeskPages() {
  const { isDarkMode } = useTheme();
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');
  const location = useLocation();
  const slug = location?.state?.slug || "";
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);

  const [helpDeskLoading, setHelpDeskLoading] = useState(true);
  const [detailHelpDesk, setDetailHelpDesk] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(3);
  const [detailData, setDetailData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken) {
      fetchDataHelpDesk(authApiKey,authToken)
    } 
  }, [dispatch]);

  const fetchDataHelpDesk = async (api_key,token) => {
    setHelpDeskLoading(true);
    const params = new URLSearchParams();
    params.append("id", slug);
    try {
      const response = await apiClient({
        baseurl: "helpdesk/detail",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      setHelpDeskLoading(false);
      if (response?.statusCode === 200) {
        setDetailHelpDesk(response.result.data);
        setDetailData(response.result.data?.field);
        console.log(response.result.data?.submission_status);
        setSubmissionStatus(
          response.result.data?.submission_status === "Dalam Antrian"
            ? 1
            : response.result.data?.submission_status === "Diproses"
              ? 2
              : response.result.data?.submission_status === "Disetujui"
                ? 3
                : response.result.data?.submission_status === "Ditolak"
                  ? 4
                  : 0
        );
      } else {
        setDetailHelpDesk([]);
        setDetailData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col gap-3 flex-1 p-3">
      <TitleHeader
        title={`Detail Pengajuan Relokasi Alat # ${slug}`}
        link1={"dashboard"}
        link2={"help-desk"}
      />
      <section className="flex flex-col gap-3">
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
                title: "Proses",
                status: 2,
                color: "bg-[#F5CF08]",
                border: "border-[#F5CF08]",
                text: "text-[#F5CF08]",
              },
              {
                title: "Selesai",
                status: 3,
                color: submissionStatus === 4 ? "bg-[#FF0000]" : "bg-[#13C39C]",
                border:
                  submissionStatus === 4
                    ? "border-[#FF0000]"
                    : "border-[#13C39C]",
                text:
                  submissionStatus === 4 ? "text-[#FF0000]" : "text-[#13C39C]",
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col flex-1 ">
                <div className="flex flex-1 gap-3 items-center flex-row py-2 text-center text-darkColor">
                  <div
                    className={`${index !== 0 && "border-b-2"}  flex-1 flex border-[#dddddd] dark:border-[#ffffff20]`}
                  />
                  <div
                    className={`flex p-2 rounded-full border-2 ${submissionStatus >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`}
                  >
                    <div
                      className={`flex items-center w-12 aspect-square justify-center ${submissionStatus >= item.status ? item.color : "bg-[#D9D9D9]"} rounded-full`}
                    >
                      <span className="text-xl  aspect-square text-center align-text-bottom font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${index !== 2 && "border-b-2"}  flex-1 flex border-[#dddddd] dark:border-[#ffffff20]`}
                  />
                </div>
                <div
                  className={`flex flex-col items-center ${submissionStatus >= item.status ? item.text : "text-[#D9D9D9]"} `}
                >
                  <span className="text-sm font-semibold">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-3">
          <div
            className={` ${submissionStatus === 2 ? "flex-1" : "hidden"} flex-1 flex flex-col gap-3`}
          >
            <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              <DynamicInput
                name={""}
                label={"Jadwal Survey Lapangan"}
                value={"30 April 2024 12:33"}
                type={"text"}
                disabled={true}
                placeholder={""}
              />
              <DynamicInput
                name={""}
                label={"Jadwal Penyelesaian Ajuan"}
                value={"30 April 2024 12:33"}
                type={"text"}
                disabled={true}
                placeholder={""}
              />
              <DynamicInput
                name={""}
                label={"Komentar"}
                value={"<p>Lorem Ipsum</p>"}
                type={"html"}
                disabled={true}
                placeholder={""}
              />
            </div>
          </div>
          <div
            className={` ${submissionStatus >= 3 ? "flex-1" : "hidden"} flex-1 flex flex-col gap-3`}
          >
            <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              <div className="flex flex-row gap-2 items-center">
                <span className="text-base font-semibold">Status :</span>
                <div className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor  ${detailHelpDesk?.submission_status === 'Ditolak'?'bg-[#FF0000]':'bg-[#0185FF]'}`}>
                  <span className="text-sm">{detailHelpDesk?.submission_status}</span>
                </div>
              </div>
              <DynamicInput
                name={""}
                label={"Komentar"}
                value={detailHelpDesk?.comment}
                options={[]}
                //  onChange={(value) =>
                //    handleInputChange(item.name, value, index)
                //  }
                type={"html"}
                disabled={true}
                placeholder={""}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              {Object.entries(detailData).map(([key, value]) => {
                return (
                  <DynamicInput
                    key={key}
                    name={key}
                    label={
                      key === "helpdesk_type"
                        ? "Jenis Pengajuan"
                        : key === "name_pic"
                          ? "Nama PIC"
                          : key === "telp_pic"
                            ? "Nomor PIC"
                            : key === "type_tools"
                              ? "Jenis Alat"
                              : key === "image_screenshot"
                                ? "Screenshot"
                                : key === "period"
                                  ? "Periode Jangka Waktu"
                                  : key === "submission_type"
                                    ? "Jenis Pengajuan"
                                    : key === "device_specifications"
                                      ? "Spesifikasi Alat"
                                      : key === "proposed_bandwidth"
                                        ? "Pengajuan Bandwith"
                                        : key === "total_tools"
                                          ? "Total Alat"
                                          : key === "reason"
                                            ? "Alasan Pengajuan"
                                            : key === "full_address"
                                              ? "Alamat Lengkap"
                                              : key === "status"
                                                ? "Status"
                                                : key === "helpdesk_title"
                                                  ? "Nama Pengajuan"
                                                  : key
                    }
                    value={key === "type_tools" ? value : value}
                    type={
                      key === "reason"
                        ? "html"
                        : key === "telp_pic"
                          ? "tel"
                          : key === "image_screenshot"
                            ? "image"
                            :key === "full_address"
                                    ? "textarea"
                                    : "text"
                    }
                    disabled={true}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-row  bg-lightColor dark:bg-cardDark p-3 rounded-lg"></div>
        </div>
      </section>

    </div>
  );
}

export default DetailHelpDeskPages;
