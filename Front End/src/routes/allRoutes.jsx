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
import LayananPenyusunanPerencanaanTIKPages from "../pages/Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi";
import DetailPerencanaanTIKPages from "../pages/Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi/detail";
import UptRadioPages from "../pages/Layanan Upt Radio Sonata";
import DetailUptRadioPages from "../pages/Layanan Upt Radio Sonata/detail";
import TeknologiSIPages from "../pages/Layanan Teknologi dan Sistem Informasi";
import DetailTeknologiSIPages from "../pages/Layanan Teknologi dan Sistem Informasi/detail";
import ManagementTIKPages from "../pages/Layanan Manajemen Infrastruktur Teknologi Informasi dan Komunikasi";
import DetailManagementTIKPages from "../pages/Layanan Manajemen Infrastruktur Teknologi Informasi dan Komunikasi/detail";
import PermohonanSIPages from "../pages/Layanan Permohonan Sistem Informasi";
import DetailPermohonanSIPages from "../pages/Layanan Permohonan Sistem Informasi/detail";
import CreatePermohonanSIPages from "../pages/Layanan Permohonan Sistem Informasi/create";



const userRoutes = [
  { path: "/", component: <DashboardPages /> },

  { path: "/layanan-pengelolaan-infrastruktur-teknologi-informasi-komunikasi", component: <InfrastrukturPages /> },
  { path: "/detail-infrastruktur", component: <DetailInfrastrukturPages /> },

  { path: "/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", component: <AplikasiPages /> },
  { path: "/detail-aplikasi", component: <DetailAplikasiPages /> },

  { path: "/layanan-permohonan-sistem-informasi", component: <PermohonanSIPages /> },
  { path: "/permohonan-sistem-informasi", component: <CreatePermohonanSIPages /> },
  { path: "/detail-permohonan-sistem-informasi", component: <DetailPermohonanSIPages /> },

  { path: "/layanan-teknologi-dan-sistem-informasi", component: <TeknologiSIPages /> },
  { path: "/detail-teknologi-dan-sistem-informasi", component: <DetailTeknologiSIPages /> },


  { path: "/layanan-manajemen-infrastruktur-teknologi-informasi-dan-komunikasi", component: <ManagementTIKPages /> },
  { path: "/detail-layanan-manajemen-infrastruktur-teknologi-informasi-dan-komunikasi", component: <DetailManagementTIKPages /> },

  { path: "/layanan-penyusunan-perencanaan-teknologi-informasi-dan-komunikasi", component: <LayananPenyusunanPerencanaanTIKPages /> },
  { path: "/detail-layanan-penyusunan-perencanaan-teknologi-informasi-dan-komunikasi", component: <DetailPerencanaanTIKPages /> },


  { path: "/layanan-upt-radio-sonata", component: <UptRadioPages /> },
  { path: "/detail-upt-radio-sonata", component: <DetailUptRadioPages /> },

  { path: "/layanan-sekretariat", component: <SekretariatPages /> },
  { path: "/detail-sekretariat", component: <DetailSekretariatPages /> },


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

