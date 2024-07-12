import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ReactComponent as DocumentIcon } from "../../../assets/icon/ic_document.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icon/ic_plus.svg";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicInput from "../../../components/common/DynamicInput";
import TableCostum from "../../../components/data-display/TableCostum";
import TitleHeader from "../../../components/layout/TitleHeader";
import ModalContent from "../../../components/ui/Modal/ModalContent";
import { apiClient } from "../../../utils/api/apiClient";
import { isValidatorListTools } from "../validators";

function DataAlatInfraPage() {
  const navigate = useNavigate();
  const location = useLocation();
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
  const [isModalVerif, setisModalVerif] = useState({
    status: false,
    data: {},
  });


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
        if (JSON.parse(authProfile)?.role === "perangkat_daerah") {
          const filteredSubmissions = response.result.data?.filter(submission => submission.submission_title === dataState);
          setlistdataAlat(filteredSubmissions);
        } else {
          setlistdataAlat(response.result.data);
        }

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

  const checkingFormData = async (combinedObject) => {
    if (isValidatorListTools(combinedObject)) {
      // await isValidatorListTools(combinedObject);
      console.log(combinedObject);
    } else {
      return false;
    }
  };
  return (
    <div className="flex flex-col gap-3 flex-1 p-4" >
      <TitleHeader title={"Data Alat Infrastrukur"} link1={"dashboard"} link2={'Bidang Infrastruktur Teknologi, Informasi dan Komunikasi'} />
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
                  navigate("/detail-infrastruktur", { state: { slug: data.id } });
                }}
                onClickRemove={(data) => {
                  const isConfirmed = window.confirm("Apakah kamu yakin ingin menghapus pengajuan ini?");
                  if (isConfirmed) {
                    // fetchDataDelete(authApiKey, authToken, data.id, "infrastruktur")
                  } else {
                    alert("Pengajuan tidak dihapus.");
                  }
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
              {isModalType.data}
            </span>
            {[
              {
                label: "Nama Barang",
                value: formData.name_tools,
                type: "text",
                name: "name_tools",
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
                  setFormData(updatedFormData);
                }}
              />
              
              );
            })}
            <DynamicButton
              initialValue={"Lanjutkan"}
              type="fill"
              color={"#ffffff"}
              className="inline-flex  bg-[#0185FF] text-darkColor"
              onClick={() => {
                checkingFormData(formData);

                // if (
                //   validationData.status_validation === "0" &&
                //   validationData?.response === undefined
                // ) {
                //   toast.error("Wajib masukan Tanggapan", {
                //     position: toast.POSITION.TOP_RIGHT,
                //   });
                // } else {
                //   checkingFormData("validation", validationData);
                // }
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
                  setisModalType({ data: {}, status: false })
                  fetchDataAlat(authApiKey, authToken, JSON.parse(authProfile)?.role)
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

export default DataAlatInfraPage;
