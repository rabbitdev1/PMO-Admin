import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as CloseIcon } from "../../assets/icon/ic_close.svg";
import { ReactComponent as PengajuanBerahasilIcon } from "../../assets/icon/ic_pengajuan_berhasil.svg";
import { ReactComponent as PengajuanGagalIcon } from "../../assets/icon/ic_pengajuan_gagal.svg";
import { ReactComponent as PlusIcon } from "../../assets/icon/ic_plus.svg";
import { ReactComponent as DisetujuiIcon } from "../../assets/icon/status/ic_disetujui.svg";
import { ReactComponent as DitolakIcon } from "../../assets/icon/status/ic_ditolak.svg";
import { ReactComponent as PengajuanIcon } from "../../assets/icon/status/ic_pengajuan.svg";
import { ReactComponent as DiprosesIcon } from "../../assets/icon/status/ic_proses.svg";
import DynamicButton from "../../components/common/DynamicButton";
import DynamicInput from "../../components/common/DynamicInput";
import useTheme from "../../components/context/useTheme";
import TableCostum from "../../components/data-display/TableCostum";
import TitleHeader from "../../components/layout/TitleHeader";
import ConditionalRender from "../../components/ui/ConditionalRender";
import ModalContent from "../../components/ui/Modal/ModalContent";
import { apiClient } from "../../utils/api/apiClient";
import { convertToNameValueObject } from "../../utils/helpers/convertToNameValueObject";
import { validateFormData } from "../../utils/helpers/formDataValidation";
import { formData as initialFormData } from './data';
import { isPending } from "../../components/store/actions/todoActions";

