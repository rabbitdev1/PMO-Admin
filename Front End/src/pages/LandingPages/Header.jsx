import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { ReactComponent as Ic_dark_mode } from "../../assets/icon/ic_dark-mode.svg";
import { ReactComponent as Ic_light_mode } from "../../assets/icon/ic_light-mode.svg";
import DynamicButton from '../../components/common/DynamicButton';

const Header = ({ isDarkMode, toggleTheme, navigate, authToken, authApiKey,setisModalCreate }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`header ${hidden ? 'header-hidden' : ''} flex flex-col`}>
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
            <DynamicButton
              type="no-padding"
              color={isDarkMode ? "#ffffff" : "#0185FF"}
              iconLeft={isDarkMode ? <Ic_light_mode className="h-5 w-5" /> : <Ic_dark_mode className="h-5 w-5" />}
              className="inline-flex"
              onClick={toggleTheme}
            />
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
        <div className="flex flex-row lg:container lg:mx-auto xl:max-w-screen-xl gap-2 py-2">
          {[
            { label: 'BERANDA' },
            { label: 'PUSAT PENGADUAN / LAYANAN' },
            { label: 'USER ACCOUNT' },
            { label: 'KATALOG WEB SERVICE' },
          ].map((button, index) => (
            <Popover
              key={index}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              placement="bottom-end"
            >
              <PopoverHandler>
                <Button className="py-0">
                  <DynamicButton
                    initialValue={button.label}
                    color={isDarkMode ? "#ffffff" : "#0185FF"}
                    type="transparent"
                    className="bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor rounded-none px-3"
                    onClick={() =>{
                      setisModalCreate({ data: "Pengajuan User Account", status: true });
                    }}
                  />
                </Button>
              </PopoverHandler>
              {/* <PopoverContent className="flex flex-col w-72 font-gilroy p-3 shadow-none bg-lightColor text-lightColor dark:text-darkColor dark:bg-cardDark border border-gray-300 dark:border-gray-700 z-10">
                {button.label}
              </PopoverContent> */}
            </Popover>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
