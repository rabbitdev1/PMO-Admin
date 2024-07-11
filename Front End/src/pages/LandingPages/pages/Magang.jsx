import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ReactComponent as CloseIcon } from "../../../assets/icon/ic_close.svg";
import { ReactComponent as LeftArrowIcon } from "../../../assets/icon/ic_left_arrow.svg";
import { ReactComponent as InstagramIcon } from "../../../assets/socialmedia/Instagram.svg";
import { ReactComponent as TiktokIcon } from "../../../assets/socialmedia/TikTok.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/socialmedia/facebook.svg";
import { ReactComponent as PlaystoreIcon } from "../../../assets/socialmedia/playstore_light.svg";
import { ReactComponent as WAIcon } from "../../../assets/socialmedia/whatapps.svg";
import { ReactComponent as XIcon } from "../../../assets/socialmedia/x.svg";

import DynamicButton from "../../../components/common/DynamicButton";
import LoadingLink from "../../../components/common/LoadingLink";
import useTheme from "../../../components/context/useTheme";
import ConditionalRender from "../../../components/ui/ConditionalRender";
import resetFormData from "../../../components/common/ResetFormData";

import Header from "../Header";
import ModalContent from "../../../components/ui/Modal/ModalContent";
import { convertToNameValueObject } from "../../../utils/helpers/convertToNameValueObject";
import DynamicInput from "../../../components/common/DynamicInput";

