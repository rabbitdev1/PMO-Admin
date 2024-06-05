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
import TitleHeader from "../../components/layout/TitleHeader";
import { isPending } from "../../components/store/actions/todoActions";
import ModalContent from "../../components/ui/Modal/ModalContent";
import { apiClient } from "../../utils/api/apiClient";
import { convertToNameValueObject } from "../../utils/helpers/convertToNameValueObject";


import fetchUploadFiles from "../../utils/api/uploadFiles";
import { formData as initialFormData } from "./data";
import {
  isValidatorIntegrasi,
  isValidatorPenerapanModulTTE,
  isValidatorUserAccountSI
} from "./validators";

function CreateAplikasiPages() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const authApiKey = Cookies.get("authApiKey");
  const authToken = Cookies.get("authToken");
  const authProfile = Cookies.get("authData");


  const [inputData, setInputData] = useState({});

  const dispatch = useDispatch();
  const dataState = location.state;

  useEffect(() => {
    if (authToken) {

    }
  }, [dataState, authToken]);



  return (
    <div className="flex flex-col gap-3 flex-1 p-4">
      <TitleHeader
        title={"Buat Pengajuan Permohonan Sistem Informasi"}
        link1={"dashboard"}
        link2={"Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan"}
      />
      <section className="flex xl:flex-row flex-col gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <span className="flex text-lg font-semibold">Kebutuhan Perangkat Keras</span>
            <DynamicInput
              label={"Jenis Pengajuan"}
              value={inputData.jenisPengajuan || ''}
              type={'selection'}
              options={[{ label: 'Pembangunan Aplikasi', value: 'Pembangunan Aplikasi' }, { label: 'Pengembangan Aplikasi', value: 'Pengembangan Aplikasi' }]}
              onChange={(value) => {
                setInputData((prevState) => ({
                  ...prevState,
                  jenisPengajuan: value.value,
                }));
              }}
              placeholder={"Masukan Pengembangan / Pembangunan"}
            />
            {inputData.jenisPengajuan === 'Pembangunan Aplikasi' ?
              <div className="flex flex-col gap-2">
                <span className="flex text-lg font-semibold">Pembangunan Aplikasi</span>
                <DynamicInput
                  label={"Jenis Pengajuan"}
                  type={'text'}
                  onChange={(value) => {
                    // setInputData((prevState) => ({
                    //   ...prevState,
                    //   jenisPengajuan: value.value,
                    // }));
                  }}
                  placeholder={"Masukan Pengembangan / Pembangunan"}
                />
              </div>
              :
              <div className="flex flex-col gap-2">
                <span className="flex text-lg font-semibold">Pembangunan Aplikasi</span>

              </div>
            }

            {/* <div className="flex flex-row gap-3 justify-between items-center">
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
                onClickShow={(data) => {
                  if (JSON.parse(authProfile)?.role === "op_pmo") {
                    fetchSetProgress(authApiKey, authToken, data.id);
                  } else {
                    navigate("/detail-aplikasi", { state: { slug: data.id } });
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
                        "aplikasi"
                      );
                    } else {
                      alert("Pengajuan tidak dihapus.");
                    }
                  }
                }}
                data={listAplikasi}
              />
            </div> */}
          </div>
        </div>
      </section>

    </div>
  );
}

export default CreateAplikasiPages;
