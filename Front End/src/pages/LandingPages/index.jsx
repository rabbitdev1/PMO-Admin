import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ReactComponent as CloseIcon } from "../../assets/icon/ic_close.svg";
import { ReactComponent as LeftArrowIcon } from "../../assets/icon/ic_left_arrow.svg";
import { ReactComponent as InstagramIcon } from "../../assets/socialmedia/Instagram.svg";
import { ReactComponent as TiktokIcon } from "../../assets/socialmedia/TikTok.svg";
import { ReactComponent as FacebookIcon } from "../../assets/socialmedia/facebook.svg";
import { ReactComponent as PlaystoreIcon } from "../../assets/socialmedia/playstore_light.svg";
import { ReactComponent as WAIcon } from "../../assets/socialmedia/whatapps.svg";
import { ReactComponent as XIcon } from "../../assets/socialmedia/x.svg";

import DynamicButton from "../../components/common/DynamicButton";
import LoadingLink from "../../components/common/LoadingLink";
import useTheme from "../../components/context/useTheme";
import ConditionalRender from "../../components/ui/ConditionalRender";
import resetFormData from "../../components/common/ResetFormData";

import Header from "./Header";
import ModalContent from "../../components/ui/Modal/ModalContent";
import { convertToNameValueObject } from "../../utils/helpers/convertToNameValueObject";
import DynamicInput from "../../components/common/DynamicInput";

