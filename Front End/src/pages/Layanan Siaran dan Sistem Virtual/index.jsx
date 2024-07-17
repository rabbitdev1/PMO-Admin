import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as CloseIcon } from "../../assets/icon/ic_close.svg";
import { ReactComponent as DocumentIcon } from "../../assets/icon/ic_document.svg";
import { ReactComponent as PengajuanBerahasilIcon } from "../../assets/icon/ic_pengajuan_berhasil.svg";
import { ReactComponent as PengajuanGagalIcon } from "../../assets/icon/ic_pengajuan_gagal.svg";
import { ReactComponent as PlusIcon } from "../../assets/icon/ic_plus.svg";
import DynamicButton from "../../components/common/DynamicButton";
import DynamicInput from "../../components/common/DynamicInput";
import useTheme from "../../components/context/useTheme";
import TableCostum from "../../components/data-display/TableCostum";
import Breadcrumb from "../../components/layout/Breadcrumb";
import { isPending } from "../../components/store/actions/todoActions";
import ModalContent from "../../components/ui/Modal/ModalContent";
import { apiClient } from "../../utils/api/apiClient";
import { convertToNameValueObject } from "../../utils/helpers/convertToNameValueObject";

import resetFormData from "../../components/common/ResetFormData";
import ModalContentComponent from "../../components/ui/ModalContentComponent";
import fetchUploadFiles from "../../utils/api/uploadFiles";
import { formData as initialFormData } from "./data";
import { isValidatorPermohonanLiputan, isValidatorPermohonanPodcast, isValidatorZoom } from "./validators";
import PanduanPengajuanModal from "../../components/ui/PanduanPengajuanModal";

