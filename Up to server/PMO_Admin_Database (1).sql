-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 20 Jul 2024 pada 10.14
-- Versi server: 8.0.37-0ubuntu0.22.04.3
-- Versi PHP: 8.1.2-1ubuntu2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `PMO_Admin_Database`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `apps_list`
--

CREATE TABLE `apps_list` (
  `id` int NOT NULL,
  `name_apps` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `apiKey` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `apps_list`
--

INSERT INTO `apps_list` (`id`, `name_apps`, `apiKey`, `createdAt`, `updatedAt`) VALUES
(4, 'Kesbangpol', 'APYOWVDVUMATONBQKWRZ', '2024-07-19 03:06:23', '2024-07-19 03:06:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_aplikasi`
--

CREATE TABLE `list_aplikasi` (
  `id` int NOT NULL,
  `submission_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `submission_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `apiKey` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fields` text COLLATE utf8mb4_general_ci NOT NULL,
  `submission_status` int NOT NULL DEFAULT '1',
  `on_validation` text COLLATE utf8mb4_general_ci NOT NULL,
  `on_validation_technique` text COLLATE utf8mb4_general_ci NOT NULL,
  `on_process` text COLLATE utf8mb4_general_ci NOT NULL,
  `on_finish` text COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_infrastruktur`
--

CREATE TABLE `list_infrastruktur` (
  `id` int NOT NULL,
  `submission_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `submission_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `apiKey` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fields` text COLLATE utf8mb4_general_ci NOT NULL,
  `submission_status` int NOT NULL,
  `on_validation` text COLLATE utf8mb4_general_ci NOT NULL,
  `on_validation_technique` text COLLATE utf8mb4_general_ci NOT NULL,
  `on_process` text COLLATE utf8mb4_general_ci NOT NULL,
  `on_finish` text COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `list_infrastruktur`
--

INSERT INTO `list_infrastruktur` (`id`, `submission_title`, `submission_type`, `apiKey`, `fields`, `submission_status`, `on_validation`, `on_validation_technique`, `on_process`, `on_finish`, `role`, `createdAt`, `updatedAt`) VALUES
(6, 'Penambahan Alat', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APCBXYNMCFWXHTNOWNFZ', '{\"name_pic\":\"DPKAD BANDUNG\",\"telp_pic\":\"+6281214586509\",\"type_tools\":[{\"name\":\"Network Cable - (Cat6, 1000ft spool, blue color)\",\"value\":\"400\"}],\"reason\":\"<p>Terdapat kerusakan di kabel yang lama</p>\\n\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Penambahan Alat\"}', 4, '{\"status_validation\":\"Disetujui\"}', '{}', '{}', '{\"submission_status\":\"0\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 03:10:33', '2024-07-19 04:14:31'),
(7, 'Troubleshooting Aplikasi dan Jaringan', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"incident\":\"09.32\",\"reason\":\"<p>Kecepatan Bandwith menurun menjadi 9 mbps</p>\\n\",\"image_screenshoot\":\"APSWSGVBGCUBWJDAAEZDe81c964247f2275c7aeda052bfeb503a93c7418f1ff1726b3c0ffb312e21d3b6\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Troubleshooting Aplikasi dan Jaringan\"}', 4, '{\"status_validation\":\"Disetujui\"}', '{}', '{}', '{\"submission_status\":\"0\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 03:16:00', '2024-07-19 04:14:23'),
(8, 'Troubleshooting Aplikasi dan Jaringan', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"incident\":\"07.20\",\"reason\":\"<p>Dibutuhkan maintance</p>\\n\",\"image_screenshoot\":\"APSWSGVBGCUBWJDAAEZD5f6e9d4499e446ff7547362c8bb758f9fd448ad9079306293781278cb2db3e95\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Troubleshooting Aplikasi dan Jaringan\"}', 4, '{\"status_validation\":\"Disetujui\"}', '{}', '{}', '{\"submission_status\":\"0\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 03:26:01', '2024-07-19 04:14:16'),
(10, 'Penambahan Alat', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"type_tools\":[{\"name\":\"Network Cable - (Cat6, 1000ft spool, blue color)\",\"value\":\"100\"}],\"reason\":\"<p>Adanya penambahan mesin absensi di UPT RADIO SONATA</p>\\n\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Penambahan Alat\"}', 4, '{\"status_validation\":\"Disetujui\"}', '{}', '{}', '{\"submission_status\":\"0\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 03:28:47', '2024-07-19 04:14:01'),
(14, 'Penambahan Bandwidth', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"initial_bandwith\":\"30\",\"proposed_bandwidth\":\"100\",\"reason\":\"<p>Untuk keperluan Livestreaming Bandung Menjawab di Auditorium Rosada</p>\\n\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Penambahan Bandwidth\"}', 7, '{\"status_validation\":\"Disetujui\"}', '{\"team_response\":\"Akan dilakukan konfigurasi penambahan bandwidth\",\"working_schedule\":[\"2024-05-21\",\"2024-05-21\"]}', '{\"upload_foto_kegiatan\":\"APCPMUGVBPYUXNTDJETNe223694d848ae034fa1fd734326970ebb0f6391d87f03dcae9ca5ba37537b821\"}', '{\"submission_status\":\"Menyetujui\",\"response\":\"-\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 04:36:19', '2024-07-19 04:42:14'),
(15, 'Penambahan Bandwidth', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"initial_bandwith\":\"30\",\"proposed_bandwidth\":\"100\",\"reason\":\"<p>untuk keperluan Livestreaming Hari Kebangkitan Nasional di Plaza BalaiKota</p>\\n\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Penambahan Bandwidth\"}', 7, '{\"status_validation\":\"Disetujui\"}', '{\"team_response\":\"Akan dilakukan konfigurasi penambahan bandwidth\",\"working_schedule\":[\"2024-05-17\",\"2024-05-17\"]}', '{\"upload_foto_kegiatan\":\"APCPMUGVBPYUXNTDJETNd3f78ed449660e1f65ce22af296afe36ab2ecc36515562012657d3c4131504bb\"}', '{\"submission_status\":\"Menyetujui\",\"response\":\"-\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 04:37:01', '2024-07-19 04:41:53'),
(16, 'Penambahan Bandwidth', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"initial_bandwith\":\"30\",\"proposed_bandwidth\":\"100\",\"reason\":\"<p>Untuk keperluan Livestreaming acara HUT Damkar di Plaza BalaiKota</p>\\n\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Penambahan Bandwidth\"}', 7, '{\"status_validation\":\"Disetujui\"}', '{\"team_response\":\"Akan dilakukan konfigurasi penambahan bandwidth\",\"working_schedule\":[\"2024-03-05\",\"2024-03-05\"]}', '{\"upload_foto_kegiatan\":\"APCPMUGVBPYUXNTDJETNdd1d71803a766f989280e0b2dd123eeef3942310480fa9e0f74cde7da7d8b5be\"}', '{\"submission_status\":\"Menyetujui\",\"response\":\"-\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 04:44:33', '2024-07-19 04:55:44'),
(18, 'Penambahan Bandwidth', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"initial_bandwith\":\"30\",\"proposed_bandwidth\":\"100\",\"reason\":\"<p>Untuk keperluan Livestreaming Bandung lautan api di Plaza BalaiKota</p>\\n\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Penambahan Bandwidth\"}', 7, '{\"status_validation\":\"Disetujui\"}', '{\"team_response\":\"Akan dilakukan konfigurasi penambahan bandwidth\",\"working_schedule\":[\"2024-03-22\",\"2024-03-22\"]}', '{\"upload_foto_kegiatan\":\"APCPMUGVBPYUXNTDJETN3adc45d8146ff2aa646c84e29ad69b8509a78f634caf25ab139a4818346cbf66\"}', '{\"submission_status\":\"Menyetujui\",\"response\":\"-\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 04:52:30', '2024-07-19 04:55:59'),
(19, 'Penambahan Bandwidth', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"initial_bandwith\":\"30\",\"proposed_bandwidth\":\"100\",\"reason\":\"<p>Untuk keperluan Livestreaming Upacara peringatan hari Otonomi Daerah XXVIII di Plaza BalaiKota</p>\\n\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Penambahan Bandwidth\"}', 7, '{\"status_validation\":\"Disetujui\"}', '{\"team_response\":\"Akan dilakukan konfigurasi penambahan bandwidth\",\"working_schedule\":[\"2024-04-24\",\"2024-04-24\"]}', '{\"upload_foto_kegiatan\":\"APCPMUGVBPYUXNTDJETN14631e2ceeceaa3397b126f8cac215b6e7af023297222c9b03de50febc93f5c3\"}', '{\"submission_status\":\"Menyetujui\",\"response\":\"-\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 06:27:03', '2024-07-19 06:28:20'),
(21, 'Penambahan Alat', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"type_tools\":[{\"name\":\"Modem - (DOCSIS 3.1, supports Gigabit speeds)\",\"value\":1}],\"reason\":\"<p>Untuk Acara reakreditasi puskesmas cipamokolan</p>\\n\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Penambahan Alat\"}', 7, '{\"status_validation\":\"Disetujui\"}', '{\"team_response\":\"Pengecekan Alat\",\"working_schedule\":[\"2024-05-10\",\"2024-05-13\"]}', '{\"upload_foto_alat_sebelum_di_tambahkan\":\"APCPMUGVBPYUXNTDJETN08d2a077b50289caed9daf07be8a35e16a156e09a231f2b64ab51960d5bebd72\",\"upload_foto_alat_sesudah_di_tambahkan\":\"APCPMUGVBPYUXNTDJETN69ae17fd16fe1535cdbff1a4d267c2c949b8d9315c29d4e44e5ffda46d900301\"}', '{\"submission_status\":\"Menyetujui\",\"response\":\"-\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 06:42:31', '2024-07-19 06:45:48'),
(22, 'Penambahan Alat', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"type_tools\":[{\"name\":\"Modem - (DOCSIS 3.1, supports Gigabit speeds)\",\"value\":1}],\"reason\":\"<p>untuk keperluan zoom di acara buruan sae di kelurahan sukawarna</p>\\n\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Penambahan Alat\"}', 7, '{\"status_validation\":\"Disetujui\"}', '{\"team_response\":\"Pengecekan Alat\",\"working_schedule\":[\"2024-04-29\",\"2024-04-30\"]}', '{\"upload_foto_alat_sebelum_di_tambahkan\":\"APCPMUGVBPYUXNTDJETN384efe4d600107403abc8a3d3134c1b11dcddaeba01fb55b4f1c376b931de123\",\"upload_foto_alat_sesudah_di_tambahkan\":\"APCPMUGVBPYUXNTDJETN2c19e53195e8f04255e699dd6de9beefa89fac3675a73cf7b3c0a3622fc2c673\"}', '{\"submission_status\":\"Menyetujui\",\"response\":\"-\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 06:46:25', '2024-07-19 06:47:28'),
(23, 'Penambahan Bandwidth', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"initial_bandwith\":\"30\",\"proposed_bandwidth\":\"100\",\"reason\":\"<p>Untuk keperluan Livestream Upacara hari lahir pancasila di Plaza BalaiKota</p>\\n\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Penambahan Bandwidth\"}', 7, '{\"status_validation\":\"Disetujui\"}', '{\"team_response\":\"Akan dilakukan konfigurasi penambahan bandwidth\",\"working_schedule\":[\"2024-06-30\",\"2024-07-01\"]}', '{\"upload_foto_kegiatan\":\"APCPMUGVBPYUXNTDJETN44fa0f230b82a24fae37900d22b258d7455b905504408db84687422e3eb2dfcf\"}', '{\"submission_status\":\"Menyetujui\",\"response\":\"-\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 06:49:11', '2024-07-19 06:53:07'),
(24, 'Penambahan Bandwidth', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"initial_bandwith\":\"30\",\"proposed_bandwidth\":\"100\",\"reason\":\"<p>Untuk Keperluan Livestream acara bandung kota Angklung festival di Plaza BalaiKota</p>\\n\",\"submission_type\":\"Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi\",\"submission_title\":\"Penambahan Bandwidth\"}', 7, '{\"status_validation\":\"Disetujui\"}', '{\"team_response\":\"Akan dilakukan konfigurasi penambahan bandwidth\",\"working_schedule\":[\"2024-06-07\",\"2024-06-07\"]}', '{\"upload_foto_kegiatan\":\"APCPMUGVBPYUXNTDJETN16fa5503fe34c45115e86847650e4befeea3f3c8e4438152eb23ae6d86c9b4d8\"}', '{\"submission_status\":\"Menyetujui\",\"response\":\"-\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_infra\",\"katim_infra\",\"teknis_infra\"]', '2024-07-19 06:50:00', '2024-07-19 06:52:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_layanan_data`
--

CREATE TABLE `list_layanan_data` (
  `id` int NOT NULL,
  `submission_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `submission_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `apiKey` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fields` text COLLATE utf8mb4_general_ci NOT NULL,
  `submission_status` int NOT NULL DEFAULT '1',
  `on_validation` text COLLATE utf8mb4_general_ci NOT NULL,
  `on_validation_technique` text COLLATE utf8mb4_general_ci NOT NULL,
  `on_process` text COLLATE utf8mb4_general_ci NOT NULL,
  `on_finish` text COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_managementinfrastrukturtik`
--

CREATE TABLE `list_managementinfrastrukturtik` (
  `id` int NOT NULL,
  `submission_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `submission_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `apiKey` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fields` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `submission_status` int NOT NULL DEFAULT '1',
  `on_validation` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `on_validation_technique` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `on_process` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `on_finish` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_perencanaantik`
--

CREATE TABLE `list_perencanaantik` (
  `id` int NOT NULL,
  `submission_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `submission_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `apiKey` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fields` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `submission_status` int NOT NULL DEFAULT '1',
  `on_validation` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `on_validation_technique` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `on_process` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `on_finish` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_permohonan_si`
--

CREATE TABLE `list_permohonan_si` (
  `id` int NOT NULL,
  `submission_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `submission_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `apiKey` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fields` text COLLATE utf8mb4_general_ci NOT NULL,
  `submission_status` int NOT NULL DEFAULT '1',
  `on_validation` text COLLATE utf8mb4_general_ci NOT NULL,
  `feasibility_analysis` text COLLATE utf8mb4_general_ci NOT NULL,
  `feasibility_validation` text COLLATE utf8mb4_general_ci NOT NULL,
  `technical_analysis` text COLLATE utf8mb4_general_ci NOT NULL,
  `technical_validation` text COLLATE utf8mb4_general_ci NOT NULL,
  `recommendation_letter_technical` text COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_reviews`
--

CREATE TABLE `list_reviews` (
  `id` int NOT NULL,
  `id_submission` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `submission_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `submission_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name_pic` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `rating` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `comment` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `list_reviews`
--

INSERT INTO `list_reviews` (`id`, `id_submission`, `submission_title`, `submission_type`, `name_pic`, `rating`, `comment`, `createdAt`, `updatedAt`) VALUES
(6, '2', 'Penerapan Modul TTE', 'Layanan Pengelolaan Sistem Informasi dan Keamanan Sistem Informasi', 'rizal sujana', '5', 'ghjlk;\'', '2024-07-18 05:35:51', '2024-07-18 05:35:51'),
(7, '1', 'Relokasi Alat', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'rizal sujana', '5', 'afsdfsdfsd', '2024-07-18 05:37:13', '2024-07-18 05:37:13'),
(8, '2', 'Penambahan Alat', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'rizal sujana', '3', 'klnjkhjguhjk', '2024-07-18 05:37:46', '2024-07-18 05:37:46'),
(9, '10', 'Permohonan Liputan', 'Layanan Siaran dan Sistem Virtual', 'rizal sujana', '5', 'fyguhijo', '2024-07-18 05:52:49', '2024-07-18 05:52:49'),
(10, '3', 'Relokasi Alat', 'Layanan Pengelolaan Infrastruktur Teknologi, Informasi dan Komunikasi', 'rizal sujana', '5', 'komentar', '2024-07-18 09:29:48', '2024-07-18 09:29:48'),
(11, '1', 'Surat Keputusan', 'Layanan Penyusunan Perencanaan Teknologi, Informasi, dan Komunikasi', 'rizal sujana', '5', 'aman', '2024-07-18 10:11:55', '2024-07-18 10:11:55'),
(12, '3', 'Layanan Pendataan Tenaga Ahli', 'Layanan Sekretariat', 'rizal sujana', '5', 'dfsf', '2024-07-18 10:14:26', '2024-07-18 10:14:26'),
(13, '7', 'Layanan Produksi Data dari Situs Web', 'Layanan Data', 'rizal sujana', '5', 'kjlnjk', '2024-07-18 10:14:35', '2024-07-18 10:14:35'),
(14, '16', 'Rekomendasi Sistem Informasi', 'Layanan Permohonan Sistem Informasi', 'rizal sujana', '5', 'aman', '2024-07-18 10:17:50', '2024-07-18 10:17:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_sekretariat`
--

CREATE TABLE `list_sekretariat` (
  `id` int NOT NULL,
  `submission_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `submission_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `apiKey` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fields` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `submission_status` int NOT NULL DEFAULT '1',
  `on_validation` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `on_validation_technique` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `on_process` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `on_finish` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_sistem_virtual`
--

CREATE TABLE `list_sistem_virtual` (
  `id` int NOT NULL,
  `submission_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `submission_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `apiKey` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fields` text COLLATE utf8mb4_general_ci NOT NULL,
  `submission_status` int NOT NULL DEFAULT '1',
  `on_validation` text COLLATE utf8mb4_general_ci NOT NULL,
  `on_validation_technique` text COLLATE utf8mb4_general_ci NOT NULL,
  `on_process` text COLLATE utf8mb4_general_ci NOT NULL,
  `on_finish` text COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `list_sistem_virtual`
--

INSERT INTO `list_sistem_virtual` (`id`, `submission_title`, `submission_type`, `apiKey`, `fields`, `submission_status`, `on_validation`, `on_validation_technique`, `on_process`, `on_finish`, `role`, `createdAt`, `updatedAt`) VALUES
(13, 'Layanan ZOOM', 'Layanan Siaran dan Sistem Virtual', 'APWSXMZGYLEDKPWSYKOU', '{\"name_pic\":\"DISPPKB\",\"telp_pic\":\"+6281214586509\",\"file_pengajuan_zoom\":\"APWSXMZGYLEDKPWSYKOU2f6d32188da777569a8610c2128c74251504534f6c37d301f93ba7356e24cb08.pdf\",\"reason\":\"<p>Untuk Keperluan Pelaksanaan penilaian kinerja 8 aksi konvergensi penurunan stunting terintegrasi di Kabupaten/Kota provinsi jawa barat tahun 2024</p>\\n\",\"submission_type\":\"Layanan Siaran dan Sistem Virtual\",\"submission_title\":\"Layanan ZOOM\"}', 6, '{\"status_validation\":\"Disetujui\",\"response\":\"\"}', '{\"working_schedule\":[\"2024-05-29\",\"2024-05-29\"],\"team_response\":\"Penerapan Zoom\"}', '{}', '{\"submission_status\":\"0\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_desiminasi\",\"katim_desiminasi\",\"teknis_desiminasi\"]', '2024-07-19 07:18:53', '2024-07-19 07:38:03'),
(14, 'Layanan ZOOM', 'Layanan Siaran dan Sistem Virtual', 'APWSXMZGYLEDKPWSYKOU', '{\"name_pic\":\"DISPPKB\",\"telp_pic\":\"+6281214586509\",\"file_pengajuan_zoom\":\"APWSXMZGYLEDKPWSYKOUf56f1020d28f003cbc75d337adebf23363160cf0058a1cf13c510ae8f18d287b.pdf\",\"reason\":\"<p>Untuk Pelaksanaan strategi nasional percepatan penurunan stunting dan pelaksanaan intervensi stunting terintegrasi di kota bandung</p>\\n\",\"submission_type\":\"Layanan Siaran dan Sistem Virtual\",\"submission_title\":\"Layanan ZOOM\"}', 6, '{\"status_validation\":\"Disetujui\",\"response\":\"\"}', '{\"working_schedule\":[\"2024-06-28\",\"2024-06-28\"],\"team_response\":\"Penerapan Zoom\"}', '{}', '{\"submission_status\":\"0\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_desiminasi\",\"katim_desiminasi\",\"teknis_desiminasi\"]', '2024-07-19 07:21:23', '2024-07-19 07:37:56'),
(15, 'Layanan ZOOM', 'Layanan Siaran dan Sistem Virtual', 'APSWSGVBGCUBWJDAAEZD', '{\"name_pic\":\"DISKOMINFO BANDUNG\",\"telp_pic\":\"+6281214586509\",\"file_pengajuan_zoom\":\"APSWSGVBGCUBWJDAAEZD9be255c89f2296419a85a7be52f8ea41632e92c418e41c32d6f1a452c5f16e89.pdf\",\"reason\":\"<p>Dalam Rangkat untuk acara monitoring dan evaluasi sistem pemerintahan berbasi elektronik (SPBE) triwulan 2 tahun 2024</p>\\n\",\"submission_type\":\"Layanan Siaran dan Sistem Virtual\",\"submission_title\":\"Layanan ZOOM\"}', 6, '{\"status_validation\":\"Disetujui\",\"response\":\"\"}', '{\"working_schedule\":[\"2024-07-04\",\"2024-07-04\"],\"team_response\":\"Penerapan Zoom\"}', '{}', '{\"submission_status\":\"0\"}', '[\"op_pmo\",\"kadis\",\"perangkat_daerah\",\"kabid_desiminasi\",\"katim_desiminasi\",\"teknis_desiminasi\"]', '2024-07-19 07:28:35', '2024-07-19 07:37:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_teknologi_si`
--

CREATE TABLE `list_teknologi_si` (
  `id` int NOT NULL,
  `submission_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `submission_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `apiKey` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fields` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `submission_status` int NOT NULL DEFAULT '1',
  `on_validation` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `on_validation_technique` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `on_process` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `on_finish` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tools_list`
--

CREATE TABLE `tools_list` (
  `id` int NOT NULL,
  `name_tools` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `type_tools` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `total_tools` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `spec_tools` text COLLATE utf8mb4_general_ci NOT NULL,
  `unit_price` text COLLATE utf8mb4_general_ci NOT NULL,
  `total_price` text COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tools_list`
--

INSERT INTO `tools_list` (`id`, `name_tools`, `type_tools`, `total_tools`, `spec_tools`, `unit_price`, `total_price`, `createdAt`, `updatedAt`) VALUES
(1, 'Wi-Fi Router', 'Networking', '10', 'Dual-band, 1200 Mbps, supports up to 50 devices', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:17'),
(2, 'Network Switch', 'Networking', '8', '24-port Gigabit Ethernet, managed switch', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:17'),
(3, 'Firewall', 'Security', '5', 'Next-generation firewall with IPS and VPN support', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:17'),
(4, 'Server Rack', 'Hardware', '0', '42U rack with adjustable mounting depth', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:39'),
(5, 'UPS', 'Power Supply', '7', '1500VA, with battery backup and surge protection', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:17'),
(6, 'Access Point', 'Networking', '15', 'Dual-band, supports PoE, with mesh capability', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:17'),
(7, 'Network Cable', 'Cabling', '10000000', 'Cat6, 1000ft spool, blue color', '20000', '200000000000', '2024-06-18 02:03:17', '2024-07-19 04:22:27'),
(8, 'Fiber Optic Cable', 'Cabling', '50', 'Single-mode, 10Gbps, 100 meters', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:17'),
(9, 'Patch Panel', 'Cabling', '10', '48-port Cat6 patch panel', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:17'),
(10, 'Modem', 'Networking', '12', 'DOCSIS 3.1, supports Gigabit speeds', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:17'),
(28, '234234', 'Security', '5', '234234', '2343243424', '11716217120', '2024-07-13 12:15:15', '2024-07-19 04:21:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `apiKey` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `activeSession` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status_account` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `telp` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `nip` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `instansi` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `address`, `apiKey`, `activeSession`, `role`, `status_account`, `image`, `telp`, `password`, `createdAt`, `updatedAt`, `nip`, `instansi`) VALUES
(1, 'ADMIN', 'pmo@gmail.com', '-', 'APIPMO1234567QWERTY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwbW9AZ21haWwuY29tIiwicm9sZSI6Im9wX3BtbyIsImlhdCI6MTcyMTQwMzEwMiwiZXhwIjoxNzIyMDA3OTAyfQ.zhHOpsapPAoNULrQhtupr20fLLOwthTSWzbM2s3weK8', 'op_pmo', 'Aktif', 'APIPMO1234567QWERTYab02e4711cf0765e755646b1cdbc17fe58da26247f4d99315f07489b846d3cbe', '62895358976565', '$2b$10$LNWOqvT3J0LkATpQ528VIe9.NqSIy3KtCwFbe3/FAkbaIZocn93c.', '2024-05-13 10:40:15', '2024-07-19 15:31:42', '100000000000000000', 'Front Office'),
(74, 'guest', 'guest@gmail.com', '-', 'APIGUESTTTTTT', NULL, 'guest', 'Aktif', '3242', '62895358976565', '$2b$10$LNWOqvT3J0LkATpQ528VIe9.NqSIy3KtCwFbe3/FAkbaIZocn93c.', '2024-05-13 10:40:15', '2024-07-13 03:36:31', '200000000000000000', 'Guest'),
(79, 'Mulyana', 'mulyana@bandung.go.id', '-', 'APDXTLVTLJBATYNOFLKU', NULL, 'kabid_perencanaan', 'Aktif', 'APIPMO1234567QWERTYcf1a066522ba6bd1be3996cc938ecf3518b9f4e78242a70cc32b7aa037761694', '+6281214586509', '$2b$10$wDWKnA1C3PEJLcrQlgvfROyw0m4vagiXJMkDE.jii/bGT03CubCxm', '2024-07-16 13:47:38', '2024-07-19 17:41:34', '196907261993011001', 'Perencanaan'),
(80, 'Arief Mujahidillah', 'arief.mujahidillah@bandung.go.id', '-', 'APFCHXWKMTEJFSEOBAYS', NULL, 'katim_perencanaan', 'Aktif', 'APIPMO1234567QWERTYc7bc406f4595acb013f7a6859e43d2f2cfc2ba34ce56b3057b2cd0eb22970a77', '+6281214586509', '$2b$10$lqu6Ezat3IF2OlD6C21S4O7Z8qxfrWwimgQk2MknXo6rmsJRHnZJS', '2024-07-16 13:53:36', '2024-07-16 13:53:36', '197605152001121001', 'Perencanaan'),
(81, 'Mahyudin. SH', 'mahyudin@bandung.go.id', '-', 'APPDZIYIPPSMCIPWCFCR', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsImVtYWlsIjoibWFoeXVkaW5AYmFuZHVuZy5nby5pZCIsInJvbGUiOiJrYWJpZF9pbmZyYSIsImlhdCI6MTcyMTQxMDkxMywiZXhwIjoxNzIyMDE1NzEzfQ.-Yz8Polc-0r1BwAHdYIvpj6gtPzazocu2oMacbNA3kE', 'kabid_infra', 'Aktif', 'APIPMO1234567QWERTY21e34fa755ffc94665d1f489c2afbbddcfba7ef664b5bad918865cbe9624b749', '+6281214586509', '$2b$10$B5cT1Rb6MttZcWvQzHv/ouZcXECQFxKc3F0sDyQ2ZNh8OMcMc0c9m', '2024-07-16 14:06:10', '2024-07-19 17:41:53', '197202261998031005', 'Infrastruktur'),
(82, 'Ayi Mamat Rachmat', 'ayirachmat6802@bandung.go.id', '-', 'APXMVCPDXCBFEGWYSRLC', NULL, 'kabid_aplikasi', 'Aktif', 'APIPMO1234567QWERTY09c68ffc735635916cc017711d58367f82669ba847efd1cdfdd4dae8b19bedfd', '+6281214586509', '$2b$10$VkGmQGs2HXyBmusjaeF4eOl8Ms/Ruw3qZyT7OgTFXukJFlrT.5bfy', '2024-07-16 14:14:50', '2024-07-16 14:14:50', '196802251990031005', 'Aplikasi'),
(83, 'Ira Monellia', 'iramonellia@bandung.go.id', '-', 'APSPNKNXXPCDKTGHLEWB', NULL, 'katim_perencanaan', 'Aktif', 'APIPMO1234567QWERTYdd5057e3258f3bad616acebba84b1addf709ee30ef508e7f42ede83d10ca5741', '+6281214586509', '$2b$10$SVgmLTU0ZSdMVfJ7jRPxk.W8difSvL5QzKDrcjF7wfus2ROAUlPPe', '2024-07-16 14:30:37', '2024-07-19 09:41:41', '198006022009022002', 'Sumber Daya T.I.K'),
(84, 'Furqon Hanafi S.Si', 'furqon@bandung.go.id', '-', 'APVRNRDTOSHZYZOGWYVV', NULL, 'katim_infra', 'Aktif', 'APIPMO1234567QWERTY4cab3064b7bafea1b5d7c5921ab5cae82aa7d3b05153e4797a2cc3751c840a86', '+6281214586509', '$2b$10$bEBRysISor8yNBJ3ng1mLe1EJPyZz2TY0x9wgodyAJXe8Au3CRnDO', '2024-07-16 14:35:53', '2024-07-16 14:35:53', '198104082006041010', 'Infrastruktur'),
(85, 'Gun Gun Iskandar S.Kom', 'gungun@bandung.go.id', '-', 'APJWLAEGJQNPSSDUMOTS', NULL, 'katim_infra', 'Aktif', 'APIPMO1234567QWERTY945da2ce432acb73d56511d21ffd9b7bbd92e34b4fed9435821f05cbd8f7f0d6', '+6281214586509', '$2b$10$P.zJx.k2kON6gCLcmO8Tz.73/OSKmN3u45YjYLAsY0PyKXZCO6CYi', '2024-07-16 14:42:00', '2024-07-19 07:05:32', '198310032015031001', 'Infrastruktur'),
(86, 'Deni Nur Rachman. S.Kom', 'deninr@bandung.go.id', '-', 'APLYCEEKSNYZPJRVJIRP', NULL, 'teknis_infra', 'Aktif', 'APIPMO1234567QWERTY20a438eff89d85ecc72d6028ac23752a99c47be2483502b654afa441cf492484', '+6281214586509', '$2b$10$x61G8FnwcJxd2HajomYmLOOObVZjW7QnF/dOGhFYGIeZjYvvGKTua', '2024-07-16 14:46:14', '2024-07-16 14:46:14', '199511072019031002', 'Aplikasi'),
(87, 'Hardiansyah Pratama. S.Kom', 'hardian@bandung.go.id', '-', 'APZKPIZRUOOVWMWINJXW', NULL, 'teknis_infra', 'Aktif', 'APIPMO1234567QWERTY187f71a15c4a5f38c804bf2ade3f937636399a58a8647e04dcd09f010d43ce43', '+6281214586509', '$2b$10$5AvNUOtxP1N.xeUTk3XoAulYLJM.kS9hvhurudWrcoiJMU/gNOl3O', '2024-07-16 14:51:04', '2024-07-16 14:51:04', '199411292023211013', 'Aplikasi'),
(88, 'Arif Muhammad Rizal', 'arifmrizal@bandung.go.id', '-', 'APJKDTHILHSITHYWQCPD', NULL, 'katim_aplikasi', 'Aktif', 'APIPMO1234567QWERTY116c302b746485eca4c58e040799dea9f9c46400b1054316cdcdb06429c5341f', '+6281214586509', '$2b$10$bsOcaVUIdoKY48qyhOZIyOsP9BLedETp2F0XzT91SnQC9dMaPUx4K', '2024-07-16 14:55:19', '2024-07-16 14:55:19', '198004072006041010', 'Aplikasi'),
(89, 'Firman Nugraha', 'nugrahaf7@bandung.go.id', '-', 'APAGKAHNDBNBURUKZUZA', NULL, 'katim_aplikasi', 'Aktif', 'APIPMO1234567QWERTYbc709c09d475c522a5b2064590746537f61f0ed7afd030cc928352ee080b967d', '+6281214586509', '$2b$10$4YxdsfIzcPFUbQgfugnUVeOkuGmU8RlkFRBo22BG6lo/1TbW8HYz6', '2024-07-16 14:59:52', '2024-07-16 14:59:52', '198211072011011002', 'Persandian'),
(90, 'Anthony Setiawan', 'anthony@bandung.go.id', '-', 'APGNSUVYFOALQVWHLVCM', NULL, 'teknis_aplikasi', 'Aktif', 'APIPMO1234567QWERTY61c99732309613e6ad510d7f1cfe904e190352bcc2d5d3d3e4ce98f162266de8', '+6281214586509', '$2b$10$Wn6u1PXNfUWDzqrqr1cOzuavbu0j04RbXM95AlZlPMPos1UOeUC/G', '2024-07-16 15:07:48', '2024-07-16 15:07:48', '198601242011011001', 'Integrasi'),
(91, 'Ryan Aditya', 'ryan.aditya@bandung.go.id', '-', 'APFRNHBVAQWAGSWHJRBA', NULL, 'teknis_aplikasi', 'Aktif', 'APIPMO1234567QWERTYc529f0cadab033d4e08864ae62265b1f26cf53e2fff3bb2c3e9b57c7557c8e5b', '+6281214586509', '$2b$10$y.BCEjxEsLgneDz1oMCuousAWmJX96eNJC960UWAS2p4/GSK5rkem', '2024-07-16 15:10:00', '2024-07-16 15:10:00', '199909302023211002', 'Persandian'),
(92, 'Ardi Triawan', 'ardi.triawan@bandung.go.id', '-', 'APSWZIDMUPEZVKEPFOFY', NULL, 'teknis_aplikasi', 'Aktif', 'APIPMO1234567QWERTY53d386e50b8782ac70a6fa9297ff8f54ea2d32f811b0ed1b04c44ec5d378ccd1', '+6281214586509', '$2b$10$fNgyMKOeIBaKEXVuTSEERuMMCgpuPy2lKG/yZMsDfmCAELI7bHk4i', '2024-07-16 15:12:56', '2024-07-16 15:12:56', '198812282019031009', 'Persandian'),
(93, 'Asmunanda Imam', 'asmunanda.imams@bandung.go.id', '-', 'APQLALMKSOIDQGZSQZDQ', NULL, 'teknis_aplikasi', 'Aktif', 'APIPMO1234567QWERTYeb23e5d0aac5f4cf7a17f3527244aea0c2d68e4a937895752be1a33560e8fe88', '+6281214586509', '$2b$10$f/zFZroPayPtOXFjOolUCuPaR3enoVsaSnIounpFbmWORMvq5Gkai', '2024-07-16 15:30:13', '2024-07-16 15:30:13', '199404152023211015', 'Persandian'),
(94, 'Dwi Kuntarto', 'dwikuntarto@bandung.go.id', '-', 'APWSZOQVHHNJFTJEZKKS', NULL, 'teknis_aplikasi', 'Aktif', 'APIPMO1234567QWERTYd62c06942b881b3ce40de5cb2dec289d3fc149d9433a9b57c60479807d14bc5e', '+6281214586509', '$2b$10$JmGx76d5O.etWLHnzjr2q.jj0GMcsPQSpBahqZ.dyGvyfaR9TkRC2', '2024-07-16 15:33:27', '2024-07-16 15:33:27', '198910122020121007', 'Aplikasi'),
(95, 'Yatna M', 'yatmoel@bandung.go.id', '-', 'APEMTHINUZOGCHPJTRFJ', NULL, 'teknis_aplikasi', 'Aktif', 'APIPMO1234567QWERTYcfea5cad6bca501442cddbfe01f4d5aa8bda11d543df3312144fe7559dee2312', '+6281214586509', '$2b$10$RiJvzlM5aeemGkJLUmuvi.TTuEImVCAikAxvmmbu0p4TBehIW8zGG', '2024-07-16 15:35:12', '2024-07-16 15:35:12', '198502032008121001', 'Integrasi'),
(96, 'Rina Karlina', 'rinakarlina@bandung.go.id', '-', 'APWZKSLEVFAZMMLHNHOU', NULL, 'kabid_data', 'Aktif', 'APIPMO1234567QWERTY0642eb503dbe3733a568754c0f59f6fc1beaa036a7946bea7146978f487fe3a8', '+6281214586509', '$2b$10$R227awln3A/gtsN2XL45TOCfz.75/Dxiwd2EY3AdYri.bFDHhAyWK', '2024-07-16 15:43:04', '2024-07-18 16:08:13', '197404211999012001', 'Bidang Data dan Statistik'),
(97, 'Budhy Aditya', 'budhy.aditya@bandung.go.id', '-', 'APWYAXOEQTBXSTPWSEES', NULL, 'katim_data', 'Aktif', 'APIPMO1234567QWERTY20ca8f85d65beb81a509bc5b3ddc5ffa2378d2bee0a45ea991f55fe5a8290b67', '+6281214586509', '$2b$10$BX9FIwfANPQZFYk3gy89JeMP09230JnT40xY3e1Fwz1HQOPB0MDv2', '2024-07-16 15:47:03', '2024-07-16 15:47:03', '197806032005011010', 'Survey & Akuisisi'),
(98, 'Ine Agustina', 'ineagustina@bandung.go.id', '-', 'APAFNMSWVFOUWKJGVQWA', NULL, 'katim_data', 'Aktif', 'APIPMO1234567QWERTY55ff001fdae9c9ebd068b0b53d4e35f95ced4cdbd0d3eb696b2c110263274e79', '+6281214586509', '$2b$10$/e2HOkI3wL5fESwGW6P2a.0amgUmqU6HVUxa1/vol1q1OVx.Utf4y', '2024-07-16 15:49:23', '2024-07-16 15:49:23', '197606062003122020', 'Publikasi & Data Terbuka'),
(99, 'Eka Tirta Cahyati', 'eka3tc51@bandung.go.id', '-', 'APVIXCFUHSDCBPIAGTOO', NULL, 'katim_data', 'Aktif', 'APIPMO1234567QWERTY6135503ebeddde522153e80531052dc17c342bb0c970731f25389c60c5ed9742', '+6281214586509', '$2b$10$gnQC9dgOnln0vzKGzvtmUeJxfY4mIctQQ4puvWAccq45Pr009cpR.', '2024-07-16 15:52:18', '2024-07-16 15:52:18', '197309041999012001', 'Pengolahan & Analisis Data'),
(100, 'Muhammad Mulyawan', 'mulyawan@bandung.go.id', '-', 'APBUTQXVDYPTJWGOJIKW', NULL, 'teknis_data', 'Aktif', 'APIPMO1234567QWERTY7afbd76dc634af27fbe5b9acf42767b31dae3a4315a818631a0a87f3489c6bf9', '+6281214586509', '$2b$10$FZwIst1PTwd9J3Z9Hl/Q3e6zOGJsZqRt4HoH8QokZ64Vzakf3vaQW', '2024-07-16 15:55:37', '2024-07-16 15:55:37', '199405092020121016', 'Publikasi & Data Terbuka'),
(101, 'Tim Teknis Infra', 'interkoneksi.bdg@gmail.com', '-', 'APCPMUGVBPYUXNTDJETN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJlbWFpbCI6ImludGVya29uZWtzaS5iZGdAZ21haWwuY29tIiwicm9sZSI6InRla25pc19pbmZyYSIsImlhdCI6MTcyMTM3MjQyMCwiZXhwIjoxNzIxOTc3MjIwfQ.2q_edA0Y9x5JwGO5GScSoPY1EtmsEz5fTVAzaZpiRBA', 'teknis_infra', 'Aktif', 'APIPMO1234567QWERTYa0cd7af1af29f793f50e6efaf7417c1dcd66e46136119355c8c452d2b3586bba', '+6281214586509', '$2b$10$RKm1EeHo4czusRFxB5EbluCZlQomP0.YOLeWsvTbOTpFzP5VlDgaa', '2024-07-16 15:58:38', '2024-07-19 07:00:20', '276453786519284718', 'Infrastruktur'),
(102, 'Solihin Abdul', 'solihinabdul112@gmail.com', '-', 'APWHRYVEQLYUHLEPMWUP', NULL, 'sekretariat', 'Nonaktif', 'APIPMO1234567QWERTYad4146cd559c966703021b87f272c5a8ce1ca144bcb8c98a786ddf421f309bb3', '+62895358976565', '$2b$10$A9U2iFM2fZYyKC80eyiUyumDHhzKF/vO3KHThf7iyoILFiY6VBQxu', '2024-07-17 01:23:13', '2024-07-18 15:30:57', '196907261993011088', 'Diskom'),
(103, 'INSPEKTORAT DAERAH', 'inspektoratkotabandung2@gmail.com', '-', 'APMSACBQDAEWMZUFQPFL', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY68e20162398785e5d91b9a4d219c178b30bd9df89d4802da30caf7d2b7d500f6', '+6281214586509', '$2b$10$yHoIeUeRutoQwCmf1w5o9e7Virv9SXZ.3ojAVU06QSwWUK89bDF1O', '2024-07-17 03:48:16', '2024-07-17 03:48:16', '102938475665748392', 'Inspektorat Kota Bandung'),
(104, 'BAPPELITBANG', 'bappelitbang@bandung.go.id', '-', 'APIBVBHWDHQKSMMWRWDQ', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY1a10c340dd1801feec991ef4ac3f119f63822909538b17885a24ee38394455f1', '+6281214586509', '$2b$10$zVcQvqPhDUkIBYfOVxXzG.1m8DhbNzmo.PRxuZKnWG5rekMQP2JSC', '2024-07-17 03:52:46', '2024-07-17 03:52:46', '102938475665748392', 'Badan Perencanaan Pembangunan, Penelitian dan Pengembangan'),
(105, 'BKPSDM', 'bkpsdm@bandung.go.id', '-', 'APQJTMCRJADYQHYUXJOP', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTYa631a4dff395e8ad1f4362dd2381a9caf74072c74450369288f1ecf5904f9ffa', '+6281214586509', '$2b$10$Os.KIzjL2G8LJFBBPBgQoeFpMRJ3XGvFLsNwdFgZOXBT4tzMFXuei', '2024-07-17 03:55:22', '2024-07-17 03:55:22', '102938475665748392', 'Badan Kepegawaian dan Pengembangan Sumber Daya Manusia'),
(106, 'DPKAD BANDUNG', 'dpkadbandung@gmail.com', '-', 'APCBXYNMCFWXHTNOWNFZ', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTYc1d684be32482b4d093335c92378f6f7e99ce918a9d90ba0f15448287b170547', '+6281214586509', '$2b$10$0rLdMfYNcuXcfreGDirkROf/L5rkclvEtUREWxG14q1HQfAyeC.Ha', '2024-07-17 03:57:39', '2024-07-19 03:10:57', '102938475665748392', 'Badan Keuangan dan Aset Daerah'),
(107, 'BAPENDA', 'bapenda@bandung.go.id', '-', 'APVJBTRPRCTMSPOBOIIT', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA3LCJlbWFpbCI6ImJhcGVuZGFAYmFuZHVuZy5nby5pZCIsInJvbGUiOiJwZXJhbmdrYXRfZGFlcmFoIiwiaWF0IjoxNzIxMzc4MzExLCJleHAiOjE3MjE5ODMxMTF9.Nwm4dotWokSRwurs9RWATrENykGrj3liqrlMG7qYMmY', 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY9151ec15f4a2bfee3268fdcf8eed32565a236a196cbc7940af4b0db74fda952b', '+6281214586509', '$2b$10$qNaWGWmgBXUYjdwR6O.N1O22EyydMgMSb1WRe6z7y8Kypwda8XIQi', '2024-07-17 04:00:10', '2024-07-19 08:38:31', '102938475665748392', 'Badan Pendapatan Daerah'),
(108, 'KESBANGPOL', 'kesbangpolbandungjuara@gmail.com', '-', 'APYOWVDVUMATONBQKWRZ', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY7c3ebb2e3a6f399894248ae9a201ba59f4e051fd6a2b6289a6374c1966cff8cc', '+6281214586509', '$2b$10$i2aQXPZC9.bu8iULD6ICGOe5wpIgrO4BhGhd4wm7dJX4FTVxJrWhq', '2024-07-17 04:02:51', '2024-07-19 03:07:32', '102938475665748392', 'Badan Kesatuan Bangsa dan Politik'),
(109, 'DISDIK', 'umum.disdik.bdg@gmail.com', '-', 'APHHRILXWNDDLFLBJZRX', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTYefa1fd224c49dcd10692be8b9d6a3f9d8297c89fff99f60e3124a7b810b394d7', '+6281214586509', '$2b$10$jpNW.M0Ba7LGBMHWA.x9O.cEkh8TnEUhnVQfSTZYT4mU123rmQZda', '2024-07-17 04:05:46', '2024-07-17 04:05:46', '102938475665748392', 'Dinas Pendidikan'),
(110, 'DINKES', 'dinkes@bandung.go.id', '-', 'APXLOAXCJNXJXQMDGMAX', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY889fa9f4c79a96c77f9de7710becb127090e6a56fd257e5cfaeb4dee403de61a', '+6281214586509', '$2b$10$uH4IXKYlhFdk3CIF31CdM.5pDb.TOYZmw4jsWNmFmbuBno6lFKiIG', '2024-07-17 04:08:53', '2024-07-19 03:22:23', '102938475665748392', 'Dinas Kesehatan'),
(111, 'ADMIN PU', 'admin.pu@bandung.go.id', '-', 'APWZXKBRUEKGLKELXMLM', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY7c29e048488da5bbd95985ea6e2bef37e4368701b6fa448fe91e802a7c71a1e7', '+6281214586509', '$2b$10$XDkD7grBaSHzSbQUFv.rxuijyBXUJaiZx5LYaa0JLp9npFojNYqG6', '2024-07-17 04:11:20', '2024-07-17 04:11:20', '102938475665748392', 'Dinas Sumber Daya Air dan Bina Marga'),
(112, 'DINSOS', 'dinsos.bdg@bandung.go.id', '-', 'APLSQXGGSKLLEQEDYKVJ', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY5311d32ff95270b6c29247bf280996a4de8a3029dafea09ad7113400da6000a8', '+6281214586509', '$2b$10$qoY277jaCE8KAneU4WiBPOgV4mBxZCxExrV.qEKAaxP5Kx7ERIjTK', '2024-07-17 04:14:06', '2024-07-17 04:14:06', '102938475665748392', 'Dinas Sosial'),
(113, 'DISPPKB', 'disppkb@gmail.com', '-', 'APWSXMZGYLEDKPWSYKOU', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY468b8b96689a64a6798983b46dfb1e4a84d109d56a2f88b6d889d04279d757ef', '+6281214586509', '$2b$10$HLjy1X/LM7Qck8l.z9FUCONkcAX1nIEnjxiXH4f.vYz2zKHS4fSFK', '2024-07-17 04:25:19', '2024-07-19 07:24:49', '102938475665748392', 'Dinas Pengendalian Penduduk dan Keluarga Berencana'),
(114, 'DISPUSIP', 'dispusip@bandung.go.id', '-', 'APQPPGPNRDXFEABWIFJY', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTYe7dc5ed9eb9b2051da7b2319171150bc661b91ab0bc66640bd6c7e371078ff64', '+6281214586509', '$2b$10$BPwMPrPS56VGzh9miEo7Der2Yt8srAvqIQPrtnqOrYQAeugOM6oaG', '2024-07-17 04:26:38', '2024-07-17 04:26:38', '102938475665748392', 'Dinas Arsip dan Perpustakaan'),
(115, 'DISKAR BANDUNG', 'diskarbandung@gmail.com', '-', 'APNCLZDKHBXMOZKHDNON', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY8177547ca9bb86c494934d16d30c1082f7f5d350c5c5f3e34cd2b7248406b014', '+6281214586509', '$2b$10$fF0TywLt5doxPnyF9Y/wwed/ipwEOdnP2RySSJAROkhy21JqqB60W', '2024-07-17 04:28:09', '2024-07-17 04:28:09', '102938475665748392', 'Dinas Kebakaran dan Penanggulangan Bencana'),
(116, 'SATPOLPP BANDUNG', 'satpolpp@bandung.go.id', '-', 'APSLNYXPMDZWYXUPKHAD', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY7af4dbb6f5866d74c5f93558c88af11691e9084098088b107c82f5be7b17d788', '+6281214586509', '$2b$10$zFOHZG956RY8gqUHWj.zc.JxrBjHtwXnycaXnBcNnuA6gv1CIaas.', '2024-07-17 04:29:27', '2024-07-17 04:29:27', '102938475665748392', 'Satuan Polisi Pamong Praja'),
(117, 'DKPP BANDUNG', 'dkpp@bandung.go.id', '-', 'APKPCTYKUWDPEEYGNYLU', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTYfe8ac7208c6ff6d374e16fc7fca778e65a0645b505694358bf209df8ed391f4c', '+6281214586509', '$2b$10$CJ9F7xRJ3eri/Fuj1hGfOunlWe5rV4l45UmOINLha.fwQZ9sMsPWW', '2024-07-17 04:30:38', '2024-07-17 04:30:38', '102938475665748392', 'Dinas Ketahanan Pangan dan Pertanian'),
(118, 'DLH BANDUNG', 'dlhkota@bandung.go.id', '-', 'APKVZVGEYKQEOBKDCGPJ', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY617c2a3da360a5e36ea1cd069f66c692be9870fe31ab0be07c862098d8893566', '+6281214586509', '$2b$10$QXSedA7kgtufWYUEYrlptObGE0CAl/MIQyKhOY72sCpeUGJRTTQ2i', '2024-07-17 04:32:13', '2024-07-17 04:32:13', '102938475665748392', 'Dinas Lingkungan Hidup'),
(119, 'DISHUB BANDUNG', 'dishub@bandung.go.id', '-', 'APBATKZFABORWOSWEEQC', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY6c575fdf6dfd9b428df375212f4dbd7f706d1c4f64d1f1a3841fa46d7542d524', '+6281214586509', '$2b$10$fuqQ6qtMgWUVLE7EALsBAusywUx58gVN0XPHo9NZFKuQveyecQs3u', '2024-07-17 04:33:58', '2024-07-17 04:33:58', '102938475665748392', 'Dinas Perhubungan'),
(120, 'DISKOMINFO BANDUNG', 'diskominfo@bandung.go.id', '-', 'APSWSGVBGCUBWJDAAEZD', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY6e577ebb0778d90733cf3014e2e49eeff25443e467abf74ebeffd70480424041', '+6281214586509', '$2b$10$prLkNZdCuzXN9aj2MYZYauETS0Vg16YMrDGDuRXDqz9viU2/mB5ke', '2024-07-17 04:35:32', '2024-07-19 09:41:14', '102938475665748392', 'Dinas Komunikasi dan Informatika'),
(121, 'DISDAGIN BANDUNG', 'disdagin@bandung.go.id', '-', 'APRHPRMKDTKUYSGQWYRE', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTYc3101333f4308d112f516b5f07f7cfb54f45fdb372ecfa097535d131c60cb8a6', '+6281214586509', '$2b$10$.ufY8JsZnajaQh7vt8FhBOSVMPjGHlECO/21ICxZrGqWIEewEmaRG', '2024-07-17 04:36:40', '2024-07-17 04:36:40', '102938475665748392', 'Dinas Perdagangan dan Perindustrian'),
(122, 'DPMPTSP BANDUNG', 'dpmptsp@bandung.go.id', '-', 'APJTDHZYVBUKIDBFTJRQ', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTYf25e67b6668d54607f50c228fa5dda5ba14b0fd9953fdec48a1b744aaccdff10', '+6281214586509', '$2b$10$//FCDoQ06JYNUNrQ7l6OXeJUwijq1SWQIZ/dF5Du2LWlx/6onWK/e', '2024-07-17 04:39:50', '2024-07-17 04:39:50', '102938475665748392', 'Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu'),
(123, 'DISBUDPAR BANDUNG', 'disbudpar@bandung.go.id', '-', 'APLBVDPUOYBAHZSSHZJK', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTYe5cc6d95ac517d51774bbc72f1fa0ed775707307136db6cc2842804b6d1f49be', '+6281214586509', '$2b$10$cj3bpd2txjJyDFXB0UNklusf50ie1rYDLNVJM2wxBAzybJM7gJt1G', '2024-07-17 04:41:37', '2024-07-17 04:41:37', '102938475665748392', 'Dinas Kebudayaan dan Pariwisata'),
(124, 'DISDUKCAPIL BANDUNG', 'disdukcapil@bandung.go.id', '-', 'APXFRHCQJXMOBVLJBLGQ', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY2e76b9e514f953413ee5087a775af20d8ba268e2e45a8f2d047062e6ad7735b4', '+6281214586509', '$2b$10$sEpX8oxpPFIu9kRNJCuQqevhREQSi8tL0duijw7W8D0kKb3/iX/pK', '2024-07-17 04:42:51', '2024-07-17 04:42:51', '102938475665748392', 'Dinas Kependudukan dan Pencatatan Sipil'),
(125, 'RSUD BANDUNG', 'rsudkotabandung@yahoo.com', '-', 'APPRSXUJTTJTLBAUPYCM', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTYc70ab3150f52bce5b69cd9c527af4ffc4546461b04479d8d82bb44f7b916f074', '+6281214586509', '$2b$10$7ZAAk28ZD.4HjqouMna6p.W4I6Gmu7eaAsSDZNCQwFlrXAivK9btq', '2024-07-17 04:44:35', '2024-07-17 04:44:35', '102938475665748392', 'Rumah Sakit Umum Daerah'),
(126, 'SEKRETARIAT RSUD BANDUNG', 'sekretariat@rsudbandungkiwari.or.id', '-', 'APQKIHKEIBNARNLNVBSG', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTYe811db18854c99370cbe4dbcc331c6468a199647bea0a0abbe567fd50ad34d03', '+6281214586509', '$2b$10$BjjdPpJadcvl7Uyyq0woZecxAEhPwGtqu4AR7KkFhpLTZHiEJfLYy', '2024-07-17 04:46:25', '2024-07-17 04:46:25', '102938475665748392', 'RSUD Bandung Kiwari'),
(127, 'RSKGM BANDUNG', 'rskgm.bandung@gmail.com', '-', 'APSLRQRIBKTQGGOSNFXZ', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY2b7d0cd383c5d10a1ce386858923df8a17321170621aa6f17a9151ff45ac088d', '+6281214586509', '$2b$10$OgmJ3ECoDwZd/2QuB3/IveLGuO0Y65fa6kD3S4oQHeBPclIZyIJcq', '2024-07-17 04:48:22', '2024-07-19 11:43:06', '102938475665748392', 'Rumah Sakit Khusus Gigi dan Mulut'),
(128, 'TATA PEMERINTAHAN SETDA', 'email@bandung.go.id', '-', 'APRPHQJVQMZSBABOJCLA', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY8bf32d4b0eb0fd4aa4f34ca00c4aaca16cb0b4b3d0956db7c94012cedb2ecbad', '+6281214586509', '$2b$10$ILr1dqNxKQ.hXn1yeUMgPe8qSyS6X9MNrwABe.eGqfYAUwoOf5u0e', '2024-07-17 04:50:08', '2024-07-19 11:50:44', '102938475665748392', 'Bagian Tata Pemerintahan Setda'),
(129, 'BAGKESMAS BANDUNG', 'bag.kesmas@bandung.go.id', '-', 'APXOKOVXCOAZHRSPSREV', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY56afc13d3be970c35411815cec705012790c5335152faaf15b7a8104c3c3f6c3', '+6281214586509', '$2b$10$2XhOGOODHBy3kujpU55uZeuADyRZDhRqV7RmjmGbPphI1mGC.LxIO', '2024-07-17 04:51:55', '2024-07-17 04:51:55', '102938475665748392', 'Bagian Kesejahteraan Rakyat'),
(130, 'BAGEKONOMI BANDUNG', 'bagianekonomi.bdg@gmail.com', '-', 'APDCWJSHTQYLGMMEKMYG', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTYdf0315932ef9c5c80d9a79a4537ab893234e14a6281ecb21ca149c9f2d5b155e', '+6281214586509', '$2b$10$alROFe3E7qYyV3lylp.uR.XGGtNYT4nZszrLPtc5s769AOnzuMgTK', '2024-07-17 04:53:04', '2024-07-17 04:53:04', '102938475665748392', 'Bagian Perekonomian'),
(131, 'BAGHUKUM BANDUNG', 'baghukumbandung@gmail.com', '-', 'APVMKFWZDREZBOFOYOBC', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY13f516954bc9b591ff3b503b49dd7454764a09c0bf2a867788d66a993a1feed9', '+6281214586509', '$2b$10$lORAFIoVzWtEGhUexfRx6.94PO98ZloVYES/Vtugb3wwXGgVaWOv6', '2024-07-17 04:54:24', '2024-07-17 04:54:24', '102938475665748392', 'Bagian Hukum'),
(134, 'Yusuf Cahyadi S.H, M.H', 'ycahyadi@bandung.go.id', 'Bandung Kota', 'APWZPYSZKOBOBCFLFAWZ', NULL, 'katim_desiminasi', 'Aktif', 'APIPMO1234567QWERTY38f3dffc5b0639b091db04882f7594c6ecc4717f4f21fb7939f6e4a9d8bf46cf', '+62821273322345', '$2b$10$Lq.5hJ0jT9U9qSDyd0zKm.DJyOwNDfxwd02RmaknNRVALRL/njCOS', '2024-07-19 07:03:29', '2024-07-19 09:46:40', '2132313123131377878', 'Diskominfo'),
(135, 'Ali hanifa', 'ahanifa@bandung.go.id', 'Bandung Kota', 'APEEYFYJMKOFGXOXIPXG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM1LCJlbWFpbCI6ImFoYW5pZmFAYmFuZHVuZy5nby5pZCIsInJvbGUiOiJ0ZWtuaXNfZGVzaW1pbmFzaSIsImlhdCI6MTcyMTM4MjQyMSwiZXhwIjoxNzIxOTg3MjIxfQ.RMbzZxBweIR30eXaDx3z5sx-avvdbc7b1VstRhcaB0o', 'teknis_desiminasi', 'Aktif', 'APIPMO1234567QWERTY01cdb40f244c7fefde63ca4f1367eb191490636021cacd9cab6b2135dfae8c74', '+6282127322357', '$2b$10$ZNN8aae0OwCJpqBrJgxleO2/bNYvq9F9bmkTf1qHBgGdeAk2SZ4..', '2024-07-19 07:07:44', '2024-07-19 09:47:01', '2132135325252343324', 'Diskominfo'),
(136, 'M Ridwan Fathony', 'mrfathonhy10@gmail.com', 'Bandung kota', 'APLNSCGGWEJLDIMMTETK', NULL, 'katim_sekretariat', 'Aktif', 'APIPMO1234567QWERTY609b6f7bc7c0aec85701d6b8178d93f47299bfb44b5a002bfc3411ccfe775abf', '+6282127322357', '$2b$10$RkemhrhKzryZ1N0Sfm0S4.pnyHdb4rNe9gGlq/pdb9oQI.A.7Yy.G', '2024-07-19 15:38:52', '2024-07-19 15:38:52', '199406102016091001', 'Diskominfo'),
(137, 'Y Ahmad Brilyana, S.Sos., M.Si', 'yayan@bandung.go.id', 'Bandung, Kota Bandung, Jawa Barat, Indonesia', 'APRZXCPQJCGFZVSJYPKT', NULL, 'kadis', 'Aktif', 'APIPMO1234567QWERTY4054cf23f06dd0cb95363ccca9dda3c38eb3e2c96ed0f8b9b4fd4545caed5b22', '+6282127322357', '$2b$10$fry7crkWRvPHEm0QW.4/DudzV36Yl8RlbUPmXzZyhwWsRNJEf9Hsq', '2024-07-19 15:40:13', '2024-07-19 15:40:13', '197311271993031003', 'Diskominfo'),
(138, 'Darto, AP., M.M', 'darto.ap@gmail.com', 'Bandung, Kota Bandung, Jawa Barat, Indonesia', 'APOUFWXGBPCUGHFLMLPK', NULL, 'teknis_sekretariat', 'Aktif', 'APIPMO1234567QWERTYa89d6d14c36809f0985b188c0610b3174972215b1c4b1063d2f7de3f25f564d8', '+6282132132342', '$2b$10$NEzkm5bi9nLE56zQ97xTW.pQQABXy6KkyWm6ble9va73Rx54A31M6', '2024-07-19 15:41:15', '2024-07-19 15:41:15', '197404101993111003', 'Diskominfo');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `apps_list`
--
ALTER TABLE `apps_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apiKey` (`apiKey`);

--
-- Indeks untuk tabel `list_aplikasi`
--
ALTER TABLE `list_aplikasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apiKey` (`apiKey`);

--
-- Indeks untuk tabel `list_infrastruktur`
--
ALTER TABLE `list_infrastruktur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apiKey` (`apiKey`);

--
-- Indeks untuk tabel `list_layanan_data`
--
ALTER TABLE `list_layanan_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apiKey` (`apiKey`);

--
-- Indeks untuk tabel `list_managementinfrastrukturtik`
--
ALTER TABLE `list_managementinfrastrukturtik`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apiKey` (`apiKey`);

--
-- Indeks untuk tabel `list_perencanaantik`
--
ALTER TABLE `list_perencanaantik`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apiKey` (`apiKey`);

--
-- Indeks untuk tabel `list_permohonan_si`
--
ALTER TABLE `list_permohonan_si`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apiKey` (`apiKey`);

--
-- Indeks untuk tabel `list_reviews`
--
ALTER TABLE `list_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `list_sekretariat`
--
ALTER TABLE `list_sekretariat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apiKey` (`apiKey`);

--
-- Indeks untuk tabel `list_sistem_virtual`
--
ALTER TABLE `list_sistem_virtual`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apiKey` (`apiKey`);

--
-- Indeks untuk tabel `list_teknologi_si`
--
ALTER TABLE `list_teknologi_si`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apiKey` (`apiKey`);

--
-- Indeks untuk tabel `tools_list`
--
ALTER TABLE `tools_list`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apiKey` (`apiKey`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `apps_list`
--
ALTER TABLE `apps_list`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `list_aplikasi`
--
ALTER TABLE `list_aplikasi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `list_infrastruktur`
--
ALTER TABLE `list_infrastruktur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `list_layanan_data`
--
ALTER TABLE `list_layanan_data`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `list_managementinfrastrukturtik`
--
ALTER TABLE `list_managementinfrastrukturtik`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `list_perencanaantik`
--
ALTER TABLE `list_perencanaantik`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `list_permohonan_si`
--
ALTER TABLE `list_permohonan_si`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `list_reviews`
--
ALTER TABLE `list_reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `list_sekretariat`
--
ALTER TABLE `list_sekretariat`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `list_sistem_virtual`
--
ALTER TABLE `list_sistem_virtual`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `list_teknologi_si`
--
ALTER TABLE `list_teknologi_si`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tools_list`
--
ALTER TABLE `tools_list`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `apps_list`
--
ALTER TABLE `apps_list`
  ADD CONSTRAINT `apps_list_ibfk_1` FOREIGN KEY (`apiKey`) REFERENCES `users` (`apiKey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `list_aplikasi`
--
ALTER TABLE `list_aplikasi`
  ADD CONSTRAINT `list_aplikasi_ibfk_1` FOREIGN KEY (`apiKey`) REFERENCES `users` (`apiKey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `list_infrastruktur`
--
ALTER TABLE `list_infrastruktur`
  ADD CONSTRAINT `list_infrastruktur_ibfk_1` FOREIGN KEY (`apiKey`) REFERENCES `users` (`apiKey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `list_layanan_data`
--
ALTER TABLE `list_layanan_data`
  ADD CONSTRAINT `list_layanan_data_ibfk_1` FOREIGN KEY (`apiKey`) REFERENCES `users` (`apiKey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `list_managementinfrastrukturtik`
--
ALTER TABLE `list_managementinfrastrukturtik`
  ADD CONSTRAINT `list_managementinfrastrukturtik_ibfk_1` FOREIGN KEY (`apiKey`) REFERENCES `users` (`apiKey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `list_perencanaantik`
--
ALTER TABLE `list_perencanaantik`
  ADD CONSTRAINT `list_perencanaantik_ibfk_1` FOREIGN KEY (`apiKey`) REFERENCES `users` (`apiKey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `list_permohonan_si`
--
ALTER TABLE `list_permohonan_si`
  ADD CONSTRAINT `list_permohonan_si_ibfk_1` FOREIGN KEY (`apiKey`) REFERENCES `users` (`apiKey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `list_sekretariat`
--
ALTER TABLE `list_sekretariat`
  ADD CONSTRAINT `list_sekretariat_ibfk_1` FOREIGN KEY (`apiKey`) REFERENCES `users` (`apiKey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `list_sistem_virtual`
--
ALTER TABLE `list_sistem_virtual`
  ADD CONSTRAINT `list_sistem_virtual_ibfk_1` FOREIGN KEY (`apiKey`) REFERENCES `users` (`apiKey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `list_teknologi_si`
--
ALTER TABLE `list_teknologi_si`
  ADD CONSTRAINT `list_teknologi_si_ibfk_1` FOREIGN KEY (`apiKey`) REFERENCES `users` (`apiKey`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