function HelpDeskPages() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);

  const [statusData, setStatusData] = useState([
    { title: "Pengajuan", value: "0", desc: "Data yang harus diproses", icon: PengajuanIcon, },
    { title: "Proses", value: "0", desc: "Data proses berjalan", icon: DiprosesIcon, },
    { title: "Ditolak", value: "0", desc: "Data pengajuan ditolak", icon: DitolakIcon, },
    { title: "Selesai", value: "0", desc: "Data pengajuan selesai", icon: DisetujuiIcon, },
  ]);


  const [listFAQ, setlistFAQ] = useState([]);
  const [listHelpDesk, setListHelpDesk] = useState([]);

  const [listFAQLoading, setlistFAQLoading] = useState(true);
  const [listHelpDeskLoading, setListHelpDeskLoading] = useState(true);

  const [formData, setFormData] = useState(initialFormData);

  const [showOverlay, setShowOverlay] = useState(false);
  const [isModalType, setisModalType] = useState({ status: false, data: {} });
  const [isModalFAQ, setisModalFAQ] = useState({ status: false, data: {} });
  const [isModalCreate, setisModalCreate] = useState({
    status: false,
    data: {},
  });
  const [isModalVerif, setisModalVerif] = useState({
    status: false,
    data: {},
  });


  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataFaq();
    fetchDataHelpDesk()
  }, []);

  const fetchDataFaq = async () => {
    setlistFAQLoading(true);
    try {
      const response = await apiClient({
        baseurl: "helpdesk_faq",
        method: "POST",
        XGORDON: "SLIDER",
      });
      setlistFAQLoading(false);
      if (response?.statusCode === 200) {
        setlistFAQ(response.result.data);
      } else {
        setlistFAQ([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataHelpDesk = async () => {
    setListHelpDeskLoading(true);
    try {
      const response = await apiClient({
        baseurl: "helpdesk",
        method: "POST",
        XGORDON: "SLIDER",
      });
      setListHelpDeskLoading(false);
      if (response?.statusCode === 200) {
        setListHelpDesk(response.result.data);
        setStatusData([
          { ...statusData[0], value: response?.result?.totalItems, },
          { ...statusData[1], value: response?.result?.totalItemsByStatus?.diproses || 0, },
          { ...statusData[2], value: response?.result?.totalItemsByStatus?.ditolak || 0, },
          { ...statusData[3], value: response?.result?.totalItemsByStatus?.disetujui || 0, },
        ])
      } else {
        setListHelpDesk([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataCreate = async (data) => {
    dispatch(isPending(true));
    const raw = JSON.stringify(data);
    try {
      const response = await apiClient({
        baseurl: "helpdesk/create",
        method: "POST",
        customHeaders: { "Content-Type": "application/json" },
        body: raw,
        XGORDON: "SLIDER",
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


  const checkingFormData = () => {
    const foundObject = formData.find((obj) => obj.name === isModalCreate.data);
    if (foundObject) {
      const { result: nameValueObject, newObject: newObjectFromConversion } = convertToNameValueObject(foundObject);
      const nameValueObject2 = { helpdesk_type: isModalType.data, helpdesk_title: isModalCreate.data.replace('Pengajuan', '') };
      const combinedObject = {
        ...nameValueObject,
        ...nameValueObject2,
        ...newObjectFromConversion.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {})
      };
      // 
      if (validateFormData(combinedObject)) {
        toast.error("Terdapat nilai kosong dalam formData.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        fetchDataCreate(combinedObject);
      }

    } else {
      console.log("Objek tidak ditemukan dalam formData");
    }
  }

  return (
    <div className="flex flex-col gap-3 flex-1 p-3" >
      <TitleHeader title={"Help Desk"} link1={"dashboard"} link2={"help-desk"} />
      <section className="flex xl:flex-row flex-col gap-3" >
        <div className="flex-1 flex flex-col gap-3">
          <div className="grid xl:grid-cols-4 grid-cols-2 gap-3">
            {statusData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg flex-1"
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
              <span className="text-lg font-bold">Daftar Pengajuan</span>
              <OverlayTrigger
                trigger="click"
                placement="bottom-end"
                show={showOverlay}
                onHide={() => setShowOverlay(false)}
                overlay={
                  <Popover className="flex flex-col w-[500px] gap-3 bg-cardLight dark:bg-cardDark text-lightColor dark:text-darkColor">
                    <div className="flex flex-col p-3 pb-2">
                      <span className="text-base font-bold font-gilroy">
                        Jenis Pengajuan
                      </span>
                    </div>
                    <div className="flex flex-col overflow-hidden rounded-b-md pb-2">
                      {[
                        { title: "Pengajuan Helpdesk Infrastruktur", },
                        { title: "Pengajuan Helpdesk Aplikasi", },
                      ].map((item, index) => (
                        <button
                          key={index}
                          className={`flex flex-row justify-start items-center gap-2 flex-1 ${index % 2 ? "" : "bg-[#f1f5f9] dark:bg-[#f1f5f907]"} py-2 p-3 hover:opacity-70`}
                          onClick={() => {
                            setisModalType({ data: item.title, status: true });
                            setShowOverlay(false);
                          }}
                        >
                          <span className=" text-base text-left line-clamp-2 font-gilroy">
                            {item.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </Popover>
                }
              >
                <div
                  onClick={() => {
                    setShowOverlay(!showOverlay);
                  }}
                  className="flex flex-row gap-2 rounded-md bg-[#0185FF] p-4 py-2 cursor-pointer"
                >
                  <div className="flex flex-row gap-2 items-center justify-center text-darkColor">
                    <PlusIcon className="w-4 h-5" fill="#ffffff" />
                    <span className="text-sm ">Tambah</span>
                  </div>
                </div>
              </OverlayTrigger>
            </div>
            <div className="flex flex-col relative">
              <TableCostum
                dataHeader={[
                  { name: "ID", field: "id" },
                  { name: "Nama PIC", field: "name_pic" },
                  { name: "Jenis Pengajuan", field: "helpdesk_title" },
                  { name: "Status", field: "submission_status" },
                  { name: "Tanggal", field: "createdAt" },
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
                data={listHelpDesk}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col xl:max-w-xs gap-3">
          <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <span className="text-lg font-bold">Pertanyaan Umum</span>
            <div className="flex flex-col">
              <ConditionalRender
                data={listFAQ}
                loading={listFAQLoading}
                className={"flex flex-col min-h-[200px]"}
                model={"emptyData"}>
                {listFAQ.map((item, index) => (
                  <button
                    className={`flex flex-row p-3 py-2.5 text-left ${index % 2 === 0 ? "bg-[#f1f5f9] dark:bg-[#f1f5f907]" : ""}`}
                    key={index}
                    onClick={() => {
                      setisModalFAQ({ data: item, status: true });
                    }}
                  >
                    <span className="text-sm line-clamp-3">{item.title}</span>

                  </button>
                ))}
              </ConditionalRender>
            </div>
          </div>
        </div>
      </section>

      <ModalContent
        className={"sm:max-w-3xl"}
        children={
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <span className="text-lg font-bold font-gilroy">
                {isModalFAQ.data?.title}
              </span>
              <DynamicButton
                iconLeft={<CloseIcon className="w-4 h-4 " />}
                color={isDarkMode ? "#ffffff" : "#212121"}
                type="transparent"
                className="inline-flex p-2"
                onClick={() => {
                  setisModalFAQ({ data: {}, status: false });
                }}
              />
            </div>
            <div className="flex flex-col overflow-hidden rounded-md p-3 bg-cardLight dark:bg-cardDark">
              <div
                dangerouslySetInnerHTML={{
                  __html: isModalFAQ.data?.answer,
                }}
                className={`text-sm `}
              />
            </div>
          </div>
        }
        active={isModalFAQ.status}
        onClose={() => setisModalFAQ({ data: {}, status: false })}
      />
      <ModalContent
        className={"sm:max-w-xl"}
        children={
          <div className="flex flex-col gap-3">
            <span className="text-lg font-bold font-gilroy">
              {isModalType.data}
            </span>
            <div className="flex flex-col overflow-hidden rounded-b-md pb-2">
              {formData.map((item, index) => {
                return (
                  isModalType.data === item.type && (
                    <button
                      key={index}
                      className={`flex flex-row justify-start items-center gap-2 flex-1 ${index % 2 ? "" : "bg-[#f1f5f9] dark:bg-[#f1f5f907]"} py-2.5 p-3 hover:opacity-70`}
                      onClick={() => {
                        setisModalCreate({ data: item.name, status: true });
                      }}
                    >
                      <span className=" text-base text-left line-clamp-2 font-gilroy">
                        {item.name}
                      </span>
                    </button>
                  )
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
                  setisModalCreate({ data: {}, status: false });
                  setisModalType({ data: {}, status: false })
                  fetchDataHelpDesk()
                }}
              />
            </div>
          </div>
        }
        active={isModalVerif.status}
      />
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
                          {item?.field && item?.field?.map((itemField, indexField) => (
                            item?.value?.value === itemField.type_select &&
                            <DynamicInput
                              key={indexField}
                              name={itemField.name}
                              label={itemField.label}
                              value={itemField.value}
                              options={itemField.options}
                              onChange={(value) => {
                                const updatedFormData = [...formData];
                                updatedFormData[sectionIndex].fields[index].field[indexField].value = value;
                                setFormData(updatedFormData);
                              }}
                              type={itemField.type}
                              placeholder={"Masukan " + itemField.label}
                            />
                          ))}
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
                  checkingFormData();
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

export default HelpDeskPages;
