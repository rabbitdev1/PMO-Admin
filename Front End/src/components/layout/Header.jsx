import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Ic_dark_mode } from "../../assets/icon/ic_dark-mode.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icon/ic_logout.svg";
import { ReactComponent as Ic_menu } from "../../assets/icon/ic_menus.svg";
import DynamicButton from "../common/DynamicButton";
import LoadingLink from "../common/LoadingLink";
import useTheme from "../context/useTheme";
import { isSideBar } from "../store/actions/todoActions";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);
  const [showOverlay, setShowOverlay] = useState(false);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = Cookies.get("authData");

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  useEffect(() => {
    if (authData) {
      setProfile(JSON.parse(authData));
    }
  }, []);

  return (
    <header className=" flex flex-row flex-1 bg-lightColor transition duration-300 ease-in-out dark:bg-cardDark border-b-[1px] border-[#dddddd] dark:border-[#ffffff20]">
      <div className={`lg:flex hidden w-full max-w-[280px] flex-1   p-3 py-2 `}>
        <div
          onClick={() => {
            setShowOverlay(false);
          }}
          className="flex items-center flex-1 justify-center flex-col "
        >
          <img
            src={require("../../assets/image/logo/light.png")}
            alt="logo"
            className="h-14 w-auto flex object-contain "
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 mx-auto flex-1 w-full justify-between  p-3">
        <div
          onClick={() => {
            setShowOverlay(false);
          }}
          className="lg:hidden inline-flex "
        >
          <DynamicButton
            type="transparent"
            color={isDarkMode ? "#ffffff" : "#212121"}
            iconLeft={<Ic_menu className={`h-5 aspect-square`} />}
            className="inline-flex  "
            onClick={() => {
              dispatch(isSideBar(true));
            }}
          />
        </div>
        <div
          className="flex flex-col"
          onClick={() => {
            setShowOverlay(false);
          }}
        >
          <div className="lg:hidden flex   flex-row items-center gap-3 h-full justify-start">
            <img
              src={require("../../assets/image/logo/light.png")}
              alt="logo"
              className="h-10 w-auto flex object-contain "
            />
          </div>
        </div>
        <div className="flex flex-row flex-1"></div>
        <div className="flex flex-row gap-2  justify-end ">
          <DynamicButton
            type="transparent"
            color={isDarkMode ? "#ffffff" : "#0185FF"}
            iconLeft={<Ic_dark_mode className={`h-5 w-5 aspect-square`} />}
            className="inline-flex border-1 border-[#21212118] dark:border-[#ffffff18]"
            onClick={() => {
              console.log("Mode Dark " + !isDarkMode);
              toggleTheme();
            }}
          />
          <div className="flex flex-row gap-2  justify-end">
            <div className="flex flex-row gap-2 items-center ">
              <OverlayTrigger
                // trigger={[ "focus"]}
                trigger="click"
                placement="bottom-end"
                show={showOverlay}
                onHide={handleCloseOverlay}
                overlay={
                  <Popover className="p-1 w-[1000px] bg-cardLight dark:bg-cardDark text-lightColor dark:text-darkColor">
                    <div className="p-2 flex flex-col ">
                      <div className="flex flex-row gap-2 items-center mb-1"></div>
                      <button
                        className="flex flex-row justify-start items-center gap-2 hover:bg-[#2121210e] dark:hover:bg-[#f3f3f30e] flex-1 p-2 rounded-lg"
                        onClick={() => {
                          Cookies.remove("authData");
                          Cookies.remove("authApiKey");
                          Cookies.remove("authToken");
                          setShowOverlay(!showOverlay);
                          navigate("/");
                          setTimeout(() => {
                            window.location.reload("/");
                          }, 500);
                        }}
                      >
                        <LogoutIcon
                          className=" h-6 w-6"
                          fill={isDarkMode ? "#ffffff" : "#000000"}
                        />
                        <span className=" text-base line-clamp-1 ">
                          Log Out
                        </span>
                      </button>
                    </div>
                    <div
                      className="p-2 flex flex-row gap-2"
                      onClick={() => {
                        setShowOverlay(!showOverlay);
                      }}
                    >
                      <LoadingLink
                        to={"/privacy"}
                        onClick={() => {
                          setShowOverlay(!showOverlay);
                        }}
                        className="opacity-60 text-xs font-light line-clamp-1 no-underline text-lightColor dark:text-darkColor"
                      >
                        Kebijakan Privasi
                      </LoadingLink>
                      <LoadingLink
                        to={"/term-and-conditional"}
                        onClick={() => {
                          setShowOverlay(!showOverlay);
                        }}
                        className="opacity-60 text-xs font-light line-clamp-1 no-underline text-lightColor dark:text-darkColor"
                      >
                        Persyaratan Layanan
                      </LoadingLink>
                    </div>
                  </Popover>
                }
              >
                <button
                  onClick={() => {
                    setShowOverlay(!showOverlay);
                  }}
                  className="flex flex-row gap-2"
                >
                  <img
                    src={profile?.image}
                    alt={profile?.fullname}
                    className=" object-cover flex h-11 w-11 bg-cardLight dark:bg-cardDark rounded-full"
                    effect="blur"
                  />
                  <div className=" flex-col items-start sm:inline-flex hidden">
                    <span className="text-base font-semibold line-clamp-1 ">
                      {(profile?.fullname?.split(' ')[0])}
                    </span>
                    <span className="text-xs font-light line-clamp-1 opacity-70">
                      {(profile?.role)}
                    </span>
                  </div>
                </button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
