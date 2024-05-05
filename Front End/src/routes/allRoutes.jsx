import React from "react";

import LoginPages from "../pages/Authentication/login";
import DashboardPages from "../pages/Dashboard";
import HelpDeskPages from "../pages/HelpDesk";
import DetailHelpDeskPages from "../pages/HelpDesk/detail";
import AccountPages from "../pages/System/account";


const userRoutes = [
  { path: "/", component: <DashboardPages /> },
  { path: "/help-desk", component: <HelpDeskPages /> },
  { path: "/detail-help-desk", component: <DetailHelpDeskPages /> },










  { path: "/account", component: <AccountPages /> },
];
const nonUserRoutes = [
];

const authRoutes = [
  { path: "/login", component: <LoginPages /> },
];

export { authRoutes, nonUserRoutes, userRoutes };

