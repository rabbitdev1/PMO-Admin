import React, { useEffect, useState } from "react";
import { ReactComponent as AllBerandaIcon } from "../../assets/icon/ic_homapages.svg";
import { ReactComponent as LeftArrowIcon } from "../../assets/icon/ic_leftarrow.svg";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingLink from "../common/LoadingLink";
import useTheme from "../context/useTheme";
import { isSideBar } from "../store/actions/todoActions";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

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
      <div
        key={index}
        onClick={() => {
          dispatch(isSideBar(false))
          navigate(item.href, { state: item.state });
        }}
      >
        <div className="flex flex-row gap-2 ml-4 items-center group cursor-pointer ">
          <div className={`h-10 w-1 ${item.state === state ? 'bg-[#0185FF]' : 'bg-[#dddddd] dark:bg-[#ffffff20]'}  group-hover:bg-[#0185FF]`} />
          <span className={`${item.state === state ? 'text-[#0185FF]' : 'text-lightColor dark:text-darkColor '}  flex-1 text-sm text-left group-hover:text-[#0185FF] line-clamp-2 select-none`}>
            {item.title}
          </span>
        </div>
      </div>
    ));
  };

  const menuItems = [
    { title: "MENU", role: ['/'], icon: "" },
    { title: "Dashboard", role: ['op_pmo', 'perangkat_daerah',], icon: AllBerandaIcon, href: ["/dashboard"], },
    {
      title: "Data Alat", role: ['kabid_infra', 'teknis_infra', 'katim_infra'],
      icon: AllBerandaIcon, href: ["/data-alat-infrastruktur", "/detail-infrastruktur"],
    },
    { title: "Akun", role: ['op_pmo'], icon: AllBerandaIcon, href: ["/account", "/1"], },

    { title: "LAYANAN", role: ['/'], icon: "" },
    {
      title: "Layanan Permohonan Sistem Informasi", role: [
        'op_pmo',
        'perangkat_daerah',
        'katim_perencanaan',
        'kabid_perencanaan',
        'katim_aplikasi',
        'kabid_aplikasi',
        'katim_infra',
        'kabid_infra',
        'kadis'
      ],
      submenu: [
        { title: 'Rekomendasi Sistem Informasi', href: "/layanan-permohonan-sistem-informasi", state: 'Rekomendasi Sistem Informasi' },
        { title: 'Pembangunan Sistem Informasi', href: "/layanan-permohonan-sistem-informasi", state: 'Pembangunan Sistem Informasi' },
        { title: 'Pengembangan Sistem Informasi', href: "/layanan-permohonan-sistem-informasi", state: 'Pengembangan Sistem Informasi' },
      ], icon: AllBerandaIcon, href: ["/layanan-permohonan-sistem-informasi", "/detail-permohonan-sistem-informasi", '/permohonan-sistem-informasi'],
    },
    {
      title: "Layanan Pengelolaan Sistem Informasi dan Keamanan Sistem Informasi", role: ['op_pmo', 'perangkat_daerah', 'kabid_aplikasi', 'teknis_aplikasi', 'katim_aplikasi',],
      submenu: [
        { title: 'Intergrasi Sistem Informasi', href: "/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", state: 'Integrasi Sistem Informasi' },
        { title: 'Penerapan Modul TTE', href: "/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", state: 'Penerapan Modul TTE' },
        { title: 'Permohonan Email', href: "/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", state: 'Permohonan Email' },
        { title: 'Permohonan Pengujian Celah Keamanan', href: "/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", state: 'Permohonan Pengujian Celah Keamanan' },
      ], icon: AllBerandaIcon, href: ["/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", "/detail-aplikasi"],
    },
    {
      title: "Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi", role: ['op_pmo', 'perangkat_daerah', 'kabid_infra', 'teknis_infra', 'katim_infra'],
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
      title: "Layanan Siaran dan Sistem Virtual", role: ['op_pmo', 'perangkat_daerah', 'teknis_aplikasi', 'katim_aplikasi'],
      submenu: [
        { title: 'Layanan ZOOM', href: '/layanan-siaran-dan-sistem-virtual', state: 'Layanan ZOOM' },
        { title: 'Permohonan Liputan', href: '/layanan-siaran-dan-sistem-virtual', state: 'Permohonan Liputan' },
        { title: 'Permohonan Podcast', href: '/layanan-siaran-dan-sistem-virtual', state: 'Permohonan Podcast' },
      ],
      icon: AllBerandaIcon, href: ["/layanan-siaran-dan-sistem-virtual", "/detail-siaran-dan-sistem-virtual"],
    },
    {

      title: "Layanan Data", role: ['op_pmo', 'perangkat_daerah', 'teknis_aplikasi', 'katim_aplikasi'],


      submenu: [
        { title: 'Pendampingan Pengolahan dan Analisis Data', href: '/layanan-data', state: 'Layanan Pendampingan Pengolahan dan Analisis Data' },
        { title: 'Pelayanan Produksi Data dari Situs Web', href: '/layanan-data', state: 'Layanan Produksi Data dari Situs Web' },
      ],
      icon: AllBerandaIcon, href: ["/layanan-data", "/detail-data"],
    },
    {
      title: "Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi", role: ['op_pmo', 'perangkat_daerah', 'katim_perencanaan', 'kabid_perencanaan', 'teknis_perencanaan'],
      submenu: [
        { title: 'Surat Keputusan', href: '/layanan-penyusunan-perencanaan-teknologi-informasi-dan-komunikasi', state: 'Surat Keputusan' },
        // { title: 'Permohonan Perwal dan Kepwal TIK', href: '/layanan-penyusunan-perencanaan-teknologi-informasi-dan-komunikasi', state: 'Permohonan Perwal dan Kepwal TIK' },
        // { title: 'Pendataan Tenaga Ahli', href: '/layanan-penyusunan-perencanaan-teknologi-informasi-dan-komunikasi', state: 'Pendataan Tenaga Ahli' },
      ],
      icon: AllBerandaIcon, href: ["/layanan-penyusunan-perencanaan-teknologi-informasi-dan-komunikasi", "/detail-layanan-penyusunan-perencanaan-teknologi-informasi-dan-komunikasi"],
    },
    {
      title: "Layanan Sekretariat", role: ['op_pmo', 'perangkat_daerah', 'sekretariat', 'katim_sekre', 'teknis_sekre'],
      submenu: [
        { title: 'Pendaftaran Magang', href: "/layanan-sekretariat", state: 'Layanan Pendaftaran Magang' },
        { title: 'Pendataan Tenaga Ahli', href: "/layanan-sekretariat", state: 'Layanan Pendataan Tenaga Ahli' },
      ]
      , icon: AllBerandaIcon, href: ["/layanan-sekretariat", "/detail-sekretariat"],
    },
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
                      dispatch(isSideBar(false))
                    }
                  } else {
                    dispatch(isSideBar(false))
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
