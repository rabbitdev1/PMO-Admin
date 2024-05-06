import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as PengajuanBerahasilIcon } from "../../assets/icon/ic_pengajuan_berhasil.svg";
import { ReactComponent as PengajuanGagalIcon } from "../../assets/icon/ic_pengajuan_gagal.svg";
import { ReactComponent as PlusIcon } from "../../assets/icon/ic_plus.svg";
import { ReactComponent as DisetujuiIcon } from "../../assets/icon/status/ic_disetujui.svg";
import { ReactComponent as DitolakIcon } from "../../assets/icon/status/ic_ditolak.svg";
import { ReactComponent as PengajuanIcon } from "../../assets/icon/status/ic_pengajuan.svg";
import { ReactComponent as DiprosesIcon } from "../../assets/icon/status/ic_proses.svg";
import useTheme from "../../components/context/useTheme";
import TableCostum from "../../components/data-display/TableCostum";
import TitleHeader from "../../components/layout/TitleHeader";
import { isPending } from "../../components/store/actions/todoActions";
import { apiClient } from "../../utils/api/apiClient";
import ModalContent from "../../components/ui/Modal/ModalContent";
import DynamicButton from "../../components/common/DynamicButton";
import { ReactComponent as CloseIcon } from "../../assets/icon/ic_close.svg";
import DynamicInput from "../../components/common/DynamicInput";

