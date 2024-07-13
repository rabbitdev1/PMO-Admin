import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// Import Routes all
import { authRoutes, infraRoutes, nonUserRoutes, operatorRoutes, perangkatdaerahRoutes, userRoutes } from "./routes/allRoutes";
// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";
// layouts Format
import { ToastContainer } from "react-toastify";
import { MaintenanceGuard } from "./components/layout/MaintenanceGuard";
import { setMetaData } from "../src/utils/helpers/metaHelper";

import NotFoundPage from "./components/layout/NotFoundPage";
import NonAuthLayout from "./routes/NonAuthLayout";
import { apiClient } from "./utils/api/apiClient";

function App() {
  const isPending = useSelector((state) => state.todoReducer.isPending);
  const location = useLocation();
  const [authToken, setAuthToken] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMetaData({
      "judul": "PMO DISKOMINFO",
      "logo": "logo-diskominfo-bandung.png",
      "favicon": "favicon.ico",
      "keywords": "DISKOMINFO, Bandung, Kota Bandung, Informasi, Komunikasi",
      "deskripsi_meta": "Portal Resmi Dinas Komunikasi dan Informatika Kota Bandung.",
      "meta_image":  "logo-diskominfo-bandung.png",
      "meta_deskripsi": "Selamat datang di portal resmi Dinas Komunikasi dan Informatika Kota Bandung. Temukan berbagai informasi terkini mengenai kegiatan dan layanan kami.",
      "meta_keywords": "DISKOMINFO, Kota Bandung, Informasi, Komunikasi, Layanan Publik",
      "analytics": "UA-XXXXX-Y", // Replace with actual analytics tracking code
      "versionApp": "1.0"
    }
    , location);
  }, [location]);

  useEffect(() => {
    const authApiKey = Cookies.get('authApiKey');
    const authToken = Cookies.get('authToken');
    if (authToken && authApiKey) {
      setAuthToken(authToken);
      fetchDataProfile(authApiKey, authToken)
      if (location.pathname === '/login') {
        navigate('/dashboard');
      }
    } else {
      setAuthToken(null);
    }
  }, []);

  const fetchDataProfile = async (api_key, token) => {
    try {
      const response = await apiClient({
        baseurl: "me",
        method: "POST",
        apiKey: api_key,
        token: token,
      });
      if (response?.statusCode === 200) {
        setRole(response.result.data.role)
        Cookies.set('authData', JSON.stringify(response.result.data), { expires: 1 });
      } else {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <MaintenanceGuard>
        <Routes>
          {!authToken ? authRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              exact={true}
            />
          ))
            :
            role === 'op_pmo' ?
              [...userRoutes, ...operatorRoutes].map((route, idx) => (
                <Route
                  path={route.path}
                  element={<Authmiddleware>{route.component}</Authmiddleware>}
                  key={idx}
                  exact={true}
                />
              )) :
              role === 'perangkat_daerah' ?
                [...userRoutes, ...perangkatdaerahRoutes].map((route, idx) => (
                  <Route
                    path={route.path}
                    element={<Authmiddleware>{route.component}</Authmiddleware>}
                    key={idx}
                    exact={true}
                  />
                )) :
              (role === 'kabid_infra' || role === 'katim_infra' || role === 'teknis_infra') ?
                [...userRoutes, ...infraRoutes].map((route, idx) => (
                  <Route
                    path={route.path}
                    element={<Authmiddleware>{route.component}</Authmiddleware>}
                    key={idx}
                    exact={true}
                  />
                )) :
                userRoutes.map((route, idx) => (
                  <Route
                    path={route.path}
                    element={<Authmiddleware>{route.component}</Authmiddleware>}
                    key={idx}
                    exact={true}
                  />
                ))
          }

          {nonUserRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<Authmiddleware>{route.component}</Authmiddleware>}
              key={idx}
              exact={true}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MaintenanceGuard>
      {isPending && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#21212195]  z-50">
          {/* <span>Loading</span> */}
        </div>
      )}
    </React.Fragment>
  );
}

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
