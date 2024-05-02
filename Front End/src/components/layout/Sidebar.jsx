import React, { useEffect, useState } from "react";
import { ReactComponent as AllBerandaIcon } from "../../assets/icon/ic_homapages.svg";

import { useLocation } from "react-router-dom";
import LoadingLink from "../common/LoadingLink";
import useTheme from "../context/useTheme";

const Sidebar = () => {
  const status = localStorage.getItem("isLogin");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tab, setTab] = useState("/");
  const { isDarkMode } = useTheme();

  const location = useLocation();

  useEffect(() => {
    const formatPathname = (pathname) => {
      return pathname.replace("/", "/").replace(/^\w/, (c) => c.toUpperCase());
    };

    setTab(formatPathname(location.pathname));
  }, [location]);

  return (
    <div className="flex flex-col gap-3 w-full pb-40 font-gilroy">
      <div
        className={`flex flex-col`}
      >
        {[
          { title: "MENU", icon: "" },
          { title: "Dashboard", icon: AllBerandaIcon, href: ["/", "/"], },
          { title: "Ajuan Permohonan", icon: AllBerandaIcon, href: ["/test", "/1"], },
          { title: "Pembanguan dan Pengembangan", icon: AllBerandaIcon, href: ["/test", "/2"], },
          { title: "Evaluasi Sistem Informasi", icon: AllBerandaIcon, href: ["/test", "/3"], },
          { title: "Evaluasi Keamanan Sistem Informasi", icon: AllBerandaIcon, href: ["/test", "/4"], },
          { title: "Pendampingan", icon: AllBerandaIcon, href: ["/test", "/5"], },
          { title: "Help Desk", icon: AllBerandaIcon, href: ["/help-desk", "/detail-help-desk"], },
          { title: "Integrasi Sistem Informasi", icon: AllBerandaIcon, href: ["/test", "/6"], },
        ].map((button, index) =>
          button.icon === "" ? (
            // <div
            //   key={index}
            //   className=" items-center flex gap-2 font-semibold w-full p-2 rounded-lg"
            // >
            //   <span className="group-hover:text-[#212121] text-sm line-clamp-1 text-left">
            //     {button.title}
            //   </span>
            // </div>
            null
          ) : <LoadingLink
            key={index}
            href={button.href[0]}
            state={button?.state}
            onMouseOver={() => {
              setHoveredIndex(index);
            }}
            onMouseOut={() => {
              setHoveredIndex(null);
            }}
            className={`${tab === button.href[0] || tab === button.href[1] ? "bg-[#0185FF] " : ""} hover:bg-[#0185FF] cursor-pointer group items-center flex gap-2 w-full p-3 py-2.5`}
          >
            {button.icon && (
              <button.icon
                className="h-5 w-5"
                fill={
                  tab === button.href[0] || tab === button.href[1] ? "#ffffff" : hoveredIndex === index
                    ? "#ffffff"
                    : isDarkMode ? "#ffffff" : "#212121"
                }
              />
            )}
            <span className={`${tab === button.href[0] || tab === button.href[1] ? " text-cardLight" : "text-lightColor dark:text-darkColor"} group-hover:text-[#ffffff] text-sm line-clamp-2 text-left`}>
              {button.title}
            </span>
          </LoadingLink>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
