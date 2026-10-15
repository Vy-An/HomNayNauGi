-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 06, 2026 at 04:14 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hom_nay_an_gi`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id_category` int UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id_category`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Món mặn', 'mon-man', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(2, 'Món canh', 'mon-canh', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(3, 'Món rau', 'mon-rau', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(4, 'Món xào', 'mon-xao', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(5, 'Món chiên', 'mon-chien', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(6, 'Món luộc', 'mon-luoc', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(7, 'Món kho', 'mon-kho', '2026-10-05 14:52:02', '2026-10-05 14:52:02');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id_comment` int UNSIGNED NOT NULL,
  `id_post` int UNSIGNED NOT NULL,
  `id_user` int UNSIGNED NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','hidden') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id_comment`, `id_post`, `id_user`, `content`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 'Nhìn ngon quá, mình cũng sẽ thử nấu món này.', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(2, 1, 4, 'Bạn kho thịt khoảng bao lâu vậy?', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(3, 2, 2, 'Món này nhanh mà ăn với cơm rất ngon.', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(4, 3, 5, 'Canh chua cá đúng là hợp với thời tiết nóng.', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(5, 4, 3, 'Đậu hũ sốt cà là món mình thường nấu khi cuối tháng.', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id_favorite` int UNSIGNED NOT NULL,
  `id_user` int UNSIGNED NOT NULL,
  `id_food` int UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id_favorite`, `id_user`, `id_food`, `created_at`) VALUES
(1, 2, 1, '2026-10-05 14:52:03'),
(2, 2, 8, '2026-10-05 14:52:03'),
(3, 2, 12, '2026-10-05 14:52:03'),
(4, 3, 4, '2026-10-05 14:52:03'),
(5, 3, 9, '2026-10-05 14:52:03'),
(6, 4, 17, '2026-10-05 14:52:03'),
(7, 4, 11, '2026-10-05 14:52:03'),
(8, 5, 3, '2026-10-05 14:52:03'),
(9, 5, 18, '2026-10-05 14:52:03');

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `id_food` int UNSIGNED NOT NULL,
  `id_category` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cooking_time` smallint UNSIGNED DEFAULT NULL,
  `servings` tinyint UNSIGNED DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `foods`
--

