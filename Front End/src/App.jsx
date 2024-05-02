import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

// Import Routes all
import { authRoutes, nonUserRoutes, userRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import { ToastContainer } from "react-toastify";
import { MaintenanceGuard } from "./components/layout/MaintenanceGuard";

import NotFoundPage from "./components/layout/NotFoundPage";
import NonAuthLayout from "./routes/NonAuthLayout";

function App() {
  const isPending = useSelector((state) => state.todoReducer.isPending);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <React.Fragment>
      <ToastContainer />
      <MaintenanceGuard>
        <Routes>
          {!localStorage.getItem("isLogin")
            ? authRoutes.map((route, idx) => (
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
