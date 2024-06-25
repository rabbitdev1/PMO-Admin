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
import { isPending, isSideBar } from "../store/actions/todoActions";
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
import { apiClient } from "../../utils/api/apiClient";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showOverlay, setShowOverlay] = useState(false);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');
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

  const fetchLogout = async (api_key, token) => {
    dispatch(isPending(true));
    try {
      const response = await apiClient({
        baseurl: "logout",
        method: "POST",
        apiKey: api_key,
        token,
      });
      if (response?.statusCode === 200) {
        setShowOverlay(true);
        dispatch(isPending(true));
        setTimeout(() => {
          Cookies.remove("authData");
          Cookies.remove("authApiKey");
          Cookies.remove("authToken");
        }, 500);
        setTimeout(() => {
          dispatch(isPending(false));
          window.location.replace("/login");
        }, 500);
      } else {

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
                iconLeft={<LogoutIcon className={`h-5 aspect-square`} />}
                className="inline-flex"
                onClick={() => {
                  fetchLogout(authApiKey, authToken)
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
    </header>
  );
};

export default Header;
