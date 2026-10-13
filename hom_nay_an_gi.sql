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
(18, 5, 'Gà chiên nước mắm', 'ga-chien-nuoc-mam', 'Gà chiên vàng phủ sốt nước mắm tỏi.', '/images/foods/ga-chien-nuoc-mam.jpg', 40, 4, 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02');

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
(98, 5, 14, 200.00, NULL);

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
(30, 'Đậu hũ', 'miếng', '2026-10-05 14:52:02', '2026-10-05 14:52:02');

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
  `status` enum('active','hidden','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `hidden_reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id_post`, `id_user`, `id_food`, `title`, `content`, `image`, `status`, `hidden_reason`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'Hôm nay mình nấu thịt kho trứng', 'Lần đầu mình thử nấu thịt kho trứng với nước dừa. Thịt mềm và vị khá đậm đà.', '/images/posts/post-thit-kho-trung.jpg', 'active', NULL, '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(2, 3, 12, 'Rau muống xào tỏi đơn giản', 'Món này làm rất nhanh, phù hợp khi không có nhiều thời gian nấu ăn.', '/images/posts/post-rau-muong.jpg', 'active', NULL, '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(3, 4, 8, 'Bữa cơm với canh chua cá', 'Canh chua cá là món mình rất thích vì dễ ăn và phù hợp với những ngày nóng.', '/images/posts/post-canh-chua.jpg', 'active', NULL, '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(4, 5, 17, 'Đậu hũ sốt cà cho bữa cơm tiết kiệm', 'Một món khá đơn giản, nguyên liệu rẻ nhưng vẫn rất ngon.', '/images/posts/post-dau-hu.jpg', 'active', NULL, '2026-10-05 14:52:03', '2026-10-05 14:52:03');

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
(54, 18, 3, 'Đảo gà với sốt nước mắm, đường và tỏi.');

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
  MODIFY `id_food` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food_ingredients`
--
ALTER TABLE `food_ingredients`
  MODIFY `id_food_ingredient` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id_ingredient` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

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
  MODIFY `id_recipe_step` int UNSIGNED NOT NULL AUTO_INCREMENT;

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
