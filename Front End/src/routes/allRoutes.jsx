import React from "react";

import LoginPages from "../pages/Authentication/login";
import DashboardPages from "../pages/Dashboard";
import HelpDeskPages from "../pages/HelpDesk";
import DetailHelpDeskPages from "../pages/HelpDesk/detail";


const userRoutes = [
  { path: "/login", component: <DashboardPages /> },
];
const nonUserRoutes = [
  { path: "/", component: <DashboardPages /> },
  { path: "/help-desk", component: <HelpDeskPages /> },
  { path: "/detail-help-desk", component: <DetailHelpDeskPages /> },
];

const authRoutes = [
  { path: "/login", component: <LoginPages /> },
  // { path: "/forgotpassword", component: <ForgotPasswordPages /> },
];

export { authRoutes, nonUserRoutes, userRoutes };

