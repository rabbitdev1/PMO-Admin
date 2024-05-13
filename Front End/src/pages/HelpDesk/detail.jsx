import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import DynamicInput from "../../components/common/DynamicInput";
import useTheme from "../../components/context/useTheme";
import TitleHeader from "../../components/layout/TitleHeader";
import { apiClient } from "../../utils/api/apiClient";
import ImageComponent from "../../utils/helpers/getImageURL";
import DynamicShow from "../../components/common/DynamicShow";
import SubmissionStatus from "./SubmissionStatus";
import DynamicDetails from "./DynamicDetails";
import DynamicButton from "../../components/common/DynamicButton";
import { ReactComponent as PengajuanBerahasilIcon } from "../../assets/icon/ic_pengajuan_berhasil.svg";
import ModalContent from "../../components/ui/Modal/ModalContent";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";

function DetailHelpDeskPages() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
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

  const [submission_status, setSubmission_status] = useState(true);
  const [komentar, setKomentar] = useState('');
  const [fileUpload, setFilesUpload] = useState('');

  const [isModalVerif, setisModalVerif] = useState({
    status: false,
    data: {},
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken) {
      fetchDataHelpDesk(authApiKey, authToken, JSON.parse(authProfile)?.role)
    }
  }, [dispatch]);

  const fetchDataHelpDesk = async (api_key, token, role) => {
    setHelpDeskLoading(true);
    const params = new URLSearchParams();
    params.append("id", slug);
    params.append("role", role);
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

  const fetchEditHelpdesk = async (api_key, token, id, submission_status, komentar) => {
    let htmlConvert = '';
    const contentState = convertToRaw(komentar.getCurrentContent());
    htmlConvert = draftToHtml(contentState);

    const params = new URLSearchParams();
    params.append("id", id);
    params.append("submission_status", submission_status);
    params.append("comment", htmlConvert);

    try {
      const response = await apiClient({
        baseurl: "helpdesk/edit",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: 'Helpdesk Berhasil diupdate',
            msg: 'Selamat, Pengajuan helpdesk sudah diupdate',
            icon: PengajuanBerahasilIcon,
            color: '#13C39C'
          },
          status: true
        })
      } else {
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
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
        <div className="flex xl:flex-row-reverse flex-col-reverse gap-3">
          <DynamicDetails detailData={detailData} />

          {JSON.parse(authProfile)?.role === "OPD" || JSON.parse(authProfile)?.role === "operator_PMO" ?
            <div
              className={` ${submissionStatus === 2 ? "flex-1" : "hidden"} flex-1 flex flex-col gap-3`}
            >
              <div className="flex flex-col bg-lightColor dark:bg-cardDark p-5 gap-3 items-center rounded-lg">
                <img
                  src={require('../../assets/image/process.gif')}
                  alt={'processing'}
                  className=" object-contain flex w-[20%] min-w-[200px] aspect-square "
                  effect="blur"
                />
                <span className="text-base text-center">Pengajuan Anda Sedang <b>Diproses</b> Oleh pihak DISKOMINFO Kota Bandung</span>
              </div>
            </div> :
            submissionStatus === 2 &&
            <div
              className={` ${submissionStatus >= 2 ? "flex-1" : "hidden"} flex-1 flex flex-col gap-3`}
            >
              <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                <DynamicInput
                  label={"Status Pengajuan"}
                  value={submission_status}
                  type={"radio_button"}
                  options={[
                    { value: "Disetujui", label: "Disetujui" },
                    { value: "Ditolak", label: "Ditolak" },
                  ]}
                  onChange={(a) => { setSubmission_status(a) }}
                />
                <DynamicInput
                  label={"Upload File Pengajuan"}
                  value={""}
                  type={"file_upload"}
                  onChange={(a) => { setFilesUpload(a)}}
                />
                <DynamicInput
                  label={"Komentar"}
                  value={komentar}
                  type={"editor"}
                  onChange={(a) => { setKomentar(a) }}
                />
                <DynamicButton
                  initialValue={"Simpan Perubahan"}
                  type="fill"
                  color={"#ffffff"}
                  className="inline-flex  bg-[#0185FF] text-darkColor"
                  onClick={() => {
                    // checkingFormData();
                    console.log(fileUpload);
                    // fetchEditHelpdesk(authApiKey, authToken, slug, submission_status, komentar)
                  }}

                />
              </div>
            </div>}


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
                value={detailHelpDesk?.comment}
                type={"html"}
              />
            </div>
          </div>
        </div>

      </section>

      <ModalContent
        className={"sm:max-w-xl"}
        children={
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center ">
              {isModalVerif.data?.icon &&
                <isModalVerif.data.icon
                  className={`flex flex-col flex-1 max-w-[150%] aspect-square bg-[${isModalVerif.data.color}] rounded-full`}
                />}
            </div>
            <div className="flex  flex-col items-center justify-center ">
              <span className="text-lg font-bold">{isModalVerif.data?.title}</span>
              <span className="text-sm font-light opacity-70">{isModalVerif.data?.msg}</span>
            </div>
            <div className="flex flex-col gap-2 ">
              <DynamicButton
                initialValue={"Kembali"}
                type="fill"
                color={"#ffffff"}
                className={`inline-flex flex-1 bg-[${isModalVerif.data.color}] text-darkColor`}
                onClick={() => {
                  setisModalVerif({ data: {}, status: false })
                  fetchDataHelpDesk(authApiKey, authToken, JSON.parse(authProfile)?.role)
                }}
              />
            </div>
          </div>
        }
        active={isModalVerif.status}
      />
    </div>
  );
}

export default DetailHelpDeskPages;
