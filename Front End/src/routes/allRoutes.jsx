import React from "react";

import LoginPages from "../pages/Authentication/login";
import DashboardPages from "../pages/Dashboard";
import InfrastrukturPages from "../pages/Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi";
import DetailInfrastrukturPages from "../pages/Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi/detail";
import AccountPages from "../pages/System/Account/account";
import DetailsAccountPages from "../pages/System/Account/detail";


const userRoutes = [
  { path: "/", component: <DashboardPages /> },
  { path: "/layanan-pengelolaan-infrastruktur-teknologi-informasi-komunikasi", component: <InfrastrukturPages /> },
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

