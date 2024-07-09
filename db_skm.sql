-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2024 at 05:16 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_skm`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` char(36) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `password` varchar(256) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `username`, `email`, `nama`, `foto`, `password`, `created_at`, `updated_at`) VALUES
('131a85d3-9b05-485b-b0d6-621869c1e84e', 'adminSKM', 'adminSKM@gmail.com', 'admin skm biro', '', '$2b$10$RogHFcz3uf79LSIXtW4iTOLRpaRLbWmSCGHlrvxol7bbuenUbTtRy', '2024-02-13', '2024-03-19');

-- --------------------------------------------------------

--
-- Table structure for table `detail_penilaian`
--

CREATE TABLE `detail_penilaian` (
  `id_detail_penilaian` char(36) NOT NULL,
  `id_penilaian` char(36) NOT NULL,
  `id_pertanyaan` char(36) NOT NULL,
  `nilai_pertanyaan` int(1) NOT NULL,
  `NNR` decimal(10,2) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_penilaian`
--

INSERT INTO `detail_penilaian` (`id_detail_penilaian`, `id_penilaian`, `id_pertanyaan`, `nilai_pertanyaan`, `NNR`, `created_at`, `updated_at`) VALUES
('1d1bee5a-b3c8-4b26-aded-c6228af0f7ec', '363bc1ab-9ef7-4a7f-9f02-90012ff6a6aa', 'dc634bcd-e8ec-43b3-8655-e08744e2dd3f', 3, '0.33', '2024-02-19', '2024-02-19'),
('1d957676-3607-49f7-9d1e-4ac70f80accf', '2ef89e39-d7f7-4330-bfa6-5ea2a58b3031', 'dc634bcd-e8ec-43b3-8655-e08744e2dd3f', 1, '0.11', '2024-02-19', '2024-02-19'),
('27e7fc7d-1ae6-4a2a-aff5-dddb6b65e0e3', '2ef89e39-d7f7-4330-bfa6-5ea2a58b3031', '78fe6efb-d82b-4a96-ab22-a466ec99f5a0', 4, '0.44', '2024-02-19', '2024-02-19'),
('34731181-549e-4d0e-b39c-2649c7ff2862', '363bc1ab-9ef7-4a7f-9f02-90012ff6a6aa', 'd8eae20b-029d-4953-81fe-6f7de7d4c1b7', 4, '0.44', '2024-02-19', '2024-02-19'),
('363a4277-1733-48fa-b26e-153c28d892b9', '363bc1ab-9ef7-4a7f-9f02-90012ff6a6aa', '99dcce2e-d765-4557-bfd1-758e03a6d4bf', 1, '0.11', '2024-02-19', '2024-02-19'),
('497ec38d-0b13-49d3-b0e6-d6499522ae72', 'e9c647f5-24ef-4c71-b7b0-e726600fceeb', 'f63214a9-5b57-41b0-8eda-f764080003b4', 3, '0.33', '2024-06-05', '2024-06-05'),
('58b0b34e-65db-42cb-a5f2-34ec87b737aa', '2ef89e39-d7f7-4330-bfa6-5ea2a58b3031', '0bb67a45-a494-4bdb-b373-a20aace17a3a', 1, '0.11', '2024-02-19', '2024-02-19'),
('5a92d72b-c330-4587-9612-a228a211c2e8', 'e9c647f5-24ef-4c71-b7b0-e726600fceeb', 'd231f0fc-c475-4eee-9f05-cc50651ce740', 3, '0.33', '2024-06-05', '2024-06-05'),
('6230581b-8881-4424-bfa2-ff24aea3a5f3', '363bc1ab-9ef7-4a7f-9f02-90012ff6a6aa', 'f63214a9-5b57-41b0-8eda-f764080003b4', 4, '0.44', '2024-02-19', '2024-02-19'),
('70f3e6ca-30a9-4c7b-a01c-641a04b12b02', 'e9c647f5-24ef-4c71-b7b0-e726600fceeb', '0bb67a45-a494-4bdb-b373-a20aace17a3a', 3, '0.33', '2024-06-05', '2024-06-05'),
('75c62aa9-1a0b-4df4-bd5a-3827ae43baf3', '2ef89e39-d7f7-4330-bfa6-5ea2a58b3031', 'd8eae20b-029d-4953-81fe-6f7de7d4c1b7', 2, '0.22', '2024-02-19', '2024-02-19'),
('83a38b32-2d06-4424-bc7a-b2562dc0b6e9', 'e9c647f5-24ef-4c71-b7b0-e726600fceeb', '870f4060-752c-4fce-9c8d-c9f1430aad63', 3, '0.33', '2024-06-05', '2024-06-05'),
('8481e4b0-787c-4c9c-bc9f-641ace3af650', 'e9c647f5-24ef-4c71-b7b0-e726600fceeb', '99dcce2e-d765-4557-bfd1-758e03a6d4bf', 3, '0.33', '2024-06-05', '2024-06-05'),
('893a6be9-86b2-413d-b49e-ccf75f5b4bc0', '2ef89e39-d7f7-4330-bfa6-5ea2a58b3031', 'f63214a9-5b57-41b0-8eda-f764080003b4', 2, '0.22', '2024-02-19', '2024-02-19'),
('8f802848-86ae-416a-a35a-a2e7c2c80755', '363bc1ab-9ef7-4a7f-9f02-90012ff6a6aa', '870f4060-752c-4fce-9c8d-c9f1430aad63', 3, '0.33', '2024-02-19', '2024-02-19'),
('90c43f5b-2e67-4081-80e6-d923989f52a5', '363bc1ab-9ef7-4a7f-9f02-90012ff6a6aa', 'd231f0fc-c475-4eee-9f05-cc50651ce740', 1, '0.11', '2024-02-19', '2024-02-19'),
('a2162c02-eea5-48b6-b362-2ede7e90315f', '2ef89e39-d7f7-4330-bfa6-5ea2a58b3031', '95649ef6-c7ab-42d9-8ae2-e35a42039440', 4, '0.44', '2024-02-19', '2024-02-19'),
('a52e1517-e1c6-4ca9-a0f4-fe5882cf04e9', 'e9c647f5-24ef-4c71-b7b0-e726600fceeb', '95649ef6-c7ab-42d9-8ae2-e35a42039440', 3, '0.33', '2024-06-05', '2024-06-05'),
('a8138bea-b62e-42db-a213-8367592d4834', 'e9c647f5-24ef-4c71-b7b0-e726600fceeb', '78fe6efb-d82b-4a96-ab22-a466ec99f5a0', 3, '0.33', '2024-06-05', '2024-06-05'),
('b2016a38-c2a3-4e89-bcd6-fe78db918aad', '363bc1ab-9ef7-4a7f-9f02-90012ff6a6aa', '78fe6efb-d82b-4a96-ab22-a466ec99f5a0', 2, '0.22', '2024-02-19', '2024-02-19'),
('c44e047c-dabe-4ef6-abcb-b8e21d7fb702', '2ef89e39-d7f7-4330-bfa6-5ea2a58b3031', '99dcce2e-d765-4557-bfd1-758e03a6d4bf', 3, '0.33', '2024-02-19', '2024-02-19'),
('d049d519-8e2c-4864-9461-b3e26cdef820', 'e9c647f5-24ef-4c71-b7b0-e726600fceeb', 'd8eae20b-029d-4953-81fe-6f7de7d4c1b7', 3, '0.33', '2024-06-05', '2024-06-05'),
('d2ae942c-fd8d-4f7c-b90d-f6c979b81514', '2ef89e39-d7f7-4330-bfa6-5ea2a58b3031', '870f4060-752c-4fce-9c8d-c9f1430aad63', 1, '0.11', '2024-02-19', '2024-02-19'),
('dbd833fd-71cd-4426-8669-a07d4bcd8a4d', '363bc1ab-9ef7-4a7f-9f02-90012ff6a6aa', '95649ef6-c7ab-42d9-8ae2-e35a42039440', 2, '0.22', '2024-02-19', '2024-02-19'),
('fc3218d7-a084-424f-8bb8-e80f6d2a254f', '2ef89e39-d7f7-4330-bfa6-5ea2a58b3031', 'd231f0fc-c475-4eee-9f05-cc50651ce740', 3, '0.33', '2024-02-19', '2024-02-19'),
('fe27898d-4354-493e-8b44-398bfd1665df', 'e9c647f5-24ef-4c71-b7b0-e726600fceeb', 'dc634bcd-e8ec-43b3-8655-e08744e2dd3f', 3, '0.33', '2024-06-05', '2024-06-05'),
('ff461697-af7a-4ed7-910b-e19c2664e2b5', '363bc1ab-9ef7-4a7f-9f02-90012ff6a6aa', '0bb67a45-a494-4bdb-b373-a20aace17a3a', 3, '0.33', '2024-02-19', '2024-02-19');

-- --------------------------------------------------------

--
-- Table structure for table `detail_pertanyaan`
--

CREATE TABLE `detail_pertanyaan` (
  `id_detail_pertanyaan` char(36) NOT NULL,
  `id_pertanyaan` char(36) NOT NULL,
  `pilihan_kriteria` varchar(100) NOT NULL,
  `nilai_pilihan` int(1) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_pertanyaan`
--

INSERT INTO `detail_pertanyaan` (`id_detail_pertanyaan`, `id_pertanyaan`, `pilihan_kriteria`, `nilai_pilihan`, `created_at`, `updated_at`) VALUES
('0822a09b-a748-4966-8a96-2c842299d470', '0bb67a45-a494-4bdb-b373-a20aace17a3a', 'Sangat Sopan dan Sangat Ramah', 4, '2024-02-16', '2024-02-16'),
('0c58a534-98e2-4c45-b758-11ea2095e14b', 'd8eae20b-029d-4953-81fe-6f7de7d4c1b7', 'Tidak Ada', 1, '2024-02-16', '2024-02-16'),
('14c7fa6a-4522-40be-9fa4-f78bb389fe4c', 'f63214a9-5b57-41b0-8eda-f764080003b4', 'Gratis', 4, '2024-02-16', '2024-02-16'),
('19e22a63-db1b-4df9-a31b-4c53e26c651f', '0bb67a45-a494-4bdb-b373-a20aace17a3a', 'Sopan dan Ramah', 3, '2024-02-16', '2024-02-16'),
('1f500ba4-67d0-4251-b934-2f1803bc7c23', '870f4060-752c-4fce-9c8d-c9f1430aad63', 'Buruk', 1, '2024-02-16', '2024-02-16'),
('4a54fdb8-affd-40b7-8cdf-31585087d0b4', 'd231f0fc-c475-4eee-9f05-cc50651ce740', 'Tidak Kompeten', 1, '2024-02-16', '2024-02-16'),
('4f9692cb-3475-4af4-96da-fc5cb3d274c7', '0bb67a45-a494-4bdb-b373-a20aace17a3a', 'Tidak Sopan dan Tidak Ramah', 1, '2024-02-16', '2024-02-16'),
('4fad57c8-ca72-47e8-a24c-1fc9e6c89ed7', 'f63214a9-5b57-41b0-8eda-f764080003b4', 'Murah', 3, '2024-02-16', '2024-02-16'),
('517c6eeb-f8ed-4e23-af28-29f2ff611f7e', '870f4060-752c-4fce-9c8d-c9f1430aad63', 'Sangat Baik', 4, '2024-02-16', '2024-02-16'),
('5351d356-8165-48b0-bb33-fb934e4a430e', 'd231f0fc-c475-4eee-9f05-cc50651ce740', 'Kurang Kompeten', 2, '2024-02-16', '2024-02-16'),
('57ed5f93-6a79-4223-8c3e-033e49848dcc', '78fe6efb-d82b-4a96-ab22-a466ec99f5a0', 'Tidak Sesuai', 1, '2024-02-16', '2024-02-16'),
('6e78b017-22a5-4e98-bd95-a5e572b38b72', '99dcce2e-d765-4557-bfd1-758e03a6d4bf', 'Sangat Cepat', 4, '2024-02-16', '2024-02-16'),
('6f696945-df2f-4e9c-a0eb-6688f904f9e4', '99dcce2e-d765-4557-bfd1-758e03a6d4bf', 'Cepat', 3, '2024-02-16', '2024-02-16'),
('72253321-53cd-4c52-b743-56228e10a7eb', '95649ef6-c7ab-42d9-8ae2-e35a42039440', 'Sangat Sesuai', 4, '2024-02-16', '2024-02-16'),
('79b5f211-3343-4140-86b0-4d5b5c3ddff1', 'dc634bcd-e8ec-43b3-8655-e08744e2dd3f', 'Kurang Mudah', 2, '2024-02-16', '2024-02-16'),
('814f9474-258f-4e9b-aafe-98dd93ef5e02', 'dc634bcd-e8ec-43b3-8655-e08744e2dd3f', 'Sangat Mudah', 4, '2024-02-16', '2024-02-16'),
('8243632e-52c8-4316-86d3-f7e4d30bc24c', 'dc634bcd-e8ec-43b3-8655-e08744e2dd3f', 'Tidak Mudah', 1, '2024-02-16', '2024-02-16'),
('90b4c3b7-d771-49ee-8271-7b6c2182ff84', 'dc634bcd-e8ec-43b3-8655-e08744e2dd3f', 'Mudah ', 3, '2024-02-16', '2024-02-16'),
('9ac5162c-6aba-49de-9721-188421f3d046', '99dcce2e-d765-4557-bfd1-758e03a6d4bf', 'Kurang Cepat', 2, '2024-02-16', '2024-02-16'),
('9f109bd4-1945-4512-b7ca-4fe21619e422', 'd231f0fc-c475-4eee-9f05-cc50651ce740', 'Kompeten', 3, '2024-02-16', '2024-02-16'),
('a714203d-62bf-46a4-8d35-6906a039012a', 'f63214a9-5b57-41b0-8eda-f764080003b4', 'Cukup Mahal', 2, '2024-02-16', '2024-02-16'),
('a8ccb8dd-0c80-4384-a6d3-34f37b7b3445', '0bb67a45-a494-4bdb-b373-a20aace17a3a', 'Kurang Sopan dan Kurang Ramah', 2, '2024-02-16', '2024-02-16'),
('abe62aa8-5dc9-4379-a098-4af8aa048752', '78fe6efb-d82b-4a96-ab22-a466ec99f5a0', 'Sesuai', 3, '2024-02-16', '2024-02-16'),
('ae593843-a714-4e37-9bd5-1ad9d0f41e49', '78fe6efb-d82b-4a96-ab22-a466ec99f5a0', 'Sangat Sesuai', 4, '2024-02-16', '2024-02-16'),
('ae96f687-3b00-49b2-aa91-e68a2e93fa11', 'd8eae20b-029d-4953-81fe-6f7de7d4c1b7', 'Diterapkan Sepenuhnya', 4, '2024-02-16', '2024-02-16'),
('b30455f0-57ac-45db-b970-b18ad457a421', '95649ef6-c7ab-42d9-8ae2-e35a42039440', 'Tidak Sesuai', 1, '2024-02-16', '2024-02-16'),
('b30b63b5-e94f-43ec-b059-57e1f3e9b632', 'd8eae20b-029d-4953-81fe-6f7de7d4c1b7', 'Diterapkan Tetapi Kurang Maksimal', 3, '2024-02-16', '2024-02-16'),
('b94ab939-c3ad-4735-9100-b390f9bc0a89', '95649ef6-c7ab-42d9-8ae2-e35a42039440', 'Kurang Sesuai', 2, '2024-02-16', '2024-02-16'),
('bfbeb387-12f7-45db-aacf-d27f15cd5f2b', 'f63214a9-5b57-41b0-8eda-f764080003b4', 'Sangat Mahal', 1, '2024-02-16', '2024-02-16'),
('c8245932-65ad-412d-9724-6250f0b9cd8e', 'd8eae20b-029d-4953-81fe-6f7de7d4c1b7', 'Ada Tetapi Tidak Diterapkan', 2, '2024-02-16', '2024-02-16'),
('cd79a0d1-aaf0-4949-9029-26e874968b78', '870f4060-752c-4fce-9c8d-c9f1430aad63', 'Baik', 3, '2024-02-16', '2024-02-16'),
('cff9187c-328b-402f-91f4-e3a97e0b8962', '95649ef6-c7ab-42d9-8ae2-e35a42039440', 'Sesuai', 3, '2024-02-16', '2024-02-16'),
('dbf9fef5-064b-41f2-8286-2dbd7b7c4790', 'd231f0fc-c475-4eee-9f05-cc50651ce740', 'Sangat Kompeten', 4, '2024-02-16', '2024-02-16'),
('e6781d0d-5b24-4647-af1e-b7003bf99acd', '78fe6efb-d82b-4a96-ab22-a466ec99f5a0', 'Kurang Sesuai', 2, '2024-02-16', '2024-02-16'),
('f56f24e3-11df-4e2a-aa83-81274009eab1', '99dcce2e-d765-4557-bfd1-758e03a6d4bf', 'Tidak Cepat', 1, '2024-02-16', '2024-02-16'),
('f65a263c-ecde-4571-8ea1-10a20663bea1', '870f4060-752c-4fce-9c8d-c9f1430aad63', 'Cukup ', 2, '2024-02-16', '2024-02-16');

-- --------------------------------------------------------

--
-- Table structure for table `hasil_survey`
--

CREATE TABLE `hasil_survey` (
  `id_hasil_survey` char(36) NOT NULL,
  `id_admin` char(36) NOT NULL,
  `nilai_akhir_survey` decimal(10,2) NOT NULL,
  `periode_awal` date NOT NULL,
  `periode_akhir` date NOT NULL,
  `file_skm` varchar(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hasil_survey`
--

INSERT INTO `hasil_survey` (`id_hasil_survey`, `id_admin`, `nilai_akhir_survey`, `periode_awal`, `periode_akhir`, `file_skm`, `created_at`, `updated_at`) VALUES
('cf2a5daa-90b3-4cad-9760-82d1a7b31bf9', '131a85d3-9b05-485b-b0d6-621869c1e84e', '60.50', '2023-01-01', '2024-02-19', 'SKKM_2023-01-01_2024-02-19_3.docx', '2024-02-19', '2024-02-21');

-- --------------------------------------------------------

--
-- Table structure for table `penilaian`
--

CREATE TABLE `penilaian` (
  `id_penilaian` char(36) NOT NULL,
  `id_responden` char(36) NOT NULL,
  `hasil_akhir` decimal(10,2) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penilaian`
--

INSERT INTO `penilaian` (`id_penilaian`, `id_responden`, `hasil_akhir`, `created_at`, `updated_at`) VALUES
('2ef89e39-d7f7-4330-bfa6-5ea2a58b3031', '1e3ab457-f4d9-42ec-bc3b-bcfa6546b8ca', '57.75', '2024-02-19', '2024-02-19'),
('363bc1ab-9ef7-4a7f-9f02-90012ff6a6aa', '37ff4c3b-9a49-4cb9-abff-32666c8c0cd2', '63.25', '2024-02-19', '2024-02-19'),
('e9c647f5-24ef-4c71-b7b0-e726600fceeb', 'f71fc894-3b1e-41fd-9726-ca9bd896159b', '74.25', '2024-06-05', '2024-06-05');

-- --------------------------------------------------------

--
-- Table structure for table `pertanyaan`
--

CREATE TABLE `pertanyaan` (
  `id_pertanyaan` char(36) NOT NULL,
  `teks_pertanyaan` longtext NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pertanyaan`
--

INSERT INTO `pertanyaan` (`id_pertanyaan`, `teks_pertanyaan`, `created_at`, `updated_at`) VALUES
('0bb67a45-a494-4bdb-b373-a20aace17a3a', 'Bagaimana pendapat saudara perilaku petugas dalam pelayanan terkait kesopanan dan keramahan?', '2024-02-13', '2024-02-13'),
('78fe6efb-d82b-4a96-ab22-a466ec99f5a0', 'Bagaimana Pendapat Saudara Tentang Kesesuain Persyaratan Pelayanan Dengan  Jenis Pelayanan Kami?', '2024-02-13', '2024-02-13'),
('870f4060-752c-4fce-9c8d-c9f1430aad63', 'Bagaimana pendapat saudara tentang kualitas sarana dan prasanan?', '2024-02-13', '2024-02-13'),
('95649ef6-c7ab-42d9-8ae2-e35a42039440', 'Bagaimana pendapat saudara tentang kesesuaian produk layanan antara yang tercamtum dalam standar pelayanan dengan hasil yang diberikan?', '2024-02-13', '2024-02-13'),
('99dcce2e-d765-4557-bfd1-758e03a6d4bf', 'Bagaimana Pendapat Saudara Tentang Waktu Dalam Memberikan Layanan?', '2024-02-13', '2024-02-13'),
('d231f0fc-c475-4eee-9f05-cc50651ce740', 'Bagaimana pendapat saudara tentang kompetensi/kemampuan petugas dalam pelayanan?', '2024-02-13', '2024-02-13'),
('d8eae20b-029d-4953-81fe-6f7de7d4c1b7', 'Bagaimana pendapat saudara tentang penanganan pengaduan pengguna layanan?', '2024-02-13', '2024-02-13'),
('dc634bcd-e8ec-43b3-8655-e08744e2dd3f', 'Bagaimana Pemahaman Saudara Tentang Kemudahan Prosedur Pelayanan di Dinas Pendidikan dan Kebudayaan?', '2024-02-13', '2024-02-13'),
('f63214a9-5b57-41b0-8eda-f764080003b4', 'Bagaimana pendapat saudara tentang kewajaran biaya/tarif dalam pelayanan?', '2024-02-13', '2024-02-13');

-- --------------------------------------------------------

--
-- Table structure for table `responden`
--

CREATE TABLE `responden` (
  `id_responden` char(36) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `jenis_kelamin` varchar(20) NOT NULL,
  `usia` varchar(50) NOT NULL,
  `pekerjaan` varchar(50) NOT NULL,
  `jenjang_pendidikan` varchar(30) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `responden`
--

INSERT INTO `responden` (`id_responden`, `nama`, `email`, `jenis_kelamin`, `usia`, `pekerjaan`, `jenjang_pendidikan`, `created_at`, `updated_at`) VALUES
('1e3ab457-f4d9-42ec-bc3b-bcfa6546b8ca', 'dewi', 'dewi@gmail.com', 'Perempuan', '51 s.d 60', 'Lainnya', 'S2 Keatas', '2024-02-19', '2024-02-19'),
('37ff4c3b-9a49-4cb9-abff-32666c8c0cd2', 'faisal', 'faisal@gmail.com', 'Laki - laki', '51 s.d 60', 'Lainnya', 'S2 Keatas', '2024-02-19', '2024-02-19'),
('f71fc894-3b1e-41fd-9726-ca9bd896159b', 'nadini annisa b', 'nadiniannisabyant26@gmail.com', 'Perempuan', '15 s.d 25', 'PNS/POLRI/TNI/PPPK', 'SLTA', '2024-06-05', '2024-06-05');

-- --------------------------------------------------------

--
-- Table structure for table `saran`
--

CREATE TABLE `saran` (
  `id_saran` char(36) NOT NULL,
  `id_responden` char(36) NOT NULL,
  `saran_teks` longtext NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saran`
--

INSERT INTO `saran` (`id_saran`, `id_responden`, `saran_teks`, `created_at`, `updated_at`) VALUES
('d8775475-0ea8-432d-9598-f6cdc9d73697', '37ff4c3b-9a49-4cb9-abff-32666c8c0cd2', 'bagus banget pelayanannya', '2024-02-19', '2024-02-19'),
('fecaf1c9-8f35-47fa-8102-b504a6786cf4', '1e3ab457-f4d9-42ec-bc3b-bcfa6546b8ca', 'bagus banget pelayanannya', '2024-02-19', '2024-02-19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `detail_penilaian`
--
ALTER TABLE `detail_penilaian`
  ADD PRIMARY KEY (`id_detail_penilaian`),
  ADD KEY `id_penilaian` (`id_penilaian`),
  ADD KEY `id_pertanyaan` (`id_pertanyaan`);

--
-- Indexes for table `detail_pertanyaan`
--
ALTER TABLE `detail_pertanyaan`
  ADD PRIMARY KEY (`id_detail_pertanyaan`),
  ADD KEY `id_pertanyaan` (`id_pertanyaan`);

--
-- Indexes for table `hasil_survey`
--
ALTER TABLE `hasil_survey`
  ADD PRIMARY KEY (`id_hasil_survey`),
  ADD KEY `id_admin` (`id_admin`);

--
-- Indexes for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD PRIMARY KEY (`id_penilaian`),
  ADD KEY `id_responden` (`id_responden`);

--
-- Indexes for table `pertanyaan`
--
ALTER TABLE `pertanyaan`
  ADD PRIMARY KEY (`id_pertanyaan`);

--
-- Indexes for table `responden`
--
ALTER TABLE `responden`
  ADD PRIMARY KEY (`id_responden`);

--
-- Indexes for table `saran`
--
ALTER TABLE `saran`
  ADD PRIMARY KEY (`id_saran`),
  ADD KEY `id_responden` (`id_responden`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_penilaian`
--
ALTER TABLE `detail_penilaian`
  ADD CONSTRAINT `detail_penilaian_ibfk_1` FOREIGN KEY (`id_penilaian`) REFERENCES `penilaian` (`id_penilaian`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_penilaian_ibfk_2` FOREIGN KEY (`id_pertanyaan`) REFERENCES `pertanyaan` (`id_pertanyaan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_pertanyaan`
--
ALTER TABLE `detail_pertanyaan`
  ADD CONSTRAINT `detail_pertanyaan_ibfk_1` FOREIGN KEY (`id_pertanyaan`) REFERENCES `pertanyaan` (`id_pertanyaan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hasil_survey`
--
ALTER TABLE `hasil_survey`
  ADD CONSTRAINT `hasil_survey_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD CONSTRAINT `penilaian_ibfk_1` FOREIGN KEY (`id_responden`) REFERENCES `responden` (`id_responden`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `saran`
--
ALTER TABLE `saran`
  ADD CONSTRAINT `saran_ibfk_1` FOREIGN KEY (`id_responden`) REFERENCES `responden` (`id_responden`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
