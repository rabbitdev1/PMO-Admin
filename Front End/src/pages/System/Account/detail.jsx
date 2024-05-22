import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import DynamicInput from "../../../components/common/DynamicInput";
import useTheme from "../../../components/context/useTheme";
import TitleHeader from "../../../components/layout/TitleHeader";
import { apiClient } from "../../../utils/api/apiClient";
import ImageComponent from "../../../utils/helpers/getImageURL";
import DynamicShow from "../../../components/common/DynamicShow";
import DynamicDetails from "./DynamicDetails";
import DynamicButton from "../../../components/common/DynamicButton";
import { ReactComponent as PengajuanBerahasilIcon } from "../../../assets/icon/ic_pengajuan_berhasil.svg";
import ModalContent from "../../../components/ui/Modal/ModalContent";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import fetchUploadImages from "../../../utils/api/uploadImages";
import fetchUploadFiles from "../../../utils/api/uploadFiles";
import { isPending } from "../../../components/store/actions/todoActions";
import ConditionalRender from "../../../components/ui/ConditionalRender";

function DetailsAccountPages() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');
  const authProfile = Cookies.get('authData');
  const location = useLocation();
  const slug = location?.state?.slug || "";

  const [helpDeskLoading, setHelpDeskLoading] = useState(true);
  const [detailHelpDesk, setDetailHelpDesk] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(3);
  const [detailData, setDetailData] = useState([]);

  const [showProgress, setShowProgress] = useState(true);



  const [submission_status, setSubmission_status] = useState(true);
  const [komentar, setKomentar] = useState('');
  const [fileUpload, setFilesUpload] = useState('');

  const [processField, setProcessField] = useState([]);


  const [isModalVerif, setisModalVerif] = useState({
    status: false,
    data: {},
  });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(slug);
    if (authToken) {
      fetchDataHelpDesk(authApiKey, authToken, JSON.parse(authProfile)?.role)
    }
  }, [dispatch]);

  const fetchDataHelpDesk = async (api_key, token, role) => {
    setHelpDeskLoading(true);
    const params = new URLSearchParams();
    params.append("id", slug.id);
    params.append("role", role);
    try {
      const response = await apiClient({
        baseurl: "users/detail",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      setHelpDeskLoading(false);
      if (response?.statusCode === 200) {
        setDetailData(response.result.data);
      } else {
        setDetailData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEditHelpdesk = async (api_key, token, id, submission_status, komentar, filename) => {
    let htmlConvert = '';
    if (komentar) {
      const contentState = convertToRaw(komentar.getCurrentContent());
      htmlConvert = draftToHtml(contentState);
    }

    const params = new URLSearchParams();
    if (id) params.append("id", id);
    if (submission_status) params.append("submission_status", submission_status);
    if (htmlConvert) params.append("comment", htmlConvert);
    if (filename) params.append("fileuploaded", filename);

    try {
      const response = await apiClient({
        baseurl: "helpdesk/edit",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
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

  const checkingFormData = async () => {
    console.log(fileUpload);
    if (fileUpload) {
      const result = await fetchUploadFiles(authApiKey, authToken, fileUpload, 'helpdesk', dispatch);
      console.log(result);
      if (result !== null) {
        fetchEditHelpdesk(authApiKey, authToken, slug, submission_status, komentar, result)
      } else {
        console.error("Error occurred during image upload.");
      }
    } else {
      fetchEditHelpdesk(authApiKey, authToken, slug, submission_status, komentar, null)
    }
  }

  const handleInputChange = (fieldName, value) => {
    const updatedField = { name: fieldName, value: value };
    const existingIndex = processField.findIndex(field => field.name === fieldName);
    if (existingIndex !== -1) {
      // Jika field sudah ada, update nilai value-nya
      setProcessField(prevFields => {
        const updatedFields = [...prevFields];
        updatedFields[existingIndex] = updatedField;
        return updatedFields;
      });
    } else {
      // Jika field belum ada, tambahkan ke state processField
      setProcessField(prevFields => [...prevFields, updatedField]);
    }
  };

  return (
    <div className="flex flex-col gap-3 flex-1 p-3">
      <TitleHeader
        title={`Detail Pengguna`}
        link1={"dashboard"}
        link2={"account"}
      />
      <section className="flex flex-col gap-3">
        <div className="flex sm:flex-row flex-1 flex-col gap-3">
          <div className="flex flex-col flex-1 max-w-xs">
            <div className="flex flex-col  gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              {detailData && detailData?.image &&
                <DynamicShow
                  value={detailData?.image}
                  location={'users'}
                  type={"images"}
                />
              }
              <div className="flex flex-col">
                <span className="text-xl font-bold">{detailData?.fullname}</span>
                <span className="text-base">{detailData?.role}</span>
              </div>
            </div>
          </div>
          <DynamicDetails detailData={detailData} />
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

export default DetailsAccountPages;