function AccountPages() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');

  const [statusData, setStatusData] = useState([
    { title: "Total Pengguna", value: "0", desc: "Data yang harus diproses", icon: PengajuanIcon, },
    { title: "Aktif", value: "0", desc: "Data aktif", icon: DiprosesIcon, },
    { title: "Non Aktif", value: "0", desc: "Data tidak aktif", icon: DitolakIcon, },
  ]);

  const [listAccount, setListAccount] = useState([]);

  const [listAccountLoading, setListAccountLoading] = useState(true);

  const [formData, setFormData] = useState([]);

  const [isModalType, setisModalType] = useState({ status: false, data: {} });
  const [isModalVerif, setisModalVerif] = useState({
    status: false,
    data: {},
  });
  const [isModalCreate, setisModalCreate] = useState({
    status: false,
    data: {},
  });

  useEffect(() => {
    if (authToken) {
      fetchDataAccount(authApiKey, authToken)
    }

  }, []);



  const fetchDataAccount = async (api_key, token) => {
    setListAccountLoading(true);
    try {
      const response = await apiClient({
        baseurl: "list_user",
        method: "POST",
        apiKey: api_key,
        token: token,
      });
      setListAccountLoading(false);
      if (response?.statusCode === 200) {
        setListAccount(response.result.data);
        setStatusData([
          { ...statusData[0], value: response?.result?.totalItems, },
          { ...statusData[1], value: response?.result?.totalItemsByStatus?.aktif || 0, },
          { ...statusData[2], value: response?.result?.totalItemsByStatus?.nonaktif || 0, },
        ])
      } else {
        setListAccount([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataCreate = async (api_key, token, data) => {
    dispatch(isPending(true));
    const raw = JSON.stringify(data);
    try {
      const response = await apiClient({
        baseurl: "helpdesk/create",
        method: "POST",
        customHeaders: { "Content-Type": "application/json" },
        body: raw,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: 'Pengajuan Helpdesk Berhasil',
            msg: 'Selamat, Pengajuan anda sudah diterima',
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
  const fetchDataDelete = async (id) => {
    dispatch(isPending(true));
    const params = new URLSearchParams();
    params.append("id", id);

    try {
      const response = await apiClient({
        baseurl: "helpdesk/delete",
        method: "POST",
        body: params,
        XGORDON: "SLIDER",
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: 'Pengajuan Helpdesk Berhasil Dihapus',
            msg: response.result.msg,
            icon: PengajuanGagalIcon,
            color: '#FB4B4B'
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
  const handleInputChange = (name, value, index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].fields = updatedFormData[index].fields.map(
      (field) => {
        if (field.name === name) {
          return { ...field, value };
        }
        return field;
      }
    );
    setFormData(updatedFormData);
  };
  return (
    <div className="flex flex-col gap-3 flex-1 p-3" >
      <TitleHeader title={"Pengguna"} link1={"dashboard"} link2={"help-desk"} />
      <section className="flex md:flex-row flex-col gap-3" >
        <div className="flex-1 flex flex-col gap-3">
          <div className="grid md:grid-cols-3 grid-cols-2 gap-3">
            {statusData.map((item, index) => (
              <div
                key={index}
                className={`flex ${index === 0 ? 'md:col-span-1 col-span-2' : 'col-span-1'} flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg flex-1`}
              >
                <span className="text-lg font-semibold">{item.title}</span>
                <div className="flex flex-row gap-2 flex-1 ">
                  <div className="flex flex-row">
                    {item.icon && (
                      <item.icon
                        className="w-12 h-12" fill="#ffffff"
                      />
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
          <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <div className="flex flex-row gap-3 justify-between items-center">
              <span className="text-lg font-bold">Daftar Pengguna</span>
              <div
                  onClick={() => {
                    setisModalCreate({ data: {}, status: true });
                  }}
                  className="flex flex-row gap-2 rounded-md bg-[#0185FF] p-4 py-2 cursor-pointer"
                >
                  <div className="flex flex-row gap-2 items-center justify-center text-darkColor">
                    <PlusIcon className="w-4 h-5" fill="#ffffff" />
                    <span className="text-sm ">Tambah</span>
                  </div>
                </div>
            </div>
            <div className="flex flex-col relative">
              <TableCostum
                dataHeader={[
                  { name: "ID", field: "id" },
                  { name: "Nama ", field: "fullname" },
                  { name: "Email", field: "email" },
                  { name: "Role", field: "role" },
                  { name: "Status", field: "status" },
                  { name: "Tanggal Buat", field: "createdAt" },
                  { name: "Aksi", field: "action" },
                ]}
                showAction={{ read: true, remove: true, edit: true }}
                onClickShow={(id) => {
                  navigate("/detail-help-desk", { state: { slug: id } });
                }}
                onClickRemove={(a) => {
                  const isConfirmed = window.confirm("Apakah kamu yakin ingin menghapus pengajuan ini?");
                  if (isConfirmed) {
                    fetchDataDelete(a)
                  } else {
                    alert("Pengajuan tidak dihapus.");
                  }
                }}
                data={listAccount}
              />
            </div>
          </div>
        </div>
      </section>

      <ModalContent
        className={"sm:max-w-5xl "}
        children={
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <span className="text-lg font-bold font-gilroy">
                Buat Pengguna
              </span>
              <DynamicButton
                iconLeft={<CloseIcon className="w-4 h-4 " />}
                color={isDarkMode ? "#ffffff" : "#212121"}
                type="transparent"
                className="inline-flex p-2"
                onClick={() => {
                  setisModalCreate({ data: {}, status: false });
                }}
              />
            </div>
            <div className="flex flex-col overflow-hidden rounded-b-md gap-3">
              {formData.map(
                (section, sectionIndex) =>
                  section.name === isModalCreate.data && (
                    <div key={sectionIndex} className="flex flex-col gap-3">
                      {section.fields.map((item, index) => (
                        <div key={index} className="flex flex-col gap-2">
                          <DynamicInput
                            key={index}
                            name={item.name}
                            label={item.label}
                            value={item.value}
                            options={item.options}
                            onChange={(value) =>
                              handleInputChange(item.name, value, sectionIndex)
                            }
                            type={item.type}
                            placeholder={"Masukan " + item.label}
                          />
                        </div>
                      ))}
                    </div>
                  )
              )}
            </div>
            <div className="flex flex-row gap-2 justify-end">
              <DynamicButton
                initialValue={"Batal"}
                type="fill"
                color={"#ffffff"}
                className="inline-flex bg-cardLight dark:bg-cardDark text-cardDark dark:text-cardLight"
                onClick={() => {
                  setisModalCreate({ data: {}, status: false });
                }}
              />
              <DynamicButton
                initialValue={"Tambah"}
                type="fill"
                color={"#ffffff"}
                className="inline-flex  bg-[#0185FF] text-darkColor"
                onClick={() => {
                  // checkingFormData();
                }}

              />
            </div>
          </div>
        }
        active={isModalCreate.status}
      />

    </div>
  );
}

export default AccountPages;
