import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as DocumentIcon } from "../../assets/icon/ic_document.svg";
import { ReactComponent as PengajuanGagalIcon } from "../../assets/icon/ic_pengajuan_gagal.svg";
import { ReactComponent as PlusIcon } from "../../assets/icon/ic_plus.svg";
import DynamicButton from "../../components/common/DynamicButton";
import useTheme from "../../components/context/useTheme";
import TableCostum from "../../components/data-display/TableCostum";
import TitleHeader from "../../components/layout/TitleHeader";
import { isPending } from "../../components/store/actions/todoActions";
import ModalContent from "../../components/ui/Modal/ModalContent";
import { apiClient } from "../../utils/api/apiClient";



function PermohonanSIPages() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const authApiKey = Cookies.get("authApiKey");
  const authToken = Cookies.get("authToken");
  const authProfile = Cookies.get("authData");

  const [statusData, setStatusData] = useState([
    {
      title: "Pengajuan",
      value: "0",
      desc: "Data yang akan diproses",
      icon: DocumentIcon,
      color: "#333333",
    },
    {
      title: "Proses",
      value: "0",
      desc: "Data proses berjalan",
      icon: DocumentIcon,
      color: "#FFA500",
    },
    {
      title: "Ditolak / Tidak Disetujui",
      value: "0",
      desc: "Data pengajuan ditolak / tidak disetujui",
      icon: DocumentIcon,
      color: "#FF0000",
    },
    {
      title: "Selesai",
      value: "0",
      desc: "Data pengajuan selesai",
      icon: DocumentIcon,
      color: "#13C39C",
    },
  ]);

  const [listPermohonanSI, setListPermohonanSI] = useState([]);
  const [listPermohonanSILoading, setListPermohonanSILoading] =
    useState(true);


  const [isModalType, setisModalType] = useState({ status: false, data: {} });
  const [isModalCreate, setisModalCreate] = useState({
    status: false,
    data: {},
  });
  const [isModalVerif, setisModalVerif] = useState({
    status: false,
    data: {},
  });

  const dispatch = useDispatch();
  const dataState = location.state;

  useEffect(() => {
    if (authToken) {
      fetchDataPermohonanSI(
        authApiKey,
        authToken,
        JSON.parse(authProfile)?.role
      );
    }
  }, [dataState, authToken]);

  const fetchDataPermohonanSI = async (api_key, token, role) => {
    setListPermohonanSILoading(true);
    const params = new URLSearchParams();
    params.append("role", role);
    try {
      const response = await apiClient({
        baseurl: "permohonan-sistem-informasi",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      setListPermohonanSILoading(false);
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        if (JSON.parse(authProfile)?.role === "perangkat_daerah") {
          const filteredSubmissions = response.result.data.filter(
            (submission) => submission.submission_title === dataState
          );
          setListPermohonanSI(filteredSubmissions);
        } else {
          setListPermohonanSI(response.result.data);
        }

        setStatusData([
          { ...statusData[0], value: response?.result?.totalItems },
          {
            ...statusData[1],
            value: response?.result?.totalItemsByStatus?.diproses || 0,
          },
          {
            ...statusData[2],
            value: response?.result?.totalItemsByStatus?.ditolak || 0,
          },
          {
            ...statusData[3],
            value: response?.result?.totalItemsByStatus?.disetujui || 0,
          },
        ]);
      } else {
        setListPermohonanSI([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataDelete = async (api_key, token, id, layanan) => {
    dispatch(isPending(true));
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("layanan", layanan);

    try {
      const response = await apiClient({
        baseurl: "permohonan-sistem-informasi/delete",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: "Pengajuan PermohonanSI Berhasil Dihapus",
            msg: response.result.msg,
            icon: PengajuanGagalIcon,
            color: "#FB4B4B",
          },
          status: true,
        });
      } else {
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchSetProgress = async (api_key, token, data) => {
    const params = new URLSearchParams();
    params.append("id", data.id);

    try {
      const response = await apiClient({
        baseurl: "permohonan-sistem-informasi/set_process",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      if (response?.statusCode === 200) {
        navigate("/detail-permohonan-sistem-informasi", { state: { slug: data.id } });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <div className="flex flex-col gap-3 flex-1 p-4">
      <TitleHeader
        title={JSON.parse(authProfile)?.role === "perangkat_daerah" ? "Layanan Pengajuan" : "Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan"}
        link1={"dashboard"}
        link2={"Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan"}
      />
      <section className="flex xl:flex-row flex-col gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex md:flex-row flex-col gap-3">
            {JSON.parse(authProfile)?.role === "perangkat_daerah" && (
              <div className="flex flex-col gap-2 bg-[#0185FF] p-3 rounded-lg flex-1 md:max-w-xs shadow-sm">
                <span className="sm:text-xl text-sm text-darkColor font-semibold">
                  Selamat datang di Layanan Pengelolaan Sistem Informasi dan
                  Keamanan Jaringan
                </span>
                <div className="flex flex-col flex-1 justify-end items-end">
                  <DynamicButton
                    initialValue={"Tutorial Pengajuan"}
                    color={"#ffffff"}
                    type="transparent"
                    className="bg-[#ffffff] text-[#0185FF] px-3"
                    onClick={() => {
                      // setisModalType({ data: 'Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan', status: true });
                    }}
                  />
                </div>
              </div>
            )}

            <div
              className={`flex-1 grid ${JSON.parse(authProfile)?.role === "perangkat_daerah" ? "md:grid-cols-2 grid-cols-1" : "lg:grid-cols-4 grid-cols-2"}  gap-3`}
            >
              {statusData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg flex-1 shadow-sm"
                >
                  <span className="text-lg font-semibold">{item.title}</span>
                  <div className="flex flex-row gap-2 flex-1 ">
                    <div className="flex flex-row">
                      {item.icon && (
                        <item.icon className="w-12 h-12" fill={item.color} />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 justify-end">
                      <span className="text-3xl font-bold">{item.value}</span>
                    </div>
                  </div>
                  <span className="text-xs opacity-70 flex-1">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <div className="flex flex-row gap-3 justify-between items-center">
              <span className="text-lg font-bold">Daftar Pengajuan</span>
              {JSON.parse(authProfile)?.role === "perangkat_daerah" && (
                <div className="flex flex-col">
                  <DynamicButton
                    iconLeft={<PlusIcon className="w-4 h-4 " />}
                    initialValue={"Ajukan Permohonan"}
                    color={"#ffffff"}
                    type="transparent"
                    className="bg-[#0185FF] text-darkColor px-3"
                    onClick={() => {
                      setisModalType({
                        data: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
                        status: true,
                      });
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col relative">
              <TableCostum
                dataHeader={[
                  { name: "ID", field: "id" },
                  { name: "Nama PIC", field: "name_pic" },
                  { name: "Jenis Pengajuan", field: "submission_title" },
                  { name: "Status", field: "submission_status" },
                  { name: "Tanggal", field: "createdAt" },
                  { name: "Aksi", field: "action" },
                ]}
                showAction={{
                  read: true,
                  remove:
                    JSON.parse(authProfile)?.role === "perangkat_daerah"
                      ? true
                      : false,
                  edit: true,
                }}
                loading={listPermohonanSILoading}
                onClickShow={(data) => {
                  if (JSON.parse(authProfile)?.role === "op_pmo") {
                    fetchSetProgress(authApiKey, authToken, data);
                    console.log(data.submission_title);

                  } else {
                    navigate("/detail-permohonan-sistem-informasi", { state: { slug: data.id } });
                  }
                }}
                onClickRemove={(data) => {
                  if (
                    data.submission_status === 2 ||
                    data.submission_status === 4 ||
                    data.submission_status === 6
                  ) {
                    toast.error(
                      "Pengajuan dalam proses validasi, tidak bisa di hapus",
                      {
                        position: toast.POSITION.TOP_RIGHT,
                      }
                    );
                  } else {
                    const isConfirmed = window.confirm(
                      "Apakah kamu yakin ingin menghapus pengajuan ini?"
                    );
                    if (isConfirmed) {
                      fetchDataDelete(
                        authApiKey,
                        authToken,
                        data.id,
                        "permohonanSI"
                      );
                    } else {
                      alert("Pengajuan tidak dihapus.");
                    }
                  }
                }}
                data={listPermohonanSI}
              />
            </div>
          </div>
        </div>
      </section>

      <ModalContent
        className={"sm:max-w-xl"}
        children={
          <div className="flex flex-col gap-3">
            <span className="text-lg font-bold font-gilroy">
              {isModalType.data}
            </span>
            <div className="flex flex-col overflow-hidden rounded-b-md pb-2">
              {[{
                name: 'Pembangunan Sistem Informasi'
              }, {
                name: 'Pengembangan Sistem Informasi'
              }].map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`flex flex-row justify-start items-center gap-2 flex-1 ${index % 2 ? "" : "bg-[#f1f5f9] dark:bg-[#f1f5f907]"} py-2.5 p-3 hover:opacity-70`}
                    onClick={() => {
                      navigate("/permohonan-sistem-informasi", { state: item.name });
                    }}
                  >
                    <span className=" text-base text-left line-clamp-2 font-gilroy">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        }
        active={isModalType.status}
        onClose={() => setisModalType({ data: {}, status: false })}
      />
      <ModalContent
        className={"sm:max-w-xl"}
        children={
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center ">
              {isModalVerif.data?.icon && (
                <isModalVerif.data.icon
                  className={`flex flex-col flex-1 max-w-[150%] aspect-square bg-[${isModalVerif.data.color}] rounded-full`}
                />
              )}
            </div>
            <div className="flex  flex-col items-center justify-center ">
              <span className="text-lg font-bold">
                {isModalVerif.data?.title}
              </span>
              <span className="text-sm font-light opacity-70">
                {isModalVerif.data?.msg}
              </span>
            </div>
            <div className="flex flex-col gap-2 ">
              <DynamicButton
                initialValue={"Kembali"}
                type="fill"
                color={"#ffffff"}
                className={`inline-flex flex-1 bg-[${isModalVerif.data.color}] text-darkColor`}
                onClick={() => {
                  setisModalVerif({ data: {}, status: false });
                  setisModalCreate({ data: {}, status: false });
                  setisModalType({ data: {}, status: false });
                  fetchDataPermohonanSI(
                    authApiKey,
                    authToken,
                    JSON.parse(authProfile)?.role
                  );
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

export default PermohonanSIPages;
