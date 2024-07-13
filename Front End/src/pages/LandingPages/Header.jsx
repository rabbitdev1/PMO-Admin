import { Button, Popover, PopoverContent, PopoverHandler, } from "@material-tailwind/react";
import Cookies from "js-cookie";
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from "react-router";
import { ReactComponent as Ic_dark_mode } from "../../assets/icon/ic_dark-mode.svg";
import { ReactComponent as Ic_light_mode } from "../../assets/icon/ic_light-mode.svg";
import DynamicButton from '../../components/common/DynamicButton';
import useTheme from "../../components/context/useTheme";

const Header = ({ }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col font-gilroy`}>
      <div className="flex flex-col bg-lightColor dark:bg-darkColor">
        <div className="lg:container lg:mx-auto xl:max-w-screen-xl w-full flex border-b border-gray-300 dark:border-gray-700 flex-row gap-3 justify-between items-center p-3 py-2">
          <div>
            <LazyLoadImage
              className="h-10 w-32 object-contain"
              alt="logo"
              src={require("../../assets/image/logo/light.png")}
              effect="blur"
            />
          </div>
          <div className="flex flex-row gap-3 items-center">
            {/* <DynamicButton
              type="no-padding"
              color={isDarkMode ? "#ffffff" : "#0185FF"}
              iconLeft={isDarkMode ? <Ic_light_mode className="h-5 w-5" /> : <Ic_dark_mode className="h-5 w-5" />}
              className="inline-flex"
              onClick={toggleTheme}
            /> */}
            {authToken && authApiKey ? (
              <DynamicButton
                initialValue="Dashboard"
                color="#ffffff"
                type="transparent"
                className="bg-[#0185FF] text-[#ffffff] px-3"
                onClick={() => window.location.replace("/dashboard")}
              />
            ) : (
              <DynamicButton
                initialValue="Masuk"
                color="#ffffff"
                type="transparent"
                className="bg-[#0185FF] text-[#ffffff] px-3"
                onClick={() => navigate('/login')}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-lightColor dark:bg-darkColor">
        <div className="hidden lg:flex flex-row lg:container lg:mx-auto xl:max-w-screen-xl py-2">
          {[
            { label: 'Home', herf: '/' },
            { label: 'Tentang PMO', submenu: [{ label: 'Label 1', herf: '' }, { label: 'Label 2', herf: '' }] },
            { label: 'Fungsi Utama', submenu: [{ label: 'Label 1', herf: '' }, { label: 'Label 2', herf: '' }] },
            { label: 'Layanan', submenu: [{ label: 'Label 1', herf: '' }, { label: 'Label 2', herf: '' }] },
            { label: 'Katalog Web Services', submenu: [{ label: 'Label 1', herf: '' }, { label: 'Label 2', herf: '' }] },
            { label: 'Magang', herf: '/pendaftaran-magang' },
            { label: 'Pusat Pengaduan / Layanan', submenu: [{ label: 'Label 1', herf: '' }, { label: 'Label 2', herf: '' }] },
          ].map((button, index) => (
            <Popover
              key={index}
              placement="bottom"
            >
              <PopoverHandler>
                <Button className="py-0">
                  <DynamicButton
                    initialValue={button.label}
                    color={isDarkMode ? "#ffffff" : "#0185FF"}
                    type="transparent"
                    className="bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor outline-0 px-3"
                    onClick={() => { !button.submenu && navigate(button.herf) }}
                  />
                </Button>
              </PopoverHandler>
              {button.submenu &&
                <PopoverContent
                  className="flex  flex-col w-full font-gilroy p-3 rounded-none bg-[#0f5498d1] text-darkColor z-10">
                  <div className="lg:container lg:mx-auto xl:max-w-screen-xl w-full flex flex-col gap-2">
                    <span className="font-bold text-2xl">{button.label}</span>
                    <div className="flex flex-col gap-2">
                      {button.submenu.map((sub, subIndex) => (
                        <span key={subIndex} href={sub.herf} className="">
                          {sub.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              }
            </Popover>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
