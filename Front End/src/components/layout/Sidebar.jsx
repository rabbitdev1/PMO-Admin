import React, { useEffect, useState } from "react";
import { ReactComponent as AllBerandaIcon } from "../../assets/icon/ic_homapages.svg";
import { ReactComponent as LeftArrowIcon } from "../../assets/icon/ic_leftarrow.svg";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setValidateSideBar(JSON?.parse(authProfile || null))
    const formatPathname = (pathname) => {
      return pathname.replace("/", "/").replace(/^\w/, (c) => c.toUpperCase());
    };
    setTab(formatPathname(location.pathname));
    setState((location.state));
    console.log(validateSideBar?.role);
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
    { title: "Dashboard", role: ['op_pmo', 'perangkat_daerah', 'kabid_infra', 'teknis_infra', 'katim_infra', 'katim_aplikasi', 'kabid_aplikasi', 'teknis_aplikasi', 'kabid_perencanaan'], icon: AllBerandaIcon, href: ["/", "/"], },
    {
      title: "Data Alat", role: ['kabid_infra', 'teknis_infra', 'katim_infra'],
      icon: AllBerandaIcon, href: ["/data-alat-infrastruktur", "/detail-infrastruktur"],
    },

    { title: "LAYANAN", role: ['/'], icon: "" },
    {
      title: "Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan", role: ['op_pmo', 'perangkat_daerah', 'kabid_aplikasi', 'teknis_aplikasi', 'katim_aplikasi', 'kabid_perencanaan'],
      submenu: [
        { title: 'Permohonan Sistem Informasi', href: "/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", state: 'Permohonan Sistem Informasi' },
        { title: 'User Akun Sistem Informasi', href: "/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", state: 'User Akun Sistem Informasi' },
        { title: 'Intergrasi Sistem Informasi', href: "/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", state: 'Integrasi Sistem Informasi' },
        { title: 'Penerapan Modul TTE', href: "/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", state: 'Penerapan Modul TTE' },
      ], icon: AllBerandaIcon, href: ["/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", "/detail-aplikasi", "/permohonan-sistem-informasi"],
    },
    {
      title: "Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi", role: ['op_pmo', 'perangkat_daerah', 'kabid_infra', 'teknis_infra', 'katim_infra'],
      submenu: [
        { title: 'Relokasi Alat', href: '/layanan-pengelolaan-infrastruktur-teknologi-informasi-komunikasi', state: 'Relokasi Alat' },
        { title: 'Penambahan Alat', href: '/layanan-pengelolaan-infrastruktur-teknologi-informasi-komunikasi', state: 'Penambahan Alat' },
        { title: 'Penambahan Bandwith', href: '/layanan-pengelolaan-infrastruktur-teknologi-informasi-komunikasi', state: 'Penambahan Bandwidth' },
        { title: 'Torubleshooting Aplikasi dan Jaringan', href: '/layanan-pengelolaan-infrastruktur-teknologi-informasi-komunikasi', state: 'Troubleshooting Aplikasi dan Jaringan' },
        { title: 'Hosting', href: '/layanan-pengelolaan-infrastruktur-teknologi-informasi-komunikasi', state: 'Hosting' },
        { title: 'Domain', href: '/layanan-pengelolaan-infrastruktur-teknologi-informasi-komunikasi', state: 'Domain' },
      ],
      icon: AllBerandaIcon, href: ["/layanan-pengelolaan-infrastruktur-teknologi-informasi-komunikasi", "/detail-infrastruktur"],
    },

    {
      title: "Layanan Teknologi dan Sistem Informasi", role: ['op_pmo', 'perangkat_daerah', 'teknis_aplikasi', 'katim_aplikasi'],
      submenu: [
        { title: 'Layanan ZOOM', href: '/layanan-teknologi-dan-sistem-informasi', state: 'Layanan ZOOM' },
        { title: 'Permohonan Liputan', href: '/layanan-teknologi-dan-sistem-informasi', state: 'Permohonan Liputan' },
      ],
      icon: AllBerandaIcon, href: ["/layanan-teknologi-dan-sistem-informasi", "/detail-teknologi-dan-sistem-informasi"],

    },
    {
      title: "Layanan Manajemen Infrastruktur Teknologi Informasi dan Komunikasi", role: ['op_pmo', 'perangkat_daerah',],
      submenu: [
        { title: 'Pendampingan Pengolahan dan Analisis Data', href: '/layanan-manajemen-infrastruktur-teknologi-informasi-dan-komunikasi', state: 'Pendampingan Pengolahan dan Analisis Data' },
        { title: 'Pelayanan Produksi data dari situs Web', href: '/layanan-manajemen-infrastruktur-teknologi-informasi-dan-komunikasi', state: 'Pelayanan Produksi data dari situs Web' },
      ],
      icon: AllBerandaIcon, href: ["/layanan-manajemen-infrastruktur-teknologi-informasi-dan-komunikasi", "/detail-layanan-manajemen-infrastruktur-teknologi-informasi-dan-komunikasi"],
    },
    {
      title: "Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi", role: ['op_pmo', 'perangkat_daerah','teknis_aplikasi', 'katim_aplikasi' ],
      submenu: [
        { title: 'Penyusunan Kebijakan', href: '/layanan-penyusunan-perencanaan-teknologi-informasi-dan-komunikasi', state: 'Penyusunan Kebijakan' },
      ],
      icon: AllBerandaIcon, href: ["/layanan-penyusunan-perencanaan-teknologi-informasi-dan-komunikasi", "/detail-1"],
    },
    {
      title: "Layanan UPT RADIO SONATA", role: ['op_pmo', 'perangkat_daerah',],
      submenu: [
        { title: 'Permohonan Podcast', href: '/layanan-upt-radio-sonata', state: 'Permohonan Podcast' },
      ], icon: AllBerandaIcon, href: ["/layanan-upt-radio-sonata", "/detail-1"],
    },
    {
      title: "Layanan Sekretariat", role: ['op_pmo', 'perangkat_daerah', 'katim_aplikasi', 'teknis_aplikasi'],
      submenu: [
        { title: "Pendaftaran Magang", href: "/layanan-sekretariat", state: 'Pendaftaran Magang' },
      ]
      , icon: AllBerandaIcon, href: ["/layanan-sekretariat", "/detail-sekretariat"],
    },

    { title: "PENGATURAN", role: ['op_pmo'], icon: "" },
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
                    if (validateSideBar?.role === 'perangkat_daerah') {
                      toggleSubmenu(index);
                    } else {
                      navigate(button.href[0], { state: button.state });
                    }
                  } else {
                    toggleSubmenu(index);
                    navigate(button.href[0], { state: button.state });
                  }
                }}
                onMouseOver={() => setHoveredIndex(index)}
                onMouseOut={() => setHoveredIndex(null)}
                className={`${tab === button.href[0] || tab === button.href[1] || tab === button.href[2] ? "bg-[#0185FF]" : ""} hover:bg-[#0185FF] rounded-md cursor-pointer group items-center flex gap-2 w-full p-2.5`}
              >
                {button.icon && (
                  <button.icon
                    className="h-5 w-5"
                    fill={
                      tab === button.href[0] || tab === button.href[1] || tab === button.href[2] ? "#ffffff" : hoveredIndex === index
                        ? "#ffffff"
                        : isDarkMode ? "#ffffff" : "#0185FF"
                    }
                  />
                )}
                <span className={`${tab === button.href[0] || tab === button.href[1] || tab === button.href[2] ? "text-cardLight" : "text-lightColor dark:text-darkColor"} flex-1 group-hover:text-[#ffffff] text-sm line-clamp-3 text-left select-none`}>
                  {button.title}
                </span>
                {button.submenu && validateSideBar?.role === 'perangkat_daerah' &&
                  <LeftArrowIcon
                    className={`h-4 w-4 transform transition-transform duration-200 ${expandedMenuIndex === index ? 'rotate-90' : ''}`}
                    fill={
                      tab === button.href[0] || tab === button.href[1] || tab === button.href[2] ? "#ffffff" : hoveredIndex === index
                        ? "#ffffff"
                        : isDarkMode ? "#ffffff" : "#212121"
                    }
                  />
                }
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
      <div className="flex flex-col gap-2 mb-40">
        {renderMenuItems(menuItems)}
      </div>
    </div>
  );
};

export default Sidebar;
