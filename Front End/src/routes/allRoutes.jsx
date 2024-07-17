import React from "react";

import LoginPages from "../pages/Authentication/login";
import DashboardPages from "../pages/Dashboard";
import InfrastrukturPages from "../pages/Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi";
import DetailInfrastrukturPages from "../pages/Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi/detail";
import DataAlatInfraPage from "../pages/Layanan dan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi/List Tools";
import LayananDataPages from "../pages/Layanan Data";
import DetailLayananDataPages from "../pages/Layanan Data/detail";
import AplikasiPages from "../pages/Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan";
import DetailAplikasiPages from "../pages/Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan/detail";
import LayananPenyusunanPerencanaanTIKPages from "../pages/Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi";
import DetailPerencanaanTIKPages from "../pages/Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi/detail";
import PermohonanSIPages from "../pages/Layanan Permohonan Sistem Informasi";
import CreatePermohonanSIPages from "../pages/Layanan Permohonan Sistem Informasi/create";
import DetailPermohonanSIPages from "../pages/Layanan Permohonan Sistem Informasi/detail";
import SekretariatPages from "../pages/Layanan Sekretariat";
import DetailSekretariatPages from "../pages/Layanan Sekretariat/detail";
import TeknologiSIPages from "../pages/Layanan Siaran dan Sistem Virtual";
import DetailTeknologiSIPages from "../pages/Layanan Siaran dan Sistem Virtual/detail";

import AccountPages from "../pages/System/Account";
import DetailsAccountPages from "../pages/System/Account/detail";

import LandingPages from "../pages/LandingPages";
import MagangPages from "../pages/LandingPages/pages/Magang";
import DataAppPerangkatDaerah from "../pages/System/List App";

const userRoutes = [
  { path: "/dashboard", component: <DashboardPages /> },

  { path: "/layanan-pengelolaan-infrastruktur-teknologi-informasi-komunikasi", component: <InfrastrukturPages /> },
  { path: "/detail-infrastruktur", component: <DetailInfrastrukturPages /> },

  { path: "/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", component: <AplikasiPages /> },
  { path: "/detail-aplikasi", component: <DetailAplikasiPages /> },

  { path: "/layanan-permohonan-sistem-informasi", component: <PermohonanSIPages /> },
  { path: "/permohonan-sistem-informasi", component: <CreatePermohonanSIPages /> },
  { path: "/detail-permohonan-sistem-informasi", component: <DetailPermohonanSIPages /> },

  { path: "/layanan-siaran-dan-sistem-virtual", component: <TeknologiSIPages /> },
  { path: "/detail-siaran-dan-sistem-virtual", component: <DetailTeknologiSIPages /> },

  { path: "/layanan-data", component: <LayananDataPages /> },
  { path: "/detail-data", component: <DetailLayananDataPages /> },

  { path: "/layanan-penyusunan-perencanaan-teknologi-informasi-dan-komunikasi", component: <LayananPenyusunanPerencanaanTIKPages /> },
  { path: "/detail-layanan-penyusunan-perencanaan-teknologi-informasi-dan-komunikasi", component: <DetailPerencanaanTIKPages /> },

  { path: "/layanan-sekretariat", component: <SekretariatPages /> },
  { path: "/detail-sekretariat", component: <DetailSekretariatPages /> },


];
const infraRoutes = [
  { path: "/data-alat-infrastruktur", component: <DataAlatInfraPage /> },
]
const perangkatdaerahRoutes = [
  { path: "/data-alat-aplikasi", component: <DataAppPerangkatDaerah /> },
  { path: "/detail-account", component: <DetailsAccountPages /> },
]
const operatorRoutes = [
  { path: "/account", component: <AccountPages /> },
  { path: "/detail-account", component: <DetailsAccountPages /> },
]
const nonUserRoutes = [
  { path: "/", component: <LandingPages /> },
  { path: "/pendaftaran-magang", component: <MagangPages /> },
];

const authRoutes = [
  { path: "/login", component: <LoginPages /> },
];

export { authRoutes, infraRoutes, nonUserRoutes, operatorRoutes, userRoutes ,perangkatdaerahRoutes};

