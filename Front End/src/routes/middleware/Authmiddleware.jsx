import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StickyBox from "react-sticky-box";
import LoadingLink from "../../components/common/LoadingLink";
import Footer from "../../components/layout/Footer";
import HeaderLandingPages from "../../pages/LandingPages/Header";
import FooterLandingPages from "../../pages/LandingPages/Footer";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import { useLocation } from "react-router";

const Authmiddleware = (props) => {
  const [hideHeader, setHideHeader] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();
  const setSideBar = useSelector((state) => state.todoReducer.isSideBar);

  useEffect(() => {
    console.log(location.pathname);
    const header = document.querySelector("header");
    setHeaderHeight(header?.offsetHeight);

  }, []);

  const handleScroll = () => {
    const headerScrollPoint = document.getElementById("headerscroll");
    setHideHeader(window.scrollY >= headerScrollPoint?.offsetTop || 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    location.pathname === "/" || location.pathname === "/pendaftaran-magang" ?
      <div className="flex flex-col ">
        <HeaderLandingPages/>
        {props.children}
      <FooterLandingPages />
        </div> :
      <React.Fragment>
        <div
          className={`w-full h-screen z-20 ${setSideBar ? "translate-x-0 bg-[#021D3968] " : "-translate-x-full bg-[#021d3906] "} transition-transform duration-300 ease-in-out fixed `}
        >
          <div
            className={`flex flex-col relative gap-2 bg-lightColor dark:bg-cardDark text-lightColor dark:text-darkColor items-start w-full max-w-[300px] h-screen ${setSideBar ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out `}
          >
            <div className="flex flex-col w-full overflow-y-scroll gap-2">
              <LoadingLink
                to="/"
                className="flex flex-col py-2 p-3 "
              >
                <img
                  src={require('../../assets/image/logo/light.png')}
                  alt="logo"
                  className="h-14 w-auto flex object-contain"
                />
              </LoadingLink>
              <div className=" flex flex-col flex-1 w-full">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col dark:bg-darkColor dark:border-darkColor dark:text-darkColor bg-cardLight border-lightColor text-lightColor transition duration-300 ease-in-out min-h-screen font-gilroy">
          <header
            className={`fixed z-10 top-0 w-full transition-transform duration-500 ease-in-out ${hideHeader ? "-translate-y-full" : "translate-y-0"}`}
          >
            <Header />
          </header>
          <div
            className="flex z-0  flex-row w-full h-full flex-1 "
            style={{ paddingTop: `${headerHeight}px` }}
          >
            <div
              className={`transform transition-transform duration-500 ease-in-out flex-1 max-w-[300px] relative w-full pt-2 bg-lightColor dark:bg-cardDark  lg:block hidden border-r-[1px] border-[#dddddd] dark:border-[#ffffff20]`}
            >
              <StickyBox offsetTop={headerHeight}>
                <Sidebar />
              </StickyBox>
            </div>
            <div className="flex flex-1 flex-col w-full lg:w-auto">
              <div className="grow ">{props.children}</div>
              <Footer />
            </div>
          </div>
          <div id="modal-root" className="z-20"></div>
        </div>
      </React.Fragment>
  );
};

export default Authmiddleware;
