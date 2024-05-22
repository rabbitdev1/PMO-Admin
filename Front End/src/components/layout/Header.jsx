import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Ic_dark_mode } from "../../assets/icon/ic_dark-mode.svg";
import { ReactComponent as Ic_light_mode } from "../../assets/icon/ic_light-mode.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icon/ic_logout.svg";
import { ReactComponent as Ic_menu } from "../../assets/icon/ic_menus.svg";
import DynamicButton from "../common/DynamicButton";
import LoadingLink from "../common/LoadingLink";
import useTheme from "../context/useTheme";
import { isSideBar } from "../store/actions/todoActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Typography,
  ListItem,
  ListItemPrefix,
  List,
  Avatar,
} from "@material-tailwind/react";
import { storage } from "../../config/Firebase";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showOverlay, setShowOverlay] = useState(false);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = Cookies.get("authData");
  const [imageUrl, setImageUrl] = useState('');

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  useEffect(() => {
    if (authData) {
      setProfile(JSON.parse(authData));
      getImageURL(JSON.parse(authData)?.image);
    }
  }, []);

  const getImageURL = async (imagePath) => {
    try {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/users/${imagePath}`);
      const url = await imageRef.getDownloadURL();
      setImageUrl(url);
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        console.log(`Firebase Storage: Object '${imagePath}' does not exist.`);
      } else {
        console.error('Error fetching image URL:', error);
      }
    }
  };
  
  return (
    <header className=" flex flex-row flex-1 bg-lightColor transition duration-300 ease-in-out dark:bg-cardDark border-b-[1px] border-[#dddddd] dark:border-[#ffffff20] h-16">
      <div className={`lg:flex flex-col hidden w-full max-w-[280px] flex-1 p-3 py-2 border-r-[1px] border-[#dddddd] dark:border-[#ffffff20]`}>
        <div
          onClick={() => {
            setShowOverlay(false);
          }}
          className="flex flex-1 flex-col justify-center"
        >
          <LazyLoadImage
            className="h-11 w-32 flex object-contain "
            alt="logo"
            src={require("../../assets/image/logo/light.png")}
            effect="blur"
          />
        </div>
      </div>
      <div className="flex flex-row gap-3 mx-auto flex-1 w-full justify-between items-center px-4 py-3">
        <div
          className="flex flex-col"
          onClick={() => {
            setShowOverlay(false);
          }}
        >
          <div className="lg:hidden flex   flex-row items-center gap-3 h-full justify-start">
            <LazyLoadImage
              className="h-11 w-32 flex object-contain "
              alt="logo"
              src={require("../../assets/image/logo/light.png")}
              effect="blur"
            />
          </div>
        </div>
        <div className="flex flex-row flex-1" />

        <DynamicButton
          type="no-padding"
          color={isDarkMode ? "#ffffff" : "#0185FF"}
          iconLeft={isDarkMode ? <Ic_light_mode className={`h-5 w-5 aspect-square`} /> : <Ic_dark_mode className={`h-5 w-5 aspect-square`} />}
          className="inline-flex "
          onClick={() => {
            toggleTheme();
          }}
        />
        <Popover animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }} placement="bottom-end">
          <PopoverHandler>
            <Button>
              <img
                src={imageUrl}
                alt={profile?.fullname}
                className=" object-cover flex h-10 w-10 bg-cardLight dark:bg-darkColor rounded-full"
                effect="blur"
              />
            </Button>
          </PopoverHandler>
          {/* <PopoverContent>
            <div className="bg-red-400">dsfsfs</div>
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

          </PopoverContent> */}

          <PopoverContent className="flex flex-col  w-72 font-gilroy p-0 shadow-none bg-lightColor text-lightColor dark:text-darkColor dark:bg-cardDark border-[1px] border-[#dddddd] dark:border-[#ffffff20]">
            <div className="flex flex-row items-center gap-2 p-2.5 ">
              <img
                src={imageUrl}
                alt={profile?.fullname}
                className=" object-cover flex h-10 w-10 bg-cardLight dark:bg-darkColor rounded-full"
                effect="blur"
              />
              <div className="flex flex-col ">
                <span className="text-base font-semibold line-clamp-1 ">
                  {(profile?.fullname?.split(' ')[0])}
                </span>
                <span className="text-sm font-light line-clamp-1 opacity-70">
                  {(profile?.role)}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-2.5 ">
              <DynamicButton
                initialValue={'Profile'}
                type="no-padding"
                color={isDarkMode ? "#ffffff" : "#212121"}
                iconLeft={<Ic_light_mode className={`h-5 aspect-square`} />}
                className="inline-flex"
                onClick={() => {
                  dispatch(isSideBar(true));
                }}
              />
              <DynamicButton
                initialValue={'1'}
                type="no-padding"
                color={isDarkMode ? "#ffffff" : "#212121"}
                iconLeft={<Ic_light_mode className={`h-5 aspect-square`} />}
                className="inline-flex"
                onClick={() => {
                }}
              />
              <DynamicButton
                initialValue={'2'}
                type="no-padding"
                color={isDarkMode ? "#ffffff" : "#212121"}
                iconLeft={<Ic_light_mode className={`h-5 aspect-square`} />}
                className="inline-flex"
                onClick={() => {
                }}
              />
            </div>
            <div className="flex flex-col gap-2 p-2.5 border-t-[1px] border-[#dddddd] dark:border-[#ffffff20]">
              <DynamicButton
                initialValue={'Log Out'}
                type="no-padding"
                color={isDarkMode ? "#ffffff" : "#212121"}
                iconLeft={<Ic_light_mode className={`h-5 aspect-square`} />}
                className="inline-flex"
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
              />
            </div>
          </PopoverContent>

        </Popover>

        <div
          onClick={() => {
            setShowOverlay(false);
          }}
          className="lg:hidden inline-flex"
        >
          <DynamicButton
            type="no-padding"
            color={isDarkMode ? "#ffffff" : "#212121"}
            iconLeft={<Ic_menu className={`h-6 aspect-square`} />}
            className="inline-flex  aspect-square"
            onClick={() => {
              dispatch(isSideBar(true));
            }}
          />
        </div>

      </div>
      {/* <div className="flex flex-row gap-2 mx-auto flex-1 w-full justify-between  p-3">
       
       
        <div className="flex flex-row flex-1"></div>
        <div className="flex flex-row gap-2  justify-end ">
          <DynamicButton
            type="transparent"
            color={isDarkMode ? "#ffffff" : "#0185FF"}
            iconLeft={<Ic_dark_mode className={`h-5 w-5 aspect-square`} />}
            className="inline-flex border-1 border-[#2121298] dark:border-[#ffffff18]"
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
                    className=" object-cover flex h-9 w-9 bg-cardLight dark:bg-cardDark rounded-full"
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
      </div> */}
    </header>
  );
};

export default Header;
