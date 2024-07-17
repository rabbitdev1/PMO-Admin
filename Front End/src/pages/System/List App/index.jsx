import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as DocumentIcon } from "../../../assets/icon/ic_document.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icon/ic_plus.svg";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicInput from "../../../components/common/DynamicInput";
import TableCostum from "../../../components/data-display/TableCostum";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import { isPending } from "../../../components/store/actions/todoActions";
import ModalContent from "../../../components/ui/Modal/ModalContent";
import { apiClient } from "../../../utils/api/apiClient";
import { isValidatorListApps } from "../validators";

function DataAppPerangkatDaerah() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');
  const authProfile = Cookies.get('authData');

  const [statusData, setStatusData] = useState([
    { title: "Total Aplikasi", value: "0", desc: "Data proses berjalan", icon: DocumentIcon, color: '#FFA500' },
    { title: "Aplikasi Kosong", value: "0", desc: "Data proses berjalan", icon: DocumentIcon, color: '#FF0000' },
  ]);


  const [listdataAplikasi, setlistdataAplikasi] = useState([]);
  const [listdataAplikasiLoading, setlistdataAplikasiLoading] = useState(true);

  const [formData, setFormData] = useState({});

  const [isModalType, setisModalType] = useState({ status: false, data: {} });

  const dataState = location.state;

  useEffect(() => {
    if (authToken) {
      fetchDataAplikasi(authApiKey, authToken, JSON.parse(authProfile)?.role)
    }
  }, [dataState, authApiKey, authToken, authProfile]);


  const fetchDataAplikasi = async (api_key, token, role) => {
    setlistdataAplikasiLoading(true);
    const params = new URLSearchParams();
    params.append("role", role);
    try {
      const response = await apiClient({
        baseurl: "perangkat-daerah/apps",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      setlistdataAplikasiLoading(false);
      if (response?.statusCode === 200) {
        setlistdataAplikasi(response.result.data);
        setStatusData([
          { ...statusData[0], value: response?.result?.totalItems, },
        ])
      } else {
        setlistdataAplikasi([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataCreate = async (api_key, token, data) => {
    dispatch(isPending(true));
    const urlEncodedData = new URLSearchParams(data).toString();

    try {
      const response = await apiClient({
        baseurl: "perangkat-daerah/set_apps",
        method: "POST",
        body: urlEncodedData,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        toast.success(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setisModalType({ data: '', status: false });
        setFormData({})
        fetchDataAplikasi(authApiKey, authToken, JSON.parse(authProfile)?.role)
      } else {
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataEdit = async (api_key, token, data) => {
    dispatch(isPending(true));
    const urlEncodedData = new URLSearchParams(data).toString();

    try {
      const response = await apiClient({
        baseurl: "perangkat-daerah/edit_apps",
        method: "POST",
        body: urlEncodedData,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        toast.success(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setisModalType({ data: '', status: false });
        setFormData({})
        fetchDataAplikasi(authApiKey, authToken, JSON.parse(authProfile)?.role)
      } else {
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
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
        baseurl: "perangkat-daerah/delete_apps",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        toast.success(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setisModalType({ data: '', status: false });
        setFormData({})
        fetchDataAplikasi(authApiKey, authToken, JSON.parse(authProfile)?.role)
      } else {
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkingFormData = async (combinedObject) => {
    if (isValidatorListApps(combinedObject)) {
      if (isModalType.data === "Tambah Aplikasi") {
        fetchDataCreate(authApiKey, authToken, combinedObject);
      } else {
        fetchDataEdit(authApiKey, authToken, combinedObject);
      }
    } else {
      return false;
    }
  };
  return (
    <div className="flex flex-col gap-3 flex-1 p-4" >
      <Breadcrumb title={"Data Aplikasi Perangkat Daerah"} link1={"dashboard"} link2={'Data Aplikasi'} />
      <section className="flex xl:flex-row flex-col gap-3" >
        <div className="flex-1 flex flex-col gap-3">
          <div className={`flex-1 grid ${JSON.parse(authProfile)?.role === "perangkat_daerah" ? "md:grid-cols-2 grid-cols-1" : "lg:grid-cols-4 grid-cols-2"}  gap-3`}>
            {statusData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg flex-1 shadow-sm"
              >
                <span className="text-lg font-semibold">{item.title}</span>
                <div className="flex flex-row gap-2 flex-1 ">
                  <div className="flex flex-row">
                    {item.icon && (
                      <item.icon
                        className="w-12 h-12" fill={item.color}
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
              <span className="text-lg font-bold">Daftar Aplikasi</span>
              <div className="flex flex-col"  >
                <DynamicButton
                  iconLeft={<PlusIcon className="w-4 h-4 " />}
                  initialValue={'Tambah Aplikasi'}
                  color={"#ffffff"}
                  type="transparent"
                  className="bg-[#0185FF] text-darkColor px-3"
                  onClick={() => {
                    setisModalType({ data: 'Tambah Aplikasi', status: true });
                  }}
                />

              </div>
            </div>
            <div className="flex flex-col relative">
              <TableCostum
                dataHeader={[
                  { name: "ID", field: "id" },
                  { name: "Nama Aplikasi", field: "name_apps" },
                  { name: "Tanggal Pembuatan", field: "createdAt" },
                  { name: "Aksi", field: "action" },
                ]}
                loading={listdataAplikasiLoading}
                showAction={{ read: true, remove: true, edit: true }}
                onClickShow={(data) => {
                  setisModalType({ data: 'Edit Aplikasi', status: true });
                  setFormData(data);
                }}
                onClickRemove={(data) => {
                  fetchDataDelete(authApiKey, authToken, data.id, "perangkat-daerah")
                }}
                data={listdataAplikasi}
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
              {isModalType.data === "Tambah Aplikasi" ? "Form Tambah Aplikasi" : "Form Detail Aplikasi"}
            </span>
            {[
              {
                label: "Nama Aplikasi",
                value: formData.name_apps,
                type: "text",
                name: "name_apps",
              },
            ].map((inputProps, index) => {
              return (
                <DynamicInput
                  key={index}
                  label={inputProps.label}
                  value={inputProps.value}
                  disabled={formData.total_price && false}
                  type={inputProps.type}
                  options={inputProps.options}
                  placeholder={'Masukan ' + inputProps.label}
                  onChange={(value) => {
                    let updatedFormData = {
                      ...formData,
                      [inputProps.name]:  value,
                    };
                    setFormData(updatedFormData);
                  }}
                />

              );
            })}
            <DynamicButton
              initialValue={isModalType.data}
              type="fill"
              color={"#ffffff"}
              className="inline-flex  bg-[#0185FF] text-darkColor"
              onClick={() => {
                checkingFormData(formData);
              }}
            />
          </div>
        }
        active={isModalType.status}
        onClose={() => {
          setFormData({});
          setisModalType({ data: {}, status: false })
        }}
      />
    </div>
  );
}

export default DataAppPerangkatDaerah;
