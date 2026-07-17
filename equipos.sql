-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17-Jul-2026 às 12:02
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `equipos`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin_logs`
--

CREATE TABLE `admin_logs` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `detalhes` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `admin_logs`
--

INSERT INTO `admin_logs` (`id`, `tipo`, `username`, `ip`, `detalhes`, `criado_em`) VALUES
(1, 'login_falhou', 'admin', '79.112.35.145', 'Credenciais inválidas', '2026-06-29 09:12:15'),
(2, 'login_falhou', 'admin', '79.112.35.145', 'Credenciais inválidas', '2026-06-29 09:12:21'),
(3, 'login_falhou', 'admin', '79.112.35.145', 'Credenciais inválidas', '2026-06-29 09:12:42'),
(4, 'login_falhou', 'admin', '79.112.35.145', 'Credenciais inválidas', '2026-06-29 09:13:50'),
(5, 'login_falhou', 'admin', '79.112.35.145', 'Credenciais inválidas', '2026-06-29 09:16:32'),
(6, 'login_falhou', 'admin', '79.112.35.145', 'Credenciais inválidas', '2026-06-29 09:16:49'),
(7, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-29 09:17:00'),
(8, 'registro', 'testeFe', '79.112.35.145', 'Novo utilizador registado', '2026-06-29 09:29:54'),
(9, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-29 09:55:05'),
(10, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-29 09:55:19'),
(11, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-29 10:33:24'),
(12, 'login', 'testeFe', '79.112.35.145', 'Login bem-sucedido', '2026-06-29 10:34:13'),
(13, 'login_falhou', 'admin', '79.112.35.145', 'Credenciais inválidas', '2026-06-29 10:34:23'),
(14, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-29 10:34:35'),
(15, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-29 10:49:09'),
(16, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-29 10:53:22'),
(17, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-29 10:59:01'),
(18, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 07:01:09'),
(19, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 07:05:46'),
(20, 'login_falhou', 'admin', '79.112.35.145', 'Credenciais inválidas', '2026-06-30 07:09:55'),
(21, 'login_falhou', 'admin', '79.112.35.145', 'Credenciais inválidas', '2026-06-30 07:10:05'),
(22, 'login_falhou', 'admin', '79.112.35.145', 'Credenciais inválidas', '2026-06-30 07:12:11'),
(23, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 07:13:39'),
(24, 'registro', 'fadfasd', '79.112.35.145', 'Novo utilizador registado', '2026-06-30 08:41:03'),
(25, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 08:41:14'),
(26, 'login', 'admin', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 08:42:40'),
(27, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 08:45:48'),
(28, 'login_falhou', 'teste', '79.112.35.145', 'Credenciais inválidas', '2026-06-30 09:02:38'),
(29, 'login', 'admin', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 09:03:05'),
(30, 'registro', 'Pedroloto', '79.112.35.145', 'Novo utilizador registado', '2026-06-30 09:22:08'),
(31, 'login', 'Pedroloto', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 09:22:19'),
(32, 'login', 'admin', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 09:26:02'),
(33, 'login', 'teste', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 09:34:15'),
(34, 'login', 'admin', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 09:34:50'),
(35, 'login', 'admin', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 09:35:59'),
(36, 'login', 'testeFe', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 09:38:18'),
(37, 'login', 'admin', '79.112.35.145', 'Login bem-sucedido', '2026-06-30 09:43:10'),
(38, 'login', 'admin', '79.117.50.142', 'Login bem-sucedido', '2026-07-02 07:12:10'),
(39, 'login', 'teste', '2a0c:5a81:7d83:3f00:205a:4b20:12c5:b69a', 'Login bem-sucedido', '2026-07-02 07:15:09'),
(40, 'login', 'teste', '2a0c:5a81:7d83:3f00:d179:dd37:864f:93ae', 'Login bem-sucedido', '2026-07-02 07:26:09'),
(41, 'login', 'teste', '2a0c:5a81:7d83:3f00:205a:4b20:12c5:b69a', 'Login bem-sucedido', '2026-07-02 08:13:47'),
(42, 'login', 'testeFe', '79.117.50.142', 'Login bem-sucedido', '2026-07-02 08:25:33'),
(43, 'login', 'teste', '79.117.50.142', 'Login bem-sucedido', '2026-07-02 08:53:36'),
(44, 'login', 'teste', '2a0c:5a81:7d83:3f00:d179:dd37:864f:93ae', 'Login bem-sucedido', '2026-07-02 10:59:55'),
(45, 'login', 'admin', '2a0c:5a81:7d83:3f00:d179:dd37:864f:93ae', 'Login bem-sucedido', '2026-07-02 11:00:45'),
(46, 'login', 'teste', '2a0c:5a81:7d83:3f00:205a:4b20:12c5:b69a', 'Login bem-sucedido', '2026-07-02 11:07:10'),
(47, 'login', 'admin', '2a0c:5a81:7d83:3f00:d179:dd37:864f:93ae', 'Login bem-sucedido', '2026-07-02 11:09:54'),
(48, 'login_falhou', 'admin', '79.117.50.142', 'Credenciais inválidas', '2026-07-03 07:18:04'),
(49, 'login', 'teste', '79.117.50.142', 'Login bem-sucedido', '2026-07-03 07:18:26'),
(50, 'login', 'teste', '2a0c:5a81:7d83:3f00:f5dd:3761:31b8:3a9', 'Login bem-sucedido', '2026-07-03 07:19:00'),
(51, 'login', 'testeFe', '2a0c:5a81:7d83:3f00:f5dd:3761:31b8:3a9', 'Login bem-sucedido', '2026-07-03 07:19:22'),
(52, 'registro', 'mobile', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Novo utilizador registado', '2026-07-03 07:28:56'),
(53, 'login', 'mobile', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 07:29:03'),
(54, 'login', 'teste', '2a0c:5a81:7d83:3f00:e5fa:211a:416c:d8c2', 'Login bem-sucedido', '2026-07-03 07:50:14'),
(55, 'login', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 07:50:26'),
(56, 'login', 'teste', '2a0c:5a81:7d83:3f00:f5dd:3761:31b8:3a9', 'Login bem-sucedido', '2026-07-03 08:17:01'),
(57, 'login', 'teste', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 08:24:14'),
(58, 'login', 'teste', '2a0c:5a81:7d83:3f00:f5dd:3761:31b8:3a9', 'Login bem-sucedido', '2026-07-03 08:35:48'),
(59, 'login', 'teste', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 08:45:45'),
(60, 'login', 'teste', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 08:52:14'),
(61, 'login', 'teste', '2a0c:5a81:7d83:3f00:e5fa:211a:416c:d8c2', 'Login bem-sucedido', '2026-07-03 09:04:48'),
(62, 'login', 'teste', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 09:04:50'),
(63, 'login', 'teste', '2a0c:5a81:7d83:3f00:e5fa:211a:416c:d8c2', 'Login bem-sucedido', '2026-07-03 09:05:31'),
(64, 'login', 'teste', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 09:05:50'),
(65, 'login', 'testeFe', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 09:06:43'),
(66, 'login_falhou', 'testeFe', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Credenciais inválidas', '2026-07-03 09:09:07'),
(67, 'login', 'testeFe', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 09:09:11'),
(68, 'login', 'teste', '2a0c:5a81:7d83:3f00:e5fa:211a:416c:d8c2', 'Login bem-sucedido', '2026-07-03 09:12:27'),
(69, 'login', 'teste', '2a0c:5a81:7d83:3f00:e5fa:211a:416c:d8c2', 'Login bem-sucedido', '2026-07-03 09:16:48'),
(70, 'login', 'teste', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 09:17:32'),
(71, 'login', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 09:18:17'),
(72, 'login', 'teste', '2a0c:5a81:7d83:3f00:e5fa:211a:416c:d8c2', 'Login bem-sucedido', '2026-07-03 09:18:27'),
(73, 'login', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 09:22:11'),
(74, 'login', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 09:24:31'),
(75, 'login', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 09:27:26'),
(76, 'login', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 09:47:38'),
(77, 'login_falhou', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Credenciais inválidas', '2026-07-03 10:13:35'),
(78, 'login_falhou', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Credenciais inválidas', '2026-07-03 10:13:39'),
(79, 'login', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 10:13:52'),
(80, 'login', 'teste', '2a0c:5a81:7d83:3f00:e5fa:211a:416c:d8c2', 'Login bem-sucedido', '2026-07-03 10:18:03'),
(81, 'login', 'teste', '2a0c:5a81:7d83:3f00:e5fa:211a:416c:d8c2', 'Login bem-sucedido', '2026-07-03 10:18:20'),
(82, 'login', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 10:18:31'),
(83, 'login', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 10:18:42'),
(84, 'login', 'teste', '2a0c:5a81:7d83:3f00:24ee:1a32:3e12:8267', 'Login bem-sucedido', '2026-07-03 10:28:59'),
(85, 'login', 'teste', '2a0c:5a81:7d83:3f00:24ee:1a32:3e12:8267', 'Login bem-sucedido', '2026-07-03 11:04:10'),
(86, 'login', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 11:12:44'),
(87, 'login', 'admin', '2a0c:5a81:7d83:3f00:a83b:9a6a:a4e:3254', 'Login bem-sucedido', '2026-07-03 11:26:45'),
(88, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 07:51:41'),
(89, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 07:55:40'),
(90, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 08:26:57'),
(91, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 08:30:19'),
(92, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 08:31:37'),
(93, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 08:49:26'),
(94, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 08:50:19'),
(95, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 09:29:41'),
(96, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 09:32:16'),
(97, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 09:53:27'),
(98, 'login_falhou', 'admin', '188.140.26.231', 'Credenciais inválidas', '2026-07-08 10:28:12'),
(99, 'login', 'admin', '188.140.26.231', 'Login bem-sucedido', '2026-07-08 10:28:22'),
(100, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 10:30:11'),
(101, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 10:35:29'),
(102, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 10:41:17'),
(103, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 11:01:54'),
(104, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 11:15:41'),
(105, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 11:19:31'),
(106, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 11:22:25'),
(107, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-08 11:39:10'),
(108, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 07:03:50'),
(109, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 07:05:31'),
(110, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 07:25:10'),
(111, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 08:17:27'),
(112, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 09:00:31'),
(113, 'login_falhou', 'admin', '79.116.208.194', 'Credenciais inválidas', '2026-07-10 09:12:11'),
(114, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 09:12:41'),
(115, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 09:25:35'),
(116, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 10:07:00'),
(117, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 10:18:30'),
(118, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 10:20:39'),
(119, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 10:35:53'),
(120, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 10:45:36'),
(121, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 10:45:55'),
(122, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 10:52:08'),
(123, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:08:26'),
(124, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:08:36'),
(125, 'login', 'testeFe', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:08:46'),
(126, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:08:55'),
(127, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:09:12'),
(128, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:09:27'),
(129, 'registro', 'bigboss', '79.116.208.194', 'Novo utilizador registado', '2026-07-10 11:09:47'),
(130, 'login', 'bigboss', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:09:54'),
(131, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:11:19'),
(132, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:14:57'),
(133, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:15:12'),
(134, 'login_falhou', 'teste', '79.116.208.194', 'Credenciais inválidas', '2026-07-10 11:15:34'),
(135, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:15:41'),
(136, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:17:04'),
(137, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:19:22'),
(138, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:20:36'),
(139, 'login', 'testeFe', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:21:56'),
(140, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:33:14'),
(141, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:34:57'),
(142, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:51:20'),
(143, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-10 11:57:14'),
(144, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 07:52:49'),
(145, 'login', 'testeFe', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 08:18:57'),
(146, 'login_falhou', 'admin', '79.116.208.194', 'Credenciais inválidas', '2026-07-13 08:22:43'),
(147, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 08:23:01'),
(148, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 08:23:29'),
(149, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 09:32:39'),
(150, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 09:34:03'),
(151, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 09:54:06'),
(152, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 10:56:28'),
(153, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 10:56:44'),
(154, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 11:03:05'),
(155, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 11:08:10'),
(156, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 11:09:03'),
(157, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-13 11:47:14'),
(158, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 07:39:01'),
(159, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 07:51:05'),
(160, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 07:51:25'),
(161, 'login_falhou', 'admin', '79.116.208.194', 'Credenciais inválidas', '2026-07-14 08:30:31'),
(162, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 08:30:39'),
(163, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 08:37:44'),
(164, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 09:22:59'),
(165, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 10:13:46'),
(166, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 10:29:15'),
(167, 'login', 'testeFe', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 10:30:17'),
(168, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 10:30:42'),
(169, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 10:37:43'),
(170, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 10:39:42'),
(171, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 11:03:31'),
(172, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 11:03:46'),
(173, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 11:14:36'),
(174, 'login', 'testeFe', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 11:24:22'),
(175, 'login_falhou', 'admin', '79.116.208.194', 'Credenciais inválidas', '2026-07-14 11:24:45'),
(176, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 11:24:53'),
(177, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 11:26:21'),
(178, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-14 11:27:45'),
(179, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 07:58:25'),
(180, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 08:34:10'),
(181, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 08:34:49'),
(182, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 08:36:13'),
(183, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 08:36:45'),
(184, 'login_falhou', 'testeFe', '79.116.208.194', 'Credenciais inválidas', '2026-07-15 08:38:03'),
(185, 'login_falhou', 'testeFe', '79.116.208.194', 'Credenciais inválidas', '2026-07-15 08:38:06'),
(186, 'login_falhou', 'testeFe', '79.116.208.194', 'Credenciais inválidas', '2026-07-15 08:38:11'),
(187, 'login', 'testeFe', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 08:38:19'),
(188, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 08:47:19'),
(189, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 08:56:40'),
(190, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 09:00:16'),
(191, 'login', 'testeFe', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 09:00:40'),
(192, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 09:03:01'),
(193, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 09:03:34'),
(194, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 09:12:26'),
(195, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 09:49:08'),
(196, 'login', 'testeFe', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 09:49:38'),
(197, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 09:50:20'),
(198, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 10:08:38'),
(199, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 10:47:43'),
(200, 'registro', 'Saullo', '79.116.208.194', 'Novo utilizador registado', '2026-07-15 10:52:05'),
(201, 'login', 'Saullo', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 10:52:16'),
(202, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-15 11:05:06'),
(203, 'login', 'admin', '90.163.74.198', 'Login bem-sucedido', '2026-07-16 10:08:52'),
(204, 'login', 'admin', '90.163.74.198', 'Login bem-sucedido', '2026-07-16 10:10:35'),
(205, 'login', 'teste', '90.163.74.198', 'Login bem-sucedido', '2026-07-16 10:11:01'),
(206, 'login', 'teste', '90.163.74.198', 'Login bem-sucedido', '2026-07-16 10:32:01'),
(207, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 07:24:04'),
(208, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 07:24:30'),
(209, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 07:44:36'),
(210, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 07:44:52'),
(211, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 08:50:29'),
(212, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 08:51:06'),
(213, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 08:52:24'),
(214, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 08:52:27'),
(215, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 08:52:50'),
(216, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 08:53:57'),
(217, 'login', 'testeFe', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 08:56:10'),
(218, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 08:57:06'),
(219, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 08:58:52'),
(220, 'login', 'testeFe', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 08:59:17'),
(221, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 09:00:15'),
(222, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 09:00:56'),
(223, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 09:02:18'),
(224, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 09:02:47'),
(225, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 09:04:07'),
(226, 'login', 'admin', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 09:05:30'),
(227, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 09:18:10'),
(228, 'login', 'teste', '79.116.208.194', 'Login bem-sucedido', '2026-07-17 09:22:34');

-- --------------------------------------------------------

--
-- Estrutura da tabela `deportes`
--

CREATE TABLE `deportes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `num_jugadores` int(11) NOT NULL DEFAULT 7
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `deportes`
--