INSERT INTO `foods` (`id_food`, `id_category`, `name`, `slug`, `description`, `image`, `cooking_time`, `servings`, `status`, `created_at`, `updated_at`) VALUES
(1, 7, 'Thịt kho trứng', 'thit-kho-trung', 'Thịt ba chỉ kho mềm cùng trứng và nước dừa.', '/images/foods/thit-kho-trung.jpg', 60, 4, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(2, 7, 'Cá kho tộ', 'ca-kho-to', 'Cá kho đậm vị với nước mắm, tiêu và hành.', '/images/foods/ca-kho-to.jpg', 45, 4, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(3, 7, 'Gà kho gừng', 'ga-kho-gung', 'Thịt gà kho cùng gừng thơm và đậm vị.', '/images/foods/ga-kho-gung.jpg', 40, 4, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(4, 4, 'Sườn xào chua ngọt', 'suon-xao-chua-ngot', 'Sườn non xào cùng rau củ với vị chua ngọt.', '/images/foods/suon-xao-chua-ngot.jpg', 45, 4, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(5, 4, 'Bò xào hành tây', 'bo-xao-hanh-tay', 'Thịt bò mềm xào nhanh cùng hành tây.', '/images/foods/bo-xao-hanh-tay.jpg', 25, 3, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(6, 5, 'Trứng chiên hành', 'trung-chien-hanh', 'Trứng chiên đơn giản cùng hành lá.', '/images/foods/trung-chien-hanh.jpg', 15, 2, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(7, 5, 'Cá chiên nước mắm', 'ca-chien-nuoc-mam', 'Cá chiên vàng kết hợp sốt nước mắm.', '/images/foods/ca-chien-nuoc-mam.jpg', 35, 4, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(8, 2, 'Canh chua cá lóc', 'canh-chua-ca-loc', 'Món canh chua thanh mát với cá lóc.', '/images/foods/canh-chua-ca-loc.jpg', 40, 4, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(9, 2, 'Canh bí đỏ thịt bằm', 'canh-bi-do-thit-bam', 'Canh bí đỏ nấu cùng thịt heo bằm.', '/images/foods/canh-bi-do-thit-bam.jpg', 30, 4, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(10, 2, 'Canh cải thịt bằm', 'canh-cai-thit-bam', 'Cải xanh nấu cùng thịt bằm.', '/images/foods/canh-cai-thit-bam.jpg', 25, 4, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(11, 2, 'Canh cà chua trứng', 'canh-ca-chua-trung', 'Món canh nhanh với cà chua và trứng.', '/images/foods/canh-ca-chua-trung.jpg', 20, 3, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(12, 3, 'Rau muống xào tỏi', 'rau-muong-xao-toi', 'Rau muống xanh giòn xào thơm với tỏi.', '/images/foods/rau-muong-xao-toi.jpg', 15, 3, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(13, 3, 'Cải thìa xào tỏi', 'cai-thia-xao-toi', 'Cải thìa xào tỏi đơn giản và dễ nấu.', '/images/foods/cai-thia-xao-toi.jpg', 15, 3, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(14, 3, 'Đậu que xào tỏi', 'dau-que-xao-toi', 'Đậu que xào tỏi giòn và thơm.', '/images/foods/dau-que-xao-toi.jpg', 20, 3, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(15, 6, 'Rau củ luộc', 'rau-cu-luoc', 'Rau củ luộc đơn giản dùng trong bữa cơm gia đình.', '/images/foods/rau-cu-luoc.jpg', 20, 4, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(16, 6, 'Thịt ba chỉ luộc', 'thit-ba-chi-luoc', 'Thịt ba chỉ luộc mềm dùng cùng nước mắm.', '/images/foods/thit-ba-chi-luoc.jpg', 35, 4, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(17, 1, 'Đậu hũ sốt cà chua', 'dau-hu-sot-ca-chua', 'Đậu hũ mềm sốt cùng cà chua.', '/images/foods/dau-hu-sot-ca-chua.jpg', 25, 3, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(18, 5, 'Gà chiên nước mắm', 'ga-chien-nuoc-mam', 'Gà chiên vàng phủ sốt nước mắm tỏi.', '/images/foods/ga-chien-nuoc-mam.jpg', 40, 4, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(19, 2, 'Canh rau ngót thịt bằm', 'canh-rau-ngot-thit-bam', 'Rau ngót nấu thịt bằm ngọt nước, dễ ăn cho bữa cơm gia đình.', '/images/foods/canh-rau-ngot-thit-bam.jpg', 25, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(20, 2, 'Canh mướp tôm', 'canh-muop-tom', 'Canh mướp nấu tôm thanh ngọt, hợp những ngày cần món nhẹ bụng.', '/images/foods/canh-muop-tom.jpg', 20, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(21, 2, 'Canh khổ qua nhồi thịt', 'canh-kho-qua-nhoi-thit', 'Khổ qua nhồi thịt nấu mềm, vị đắng nhẹ và nước dùng trong.', '/images/foods/canh-kho-qua-nhoi-thit.jpg', 45, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(22, 2, 'Canh bí xanh tôm', 'canh-bi-xanh-tom', 'Bí xanh mềm mát nấu cùng tôm, nước canh ngọt tự nhiên.', '/images/foods/canh-bi-xanh-tom.jpg', 25, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(23, 2, 'Canh rong biển đậu hũ', 'canh-rong-bien-dau-hu', 'Rong biển và đậu hũ mềm tạo món canh nhẹ, nhanh và thanh.', '/images/foods/canh-rong-bien-dau-hu.jpg', 15, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(24, 2, 'Canh khoai mỡ thịt bằm', 'canh-khoai-mo-thit-bam', 'Khoai mỡ sánh mềm nấu thịt bằm, thơm béo và dễ ăn.', '/images/foods/canh-khoai-mo-thit-bam.jpg', 30, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(25, 2, 'Canh cải chua sườn', 'canh-cai-chua-suon', 'Cải chua nấu sườn có vị chua dịu, ăn rất bắt cơm.', '/images/foods/canh-cai-chua-suon.jpg', 40, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(26, 7, 'Cá lóc kho tiêu', 'ca-loc-kho-tieu', 'Cá lóc kho tiêu cay thơm, nước kho sánh đậm vị.', '/images/foods/ca-loc-kho-tieu.jpg', 45, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(27, 7, 'Thịt kho mắm ruốc', 'thit-kho-mam-ruoc', 'Thịt ba chỉ kho mắm ruốc thơm sả, mặn ngọt đậm đà.', '/images/foods/thit-kho-mam-ruoc.jpg', 35, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(28, 7, 'Tôm rim thịt ba chỉ', 'tom-rim-thit-ba-chi', 'Tôm rim cùng thịt ba chỉ có màu đẹp, vị mặn ngọt hài hòa.', '/images/foods/tom-rim-thit-ba-chi.jpg', 30, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(29, 7, 'Sườn kho thơm', 'suon-kho-thom', 'Sườn kho thơm mềm, vị chua ngọt nhẹ rất đưa cơm.', '/images/foods/suon-kho-thom.jpg', 40, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(30, 7, 'Bò kho cà rốt', 'bo-kho-ca-rot', 'Bò kho cà rốt thơm mềm, dùng với cơm hoặc bánh mì đều ngon.', '/images/foods/bo-kho-ca-rot.jpg', 60, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(31, 7, 'Cá basa kho nghệ', 'ca-basa-kho-nghe', 'Cá basa kho nghệ có màu vàng đẹp, thơm và ít tanh.', '/images/foods/ca-basa-kho-nghe.jpg', 35, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(32, 7, 'Gà kho sả ớt', 'ga-kho-sa-ot', 'Gà kho sả ớt thơm cay nhẹ, hợp bữa cơm ngày mưa.', '/images/foods/ga-kho-sa-ot.jpg', 40, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(33, 4, 'Mực xào cần tây', 'muc-xao-can-tay', 'Mực xào cần tây giòn ngọt, thơm mùi rau cần và hành tây.', '/images/foods/muc-xao-can-tay.jpg', 20, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(34, 4, 'Tôm xào bông cải', 'tom-xao-bong-cai', 'Tôm xào bông cải xanh giòn, màu sắc bắt mắt và giàu dinh dưỡng.', '/images/foods/tom-xao-bong-cai.jpg', 25, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(35, 4, 'Gà xào mướp', 'ga-xao-muop', 'Thịt gà xào mướp mềm ngọt, chế biến nhanh cho bữa tối.', '/images/foods/ga-xao-muop.jpg', 25, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(36, 4, 'Bò xào bông cải', 'bo-xao-bong-cai', 'Bò xào bông cải mềm giòn, món nhanh gọn cho ngày bận.', '/images/foods/bo-xao-bong-cai.jpg', 25, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(37, 4, 'Nui xào bò', 'nui-xao-bo', 'Nui xào bò sốt cà chua là món no bụng, hợp cả bữa sáng.', '/images/foods/nui-xao-bo.jpg', 30, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(38, 4, 'Cải chua xào trứng', 'cai-chua-xao-trung', 'Cải chua xào trứng chua nhẹ, béo thơm và rất nhanh.', '/images/foods/cai-chua-xao-trung.jpg', 15, 2, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(39, 3, 'Mướp xào tỏi', 'muop-xao-toi', 'Mướp xào tỏi mềm ngọt, món rau đơn giản cho bữa cơm.', '/images/foods/muop-xao-toi.jpg', 15, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(40, 5, 'Đậu hũ chiên sả', 'dau-hu-chien-sa', 'Đậu hũ chiên vàng áo sả thơm, ăn kèm nước tương rất hợp.', '/images/foods/dau-hu-chien-sa.jpg', 20, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(41, 5, 'Chả cá chiên thì là', 'cha-ca-chien-thi-la', 'Chả cá chiên thơm thì là, bên ngoài vàng giòn bên trong dai mềm.', '/images/foods/cha-ca-chien-thi-la.jpg', 25, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(42, 5, 'Tôm chiên bột', 'tom-chien-bot', 'Tôm chiên bột giòn rụm, phù hợp làm món mặn hoặc ăn chơi.', '/images/foods/tom-chien-bot.jpg', 25, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(43, 5, 'Cánh gà chiên giòn', 'canh-ga-chien-gion', 'Cánh gà chiên giòn vàng, thịt bên trong mềm ngọt.', '/images/foods/ga-chien-nuoc-mam.jpg', 35, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(44, 5, 'Trứng chiên thịt bằm', 'trung-chien-thit-bam', 'Trứng chiên thịt bằm mềm thơm, dễ làm và rất hao cơm.', '/images/foods/trung-chien-thit-bam.jpg', 15, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(45, 5, 'Cá rô phi chiên giòn', 'ca-ro-phi-chien-gion', 'Cá rô phi chiên giòn, chấm nước mắm tỏi ớt rất ngon.', '/images/foods/ca-chien-nuoc-mam.jpg', 30, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(46, 6, 'Bầu luộc chấm trứng', 'bau-luoc-cham-trung', 'Bầu luộc mềm ngọt, ăn cùng trứng luộc và nước mắm rất thanh.', '/images/foods/bau-luoc-cham-trung.jpg', 20, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(47, 6, 'Rau lang luộc', 'rau-lang-luoc', 'Rau lang luộc xanh mềm, món rau dân dã cho bữa cơm nhà.', '/images/foods/rau-lang-luoc.jpg', 15, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(48, 6, 'Gà luộc lá chanh', 'ga-luoc-la-chanh', 'Gà luộc da vàng, thịt ngọt, rắc lá chanh thơm nhẹ.', '/images/foods/ga-luoc-la-chanh.jpg', 45, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(49, 6, 'Thịt heo luộc cuốn rau', 'thit-heo-luoc-cuon-rau', 'Thịt heo luộc cuốn rau sống, chấm mắm nêm hoặc nước mắm chua ngọt.', '/images/foods/thit-heo-luoc-cuon-rau.jpg', 35, 4, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(50, 6, 'Bắp cải luộc', 'bap-cai-luoc', 'Bắp cải luộc ngọt giòn, món rau nhanh cho mọi bữa cơm.', '/images/foods/bap-cai-luoc.jpg', 15, 3, 'active', '2026-10-14 00:00:00', '2026-10-14 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `food_ingredients`
--

CREATE TABLE `food_ingredients` (
  `id_food_ingredient` int UNSIGNED NOT NULL,
  `id_food` int UNSIGNED NOT NULL,
  `id_ingredient` int UNSIGNED NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ;

--
-- Dumping data for table `food_ingredients`
--

INSERT INTO `food_ingredients` (`id_food_ingredient`, `id_food`, `id_ingredient`, `quantity`, `note`) VALUES
(28, 6, 2, 4.00, NULL),
(32, 7, 8, 500.00, NULL),
(37, 8, 17, 500.00, NULL),
(39, 8, 19, 200.00, NULL),
(40, 8, 13, 150.00, NULL),
(41, 8, 20, 100.00, NULL),
(43, 9, 21, 400.00, NULL),
(44, 9, 22, 200.00, NULL),
(48, 10, 23, 400.00, NULL),
(49, 10, 22, 200.00, NULL),
(53, 11, 19, 300.00, NULL),
(54, 11, 2, 3.00, NULL),
(58, 12, 24, 500.00, NULL),
(62, 13, 26, 500.00, NULL),
(66, 14, 27, 500.00, NULL),
(70, 15, 28, 200.00, NULL),
(71, 15, 29, 300.00, NULL),
(72, 15, 27, 200.00, NULL),
(74, 16, 1, 500.00, NULL),
(78, 17, 30, 4.00, NULL),
(79, 17, 19, 300.00, NULL),
(83, 18, 10, 600.00, NULL),
(88, 1, 1, 500.00, NULL),
(89, 1, 2, 4.00, NULL),
(90, 2, 8, 500.00, NULL),
(91, 3, 10, 600.00, NULL),
(92, 4, 11, 500.00, NULL),
(93, 4, 19, 200.00, NULL),
(94, 4, 13, 150.00, NULL),
(95, 4, 14, 100.00, NULL),
(96, 4, 12, 100.00, NULL),
(97, 5, 15, 400.00, NULL),
(98, 5, 14, 200.00, NULL),
(99, 19, 31, 300.00, NULL),
(100, 19, 22, 150.00, NULL),
(101, 20, 32, 300.00, NULL),
(102, 20, 33, 200.00, NULL),
(103, 21, 34, 400.00, NULL),
(104, 21, 22, 250.00, NULL),
(105, 21, 35, 50.00, NULL),
(106, 22, 36, 400.00, NULL),
(107, 22, 33, 150.00, NULL),
(108, 23, 37, 30.00, NULL),
(109, 23, 30, 2.00, NULL),
(110, 24, 38, 400.00, NULL),
(111, 24, 22, 150.00, NULL),
(112, 25, 39, 300.00, NULL),
(113, 25, 11, 300.00, NULL),
(114, 26, 17, 500.00, NULL),
(115, 26, 40, 5.00, NULL),
(116, 26, 41, 20.00, NULL),
(117, 27, 1, 500.00, NULL),
(118, 27, 42, 30.00, NULL),
(119, 27, 43, 40.00, NULL),
(120, 28, 33, 300.00, NULL),
(121, 28, 1, 200.00, NULL),
(122, 29, 11, 500.00, NULL),
(123, 29, 13, 200.00, NULL),
(124, 30, 15, 500.00, NULL),
(125, 30, 28, 300.00, NULL),
(126, 30, 43, 30.00, NULL),
(127, 31, 8, 500.00, NULL),
(128, 31, 44, 30.00, NULL),
(129, 32, 10, 600.00, NULL),
(130, 32, 43, 50.00, NULL),
(131, 32, 12, 100.00, NULL),
(132, 33, 45, 400.00, NULL),
(133, 33, 46, 150.00, NULL),
(134, 33, 14, 100.00, NULL),
(135, 34, 33, 300.00, NULL),
(136, 34, 29, 300.00, NULL),
(137, 34, 28, 100.00, NULL),
(138, 35, 10, 350.00, NULL),
(139, 35, 32, 300.00, NULL),
(140, 36, 15, 400.00, NULL),
(141, 36, 29, 300.00, NULL),
(142, 37, 47, 250.00, NULL),
(143, 37, 15, 250.00, NULL),
(144, 37, 19, 150.00, NULL),
(145, 38, 39, 300.00, NULL),
(146, 38, 2, 3.00, NULL),
(147, 39, 32, 400.00, NULL),
(148, 39, 48, 20.00, NULL),
(149, 40, 30, 4.00, NULL),
(150, 40, 43, 40.00, NULL),
(151, 41, 49, 400.00, NULL),
(152, 41, 50, 30.00, NULL),
(153, 42, 33, 400.00, NULL),
(154, 42, 51, 150.00, NULL),
(155, 43, 52, 600.00, NULL),
(156, 43, 51, 150.00, NULL),
(157, 44, 2, 4.00, NULL),
(158, 44, 22, 150.00, NULL),
(159, 45, 53, 600.00, NULL),
(160, 46, 54, 500.00, NULL),
(161, 46, 2, 2.00, NULL),
(162, 47, 55, 500.00, NULL),
(163, 48, 10, 800.00, NULL),
(164, 48, 56, 10.00, NULL),
(165, 49, 1, 500.00, NULL),
(166, 49, 57, 200.00, NULL),
(167, 49, 58, 200.00, NULL),
(168, 50, 59, 500.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id_ingredient` int UNSIGNED NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id_ingredient`, `name`, `unit`, `created_at`, `updated_at`) VALUES
(1, 'Thịt ba chỉ', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(2, 'Trứng gà', 'quả', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(8, 'Cá basa', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(10, 'Thịt gà', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(11, 'Sườn non', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(12, 'Ớt chuông', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(13, 'Thơm', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(14, 'Hành tây', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(15, 'Thịt bò', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(17, 'Cá lóc', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(19, 'Cà chua', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(20, 'Giá đỗ', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(21, 'Bí đỏ', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(22, 'Thịt heo bằm', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(23, 'Cải xanh', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(24, 'Rau muống', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(26, 'Cải thìa', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(27, 'Đậu que', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(28, 'Cà rốt', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(29, 'Bông cải xanh', 'g', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(30, 'Đậu hũ', 'miếng', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(31, 'Rau ngót', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(32, 'Mướp', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(33, 'Tôm', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(34, 'Khổ qua', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(35, 'Bún tàu', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(36, 'Bí xanh', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(37, 'Rong biển', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(38, 'Khoai mỡ', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(39, 'Cải chua', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(40, 'Tiêu', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(41, 'Hành tím', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(42, 'Mắm ruốc', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(43, 'Sả', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(44, 'Nghệ', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(45, 'Mực', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(46, 'Cần tây', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(47, 'Nui', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(48, 'Tỏi', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(49, 'Chả cá', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(50, 'Thì là', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(51, 'Bột chiên giòn', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(52, 'Cánh gà', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(53, 'Cá rô phi', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(54, 'Bầu', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(55, 'Rau lang', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(56, 'Lá chanh', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(57, 'Dưa leo', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(58, 'Xà lách', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00'),
(59, 'Bắp cải', 'g', '2026-10-14 00:00:00', '2026-10-14 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id_notification` int UNSIGNED NOT NULL,
  `id_user` int UNSIGNED NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id_notification`, `id_user`, `type`, `title`, `message`, `is_read`, `created_at`) VALUES
(1, 2, 'like', 'Bài viết có lượt thích mới', 'Có người vừa thả tim bài viết Thịt kho trứng của bạn.', 0, '2026-10-05 14:52:03'),
(2, 2, 'comment', 'Bình luận mới', 'Có người vừa bình luận bài viết của bạn.', 0, '2026-10-05 14:52:03'),
(3, 3, 'system', 'Chào mừng bạn', 'Chào mừng bạn đến với Hôm Nay Ăn Gì.', 1, '2026-10-05 14:52:03'),
(4, 4, 'system', 'Gợi ý món ăn', 'Hôm nay bạn có thể thử món Canh bí đỏ thịt bằm.', 0, '2026-10-05 14:52:03'),
(5, 5, 'like', 'Bài viết có lượt thích mới', 'Bài viết Đậu hũ sốt cà của bạn vừa nhận được lượt thích.', 0, '2026-10-05 14:52:03');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id_post` int UNSIGNED NOT NULL,
  `id_user` int UNSIGNED NOT NULL,
  `id_food` int UNSIGNED DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','hidden') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id_post`, `id_user`, `id_food`, `title`, `content`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'Hôm nay mình nấu thịt kho trứng', 'Lần đầu mình thử nấu thịt kho trứng với nước dừa. Thịt mềm và vị khá đậm đà.', '/images/posts/post-thit-kho-trung.jpg', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(2, 3, 12, 'Rau muống xào tỏi đơn giản', 'Món này làm rất nhanh, phù hợp khi không có nhiều thời gian nấu ăn.', '/images/posts/post-rau-muong.jpg', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(3, 4, 8, 'Bữa cơm với canh chua cá', 'Canh chua cá là món mình rất thích vì dễ ăn và phù hợp với những ngày nóng.', '/images/posts/post-canh-chua.jpg', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(4, 5, 17, 'Đậu hũ sốt cà cho bữa cơm tiết kiệm', 'Một món khá đơn giản, nguyên liệu rẻ nhưng vẫn rất ngon.', '/images/posts/post-dau-hu.jpg', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03');

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `id_post_like` int UNSIGNED NOT NULL,
  `id_post` int UNSIGNED NOT NULL,
  `id_user` int UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_likes`
--

INSERT INTO `post_likes` (`id_post_like`, `id_post`, `id_user`, `created_at`) VALUES
(1, 1, 3, '2026-10-05 14:52:03'),
(2, 1, 4, '2026-10-05 14:52:03'),
(3, 1, 5, '2026-10-05 14:52:03'),
(4, 2, 2, '2026-10-05 14:52:03'),
(5, 2, 4, '2026-10-05 14:52:03'),
(6, 3, 2, '2026-10-05 14:52:03'),
(7, 3, 3, '2026-10-05 14:52:03'),
(8, 3, 5, '2026-10-05 14:52:03'),
(9, 4, 2, '2026-10-05 14:52:03'),
(10, 4, 3, '2026-10-05 14:52:03');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_steps`
--

CREATE TABLE `recipe_steps` (
  `id_recipe_step` int UNSIGNED NOT NULL,
  `id_food` int UNSIGNED NOT NULL,
  `step_number` smallint UNSIGNED NOT NULL,
  `instruction` text COLLATE utf8mb4_unicode_ci NOT NULL
) ;

--
-- Dumping data for table `recipe_steps`
--

INSERT INTO `recipe_steps` (`id_recipe_step`, `id_food`, `step_number`, `instruction`) VALUES
(1, 1, 1, 'Luộc trứng, bóc vỏ và cắt thịt ba chỉ thành miếng vừa ăn.'),
(2, 1, 2, 'Ướp thịt với nước mắm, đường, hành tím và tiêu khoảng 20 phút.'),
(3, 1, 3, 'Cho thịt, trứng và nước dừa vào nồi, kho nhỏ lửa đến khi thịt mềm.'),
(4, 2, 1, 'Rửa sạch cá và cắt thành khúc.'),
(5, 2, 2, 'Ướp cá với nước mắm, hành tím, đường và tiêu.'),
(6, 2, 3, 'Kho cá trên lửa nhỏ đến khi nước kho sánh lại.'),
(7, 3, 1, 'Rửa sạch gà và cắt thành miếng vừa ăn.'),
(8, 3, 2, 'Ướp gà với nước mắm, gừng, hành tím và đường.'),
(9, 3, 3, 'Kho gà đến khi thịt mềm và nước kho sệt lại.'),
(10, 4, 1, 'Sơ chế sườn và chần sơ với nước nóng.'),
(11, 4, 2, 'Chiên sơ sườn đến khi mặt ngoài vàng.'),
(12, 4, 3, 'Xào sườn cùng cà chua, thơm, hành tây và ớt chuông.'),
(13, 5, 1, 'Thịt bò thái mỏng và ướp gia vị.'),
(14, 5, 2, 'Phi thơm tỏi rồi xào nhanh thịt bò trên lửa lớn.'),
(15, 5, 3, 'Cho hành tây vào đảo đều rồi tắt bếp.'),
(16, 6, 1, 'Đập trứng vào tô và cho hành lá vào.'),
(17, 6, 2, 'Thêm nước mắm rồi đánh đều hỗn hợp.'),
(18, 6, 3, 'Cho dầu vào chảo và chiên trứng vàng đều hai mặt.'),
(19, 7, 1, 'Làm sạch cá và để ráo nước.'),
(20, 7, 2, 'Chiên cá đến khi vàng giòn.'),
(21, 7, 3, 'Làm sốt nước mắm tỏi đường rồi rưới lên cá.'),
(22, 8, 1, 'Làm sạch cá và chuẩn bị cà chua, thơm, giá đỗ.'),
(23, 8, 2, 'Nấu nước với me rồi cho cá vào nấu chín.'),
(24, 8, 3, 'Cho rau củ vào, nêm gia vị rồi tắt bếp.'),
(25, 9, 1, 'Gọt bí đỏ và cắt thành miếng vừa ăn.'),
(26, 9, 2, 'Xào sơ thịt bằm rồi cho nước vào nấu.'),
(27, 9, 3, 'Cho bí đỏ vào nấu mềm và nêm gia vị.'),
(28, 10, 1, 'Rửa sạch cải xanh và cắt vừa ăn.'),
(29, 10, 2, 'Xào sơ thịt bằm rồi thêm nước.'),
(30, 10, 3, 'Cho cải vào nấu chín và nêm gia vị.'),
(31, 11, 1, 'Cắt cà chua thành múi và đánh đều trứng.'),
(32, 11, 2, 'Xào cà chua rồi thêm nước vào đun sôi.'),
(33, 11, 3, 'Cho từ từ trứng vào, khuấy nhẹ và nêm gia vị.'),
(34, 12, 1, 'Nhặt và rửa sạch rau muống.'),
(35, 12, 2, 'Phi thơm tỏi với dầu ăn.'),
(36, 12, 3, 'Cho rau muống vào xào nhanh trên lửa lớn.'),
(37, 13, 1, 'Rửa sạch cải thìa và để ráo.'),
(38, 13, 2, 'Phi thơm tỏi với dầu ăn.'),
(39, 13, 3, 'Xào cải thìa trên lửa lớn và nêm gia vị.'),
(40, 14, 1, 'Rửa sạch đậu que và cắt khúc.'),
(41, 14, 2, 'Phi thơm tỏi rồi cho đậu que vào.'),
(42, 14, 3, 'Xào đến khi đậu chín và nêm gia vị.'),
(43, 15, 1, 'Rửa sạch và cắt rau củ thành miếng vừa ăn.'),
(44, 15, 2, 'Đun sôi nước và thêm một ít muối.'),
(45, 15, 3, 'Cho rau củ vào luộc vừa chín rồi vớt ra.'),
(46, 16, 1, 'Rửa sạch thịt ba chỉ.'),
(47, 16, 2, 'Đun nước cùng gừng và một ít muối.'),
(48, 16, 3, 'Luộc thịt chín rồi để nguội và thái lát.'),
(49, 17, 1, 'Cắt đậu hũ thành miếng và chiên sơ.'),
(50, 17, 2, 'Xào cà chua đến khi mềm.'),
(51, 17, 3, 'Cho đậu hũ vào sốt cà chua và nêm gia vị.'),
(52, 18, 1, 'Rửa sạch gà và để ráo.'),
(53, 18, 2, 'Chiên gà đến khi vàng giòn.'),
(54, 18, 3, 'Đảo gà với sốt nước mắm, đường và tỏi.'),
(55, 19, 1, 'Rửa sạch rau ngót, vò nhẹ cho rau mềm và thịt bằm ướp ít nước mắm.'),
(56, 19, 2, 'Phi thơm hành, xào thịt bằm săn rồi thêm nước vào đun sôi.'),
(57, 19, 3, 'Cho rau ngót vào nấu chín, nêm vừa ăn rồi tắt bếp.'),
(58, 20, 1, 'Gọt mướp, cắt miếng vừa ăn; tôm bóc vỏ và ướp nhẹ.'),
(59, 20, 2, 'Xào sơ tôm cho thơm rồi thêm nước vào đun sôi.'),
(60, 20, 3, 'Cho mướp vào nấu vừa chín, nêm gia vị và dùng nóng.'),
(61, 21, 1, 'Làm sạch khổ qua, bỏ ruột; trộn thịt bằm với bún tàu và gia vị.'),
(62, 21, 2, 'Nhồi nhân vào khổ qua rồi cho vào nồi nước đang sôi.'),
(63, 21, 3, 'Hầm đến khi khổ qua mềm, nêm lại nước dùng cho vừa ăn.'),
(64, 22, 1, 'Gọt bí xanh, cắt lát; tôm làm sạch và băm hoặc để nguyên con.'),
(65, 22, 2, 'Xào sơ tôm rồi thêm nước vào nấu sôi.'),
(66, 22, 3, 'Cho bí xanh vào nấu mềm, nêm gia vị và rắc tiêu nếu thích.'),
(67, 23, 1, 'Ngâm rong biển cho nở, rửa sạch; cắt đậu hũ thành miếng nhỏ.'),
(68, 23, 2, 'Đun nước dùng, cho đậu hũ vào nấu nhẹ lửa.'),
(69, 23, 3, 'Thêm rong biển, nêm vừa ăn và tắt bếp ngay khi sôi lại.'),
(70, 24, 1, 'Gọt khoai mỡ, bào hoặc đập dập; thịt bằm ướp ít gia vị.'),
(71, 24, 2, 'Xào thịt bằm cho săn rồi thêm nước vào đun sôi.'),
(72, 24, 3, 'Cho khoai mỡ vào khuấy nhẹ đến khi canh sánh và chín mềm.'),
(73, 25, 1, 'Chần sườn qua nước sôi, rửa sạch bọt; cải chua cắt vừa ăn.'),
(74, 25, 2, 'Hầm sườn đến khi mềm và nước dùng ngọt.'),
(75, 25, 3, 'Cho cải chua vào nấu thêm vài phút, nêm lại cho vừa miệng.'),
(76, 26, 1, 'Cá lóc làm sạch, cắt khúc và ướp với nước mắm, tiêu, hành tím.'),
(77, 26, 2, 'Thắng màu nhẹ rồi cho cá vào kho với lửa vừa.'),
(78, 26, 3, 'Kho đến khi nước sánh lại, rắc thêm tiêu và dùng với cơm nóng.'),
(79, 27, 1, 'Thịt ba chỉ thái nhỏ, sả băm nhuyễn và mắm ruốc pha loãng.'),
(80, 27, 2, 'Rang thịt cho ra bớt mỡ rồi cho sả vào đảo thơm.'),
(81, 27, 3, 'Thêm mắm ruốc, đường và chút nước, kho đến khi thịt thấm.'),
(82, 28, 1, 'Tôm rửa sạch, thịt ba chỉ thái mỏng và ướp với nước mắm.'),
(83, 28, 2, 'Rang thịt trước cho săn rồi cho tôm vào đảo đều.'),
(84, 28, 3, 'Rim nhỏ lửa đến khi nước sốt áo đều tôm thịt.'),
(85, 29, 1, 'Chặt sườn vừa ăn, chần sơ và ướp gia vị.'),
(86, 29, 2, 'Áp chảo sườn cho săn rồi thêm thơm và ít nước.'),
(87, 29, 3, 'Kho nhỏ lửa đến khi sườn mềm, nước kho sánh lại.'),
(88, 30, 1, 'Thịt bò cắt miếng, ướp với sả và gia vị bò kho.'),
(89, 30, 2, 'Xào thịt cho săn rồi thêm nước hầm đến khi mềm.'),
(90, 30, 3, 'Cho cà rốt vào nấu chín, nêm lại và dùng nóng.'),
(91, 31, 1, 'Cá basa rửa sạch, cắt khúc và ướp với nghệ, nước mắm.'),
(92, 31, 2, 'Cho cá vào nồi cùng ít nước màu và kho lửa nhỏ.'),
(93, 31, 3, 'Kho đến khi cá thấm, nước kho sệt và thơm mùi nghệ.'),
(94, 32, 1, 'Gà chặt miếng vừa ăn, ướp với sả băm và gia vị.'),
(95, 32, 2, 'Phi thơm sả rồi cho gà vào đảo săn.'),
(96, 32, 3, 'Kho nhỏ lửa đến khi gà chín mềm và nước kho cạn vừa.'),
(97, 33, 1, 'Làm sạch mực, khứa nhẹ và cắt miếng; cần tây cắt khúc.'),
(98, 33, 2, 'Xào mực nhanh trên lửa lớn cho săn.'),
(99, 33, 3, 'Thêm cần tây, hành tây vào đảo đều rồi nêm vừa ăn.'),
(100, 34, 1, 'Bông cải tách nhánh, chần sơ; tôm làm sạch.'),
(101, 34, 2, 'Xào tôm với tỏi cho thơm và vừa chín.'),
(102, 34, 3, 'Cho rau củ vào đảo nhanh, nêm gia vị rồi tắt bếp.'),
(103, 35, 1, 'Thịt gà thái miếng mỏng, ướp với chút nước mắm.'),
(104, 35, 2, 'Xào gà cho săn rồi cho mướp vào đảo đều.'),
(105, 35, 3, 'Nêm lại gia vị, xào đến khi mướp vừa chín tới.'),
(106, 36, 1, 'Thịt bò thái mỏng, ướp dầu hào và tiêu; bông cải chần sơ.'),
(107, 36, 2, 'Xào bò nhanh trên lửa lớn rồi trút ra.'),
(108, 36, 3, 'Xào bông cải, cho bò vào đảo lại và nêm vừa ăn.'),
(109, 37, 1, 'Luộc nui vừa chín tới, xả nước lạnh và để ráo.'),
(110, 37, 2, 'Xào bò với cà chua cho thành sốt nhẹ.'),
(111, 37, 3, 'Cho nui vào đảo đều, nêm lại và dùng khi còn nóng.'),
(112, 38, 1, 'Rửa cải chua cho bớt mặn rồi cắt nhỏ.'),
(113, 38, 2, 'Xào cải chua cho ráo và thơm.'),
(114, 38, 3, 'Đổ trứng đã đánh vào, đảo đều đến khi trứng chín.'),
(115, 39, 1, 'Gọt mướp, cắt lát vừa ăn; tỏi băm nhỏ.'),
(116, 39, 2, 'Phi thơm tỏi với ít dầu ăn.'),
(117, 39, 3, 'Cho mướp vào xào nhanh, nêm vừa ăn và tắt bếp.'),
(118, 40, 1, 'Cắt đậu hũ miếng vừa ăn và để ráo nước.'),
(119, 40, 2, 'Chiên đậu hũ vàng đều các mặt.'),
(120, 40, 3, 'Phi sả thơm, đảo đậu hũ với sả và chút gia vị.'),
(121, 41, 1, 'Trộn chả cá với thì là cắt nhỏ và chút tiêu.'),
(122, 41, 2, 'Nặn thành miếng vừa ăn.'),
(123, 41, 3, 'Chiên ngập dầu vừa đến khi chả cá vàng thơm.'),
(124, 42, 1, 'Tôm bóc vỏ, chừa đuôi và thấm khô.'),
(125, 42, 2, 'Pha bột chiên giòn theo hướng dẫn, nhúng tôm vào bột.'),
(126, 42, 3, 'Chiên tôm trong dầu nóng đến khi vàng giòn.'),
(127, 43, 1, 'Cánh gà rửa sạch, khứa nhẹ và ướp gia vị.'),
(128, 43, 2, 'Áo cánh gà với bột chiên giòn.'),
(129, 43, 3, 'Chiên lửa vừa đến khi cánh gà chín vàng đều.'),
(130, 44, 1, 'Đánh trứng với thịt bằm, hành lá và gia vị.'),
(131, 44, 2, 'Làm nóng chảo dầu rồi đổ hỗn hợp trứng vào.'),
(132, 44, 3, 'Chiên vàng hai mặt, cắt miếng và dùng nóng.'),
(133, 45, 1, 'Làm sạch cá, khứa vài đường và thấm khô.'),
(134, 45, 2, 'Ướp cá với ít muối rồi chiên trong dầu nóng.'),
(135, 45, 3, 'Chiên đến khi cá vàng giòn hai mặt và để ráo dầu.'),
(136, 46, 1, 'Gọt bầu, cắt miếng vừa ăn; luộc trứng chín.'),
(137, 46, 2, 'Đun sôi nước, cho bầu vào luộc vừa chín.'),
(138, 46, 3, 'Vớt bầu ra, dùng cùng trứng luộc và nước chấm.'),
(139, 47, 1, 'Nhặt rau lang, rửa nhiều lần cho sạch đất cát.'),
(140, 47, 2, 'Đun nước thật sôi rồi cho rau vào luộc.'),
(141, 47, 3, 'Vớt rau khi vừa chín, giữ nước luộc làm canh nếu thích.'),
(142, 48, 1, 'Rửa sạch gà, cho vào nồi cùng nước và ít muối.'),
(143, 48, 2, 'Luộc lửa vừa đến khi gà chín, ủ thêm vài phút.'),
(144, 48, 3, 'Chặt gà ra đĩa, rắc lá chanh thái chỉ lên trên.'),
(145, 49, 1, 'Luộc thịt ba chỉ với ít muối và hành tím đến khi chín.'),
(146, 49, 2, 'Thái thịt mỏng, rửa sạch rau sống và dưa leo.'),
(147, 49, 3, 'Cuốn thịt với rau, dùng cùng nước chấm tùy thích.'),
(148, 50, 1, 'Tách bắp cải, rửa sạch và cắt miếng vừa ăn.'),
(149, 50, 2, 'Đun sôi nước với chút muối rồi cho bắp cải vào.'),
(150, 50, 3, 'Luộc vừa chín, vớt ra để ráo và dùng nóng.');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id_report` int UNSIGNED NOT NULL,
  `id_user` int UNSIGNED DEFAULT NULL,
  `target_type` enum('post','comment') COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_id` int UNSIGNED NOT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','resolved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id_report`, `id_user`, `target_type`, `target_id`, `reason`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'comment', 4, 'Nội dung không phù hợp', 'Người dùng yêu cầu Admin kiểm tra bình luận này.', 'pending', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(2, 3, 'post', 4, 'Thông tin cần kiểm tra', 'Yêu cầu kiểm tra nội dung bài viết.', 'resolved', '2026-10-05 14:52:03', '2026-10-05 14:52:03');

-- --------------------------------------------------------

--
-- Table structure for table `shopping_lists`
--

CREATE TABLE `shopping_lists` (
  `id_shopping_list` int UNSIGNED NOT NULL,
  `id_user` int UNSIGNED NOT NULL,
  `id_food` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shopping_lists`
--

INSERT INTO `shopping_lists` (`id_shopping_list`, `id_user`, `id_food`, `created_at`) VALUES
(1, 2, 1, '2026-10-05 14:52:03'),
(2, 3, 8, '2026-10-05 14:52:03'),
(3, 4, 17, '2026-10-05 14:52:03');

-- --------------------------------------------------------

--
-- Table structure for table `shopping_list_items`
--

CREATE TABLE `shopping_list_items` (
  `id_shopping_list_item` int UNSIGNED NOT NULL,
  `id_shopping_list` int UNSIGNED NOT NULL,
  `id_ingredient` int UNSIGNED NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `unit` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_checked` tinyint(1) NOT NULL DEFAULT '0'
) ;

--
-- Dumping data for table `shopping_list_items`
--

INSERT INTO `shopping_list_items` (`id_shopping_list_item`, `id_shopping_list`, `id_ingredient`, `quantity`, `unit`, `is_checked`) VALUES
(1, 1, 1, 500.00, 'g', 0),
(2, 1, 2, 5.00, 'quả', 0),
(5, 2, 17, 500.00, 'g', 0),
(7, 2, 19, 200.00, 'g', 0),
(8, 2, 13, 150.00, 'g', 1),
(9, 3, 30, 4.00, 'miếng', 0),
(10, 3, 19, 300.00, 'g', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `status` enum('active','blocked') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `name`, `email`, `password`, `avatar`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', '123456', '/images/users/admin.jpg', 'admin', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(2, 'Nguyễn Văn An', 'an@gmail.com', '123456', '/images/users/nguyen-van-an.jpg', 'user', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(3, 'Trần Minh', 'minh@gmail.com', '123456', '/images/users/tran-minh.jpg', 'user', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(4, 'Lê Thu Hương', 'huong@gmail.com', '123456', '/images/users/le-thu-huong.jpg', 'user', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(5, 'Phạm Hoàng Nam', 'nam@gmail.com', '123456', '/images/users/pham-hoang-nam.jpg', 'user', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`),
  ADD UNIQUE KEY `uq_categories_name` (`name`),
  ADD UNIQUE KEY `uq_categories_slug` (`slug`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `fk_comments_post` (`id_post`),
  ADD KEY `fk_comments_user` (`id_user`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id_favorite`),
  ADD UNIQUE KEY `uq_user_favorite_food` (`id_user`,`id_food`),
  ADD KEY `fk_favorites_food` (`id_food`);

--
-- Indexes for table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id_food`),
  ADD UNIQUE KEY `uq_foods_slug` (`slug`),
  ADD KEY `fk_foods_category` (`id_category`);

--
-- Indexes for table `food_ingredients`
--
ALTER TABLE `food_ingredients`
  ADD PRIMARY KEY (`id_food_ingredient`),
  ADD UNIQUE KEY `uq_food_ingredient` (`id_food`,`id_ingredient`),
  ADD KEY `fk_food_ingredients_ingredient` (`id_ingredient`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id_ingredient`),
  ADD UNIQUE KEY `uq_ingredients_name` (`name`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id_notification`),
  ADD KEY `fk_notifications_user` (`id_user`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id_post`),
  ADD KEY `fk_posts_user` (`id_user`),
  ADD KEY `fk_posts_food` (`id_food`);

--
-- Indexes for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`id_post_like`),
  ADD UNIQUE KEY `uq_user_post_like` (`id_post`,`id_user`),
  ADD KEY `fk_post_likes_user` (`id_user`);

--
-- Indexes for table `recipe_steps`
--
ALTER TABLE `recipe_steps`
  ADD PRIMARY KEY (`id_recipe_step`),
  ADD UNIQUE KEY `uq_food_step` (`id_food`,`step_number`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id_report`),
  ADD KEY `fk_reports_user` (`id_user`);

--
-- Indexes for table `shopping_lists`
--
ALTER TABLE `shopping_lists`
  ADD PRIMARY KEY (`id_shopping_list`),
  ADD KEY `fk_shopping_lists_user` (`id_user`),
  ADD KEY `fk_shopping_lists_food` (`id_food`);

--
-- Indexes for table `shopping_list_items`
--
ALTER TABLE `shopping_list_items`
  ADD PRIMARY KEY (`id_shopping_list_item`),
  ADD UNIQUE KEY `uq_shopping_ingredient` (`id_shopping_list`,`id_ingredient`),
  ADD KEY `fk_shopping_items_ingredient` (`id_ingredient`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `uq_users_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id_favorite` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id_food` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `food_ingredients`
--
ALTER TABLE `food_ingredients`
  MODIFY `id_food_ingredient` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id_ingredient` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id_notification` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id_post` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id_post_like` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `recipe_steps`
--
ALTER TABLE `recipe_steps`
  MODIFY `id_recipe_step` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id_report` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shopping_lists`
--
ALTER TABLE `shopping_lists`
  MODIFY `id_shopping_list` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shopping_list_items`
--
ALTER TABLE `shopping_list_items`
  MODIFY `id_shopping_list_item` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_post` FOREIGN KEY (`id_post`) REFERENCES `posts` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comments_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `fk_favorites_food` FOREIGN KEY (`id_food`) REFERENCES `foods` (`id_food`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_favorites_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `foods`
--
ALTER TABLE `foods`
  ADD CONSTRAINT `fk_foods_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `food_ingredients`
--
ALTER TABLE `food_ingredients`
  ADD CONSTRAINT `fk_food_ingredients_food` FOREIGN KEY (`id_food`) REFERENCES `foods` (`id_food`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_food_ingredients_ingredient` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredients` (`id_ingredient`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notifications_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_food` FOREIGN KEY (`id_food`) REFERENCES `foods` (`id_food`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_posts_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD CONSTRAINT `fk_post_likes_post` FOREIGN KEY (`id_post`) REFERENCES `posts` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_post_likes_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipe_steps`
--
ALTER TABLE `recipe_steps`
  ADD CONSTRAINT `fk_recipe_steps_food` FOREIGN KEY (`id_food`) REFERENCES `foods` (`id_food`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `fk_reports_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `shopping_lists`
--
ALTER TABLE `shopping_lists`
  ADD CONSTRAINT `fk_shopping_lists_food` FOREIGN KEY (`id_food`) REFERENCES `foods` (`id_food`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_shopping_lists_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shopping_list_items`
--
ALTER TABLE `shopping_list_items`
  ADD CONSTRAINT `fk_shopping_items_ingredient` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredients` (`id_ingredient`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_shopping_items_list` FOREIGN KEY (`id_shopping_list`) REFERENCES `shopping_lists` (`id_shopping_list`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
