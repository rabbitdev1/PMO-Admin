import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Import Routes all
import { authRoutes, nonUserRoutes, userRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import { ToastContainer } from "react-toastify";
import { MaintenanceGuard } from "./components/layout/MaintenanceGuard";

import NotFoundPage from "./components/layout/NotFoundPage";
import NonAuthLayout from "./routes/NonAuthLayout";
import { apiClient } from "./utils/api/apiClient";

function App() {
  const isPending = useSelector((state) => state.todoReducer.isPending);
  const location = useLocation();
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const authApiKey = Cookies.get('authApiKey');
    const authToken = Cookies.get('authToken');
    if (authToken && authApiKey) {
      setAuthToken(authToken);
      fetchDataProfile(authApiKey, authToken)
      if (location.pathname === '/login') {
        navigate('/');
      }
    } else {
      setAuthToken(null);
      navigate('/login');
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
            : userRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<Authmiddleware>{route.component}</Authmiddleware>}
                key={idx}
                exact={true}
              />
            ))}
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
          <span>Loading</span>
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