INSERT INTO `deportes` (`id`, `nombre`, `num_jugadores`) VALUES
(1, 'Fútbol 7', 7),
(2, 'Basquete', 15),
(6, 'Futsal', 5),
(7, 'Fútbol 11', 11),
(11, 'Andebol', 7),
(12, 'Rugby', 15);

-- --------------------------------------------------------

--
-- Estrutura da tabela `jugadores`
--

CREATE TABLE `jugadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `mail` varchar(150) DEFAULT NULL,
  `posicion` varchar(50) DEFAULT NULL,
  `deporte_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `nivel` enum('Medio','Bueno','Muy Bueno') NOT NULL DEFAULT 'Medio'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `jugadores`
--

INSERT INTO `jugadores` (`id`, `nombre`, `telefono`, `mail`, `posicion`, `deporte_id`, `usuario_id`, `nivel`) VALUES
(24, 'Bruno Teixeira', '+34600333001', 'bruno.teixeira@test.com', 'Base', 2, 2, 'Muy Bueno'),
(25, 'Filipe Correia', '+34600333002', 'filipe.correia@test.com', 'Base', 2, 2, 'Medio'),
(26, 'André Neves', '+34600333003', 'andre.neves@test.com', 'Escolta', 2, 2, 'Bueno'),
(27, 'Ricardo Melo', '+34600333004', 'ricardo.melo@test.com', 'Escolta', 2, 2, 'Bueno'),
(28, 'João Batista', '+34600333005', 'joao.batista@test.com', 'Alero', 2, 2, 'Muy Bueno'),
(29, 'Pedro Amaral', '+34600333006', 'pedro.amaral@test.com', 'Alero', 2, 2, 'Medio'),
(30, 'Vítor Gaspar', '+34600333007', 'vitor.gaspar@test.com', 'Ala-Pívot', 2, 2, 'Bueno'),
(31, 'Sérgio Leal', '+34600333008', 'sergio.leal@test.com', 'Ala-Pívot', 2, 2, 'Muy Bueno'),
(32, 'Nelson Barros', '+34600333009', 'nelson.barros@test.com', 'Pívot', 2, 2, 'Bueno'),
(33, 'Óscar Cabral', '+34600333010', 'oscar.cabral@test.com', 'Pívot', 2, 2, 'Medio'),
(34, 'Marco Silva', '+34600111001', 'marco.silva@test.com', 'Portero', 7, 2, 'Bueno'),
(35, 'Diego Herrera', '+34600111002', 'diego.herrera@test.com', 'Portero', 7, 2, 'Medio'),
(36, 'Luis Ramírez', '+34600111003', 'luis.ramirez@test.com', 'Lateral Derecho', 7, 2, 'Bueno'),
(37, 'Iker Fernández', '+34600111004', 'iker.fernandez@test.com', 'Lateral Izquierdo', 7, 2, 'Medio'),
(38, 'Pablo Ortiz', '+34600111005', 'pablo.ortiz@test.com', 'Central', 7, 2, 'Muy Bueno'),
(39, 'Carlos Vidal', '+34600111006', 'carlos.vidal@test.com', 'Central', 7, 2, 'Bueno'),
(40, 'Rúben Costa', '+34600111007', 'ruben.costa@test.com', 'Central', 7, 2, 'Medio'),
(41, 'Tiago Nunes', '+34600111008', 'tiago.nunes@test.com', 'Mediocentro', 7, 2, 'Muy Bueno'),
(42, 'André Sousa', '+34600111009', 'andre.sousa@test.com', 'Volante', 7, 2, 'Bueno'),
(43, 'Bruno Alves', '+351931735384', 'bruno.alves@test.com', 'Volante', 7, 2, 'Medio'),
(44, 'Rafael Torres', '+34600111011', 'rafael.torres@test.com', 'Extremo Derecho', 7, 2, 'Muy Bueno'),
(45, 'Nuno Pereira', '+34600111012', 'nuno.pereira@test.com', 'Extremo Izquierdo', 7, 2, 'Bueno'),
(46, 'Gonçalo Matos', '+34600111013', 'goncalo.matos@test.com', 'Delantero Centro', 7, 2, 'Muy Bueno'),
(47, 'Fábio Ribeiro', '+34600111014', 'fabio.ribeiro@test.com', 'Delantero Centro', 7, 2, 'Bueno'),
(48, 'Ivo Salgado', '+34600111015', 'ivo.salgado@test.com', 'Mediapunta', 7, 2, 'Medio'),
(49, 'Rui Peixoto', '+34600111016', 'rui.peixoto@test.com', 'Centro', 7, 2, 'Bueno'),
(50, 'Renato Xavier', '+34600999001', 'renato.xavier@test.com', 'Portero', 1, 2, 'Bueno'),
(51, 'Emanuel Guerra', '+34600999002', 'emanuel.guerra@test.com', 'Portero', 1, 2, 'Medio'),
(52, 'Hélder Moreira', '+34600999003', 'helder.moreira@test.com', 'Defensa', 1, 2, 'Muy Bueno'),
(53, 'Paulo Esteves', '+34600999004', 'paulo.esteves@test.com', 'Defensa', 1, 2, 'Bueno'),
(54, 'Alexandre Reis', '+34600999005', 'alexandre.reis@test.com', 'Defensa', 1, 2, 'Medio'),
(55, 'Fernando Bento', '+34600999006', 'fernando.bento@test.com', 'Mediocampista', 1, 2, 'Bueno'),
(56, 'José Falcão', '+34600999007', 'jose.falcao@test.com', 'Mediocampista', 1, 2, 'Muy Bueno'),
(57, 'Manuel Serra', '+34600999008', 'manuel.serra@test.com', 'Mediocampista', 1, 2, 'Medio'),
(58, 'Artur Cabral', '+34600999009', 'artur.cabral@test.com', 'Mediocampista', 1, 2, 'Bueno'),
(59, 'Leonardo Assis', '+34600999010', 'leonardo.assis@test.com', 'Delantero', 1, 2, 'Muy Bueno'),
(60, 'Vasco Teles', '+34600999011', 'vasco.teles@test.com', 'Delantero', 1, 2, 'Bueno'),
(61, 'Sandro Miranda', '+34600555101', 'sandro.miranda@test.com', 'Jugador', NULL, 2, 'Muy Bueno'),
(62, 'Cláudio Vaz', '+34600555102', 'claudio.vaz@test.com', 'Jugador', NULL, 2, 'Bueno'),
(63, 'Dinis Câmara', '+34600555103', 'dinis.camara@test.com', 'Jugador', NULL, 2, 'Medio'),
(64, 'Eduardo Farias', '+34600555104', 'eduardo.farias@test.com', 'Jugador', NULL, 2, 'Bueno'),
(65, 'Francisco Melo', '+34600555105', 'francisco.melo@test.com', 'Jugador', NULL, 2, 'Muy Bueno'),
(66, 'Henrique Sá', '+34600555106', 'henrique.sa@test.com', 'Jugador', NULL, 2, 'Medio'),
(67, 'Igor Machado', '+34600555107', 'igor.machado@test.com', 'Jugador', NULL, 2, 'Bueno'),
(68, 'Jorge Nogueira', '+34600555108', 'jorge.nogueira@test.com', 'Jugador', NULL, 2, 'Muy Bueno'),
(69, 'Pedro', '934450476', 'pedro@gmail.com', 'Portero', 6, 2, 'Bueno'),
(70, 'Maga', '+351937156547', 'maga@gmail.com', 'Delantero Centro', 7, 2, 'Medio'),
(71, 'Gogas', '+351936115111', 'gogas@gmail.com', 'Central', 7, 2, 'Bueno'),
(72, 'Pinheiro', '+351932612971', 'ze@gmail.com', 'Central', 7, 2, 'Bueno'),
(73, 'Alves', '+351912288177', 'alves@gmail.com', 'Central', 7, 2, 'Muy Bueno'),
(74, 'Barinho', '+351932124272', 'barex@gmail.com', 'Delantero Centro', 7, 2, 'Bueno'),
(75, 'Pdr', '+351964419622', 'pedrex@gmail.com', 'Delantero Centro', 7, 2, 'Muy Bueno'),
(76, 'Pai', '+351939455141', 'rodrigo@gmail.com', 'Delantero Centro', 7, 2, 'Muy Bueno'),
(77, 'Seila', '+3513548131664', 'jsjehdh@gmail.com', 'Delantero Centro', 7, 2, 'Bueno'),
(78, 'Joel', '+351548548525', 'joel@gmail.com', 'Cierre', 6, 2, 'Bueno'),
(79, 'Olhero', '+351245848679', 'olhero@gmail.com', 'Ala', 6, 2, 'Bueno'),
(80, 'Lobo', '+351846973349', 'lobo@gmail.com', 'Pívot', 6, 2, 'Bueno'),
(81, 'Peixoto', '+351743164973', 'peixoto@gmail.com', 'Portero', 6, 2, 'Muy Bueno'),
(82, 'Maga', '+351 937 156 547', 'maga@gmail.com', 'Ala', 6, 2, 'Bueno'),
(83, 'McGregor', '+351 912 288 177', 'gregor@gmail.com', 'Cierre', 6, 2, 'Muy Bueno'),
(84, 'Zeca', '+351 932 612 971', 'ze@gmail.com', 'Ala', 6, 2, 'Bueno'),
(85, 'Caua', '+55 13 99759-3579', 'caua@gmail.com', 'Ala', 6, 2, 'Muy Bueno'),
(86, 'Enzo', '+55 13 97822-9559', 'enzo@gmail.com', 'Cierre', 6, 2, 'Muy Bueno'),
(87, 'Vicente Ortiz', '+351 945 350 328', 'vicente.ortiz143@test.com', 'Portero', 7, 2, 'Bueno'),
(88, 'Duarte Meireles', '+34 621 704 532', 'duarte.meireles33@test.com', 'Portero', 7, 2, 'Medio'),
(89, 'Paulo Reis', '+351 913 674 303', 'paulo.reis734@test.com', 'Defensa', 7, 2, 'Bueno'),
(90, 'Gil Rocha', '+351 945 928 990', 'gil.rocha7@test.com', 'Defensa', 7, 2, 'Muy Bueno'),
(91, 'Gonçalo Girão', '+351 945 259 320', 'goncalo.girao981@test.com', 'Defensa', 7, 2, 'Muy Bueno'),
(92, 'Iker Herrera', '+351 955 967 452', 'iker.herrera619@test.com', 'Defensa', 7, 2, 'Medio'),
(93, 'Pedro Loureiro', '+351 925 487 180', 'pedro.loureiro566@test.com', 'Lateral Derecho', 7, 2, 'Medio'),
(94, 'Telmo Rodrigues', '+34 656 691 296', 'telmo.rodrigues722@test.com', 'Lateral Derecho', 7, 2, 'Medio'),
(95, 'Baltasar Reis', '+34 620 975 338', 'baltasar.reis888@test.com', 'Lateral Izquierdo', 7, 2, 'Medio'),
(96, 'Sandro Pires', '+351 956 266 479', 'sandro.pires364@test.com', 'Lateral Izquierdo', 7, 2, 'Medio'),
(97, 'Vasco Girão', '+34 619 723 750', 'vasco.girao176@test.com', 'Central', 7, 2, 'Bueno'),
(98, 'Manuel Pereira', '+351 944 755 804', 'manuel.pereira571@test.com', 'Central', 7, 2, 'Medio'),
(99, 'Igor Leal', '+351 914 924 423', 'igor.leal411@test.com', 'Central', 7, 2, 'Medio'),
(100, 'Paulo Henriques', '+34 650 317 771', 'paulo.henriques512@test.com', 'Central', 7, 2, 'Bueno'),
(101, 'Wagner Pires', '+351 927 352 862', 'wagner.pires575@test.com', 'Centrocampista', 7, 2, 'Bueno'),
(102, 'Nunes Machado', '+351 961 470 324', 'nunes.machado142@test.com', 'Centrocampista', 7, 2, 'Bueno'),
(103, 'Diego Gaspar', '+34 629 742 263', 'diego.gaspar812@test.com', 'Centrocampista', 7, 2, 'Bueno'),
(104, 'Osvaldo Barros', '+351 969 641 357', 'osvaldo.barros995@test.com', 'Centrocampista', 7, 2, 'Bueno'),
(105, 'Filipe Esteves', '+34 678 868 373', 'filipe.esteves788@test.com', 'Mediocentro', 7, 2, 'Bueno'),
(106, 'Pablo Câmara', '+351 968 103 839', 'pablo.camara897@test.com', 'Mediocentro', 7, 2, 'Bueno'),
(107, 'Bernardo Ribeiro', '+351 923 991 740', 'bernardo.ribeiro306@test.com', 'Mediapunta', 7, 2, 'Muy Bueno'),
(108, 'Bernardo Paiva', '+351 957 880 265', 'bernardo.paiva553@test.com', 'Mediapunta', 7, 2, 'Muy Bueno'),
(109, 'Edgar Teixeira', '+351 972 119 214', 'edgar.teixeira952@test.com', 'Delantero', 7, 2, 'Bueno'),
(110, 'Francisco Bento', '+351 920 187 849', 'francisco.bento498@test.com', 'Delantero', 7, 2, 'Muy Bueno'),
(111, 'Pompeu Campos', '+34 626 775 586', 'pompeu.campos970@test.com', 'Delantero', 7, 2, 'Bueno'),
(112, 'Leonardo Azevedo', '+34 664 316 652', 'leonardo.azevedo774@test.com', 'Delantero', 7, 2, 'Bueno'),
(113, 'Emanuel Ivo', '+351 957 548 629', 'emanuel.ivo463@test.com', 'Extremo Derecho', 7, 2, 'Medio'),
(115, 'Telmo Leal', '+351 914 980 438', 'telmo.leal73@test.com', 'Extremo Izquierdo', 7, 2, 'Bueno'),
(116, 'Sandro Castro', '+351 979 235 840', 'sandro.castro958@test.com', 'Extremo Izquierdo', 7, 2, 'Muy Bueno'),
(117, 'Leandro Fernandes', '+351 970 926 516', 'leandro.fernandes195@test.com', 'Portero', 1, 2, 'Medio'),
(118, 'Baltasar Monteiro', '+351 962 578 984', 'baltasar.monteiro747@test.com', 'Portero', 1, 2, 'Medio'),
(119, 'Adão Valente', '+351 961 845 447', 'adao.valente820@test.com', 'Portero', 1, 2, 'Muy Bueno'),
(120, 'Manuel Peixoto', '+351 967 243 532', 'manuel.peixoto188@test.com', 'Defensa', 1, 2, 'Medio'),
(121, 'Manuel Cabral', '+351 922 151 767', 'manuel.cabral554@test.com', 'Defensa', 1, 2, 'Muy Bueno'),
(122, 'Diego Bento', '+351 972 592 318', 'diego.bento886@test.com', 'Defensa', 1, 2, 'Bueno'),
(123, 'Sérgio Matos', '+351 959 371 902', 'sergio.matos804@test.com', 'Defensa', 1, 2, 'Bueno'),
(124, 'Pascoal Girão', '+34 672 258 294', 'pascoal.girao304@test.com', 'Defensa', 1, 2, 'Medio'),
(125, 'Sérgio Machado', '+34 617 865 421', 'sergio.machado59@test.com', 'Defensa', 1, 2, 'Medio'),
(126, 'Xavier Antunes', '+34 677 261 158', 'xavier.antunes984@test.com', 'Centrocampista', 1, 2, 'Bueno'),
(127, 'Rui Barros', '+351 940 513 222', 'rui.barros965@test.com', 'Centrocampista', 1, 2, 'Muy Bueno'),
(128, 'Manuel Machado', '+351 920 529 773', 'manuel.machado598@test.com', 'Centrocampista', 1, 2, 'Bueno'),
(129, 'Henrique Assis', '+351 950 344 371', 'henrique.assis406@test.com', 'Centrocampista', 1, 2, 'Medio'),
(130, 'Wagner Farias', '+351 919 109 569', 'wagner.farias637@test.com', 'Centrocampista', 1, 2, 'Muy Bueno'),
(131, 'Luis Cabral', '+351 974 371 235', 'luis.cabral956@test.com', 'Centrocampista', 1, 2, 'Medio'),
(132, 'Nelson Falcão', '+351 930 548 953', 'nelson.falcao557@test.com', 'Delantero', 1, 2, 'Bueno'),
(133, 'Ramiro Andrade', '+351 948 779 206', 'ramiro.andrade962@test.com', 'Delantero', 1, 2, 'Muy Bueno'),
(134, 'Leonardo Ortiz', '+34 629 378 388', 'leonardo.ortiz620@test.com', 'Delantero', 1, 2, 'Medio'),
(135, 'Miguel Guerra', '+351 943 617 600', 'miguel.guerra258@test.com', 'Delantero', 1, 2, 'Muy Bueno'),
(136, 'Vítor Herrera', '+351 945 145 103', 'vitor.herrera342@test.com', 'Delantero', 1, 2, 'Muy Bueno'),
(137, 'Vicente Assis', '+351 966 664 822', 'vicente.assis438@test.com', 'Portero', 6, 2, 'Bueno'),
(138, 'Pablo Cabral', '+34 629 658 136', 'pablo.cabral855@test.com', 'Portero', 6, 2, 'Bueno'),
(139, 'Ismael Alves', '+351 915 415 473', 'ismael.alves921@test.com', 'Portero', 6, 2, 'Muy Bueno'),
(140, 'Pedro Martins', '+351 941 782 205', 'pedro.martins363@test.com', 'Fixo', 6, 2, 'Muy Bueno'),
(141, 'Norberto Rodrigues', '+34 640 985 266', 'norberto.rodrigues820@test.com', 'Fixo', 6, 2, 'Muy Bueno'),
(142, 'Norberto Melo', '+351 952 901 521', 'norberto.melo822@test.com', 'Fixo', 6, 2, 'Bueno'),
(143, 'Matias Falcão', '+351 923 491 993', 'matias.falcao40@test.com', 'Fixo', 6, 2, 'Muy Bueno'),
(144, 'Alexandre Xavier', '+34 668 458 412', 'alexandre.xavier841@test.com', 'Ala', 6, 2, 'Muy Bueno'),
(145, 'Fernando Esteves', '+351 934 508 436', 'fernando.esteves286@test.com', 'Ala', 6, 2, 'Muy Bueno'),
(146, 'Quintino Miranda', '+351 975 509 795', 'quintino.miranda864@test.com', 'Ala', 6, 2, 'Bueno'),
(147, 'Ricardo Ortiz', '+34 643 282 694', 'ricardo.ortiz986@test.com', 'Ala', 6, 2, 'Muy Bueno'),
(148, 'João Fernández', '+351 954 846 905', 'joao.fernandez322@test.com', 'Ala', 6, 2, 'Bueno'),
(149, 'Cristiano Ortiz', '+351 934 360 145', 'cristiano.ortiz726@test.com', 'Ala', 6, 2, 'Bueno'),
(150, 'David Campos', '+351 935 472 541', 'david.campos72@test.com', 'Pivô', 6, 2, 'Muy Bueno'),
(151, 'Jorge Rodrigues', '+351 925 837 407', 'jorge.rodrigues520@test.com', 'Pivô', 6, 2, 'Medio'),
(152, 'Norberto Machado', '+351 947 667 230', 'norberto.machado197@test.com', 'Pivô', 6, 2, 'Bueno'),
(153, 'Ivan Delgado', '+34 632 730 682', 'ivan.delgado309@test.com', 'Pivô', 6, 2, 'Bueno'),
(154, 'Bruno Farias', '+351 965 904 693', 'bruno.farias622@test.com', 'Centrocampista', 6, 2, 'Bueno'),
(155, 'Ulisses Cardoso', '+351 937 623 584', 'ulisses.cardoso813@test.com', 'Centrocampista', 6, 2, 'Muy Bueno'),
(156, 'Teodoro Meireles', '+351 920 390 627', 'teodoro.meireles680@test.com', 'Centrocampista', 6, 2, 'Bueno'),
(157, 'Jorge Herrera', '+34 640 788 417', 'jorge.herrera231@test.com', 'Base', 2, 2, 'Muy Bueno'),
(158, 'Rafael Melo', '+351 970 725 970', 'rafael.melo787@test.com', 'Base', 2, 2, 'Medio'),
(159, 'Otávio Simões', '+351 959 606 509', 'otavio.simoes250@test.com', 'Base', 2, 2, 'Medio'),
(160, 'Frederico Teixeira', '+34 623 897 535', 'frederico.teixeira225@test.com', 'Base', 2, 2, 'Medio'),
(161, 'Guilherme Freitas', '+351 941 968 224', 'guilherme.freitas468@test.com', 'Escolta', 2, 2, 'Medio'),
(162, 'Ulisses Castro', '+351 950 873 553', 'ulisses.castro628@test.com', 'Escolta', 2, 2, 'Muy Bueno'),
(163, 'Bernardo Dias', '+34 667 262 861', 'bernardo.dias883@test.com', 'Escolta', 2, 2, 'Bueno'),
(164, 'Leonardo Falcão', '+34 645 884 896', 'leonardo.falcao534@test.com', 'Escolta', 2, 2, 'Bueno'),
(165, 'José Miranda', '+351 946 340 378', 'jose.miranda344@test.com', 'Alero', 2, 2, 'Medio'),
(166, 'Gil Silva', '+351 939 492 810', 'gil.silva157@test.com', 'Alero', 2, 2, 'Bueno'),
(167, 'Nelson Rocha', '+351 979 577 525', 'nelson.rocha64@test.com', 'Alero', 2, 2, 'Medio'),
(168, 'Otávio Marques', '+34 612 977 883', 'otavio.marques590@test.com', 'Alero', 2, 2, 'Bueno'),
(169, 'Bruno Martins', '+351 959 973 955', 'bruno.martins430@test.com', 'Ala-Pívot', 2, 2, 'Bueno'),
(170, 'Matias Duarte', '+34 638 599 324', 'matias.duarte280@test.com', 'Ala-Pívot', 2, 2, 'Bueno'),
(171, 'Ricardo Marques', '+351 961 841 269', 'ricardo.marques861@test.com', 'Ala-Pívot', 2, 2, 'Bueno'),
(172, 'Rúben Rodrigues', '+351 960 706 677', 'ruben.rodrigues679@test.com', 'Ala-Pívot', 2, 2, 'Medio'),
(173, 'Wagner Dias', '+351 969 286 151', 'wagner.dias267@test.com', 'Pívot', 2, 2, 'Bueno'),
(174, 'Paulo Pires', '+351 958 384 870', 'paulo.pires975@test.com', 'Pívot', 2, 2, 'Muy Bueno'),
(175, 'Artur Silva', '+351 979 153 458', 'artur.silva230@test.com', 'Pívot', 2, 2, 'Bueno'),
(176, 'Roque Andrade', '+351 913 353 304', 'roque.andrade860@test.com', 'Pívot', 2, 2, 'Medio'),
(177, 'Nuno Bento', '+351 924 677 323', 'nuno.bento477@test.com', 'Guarda-Redes', 11, 2, 'Bueno'),
(178, 'Quintino Gomes', '+351 924 896 938', 'quintino.gomes168@test.com', 'Guarda-Redes', 11, 2, 'Muy Bueno'),
(179, 'Iker Machado', '+351 949 689 793', 'iker.machado930@test.com', 'Guarda-Redes', 11, 2, 'Muy Bueno'),
(180, 'Lucas Ivo', '+351 941 204 813', 'lucas.ivo792@test.com', 'Guarda-Redes', 11, 2, 'Medio'),
(181, 'Elias Oliveira', '+34 615 455 645', 'elias.oliveira439@test.com', 'Ponta Esquerda', 11, 2, 'Bueno'),
(182, 'Nelson Antunes', '+351 911 969 530', 'nelson.antunes843@test.com', 'Ponta Esquerda', 11, 2, 'Bueno'),
(183, 'Quim Jesus', '+351 968 824 256', 'quim.jesus446@test.com', 'Ponta Esquerda', 11, 2, 'Medio'),
(184, 'David Andrade', '+351 978 893 595', 'david.andrade477@test.com', 'Ponta Esquerda', 11, 2, 'Bueno'),
(185, 'Lourenço Nascimento', '+351 941 950 188', 'lourenco.nascimento286@test.com', 'Lateral Esquerdo', 11, 2, 'Muy Bueno'),
(186, 'Manuel Ramos', '+351 958 444 129', 'manuel.ramos507@test.com', 'Lateral Esquerdo', 11, 2, 'Muy Bueno'),
(187, 'Rui Vieira', '+351 943 448 386', 'rui.vieira902@test.com', 'Lateral Esquerdo', 11, 2, 'Bueno'),
(188, 'Sandro Guerreiro', '+351 934 187 347', 'sandro.guerreiro738@test.com', 'Lateral Esquerdo', 11, 2, 'Bueno'),
(189, 'Júlio Bento', '+351 972 558 911', 'julio.bento18@test.com', 'Central', 11, 2, 'Medio'),
(190, 'Alexandre Pinto', '+351 949 779 695', 'alexandre.pinto378@test.com', 'Central', 11, 2, 'Bueno'),
(191, 'Edgar Sousa', '+351 952 460 819', 'edgar.sousa465@test.com', 'Central', 11, 2, 'Medio'),
(192, 'Artur Reis', '+351 934 423 222', 'artur.reis761@test.com', 'Central', 11, 2, 'Bueno'),
(193, 'Pompeu Franco', '+351 937 856 595', 'pompeu.franco284@test.com', 'Pivot', 11, 2, 'Bueno'),
(194, 'Pompeu Azevedo', '+351 922 952 298', 'pompeu.azevedo304@test.com', 'Pivot', 11, 2, 'Medio'),
(195, 'Ivo Farias', '+351 978 229 380', 'ivo.farias47@test.com', 'Pivot', 11, 2, 'Muy Bueno'),
(196, 'Ismael Câmara', '+351 926 753 989', 'ismael.camara771@test.com', 'Pivot', 11, 2, 'Bueno'),
(197, 'Filipe Lemos', '+351 971 551 448', 'filipe.lemos189@test.com', 'Lateral Direito', 11, 2, 'Muy Bueno'),
(198, 'Artur Gonçalves', '+351 918 510 603', 'artur.goncalves76@test.com', 'Lateral Direito', 11, 2, 'Bueno'),
(199, 'Elias Gaspar', '+351 948 187 354', 'elias.gaspar122@test.com', 'Lateral Direito', 11, 2, 'Bueno'),
(200, 'Otávio Paiva', '+351 938 894 635', 'otavio.paiva390@test.com', 'Lateral Direito', 11, 2, 'Bueno'),
(201, 'Rodrigo Farias', '+34 664 412 682', 'rodrigo.farias636@test.com', 'Ponta Direita', 11, 2, 'Medio'),
(202, 'Matias Ramírez', '+34 636 740 316', 'matias.ramirez271@test.com', 'Ponta Direita', 11, 2, 'Bueno'),
(203, 'Gonçalo Bento', '+351 919 260 102', 'goncalo.bento419@test.com', 'Ponta Direita', 11, 2, 'Bueno'),
(204, 'Osvaldo Fernandes', '+351 939 395 823', 'osvaldo.fernandes290@test.com', 'Ponta Direita', 11, 2, 'Bueno'),
(205, 'Tomás Cabral', '+351 943 906 910', 'tomas.cabral641@test.com', 'Pilar', 12, 2, 'Bueno'),
(206, 'Valdemar Xavier', '+351 979 330 763', 'valdemar.xavier153@test.com', 'Pilar', 12, 2, 'Muy Bueno'),
(207, 'Rafael Cabral', '+351 949 709 866', 'rafael.cabral845@test.com', 'Pilar', 12, 2, 'Bueno'),
(208, 'Cláudio Cardoso', '+351 948 816 512', 'claudio.cardoso966@test.com', 'Pilar', 12, 2, 'Medio'),
(209, 'Gil Coelho', '+351 915 542 852', 'gil.coelho331@test.com', 'Pilar', 12, 2, 'Bueno'),
(210, 'Ricardo Herrera', '+351 912 883 788', 'ricardo.herrera842@test.com', 'Pilar', 12, 2, 'Medio'),
(211, 'Pedro Ribeiro', '+351 966 384 285', 'pedro.ribeiro600@test.com', 'Talonador', 12, 2, 'Bueno'),
(212, 'Zeca Herrera', '+351 962 441 428', 'zeca.herrera687@test.com', 'Talonador', 12, 2, 'Medio'),
(213, 'Gonçalo Nogueira', '+351 973 395 778', 'goncalo.nogueira968@test.com', 'Talonador', 12, 2, 'Bueno'),
(214, 'Pompeu Faria', '+351 921 422 358', 'pompeu.faria332@test.com', 'Talonador', 12, 2, 'Medio'),
(215, 'Quintino Pinto', '+34 610 773 990', 'quintino.pinto556@test.com', 'Segunda Linha', 12, 2, 'Bueno'),
(216, 'Vítor Peixoto', '+351 973 740 552', 'vitor.peixoto779@test.com', 'Segunda Linha', 12, 2, 'Medio'),
(217, 'Vasco Faria', '+351 946 548 815', 'vasco.faria497@test.com', 'Segunda Linha', 12, 2, 'Medio'),
(218, 'Telmo Paiva', '+34 630 418 664', 'telmo.paiva15@test.com', 'Segunda Linha', 12, 2, 'Bueno'),
(219, 'Diego Esteves', '+34 624 572 220', 'diego.esteves664@test.com', 'Segunda Linha', 12, 2, 'Muy Bueno'),
(220, 'Alberto Ivo', '+351 944 525 954', 'alberto.ivo495@test.com', 'Segunda Linha', 12, 2, 'Muy Bueno'),
(221, 'Manuel Pires', '+351 959 295 713', 'manuel.pires521@test.com', 'Ala', 12, 2, 'Bueno'),
(222, 'Tiago Barros', '+351 963 448 906', 'tiago.barros520@test.com', 'Ala', 12, 2, 'Medio'),
(223, 'Bruno Vaz', '+34 672 986 252', 'bruno.vaz458@test.com', 'Ala', 12, 2, 'Bueno'),
(224, 'Daniel Nogueira', '+351 979 486 566', 'daniel.nogueira956@test.com', 'Ala', 12, 2, 'Medio'),
(225, 'Renato Girão', '+351 959 339 976', 'renato.girao795@test.com', 'Ala', 12, 2, 'Bueno'),
(226, 'Henrique Neto', '+351 958 495 779', 'henrique.neto812@test.com', 'Ala', 12, 2, 'Muy Bueno'),
(227, 'Nuno Coelho', '+34 626 614 704', 'nuno.coelho340@test.com', 'Número 8', 12, 2, 'Muy Bueno'),
(228, 'Rodrigo Ramírez', '+351 968 115 839', 'rodrigo.ramirez148@test.com', 'Número 8', 12, 2, 'Bueno'),
(229, 'Adão Torres', '+351 943 446 738', 'adao.torres710@test.com', 'Número 8', 12, 2, 'Bueno'),
(230, 'Marco Nogueira', '+34 678 489 424', 'marco.nogueira642@test.com', 'Número 8', 12, 2, 'Bueno'),
(231, 'Pompeu Vieira', '+34 614 732 170', 'pompeu.vieira241@test.com', 'Médio Scrum', 12, 2, 'Bueno'),
(232, 'Cláudio Reis', '+34 665 200 878', 'claudio.reis649@test.com', 'Médio Scrum', 12, 2, 'Bueno'),
(233, 'Luis Cardoso', '+351 948 129 147', 'luis.cardoso333@test.com', 'Médio Scrum', 12, 2, 'Muy Bueno'),
(234, 'Dinis Martins', '+351 928 350 643', 'dinis.martins422@test.com', 'Médio Scrum', 12, 2, 'Bueno'),
(235, 'Teodoro Salgado', '+351 920 724 991', 'teodoro.salgado392@test.com', 'Abertura', 12, 2, 'Bueno'),
(236, 'José Coelho', '+34 628 337 572', 'jose.coelho654@test.com', 'Abertura', 12, 2, 'Medio'),
(237, 'Artur Castro', '+351 969 394 793', 'artur.castro560@test.com', 'Abertura', 12, 2, 'Medio'),
(238, 'Rodrigo Sousa', '+34 648 754 534', 'rodrigo.sousa707@test.com', 'Abertura', 12, 2, 'Medio'),
(239, 'Eduardo Xavier', '+34 671 209 342', 'eduardo.xavier391@test.com', 'Centro', 12, 2, 'Bueno'),
(240, 'Leandro Câmara', '+34 647 122 949', 'leandro.camara675@test.com', 'Centro', 12, 2, 'Bueno'),
(241, 'Filipe Henriques', '+34 616 720 863', 'filipe.henriques509@test.com', 'Centro', 12, 2, 'Muy Bueno'),
(242, 'Alexandre Tavares', '+351 942 794 873', 'alexandre.tavares739@test.com', 'Centro', 12, 2, 'Muy Bueno'),
(243, 'Elias Nunes', '+351 915 416 907', 'elias.nunes452@test.com', 'Centro', 12, 2, 'Medio'),
(244, 'Gustavo Loureiro', '+351 947 434 865', 'gustavo.loureiro426@test.com', 'Centro', 12, 2, 'Medio'),
(245, 'Rúben Duarte', '+34 656 643 613', 'ruben.duarte936@test.com', 'Ponta', 12, 2, 'Medio'),
(246, 'Fábio Serra', '+34 671 925 402', 'fabio.serra765@test.com', 'Ponta', 12, 2, 'Muy Bueno'),
(247, 'Valdemar Ortiz', '+351 919 244 872', 'valdemar.ortiz990@test.com', 'Ponta', 12, 2, 'Medio'),
(248, 'Duarte Jardim', '+351 960 966 923', 'duarte.jardim571@test.com', 'Ponta', 12, 2, 'Bueno'),
(249, 'Teodoro Fonseca', '+351 978 226 565', 'teodoro.fonseca378@test.com', 'Ponta', 12, 2, 'Bueno'),
(250, 'Duarte Assis', '+351 957 210 791', 'duarte.assis240@test.com', 'Ponta', 12, 2, 'Bueno'),
(251, 'Salvador Guerreiro', '+351 938 763 164', 'salvador.guerreiro651@test.com', 'Zagueiro', 12, 2, 'Muy Bueno'),
(252, 'Guilherme Farias', '+351 924 243 146', 'guilherme.farias969@test.com', 'Zagueiro', 12, 2, 'Medio'),
(253, 'Alberto Ortiz', '+351 978 238 497', 'alberto.ortiz465@test.com', 'Zagueiro', 12, 2, 'Bueno'),
(254, 'Nunes Girão', '+34 663 701 860', 'nunes.girao745@test.com', 'Zagueiro', 12, 2, 'Medio'),
(257, 'Tiago Manazos', '931884345', 'email@gmail.com', 'Alero', 2, 1, 'Muy Bueno');

