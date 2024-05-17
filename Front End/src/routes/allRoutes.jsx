import React from "react";

import LoginPages from "../pages/Authentication/login";
import DashboardPages from "../pages/Dashboard";
import HelpDeskPages from "../pages/HelpDesk";
import DetailHelpDeskPages from "../pages/HelpDesk/detail";
import AccountPages from "../pages/System/account";
import DetailsAccountPages from "../pages/System/detail";
import DetailInfrastrukturPages from "../pages/Infrastruktur/detail";
import InfrastrukturPages from "../pages/Infrastruktur";


const userRoutes = [
  { path: "/", component: <DashboardPages /> },
  { path: "/help-desk", component: <HelpDeskPages /> },
  { path: "/detail-help-desk", component: <DetailHelpDeskPages /> },
  { path: "/infrastruktur", component: <InfrastrukturPages /> },
  { path: "/detail-infrastruktur", component: <DetailInfrastrukturPages /> },











  { path: "/account", component: <AccountPages /> },
  { path: "/detail-account", component: <DetailsAccountPages /> },
];
const nonUserRoutes = [
];

const authRoutes = [
  { path: "/login", component: <LoginPages /> },
];

export { authRoutes, nonUserRoutes, userRoutes };