function MagangPages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');

  const [isModalCreate, setisModalCreate] = useState({
    status: false,
    data: {},
  });
  const [formData, setFormData] = useState([
    {
      name: "Pengajuan User Account",
      type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
      role: [
        "op_pmo",
        "perangkat_daerah",
        "kabid_aplikasi",
        "katim_aplikasi",
        "teknis_aplikasi",
      ],
      fields: [
        { name: "name_pic", label: "Nama PIC", value: "", type: "text" },
        { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
        {
          name: "submission_type_user_account",
          label: "Jenis Pengajuan",
          value: [],
          type: "selection",
          options: [
            {
              value: "reset_password",
              label: "Ganti Kata Sandi",
            },
            {
              value: "new_account",
              label: "Pembuatan Akun Baru",
            },
          ],
        },
        {
          name: "account_type",
          label: "Jenis Akun",
          value: [],
          type: "selection",
          options: [
            { value: "account_1", label: "Akun 1" },
            { value: "account_2", label: "Akun 2" },
          ],
          visible: false,
        },
        {
          name: "password",
          label: "Kata Sandi Lama",
          value: "",
          type: "password",
          visible: false,
        },
        {
          name: "name", label: "Nama PPK", value: "", type: "text", visible: false
        },
        {
          name: "telp", label: "Nomor Handphone", value: "", type: "tel", visible: false
        },
        {
          name: "email", label: "Email", value: "", type: "email", visible: false
        },
        {
          name: "origin_agency", label: "Asal Instansi", value: "", type: "text", visible: false
        },
        // {
        //   name: "password",
        //   label: "Password Lama",
        //   value: "",
        //   type: "password",
        //   visible: false,
        // },
        {
          name: "new_password",
          label: "Kata Sandi Baru",
          value: "",
          type: "password",
          visible: false,
        },
        {
          name: "repeat_password",
          label: "Ulangi Kata Sandi",
          value: "",
          type: "password",
          visible: false,
        },

        {
          name: "reason",
          label: "Alasan Pengajuan",
          value: "",
          type: "editor",
        },
      ],
    },
  ]);

  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);
  const autoPlayDelay = 3500;
  const pagination = {
    clickable: true,
    // renderBullet: function (index, className) {
    //   return '<span class="' + className + '">' + (index + 1) + '</span>';
    // },
  };
  useEffect(() => {

  }, []);

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.activeIndex);
  };

  const [articleUpdate, setArticleUpdate] = useState([
    {
      "id": "394",
      "image_url": "https://static.vecteezy.com/system/resources/previews/005/337/799/large_2x/icon-image-not-found-free-vector.jpg",
      "title": "Nilai Kinerja Anggaran Sangat Baik, Kominfo Raih Penghargaan Kemenkeu",
    },
    {
      "id": "325",
      "image_url": "https://static.vecteezy.com/system/resources/previews/005/337/799/large_2x/icon-image-not-found-free-vector.jpg",
      "title": "Awas Hoaks! Pengungsi Rohingya Sengaja Dikirim ke Indonesia",
    },
    {
      "id": "340",
      "image_url": "https://static.vecteezy.com/system/resources/previews/005/337/799/large_2x/icon-image-not-found-free-vector.jpg",
      "title": "Putus Akses Lebih dari 800 Ribu Konten, Gerak Cepat Menteri Budi Arie Berantas Judi Online",
    },
    {
      "id": "325",
      "image_url": "https://static.vecteezy.com/system/resources/previews/005/337/799/large_2x/icon-image-not-found-free-vector.jpg",
      "title": "Awas Hoaks! Pengungsi Rohingya Sengaja Dikirim ke Indonesia",
    },]);


  const [articleUpdateLoading, setArticleUpdateLoading] = useState(false);
  useEffect(() => {
    // You can dispatch actions here if needed
  }, [dispatch]);
  const checkingFormData = async () => {
    const foundObject = formData.find((obj) => obj.name === isModalCreate.data);
    if (foundObject) {
      const { result: nameValueObject, newObject: newObjectFromConversion } =
        convertToNameValueObject(foundObject);
      const nameValueObject2 = {
        submission_type: "",
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
      if (combinedObject?.submission_title === "Pendaftaran Magang") {
        if (isValidatorPendaftaranMagang(combinedObject)) {
          await handleImageUploadAndFetch(combinedObject);
        } else {
          return false;
        }
      }
    } else {
      console.log("Objek tidak ditemukan dalam formData");
    }
  };
  const handleInputChange = (fieldName, value, sectionIndex) => {
    const updatedFormData = [...formData];
    const currentSection = updatedFormData[sectionIndex];
    const fieldToUpdateIndex = currentSection.fields.findIndex(
      (field) => field.name === fieldName
    );

    if (fieldName === 'submission_type_user_account') {
      const isResetPassword = value.value === 'reset_password';
      const isNewAccount = value.value === 'new_account';

      // Set visibility for reset_password related fields
      ['new_password', 'repeat_password'].forEach(name => {
        const fieldIndex = currentSection.fields.findIndex(field => field.name === name);
        if (fieldIndex !== -1) {
          currentSection.fields[fieldIndex].visible = isResetPassword;
        }
      });

      // Set visibility for new_account related fields
      ['account_type', 'name', 'telp', 'email', 'origin_agency'].forEach(name => {
        const fieldIndex = currentSection.fields.findIndex(field => field.name === name);
        if (fieldIndex !== -1) {
          currentSection.fields[fieldIndex].visible = isNewAccount;
        }
      });
    }

    // Update the value of the field
    if (fieldToUpdateIndex !== -1) {
      currentSection.fields[fieldToUpdateIndex].value = value;
    }

    setFormData(updatedFormData);
  };
  return (
    <div className="flex flex-col min-h-screen bg-cardLight dark:bg-cardDark text-lightColor dark:text-darkColor font-gilroy">
      <main className="flex-grow flex flex-col ">

        <div className="flex flex-col gap-3 bg-[#0f5498]">
          <div className="lg:container lg:mx-auto xl:max-w-screen-xl flex flex-col p-3 gap-3 text-darkColor">
            <h2 className="font-bold">Pendaftaran Magang</h2>
          </div>
        </div>

      </main>

   

      <ModalContent
        className={"sm:max-w-2xl "}
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
                        item.visible !== false && <div key={index} className="flex flex-col gap-2">
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
        onClose={() => {
          setisModalCreate({ data: {}, status: false });
          resetFormData(isModalCreate.data, formData, setFormData);
        }}
        active={isModalCreate.status}
      />
      <div id="modal-root" className="z-50"></div>
    </div>
  );
}

export default MagangPages;
