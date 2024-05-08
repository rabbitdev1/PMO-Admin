import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import DynamicInput from "../../components/common/DynamicInput";
import useTheme from "../../components/context/useTheme";
import TitleHeader from "../../components/layout/TitleHeader";
import { apiClient } from "../../utils/api/apiClient";
import ImageComponent from "../../utils/helpers/getImageURL";
import DynamicShow from "../../components/common/DynamicShow";
import SubmissionStatus from "./SubmissionStatus";
import DynamicDetails from "./DynamicDetails";

function DetailHelpDeskPages() {
  const { isDarkMode } = useTheme();
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');
  const authProfile = Cookies.get('authData');
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
      fetchDataHelpDesk(authApiKey, authToken)
    }
  }, [dispatch]);

  const fetchDataHelpDesk = async (api_key, token) => {
    setHelpDeskLoading(true);
    const params = new URLSearchParams();
    params.append("id", slug);
    params.append("role", JSON.parse(authProfile)?.role);
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
        <SubmissionStatus submissionStatus={submissionStatus} />
        <DynamicDetails detailData={detailData} />

        <div
          className={` ${submissionStatus === 2 ? "flex-1" : "hidden"} flex-1 flex flex-col gap-3`}
        >
          <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <DynamicShow
              name={''}
              label={"Jadwal Survey Lapangan"}
              value={"30 April 2024 12:33"}
              type={"text"}
            />
            <DynamicShow
              name={''}
              label={"Jadwal Penyelesaian Ajuan"}
              value={"30 April 2024 12:33"}
              type={"text"}
            />
            <DynamicShow
              name={''}
              label={"Jadwal Penyelesaian Ajuan"}
              value={"<p>Lorem Ipsum</p>"}
              type={"html"}
            />
          </div>
        </div>
        <div
          className={` ${submissionStatus >= 3 ? "flex-1" : "hidden"} flex-1 flex flex-col gap-3`}
        >
          <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <div className="flex flex-row gap-2 items-center">
              <span className="text-base font-semibold">Status :</span>
              <div className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor  ${detailHelpDesk?.submission_status === 'Ditolak' ? 'bg-[#FF0000]' : 'bg-[#0185FF]'}`}>
                <span className="text-base">{detailHelpDesk?.submission_status}</span>
              </div>
            </div>

            <DynamicShow
              name={''}
              label={"Komentar"}
              value={"<p>Lorem Ipsum</p>"}
              type={"html"}
            />
          </div>
        </div>

      </section>
    </div>
  );
}

export default DetailHelpDeskPages;
