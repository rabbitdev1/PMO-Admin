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
import { isValidatorListTools } from "../validators";

function DataAlatInfraPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');
  const authProfile = Cookies.get('authData');

  const [statusData, setStatusData] = useState([
    { title: "Total Alat", value: "0", desc: "Data proses berjalan", icon: DocumentIcon, color: '#FFA500' },
    { title: "Alat Kosong", value: "0", desc: "Data proses berjalan", icon: DocumentIcon, color: '#FF0000' },
  ]);


  const [listdataAlat, setlistdataAlat] = useState([]);
  const [listdataAlatLoading, setlistdataAlatLoading] = useState(true);

  const [formData, setFormData] = useState({});

  const [isModalType, setisModalType] = useState({ status: false, data: {} });

  const dataState = location.state;

  useEffect(() => {
    if (authToken) {
      fetchDataAlat(authApiKey, authToken, JSON.parse(authProfile)?.role)
    }
  }, [dataState, authApiKey, authToken, authProfile]);


  const fetchDataAlat = async (api_key, token, role) => {
    setlistdataAlatLoading(true);
    const params = new URLSearchParams();
    params.append("role", role);
    try {
      const response = await apiClient({
        baseurl: "infrastruktur/tools",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      setlistdataAlatLoading(false);
      if (response?.statusCode === 200) {
        setlistdataAlat(response.result.data);
        setStatusData([
          { ...statusData[0], value: response?.result?.totalItems, },
          { ...statusData[1], value: response?.result?.totalItemsByStatus?.totalAlatKosong || 0, },
        ])
      } else {
        setlistdataAlat([]);
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
        baseurl: "infrastruktur/set_tools",
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
        fetchDataAlat(authApiKey, authToken, JSON.parse(authProfile)?.role)
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
        baseurl: "infrastruktur/edit_tools",
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
        fetchDataAlat(authApiKey, authToken, JSON.parse(authProfile)?.role)
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
        baseurl: "infrastruktur/delete_tools",
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
        fetchDataAlat(authApiKey, authToken, JSON.parse(authProfile)?.role)
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
    if (isValidatorListTools(combinedObject)) {
      if (isModalType.data === "Tambah Alat") {
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
      <Breadcrumb title={"Data Alat Infrastrukur"} link1={"dashboard"} link2={'Data Alat'} />
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
              <span className="text-lg font-bold">Daftar Alat</span>
              <div className="flex flex-col"  >
                <DynamicButton
                  iconLeft={<PlusIcon className="w-4 h-4 " />}
                  initialValue={'Tambah Alat'}
                  color={"#ffffff"}
                  type="transparent"
                  className="bg-[#0185FF] text-darkColor px-3"
                  onClick={() => {
                    setisModalType({ data: 'Tambah Alat', status: true });
                  }}
                />

              </div>
            </div>
            <div className="flex flex-col relative">
              <TableCostum
                dataHeader={[
                  { name: "ID", field: "id" },
                  { name: "Nama Alat", field: "name_tools" },
                  { name: "Jenis Alat", field: "type_tools" },
                  { name: "Total Alat", field: "total_tools" },
                  { name: "Tanggal Pembuatan", field: "createdAt" },
                  { name: "Aksi", field: "action" },
                ]}
                loading={listdataAlatLoading}
                showAction={{ read: true, remove: true, edit: true }}
                onClickShow={(data) => {
                  setisModalType({ data: 'Edit Alat', status: true });
                  setFormData(data);
                }}
                onClickRemove={(data) => {
                  fetchDataDelete(authApiKey, authToken, data.id, "infrastruktur")
                }}
                data={listdataAlat}
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
              {isModalType.data === "Tambah Alat" ? "Form Tambah Alat" : "Form Detail Alat"}
            </span>
            {[
              {
                label: "Nama Barang",
                value: formData.name_tools,
                type: "text",
                name: "name_tools",
              },
              {
                label: "Jenis Alat",
                value: formData.type_tools,
                type: "selection",
                options: [
                  { value: "Networking", label: "Networking" },
                  { value: "Security", label: "Security" },
                  { value: "Hardware", label: "Hardware" },
                  { value: "Power Supply", label: "Power Supply" },
                  { value: "Cabling", label: "Cabling" },
                ],
                name: 'type_tools'
              },
              {
                label: "Jumlah Barang",
                value: formData.total_tools || 0,
                type: "select_number",
                name: "total_tools",
              },
              {
                label: "Spesifikasi",
                value: formData.spec_tools,
                type: "textarea",
                name: "spec_tools",
              },
              {
                label: "Harga Satuan",
                value: formData.unit_price,
                type: "currency",
                name: "unit_price",
              },
              {
                label: "Jumlah",
                value: (formData.total_tools || 0) * (formData.unit_price || 0),
                type: "currency",
                name: "total_price",
              }
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
                      [inputProps.name]: inputProps.type === "currency" ? parseFloat(value) : value,
                    };
                    if (inputProps.name === "unit_price" || inputProps.name === "total_tools") {
                      updatedFormData.total_price = (updatedFormData.total_tools || 0) * (updatedFormData.unit_price || 0);
                    }
                    if (inputProps.name === "type_tools") {
                      updatedFormData.type_tools = value.value;
                    }
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

export default DataAlatInfraPage;
