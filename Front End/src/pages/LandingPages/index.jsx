import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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

import Header from "./Header";

function LandingPages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');


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

  return (
    <div className="flex flex-col min-h-screen bg-cardLight dark:bg-cardDark text-lightColor dark:text-darkColor font-gilroy">
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        navigate={navigate}
        authToken={authToken}
        authApiKey={authApiKey}
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

    </div>
  );
}

export default LandingPages;