function LandingPages() {
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
      "image_url": "https://web.kominfo.go.id/sites/default/files/kominfo-sekjen-mira-tayyiba-AYH-1.jpeg",
      "title": "Nilai Kinerja Anggaran Sangat Baik, Kominfo Raih Penghargaan Kemenkeu",
    },
    {
      "id": "325",
      "image_url": "https://web.kominfo.go.id/sites/default/files/kominfo-cekhoaks-hoaks-disinformasi-misinformasi-pengungsi-rohingya-sengaja-dikirim-ke-indonesia-alihkan-isu-palestina.jpeg",
      "title": "Awas Hoaks! Pengungsi Rohingya Sengaja Dikirim ke Indonesia",
    },
    {
      "id": "340",
      "image_url": "https://web.kominfo.go.id/sites/default/files/kominfo-menteri-budi-arie-setiadi_0.jpg",
      "title": "Putus Akses Lebih dari 800 Ribu Konten, Gerak Cepat Menteri Budi Arie Berantas Judi Online",
    },
    {
      "id": "325",
      "image_url": "https://web.kominfo.go.id/sites/default/files/kominfo-cekhoaks-hoaks-disinformasi-misinformasi-pengungsi-rohingya-sengaja-dikirim-ke-indonesia-alihkan-isu-palestina.jpeg",
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

    // if (fieldName === 'status_BDO') {
    //   // Check if the selected value is 'temporary'
    //   const isTemporary = value === 'temporary';
    //   // Update the visibility of the 'period' field based on the status
    //   const periodFieldIndex = currentSection.fields.findIndex(field => field.name === 'period');
    //   updatedFormData[sectionIndex].fields[periodFieldIndex].visible = isTemporary;

    //   if (!isTemporary) {
    //     updatedFormData[sectionIndex].fields[periodFieldIndex].value = { startDate: null, endDate: null };
    //   }
    // }

    // Update the value of the field
    updatedFormData[sectionIndex].fields[fieldToUpdateIndex].value = value;

    setFormData(updatedFormData);
  };
  return (
    <div className="flex flex-col min-h-screen bg-cardLight dark:bg-cardDark text-lightColor dark:text-darkColor font-gilroy">
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        navigate={navigate}
        authToken={authToken}
        authApiKey={authApiKey}
        setisModalCreate={setisModalCreate}
      />

      <main className="flex-grow flex flex-col ">
        <div className="flex flex-col bg-lightColor dark:bg-darkColor ">
          <div className="h-28 w-full " />
          <div className="lg:container lg:mx-auto xl:max-w-screen-xl p-3 gap-3 ">
            <div className="flex flex-col h-full w-full ">
              <ConditionalRender
                data={articleUpdate}
                loading={articleUpdateLoading}
                model={"emptyData"}
              >
                <div className="">
                  <Swiper
                    id="imageSwiperSlider"
                    effect={"cards"}
                    cardsEffect={{
                      perSlideOffset: 10,
                      perSlideRotate: 3,
                      rotate: true,
                      slideShadows: false,
                    }}
                    ref={swiperRef}
                    className="w-full h-full"
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                      delay: autoPlayDelay,
                      disableOnInteraction: false,
                    }}
                    grabCursor={true}
                    spaceBetween={10}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    pagination={pagination}
                    onSlideChange={handleSlideChange}
                    modules={[Autoplay, Pagination]}
                  >
                    {articleUpdate.map((item, index) => {
                      return (
                        <SwiperSlide key={index} style={{ width: "95%", backgroundColor: '#ff7804' }}
                          className="rounded-lg overflow-hidden flex flex-col">
                          <button className="flex flex-col w-full" onClick={() => {

                          }} >
                            <img
                              src={item.image_url}
                              alt={item.image_url}
                              className=" object-cover flex flex-col flex-1 w-full aspect-[3/1] bg-green-400"
                              effect="blur"
                            />
                          </button>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </ConditionalRender>
            </div>
          </div>
        </div>
        <div className="flex flex-col  bg-[#cc3232] text-darkColor">
          <div className="flex md:flex-row flex-col justify-between lg:container lg:mx-auto xl:max-w-screen-xl p-3 gap-3 my-5">
            <div className="flex flex-col gap-2 flex-1 justify-between">
              <div className="flex flex-1 flex-col">
                <h2 className="font-bold">Layanan Pengaduan Dan <br /> Informasi</h2>
                <span>Kirim pesan teks , tanya jawab, atau pengaduan langsung.</span>
              </div>
              <DynamicButton
                initialValue={'Pusat Pengaduan'}
                iconRight={<LeftArrowIcon className={`h-5 w-5 aspect-square`} />}
                color={"#212121"}
                type="transparent"
                className="bg-[#ffffff] text-[#212121] px-3"
                onClick={() => {
                  navigate('/')
                }}
              />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex flex-row rounded-lg aspect-[2/1] flex-1 bg-lightColor" />
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-lightColor dark:bg-darkColor">
          <div className="lg:container lg:mx-auto xl:max-w-screen-xl p-3 gap-3 ">
            <div className="flex flex-col">
              <span className="font-bold text-xl">Berita Diskominfo</span>
            </div>
            <div className="flex flex-col h-full w-full ">
              <ConditionalRender
                data={articleUpdate}
                loading={articleUpdateLoading}
                model={"emptyData"}
              >
                <div className="">
                  <Swiper
                    className="w-full h-full py-2"
                    spaceBetween={10}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      640: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                      1280: {
                        slidesPerView: 4,
                      },
                    }}
                  >
                    {articleUpdate.map((item, index) => {
                      return (
                        <SwiperSlide
                          key={index}
                          className="flex flex-col group  rounded-md overflow-hidden bg-lightColor dark:bg-cardDark shadow-inner "
                        >
                          <div className="flex flex-col flex-1 h-full w-full ">
                            <LoadingLink
                              to={"/detail/" + item.slug}
                              className='flex flex-col gap-2'>
                              <LazyLoadImage
                                src={item.image_url}
                                alt={item.title}
                                height={"100%"}
                                className="w-full h-full object-cover aspect-[2/1]"
                                effect="blur"
                              />

                            </LoadingLink>
                            <div className="flex flex-col flex-1 p-2.5 gap-2 ">
                              <div className="flex flex-row gap-2 ">
                                <div className="flex flex-1 flex-col">
                                  <span className="text-xs opacity-70 text-left line-clamp-1">Senin, 07 September 2021</span>
                                  <span className="text-md font-bold line-clamp-3">{item.title}</span>
                                </div>
                              </div>
                              {/* <span className="text-sm opacity-70 text-left line-clamp-3">{item.summary} </span> */}
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </ConditionalRender>
            </div>
          </div>
        </div>



      </main>

      <footer className="flex flex-col gap-3 bg-[#242424] text-darkColor">
        <div className="lg:container lg:mx-auto xl:max-w-screen-xl w-full flex  flex-col gap-3 ">
          <div className="flex flex-col basis-6/12 gap-4 p-3">
            <LoadingLink to="/" className="flex flex-row">
              <LazyLoadImage
                className="h-16 w-40 flex object-contain "
                alt="logo"
                src={require("../../assets/image/logo/light.png")}
                effect="blur"
              />
            </LoadingLink>
            <p className="text-sm">BAKOMINFO Kota Bandung merupakan Lembaga Teknis Daerah dibentuk berdasarkan Peraturan Daerah Kota Bandung Nomor 12 Tahun 2007, Tanggal 4 Desember 2007 serta merupakan penggabungan Satuan Kerja Pemerintah Daerah (SKPD) Dinas dan Kantor di lingkungan Pemerintah Kota Bandung yaitu Dinas Informasi dan Komunikasi dengan Kantor Pengolahan Data Elektronik (KPDE). Dengan demikian BAKOMINFO terbentuk sejak diberlakukannya PERDA Nomor 12 Tahun 2007 tentang Pembentukan dan Susunan Organisasi Dinas Daerah Kota Bandung.
            </p>
            <div className="flex flex-col gap-2 col-span-2">
              <div className="flex gap-3 overflow-x-scroll no-scrollbar">
                <button
                  className="  "
                  onClick={() => ""}
                >
                  <WAIcon
                    className="h-7 w-7"
                    fill={'#ffffff'}
                  />
                </button>
                <button
                  className="  "
                  onClick={() => ""}
                >
                  <FacebookIcon
                    className="h-7 w-7"
                    fill={'#ffffff'}
                  />
                </button>
                <button
                  className="  "
                  onClick={() => ""}
                >
                  <InstagramIcon
                    className="h-7 w-7"
                    fill={'#ffffff'}
                  />
                </button>
                <button
                  className="  "
                  onClick={() => ""}
                >
                  <TiktokIcon
                    className="h-7 w-7"
                    fill={'#ffffff'}
                  />
                </button>
                <button
                  className="  "
                  onClick={() => ""}
                >
                  <XIcon
                    className="h-7 w-7"
                    fill={'#ffffff'}
                  />
                </button>

                <button
                  className="  col-span-2"
                  onClick={() => ""}
                >
                  <PlaystoreIcon
                    className="h-6 w-auto"
                    fill={'#ffffff'}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1 no-underline px-3 py-3 text-darkColor">
            <div className="flex flex-1 flex-col">
              <span className="font-semibold text-lg mb-2">Peta Situs</span>
              <LoadingLink to="/about" className="no-underline ">
                <span className="text-sm text-darkColor ">Tentang</span>
              </LoadingLink>
              <LoadingLink to="/faq" className="no-underline ">
                <span className="text-sm text-darkColor">FAQ</span>
              </LoadingLink>
              <LoadingLink
                to="/term-and-conditional"
                className="no-underline "
              >
                <span className="text-sm text-darkColor">Syarat & Ketentuan Layanan</span>
              </LoadingLink>
              <LoadingLink
                to="/daftar-layanan"
                className="no-underline "
              >
                <span className="text-sm text-darkColor">Daftar Layanan</span>
              </LoadingLink>
            </div>
            <div className="flex flex-1 flex-col">
              <span className="font-semibold text-lg mb-2">Akses Cepat</span>
              <LoadingLink
                to="/allreviews"
                className="no-underline "
              >
                <span className="text-sm text-darkColor">Semua Review</span>
              </LoadingLink>
              <LoadingLink to="/blog" className="no-underline ">
                <span className="text-sm text-darkColor">Blog</span>
              </LoadingLink>
            </div>
            <div className="flex flex-1 flex-col sm:col-span-1 col-span-2">
              <span className="font-semibold text-lg mb-2">Ketentuan</span>
              <LoadingLink to="/dukungan" className="no-underline ">
                <span className="text-sm text-darkColor">Dukungan Pelanggan</span>
              </LoadingLink>
              <LoadingLink
                to="/term-and-conditional"
                className="no-underline "
              >
                <span className="text-sm text-darkColor">Syarat & Ketentuan Layanan</span>
              </LoadingLink>
              <LoadingLink to="/privacy" className="no-underline ">
                <span className="text-sm text-darkColor">Kebijakan Privasi</span>
              </LoadingLink>
            </div>
          </div>
          <div className="flex flex-row justify-between p-3 border-t-[1px] border-[#ffffff20] ">
            <span className="text-sm opacity-70">COPYRIGHT © 2024 Diskominfo All rights Reserved

            </span>
            <span className="text-sm opacity-70">Hand-crafted & Made by TIM PMO</span>
          </div>
        </div>
      </footer>

      <ModalContent
        className={"sm:max-w-2xl "}
        children={
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <span className="text-lg font-bold font-gilroy">
                Buat {isModalCreate.data}
                {JSON.stringify(isModalCreate)}
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
        onClose={()=>{
          setisModalCreate({ data: {}, status: false });
          resetFormData(isModalCreate.data, formData, setFormData);
        }}
        active={isModalCreate.status}
      />
       <div id="modal-root" className="z-50"></div>
    </div>
  );
}

export default LandingPages;
