import React from "react";

import LoginPages from "../pages/Authentication/login";
import DashboardPages from "../pages/Dashboard";
import InfrastrukturPages from "../pages/Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi";
import DetailInfrastrukturPages from "../pages/Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi/detail";

import AccountPages from "../pages/System/Account";
import DetailsAccountPages from "../pages/System/Account/detail";

import AplikasiPages from "../pages/Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan";
import DetailAplikasiPages from "../pages/Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan/detail";
import DataAlatInfraPage from "../pages/Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi/List Tools";
import SekretariatPages from "../pages/Layanan Sekretariat";
import DetailSekretariatPages from "../pages/Layanan Sekretariat/detail";
import CreateAplikasiPages from "../pages/Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan/create";
import LayananTeknologiSIPages from "../pages/Layanan Teknologi dan Sistem Informasi";
import LayananManagemenInfrastrukturTeknologiInformasiPages from "../pages/Layanan Manajemen Infrastruktur Teknologi Informasi dan Komunikasi";
import LayananPenyusunanPerencanaanSIPages from "../pages/Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi";
import DetailTeknologiSistemInformasiPages from "../pages/Layanan Teknologi dan Sistem Informasi/detail";


const userRoutes = [
  { path: "/", component: <DashboardPages /> },
  { path: "/layanan-pengelolaan-infrastruktur-teknologi-informasi-komunikasi", component: <InfrastrukturPages /> },
  { path: "/detail-infrastruktur", component: <DetailInfrastrukturPages /> },

  { path: "/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", component: <AplikasiPages /> },
  { path: "/detail-aplikasi", component: <DetailAplikasiPages /> },


  { path: "/layanan-teknologi-dan-sistem-informasi", component: <LayananTeknologiSIPages /> },
  { path: "/detail-teknologi-dan-sistem-informasi", component: <DetailTeknologiSistemInformasiPages /> },


  { path: "/layanan-manajemen-infrastruktur-teknologi-informasi-dan-komunikasi", component: <LayananManagemenInfrastrukturTeknologiInformasiPages /> },

  { path: "/layanan-penyusunan-perencanaan-teknologi-informasi-dan-komunikasi", component: <LayananPenyusunanPerencanaanSIPages /> },



  { path: "/layanan-sekretariat", component: <SekretariatPages /> },
  { path: "/detail-sekretariat", component: <DetailSekretariatPages /> },
  { path: "/permohonan-sistem-informasi", component: <CreateAplikasiPages /> },

];
const infraRoutes = [
  { path: "/data-alat-infrastruktur", component: <DataAlatInfraPage /> },
]
const aplikasiRoutes = [

]
const operatorRoutes = [
  { path: "/account", component: <AccountPages /> },
  { path: "/detail-account", component: <DetailsAccountPages /> },
]
const nonUserRoutes = [

];

const authRoutes = [
  { path: "/login", component: <LoginPages /> },
];

export { authRoutes, nonUserRoutes, userRoutes, infraRoutes, aplikasiRoutes, operatorRoutes };

