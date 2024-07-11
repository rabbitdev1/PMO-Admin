import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ReactComponent as LeftArrowIcon } from "../../assets/icon/ic_left_arrow.svg";

import DynamicButton from "../../components/common/DynamicButton";
import LoadingLink from "../../components/common/LoadingLink";
import ConditionalRender from "../../components/ui/ConditionalRender";


function LandingPages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
 
  return (
    <div className="flex flex-col min-h-screen bg-cardLight dark:bg-cardDark text-lightColor dark:text-darkColor font-gilroy">

      <main className="flex-grow flex flex-col ">
        <div className="flex flex-col bg-lightColor dark:bg-darkColor ">
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
                              className=" object-cover flex flex-col flex-1 w-full aspect-[2/1] bg-green-400"
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

      <div id="modal-root" className="z-50"></div>
    </div>
  );
}

export default LandingPages;