function SistemVirtualPages() {
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

  const [listSistemVirtual, setListSistemVirtual] = useState([]);
  const [listSistemVirtualLoading, setListSistemVirtualLoading] = useState(true);

  const [isModalPanduan, setisModalPanduan] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
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
      fetchDataSistemVirtual(
        authApiKey,
        authToken,
        JSON.parse(authProfile)?.role
      );
    }
  }, [dataState,authApiKey, authProfile,authToken]);

  const fetchDataSistemVirtual = async (api_key, token, role) => {
    setListSistemVirtualLoading(true);
    const params = new URLSearchParams();
    params.append("role", role);
    try {
      const response = await apiClient({
        baseurl: "sistem-virtual",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      // setListSistemVirtualstemInformasiLoading(false);
      dispatch(isPending(false));
      setListSistemVirtualLoading(false);
      if (response?.statusCode === 200) {
        if (JSON.parse(authProfile)?.role === "perangkat_daerah") {
          const filteredSubmissions = response.result.data?.filter(
            (submission) => submission.submission_title === dataState
          );
          setListSistemVirtual(filteredSubmissions);
        } else {
          setListSistemVirtual(response.result.data);
        }

        setStatusData([
          { ...statusData[0], value: response?.result?.totalItems ||0},
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
        setListSistemVirtual([]);
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
        baseurl: "sistem-virtual/create",
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
            title: "Pengajuan Layanan Siaran dan Sistem Virtual Berhasil",
            msg: "Selamat! Pengajuan Layanan Siaran dan Sistem Virtual Anda telah berhasil diterima dan diproses.",
            icon: PengajuanBerahasilIcon,
            color: "#13C39C",
          },
          status: true,
        });
        resetFormData(isModalCreate.data, formData, setFormData);
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
        baseurl: "sistem-virtual/delete",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: "Pengajuan Layanan Siaran dan Sistem Virtual Berhasil Dihapus",
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
  const fetchSetProgress = async (api_key, token, id) => {
    const params = new URLSearchParams();
    params.append("id", id);

    try {
      const response = await apiClient({
        baseurl: "sistem-virtual/set_process",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      if (response?.statusCode === 200) {
        navigate("/detail-siaran-dan-sistem-virtual", {
          state: { slug: id },
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleInputChange = (fieldName, value, sectionIndex) => {
    const updatedFormData = [...formData];
    const currentSection = updatedFormData[sectionIndex];
    const fieldToUpdateIndex = currentSection.fields.findIndex(
      (field) => field.name === fieldName
    ); 
    updatedFormData[sectionIndex].fields[fieldToUpdateIndex].value = value;

    setFormData(updatedFormData);
  };
  const checkingFormData = async () => {
    const foundObject = formData.find((obj) => obj.name === isModalCreate.data);
    if (foundObject) {
      const { result: nameValueObject, newObject: newObjectFromConversion } =
        convertToNameValueObject(foundObject);
      const nameValueObject2 = {
        submission_type: "Layanan Siaran dan Sistem Virtual",
        role: foundObject.role,
        submission_title: isModalCreate.data.replace("Pengajuan ", ""),
      };
      const combinedObject = {
        ...nameValueObject,
        ...nameValueObject2,
        ...newObjectFromConversion.reduce(
          (acc, cur) => ({ ...acc, [cur.name]: cur.value }),
          {}
        ),
      };
      console.log(JSON.stringify(combinedObject));
      if (combinedObject?.submission_title === "Layanan ZOOM") {
        if (isValidatorZoom(combinedObject)) {
          await handleImageUploadAndFetch(combinedObject);
        } else {
          return false;
        }
      } else if (combinedObject?.submission_title === "Permohonan Liputan") {
        if (isValidatorPermohonanLiputan(combinedObject)) {
          await handleImageUploadAndFetch(combinedObject);
        } else {
          return false;
        }
      } else if (combinedObject?.submission_title === "Permohonan Podcast") {
        if (isValidatorPermohonanPodcast(combinedObject)) {
          await handleImageUploadAndFetch(combinedObject);
        } else {
          return false;
        }
      }
    } else {
      console.log("Objek tidak ditemukan dalam formData");
    }
  };
  const handleImageUploadAndFetch = async (obj) => {
    if (obj.file_process_bisiness) {
      const result = await fetchUploadFiles(
        authApiKey,
        authToken,
        obj.file_process_bisiness,
        "sistem-virtual",
        dispatch
      );
      if (result !== null) {
        const fixObject = {
          ...obj,
          file_process_bisiness: result,
        };
        fetchDataCreate(authApiKey, authToken, fixObject);
      } else {
        console.error("Error occurred during image upload.");
      }
    }
    if (obj.file_pengajuan_zoom) {
      const result = await fetchUploadFiles(authApiKey, authToken, obj.file_pengajuan_zoom, "sistem-virtual", dispatch);
      if (result !== null) {
        const fixObject = {
          ...obj,
          file_pengajuan_zoom: result,
        };
        fetchDataCreate(authApiKey, authToken, fixObject);
      } else {
        console.error("Error occurred during image upload.");
      }
    }
    else {
      fetchDataCreate(authApiKey, authToken, obj);
    }
  };
  const updatePic = (name, number) => {
    const updatedData = formData.map((form) => {
      return {
        ...form,
        fields: form.fields.map((field) => {
          if (field.name === "name_pic") {
            return { ...field, value: name };
          }
          if (field.name === "telp_pic") {
            return { ...field, value: number };
          }
          return field;
        }),
      };
    });

    setFormData(updatedData);
  };

  return (
    <div className="flex flex-col gap-3 flex-1 p-4">
      <Breadcrumb
        title={
          JSON.parse(authProfile)?.role === "perangkat_daerah"
            ? "Layanan Pengajuan " + dataState
            : "Layanan Siaran dan Sistem Virtual"
        }
        link1={"dashboard"}
        link2={"Layanan Siaran dan Sistem Virtual"}
      />
      <section className="flex xl:flex-row flex-col gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex md:flex-row flex-col gap-3">
            {JSON.parse(authProfile)?.role === "perangkat_daerah" && (
              <div className="flex flex-col gap-2 bg-[#0185FF] p-3 rounded-lg flex-1 md:max-w-xs shadow-sm">
                <span className="sm:text-xl text-sm text-darkColor font-semibold">
                  Selamat datang di Layanan Siaran dan Sistem Virtual
                </span>
                <div className="flex flex-col flex-1 justify-end items-end">
                  <DynamicButton
                    initialValue={"Panduan Pengajuan"}
                    color={"#ffffff"}
                    type="transparent"
                    className="bg-[#ffffff] text-[#0185FF] px-3"
                    onClick={() => {
                      setisModalPanduan(true);
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
                      setisModalCreate({ data: "Pengajuan " + dataState, status: true });
                      updatePic(JSON.parse(authProfile).fullname, JSON.parse(authProfile).telp);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col relative">
              <TableCostum
                dataHeader={[
                  { name: "No Pengajuan", field: "id" },
                  { name: "Nama PIC", field: "name_pic" },
                  { name: "Jenis Layanan", field: "submission_title" },
                  { name: "Status Layanan", field: "submission_status" },
                  { name: "Tanggal Pengajuan", field: "createdAt" },
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
                onClickShow={(data) => {
                  if (JSON.parse(authProfile)?.role === "op_pmo") {
                    fetchSetProgress(authApiKey, authToken, data.id);
                  } else {
                    navigate("/detail-siaran-dan-sistem-virtual", {
                      state: { slug: data.id },
                    });
                  }
                }}
                loading={listSistemVirtualLoading}
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
                        "sistem-virtual"
                      );
                    } else {
                      alert("Pengajuan tidak dihapus.");
                    }
                  }
                }}
                data={listSistemVirtual}
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
                Buat {isModalCreate.data}
              </span>
              <DynamicButton
                iconLeft={<CloseIcon className="w-4 h-4 " />}
                color={isDarkMode ? "#ffffff" : "#212121"}
                type="transparent"
                className="inline-flex p-2"
                onClick={() => {
                  setisModalCreate({ data: {}, status: false });
                  resetFormData(isModalCreate.data, formData, setFormData);
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
                          {item.visible !== false && (
                            <DynamicInput
                              name={item.name}
                              label={item.label}
                              noted={item.noted}
                              value={item.value}
                              options={item.options}
                              onChange={(value) =>
                                handleInputChange(
                                  item.name,
                                  value,
                                  sectionIndex
                                )
                              }
                              type={item.type}
                              placeholder={"Masukan " + item.label}
                            />
                          )}
                          {section.name === "Pengajuan Penambahan Alat" &&
                            item.label === "Jenis Alat yang dibutuhkan" &&
                            item.value?.length !== 0 && (
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold">
                                  Jumlah Usulan Alat Yang Dipilih :
                                </span>
                                <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-3">
                                  {item.value.map(
                                    (selectedItem, selectedItemIndex) => (
                                      <DynamicInput
                                        key={selectedItemIndex}
                                        name={selectedItem.value}
                                        label={`Jumlah ${selectedItem.label}`}
                                        value={selectedItem.quantity || ""}
                                        onChange={(value) => {
                                          const updatedFormData = [...formData];
                                          const alatField =
                                            updatedFormData[sectionIndex]
                                              .fields[index].value;
                                          alatField[
                                            selectedItemIndex
                                          ].quantity = value;
                                          setFormData(updatedFormData);
                                        }}
                                        type={"select_number"}
                                        placeholder={`Masukan Jumlah ${selectedItem.label}`}
                                      />
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          {item?.field &&
                            item?.field?.map(
                              (itemField, indexField) =>
                                item?.value?.value ===
                                itemField.type_select && (
                                  <DynamicInput
                                    key={indexField}
                                    name={itemField.name}
                                    label={itemField.label}
                                    value={itemField.value}
                                    options={itemField.options}
                                    onChange={(value) => {
                                      const updatedFormData = [...formData];
                                      updatedFormData[sectionIndex].fields[
                                        index
                                      ].field[indexField].value = value;
                                      setFormData(updatedFormData);
                                    }}
                                    type={itemField.type}
                                    placeholder={"Masukan " + itemField.label}
                                  />
                                )
                            )}
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
                  resetFormData(isModalCreate.data, formData, setFormData);
                }}
              />
              <DynamicButton
                initialValue={"Ajukan Permohonan"}
                type="fill"
                color={"#ffffff"}
                className="inline-flex  bg-[#0185FF] text-darkColor"
                onClick={() => {
                  checkingFormData();
                }}
              />
            </div>
          </div>
        }
        active={isModalCreate.status}
      />
      <PanduanPengajuanModal
        isModalPanduan={isModalPanduan}
        setisModalPanduan={setisModalPanduan}
        isDarkMode={isDarkMode}
        children={
          <div className="flex flex-col overflow-hidden rounded-b-md">
            <p>
              1. Klik layanan yang akan diajukan pada Side Bar Menu atau Menu
              Bar Samping.
            </p>
            <p>
              2. Lalu muncul submenu atau menu sekunder klik salah satu layanan.
            </p>
            <p>3. Klik tombol ajukan permohonan.</p>
            <p>
              4. Lalu akan muncul formulir yang harus diisi oleh Operator
              Perangkat Daerah (Nama PIC dan Nomor PIC akan terisi otomatis).
            </p>
            <p>
              5. Jika ada formulir yang mengharuskan input file mohon inputkan file yang berekstensi
              pdf, xlsx dan docs.
            </p>
            <p>
              6. Jika dirasa sudah cukup maka klik tombol Ajukan Permohonan.
            </p>
            <p className="font-bold">
              Dengan catatan semua formulir harus terisi!
            </p>
          </div>
        }
      />
      <ModalContentComponent
        isModalVerif={isModalVerif}
        setisModalVerif={setisModalVerif}
        setisModalCreate={setisModalCreate}
        fetchData={fetchDataSistemVirtual}
        authApiKey={authApiKey}
        authToken={authToken}
        authProfile={authProfile}
      />
    </div>
  );
}

export default SistemVirtualPages;
