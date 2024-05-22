import React, { useEffect, useState } from "react";
import { ReactComponent as AllBerandaIcon } from "../../assets/icon/ic_homapages.svg";
import { ReactComponent as LeftArrowIcon } from "../../assets/icon/ic_leftarrow.svg";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import LoadingLink from "../common/LoadingLink";
import useTheme from "../context/useTheme";

const Sidebar = () => {
  const status = localStorage.getItem("isLogin");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tab, setTab] = useState("/");
  const [state, setState] = useState("");
  const authProfile = Cookies.get('authData');
  const { isDarkMode } = useTheme();
  const [validateSideBar, setValidateSideBar] = useState("");
  const [expandedMenuIndex, setExpandedMenuIndex] = useState(null);

  const location = useLocation();

  useEffect(() => {
    
    setValidateSideBar(JSON?.parse(authProfile || null))
    const formatPathname = (pathname) => {
      return pathname.replace("/", "/").replace(/^\w/, (c) => c.toUpperCase());
    };
    setTab(formatPathname(location.pathname));
    setState(formatPathname(location.state));
  }, [location]);

  const toggleSubmenu = (index) => {
    setExpandedMenuIndex(expandedMenuIndex === index ? null : index);
  };

  const renderSubmenu = (submenu) => {
    return submenu.map((item, index) => (
      <LoadingLink
        key={index}
        href={item.href}
        state={item.state}
      >
        <div className="flex flex-row gap-2 ml-4 items-center group cursor-pointer ">
          <div className={`h-10 w-1 ${item.state === state ? 'bg-[#0185FF]' : 'bg-[#dddddd] dark:bg-[#ffffff20]'}  group-hover:bg-[#0185FF]`} />
          <span className={`${item.state === state ? 'text-[#0185FF]' : 'text-lightColor dark:text-darkColor '}  flex-1 text-sm text-left group-hover:text-[#0185FF] line-clamp-2 select-none`}>
            {item.title}
          </span>
        </div>
      </LoadingLink>
    ));
  };

  const menuItems = [
    { title: "MENU", role: ['/'], icon: "" },
    { title: "Dashboard", role: ['op_pmo', 'perangkat_daerah', 'kabid_infra',], icon: AllBerandaIcon, href: ["/", "/"], },
    { title: "LAYANAN", role: ['/'], icon: "" },
    {
      title: "Infrastruktur Teknologi, Informasi dan Komunikasi", role: ['op_pmo', 'perangkat_daerah', 'kabid_infra',],
      submenu: [{ title: 'Relokasi Alat', href: '/infrastruktur', state: 'Pengajuan Relokasi Alat' },
      { title: 'Penambahan Alat', href: '/infrastruktur', state: 'Pengajuan Penambahan Alat' },
      { title: 'Penambahan Bandwith', href: '/infrastruktur', state: 'Pengajuan Penambahan Bandwidth' },
      { title: 'Torubleshooting Aplikasi dan Jaringan', href: '/infrastruktur', state: 'Pengajuan Troubleshooting Aplikasi dan Jaringan' },
      { title: 'Hosting', href: '/infrastruktur', state: 'Pengajuan Hosting' },
      { title: 'Domain', href: '/infrastruktur', state: 'Pengajuan Domain' },
        // { title: 'Perubahan Akses', href: '/infrastruktur', state: 'Pengajuan Relokasi Alat' },
      ],
      icon: AllBerandaIcon, href: ["/infrastruktur", "/detail-infrastruktur"],
    },
    { title: "Aplikasi Informatika, Persandian dan Keamanan Informasi", role: ['op_pmo', 'perangkat_daerah',], icon: AllBerandaIcon, href: ["/1", "/detail-1"], },
    { title: "Data Statistik", role: ['op_pmo', 'perangkat_daerah',], icon: AllBerandaIcon, href: ["/1", "/detail-1"], },
    { title: "Desiminasi Informasi", role: ['op_pmo', 'perangkat_daerah',], icon: AllBerandaIcon, href: ["/1", "/detail-1"], },
    { title: "Perancangan Teknologi, Informasi dan Komunikasi", role: ['op_pmo', 'perangkat_daerah',], icon: AllBerandaIcon, href: ["/1", "/detail-1"], },
    { title: "UPT Radio Sonata", role: ['op_pmo', 'perangkat_daerah',], icon: AllBerandaIcon, href: ["/1", "/detail-1"], },
    { title: "Sekertariat", role: ['op_pmo', 'sekretariat',], icon: AllBerandaIcon, href: ["/1", "/detail-1"], },
    { title: "SISTEM", role: ['op_pmo'], icon: "" },
    { title: "Akun", role: ['op_pmo'], icon: AllBerandaIcon, href: ["/account", "/1"], },
  ];

  const renderMenuItems = (items) => {
    return items.map((button, index) => {
      let isOperatorExist = false;
      if (Array.isArray(button?.role) && button.role.includes('/')) {
        isOperatorExist = true;
      } else {
        isOperatorExist = button?.role?.includes(validateSideBar?.role || '');
      }
      if (isOperatorExist) {
        return (
          <div key={index} className="flex flex-col">
            {button.icon === "" ? (
              <div className="items-center flex gap-2 font-semibold w-full">
                <span className="group-hover:text-[#212121] text-xs line-clamp-1 text-left select-none">
                  {button.title}
                </span>
              </div>
            ) : (
              <div
                onClick={() => {
                  if (button.submenu) {
                    toggleSubmenu(index);
                  } else {
                    window.location.href = button.href[0];
                  }
                }}
                onMouseOver={() => setHoveredIndex(index)}
                onMouseOut={() => setHoveredIndex(null)}
                className={`${tab === button.href[0] || tab === button.href[1] ? "bg-[#0185FF]" : ""} hover:bg-[#0185FF] rounded-md cursor-pointer group items-center flex gap-2 w-full p-2.5`}
              >
                {button.icon && (
                  <button.icon
                    className="h-5 w-5"
                    fill={
                      tab === button.href[0] || tab === button.href[1] ? "#ffffff" : hoveredIndex === index
                        ? "#ffffff"
                        : isDarkMode ? "#ffffff" : "#0185FF"
                    }
                  />
                )}
                <span className={`${tab === button.href[0] || tab === button.href[1] ? "text-cardLight" : "text-lightColor dark:text-darkColor"} flex-1 group-hover:text-[#ffffff] text-sm line-clamp-2 text-left select-none`}>
                  {button.title}
                </span>
                <LeftArrowIcon
                  className={`h-4 w-4 transform transition-transform duration-200 ${expandedMenuIndex === index ? 'rotate-90' : ''}`}
                  fill={
                    tab === button.href[0] || tab === button.href[1] ? "#ffffff" : hoveredIndex === index
                      ? "#ffffff"
                      : isDarkMode ? "#ffffff" : "#212121"
                  }
                />
              </div>
            )}
            {button.submenu && (
              <div
                className={`transition-all  overflow-hidden ${expandedMenuIndex === index ? 'duration-1000 max-h-96' : 'max-h-0'}`}
              >
                {renderSubmenu(button.submenu)}
              </div>
            )}
          </div>
        );
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full pb-40 font-gilroy p-3">
      <div className="flex flex-col gap-2">
        {renderMenuItems(menuItems)}
      </div>
    </div>
  );
};

export default Sidebar;
