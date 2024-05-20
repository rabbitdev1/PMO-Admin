import React, { useEffect, useState } from "react";
import { ReactComponent as AllBerandaIcon } from "../../assets/icon/ic_homapages.svg";
import Cookies from "js-cookie";

import { useLocation } from "react-router-dom";
import LoadingLink from "../common/LoadingLink";
import useTheme from "../context/useTheme";

const Sidebar = () => {
  const status = localStorage.getItem("isLogin");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tab, setTab] = useState("/");
  const authProfile = Cookies.get('authData');
  const { isDarkMode } = useTheme();
  const [validateSideBar, setValidateSideBar] = useState("");

  const location = useLocation();

  useEffect(() => {
    setValidateSideBar(JSON?.parse(authProfile||null))
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
          { title: "Dashboard", role: ['op_pmo', 'perangkat_daerah','kabid_infra','tim_teknis_aplikasi','tim_teknis_integrasi'], icon: AllBerandaIcon, href: ["/", "/"], },
          { title: "Bidang Infrastruktur Teknologi, Informasi dan Komunikasi", role: ['op_pmo', 'perangkat_daerah','kabid_infra','tim_teknis_aplikasi','tim_teknis_integrasi'], icon: AllBerandaIcon, href: ["/infrastruktur", "/detail-infrastruktur"], },
          { title: "SISTEM", role: ['op_pmo'], icon: "" },
          { title: "Akun", role: ['op_pmo'], icon: AllBerandaIcon, href: ["/account", "/7"], },
        ].map((button, index) => {
          const isOperatorExist = button?.role?.includes(validateSideBar?.role || '');
          if (isOperatorExist) {
            return (
              button.icon === "" ? (
                <div
                  key={index}
                  className=" items-center flex gap-2 font-semibold w-full p-2 px-3 "
                >
                  <span className="group-hover:text-[#212121] text-sm line-clamp-1 text-left">
                    {button.title}
                  </span>
                </div>
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
                <span className={`${tab === button.href[0] || tab === button.href[1] ? " text-cardLight" : "text-lightColor dark:text-darkColor"} flex-1 group-hover:text-[#ffffff] text-sm line-clamp-2 text-left`}>
                  {button.title}
                </span>
              </LoadingLink>
            )
          }
        })}
      </div>
    </div>
  );
};

export default Sidebar;
