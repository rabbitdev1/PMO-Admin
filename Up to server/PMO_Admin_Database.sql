-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 14 Jul 2024 pada 15.35
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

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
  `id` int(11) NOT NULL,
  `name_apps` varchar(50) NOT NULL,
  `apiKey` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_aplikasi`
--

CREATE TABLE `list_aplikasi` (
  `id` int(11) NOT NULL,
  `submission_title` varchar(255) NOT NULL,
  `submission_type` varchar(255) NOT NULL,
  `apiKey` varchar(255) NOT NULL,
  `fields` text NOT NULL,
  `submission_status` int(11) NOT NULL DEFAULT 1,
  `on_validation` text NOT NULL,
  `on_validation_technique` text NOT NULL,
  `on_process` text NOT NULL,
  `on_finish` text NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_infrastruktur`
--

CREATE TABLE `list_infrastruktur` (
  `id` int(11) NOT NULL,
  `submission_title` varchar(255) NOT NULL,
  `submission_type` varchar(255) NOT NULL,
  `apiKey` varchar(255) NOT NULL,
  `fields` text NOT NULL,
  `submission_status` int(11) NOT NULL,
  `on_validation` text NOT NULL,
  `on_validation_technique` text NOT NULL,
  `on_process` text NOT NULL,
  `on_finish` text NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_layanan_data`
--

CREATE TABLE `list_layanan_data` (
  `id` int(11) NOT NULL,
  `submission_title` varchar(255) NOT NULL,
  `submission_type` varchar(255) NOT NULL,
  `apiKey` varchar(255) NOT NULL,
  `fields` text NOT NULL,
  `submission_status` int(11) NOT NULL DEFAULT 1,
  `on_validation` text NOT NULL,
  `on_validation_technique` text NOT NULL,
  `on_process` text NOT NULL,
  `on_finish` text NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_managementinfrastrukturtik`
--

CREATE TABLE `list_managementinfrastrukturtik` (
  `id` int(11) NOT NULL,
  `submission_title` varchar(255) NOT NULL,
  `submission_type` varchar(255) NOT NULL,
  `apiKey` varchar(255) NOT NULL,
  `fields` mediumtext NOT NULL,
  `submission_status` int(11) NOT NULL DEFAULT 1,
  `on_validation` mediumtext NOT NULL,
  `on_validation_technique` mediumtext NOT NULL,
  `on_process` mediumtext NOT NULL,
  `on_finish` mediumtext NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_perencanaantik`
--

CREATE TABLE `list_perencanaantik` (
  `id` int(11) NOT NULL,
  `submission_title` varchar(255) NOT NULL,
  `submission_type` varchar(255) NOT NULL,
  `apiKey` varchar(255) NOT NULL,
  `fields` mediumtext NOT NULL,
  `submission_status` int(11) NOT NULL DEFAULT 1,
  `on_validation` mediumtext NOT NULL,
  `on_validation_technique` mediumtext NOT NULL,
  `on_process` mediumtext NOT NULL,
  `on_finish` mediumtext NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_permohonan_si`
--

CREATE TABLE `list_permohonan_si` (
  `id` int(11) NOT NULL,
  `submission_title` varchar(255) NOT NULL,
  `submission_type` varchar(255) NOT NULL,
  `apiKey` varchar(255) NOT NULL,
  `fields` text NOT NULL,
  `submission_status` int(11) NOT NULL DEFAULT 1,
  `on_validation` text NOT NULL,
  `feasibility_analysis` text NOT NULL,
  `feasibility_validation` text NOT NULL,
  `technical_analysis` text NOT NULL,
  `technical_validation` text NOT NULL,
  `recommendation_letter_technical` text NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_sekretariat`
--

CREATE TABLE `list_sekretariat` (
  `id` int(11) NOT NULL,
  `submission_title` varchar(255) NOT NULL,
  `submission_type` varchar(255) NOT NULL,
  `apiKey` varchar(255) NOT NULL,
  `fields` mediumtext NOT NULL,
  `submission_status` int(11) NOT NULL DEFAULT 1,
  `on_validation` mediumtext NOT NULL,
  `on_validation_technique` mediumtext NOT NULL,
  `on_process` mediumtext NOT NULL,
  `on_finish` mediumtext NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_sistem_virtual`
--

CREATE TABLE `list_sistem_virtual` (
  `id` int(11) NOT NULL,
  `submission_title` varchar(255) NOT NULL,
  `submission_type` varchar(255) NOT NULL,
  `apiKey` varchar(255) NOT NULL,
  `fields` text NOT NULL,
  `submission_status` int(11) NOT NULL DEFAULT 1,
  `on_validation` text NOT NULL,
  `on_validation_technique` text NOT NULL,
  `on_process` text NOT NULL,
  `on_finish` text NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_teknologi_si`
--

CREATE TABLE `list_teknologi_si` (
  `id` int(11) NOT NULL,
  `submission_title` varchar(255) NOT NULL,
  `submission_type` varchar(255) NOT NULL,
  `apiKey` varchar(255) NOT NULL,
  `fields` mediumtext NOT NULL,
  `submission_status` int(11) NOT NULL DEFAULT 1,
  `on_validation` mediumtext NOT NULL,
  `on_validation_technique` mediumtext NOT NULL,
  `on_process` mediumtext NOT NULL,
  `on_finish` mediumtext NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tools_list`
--

CREATE TABLE `tools_list` (
  `id` int(11) NOT NULL,
  `name_tools` varchar(255) NOT NULL,
  `type_tools` varchar(255) NOT NULL,
  `total_tools` varchar(255) NOT NULL,
  `spec_tools` text NOT NULL,
  `unit_price` text NOT NULL,
  `total_price` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
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
(7, 'Network Cable', 'Cabling', '100', 'Cat6, 1000ft spool, blue color', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:17'),
(8, 'Fiber Optic Cable', 'Cabling', '50', 'Single-mode, 10Gbps, 100 meters', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:17'),
(9, 'Patch Panel', 'Cabling', '10', '48-port Cat6 patch panel', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:17'),
(10, 'Modem', 'Networking', '12', 'DOCSIS 3.1, supports Gigabit speeds', '0', '0', '2024-06-18 02:03:17', '2024-06-18 02:03:17'),
(28, '234234', 'Security', '1', '234234', '2343243424', '2343243424', '2024-07-13 12:15:15', '2024-07-13 12:15:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `apiKey` varchar(100) NOT NULL,
  `activeSession` text DEFAULT NULL,
  `role` varchar(40) NOT NULL,
  `status_account` varchar(10) NOT NULL,
  `image` varchar(200) NOT NULL,
  `telp` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `address`, `apiKey`, `activeSession`, `role`, `status_account`, `image`, `telp`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'ADMIN', 'pmo@gmail.com', 'Kb. Lega, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat', 'APIPMO1234567QWERTY', NULL, 'op_pmo', 'Aktif', 'APIPMO1234567QWERTY65fb0e8b80f1232dbc871d89bf949e4b3a7aef389b5cc171886ff9e123a00513', '62895358976565', '$2b$10$LNWOqvT3J0LkATpQ528VIe9.NqSIy3KtCwFbe3/FAkbaIZocn93c.', '2024-05-13 10:40:15', '2024-07-14 13:35:07'),
(56, 'SAPRUDIN', 'opd1@gmail.com', 'jalan sadang rt 02 rw05\ndesa sadang', 'APWZRBCHSEINHQDBFRDW', NULL, 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY9bf2831aa882b500b8e35895b256200aead6dc28f2d8672db649619ddd26b95a', '+62895358976565', '$2b$10$MzyOMqPt6XTj.XH60elXQOPpxbaEN.NgyaeZCU7a9zgbDmSkmgEJe', '2024-06-02 09:05:16', '2024-07-14 13:32:18'),
(57, 'JAMAL', 'kabid_infra@gmail.com', 'jalan sadang rt 02 rw05\ndesa sadang', 'APNUBWMGMKDGXAKJDOGV', NULL, 'kabid_infra', 'Aktif', 'APIPMO1234567QWERTY9c63818d3e26e72ce2bcdb4d527fbcfa9f9d755cbf264a0890f2bf79225ac699', '+62895358976565', '$2b$10$mQb2KBYeuOOlA0rxmDJA3.VxL/EVIxkcgq20WBe4o3yQ5FlG/Adne', '2024-06-02 09:06:13', '2024-07-13 12:49:03'),
(58, 'PRIMAYOGA', 'katim_infra@gmail.com', 'jalan sadang rt 02 rw05\ndesa sadang', 'APYOCVXXNLRGYDFAEFRH', NULL, 'katim_infra', 'Aktif', 'APIPMO1234567QWERTY85369b3a5e4b3c3fbf5d0587b0dc0aca90d9b0173d0137cec11fce2ef8fcc523', '+62895358976565', '$2b$10$koioNlz1SQl.zTPQ6mE6mud0Xt7uqcFLA/JOQRNOfybF8c3vGZvsG', '2024-06-02 09:08:41', '2024-07-13 03:33:03'),
(59, 'ILAH YUSUH', 'anggota_infra@gmail.com', 'jalan sadang rt 02 rw05\ndesa sadang', 'APIMJPMMPCBCNYMZXRBV', NULL, 'teknis_infra', 'Aktif', 'APIPMO1234567QWERTY46bd0bed0825780e3b1aa8ea9374d94b67937085af6a3cadf0382025a60ca1d0', '+62895358976565', '$2b$10$zj9LpwQtAsgjTcJoCBZNteKUy6KEIHZcHm8C8ryc10SZurCiqK19i', '2024-06-02 09:09:51', '2024-07-08 02:33:46'),
(60, 'JADI ARPIANSAH', 'kabid_aplikasi@gmail.com', 'jalan sadang rt 02 rw05\ndesa sadang', 'APMWGBKMQUJJJFIWLHCJ', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAsImVtYWlsIjoia2FiaWRfYXBsaWthc2lAZ21haWwuY29tIiwicm9sZSI6ImthYmlkX2FwbGlrYXNpIiwiaWF0IjoxNzIwODczMDQyLCJleHAiOjE3MjE0Nzc4NDJ9.HveeKSrPd6uP-glabDh16_DmzwjSguu_KsgFTgxROoI', 'kabid_aplikasi', 'Aktif', 'APIPMO1234567QWERTY642a37177b15822fe68222ab21e5da7d5157238734328c39e8969fe78ebb3b63', '+62895358976565', '$2b$10$7MUi07n0gPjdW6Zu9WEXquaf4osDNhX35/S3ImLXX5N88uhmx1cne', '2024-06-02 09:13:39', '2024-07-13 12:17:22'),
(61, 'SAPUTRA', 'katim_aplikasi@gmail.com', 'jalan sadang rt 02 rw05\ndesa sadang', 'APAVNSELVPWXVHGMHJSU', NULL, 'katim_aplikasi', 'Aktif', 'APIPMO1234567QWERTY292290affca260b1f31aeade5c96da97907ac9669893bfbf247dd7f17834544d', '+62895358976565', '$2b$10$uGBGgc64UwfhOA0CjRr.T.0tWnF8G6ocGEpLnfB8llVBOfm5RJ8WK', '2024-06-02 09:26:56', '2024-07-13 03:11:49'),
(62, 'IWAN', 'teknis_aplikasi@gmail.com', 'jalan sadang rt 02 rw05\ndesa sadang', 'APNANEWYCFWZSMWPGTMN', NULL, 'teknis_aplikasi', 'Aktif', 'APIPMO1234567QWERTY9e066c919a48015a0282dbdfb13aa08168aefe13e2dbaed15ff6385076d895be', '+62895358976565', '$2b$10$rymiJ/WnvADHA7s/sA.QLOjSWSFqZnf5n2lo28Rgfa9UPe730V3m2', '2024-06-02 09:27:31', '2024-07-13 03:17:54'),
(63, 'ESAONE', 'opd2@gmail.com', 'jalan sadang rt 02 rw05\ndesa sadang', 'APKEXHCXCCRPTCRWHWHP', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsImVtYWlsIjoib3BkMkBnbWFpbC5jb20iLCJyb2xlIjoicGVyYW5na2F0X2RhZXJhaCIsImlhdCI6MTcyMDg3NTAxNCwiZXhwIjoxNzIxNDc5ODE0fQ.9FV8Ra5zqquJTTnwN9Z1a_uVi1-7_1upvlrylPmKY5c', 'perangkat_daerah', 'Aktif', 'APIPMO1234567QWERTY09fe549af5a44d80d799b5a36e5cf9e853056faa9db7b3550bd7181bb5b2929c', '+62895358976565', '$2b$10$MzyOMqPt6XTj.XH60elXQOPpxbaEN.NgyaeZCU7a9zgbDmSkmgEJe', '2024-06-13 10:34:41', '2024-07-13 12:50:14'),
(64, 'ASKA', 'kabid_sektretariat@gmail.com', 'jalan sadang rt 02 rw05\ndesa sadang', 'APYEXKTKDYARCMRHIKZA', NULL, 'sekretariat', 'Aktif', 'APIPMO1234567QWERTYf5414eacb9a94f0e3098c6f068fb9392027b9e5907100ce9295fafe7a3baff75', '+62895358976565', '$2b$10$aRH194quar0WA0eKs0oDKupbLcx.5UIdCtMRkdgQfftPsdNg5VfQ.', '2024-06-14 07:44:58', '2024-06-15 04:16:54'),
(65, 'SABIL', 'katim_sektretariat@gmail.com', 'jalan sadang rt 02 rw05\r\ndesa sadang', 'APYEXKTKDYARCMRHIKZF', NULL, 'katim_sekre', 'Aktif', 'APIPMO1234567QWERTYf5414eacb9a94f0e3098c6f068fb9392027b9e5907100ce9295fafe7a3baff75', '+62895358976565', '$2b$10$aRH194quar0WA0eKs0oDKupbLcx.5UIdCtMRkdgQfftPsdNg5VfQ.', '2024-06-14 07:44:58', '2024-07-09 06:04:25'),
(66, 'AJI', 'anggota_sektretariat@gmail.com', 'jalan sadang rt 02 rw05\r\ndesa sadang', 'APYEXKTKDYARCMRHIKZ2', NULL, 'teknis_sekre', 'Aktif', 'APIPMO1234567QWERTYf5414eacb9a94f0e3098c6f068fb9392027b9e5907100ce9295fafe7a3baff75', '+62895358976565', '$2b$10$aRH194quar0WA0eKs0oDKupbLcx.5UIdCtMRkdgQfftPsdNg5VfQ.', '2024-06-14 07:44:58', '2024-07-09 06:04:37'),
(67, 'ALYA PADILA', 'katim_perencanaan@gmail.com', 'Bandung, Kota Bandung, Jawa Barat, Indonesia', 'APKLXALAHFWURXTUTMMV', NULL, 'katim_perencanaan', 'Aktif', 'APIPMO1234567QWERTYc63e7c9c4dec0c14f44e7a94e0074354d6c51468d9d8ac36c684daa3a23e988c', '+62895358976565', '$2b$10$LNWOqvT3J0LkATpQ528VIe9.NqSIy3KtCwFbe3/FAkbaIZocn93c.', '2024-06-16 02:17:22', '2024-07-13 12:14:26'),
(68, 'ASUT ', 'kabid_perencanaan@gmail.com', 'Bandung, Kota Bandung, Jawa Barat, Indonesia', 'APJVXDBWCAGHJARTIVQX', NULL, 'kabid_perencanaan', 'Aktif', 'APIPMO1234567QWERTY85308abee3d74640115d8416518cfe356e6f1e94160c0f74c67a09ba75a76be3', '+628953167324', '$2b$10$YKyfXjdmiECcuvNtk1UDT.839K1RW.mgweYGJPEIS11XXmlEGckNa', '2024-06-16 02:21:36', '2024-07-13 03:25:00'),
(69, 'SUJANA', 'kadis@gmail.com', 'Bandung, Kota Bandung, Jawa Barat, Indonesia', 'APCDZTXLESRMVQVTPGRZ', NULL, 'kadis', 'Aktif', 'APIPMO1234567QWERTYcd657e739ab02e2ca4236e2f5ee8633e4a9c0bc0946798796483a37cbe8c7272', '+6289235242423', '$2b$10$kBAkgBi6Mzp99WUxOXBuVusx/oSbBqGFWtg7LSxJRzUU9SYDxrPGW', '2024-06-16 02:27:20', '2024-07-12 13:15:54'),
(70, 'Agus', 'kabid_desiminasi@gmail.com', 'asdfafs', 'APOXBEAYYYGRMAOOWPBQ', NULL, 'kabid_desiminasi', 'Aktif', 'APIPMO1234567QWERTYfb74cf3be76151632402f7c524fab365cb4740bc02af88e8da09020e12d29b50', '+62896368976564', '$2b$10$5SxgC3fYxbEnZ8hWwZPOR.1QRbivnW8bGfk6r6ISxo1AWKxIp6j5u', '2024-07-08 03:14:50', '2024-07-08 03:14:50'),
(71, 'Fadlan', 'katim_desiminasi@gmail.com', 'asdfasd', 'APXXFRPTDXVMJMWRUSOO', NULL, 'katim_desiminasi', 'Aktif', 'APIPMO1234567QWERTY1af84b6e8af72a904486cd83199a367ba0c491b898e04c520c2dfd164a7347a5', '+62895358976665', '$2b$10$sQoqcSfbSw4IRb7ot0hnEe0p7WTLFD3Hd2mfIxTRnBm/UT/0zQg/C', '2024-07-08 03:16:06', '2024-07-09 04:12:44'),
(72, 'Ageng', 'teknis_desiminasi@gmail.com', 'erserser', 'APVOLEKGXUPHUIHTAWLJ', NULL, 'teknis_desiminasi', 'Aktif', 'APIPMO1234567QWERTY2b01965e8967e3f1f89530d484ca0088621ea08d245760c08163182757421f91', '+6289535897653', '$2b$10$8nqORHlSMb01MPl6rnCTOu.riCxAq2xL/Rh7Dj7teryZ.ERg2vsky', '2024-07-08 03:17:04', '2024-07-09 04:28:17'),
(73, 'FadlanA', 'anggota_perencanaan@gmail.com', 'ERSDF', 'APRDKKMTOCSPIEKEDLQE', NULL, 'teknis_perencanaan', 'Aktif', 'APIPMO1234567QWERTYec0c81016cec0a513c95d64805016f244ad4fa4b37fcd3d084070e2b397b4ff2', '+62895358976565', '$2b$10$z48KXjSeHPG1xQ03/514weOqVt/xQlGP70vf6HrxhL/I7otlEGM5W', '2024-07-09 06:20:51', '2024-07-13 03:25:59'),
(74, 'guest', 'guest@gmail.com', 'Kb. Lega, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat', 'APIGUESTTTTTT', NULL, 'guest', 'Aktif', '3242', '62895358976565', '$2b$10$LNWOqvT3J0LkATpQ528VIe9.NqSIy3KtCwFbe3/FAkbaIZocn93c.', '2024-05-13 10:40:15', '2024-07-13 03:36:31');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `list_aplikasi`
--
ALTER TABLE `list_aplikasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `list_infrastruktur`
--
ALTER TABLE `list_infrastruktur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `list_layanan_data`
--
ALTER TABLE `list_layanan_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `list_managementinfrastrukturtik`
--
ALTER TABLE `list_managementinfrastrukturtik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `list_perencanaantik`
--
ALTER TABLE `list_perencanaantik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `list_permohonan_si`
--
ALTER TABLE `list_permohonan_si`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `list_sekretariat`
--
ALTER TABLE `list_sekretariat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `list_sistem_virtual`
--
ALTER TABLE `list_sistem_virtual`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `list_teknologi_si`
--
ALTER TABLE `list_teknologi_si`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tools_list`
--
ALTER TABLE `tools_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

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