-- --------------------------------------------------------

--
-- Estrutura da tabela `partidos`
--

CREATE TABLE `partidos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `deporte_id` int(11) NOT NULL,
  `numero_equipos` int(11) NOT NULL,
  `resultado_texto` varchar(255) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `partidos`
--

INSERT INTO `partidos` (`id`, `usuario_id`, `deporte_id`, `numero_equipos`, `resultado_texto`, `fecha`) VALUES
(1, 2, 7, 2, '', '2026-07-15 09:03:11'),
(2, 2, 7, 2, '', '2026-07-17 09:03:33'),
(3, 2, 11, 2, '', '2026-07-17 09:41:34');

-- --------------------------------------------------------

--
-- Estrutura da tabela `partido_equipos`
--

CREATE TABLE `partido_equipos` (
  `id` int(11) NOT NULL,
  `partido_id` int(11) NOT NULL,
  `numero_equipo` int(11) NOT NULL,
  `nombre_equipo` varchar(100) NOT NULL,
  `puntuacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `partido_equipos`
--

INSERT INTO `partido_equipos` (`id`, `partido_id`, `numero_equipo`, `nombre_equipo`, `puntuacion`) VALUES
(1, 1, 1, 'Equipo 1', NULL),
(2, 1, 2, 'Equipo 2', NULL),
(3, 2, 1, 'Equipo 1', NULL),
(4, 2, 2, 'Equipo 2', NULL),
(5, 3, 1, 'Equipo 1', NULL),
(6, 3, 2, 'Equipo 2', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `partido_jugadores`
--

CREATE TABLE `partido_jugadores` (
  `id` int(11) NOT NULL,
  `partido_equipo_id` int(11) NOT NULL,
  `jugador_id` int(11) DEFAULT NULL,
  `nombre_jugador` varchar(150) NOT NULL,
  `posicion_jugador` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `partido_jugadores`
--

INSERT INTO `partido_jugadores` (`id`, `partido_equipo_id`, `jugador_id`, `nombre_jugador`, `posicion_jugador`) VALUES
(1, 1, 87, 'Vicente Ortiz', 'Portero'),
(2, 1, 91, 'Gonçalo Girão', 'Defensa'),
(3, 1, 38, 'Pablo Ortiz', 'Defensa'),
(4, 1, 71, 'Gogas', 'Defensa'),
(5, 1, 36, 'Luis Ramírez', 'Defensa'),
(6, 1, 107, 'Bernardo Ribeiro', 'Centrocampista'),
(7, 1, 76, 'Pai', 'Centrocampista'),
(8, 1, 41, 'Tiago Nunes', 'Centrocampista'),
(9, 1, 42, 'André Sousa', 'Centrocampista'),
(10, 1, 110, 'Francisco Bento', 'Delantero'),
(11, 1, 116, 'Sandro Castro', 'Delantero'),
(12, 2, 34, 'Marco Silva', 'Portero'),
(13, 2, 73, 'Alves', 'Defensa'),
(14, 2, 90, 'Gil Rocha', 'Defensa'),
(15, 2, 97, 'Vasco Girão', 'Defensa'),
(16, 2, 89, 'Paulo Reis', 'Defensa'),
(17, 2, 108, 'Bernardo Paiva', 'Centrocampista'),
(18, 2, 75, 'Pdr', 'Centrocampista'),
(19, 2, 46, 'Gonçalo Matos', 'Centrocampista'),
(20, 2, 77, 'Seila', 'Centrocampista'),
(21, 2, 44, 'Rafael Torres', 'Delantero'),
(22, 2, 47, 'Fábio Ribeiro', 'Delantero'),
(23, 3, 87, 'Vicente Ortiz', 'Portero'),
(24, 3, 73, 'Alves', 'Defensa'),
(25, 3, 38, 'Pablo Ortiz', 'Defensa'),
(26, 3, 100, 'Paulo Henriques', 'Defensa'),
(27, 3, 36, 'Luis Ramírez', 'Defensa'),
(28, 3, 75, 'Pdr', 'Centrocampista'),
(29, 3, 76, 'Pai', 'Centrocampista'),
(30, 3, 46, 'Gonçalo Matos', 'Centrocampista'),
(31, 3, 77, 'Seila', 'Centrocampista'),
(32, 3, 110, 'Francisco Bento', 'Delantero'),
(33, 3, 45, 'Nuno Pereira', 'Delantero'),
(34, 4, 34, 'Marco Silva', 'Portero'),
(35, 4, 90, 'Gil Rocha', 'Defensa'),
(36, 4, 91, 'Gonçalo Girão', 'Defensa'),
(37, 4, 72, 'Pinheiro', 'Defensa'),
(38, 4, 97, 'Vasco Girão', 'Defensa'),
(39, 4, 41, 'Tiago Nunes', 'Centrocampista'),
(40, 4, 108, 'Bernardo Paiva', 'Centrocampista'),
(41, 4, 107, 'Bernardo Ribeiro', 'Centrocampista'),
(42, 4, 47, 'Fábio Ribeiro', 'Centrocampista'),
(43, 4, 44, 'Rafael Torres', 'Delantero'),
(44, 4, 116, 'Sandro Castro', 'Delantero'),
(45, 5, 178, 'Quintino Gomes', 'Portero'),
(46, 5, 181, 'Elias Oliveira', 'Extremo Izquierdo'),
(47, 5, 185, 'Lourenço Nascimento', 'Lateral Izquierdo'),
(48, 5, 192, 'Artur Reis', 'Central'),
(49, 5, 195, 'Ivo Farias', 'Pivote'),
(50, 5, 199, 'Elias Gaspar', 'Lateral Derecho'),
(51, 5, 204, 'Osvaldo Fernandes', 'Extremo Derecho'),
(52, 6, 179, 'Iker Machado', 'Portero'),
(53, 6, 182, 'Nelson Antunes', 'Extremo Izquierdo'),
(54, 6, 186, 'Manuel Ramos', 'Lateral Izquierdo'),
(55, 6, 190, 'Alexandre Pinto', 'Central'),
(56, 6, 193, 'Pompeu Franco', 'Pivote'),
(57, 6, 197, 'Filipe Lemos', 'Lateral Derecho'),
(58, 6, 203, 'Gonçalo Bento', 'Extremo Derecho');

-- --------------------------------------------------------

--
-- Estrutura da tabela `posiciones`
--

CREATE TABLE `posiciones` (
  `id` int(11) NOT NULL,
  `deporte_id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `orden` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `posiciones`
--

INSERT INTO `posiciones` (`id`, `deporte_id`, `nombre`, `orden`) VALUES
(1, 1, 'Portero', 1),
(2, 1, 'Defensa', 2),
(3, 1, 'Mediocampista', 3),
(4, 1, 'Delantero', 4),
(5, 2, 'Base', 1),
(6, 2, 'Escolta', 2),
(7, 2, 'Alero', 3),
(8, 2, 'Ala-Pívot', 4),
(9, 2, 'Pívot', 5),
(10, 6, 'Portero', 1),
(11, 6, 'Cierre', 2),
(12, 6, 'Ala', 3),
(13, 6, 'Pívot', 4),
(14, 7, 'Portero', 1),
(15, 7, 'Lateral Derecho', 2),
(16, 7, 'Lateral Izquierdo', 3),
(17, 7, 'Central', 4),
(18, 7, 'Mediocentro', 5),
(19, 7, 'Volante', 6),
(20, 7, 'Centro', 7),
(21, 7, 'Extremo Derecho', 8),
(22, 7, 'Extremo Izquierdo', 9),
(23, 7, 'Mediapunta', 10),
(24, 7, 'Delantero Centro', 11),
(30, 11, 'Guarda-Redes', 1),
(31, 11, 'Ponta Esquerda', 2),
(32, 11, 'Lateral Esquerdo', 3),
(33, 11, 'Central', 4),
(34, 11, 'Pivot', 5),
(35, 11, 'Lateral Direito', 6),
(36, 11, 'Ponta Direita', 7),
(37, 12, 'Pilar', 1),
(38, 12, 'Talonador', 2),
(39, 12, 'Segunda Linha', 3),
(40, 12, 'Ala', 4),
(41, 12, 'Número 8', 5),
(42, 12, 'Médio Scrum', 6),
(43, 12, 'Abertura', 7),
(44, 12, 'Centro', 8),
(45, 12, 'Ponta', 9),
(46, 12, 'Zagueiro', 10);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `bloqueado` tinyint(1) NOT NULL DEFAULT 0,
  `plano` enum('demo','pro') DEFAULT 'demo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password_hash`, `created_at`, `role`, `bloqueado`, `plano`) VALUES
(1, 'admin', '$2y$12$dS3oCli.WYZqzw.0s/RgXOIdUss1XeOysQaGcTmgesvVeIbRkhKS2', '2026-06-26 10:47:20', 'admin', 0, 'pro'),
(2, 'teste', '$2y$12$gSSTq6eTNvvN9Xee4JCaluSvedIVYO6N3N3RmalPXRjSgrnLAa6MK', '2026-06-29 08:25:52', 'user', 0, 'pro'),
(4, 'testeFe', '$2y$12$ManwV1rI5BG0u5n/FCkpDuyb8UA/TvTj4CBeeeMyM6D2gg3jCRZhG', '2026-06-29 09:29:54', 'user', 0, 'demo'),
(6, 'Pedroloto', '$2y$12$JC3hlzHvoOWlRTbXmjk6XOK0KfFYL/IbEeKMxvzR98oIM8SnqUxWm', '2026-06-30 09:22:08', 'user', 0, 'demo'),
(7, 'mobile', '$2y$12$.qT8fD.OzcIzeEz29ADTMeArr4gtOhwznyqg9JvpHlr9GSChweehG', '2026-07-03 07:28:56', 'user', 0, 'demo'),
(8, 'bigboss', '$2y$12$x8Kv8qh03vMfahfeF78.Oeey/rtF5pxw/qhxgM9v4BF2CcJnBSAum', '2026-07-10 11:09:47', 'admin', 0, 'demo'),
(9, 'Saullo', '$2y$12$SX0U.SI4Aa1UWBbpisqOe.XDYYmNoQWER.hLXCWo2MbCaf8HjznFO', '2026-07-15 10:52:05', 'user', 0, 'demo');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `deportes`
--
ALTER TABLE `deportes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_jugadores_deporte` (`deporte_id`),
  ADD KEY `idx_jugadores_usuario` (`usuario_id`);

--
-- Índices para tabela `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_partidos_usuario` (`usuario_id`),
  ADD KEY `fk_partidos_deporte` (`deporte_id`);

--
-- Índices para tabela `partido_equipos`
--
ALTER TABLE `partido_equipos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_partequipo_partido` (`partido_id`);

--
-- Índices para tabela `partido_jugadores`
--
ALTER TABLE `partido_jugadores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_partjugador_equipo` (`partido_equipo_id`),
  ADD KEY `fk_partjugador_jugador` (`jugador_id`);

--
-- Índices para tabela `posiciones`
--
ALTER TABLE `posiciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_posiciones_deporte` (`deporte_id`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `admin_logs`
--
ALTER TABLE `admin_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT de tabela `deportes`
--
ALTER TABLE `deportes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=258;

--
-- AUTO_INCREMENT de tabela `partidos`
--
ALTER TABLE `partidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `partido_equipos`
--
ALTER TABLE `partido_equipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `partido_jugadores`
--
ALTER TABLE `partido_jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de tabela `posiciones`
--
ALTER TABLE `posiciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `jugadores`
--
ALTER TABLE `jugadores`
  ADD CONSTRAINT `fk_jugadores_deporte` FOREIGN KEY (`deporte_id`) REFERENCES `deportes` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_jugadores_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `partidos`
--
ALTER TABLE `partidos`
  ADD CONSTRAINT `fk_partidos_deporte` FOREIGN KEY (`deporte_id`) REFERENCES `deportes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_partidos_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `partido_equipos`
--
ALTER TABLE `partido_equipos`
  ADD CONSTRAINT `fk_partequipo_partido` FOREIGN KEY (`partido_id`) REFERENCES `partidos` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `partido_jugadores`
--
ALTER TABLE `partido_jugadores`
  ADD CONSTRAINT `fk_partjugador_equipo` FOREIGN KEY (`partido_equipo_id`) REFERENCES `partido_equipos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_partjugador_jugador` FOREIGN KEY (`jugador_id`) REFERENCES `jugadores` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `posiciones`
--
ALTER TABLE `posiciones`
  ADD CONSTRAINT `fk_posiciones_deporte` FOREIGN KEY (`deporte_id`) REFERENCES `deportes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
