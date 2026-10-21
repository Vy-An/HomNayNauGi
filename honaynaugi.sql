-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 21, 2026 at 09:43 PM
-- Server version: 10.6.27-MariaDB
-- PHP Version: 8.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `honaynaugi`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id_category` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id_category`, `name`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Món mặn', 'mon-man', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(2, 'Món canh', 'mon-canh', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(3, 'Món rau', 'mon-rau', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(4, 'Món xào', 'mon-xao', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(5, 'Món chiên', 'mon-chien', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(6, 'Món luộc', 'mon-luoc', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(7, 'Món kho', 'mon-kho', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id_comment` int(10) UNSIGNED NOT NULL,
  `id_post` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `status` enum('active','hidden') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id_comment`, `id_post`, `id_user`, `content`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 'Nhìn ngon quá, mình cũng sẽ thử nấu món này.', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(2, 1, 4, 'Bạn kho thịt khoảng bao lâu vậy?', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(3, 2, 2, 'Món này nhanh mà ăn với cơm rất ngon.', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(4, 3, 5, 'Canh chua cá đúng là hợp với thời tiết nóng.', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(5, 4, 3, 'Đậu hũ sốt cà là món mình thường nấu khi cuối tháng.', 'active', '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(6, 1, 2, 'bạn nấu ăn chất lắm\nchất thải', 'active', '2026-10-13 23:07:17', '2026-10-13 23:07:17');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id_favorite` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `id_food` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
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
(9, 5, 18, '2026-10-05 14:52:03'),
(10, 8, 1, '2026-10-13 19:43:14'),
(11, 9, 1, '2026-10-13 20:05:06'),
(12, 10, 18, '2026-10-13 22:53:13'),
(14, 2, 18, '2026-10-13 23:09:38'),
(15, 2, 17, '2026-10-13 23:09:39'),
(16, 2, 16, '2026-10-13 23:09:40'),
(17, 2, 13, '2026-10-13 23:09:41'),
(18, 2, 14, '2026-10-13 23:09:41'),
(19, 2, 15, '2026-10-13 23:09:42'),
(20, 16, 1, '2026-10-15 20:57:08'),
(21, 10, 50, '2026-10-15 23:02:55'),
(22, 8, 18, '2026-10-19 07:50:37');

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `id_food` int(10) UNSIGNED NOT NULL,
  `id_category` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cooking_time` smallint(5) UNSIGNED DEFAULT NULL,
  `servings` tinyint(3) UNSIGNED DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `foods`
--

INSERT INTO `foods` (`id_food`, `id_category`, `name`, `slug`, `description`, `image`, `cooking_time`, `servings`, `status`, `created_at`, `updated_at`) VALUES
(1, 7, 'Thịt kho trứng', 'thit-kho-trung', 'Thịt ba chỉ kho nước dừa mềm, trứng thấm vị và nước kho nâu óng. Thời gian gồm sơ chế, ướp và kho bằng nồi thường; ăn cùng cơm và rau luộc.', '/images/foods/thit-kho-trung.jpg', 95, 4, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(2, 7, 'Cá kho tộ', 'ca-kho-to', 'Cá basa kho trong nồi đáy dày với nước màu, nước mắm và tiêu. Cá giữ nguyên khoanh, nước kho sánh nhẹ, hợp ăn cùng cơm nóng.', '/images/foods/ca-kho-to.jpg', 60, 4, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(3, 7, 'Gà kho gừng', 'ga-kho-gung', 'Gà kho gừng có thịt mềm, thơm gừng và nước kho vừa đủ áo miếng gà. Công thức dùng gà chặt miếng nhỏ để chín đều trong nồi thường.', '/images/foods/ga-kho-gung.jpg', 55, 4, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(4, 4, 'Sườn xào chua ngọt', 'suon-xao-chua-ngot', 'Sườn được om mềm trước rồi áo sốt chua ngọt cùng cà chua, thơm và ớt chuông. Cách này giúp người mới nấu tránh tình trạng sườn ngoài vàng nhưng trong còn dai.', '/images/foods/suon-xao-chua-ngot.jpg', 65, 4, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(5, 4, 'Bò xào hành tây', 'bo-xao-hanh-tay', 'Thịt bò thái ngang thớ, xào riêng từng phần với hành tây để thịt mềm và rau còn giòn. Chuẩn bị sẵn mọi nguyên liệu trước khi bật bếp vì món xào chín nhanh.', '/images/foods/bo-xao-hanh-tay.jpg', 30, 3, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(6, 5, 'Trứng chiên hành', 'trung-chien-hanh', 'Trứng chiên hành lá mềm, vàng nhẹ, dùng chảo chống dính cỡ 20–22 cm. Chiên lửa vừa nhỏ để mặt dưới không cháy trước khi mặt trên đông.', '/images/foods/trung-chien-hanh.jpg', 15, 2, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(7, 5, 'Cá chiên nước mắm', 'ca-chien-nuoc-mam', 'Cá basa chiên vàng rồi áo sốt nước mắm tỏi mặn ngọt. Cá cần thấm khô trước khi chiên và chỉ đảo nhẹ khi rim sốt để giữ nguyên miếng.', '/images/foods/ca-chien-nuoc-mam.jpg', 40, 4, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(8, 2, 'Canh chua cá lóc', 'canh-chua-ca-loc', 'Canh chua cá lóc nấu me, thơm, cà chua, đậu bắp và bạc hà, có vị chua dịu cùng rau thơm. Cho từng loại rau đúng lúc để cá chín mà rau không bị nhũn.', '/images/foods/canh-chua-ca-loc.jpg', 40, 4, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(9, 2, 'Canh bí đỏ thịt bằm', 'canh-bi-do-thit-bam', 'Bí đỏ nấu cùng thịt heo bằm tạo nước canh ngọt, bí mềm nhưng còn miếng. Cắt bí đều để các miếng chín cùng lúc, tránh miếng nát miếng còn cứng.', '/images/foods/canh-bi-do-thit-bam.jpg', 30, 4, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(10, 2, 'Canh cải thịt bằm', 'canh-cai-thit-bam', 'Canh cải xanh thịt bằm có nước ngọt nhẹ và chút gừng thơm. Nấu cọng cải trước lá để rau vừa chín, không bị vàng nhũn.', '/images/foods/canh-cai-thit-bam.jpg', 25, 4, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(11, 2, 'Canh cà chua trứng', 'canh-ca-chua-trung', 'Canh cà chua trứng có nước thanh, cà chua mềm và trứng tạo vân mỏng. Rót trứng từ từ khi nước sôi nhẹ để tránh trứng vón thành cục.', '/images/foods/canh-ca-chua-trung.jpg', 20, 3, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(12, 3, 'Rau muống xào tỏi', 'rau-muong-xao-toi', 'Rau muống chần nhanh rồi xào tỏi trên lửa lớn, cọng chín giòn và lá xanh. Chia rau thành mẻ nhỏ nếu chảo hẹp để rau không bị om trong nước.', '/images/foods/rau-muong-xao-toi.jpg', 20, 3, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(13, 3, 'Cải thìa xào tỏi', 'cai-thia-xao-toi', 'Cải thìa xào tỏi có phần cọng mọng, lá mềm và sốt mỏng. Tách cọng với lá khi sơ chế để điều chỉnh thời gian nấu cho từng phần.', '/images/foods/cai-thia-xao-toi.jpg', 20, 3, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(14, 3, 'Đậu que xào tỏi', 'dau-que-xao-toi', 'Đậu que được chần chín trước rồi xào tỏi, giúp cọng đậu chín đều và không còn vị sống. Cắt khúc tương đương nhau để dễ kiểm tra độ chín.', '/images/foods/dau-que-xao-toi.jpg', 25, 3, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(15, 6, 'Rau củ luộc', 'rau-cu-luoc', 'Cà rốt, bông cải và đậu que luộc lần lượt theo độ cứng, dùng cùng nước tương. Rau củ chín đều, giữ hình dạng và không bị nhạt do ngâm lâu trong nước.', '/images/foods/rau-cu-luoc.jpg', 25, 4, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(16, 6, 'Thịt ba chỉ luộc', 'thit-ba-chi-luoc', 'Ba chỉ luộc cùng gừng và hành tím, để nghỉ trước khi thái để miếng thịt gọn và ít mất nước. Thời gian áp dụng cho dải thịt dày khoảng 4 cm.', '/images/foods/thit-ba-chi-luoc.jpg', 50, 4, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(17, 1, 'Đậu hũ sốt cà chua', 'dau-hu-sot-ca-chua', 'Đậu hũ chiên vàng nhẹ, rim trong sốt cà chua để ngoài thấm vị và trong còn mềm. Dùng đậu hũ trắng loại chắc, không dùng đậu hũ non dễ vỡ.', '/images/foods/dau-hu-sot-ca-chua.jpg', 35, 3, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(18, 5, 'Gà chiên nước mắm', 'ga-chien-nuoc-mam', 'Gà chiên chín bên trong rồi áo sốt nước mắm tỏi. Dùng miếng gà nhỏ có kích thước tương đương, kiểm tra tâm thịt trước khi rim sốt.', '/images/foods/ga-chien-nuoc-mam.jpg', 55, 4, 'active', '2026-10-05 14:52:02', '2026-10-20 17:30:46'),
(19, 2, 'Canh rau ngót thịt bằm', 'canh-rau-ngot-thit-bam', 'Canh rau ngót thịt bằm có nước ngọt và lá rau mềm. Vò nhẹ rau sau khi rửa giúp lá nhanh mềm nhưng không làm nát hoặc mất nhiều nước rau.', '/images/foods/canh-rau-ngot-thit-bam.jpg', 25, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(20, 2, 'Canh mướp tôm', 'canh-muop-tom', 'Canh mướp nấu tôm có nước ngọt, mướp mềm và tôm chín vừa. Chọn mướp non, bỏ quả có vị đắng bất thường trước khi nấu.', '/images/foods/canh-muop-tom.jpg', 25, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(21, 2, 'Canh khổ qua nhồi thịt', 'canh-kho-qua-nhoi-thit', 'Khổ qua nhồi thịt, bún tàu và nấm mèo, nấu lửa nhỏ để nước canh trong và nhân không bung. Món vẫn có vị đắng đặc trưng; có thể chần khổ qua để giảm bớt.', '/images/foods/canh-kho-qua-nhoi-thit.jpg', 65, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(22, 2, 'Canh bí xanh tôm', 'canh-bi-xanh-tom', 'Bí xanh nấu tôm có nước trong, bí mềm vừa và vị ngọt nhẹ. Cắt bí dày đều, chỉ cho vào sau khi nước sôi để dễ kiểm soát độ chín.', '/images/foods/canh-bi-xanh-tom.jpg', 25, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(23, 2, 'Canh rong biển đậu hũ', 'canh-rong-bien-dau-hu', 'Canh rong biển wakame và đậu hũ thanh nhẹ, nấu nhanh bằng nước lọc. Rong biển khô nở nhiều nên chỉ dùng lượng nhỏ, cho vào cuối để không bị nhũn.', '/images/foods/canh-rong-bien-dau-hu.jpg', 20, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(24, 2, 'Canh khoai mỡ thịt bằm', 'canh-khoai-mo-thit-bam', 'Khoai mỡ bào nhỏ nấu với thịt bằm cho canh sánh mềm. Khuấy sát đáy khi cho khoai để tránh vón cục, dính nồi hoặc phần khoai chưa chín.', '/images/foods/canh-khoai-mo-thit-bam.jpg', 35, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(25, 2, 'Canh cải chua sườn', 'canh-cai-chua-suon', 'Canh cải chua nấu sườn có vị chua dịu, sườn mềm và nước trong. Rửa, nếm cải trước khi nấu vì độ mặn và chua của mỗi mẻ cải khác nhau.', '/images/foods/canh-cai-chua-suon.jpg', 60, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(26, 5, 'Đậu hũ chiên sả', 'dau-hu-chien-sa', 'Đậu hũ chiên vàng, áo sả băm thơm và chấm nước tương. Chiên đậu trước rồi xào sả riêng trên lửa nhỏ để sả không cháy trước khi đậu giòn.', '/images/foods/dau-hu-chien-sa.jpg', 30, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(27, 5, 'Chả cá chiên thì là', 'cha-ca-chien-thi-la', 'Chả cá sống quết cùng thì là rồi nặn miếng mỏng và chiên vàng. Dùng cá xay còn sống loại chuyên làm chả, giữ lạnh để hỗn hợp dễ tạo độ dai.', '/images/foods/cha-ca-chien-thi-la.jpg', 35, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(28, 5, 'Tôm chiên bột', 'tom-chien-bot', 'Tôm tẩm bột chiên giòn, vỏ mỏng và thịt tôm chín mọng. Tỉ lệ nước tham khảo dành cho bột chiên giòn pha nước; ưu tiên hướng dẫn trên gói nếu khác.', '/images/foods/tom-chien-bot.jpg', 35, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(29, 5, 'Cánh gà chiên giòn', 'canh-ga-chien-gion', 'Cánh gà tách khớp, ướp nhẹ và áo bột khô rồi chiên lửa vừa. Lớp vỏ vàng cần đi cùng phần thịt đạt nhiệt độ chín, đặc biệt ở sát xương.', '/images/foods/ga-chien-nuoc-mam.jpg', 55, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(30, 5, 'Trứng chiên thịt bằm', 'trung-chien-thit-bam', 'Trứng chiên thịt bằm được xào chín thịt trước khi trộn trứng, giúp người mới dễ kiểm soát độ chín. Chia thành hai mẻ mỏng nếu chảo nhỏ để giữa không còn sống.', '/images/foods/trung-chien-thit-bam.jpg', 25, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(31, 5, 'Cá rô phi chiên giòn', 'ca-ro-phi-chien-gion', 'Cá rô phi nguyên con cỡ vừa chiên vàng, chấm nước mắm tỏi chanh. Cá được khứa phần dày, thấm khô và kiểm tra độ chín ở sát xương sống.', '/images/foods/ca-chien-nuoc-mam.jpg', 45, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(32, 7, 'Cá lóc kho tiêu', 'ca-loc-kho-tieu', 'Cá lóc kho nước màu và tiêu có thịt chắc, nước kho đậm và thơm. Dùng nồi đáy dày, kho lửa nhỏ và rưới sốt thay cho đảo nhiều để cá không nát.', '/images/foods/ca-loc-kho-tieu.jpg', 60, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(33, 7, 'Thịt kho mắm ruốc', 'thit-kho-mam-ruoc', 'Ba chỉ rim mắm ruốc và sả băm, đậm vị để ăn với cơm và rau. Mắm ruốc được hòa nước, lọc cặn và thêm dần vì độ mặn tùy nhãn hàng.', '/images/foods/thit-kho-mam-ruoc.jpg', 40, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(34, 7, 'Tôm rim thịt ba chỉ', 'tom-rim-thit-ba-chi', 'Tôm rim ba chỉ có vị mặn ngọt, tôm săn vừa và thịt mềm. Nấu thịt trước rồi thêm tôm sau để hai loại nguyên liệu cùng chín mà tôm không bị khô.', '/images/foods/tom-rim-thit-ba-chi.jpg', 40, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(35, 7, 'Sườn kho thơm', 'suon-kho-thom', 'Sườn kho thơm có thịt mềm, sốt mặn ngọt và chua nhẹ. Thơm được thêm sau khi sườn gần mềm để không bị nát trong thời gian kho.', '/images/foods/suon-kho-thom.jpg', 65, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(36, 7, 'Bò kho cà rốt', 'bo-kho-ca-rot', 'Bò kho cà rốt bằng nồi thường, có sả và gia vị bò kho, thịt mềm sau thời gian hầm đủ lâu. Thời gian ước tính gồm ướp và hầm; thịt gân có thể cần lâu hơn.', '/images/foods/bo-kho-ca-rot.jpg', 135, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(37, 7, 'Cá basa kho nghệ', 'ca-basa-kho-nghe', 'Cá basa kho nghệ tươi có màu vàng, mùi thơm và nước kho vừa đủ chan cơm. Xào nghệ ngắn trên lửa nhỏ để thơm mà không bị cháy đắng.', '/images/foods/ca-kho-to.jpg', 55, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(38, 7, 'Gà kho sả ớt', 'ga-kho-sa-ot', 'Gà kho sả ớt dùng sả non băm và ớt tươi, có thể bỏ ớt khi nấu cho người không ăn cay. Kho lửa nhỏ để gà mềm và sả không cháy.', '/images/foods/ga-kho-sa-ot.jpg', 55, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(39, 6, 'Bầu luộc chấm trứng', 'bau-luoc-cham-trung', 'Bầu non luộc vừa mềm, chấm nước mắm pha với trứng luộc chín. Luộc trứng trước để có thời gian làm nguội và bóc vỏ trong lúc nấu bầu.', '/images/foods/bau-luoc-cham-trung.jpg', 25, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(40, 6, 'Rau lang luộc', 'rau-lang-luoc', 'Ngọn rau lang luộc chín mềm, dùng với nước tương. Nhặt bỏ cọng già và cho cọng vào trước lá để rau chín đều, không còn nhựa sống.', '/images/foods/rau-lang-luoc.jpg', 20, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(41, 6, 'Gà luộc lá chanh', 'ga-luoc-la-chanh', 'Gà nguyên con luộc lửa nhỏ, để nghỉ rồi chặt và rắc lá chanh thái chỉ. Thời gian dành cho gà khoảng 1,2 kg; gà lớn hơn cần nấu lâu hơn và kiểm tra nhiệt độ tâm.', '/images/foods/ga-luoc-la-chanh.jpg', 75, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(42, 6, 'Thịt heo luộc cuốn rau', 'thit-heo-luoc-cuon-rau', 'Ba chỉ luộc thái mỏng, cuốn bánh tráng cùng rau, dưa leo và bún, chấm nước mắm tỏi chanh. Rau ăn sống phải rửa kỹ và để tách biệt với thịt sống.', '/images/foods/thit-heo-luoc-cuon-rau.jpg', 55, 4, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(43, 6, 'Bắp cải luộc', 'bap-cai-luoc', 'Bắp cải luộc ngọt nhẹ, lá chín mềm và cọng còn giòn, dùng với nước tương. Tách lá để rửa sạch rồi luộc trong nước đang sôi, không ngâm trong nồi sau khi chín.', '/images/foods/bap-cai-luoc.jpg', 20, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(44, 3, 'Mướp xào tỏi', 'muop-xao-toi', 'Mướp non xào tỏi mềm ngọt, dùng ít nước vì mướp tự tiết nước khi nấu. Xào ngắn và trút ra đĩa ngay khi mướp vừa trong để giữ nguyên miếng.', '/images/foods/muop-xao-toi.jpg', 20, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(45, 4, 'Mực xào cần tây', 'muc-xao-can-tay', 'Mực xào cần tây, hành tây giòn và thơm, xào mực riêng rồi mới kết hợp. Chuẩn bị đủ nguyên liệu để thao tác nhanh, tránh mực dai do nấu quá lâu.', '/images/foods/muc-xao-can-tay.jpg', 30, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(46, 4, 'Tôm xào bông cải', 'tom-xao-bong-cai', 'Tôm xào bông cải và cà rốt, rau được chần trước để chín đều. Tôm nấu riêng trong thời gian ngắn rồi kết hợp để giữ độ mọng.', '/images/foods/tom-xao-bong-cai.jpg', 30, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(47, 4, 'Gà xào mướp', 'ga-xao-muop', 'Ức hoặc đùi gà bỏ xương xào mướp non, thịt chín mềm và sốt ngọt nhẹ. Nấu gà trước rồi cho mướp để mướp không bị nát trong lúc chờ gà chín.', '/images/foods/ga-xao-muop.jpg', 35, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(48, 4, 'Bò xào bông cải', 'bo-xao-bong-cai', 'Bò thái mỏng xào bông cải chần, sốt dầu hào phủ nhẹ và rau còn giòn. Xào thịt riêng rồi cho lại sau cùng để thịt không bị dai khi đợi rau chín.', '/images/foods/bo-xao-bong-cai.jpg', 35, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(49, 4, 'Nui xào bò', 'nui-xao-bo', 'Nui xào bò bằm sốt cà chua, đủ thành một bữa chính đơn giản. Luộc nui hơi chắc hơn mức ăn ngay để nui không bị nhũn khi đảo tiếp với sốt.', '/images/foods/nui-xao-bo.jpg', 40, 3, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46'),
(50, 4, 'Cải chua xào trứng', 'cai-chua-xao-trung', 'Cải chua xào trứng có vị chua nhẹ và trứng mềm. Xả cải theo độ mặn, xào ráo trước khi đổ trứng để món không ra nhiều nước.', '/images/foods/cai-chua-xao-trung.jpg', 20, 2, 'active', '2026-10-14 06:58:22', '2026-10-20 17:30:46');

-- --------------------------------------------------------

--
-- Table structure for table `food_ingredients`
--

CREATE TABLE `food_ingredients` (
  `id_food_ingredient` int(10) UNSIGNED NOT NULL,
  `id_food` int(10) UNSIGNED NOT NULL,
  `id_ingredient` int(10) UNSIGNED NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `food_ingredients`
--

INSERT INTO `food_ingredients` (`id_food_ingredient`, `id_food`, `id_ingredient`, `quantity`, `note`) VALUES
(226, 1, 1, 500.00, 'chọn miếng có nạc và mỡ xen kẽ'),
(227, 1, 2, 4.00, NULL),
(228, 1, 45, 1.00, 'xay; khoảng 1/2 thìa cà phê'),
(229, 1, 46, 20.00, 'khoảng 2 củ'),
(230, 1, 53, 10.00, 'khoảng 3 tép'),
(231, 1, 77, 12.00, 'khoảng 3 thìa cà phê gạt ngang'),
(232, 1, 84, 500.00, 'không dùng nước cốt dừa'),
(233, 1, 85, 200.00, 'dùng để kho; chuẩn bị thêm nước nóng nếu cạn'),
(234, 1, 86, 30.00, '2 thìa canh'),
(235, 2, 8, 600.00, 'khoanh dày 2–3 cm, đã làm sạch'),
(236, 2, 45, 2.00, 'xay hoặc đập dập'),
(237, 2, 46, 20.00, NULL),
(238, 2, 53, 10.00, NULL),
(239, 2, 66, 10.00, NULL),
(240, 2, 73, 15.00, '1 thìa canh'),
(241, 2, 77, 12.00, 'chia 4 g ướp cá và 8 g thắng màu'),
(242, 2, 85, 250.00, 'dùng nước nóng khi kho'),
(243, 2, 86, 30.00, '2 thìa canh'),
(244, 3, 10, 600.00, 'đùi hoặc má đùi có xương, chặt miếng 3–4 cm'),
(245, 3, 45, 1.00, NULL),
(246, 3, 46, 20.00, NULL),
(247, 3, 53, 10.00, NULL),
(248, 3, 67, 40.00, NULL),
(249, 3, 73, 15.00, NULL),
(250, 3, 77, 8.00, 'khoảng 2 thìa cà phê'),
(251, 3, 85, 200.00, NULL),
(252, 3, 86, 25.00, '5 thìa cà phê'),
(253, 4, 11, 500.00, 'chặt khúc 3–4 cm'),
(254, 4, 12, 100.00, NULL),
(255, 4, 13, 150.00, 'đã gọt vỏ, bỏ mắt và lõi'),
(256, 4, 14, 100.00, NULL),
(257, 4, 19, 200.00, NULL),
(258, 4, 53, 15.00, NULL),
(259, 4, 73, 30.00, NULL),
(260, 4, 77, 20.00, NULL),
(261, 4, 79, 20.00, '4 thìa cà phê'),
(262, 4, 85, 350.00, '300 ml om sườn, 50 ml pha sốt'),
(263, 4, 86, 25.00, NULL),
(264, 4, 91, 30.00, NULL),
(265, 5, 14, 200.00, NULL),
(266, 5, 15, 400.00, 'thăn hoặc bắp mềm, thái ngang thớ dày 2–3 mm'),
(267, 5, 45, 1.00, NULL),
(268, 5, 53, 15.00, NULL),
(269, 5, 66, 10.00, NULL),
(270, 5, 73, 30.00, 'chia để ướp và xào'),
(271, 5, 74, 15.00, '1 thìa canh'),
(272, 5, 85, 30.00, NULL),
(273, 5, 87, 10.00, '2 thìa cà phê'),
(274, 6, 2, 4.00, NULL),
(275, 6, 45, 0.50, 'khoảng 1/4 thìa cà phê'),
(276, 6, 66, 20.00, NULL),
(277, 6, 73, 15.00, NULL),
(278, 6, 85, 15.00, 'giúp trứng mềm'),
(279, 6, 86, 5.00, '1 thìa cà phê'),
(280, 7, 8, 600.00, 'khoanh dày 2 cm'),
(281, 7, 45, 1.00, NULL),
(282, 7, 53, 20.00, NULL),
(283, 7, 66, 10.00, NULL),
(284, 7, 73, 150.00, 'lượng cho chảo 24 cm; không ăn hết lượng dầu này'),
(285, 7, 77, 16.00, NULL),
(286, 7, 85, 60.00, NULL),
(287, 7, 86, 25.00, NULL),
(288, 8, 13, 150.00, 'đã gọt vỏ và bỏ mắt'),
(289, 8, 17, 600.00, 'đã làm sạch, khoanh dày 2–3 cm'),
(290, 8, 19, 200.00, NULL),
(291, 8, 20, 100.00, NULL),
(292, 8, 53, 15.00, NULL),
(293, 8, 68, 100.00, 'loại dùng nấu canh, tước vỏ'),
(294, 8, 73, 15.00, NULL),
(295, 8, 76, 100.00, NULL),
(296, 8, 77, 12.00, NULL),
(297, 8, 80, 30.00, 'me vắt chín'),
(298, 8, 81, 2.00, NULL),
(299, 8, 83, 10.00, NULL),
(300, 8, 85, 1200.00, NULL),
(301, 8, 86, 25.00, NULL),
(302, 8, 89, 10.00, NULL),
(303, 9, 21, 400.00, 'khối lượng sau khi gọt vỏ, bỏ hạt'),
(304, 9, 22, 200.00, NULL),
(305, 9, 45, 0.50, NULL),
(306, 9, 46, 15.00, NULL),
(307, 9, 66, 10.00, NULL),
(308, 9, 73, 10.00, NULL),
(309, 9, 81, 2.00, NULL),
(310, 9, 85, 1000.00, NULL),
(311, 9, 86, 15.00, NULL),
(312, 10, 22, 200.00, NULL),
(313, 10, 23, 400.00, NULL),
(314, 10, 45, 0.50, NULL),
(315, 10, 46, 15.00, NULL),
(316, 10, 67, 10.00, NULL),
(317, 10, 73, 10.00, NULL),
(318, 10, 81, 2.00, NULL),
(319, 10, 85, 1000.00, NULL),
(320, 10, 86, 15.00, NULL),
(321, 11, 2, 3.00, NULL),
(322, 11, 19, 300.00, 'khoảng 3 quả chín'),
(323, 11, 45, 0.50, NULL),
(324, 11, 46, 15.00, NULL),
(325, 11, 66, 15.00, NULL),
(326, 11, 73, 15.00, NULL),
(327, 11, 81, 2.00, NULL),
(328, 11, 85, 900.00, NULL),
(329, 11, 86, 10.00, NULL),
(330, 12, 24, 500.00, 'khối lượng sau khi nhặt bỏ cọng già'),
(331, 12, 53, 25.00, NULL),
(332, 12, 73, 30.00, NULL),
(333, 12, 77, 4.00, 'khoảng 1 thìa cà phê'),
(334, 12, 81, 3.00, 'cho nước chần'),
(335, 12, 85, 1500.00, 'dùng chần rau; chỉ giữ 30 ml để xào'),
(336, 12, 87, 15.00, NULL),
(337, 13, 26, 500.00, NULL),
(338, 13, 53, 20.00, NULL),
(339, 13, 73, 25.00, NULL),
(340, 13, 77, 4.00, NULL),
(341, 13, 85, 45.00, '3 thìa canh'),
(342, 13, 87, 15.00, NULL),
(343, 14, 27, 500.00, NULL),
(344, 14, 53, 20.00, NULL),
(345, 14, 73, 25.00, NULL),
(346, 14, 77, 4.00, NULL),
(347, 14, 81, 3.00, 'dùng chần'),
(348, 14, 85, 1500.00, 'dùng chần; giữ 30 ml để xào'),
(349, 14, 87, 15.00, NULL),
(350, 15, 27, 200.00, NULL),
(351, 15, 28, 200.00, NULL),
(352, 15, 29, 300.00, NULL),
(353, 15, 81, 4.00, 'dùng nước luộc'),
(354, 15, 85, 2000.00, 'dùng luộc rau'),
(355, 15, 87, 30.00, 'dùng chấm'),
(356, 16, 1, 600.00, 'dải thịt dày khoảng 4 cm, đã cạo sạch lông'),
(357, 16, 46, 30.00, NULL),
(358, 16, 53, 10.00, NULL),
(359, 16, 67, 20.00, NULL),
(360, 16, 72, 1.00, 'dùng khoảng 15 ml nước cốt'),
(361, 16, 77, 8.00, NULL),
(362, 16, 81, 4.00, NULL),
(363, 16, 85, 1500.00, 'đủ ngập thịt 2–3 cm; điều chỉnh theo nồi'),
(364, 16, 86, 25.00, 'pha nước chấm'),
(365, 17, 19, 300.00, NULL),
(366, 17, 30, 4.00, 'loại chắc, khoảng 100 g mỗi miếng'),
(367, 17, 46, 15.00, NULL),
(368, 17, 66, 15.00, NULL),
(369, 17, 73, 60.00, '50 ml chiên, 10 ml nấu sốt'),
(370, 17, 77, 8.00, NULL),
(371, 17, 81, 1.00, NULL),
(372, 17, 85, 150.00, NULL),
(373, 17, 87, 20.00, NULL),
(374, 18, 10, 700.00, 'cánh tách khớp hoặc đùi chặt miếng 4 cm'),
(375, 18, 45, 1.00, NULL),
(376, 18, 53, 25.00, NULL),
(377, 18, 70, 30.00, 'áo mỏng bên ngoài'),
(378, 18, 73, 250.00, 'dùng chiên, không phải lượng hấp thụ'),
(379, 18, 77, 20.00, NULL),
(380, 18, 85, 60.00, NULL),
(381, 18, 86, 30.00, '10 ml ướp, 20 ml làm sốt'),
(382, 19, 22, 180.00, NULL),
(383, 19, 36, 300.00, 'chỉ lấy lá và ngọn non'),
(384, 19, 45, 0.50, NULL),
(385, 19, 46, 15.00, NULL),
(386, 19, 73, 10.00, NULL),
(387, 19, 81, 2.00, NULL),
(388, 19, 85, 1000.00, NULL),
(389, 19, 86, 15.00, NULL),
(390, 20, 37, 400.00, 'đã gọt vỏ'),
(391, 20, 38, 200.00, 'khối lượng sau khi bóc vỏ, bỏ đầu và chỉ lưng'),
(392, 20, 45, 0.50, NULL),
(393, 20, 46, 15.00, NULL),
(394, 20, 66, 10.00, NULL),
(395, 20, 73, 10.00, NULL),
(396, 20, 81, 2.00, NULL),
(397, 20, 85, 1000.00, NULL),
(398, 20, 86, 15.00, NULL),
(399, 21, 22, 250.00, NULL),
(400, 21, 39, 500.00, 'khoảng 3 quả vừa'),
(401, 21, 40, 20.00, 'khô'),
(402, 21, 45, 1.00, NULL),
(403, 21, 46, 20.00, NULL),
(404, 21, 66, 20.00, NULL),
(405, 21, 77, 4.00, NULL),
(406, 21, 81, 3.00, NULL),
(407, 21, 82, 10.00, NULL),
(408, 21, 85, 1300.00, 'dùng nấu canh; nước ngâm và chần chuẩn bị riêng'),
(409, 21, 86, 20.00, NULL),
(410, 22, 38, 180.00, 'đã bóc vỏ và lấy chỉ lưng'),
(411, 22, 41, 450.00, 'đã gọt vỏ và bỏ ruột già'),
(412, 22, 45, 0.50, NULL),
(413, 22, 46, 15.00, NULL),
(414, 22, 66, 10.00, NULL),
(415, 22, 73, 10.00, NULL),
(416, 22, 81, 2.00, NULL),
(417, 22, 85, 1000.00, NULL),
(418, 22, 86, 15.00, NULL),
(419, 23, 30, 2.00, 'khoảng 100 g mỗi miếng'),
(420, 23, 42, 8.00, 'wakame khô dùng nấu canh, không phải lá cuốn cơm'),
(421, 23, 66, 10.00, NULL),
(422, 23, 67, 10.00, NULL),
(423, 23, 75, 5.00, '1 thìa cà phê, thêm cuối'),
(424, 23, 81, 1.00, NULL),
(425, 23, 85, 900.00, 'nấu canh; nước ngâm chuẩn bị riêng'),
(426, 23, 87, 15.00, NULL),
(427, 24, 22, 180.00, NULL),
(428, 24, 43, 450.00, 'khối lượng sau khi gọt vỏ'),
(429, 24, 45, 0.50, NULL),
(430, 24, 46, 15.00, NULL),
(431, 24, 66, 10.00, NULL),
(432, 24, 73, 10.00, NULL),
(433, 24, 81, 2.00, NULL),
(434, 24, 85, 1100.00, NULL),
(435, 24, 86, 15.00, NULL),
(436, 24, 89, 10.00, NULL),
(437, 25, 11, 400.00, NULL),
(438, 25, 19, 150.00, NULL),
(439, 25, 44, 300.00, 'đã lên men chín, không mốc hoặc nhớt'),
(440, 25, 46, 20.00, NULL),
(441, 25, 66, 10.00, NULL),
(442, 25, 73, 15.00, NULL),
(443, 25, 77, 8.00, NULL),
(444, 25, 85, 1200.00, 'nấu canh; nước chần sườn chuẩn bị riêng'),
(445, 25, 86, 10.00, 'cho dần sau khi nếm'),
(446, 26, 30, 4.00, 'loại chắc, khoảng 100 g mỗi miếng'),
(447, 26, 48, 40.00, 'phần gốc non, băm thật nhỏ'),
(448, 26, 53, 10.00, NULL),
(449, 26, 73, 100.00, '90 ml chiên, 10 ml xào sả; không hấp thụ hết'),
(450, 26, 77, 4.00, NULL),
(451, 26, 81, 2.00, NULL),
(452, 26, 85, 15.00, 'hòa gia vị'),
(453, 26, 87, 20.00, 'dùng chấm'),
(454, 27, 45, 1.00, NULL),
(455, 27, 46, 20.00, NULL),
(456, 27, 54, 400.00, 'chả cá sống đã quết, loại chưa nêm; không phải chả chiên sẵn'),
(457, 27, 55, 25.00, NULL),
(458, 27, 73, 100.00, '5 ml thoa tay, phần còn lại để chiên'),
(459, 27, 77, 4.00, NULL),
(460, 27, 86, 10.00, 'giảm hoặc bỏ nếu chả đã nêm'),
(461, 27, 92, 30.00, 'tùy chọn để chấm'),
(462, 28, 38, 400.00, 'tôm lớn, cân sau bỏ đầu và bóc vỏ; có thể giữ đuôi'),
(463, 28, 45, 0.50, NULL),
(464, 28, 56, 150.00, 'loại pha nước, chia 30 g áo khô và 120 g pha'),
(465, 28, 73, 500.00, 'đủ sâu 3–4 cm trong nồi nhỏ; không phải lượng ăn vào'),
(466, 28, 81, 1.00, 'bỏ nếu bột đã mặn'),
(467, 28, 85, 160.00, 'nước lạnh; điều chỉnh theo bao bì bột'),
(468, 28, 92, 30.00, 'tùy chọn để chấm'),
(469, 29, 45, 1.00, NULL),
(470, 29, 53, 15.00, 'băm rồi ép lấy nước'),
(471, 29, 56, 150.00, 'loại áo khô hoặc loại cho phép áo khô theo bao bì'),
(472, 29, 57, 700.00, 'tách khớp, bỏ đầu cánh nếu thích'),
(473, 29, 73, 500.00, 'chiên trong nồi nhỏ, không phải lượng hấp thụ'),
(474, 29, 86, 15.00, 'giảm nếu bột đã nêm mặn'),
(475, 29, 92, 30.00, 'tùy chọn để chấm'),
(476, 30, 2, 4.00, NULL),
(477, 30, 22, 150.00, NULL),
(478, 30, 45, 1.00, NULL),
(479, 30, 46, 15.00, NULL),
(480, 30, 66, 15.00, NULL),
(481, 30, 73, 25.00, '10 ml xào thịt, 15 ml chiên'),
(482, 30, 85, 15.00, 'giúp trứng mềm'),
(483, 30, 86, 10.00, 'chia đều cho thịt và trứng'),
(484, 31, 53, 15.00, NULL),
(485, 31, 58, 700.00, '1 con sau làm sạch, vừa chảo 28 cm'),
(486, 31, 72, 1.00, 'dùng 15 ml nước cốt'),
(487, 31, 73, 300.00, 'chiên ngập khoảng nửa thân cá, điều chỉnh theo chảo'),
(488, 31, 77, 12.00, NULL),
(489, 31, 81, 2.00, 'ướp cá'),
(490, 31, 85, 45.00, 'pha nước chấm'),
(491, 31, 86, 25.00, NULL),
(492, 31, 88, 5.00, 'tùy chọn'),
(493, 32, 17, 600.00, 'đã làm sạch, cắt khoanh dày 2–3 cm'),
(494, 32, 45, 3.00, 'đập dập, chia ướp và rắc cuối'),
(495, 32, 46, 25.00, NULL),
(496, 32, 53, 10.00, NULL),
(497, 32, 66, 10.00, NULL),
(498, 32, 73, 15.00, NULL),
(499, 32, 77, 12.00, NULL),
(500, 32, 85, 300.00, NULL),
(501, 32, 86, 30.00, NULL),
(502, 33, 1, 500.00, NULL),
(503, 33, 46, 20.00, NULL),
(504, 33, 47, 25.00, 'dùng loại dùng nấu chín; điều chỉnh theo độ mặn'),
(505, 33, 48, 40.00, 'phần gốc non'),
(506, 33, 53, 10.00, NULL),
(507, 33, 73, 5.00, NULL),
(508, 33, 77, 16.00, NULL),
(509, 33, 85, 150.00, 'hòa mắm ruốc'),
(510, 33, 88, 5.00, 'tùy chọn, bỏ nếu không ăn cay'),
(511, 34, 1, 250.00, NULL),
(512, 34, 38, 300.00, 'tôm cỡ vừa, còn vỏ mỏng; cắt râu và lấy chỉ lưng'),
(513, 34, 45, 1.00, NULL),
(514, 34, 46, 20.00, NULL),
(515, 34, 53, 10.00, NULL),
(516, 34, 66, 10.00, NULL),
(517, 34, 73, 5.00, NULL),
(518, 34, 77, 12.00, NULL),
(519, 34, 85, 100.00, NULL),
(520, 34, 86, 25.00, NULL),
(521, 35, 11, 600.00, 'chặt khúc 3–4 cm'),
(522, 35, 13, 250.00, 'đã gọt vỏ, bỏ mắt và lõi'),
(523, 35, 45, 1.00, NULL),
(524, 35, 46, 20.00, NULL),
(525, 35, 53, 10.00, NULL),
(526, 35, 66, 10.00, NULL),
(527, 35, 73, 15.00, NULL),
(528, 35, 77, 16.00, '8 g ướp, 8 g thắng màu'),
(529, 35, 85, 400.00, NULL),
(530, 35, 86, 30.00, NULL),
(531, 36, 14, 100.00, NULL),
(532, 36, 15, 600.00, 'nạm hoặc bắp có chút gân, cắt khối 3 cm'),
(533, 36, 28, 350.00, NULL),
(534, 36, 46, 20.00, NULL),
(535, 36, 48, 40.00, NULL),
(536, 36, 53, 15.00, NULL),
(537, 36, 67, 15.00, NULL),
(538, 36, 73, 20.00, NULL),
(539, 36, 77, 8.00, NULL),
(540, 36, 78, 12.00, 'bột gia vị, kiểm tra độ mặn trên bao bì'),
(541, 36, 85, 1200.00, NULL),
(542, 36, 86, 20.00, 'dùng từng phần'),
(543, 36, 91, 30.00, NULL),
(544, 37, 8, 600.00, 'khoanh dày 2–3 cm'),
(545, 37, 45, 1.00, NULL),
(546, 37, 46, 20.00, NULL),
(547, 37, 49, 20.00, 'nghệ tươi'),
(548, 37, 53, 10.00, NULL),
(549, 37, 66, 10.00, NULL),
(550, 37, 73, 15.00, NULL),
(551, 37, 77, 8.00, NULL),
(552, 37, 85, 250.00, NULL),
(553, 37, 86, 25.00, NULL),
(554, 38, 10, 700.00, 'đùi hoặc má đùi, chặt miếng 3–4 cm'),
(555, 38, 45, 1.00, NULL),
(556, 38, 46, 20.00, NULL),
(557, 38, 48, 50.00, 'lấy phần gốc non'),
(558, 38, 53, 15.00, NULL),
(559, 38, 73, 15.00, NULL),
(560, 38, 77, 12.00, NULL),
(561, 38, 85, 200.00, NULL),
(562, 38, 86, 30.00, NULL),
(563, 38, 88, 5.00, 'tùy chọn, điều chỉnh độ cay'),
(564, 39, 2, 2.00, NULL),
(565, 39, 59, 500.00, 'khối lượng sau gọt vỏ, chọn quả non'),
(566, 39, 77, 4.00, NULL),
(567, 39, 81, 2.00, 'nước luộc bầu'),
(568, 39, 85, 1500.00, 'luộc bầu; giữ 40 ml pha chấm, nước luộc trứng chuẩn bị riêng'),
(569, 39, 86, 20.00, NULL),
(570, 40, 60, 500.00, 'khối lượng sau khi nhặt, lấy ngọn và lá non'),
(571, 40, 81, 3.00, 'cho nước luộc'),
(572, 40, 85, 1500.00, 'dùng luộc rau'),
(573, 40, 87, 25.00, 'dùng chấm'),
(574, 41, 10, 1200.00, '1 con đã làm sạch, bỏ nội tạng'),
(575, 41, 45, 1.00, NULL),
(576, 41, 46, 40.00, NULL),
(577, 41, 61, 5.00, 'khoảng 5–7 lá'),
(578, 41, 67, 30.00, NULL),
(579, 41, 72, 1.00, 'dùng khoảng 15 ml nước cốt'),
(580, 41, 81, 8.00, '5 g nước luộc, 3 g pha chấm'),
(581, 41, 85, 3000.00, 'đủ ngập gà 2–3 cm, điều chỉnh theo nồi'),
(582, 42, 1, 600.00, 'miếng dày khoảng 4 cm'),
(583, 42, 46, 30.00, NULL),
(584, 42, 53, 15.00, NULL),
(585, 42, 62, 200.00, NULL),
(586, 42, 63, 200.00, NULL),
(587, 42, 67, 20.00, NULL),
(588, 42, 69, 150.00, 'loại dùng cuốn'),
(589, 42, 71, 300.00, 'ăn kèm cuốn'),
(590, 42, 72, 1.00, 'dùng 20 ml nước cốt'),
(591, 42, 77, 16.00, NULL),
(592, 42, 81, 4.00, 'nước luộc thịt'),
(593, 42, 85, 1600.00, '1500 ml luộc thịt, 100 ml pha chấm; nước nhúng bánh tráng chuẩn bị riêng'),
(594, 42, 86, 30.00, NULL),
(595, 42, 90, 50.00, 'húng quế hoặc tía tô'),
(596, 43, 64, 500.00, 'khối lượng sau bỏ lá hỏng và lõi già'),
(597, 43, 67, 10.00, 'thái lát'),
(598, 43, 81, 3.00, 'cho nước luộc'),
(599, 43, 85, 1500.00, 'dùng luộc rau'),
(600, 43, 87, 25.00, 'dùng chấm'),
(601, 44, 37, 450.00, 'sau khi gọt vỏ'),
(602, 44, 53, 20.00, NULL),
(603, 44, 66, 10.00, NULL),
(604, 44, 73, 20.00, NULL),
(605, 44, 81, 1.00, NULL),
(606, 44, 85, 30.00, NULL),
(607, 44, 87, 10.00, NULL),
(608, 45, 14, 150.00, NULL),
(609, 45, 45, 1.00, NULL),
(610, 45, 50, 400.00, 'khối lượng sau khi làm sạch'),
(611, 45, 51, 150.00, NULL),
(612, 45, 53, 15.00, NULL),
(613, 45, 67, 10.00, NULL),
(614, 45, 73, 25.00, NULL),
(615, 45, 74, 15.00, NULL),
(616, 45, 85, 30.00, NULL),
(617, 45, 86, 5.00, NULL),
(618, 46, 28, 100.00, NULL),
(619, 46, 29, 300.00, NULL),
(620, 46, 38, 300.00, 'đã bóc vỏ, bỏ đầu và chỉ lưng'),
(621, 46, 45, 0.50, NULL),
(622, 46, 53, 15.00, NULL),
(623, 46, 73, 25.00, NULL),
(624, 46, 74, 15.00, NULL),
(625, 46, 81, 3.00, 'dùng chần rau'),
(626, 46, 85, 1500.00, 'chần rau; giữ 45 ml pha sốt'),
(627, 46, 87, 10.00, NULL),
(628, 47, 10, 350.00, 'ức hoặc đùi bỏ xương, bỏ da'),
(629, 47, 37, 350.00, 'khối lượng sau gọt vỏ'),
(630, 47, 45, 0.50, NULL),
(631, 47, 46, 15.00, NULL),
(632, 47, 53, 15.00, NULL),
(633, 47, 66, 10.00, NULL),
(634, 47, 73, 20.00, NULL),
(635, 47, 74, 10.00, NULL),
(636, 47, 85, 50.00, NULL),
(637, 47, 86, 10.00, NULL),
(638, 48, 15, 400.00, 'thăn hoặc bắp mềm, thái ngang thớ'),
(639, 48, 29, 350.00, NULL),
(640, 48, 45, 1.00, NULL),
(641, 48, 53, 20.00, NULL),
(642, 48, 73, 30.00, NULL),
(643, 48, 74, 20.00, NULL),
(644, 48, 81, 3.00, 'dùng chần rau'),
(645, 48, 85, 1500.00, 'chần rau; giữ 45 ml pha sốt'),
(646, 48, 87, 10.00, NULL),
(647, 49, 14, 100.00, NULL),
(648, 49, 15, 250.00, 'bằm hoặc xay'),
(649, 49, 19, 250.00, NULL),
(650, 49, 45, 1.00, NULL),
(651, 49, 52, 250.00, 'nui khô'),
(652, 49, 53, 15.00, NULL),
(653, 49, 73, 25.00, NULL),
(654, 49, 77, 4.00, NULL),
(655, 49, 81, 5.00, 'dùng luộc nui'),
(656, 49, 85, 2000.00, 'luộc nui; giữ 120 ml nấu sốt'),
(657, 49, 87, 15.00, NULL),
(658, 49, 91, 30.00, NULL),
(659, 50, 2, 3.00, NULL),
(660, 50, 44, 250.00, 'đã lên men chín, không mốc hoặc nhớt'),
(661, 50, 45, 0.50, NULL),
(662, 50, 46, 15.00, NULL),
(663, 50, 66, 10.00, NULL),
(664, 50, 73, 20.00, NULL),
(665, 50, 77, 4.00, NULL),
(666, 50, 86, 5.00, 'có thể dùng ít hơn nếu cải mặn');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id_ingredient` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `unit` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
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
(36, 'Rau ngót', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(37, 'Mướp', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(38, 'Tôm', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(39, 'Khổ qua', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(40, 'Bún tàu', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(41, 'Bí xanh', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(42, 'Rong biển', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(43, 'Khoai mỡ', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(44, 'Cải chua', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(45, 'Tiêu', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(46, 'Hành tím', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(47, 'Mắm ruốc', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(48, 'Sả', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(49, 'Nghệ', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(50, 'Mực', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(51, 'Cần tây', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(52, 'Nui', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(53, 'Tỏi', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(54, 'Chả cá', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(55, 'Thì là', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(56, 'Bột chiên giòn', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(57, 'Cánh gà', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(58, 'Cá rô phi', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(59, 'Bầu', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(60, 'Rau lang', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(61, 'Lá chanh', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(62, 'Dưa leo', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(63, 'Xà lách', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(64, 'Bắp cải', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(65, 'Cà tím', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(66, 'Hành lá', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(67, 'Gừng', 'g', '2026-10-14 06:58:22', '2026-10-14 06:58:22'),
(68, 'Bạc hà (dọc mùng)', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(69, 'Bánh tráng', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(70, 'Bột bắp', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(71, 'Bún tươi', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(72, 'Chanh', 'quả', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(73, 'Dầu ăn', 'ml', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(74, 'Dầu hào', 'ml', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(75, 'Dầu mè', 'ml', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(76, 'Đậu bắp', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(77, 'Đường', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(78, 'Gia vị bò kho', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(79, 'Giấm gạo', 'ml', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(80, 'Me chua', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(81, 'Muối', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(82, 'Nấm mèo khô', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(83, 'Ngò gai', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(84, 'Nước dừa tươi', 'ml', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(85, 'Nước lọc', 'ml', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(86, 'Nước mắm', 'ml', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(87, 'Nước tương', 'ml', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(88, 'Ớt tươi', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(89, 'Rau ngổ', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(90, 'Rau thơm', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(91, 'Tương cà', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46'),
(92, 'Tương ớt', 'g', '2026-10-20 17:30:46', '2026-10-20 17:30:46');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id_notification` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
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
  `id_post` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `id_food` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `status` enum('active','hidden','pending') NOT NULL DEFAULT 'pending',
  `hidden_reason` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id_post`, `id_user`, `id_food`, `title`, `content`, `image`, `status`, `hidden_reason`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'Hôm nay mình nấu thịt kho trứng', 'Lần đầu mình thử nấu thịt kho trứng với nước dừa. Thịt mềm và vị khá đậm đà.', '/images/posts/post-thit-kho-trung.jpg', 'active', NULL, '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(2, 3, 12, 'Rau muống xào tỏi đơn giản', 'Món này làm rất nhanh, phù hợp khi không có nhiều thời gian nấu ăn.', '/images/posts/post-rau-muong.jpg', 'active', NULL, '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(3, 4, 8, 'Bữa cơm với canh chua cá', 'Canh chua cá là món mình rất thích vì dễ ăn và phù hợp với những ngày nóng.', '/images/posts/post-canh-chua.jpg', 'active', NULL, '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(4, 5, 17, 'Đậu hũ sốt cà cho bữa cơm tiết kiệm', 'Một món khá đơn giản, nguyên liệu rẻ nhưng vẫn rất ngon.', '/images/posts/post-dau-hu.jpg', 'active', NULL, '2026-10-05 14:52:03', '2026-10-05 14:52:03'),
(5, 9, 18, 'Món ngon: Gà chiên nước mắm', 'gà chiên nước mắm', NULL, 'active', NULL, '2026-10-13 19:59:51', '2026-10-14 06:09:13'),
(6, 9, NULL, 'Bếp nhà hôm nay', 'Mâm cơm ấm cúng!', '/images/posts/post-dau-hu.jpg', 'active', NULL, '2026-10-13 20:05:48', '2026-10-20 18:14:55'),
(7, 9, 1, 'Món ngon: Thịt kho trứng', 'thịt kho trứng đậm đà béo ngậy', '/images/posts/post-1791947258086-7583.jpg', 'hidden', 'Spam hoặc quảng cáo không được phép', '2026-10-13 20:07:38', '2026-10-14 05:56:46'),
(8, 10, NULL, 'Canh chua cá lốc bông điên điển', 'Món ngon mới ra lò đây', '/images/posts/post-canh-chua.jpg', 'active', NULL, '2026-10-13 22:54:23', '2026-10-20 18:15:22'),
(9, 2, NULL, 'hồi chiều trời mưa', 'mưa quá nấu ko được đi nên đi ăn cơm tiệm', NULL, 'active', NULL, '2026-10-13 23:07:47', '2026-10-14 06:09:06'),
(11, 14, NULL, 'Biển ơiii', 'Đứng trước biển cả mới biết mình nhỏ bé thế nàooo', NULL, 'active', NULL, '2026-10-13 23:48:48', '2026-10-19 14:58:13'),
(12, 16, NULL, 'Canh chua ngon lắm luôn', '• Cá lóc hoặc cá hú: 500g (rửa sạch với muối hoặc giấm để khử nhớt)\n• Me vắt: 50g (ngâm nước ấm lấy cốt chua)\n• Dứa (thơm): 1/4 quả (cắt miếng vừa ăn)\n• Cà chua: 2 quả (bổ múi cau)\n• Rau ăn kèm: Đậu bắp (100g), giá đỗ (100g), bạc hà/dọc mùng (100g), rau thơm (ngò gai, rau ngổ)\n• Gia vị: Hành tím, tỏi băm, ớt, nước mắm, đường, hạt nêm, muối.', '/images/posts/post-canh-chua.jpg', 'active', NULL, '2026-10-15 20:56:16', '2026-10-20 18:14:00'),
(13, 8, 29, 'Món ngon: Cánh gà chiên giòn', 'ngonn', NULL, 'active', NULL, '2026-10-19 07:51:58', '2026-10-19 14:58:09'),
(14, 17, NULL, 'Ngon', 'Mâm cơm ấm cúng!', '/images/posts/post-rau-muong.jpg', 'active', NULL, '2026-10-19 07:55:27', '2026-10-20 18:13:12');

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `id_post_like` int(10) UNSIGNED NOT NULL,
  `id_post` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
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
  `id_recipe_step` int(10) UNSIGNED NOT NULL,
  `id_food` int(10) UNSIGNED NOT NULL,
  `step_number` smallint(5) UNSIGNED NOT NULL,
  `instruction` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `recipe_steps`
--

INSERT INTO `recipe_steps` (`id_recipe_step`, `id_food`, `step_number`, `instruction`) VALUES
(182, 1, 1, 'Sơ chế: Thấm khô thịt đã làm sạch, cắt khối khoảng 3–4 cm để khi kho lâu không bị nát. Bóc vỏ hành tím và tỏi rồi băm nhỏ. Dùng dao, thớt riêng cho thịt sống; rửa sạch dụng cụ trước khi dùng cho thức ăn chín.'),
(183, 1, 2, 'Luộc trứng: Xếp trứng vào nồi, đổ nước ngập hơn mặt trứng 2 cm. Đun sôi rồi hạ lửa vừa, luộc 10 phút. Chuyển trứng sang nước mát 5 phút, bóc vỏ nhẹ tay; không cần chiên trứng.'),
(184, 1, 3, 'Ướp thịt: Trộn thịt với toàn bộ hành, tỏi, 30 ml nước mắm, 4 g đường và 1 g tiêu. Đậy lại, để trong ngăn mát 20 phút. Phần 8 g đường còn lại dùng để thắng màu, không cho vào phần ướp.'),
(185, 1, 4, 'Thắng màu: Cho 8 g đường và 15 ml nước lấy từ phần nước lọc vào nồi đáy dày. Đun lửa vừa đến màu hổ phách, hạ lửa rồi cho thịt cùng nước ướp vào, đảo 4–5 phút cho mặt thịt săn. Nếu đường cháy đen, làm lại để tránh đắng.'),
(186, 1, 5, 'Kho thịt: Rót 500 ml nước dừa và 185 ml nước lọc còn lại vào nồi. Đun sôi, hớt bọt rồi hạ lửa nhỏ, hé nắp và kho 40 phút; nước chỉ sôi lăn tăn. Nếu nước xuống dưới nửa miếng thịt, thêm từng 50 ml nước nóng.'),
(187, 1, 6, 'Kho cùng trứng: Cho trứng đã bóc vỏ vào, nhẹ tay xoay để trứng ngập nước kho. Tiếp tục kho lửa nhỏ 15–20 phút, trở trứng một lần. Thịt đạt khi đũa xiên qua phần nạc dễ dàng, mỡ trong và mềm.'),
(188, 1, 7, 'Hoàn thành: Nếm một thìa nước kho đã để nguội bớt; nếu đậm, thêm 30–50 ml nước nóng rồi đun lại. Nếu còn loãng, mở nắp đun thêm 3–5 phút. Tắt bếp khi vẫn còn nước chan cơm, tránh kho đến khô vì trứng dễ cứng.'),
(189, 2, 1, 'Chuẩn bị cá: Gỡ sạch mang, máu đọng và màng sẫm trong bụng nếu còn; rửa cá nhẹ dưới vòi nước nhỏ rồi thấm thật khô. Giữ khoanh dày 2–3 cm để không vỡ. Băm hành tím, tỏi; cắt hành lá thành khúc ngắn.'),
(190, 2, 2, 'Ướp: Xếp cá vào tô, thêm 30 ml nước mắm, 4 g đường, 1 g tiêu và một nửa hành tỏi băm. Xoa gia vị lên hai mặt, đậy kín và để ngăn mát 15 phút. Giữ lại nước ướp để kho.'),
(191, 2, 3, 'Làm nước màu: Cho 8 g đường và 15 ml nước vào nồi đáy dày. Đun lửa vừa đến màu nâu hổ phách, hạ nhỏ lửa, thêm 15 ml dầu và phần hành tỏi còn lại. Đảo 15–20 giây, tránh để đường đen hoặc tỏi cháy.'),
(192, 2, 4, 'Làm săn cá: Xếp cá một lớp vào nồi, đổ nước ướp lên trên. Đun lửa vừa 2 phút rồi nghiêng nồi nhẹ cho nước màu phủ cá. Không dùng đũa đảo liên tục vì thịt cá đang mềm dễ nát.'),
(193, 2, 5, 'Kho: Rót 235 ml nước nóng còn lại vào, đun sôi rồi hạ lửa nhỏ, hé nắp kho 20–25 phút. Dùng thìa rưới nước lên mặt cá 2–3 lần. Nếu cạn sớm, thêm từng 30 ml nước nóng thay vì tăng lửa.'),
(194, 2, 6, 'Kiểm tra chín: Phần thịt dày phải đục hoàn toàn, dễ tách khỏi xương; dùng nhiệt kế thực phẩm đo tâm cá đạt ít nhất 63°C. Nếu chưa đạt, kho thêm 3–5 phút. Mở nắp đun thêm vài phút nếu nước còn quá loãng.'),
(195, 2, 7, 'Dọn món: Rắc 1 g tiêu còn lại và hành lá, đun 30 giây rồi tắt bếp. Để cá nghỉ trong nồi 5 phút trước khi gắp bằng sạn rộng. Nước kho nên còn một lớp sánh ở đáy nồi, không cháy khét.'),
(196, 3, 1, 'Sơ chế: Dùng gà đã làm sạch, thấm khô rồi chặt miếng 3–4 cm, bỏ vụn xương. Không rửa gà sống dưới vòi nước mạnh làm bắn nước. Gừng cạo vỏ, thái sợi; hành tím và tỏi bóc vỏ, băm nhỏ.'),
(197, 3, 2, 'Ướp: Trộn gà với 25 ml nước mắm, 8 g đường, 1 g tiêu, một nửa gừng và một nửa hành tỏi. Đậy tô và ướp trong ngăn mát 15 phút để gia vị thấm; lấy ra ngay trước khi nấu.'),
(198, 3, 3, 'Phi thơm: Làm nóng nồi với 15 ml dầu trên lửa vừa. Cho hành tỏi và gừng còn lại vào đảo 30–45 giây, vừa dậy mùi thì cho gà vào. Không chờ tỏi chuyển nâu sẫm.'),
(199, 3, 4, 'Làm săn gà: Đảo gà 5–6 phút trên lửa vừa đến khi bề mặt chuyển đục và hơi vàng. Đổ hết phần nước ướp vào, đảo thêm 1 phút; nếu dính đáy, thêm 1–2 thìa nước lấy từ phần 200 ml đã chuẩn bị.'),
(200, 3, 5, 'Kho: Thêm phần nước còn lại, đun sôi rồi hạ lửa nhỏ và đậy hé nắp. Kho 20–25 phút, trở miếng gà một lần giữa chừng. Nước chỉ sôi lăn tăn; thêm chút nước nóng nếu đáy nồi gần khô trước khi gà chín.'),
(201, 3, 6, 'Kiểm tra: Dùng nhiệt kế cắm vào phần thịt dày nhất, tránh chạm xương; gà cần đạt ít nhất 74°C. Nếu chưa đạt, đậy nắp kho thêm 3–5 phút rồi đo lại. Thịt mềm và có mùi gừng thơm, không dùng riêng màu thịt để kết luận an toàn.'),
(202, 3, 7, 'Hoàn thành: Mở nắp, tăng lên lửa vừa và đảo nhẹ 2–3 phút để nước kho bám miếng gà. Nếm nước kho; nếu mặn thì thêm 30 ml nước nóng rồi đun lại. Tắt bếp khi còn ít nước sốt để chan cơm.'),
(203, 4, 1, 'Chuẩn bị: Sườn chặt khúc 3–4 cm, loại bỏ vụn xương. Cà chua bổ múi, thơm thái dày 1 cm; ớt chuông bỏ hạt, cắt vuông 2 cm. Hành tây cắt múi nhỏ, tỏi băm. Để riêng rau củ và thịt sống.'),
(204, 4, 2, 'Chần sườn: Cho sườn vào nồi với nước ngập, đun sôi 2 phút rồi đổ nước chần. Rửa nhẹ sườn bằng nước sạch để loại bọt, để ráo. Rửa nồi trước khi dùng lại; bước này giúp nước sốt trong và ít mùi.'),
(205, 4, 3, 'Om mềm: Cho sườn và 300 ml nước lọc vào nồi, đun sôi rồi hạ lửa nhỏ, đậy nắp om 25–30 phút. Kiểm tra thịt dễ xiên bằng đũa; nếu còn dai, om thêm 5–10 phút và châm nước nóng khi cần. Vớt sườn để ráo, giữ nước om.'),
(206, 4, 4, 'Pha sốt: Khuấy 25 ml nước mắm, 20 g đường, 20 ml giấm gạo, 30 g tương cà với 50 ml nước lọc. Nếm bằng thìa sạch; sốt cần chua ngọt cân bằng vì sẽ cô lại khi nấu. Không cho thêm muối ở bước này.'),
(207, 4, 5, 'Áp chảo sườn: Cho 30 ml dầu vào chảo, làm nóng lửa vừa. Xếp sườn đã ráo, chiên mỗi mặt 2–3 phút cho vàng nhẹ rồi gắp ra. Không cần chiên giòn cứng; gạn bớt dầu, giữ khoảng 1 thìa canh trong chảo.'),
(208, 4, 6, 'Xào rau củ: Phi tỏi 20 giây, cho cà chua vào dằm 3 phút đến khi mềm. Thêm thơm, ớt chuông và hành tây, đảo 2 phút. Rau vừa đổi màu và còn hơi giòn; tránh xào lâu đến nát.'),
(209, 4, 7, 'Áo sốt: Cho sườn trở lại chảo, rót sốt đã pha và 50 ml nước om sườn. Đun lửa vừa 5–7 phút, đảo nhẹ đến khi sốt sánh và bám quanh sườn. Nếu đặc nhanh, thêm từng thìa nước om; tắt bếp khi rau chín và sườn mềm.'),
(210, 5, 1, 'Thái thịt: Thấm khô bò, quan sát đường sợi thịt rồi cắt vuông góc với sợi thành lát dày 2–3 mm. Hành tây bóc vỏ, cắt múi rộng 1 cm và tách lớp. Băm tỏi, cắt hành lá khúc 3 cm.'),
(211, 5, 2, 'Ướp: Trộn bò với 15 ml dầu hào, 10 ml nước tương, 1 g tiêu, 5 ml dầu và một nửa tỏi băm. Đậy lại, để ngăn mát 10–15 phút. Không ướp thêm muối vì hai loại sốt đã có độ mặn.'),
(212, 5, 3, 'Xào bò: Làm nóng chảo rộng trên lửa lớn, cho 15 ml dầu rồi trải bò một lớp; nếu chảo nhỏ, chia hai mẻ. Để 30 giây rồi đảo 1–2 phút cho các mặt chuyển đục. Trút ra tô sạch; thịt sẽ được nấu tiếp ở bước cuối.'),
(213, 5, 4, 'Xào hành: Cho 10 ml dầu còn lại và phần tỏi còn lại vào chảo, đảo 15 giây trên lửa vừa. Thêm hành tây, tăng lửa lớn và đảo 1–2 phút. Hành tây hơi trong ở mép nhưng vẫn giữ độ giòn.'),
(214, 5, 5, 'Kết hợp: Cho bò và phần nước thịt trong tô trở lại, thêm 30 ml nước lọc và hành lá. Đảo lửa lớn 1–2 phút để thịt chín đều, sốt phủ rau. Nếu có nhiệt kế, phần bò cần đạt ít nhất 63°C rồi để nghỉ 3 phút trước khi ăn.'),
(215, 5, 6, 'Dọn món: Tắt bếp ngay khi bò chín và hành vừa mềm; không để chảo trên bếp nóng lâu vì thịt tiếp tục bị dai. Nếm một miếng đã nguội bớt, dùng cùng cơm. Nếu sốt quá đậm, thêm 1–2 thìa nước nóng và đảo lại nhanh.'),
(216, 6, 1, 'Chuẩn bị: Nhặt bỏ lá hành úa, rửa sạch và để ráo rồi thái nhỏ 3–5 mm. Chuẩn bị chảo chống dính 20–22 cm, nắp chảo và sạn mỏng. Chảo quá lớn sẽ làm lớp trứng mỏng, nhanh khô.'),
(217, 6, 2, 'Đập trứng: Đập lần lượt từng quả vào chén nhỏ để kiểm tra rồi mới cho vào tô chung. Nhặt bỏ mảnh vỏ nếu có. Rửa tay và lau sạch bề mặt dính trứng sống trước khi thao tác tiếp.'),
(218, 6, 3, 'Đánh trứng: Thêm 5 ml nước mắm, 0,5 g tiêu, 15 ml nước lọc và hành lá. Dùng đũa đánh 30–45 giây cho lòng đỏ, lòng trắng hòa đều; không cần đánh nổi nhiều bọt.'),
(219, 6, 4, 'Làm nóng chảo: Cho 15 ml dầu vào chảo, bật lửa vừa khoảng 30 giây rồi nghiêng để dầu phủ đáy. Dầu nóng vừa, chưa bốc khói thì rót trứng vào và xoay chảo nhẹ để dàn đều.'),
(220, 6, 5, 'Chiên: Hạ lửa vừa nhỏ, đậy nắp 2–3 phút đến khi mặt trên gần đông. Luồn sạn quanh mép, gập đôi hoặc lật trứng rồi chiên thêm 1–2 phút. Nếu đáy vàng quá nhanh, hạ lửa ngay.'),
(221, 6, 6, 'Kiểm tra và dùng: Trứng đạt khi mặt và giữa đều đông, không còn phần lỏng chảy ra; nếu đo nhiệt kế, tâm đạt 71°C. Trượt ra đĩa, cắt miếng vừa ăn. Dùng nóng để trứng còn mềm, tránh chiên đến khô giòn cả miếng.'),
(222, 7, 1, 'Sơ chế: Cá đã làm sạch cắt khoanh dày 2 cm, bỏ máu đọng và màng sẫm trong bụng rồi rửa nhẹ. Dùng giấy bếp thấm khô cả hai mặt, nhất là khe bụng. Băm tỏi và cắt nhỏ hành lá.'),
(223, 7, 2, 'Pha sốt: Khuấy tan 25 ml nước mắm, 16 g đường, 60 ml nước lọc và 1 g tiêu trong chén. Để riêng gần bếp. Không đổ nước mắm trực tiếp vào dầu đang chiên cá vì sẽ bắn mạnh.'),
(224, 7, 3, 'Làm nóng dầu: Rót 150 ml dầu vào chảo sâu 24 cm, làm nóng lửa vừa. Dùng đầu đũa gỗ khô thử thấy bọt nhỏ quanh đầu đũa là có thể chiên. Dầu không được bốc khói; cá phải ráo nước trước khi thả.'),
(225, 7, 4, 'Chiên cá: Đặt từng khoanh cá vào chảo theo hướng xa người, không xếp chồng. Chiên 5–6 phút mặt đầu rồi lật bằng sạn rộng, chiên mặt kia 4–5 phút. Nếu dính đáy, chờ thêm 30 giây trước khi lật; gắp ra đĩa sạch.'),
(226, 7, 5, 'Nấu sốt: Chắt dầu chiên ra vật chứa chịu nhiệt, chỉ giữ 10 ml trong chảo. Hạ lửa nhỏ, cho tỏi vào đảo 20–30 giây rồi rót chén sốt. Đun lửa vừa 1–2 phút đến khi nổi bọt và hơi sánh.'),
(227, 7, 6, 'Áo cá: Cho cá vào, dùng thìa rưới sốt lên mặt và rim lửa nhỏ 2–3 phút, trở một lần. Tâm miếng cá cần đạt ít nhất 63°C; thịt bên trong đục, dễ tách. Nếu sốt cạn quá nhanh, thêm 1–2 thìa nước nóng.'),
(228, 7, 7, 'Hoàn thành: Rắc hành lá, tắt bếp rồi chuyển cá ra đĩa. Rưới phần sốt tỏi còn lại lên trên, dùng với cơm và rau luộc. Không đun sốt đến khô vì đường dễ cháy và làm cá có vị đắng.'),
(229, 8, 1, 'Chuẩn bị cá: Bỏ mang, ruột, máu đọng và màng bụng, rửa nhẹ rồi thấm khô cá. Cắt khoanh 2–3 cm, trộn với 10 ml nước mắm và để ngăn mát 10 phút. Chuẩn bị rau trong lúc chờ, dùng dao thớt riêng.'),
(230, 8, 2, 'Sơ chế rau: Cà chua bổ múi, thơm cắt lát, đậu bắp bỏ cuống và cắt xéo. Bạc hà tước vỏ, thái xéo dày 1 cm, rửa rồi để ráo. Giá rửa kỹ, bỏ cọng hỏng; rau ngổ và ngò gai rửa sạch, cắt nhỏ. Tỏi băm.'),
(231, 8, 3, 'Lọc me: Lấy 100 ml từ phần nước đã chuẩn bị, làm nóng rồi dầm cùng 30 g me trong 5 phút. Lọc qua rây, giữ nước cốt và bỏ hạt, xơ. Không cho nguyên hạt me vào nồi canh.'),
(232, 8, 4, 'Nấu nền canh: Cho 15 ml dầu vào nồi, phi tỏi lửa vừa 20 giây. Thêm cà chua và thơm, đảo 2 phút rồi rót 1100 ml nước còn lại. Khi sôi, thêm một nửa nước me, 12 g đường, 2 g muối và 15 ml nước mắm còn lại.'),
(233, 8, 5, 'Nấu cá: Thả từng khoanh cá vào nước đang sôi nhẹ. Hạ lửa vừa nhỏ, nấu 8–10 phút, hớt bọt và không khuấy mạnh. Tâm cá đạt ít nhất 63°C, thịt đục và dễ tách khỏi xương; miếng dày hơn cần nấu thêm.'),
(234, 8, 6, 'Thêm rau: Cho đậu bắp và bạc hà vào, nấu 3–4 phút đến khi vừa mềm. Thêm giá, đun sôi lại ít nhất 1–2 phút cho giá chín. Nếm nước canh và thêm dần phần nước me còn lại đến độ chua phù hợp.'),
(235, 8, 7, 'Hoàn thành: Tắt bếp, cho rau ngổ và ngò gai vào, đảo thật nhẹ. Múc canh ra tô, đặt cá lên trên để không bị vỡ. Thành phẩm có nước chua ngọt nhẹ, cá chín và rau còn hình dạng; không giữ sôi lâu làm cá khô.'),
(236, 9, 1, 'Sơ chế: Gọt vỏ bí đỏ, nạo bỏ hạt và phần xơ mềm rồi rửa sạch. Cắt miếng vuông khoảng 2 cm, không thái quá nhỏ. Băm hành tím; hành lá rửa sạch, thái nhỏ và để riêng phần đầu trắng.'),
(237, 9, 2, 'Ướp thịt: Trộn thịt bằm với 5 ml nước mắm, 0,5 g tiêu và một nửa hành tím. Để trong ngăn mát 5–10 phút trong lúc chuẩn bị nồi. Dùng thìa làm tơi thịt để khi xào không đóng thành cục lớn.'),
(238, 9, 3, 'Xào thịt: Làm nóng 10 ml dầu trên lửa vừa, phi phần hành tím còn lại và đầu hành 20–30 giây. Cho thịt vào, đảo và dằm 3–4 phút đến khi thịt tơi, bề mặt chuyển đục.'),
(239, 9, 4, 'Nấu bí: Rót 1000 ml nước vào nồi, đun sôi rồi hớt bọt. Thêm bí và 2 g muối, hạ lửa vừa nhỏ. Nấu 10–12 phút, hé nắp và đảo nhẹ một lần; không khuấy nhiều làm vỡ bí.'),
(240, 9, 5, 'Kiểm tra: Xiên đũa qua miếng bí thấy dễ xuyên nhưng bí chưa rã là đạt. Thịt bằm cần chín hoàn toàn, nhiệt độ đạt ít nhất 71°C nếu đo. Nếu bí còn cứng, nấu thêm từng 2 phút rồi kiểm tra lại.'),
(241, 9, 6, 'Nêm và dùng: Thêm 10 ml nước mắm còn lại, đun nhẹ 30 giây rồi tắt bếp. Rắc hành lá, múc ra tô. Nếm nước canh bằng thìa sạch; nếu đậm, thêm ít nước nóng và đun sôi lại trước khi dùng.'),
(242, 10, 1, 'Nhặt rau: Bỏ gốc và lá úa, tách từng bẹ cải rồi rửa kỹ đất trong kẽ lá dưới vòi nước sạch. Để ráo, cắt khúc 3–4 cm; để phần cọng dày riêng với lá. Gừng cạo vỏ, thái sợi; hành tím băm nhỏ.'),
(243, 10, 2, 'Ướp thịt: Trộn thịt bằm với 5 ml nước mắm, 0,5 g tiêu và một nửa hành tím. Đậy lại, để ngăn mát 5–10 phút. Chuẩn bị sẵn 1000 ml nước để không phải đong khi thịt đang xào.'),
(244, 10, 3, 'Xào thịt: Đun 10 ml dầu lửa vừa, phi phần hành tím còn lại 20 giây. Thêm thịt, dùng thìa dằm tơi và đảo 3–4 phút cho bề mặt thịt chuyển đục. Không cần xào đến khô hoặc cháy cạnh.'),
(245, 10, 4, 'Nấu nước canh: Rót 1000 ml nước vào, thêm gừng, đun sôi rồi hớt bọt. Hạ lửa vừa và nấu 4–5 phút để thịt chín hoàn toàn; nhiệt độ phần thịt bằm đạt ít nhất 71°C nếu dùng nhiệt kế.'),
(246, 10, 5, 'Cho rau: Thêm 2 g muối và phần cọng cải, nấu 2 phút. Cho phần lá vào, dùng vá nhấn nhẹ cho ngập nước và nấu thêm 2–3 phút, không đậy kín nắp. Rau chín khi cọng dễ cắn, lá xanh mềm.'),
(247, 10, 6, 'Hoàn thành: Cho 10 ml nước mắm còn lại, đun sôi nhẹ 30 giây rồi tắt bếp. Nếm nước canh đã nguội bớt và điều chỉnh bằng ít nước nóng nếu quá đậm. Múc ra tô ngay để cải không tiếp tục bị nhũn trong nồi nóng.'),
(248, 11, 1, 'Sơ chế: Rửa cà chua, bỏ cuống rồi bổ múi cau 6–8 miếng mỗi quả. Hành tím bóc vỏ băm nhỏ; hành lá nhặt sạch, rửa rồi thái nhỏ, để phần đầu trắng riêng. Chuẩn bị nồi khoảng 2 lít.'),
(249, 11, 2, 'Đánh trứng: Đập từng quả vào chén kiểm tra rồi cho vào tô. Thêm 0,5 g tiêu và đánh khoảng 30 giây cho lòng đỏ, lòng trắng hòa đều. Chưa cho trứng vào nồi ở bước này.'),
(250, 11, 3, 'Xào cà chua: Cho 15 ml dầu vào nồi, phi hành tím và đầu hành trên lửa vừa 20–30 giây. Thêm cà chua với 2 g muối, đảo 3–4 phút đến khi cà mềm, tiết màu đỏ nhưng vẫn còn vài múi nguyên.'),
(251, 11, 4, 'Nấu nước: Rót 900 ml nước lọc, đun sôi rồi hạ lửa vừa nhỏ, nấu thêm 3 phút. Cho 10 ml nước mắm, khuấy nhẹ. Nếu muốn nước canh mịn hơn, dùng vá dằm một phần cà chua ngay trong nồi.'),
(252, 11, 5, 'Tạo vân trứng: Giữ nước sôi nhẹ, dùng đũa khuấy nước một vòng rồi rót trứng thành dòng nhỏ quanh nồi. Chờ 20–30 giây mới khuấy nhẹ; nấu thêm 2–3 phút đến khi trứng đông hoàn toàn, không còn phần trong hoặc lỏng.'),
(253, 11, 6, 'Hoàn thành: Rắc hành lá, tắt bếp. Canh đạt khi trứng thành dải mềm và nước không quá đục; món có trứng cần đạt 71°C nếu kiểm tra bằng nhiệt kế. Múc ra tô và dùng nóng, tránh đun sôi mạnh kéo dài làm trứng vụn.'),
(254, 12, 1, 'Nhặt rau: Bỏ gốc, cọng già và lá úa; bẻ khúc 5–6 cm. Rửa rau nhiều lần bằng nước sạch, chú ý đất trong cọng rỗng rồi để ráo. Tỏi bóc vỏ, đập dập và băm thô để không cháy quá nhanh.'),
(255, 12, 2, 'Chuẩn bị gia vị: Hòa 15 ml nước tương với 4 g đường trong chén nhỏ. Đặt sẵn rổ sạch cạnh bếp. Món này xào nhanh nên cần làm xong việc nhặt, rửa và pha gia vị trước khi bật chảo.'),
(256, 12, 3, 'Chần: Đun sôi mạnh 1500 ml nước cùng 3 g muối. Cho rau vào, nhấn ngập và chần 45–60 giây tính từ khi nước sôi lại. Vớt ra rổ, giữ 30 ml nước chần; không ngâm rau lâu trong nồi vì dễ nhũn.'),
(257, 12, 4, 'Phi tỏi: Làm nóng chảo rộng trên lửa vừa với 30 ml dầu. Thêm hai phần ba tỏi, đảo 15–20 giây đến khi dậy mùi, chưa vàng sẫm. Tăng lửa lớn ngay trước khi cho rau đã ráo vào.'),
(258, 12, 5, 'Xào: Đảo rau 1 phút, thêm gia vị đã pha, 30 ml nước chần và phần tỏi còn lại. Tiếp tục đảo 1–2 phút cho cọng rau chín giòn. Nếu chảo nhỏ, chia hai mẻ và chia đều dầu, tỏi, gia vị.'),
(259, 12, 6, 'Dọn món: Gắp thử một cọng, thấy dễ cắn, hết vị sống nhưng chưa mềm nhũn là đạt. Tắt bếp, trút ngay ra đĩa cùng nước xào. Không đậy kín rau sau khi nấu vì hơi nóng giữ lại làm rau xuống màu.'),
(260, 13, 1, 'Rửa cải: Cắt bỏ gốc, tách từng bẹ và rửa kỹ đất ở chân bẹ. Cây nhỏ có thể bổ đôi theo chiều dọc; cây lớn cắt khúc 4 cm. Để ráo, tách phần cọng dày khỏi lá để cho vào chảo ở hai thời điểm.'),
(261, 13, 2, 'Chuẩn bị tỏi: Bóc vỏ tỏi, đập dập rồi băm thô hoặc thái lát mỏng. Pha 15 ml nước tương, 4 g đường và 45 ml nước lọc trong một chén, khuấy cho đường tan hết.'),
(262, 13, 3, 'Phi thơm: Cho 25 ml dầu vào chảo rộng, làm nóng lửa vừa rồi thêm tỏi. Đảo 20 giây đến khi có mùi thơm; nếu tỏi vàng quá nhanh, nhấc chảo khỏi bếp một lát và hạ lửa.'),
(263, 13, 4, 'Xào cọng: Tăng lửa vừa lớn, cho cọng cải vào đảo 1 phút. Rót một nửa chén sốt, đậy nắp 1–2 phút để cọng mềm hơn, sau đó mở nắp. Không để cạn nước làm tỏi cháy ở đáy.'),
(264, 13, 5, 'Xào lá: Thêm phần lá và sốt còn lại, đảo đều 2–3 phút. Lá xẹp, xanh đậm và cọng hơi trong là rau gần đạt. Nếu cọng còn cứng, thêm 1 thìa nước rồi xào thêm 1 phút.'),
(265, 13, 6, 'Hoàn thành: Nếm một miếng cọng sau khi để nguội bớt; rau cần chín, còn giòn và không có vị hăng sống. Tắt bếp rồi trút ra đĩa ngay. Nước sốt chỉ nên đọng một lớp mỏng, không cần đun đến khô.'),
(266, 14, 1, 'Nhặt đậu: Bẻ hai đầu, kéo bỏ xơ dọc thân nếu có. Loại quả héo, sâu hoặc quá già, rửa sạch rồi cắt khúc 4–5 cm. Đậu quả dày nên cắt xéo để chín đều hơn.'),
(267, 14, 2, 'Chuẩn bị gia vị: Tỏi bóc vỏ, đập dập và băm nhỏ. Hòa 15 ml nước tương với 4 g đường. Đặt sẵn rổ để vớt đậu, chuẩn bị chảo rộng và sạn trước khi bắt đầu nấu.'),
(268, 14, 3, 'Chần chín: Đun sôi 1500 ml nước với 3 g muối, cho đậu vào và nấu 4–5 phút từ khi sôi lại. Đậu chuyển xanh đậm và hết vị sống; quả dày cần thêm 1–2 phút. Vớt ráo, giữ 30 ml nước chần.'),
(269, 14, 4, 'Phi tỏi: Cho 25 ml dầu vào chảo, đun lửa vừa. Thêm tỏi, đảo 20–30 giây cho dậy mùi rồi cho đậu đã chần vào ngay. Không phi tỏi đến nâu đen vì sẽ làm cả món đắng.'),
(270, 14, 5, 'Xào: Tăng lửa vừa lớn, thêm nước tương pha đường và 30 ml nước chần. Đảo 3–4 phút để sốt bám đều. Nếu đậu vẫn dai, thêm 1–2 thìa nước, đậy nắp 1 phút rồi mở ra đảo tiếp.'),
(271, 14, 6, 'Kiểm tra và dùng: Cắn thử khúc đậu đã nguội bớt; đậu phải chín, không có vị ngai ngái, vẫn giữ hình dạng. Tắt bếp và trút ra đĩa. Không dùng độ xanh của vỏ làm dấu hiệu duy nhất cho độ chín.'),
(272, 15, 1, 'Cắt cà rốt: Gọt vỏ, rửa sạch, cắt lát xéo dày khoảng 0,5 cm. Đừng để miếng quá dày vì cà rốt sẽ lâu chín hơn các loại rau khác. Chuẩn bị nồi đủ rộng để rau ngập nước.'),
(273, 15, 2, 'Chuẩn bị rau còn lại: Bông cải tách nhánh cỡ 3–4 cm, gọt lớp xơ ở thân rồi thái lát. Đậu que tước xơ, cắt khúc 4 cm. Rửa kỹ từng loại và để riêng, nhất là các kẽ bông cải.'),
(274, 15, 3, 'Đun nước: Cho 2000 ml nước và 4 g muối vào nồi, đun sôi mạnh. Đặt sẵn rổ, vá lỗ và đĩa sạch. Chỉ cho rau vào khi nước đang sôi để nhiệt không giảm quá nhiều.'),
(275, 15, 4, 'Luộc rau cứng: Cho cà rốt và đậu que vào, mở nắp luộc 4 phút tính từ lúc nước sôi lại. Đảo nhẹ một lần để rau ngập đều. Nếu cà rốt thái dày hơn 0,5 cm, nấu thêm 1–2 phút trước khi cho bông cải.'),
(276, 15, 5, 'Thêm bông cải: Cho bông cải vào cùng, luộc thêm 3 phút. Kiểm tra cà rốt xiên qua được, đậu que hết vị sống và thân bông cải vừa mềm. Vớt loại nào đã chín ra trước nếu kích thước miếng không đồng đều.'),
(277, 15, 6, 'Dọn món: Vớt toàn bộ rau củ vào rổ cho ráo rồi bày ra đĩa, không để nằm trong nước luộc. Rót 30 ml nước tương ra chén để chấm. Dùng khi còn ấm; rau đạt khi chín đều nhưng chưa bở hoặc rã nhánh.'),
(278, 16, 1, 'Sơ chế: Kiểm tra phần da, cạo sạch lông còn sót, thấm khô miếng thịt đã làm sạch. Chia thành dải dày khoảng 4 cm để luộc đều; không cắt lát mỏng lúc còn sống. Gừng thái lát, hành tím bóc vỏ và đập nhẹ.'),
(279, 16, 2, 'Xếp nồi: Cho thịt, gừng, hành tím và 4 g muối vào nồi vừa kích thước. Rót khoảng 1500 ml nước nguội, bảo đảm ngập mặt thịt 2–3 cm; thêm hoặc bớt nước theo nồi. Bắt đầu từ nước nguội giúp tâm thịt nóng đều.'),
(280, 16, 3, 'Luộc: Đun lửa vừa lớn đến sôi, hớt bọt rồi hạ lửa nhỏ, đậy hé nắp. Luộc 25–35 phút tính từ khi sôi, lật thịt một lần giữa chừng. Nước chỉ sôi nhẹ; nếu cạn, châm nước nóng để thịt vẫn ngập.'),
(281, 16, 4, 'Pha chấm: Trong lúc chờ, hòa 25 ml nước mắm với 8 g đường và 30 ml nước luộc thịt đang nóng đã múc ra chén sạch. Đợi nguội bớt rồi thêm 15 ml nước cốt chanh và tỏi băm. Nếm, thêm chút nước nếu còn đậm.'),
(282, 16, 5, 'Kiểm tra chín: Dùng nhiệt kế đo giữa phần thịt dày nhất, thịt heo nguyên miếng cần đạt ít nhất 63°C và nghỉ ít nhất 3 phút. Muốn da mềm hơn có thể luộc thêm 5–10 phút; không chỉ dựa vào màu nước chảy ra để kết luận chín.'),
(283, 16, 6, 'Thái và dùng: Gắp thịt ra đĩa sạch, để nghỉ 5–10 phút rồi thái ngang thớ, lát dày 3–5 mm. Xếp ra đĩa, dùng với nước chấm đã pha. Không đặt thịt chín lên thớt vừa dùng cho thịt sống nếu chưa rửa sạch.'),
(284, 17, 1, 'Chuẩn bị: Đậu hũ để ráo, thấm khô bằng giấy bếp rồi cắt mỗi miếng thành 3–4 phần dày khoảng 2 cm. Cà chua bỏ cuống, băm nhỏ. Hành tím băm, hành lá thái nhỏ và tách phần đầu trắng.'),
(285, 17, 2, 'Chiên đậu: Cho 50 ml dầu vào chảo chống dính, làm nóng lửa vừa. Xếp đậu một lớp, chiên 3–4 phút mỗi mặt đến vàng nhẹ. Chờ mặt đậu se lại mới lật bằng sạn để không vỡ, sau đó gắp ra đĩa.'),
(286, 17, 3, 'Phi hành: Chuyển dầu chiên thừa sang vật chứa chịu nhiệt. Cho 10 ml dầu mới vào chảo, phi hành tím và đầu hành lửa vừa 20–30 giây. Khi hành thơm thì thêm cà chua ngay, không để hành cháy.'),
(287, 17, 4, 'Nấu sốt: Đảo cà chua với 1 g muối 4–5 phút, dùng sạn dằm cho mềm. Rót 150 ml nước, thêm 20 ml nước tương và 8 g đường. Đun sôi nhẹ 2 phút đến khi thành sốt đỏ, cà chua bớt mùi sống.'),
(288, 17, 5, 'Rim đậu: Xếp đậu vào sốt, hạ lửa nhỏ và rim 7–8 phút. Dùng thìa rưới sốt lên mặt và trở đậu một lần. Nếu sốt cạn khi đậu chưa thấm, thêm 2–3 thìa nước nóng, không đảo mạnh.'),
(289, 17, 6, 'Hoàn thành: Nếm sốt, thêm chút nước nóng nếu đậm; đun thêm 30 giây rồi rắc hành lá và tắt bếp. Đậu đạt khi ruột nóng, mềm, mặt ngoài phủ sốt cà sánh nhẹ. Múc cả đậu và sốt ra đĩa dùng cùng cơm.'),
(290, 18, 1, 'Sơ chế: Dùng gà đã làm sạch, thấm thật khô, cắt miếng khoảng 4 cm; cánh thì tách đúng khớp để tránh xương vụn. Trộn 10 ml nước mắm và 1 g tiêu, đậy kín rồi ướp ngăn mát 15 phút. Tỏi bóc vỏ băm nhỏ.'),
(291, 18, 2, 'Chuẩn bị sốt: Hòa 20 ml nước mắm còn lại với 20 g đường và 60 ml nước. Để riêng gần bếp. Sau khi ướp, để gà ráo phần nước thừa rồi áo một lớp mỏng 30 g bột bắp, giũ bỏ bột rời.'),
(292, 18, 3, 'Làm nóng dầu: Cho 250 ml dầu vào chảo sâu khoảng 24 cm, đun lửa vừa đến khoảng 165–170°C. Đầu đũa gỗ khô có bọt nhỏ quanh đầu là dấu hiệu dầu đã nóng; không để dầu bốc khói, không thả gà còn ướt.'),
(293, 18, 4, 'Chiên gà: Thả gà từng miếng, chia hai mẻ nếu chật. Chiên lửa vừa tổng cộng 12–16 phút tùy độ dày, trở mỗi 3–4 phút cho vàng đều. Nếu vỏ sẫm quá sớm, hạ lửa để phần thịt bên trong có thời gian chín.'),
(294, 18, 5, 'Kiểm tra chín: Đo phần thịt dày nhất, tránh xương, cần đạt ít nhất 74°C. Miếng chưa đạt phải chiên tiếp 2–3 phút rồi đo lại. Gắp gà đã chín ra rổ hoặc vỉ sạch cho ráo, không đặt cùng đĩa đựng gà sống.'),
(295, 18, 6, 'Nấu sốt: Chắt bớt dầu, giữ khoảng 10 ml trong chảo. Phi tỏi trên lửa nhỏ 20–30 giây, rót sốt đã pha rồi đun lửa vừa 1–2 phút cho hơi sánh. Không cho sốt có nước vào chảo còn nhiều dầu nóng.'),
(296, 18, 7, 'Áo gà và dùng: Cho gà vào sốt, đảo nhẹ 1–2 phút đến khi bề mặt phủ đều sốt bóng. Tắt bếp khi vẫn còn chút sốt ở đáy, gắp ra đĩa dùng ngay. Nếu sốt đặc quánh, thêm 1–2 thìa nước nóng trước khi áo gà.'),
(297, 19, 1, 'Nhặt rau: Tuốt lá và ngọn non, bỏ cành cứng, lá già hoặc vàng. Rửa nhiều lần bằng nước sạch rồi để ráo. Dùng tay sạch vò nhẹ 2–3 lần để lá hơi dập, không vò đến nát hoặc vắt bỏ nước rau.'),
(298, 19, 2, 'Ướp thịt: Băm hành tím, trộn một nửa với thịt bằm, 5 ml nước mắm và 0,5 g tiêu. Đậy lại, để ngăn mát 5–10 phút trong lúc chuẩn bị nồi và đong 1000 ml nước.'),
(299, 19, 3, 'Xào thịt: Cho 10 ml dầu vào nồi, phi phần hành tím còn lại trên lửa vừa 20 giây. Thêm thịt, dùng thìa dằm tơi và đảo 3–4 phút đến khi thịt chuyển đục, không còn cục lớn.'),
(300, 19, 4, 'Nấu nước: Rót 1000 ml nước vào, đun sôi và hớt bọt. Hạ lửa vừa, nấu thêm 4–5 phút cho thịt chín hoàn toàn; thịt bằm cần đạt ít nhất 71°C nếu đo. Thêm 2 g muối.'),
(301, 19, 5, 'Nấu rau: Khi nước sôi trở lại, cho rau ngót vào và nhấn nhẹ cho ngập. Mở nắp, nấu lửa vừa 4–6 phút đến khi lá mềm và không còn cảm giác dai cứng. Đảo nhẹ 1–2 lần để rau chín đều.'),
(302, 19, 6, 'Hoàn thành: Cho 10 ml nước mắm còn lại, đun 30 giây rồi tắt bếp. Nếm nước canh đã nguội bớt; nếu đậm thì thêm chút nước nóng và đun lại. Múc ra tô ngay, không để rau tiếp tục sôi lâu làm xuống màu.'),
(303, 20, 1, 'Sơ chế mướp: Gọt lớp vỏ xanh cứng, rửa sạch rồi cắt xéo dày 1,5 cm. Loại quả già, xơ hoặc đắng bất thường. Hành tím băm; hành lá rửa và thái nhỏ, tách đầu trắng để phi thơm.'),
(304, 20, 2, 'Làm tôm: Bóc vỏ, bỏ đầu, rạch nhẹ dọc lưng để lấy chỉ đen rồi rửa và để ráo. Đập dập hoặc băm thô tôm. Trộn với 5 ml nước mắm và 0,5 g tiêu, để ngăn mát 5 phút.'),
(305, 20, 3, 'Xào tôm: Cho 10 ml dầu vào nồi, phi hành tím và đầu hành lửa vừa 20–30 giây. Thêm tôm, đảo 1 phút đến khi mặt ngoài hơi hồng; không xào khô vì tôm còn nấu tiếp trong canh.'),
(306, 20, 4, 'Nấu nước: Rót 1000 ml nước vào nồi, đun sôi rồi hớt bọt. Thêm 2 g muối, hạ lửa vừa và nấu 2 phút. Dùng vá tách các mảng tôm băm để tôm phân bố đều trong nước.'),
(307, 20, 5, 'Nấu mướp: Cho mướp vào nước đang sôi nhẹ, nấu 3–5 phút đến khi mướp hơi trong và đũa xuyên dễ. Tôm chín phải đục hoàn toàn, không còn phần thịt trong; nếu đo nhiệt kế, đạt ít nhất 63°C.'),
(308, 20, 6, 'Hoàn thành: Thêm 10 ml nước mắm còn lại và hành lá, đun 30 giây rồi tắt bếp. Múc ra tô khi mướp còn nguyên miếng. Nếu canh đậm, thêm từng 30 ml nước nóng và đun sôi lại; tránh nấu kéo dài làm mướp nhũn.'),
(309, 21, 1, 'Chuẩn bị nhân: Ngâm nấm mèo trong nước sạch ở nhiệt độ phòng 15–20 phút cho nở, rửa kỹ, cắt chân cứng và băm nhỏ; dùng ngay sau khi ngâm. Ngâm bún tàu nước ấm 5–7 phút, để ráo rồi cắt khúc 1–2 cm.'),
(310, 21, 2, 'Làm khổ qua: Rửa sạch, cắt thành khoanh dài 5–6 cm và dùng thìa nạo hết hạt, màng trắng. Nếu muốn bớt đắng, chần trong nồi nước sôi riêng 2 phút rồi vớt ráo. Không cần cố loại hết vị đắng tự nhiên.'),
(311, 21, 3, 'Trộn nhân: Băm hành tím và 10 g hành lá, trộn với thịt, nấm mèo, bún tàu, 10 ml nước mắm và 1 g tiêu. Quết bằng thìa 1–2 phút cho nhân dính. Các phần nguyên liệu phải ráo để nhân không lỏng.'),
(312, 21, 4, 'Nhồi: Dùng thìa nhồi nhân vào từng khoanh khổ qua, ép vừa chặt và gạt ngang miệng, không nhồi đầy phồng vì nhân sẽ nở. Nhân thừa vo viên nhỏ 2 cm. Đặt lên đĩa riêng, không để lẫn đồ ăn chín.'),
(313, 21, 5, 'Nấu: Đun sôi 1300 ml nước cùng 3 g muối và 4 g đường. Thả khổ qua cùng viên nhân vào, đợi sôi lại rồi hớt bọt. Hạ lửa nhỏ, hé nắp và nấu 25–35 phút, không khuấy mạnh làm nhân rơi.'),
(314, 21, 6, 'Kiểm tra: Xiên thử vỏ khổ qua thấy mềm; dùng nhiệt kế đo giữa phần nhân dày nhất cần đạt ít nhất 71°C. Nếu chưa đạt, nấu thêm 5 phút rồi kiểm tra lại. Nước cạn thì châm nước nóng để các khoanh gần ngập.'),
(315, 21, 7, 'Hoàn thành: Cho 10 ml nước mắm còn lại, nếm và thêm ít nước nóng nếu đậm. Đun thêm 1 phút, rắc 10 g hành lá còn lại đã thái nhỏ rồi tắt bếp. Múc bằng vá sâu để giữ khoanh và nhân nguyên vẹn.'),
(316, 22, 1, 'Sơ chế bí: Gọt vỏ, bổ dọc rồi bỏ phần ruột xốp và hạt cứng nếu bí già. Rửa, cắt lát dày 0,7–1 cm cho đều. Hành tím băm; hành lá rửa, thái nhỏ và để riêng để thêm sau cùng.'),
(317, 22, 2, 'Sơ chế tôm: Tôm bóc vỏ, bỏ đầu và chỉ lưng, rửa rồi để ráo. Băm thô hoặc cắt đôi con lớn, trộn với 5 ml nước mắm và 0,5 g tiêu. Để trong ngăn mát 5 phút trong lúc chuẩn bị nồi.'),
(318, 22, 3, 'Xào tôm: Làm nóng 10 ml dầu lửa vừa, phi hành tím 20 giây. Cho tôm vào đảo khoảng 1 phút đến khi hơi chuyển hồng. Dùng thìa tách tôm nếu băm để tránh dính thành khối.'),
(319, 22, 4, 'Nấu nước: Rót 1000 ml nước, đun sôi rồi hớt bọt, thêm 2 g muối. Hạ lửa vừa và nấu 2 phút cho tôm chín dần, giữ nước chỉ sôi nhẹ để canh trong.'),
(320, 22, 5, 'Nấu bí: Cho bí vào, nấu 5–7 phút tùy độ dày. Bí đạt khi hơi trong và đũa xiên dễ nhưng không vỡ; tôm đục hoàn toàn, tâm đạt ít nhất 63°C nếu đo. Nếu bí còn trắng đục, cứng ở giữa, nấu thêm 1–2 phút.'),
(321, 22, 6, 'Nêm và dùng: Cho 10 ml nước mắm còn lại, đun 30 giây rồi tắt bếp và rắc hành lá. Múc ra tô ngay khi bí vừa mềm. Nếm nước canh đã nguội bớt; nếu đậm thì thêm chút nước nóng và đun sôi lại.'),
(322, 23, 1, 'Ngâm rong: Cho 8 g wakame khô vào tô nước sạch, ngâm khoảng 5–10 phút hoặc theo bao bì đến khi nở mềm. Vớt ra, rửa nhẹ rồi vắt ráo và cắt miếng 3 cm. Bỏ nước ngâm, không dùng để nấu canh.'),
(323, 23, 2, 'Chuẩn bị đậu: Đậu hũ để ráo, cắt khối 2 cm bằng dao sạch. Gừng cạo vỏ và thái sợi mảnh; hành lá rửa sạch, thái nhỏ. Để đậu trong đĩa riêng để dễ trượt vào nồi mà không vỡ.'),
(324, 23, 3, 'Nấu nước: Cho 900 ml nước và gừng vào nồi, đun sôi rồi hạ lửa vừa nhỏ, nấu 2 phút cho thơm. Thêm 15 ml nước tương và 1 g muối, khuấy tan trước khi cho đậu.'),
(325, 23, 4, 'Nấu đậu: Trượt đậu hũ vào, giữ nước sôi lăn tăn 3–4 phút cho nóng đều đến giữa. Chỉ lắc nồi hoặc đẩy nhẹ bằng vá, không khuấy mạnh khiến đậu vỡ vụn.'),
(326, 23, 5, 'Thêm rong: Cho rong biển đã ráo vào, đun sôi nhẹ thêm 1–2 phút hoặc theo hướng dẫn của loại rong đang dùng. Rong chín mềm nhưng còn độ đàn hồi; không nấu kéo dài đến khi rong nhũn và có mùi nồng.'),
(327, 23, 6, 'Hoàn thành: Nếm nước canh trước khi tăng gia vị vì rong có sẵn vị mặn. Tắt bếp, thêm 5 ml dầu mè và hành lá, đảo nhẹ rồi múc ra tô. Nếu quá đậm, thêm 30–50 ml nước nóng và đun sôi lại.'),
(328, 24, 1, 'Chuẩn bị khoai: Đeo găng nếu da dễ ngứa, gọt vỏ khoai rồi rửa sạch. Dùng bàn bào hoặc thìa nạo khoai thành sợi vụn, không để cục lớn. Không nếm khoai sống; khoai phải được nấu chín hoàn toàn.'),
(329, 24, 2, 'Chuẩn bị thịt: Hành tím băm; hành lá và rau ngổ rửa sạch, cắt nhỏ. Trộn thịt với 5 ml nước mắm, 0,5 g tiêu và một nửa hành tím, đậy lại rồi để ngăn mát 5 phút.'),
(330, 24, 3, 'Xào thịt: Đun 10 ml dầu trong nồi đáy dày trên lửa vừa, phi hành tím còn lại 20 giây. Thêm thịt, đảo và dằm tơi 3–4 phút đến khi mặt thịt chuyển đục. Không xào đến khô cứng.'),
(331, 24, 4, 'Nấu nền: Rót 1100 ml nước, đun sôi và hớt bọt rồi cho 2 g muối. Nấu lửa vừa thêm 4 phút. Thịt bằm cần chín hoàn toàn, đạt ít nhất 71°C nếu dùng nhiệt kế.'),
(332, 24, 5, 'Nấu khoai: Hạ lửa vừa nhỏ, cho khoai vào từng phần và khuấy liên tục 1–2 phút để tách vụn. Nấu thêm 12–15 phút, khuấy sát đáy mỗi 1–2 phút. Canh sánh đều, khoai không còn cục sống hoặc vị bột; nếu đặc quá, thêm nước nóng từng 50 ml.'),
(333, 24, 6, 'Hoàn thành: Thêm 10 ml nước mắm còn lại, khuấy và đun 1 phút. Tắt bếp, cho hành lá và rau ngổ, múc ra tô. Canh nóng rất sánh, nên để nguội bớt trước khi nếm; không tăng lửa mạnh để làm đặc nhanh vì dễ bén đáy.'),
(334, 25, 1, 'Sơ chế sườn: Chặt sườn khúc 3–4 cm, bỏ vụn xương. Cho vào nồi nước ngập, đun sôi 2 phút rồi đổ nước chần. Rửa lại sườn và nồi bằng nước sạch để bỏ bọt bám.'),
(335, 25, 2, 'Chuẩn bị cải: Rửa cải chua 1–2 lần, vắt nhẹ rồi cắt khúc 3 cm. Nếm một miếng nhỏ; nếu quá mặn, ngâm nước sạch 5 phút rồi xả và vắt. Cà chua bổ múi, hành tím băm, hành lá thái nhỏ.'),
(336, 25, 3, 'Hầm sườn: Cho sườn và 1200 ml nước vào nồi, đun sôi, hớt bọt rồi hạ lửa nhỏ. Hé nắp hầm 25–30 phút đến khi thịt bắt đầu mềm. Nếu nước cạn nhiều, thêm nước nóng để giữ gần mức ban đầu.'),
(337, 25, 4, 'Xào cải: Trong chảo riêng, đun 15 ml dầu lửa vừa và phi hành tím 20 giây. Cho cà chua vào đảo 2 phút, thêm cải chua và 8 g đường, xào 3–4 phút để cải dậy mùi và bớt gắt.'),
(338, 25, 5, 'Nấu chung: Cho toàn bộ cải và cà chua vào nồi sườn, nấu lửa nhỏ thêm 10–15 phút. Sườn đạt khi đũa xiên dễ qua thịt, cải mềm vừa. Nếu sườn còn dai, nấu thêm từng 5 phút và châm nước nóng khi cần.'),
(339, 25, 6, 'Nêm: Nếm nước trước, thêm nước mắm từng 5 ml, tối đa 10 ml đã chuẩn bị; có thể dùng ít hơn nếu cải còn mặn. Nếu chua hoặc mặn quá, thêm 50–100 ml nước nóng và đun lại. Không cố dùng thêm nhiều đường để che vị mặn.'),
(340, 25, 7, 'Hoàn thành: Đun sôi nhẹ 1 phút sau khi nêm, cho hành lá và tắt bếp. Múc sườn, cải rồi chan nước vào tô. Canh nên chua dịu và có nước trong; tránh đun sôi mạnh lâu làm sườn khô và nước đục.'),
(341, 26, 1, 'Chuẩn bị đậu: Đậu hũ để ráo, dùng giấy bếp thấm thật khô rồi cắt mỗi miếng làm 3 phần dày 2 cm. Không dùng đậu hũ non vì dễ vỡ. Sả bỏ lớp già, lấy phần trắng non băm nhỏ; tỏi bóc vỏ băm.'),
(342, 26, 2, 'Pha gia vị: Hòa 2 g muối và 4 g đường trong 15 ml nước. Để riêng, chỉ dùng khi áo sả sau khi chiên. Không đổ hỗn hợp có nước vào chảo đang chứa nhiều dầu nóng.'),
(343, 26, 3, 'Chiên: Đun 90 ml dầu trong chảo chống dính lửa vừa, xếp đậu một lớp. Chiên mỗi mặt 3–4 phút đến vàng, cạnh hơi giòn. Chờ lớp vỏ se mới lật bằng sạn rộng, chia mẻ nếu chảo không đủ chỗ.'),
(344, 26, 4, 'Để ráo: Gắp đậu ra vỉ hoặc đĩa có giấy thấm. Chắt dầu còn lại sang vật chứa chịu nhiệt. Giảm lửa nhỏ và cho 10 ml dầu mới vào chảo; chờ nhiệt dịu bớt trước khi phi sả.'),
(345, 26, 5, 'Áo sả: Cho tỏi và sả vào, đảo lửa nhỏ 1–2 phút đến thơm và vàng rất nhạt. Thêm nước gia vị, đảo 15 giây rồi cho đậu trở lại, xóc nhẹ 1–2 phút để sả bám quanh. Nếu sả sẫm nhanh, nhấc chảo và hạ lửa.'),
(346, 26, 6, 'Hoàn thành: Tắt bếp khi đậu nóng đều và sả khô ráo nhẹ, bày ra đĩa cùng 20 ml nước tương để chấm. Món đạt khi vỏ đậu vàng, ruột mềm và sả không có vị khét. Dùng ngay để vỏ chưa bị ỉu.'),
(347, 27, 1, 'Chuẩn bị: Giữ chả cá sống trong ngăn mát đến ngay trước khi trộn. Thì là nhặt bỏ gốc, rửa sạch, để thật ráo rồi thái nhỏ; hành tím băm. Kiểm tra bao bì xem chả đã nêm gia vị hay chưa.'),
(348, 27, 2, 'Trộn và quết: Cho chả vào tô cùng thì là, hành tím, 4 g đường và 1 g tiêu. Nếu chả chưa nêm, thêm 10 ml nước mắm; nếu đã nêm thì giảm hoặc bỏ. Dùng thìa quết cùng một chiều 3–5 phút đến khi hỗn hợp dính và mịn.'),
(349, 27, 3, 'Thử vị: Lấy một miếng nhỏ bằng đầu thìa, chiên chín hoàn toàn trong ít dầu rồi để nguội và nếm. Điều chỉnh phần chả còn lại nếu cần; tuyệt đối không nếm chả cá sống. Đặt tô chả lại ngăn mát 10 phút.'),
(350, 27, 4, 'Tạo hình: Thoa tổng khoảng 5 ml dầu lên tay sạch hoặc găng dùng cho thực phẩm. Chia chả thành 8 miếng, ép dẹt dày 1–1,2 cm, đường kính 5–6 cm. Làm các miếng đều nhau để chín cùng lúc.'),
(351, 27, 5, 'Chiên: Đun 95 ml dầu còn lại trong chảo lửa vừa, khoảng 165–170°C. Xếp chả một lớp, chiên 3–4 phút mỗi mặt; mặt ngoài vàng nhẹ thì lật bằng sạn. Nếu ngoài vàng quá nhanh, hạ lửa để phần giữa kịp chín.'),
(352, 27, 6, 'Kiểm tra chín: Dùng nhiệt kế cắm ngang vào giữa miếng dày nhất, cần đạt ít nhất 63°C. Phần giữa đục, dẻo chắc và không còn hỗn hợp nhão sống. Nếu chưa đạt, chiên thêm 1–2 phút mỗi mặt trên lửa nhỏ hơn.'),
(353, 27, 7, 'Hoàn thành: Gắp ra vỉ sạch cho ráo dầu rồi bày lên đĩa. Chấm tương ớt nếu muốn, hoặc ăn cùng cơm. Món đạt khi vỏ vàng, có mùi thì là và ruột chín mềm dai; không chiên khô đến cứng.'),
(354, 28, 1, 'Làm tôm: Bóc vỏ, bỏ đầu và chỉ lưng, rửa nhẹ rồi thấm thật khô. Có thể giữ đuôi để cầm nhưng cần thấm khô cả phần đuôi. Trộn 0,5 g tiêu và 1 g muối nếu bột chưa có gia vị, để ngăn mát 5 phút.'),
(355, 28, 2, 'Pha bột: Để riêng 30 g bột khô. Cho 120 g bột còn lại vào tô, rót khoảng 140 ml nước lạnh và khuấy vừa hòa; thêm dần tối đa 20 ml còn lại đến khi bột phủ thìa thành lớp mỏng. Nếu bao bì ghi tỉ lệ khác, làm theo bao bì.'),
(356, 28, 3, 'Chuẩn bị dầu: Cho dầu vào nồi nhỏ thành cao, đủ sâu 3–4 cm và không quá nửa chiều cao nồi. Làm nóng lửa vừa đến 170–175°C; nhỏ chút bột thấy nổi lên, sủi bọt đều nhưng không cháy sẫm ngay là có thể bắt đầu.'),
(357, 28, 4, 'Áo tôm: Lăn từng con qua bột khô, giũ bỏ bột thừa rồi nhúng bột ướt. Nhấc lên chờ nhỏ giọt 1–2 giây và đưa sát mặt dầu thả nhẹ theo hướng xa người. Không để nước hoặc đá rơi vào dầu.'),
(358, 28, 5, 'Chiên: Chiên 4–6 con mỗi mẻ, không để dính nhau. Giữ lửa vừa, chiên 3–4 phút và trở một lần đến khi vỏ vàng nhạt, giòn. Chờ dầu nóng trở lại trước mẻ tiếp theo để bột không hút quá nhiều dầu.'),
(359, 28, 6, 'Kiểm tra: Tôm lớn có thể cần thêm 1 phút; tâm thịt đạt ít nhất 63°C, bên trong đục hoàn toàn. Kiểm tra một con đầu mẻ để điều chỉnh thời gian, không chỉ nhìn màu vàng của bột vì bột có thể chín trước tôm.'),
(360, 28, 7, 'Dọn món: Gắp lên vỉ hoặc rổ kim loại cho ráo, không xếp chồng khi còn nóng vì hơi nước làm mềm vỏ. Dùng ngay với tương ớt nếu muốn. Để dầu nguội hẳn trước khi xử lý, không đổ dầu nóng xuống bồn rửa.'),
(361, 29, 1, 'Sơ chế: Dùng cánh gà đã làm sạch, thấm khô rồi cắt đúng khớp để tách cánh giữa và cánh đùi. Loại bỏ vụn xương. Tỏi băm rồi ép qua rây lấy nước; không giữ xác tỏi trên mặt gà vì dễ cháy khi chiên.'),
(362, 29, 2, 'Ướp: Trộn cánh với nước tỏi, 15 ml nước mắm và 1 g tiêu. Nếu bột chiên đã đậm vị, giảm nước mắm còn 5–10 ml. Đậy kín và để ngăn mát 20 phút, không để gà sống lâu ngoài nhiệt độ phòng.'),
(363, 29, 3, 'Áo bột: Để gà ráo nước ướp dư nhưng mặt còn hơi ẩm. Lăn từng miếng qua bột chiên giòn, ấn nhẹ cho bám rồi giũ bột thừa. Xếp riêng 5 phút để bột bám chắc; dùng đúng loại bột cho phép áo khô trên bao bì.'),
(364, 29, 4, 'Làm nóng dầu: Rót dầu đủ sâu khoảng 3–4 cm vào nồi thành cao, không quá nửa nồi. Đun lửa vừa đến 165–170°C. Thả thử chút bột thấy sủi đều và nổi lên; nếu bột sẫm ngay, dầu quá nóng cần hạ lửa.'),
(365, 29, 5, 'Chiên: Cho gà vào từng miếng và chia mẻ để không chật. Chiên 12–16 phút tùy kích thước, trở sau mỗi 3–4 phút. Giữ lửa vừa, hạ nhỏ nếu vỏ đã vàng mà thịt trong còn cần thời gian.'),
(366, 29, 6, 'Kiểm tra: Dùng nhiệt kế đo phần thịt dày nhất sát xương nhưng không chạm xương, cần đạt ít nhất 74°C. Miếng chưa đạt chiên tiếp 2–3 phút rồi đo lại. Không dựa vào riêng màu vàng của vỏ bột để kết luận chín.'),
(367, 29, 7, 'Hoàn thành: Gắp cánh lên vỉ sạch, để ráo 2–3 phút rồi bày ra đĩa. Không đậy kín hoặc xếp chồng nóng làm vỏ ỉu. Dùng với tương ớt nếu thích; dao, đĩa đựng gà chín phải sạch, chưa chạm gà sống.'),
(368, 30, 1, 'Chuẩn bị: Hành tím bóc vỏ, băm; hành lá rửa sạch và thái nhỏ. Trộn thịt với 5 ml nước mắm và 0,5 g tiêu. Đập từng trứng vào chén kiểm tra rồi gom vào tô riêng, nhặt bỏ mảnh vỏ.'),
(369, 30, 2, 'Xào nhân: Đun 10 ml dầu lửa vừa, phi hành tím 20 giây. Cho thịt vào và dằm tơi, xào 4–5 phút đến khi chín đều, không còn cục lớn; thịt bằm cần đạt ít nhất 71°C nếu đo. Trút ra tô sạch, để dịu nóng 3 phút.'),
(370, 30, 3, 'Trộn trứng: Đánh trứng với 5 ml nước mắm và 0,5 g tiêu còn lại, 15 ml nước lọc cùng hành lá. Thêm thịt đã dịu nóng và trộn đều. Không đổ thịt đang nóng sôi trực tiếp vào trứng vì sẽ làm trứng đông lợn cợn.'),
(371, 30, 4, 'Chiên mặt đầu: Làm nóng chảo chống dính 24 cm với 15 ml dầu lửa vừa, rót hỗn hợp và dàn thịt đều. Hạ lửa vừa nhỏ, đậy nắp 3–4 phút đến khi mép đông và mặt trên gần se. Chảo nhỏ hơn nên chia hai mẻ.'),
(372, 30, 5, 'Lật hoặc gập: Luồn sạn quanh mép, gập đôi hoặc chia thành 4 phần để lật dễ hơn. Chiên tiếp 2–3 phút lửa nhỏ. Nếu đáy sẫm quá nhanh mà mặt còn lỏng, hạ lửa và đậy nắp thêm 1 phút.'),
(373, 30, 6, 'Kiểm tra và dùng: Tâm trứng phải đạt ít nhất 71°C, không còn trứng lỏng hoặc thịt sống ở giữa. Trượt ra đĩa, cắt miếng rồi dùng với cơm. Dừng nấu ngay khi chín để trứng giữ độ mềm, không chiên khô cứng.'),
(374, 31, 1, 'Làm sạch: Cá đánh vảy, bỏ mang, ruột và máu đọng; rửa sạch khoang bụng rồi thấm thật khô cả trong lẫn ngoài. Khứa 2–3 đường chéo mỗi mặt vào phần thịt dày, không cắt đứt xương sống.'),
(375, 31, 2, 'Ướp: Xoa tổng 2 g muối lên hai mặt và trong bụng, để trên khay trong ngăn mát 10 phút. Lấy ra, thấm khô nước tiết ra một lần nữa trước khi chiên. Cá ướt sẽ làm dầu bắn mạnh và da dễ dính.'),
(376, 31, 3, 'Pha chấm: Hòa 25 ml nước mắm, 12 g đường và 45 ml nước ấm. Khi đường tan và nước nguội bớt, thêm 15 ml nước cốt chanh, tỏi băm và ớt băm nếu dùng. Để chén nước chấm xa khu vực đặt cá sống.'),
(377, 31, 4, 'Làm nóng dầu: Dùng chảo sâu rộng hơn con cá, rót khoảng 300 ml dầu để ngập nửa thân. Đun lửa vừa khoảng 170°C; thử đầu đũa gỗ khô thấy bọt nhỏ. Đặt cá nhẹ theo hướng xa người, tránh dầu bắn.'),
(378, 31, 5, 'Chiên: Giữ lửa vừa, chiên mặt đầu 8–10 phút đến khi da vàng và tự nhả đáy. Dùng hai sạn đỡ thân cá, lật một lần rồi chiên tiếp 7–9 phút. Không cố cạy khi cá còn dính; chờ thêm 30–60 giây.'),
(379, 31, 6, 'Kiểm tra: Dùng nhiệt kế đo phần thịt dày gần lưng nhưng không chạm xương, cần đạt ít nhất 63°C. Thịt ở đường khứa phải đục và dễ tách. Nếu cá lớn hoặc còn chưa đạt, hạ lửa và chiên thêm từng 2 phút mỗi mặt.'),
(380, 31, 7, 'Dọn món: Nhấc cá lên vỉ sạch cho ráo dầu 2–3 phút rồi chuyển ra đĩa. Dùng cùng nước mắm tỏi chanh đã pha, gỡ xương cẩn thận khi ăn. Không đậy kín cá nóng để giữ lớp da giòn.'),
(381, 32, 1, 'Làm sạch cá: Cá lóc cạo sạch nhớt, bỏ mang, ruột và máu đọng, rửa nhẹ rồi thấm khô. Giữ khoanh dày 2–3 cm để thịt không vỡ khi kho. Hành tím, tỏi băm nhỏ; hành lá cắt khúc.'),
(382, 32, 2, 'Ướp: Trộn cá với 30 ml nước mắm, 4 g đường, 2 g tiêu và một nửa hành tỏi. Đậy tô, để ngăn mát 15–20 phút. Giữ lại toàn bộ nước ướp, không thêm muối vì nước mắm đã đủ mặn.'),
(383, 32, 3, 'Tạo màu: Cho 8 g đường và 15 ml nước vào nồi, đun lửa vừa đến nâu hổ phách. Hạ lửa, cho 15 ml dầu và hành tỏi còn lại, đảo nhanh 15 giây. Nếu đường chuyển đen hoặc có mùi khét, bỏ và làm lại.'),
(384, 32, 4, 'Xếp cá: Cho cá vào một lớp, rót nước ướp và đun lửa vừa 2–3 phút cho mặt dưới săn. Nghiêng nồi nhẹ để nước màu phủ đều, không đảo bằng đũa. Rót 285 ml nước nóng còn lại dọc thành nồi.'),
(385, 32, 5, 'Kho: Đợi sôi rồi hạ lửa nhỏ, hé nắp kho 25–30 phút. Cứ 8–10 phút dùng thìa rưới nước kho lên mặt cá. Nước xuống quá thấp thì thêm từng 30 ml nước nóng; giữ sôi nhẹ thay vì sôi bùng.'),
(386, 32, 6, 'Kiểm tra: Tâm cá cần đạt ít nhất 63°C; thịt đục, chắc và dễ tách khỏi xương. Mở nắp đun thêm 3–5 phút cho sốt sánh nếu còn loãng. Nếm nước kho đã nguội bớt, thêm ít nước nóng nếu đậm quá.'),
(387, 32, 7, 'Dọn món: Rắc 1 g tiêu còn lại và hành lá, đun 30 giây rồi tắt bếp. Để yên 5 phút cho miếng cá chắc hơn trước khi gắp ra đĩa bằng sạn rộng. Giữ một ít nước kho để chan cơm hoặc chấm rau.'),
(388, 33, 1, 'Sơ chế: Thấm khô thịt đã làm sạch, thái lát dày 0,7–1 cm rồi cắt miếng vừa ăn. Sả bỏ lớp già, băm thật nhỏ phần non; hành tím, tỏi và ớt nếu dùng đều băm nhỏ. Sả quá già nên bỏ để món không bị xơ.'),
(389, 33, 2, 'Lọc mắm: Hòa 25 g mắm ruốc với 150 ml nước, để lắng 3 phút rồi gạn qua rây mịn, bỏ cặn dưới đáy. Để riêng phần nước mắm ruốc. Không nếm trực tiếp hỗn hợp khi chưa nấu chín.'),
(390, 33, 3, 'Rang thịt: Cho 5 ml dầu và thịt vào chảo đáy dày, rang lửa vừa 7–9 phút, đảo đều cho thịt săn và tiết mỡ. Nếu mỡ nhiều, múc bớt, giữ khoảng 15 ml trong chảo để phi gia vị.'),
(391, 33, 4, 'Phi sả: Gạt thịt sang một bên, cho hành, tỏi và sả vào chỗ mỡ, đảo lửa vừa nhỏ 1–2 phút cho thơm. Thêm ớt nếu dùng rồi trộn cùng thịt; không để sả hoặc tỏi cháy vàng sẫm.'),
(392, 33, 5, 'Rim: Rót khoảng hai phần ba nước mắm ruốc đã lọc vào, thêm 16 g đường. Đun sôi rồi hạ lửa nhỏ, rim 10–12 phút và đảo mỗi 2 phút. Nếu sắp cạn trước khi thịt mềm, thêm 30–50 ml nước nóng.'),
(393, 33, 6, 'Điều chỉnh: Khi nước đã sôi chín, nếm bằng thìa sạch rồi thêm phần mắm ruốc còn lại từng ít nếu còn nhạt. Nếu đã vừa miệng thì không cần dùng hết. Rim thêm 3–5 phút; thịt heo phải chín hoàn toàn, sốt sánh và bám thịt.'),
(394, 33, 7, 'Hoàn thành: Tắt bếp khi còn ít sốt ở đáy, không rang đến cháy khô. Múc ra đĩa, ăn từng lượng nhỏ cùng cơm và rau. Nếu món quá mặn, thêm nước nóng và một ít thịt hoặc rau ăn kèm, tránh chỉ thêm đường.'),
(395, 34, 1, 'Sơ chế: Thịt ba chỉ đã làm sạch cắt lát dày 0,7 cm. Tôm cắt râu, bỏ phần nhọn đầu, rạch lưng lấy chỉ và rửa rồi để thật ráo; có thể bóc vỏ nếu thích. Hành tím, tỏi băm, hành lá cắt nhỏ.'),
(396, 34, 2, 'Ướp riêng: Trộn thịt với 10 ml nước mắm và một nửa hành tỏi; tôm trộn với 5 ml nước mắm và 0,5 g tiêu. Đậy cả hai tô, ướp ngăn mát 10 phút. Không trộn sống chung vì thời điểm cho vào chảo khác nhau.'),
(397, 34, 3, 'Rang thịt: Cho 5 ml dầu vào chảo, thêm thịt và rang lửa vừa 6–8 phút cho mặt thịt săn, hơi vàng và tiết mỡ. Gạt thịt sang một bên, cho hành tỏi còn lại vào phần mỡ, phi 20 giây rồi trộn đều.'),
(398, 34, 4, 'Rim thịt: Thêm 100 ml nước, 12 g đường và 10 ml nước mắm còn lại. Đun sôi rồi hạ lửa vừa nhỏ, rim thịt 7–10 phút để thịt chín và mềm. Nếu nước cạn trước lúc thêm tôm, châm thêm 2–3 thìa nước nóng.'),
(399, 34, 5, 'Thêm tôm: Cho tôm cùng nước ướp vào, tăng lửa vừa và đảo 2 phút. Hạ lửa vừa nhỏ, rim thêm 3–5 phút, trở tôm để thấm sốt. Không rim tôm ngay từ đầu cùng thịt vì dễ dai.'),
(400, 34, 6, 'Kiểm tra: Tôm chín có vỏ đỏ cam, phần thịt đục hoàn toàn và tâm đạt ít nhất 63°C nếu đo. Thịt heo cũng phải chín; nếu miếng dày, kiểm tra tâm ít nhất 63°C và để nghỉ 3 phút trước khi ăn. Sốt chỉ cần sánh nhẹ.'),
(401, 34, 7, 'Hoàn thành: Rắc 0,5 g tiêu còn lại và hành lá rồi tắt bếp. Nếm sốt đã nguội bớt; nếu đậm, thêm ít nước nóng và đun lại nhanh. Trút ra đĩa khi tôm vừa chín, tránh giữ trên bếp nóng làm tôm khô.'),
(402, 35, 1, 'Chần sườn: Sườn bỏ vụn xương, cho vào nồi nước ngập và đun sôi 2 phút. Đổ nước chần, rửa lại sườn rồi để ráo. Thơm cắt lát dày 1,5 cm; hành tím, tỏi băm; hành lá thái nhỏ.'),
(403, 35, 2, 'Ướp: Trộn sườn với 30 ml nước mắm, 8 g đường, 1 g tiêu và một nửa hành tỏi. Đậy lại và để ngăn mát 10–15 phút. Chưa cho thơm vào ướp để giữ kết cấu thịt ổn định.'),
(404, 35, 3, 'Tạo màu: Cho 8 g đường và 15 ml nước vào nồi đáy dày, đun lửa vừa đến màu hổ phách. Hạ lửa, thêm 15 ml dầu và phần hành tỏi còn lại, đảo 15 giây rồi cho sườn cùng nước ướp vào.'),
(405, 35, 4, 'Kho sườn: Đảo sườn 4–5 phút cho săn, rót 385 ml nước nóng còn lại. Khi sôi, hớt bọt, hạ lửa nhỏ và hé nắp kho 25–30 phút. Trở sườn một lần; nếu cạn, thêm từng 50 ml nước nóng.'),
(406, 35, 5, 'Thêm thơm: Khi đũa bắt đầu xiên qua thịt dễ hơn, thêm thơm và đảo nhẹ. Kho lửa nhỏ 10–15 phút cho thơm tiết vị chua ngọt và sườn mềm. Nếu sườn vẫn dai, nấu thêm từng 5 phút thay vì tăng lửa lớn.'),
(407, 35, 6, 'Cô sốt: Mở nắp và đun lửa vừa 3–5 phút đến khi nước còn khoảng một phần ba chiều cao sườn, sánh nhẹ. Nếm bằng thìa sạch; thơm quá chua thì có thể dùng ít phần thơm hơn khi ăn, quá đậm thì thêm nước nóng.'),
(408, 35, 7, 'Hoàn thành: Rắc hành lá và tắt bếp khi sườn mềm, thơm còn miếng. Múc ra đĩa cùng nước kho; tránh kho khô vì đường và thơm dễ cháy sát đáy. Dùng với cơm trắng khi còn nóng.'),
(409, 36, 1, 'Sơ chế: Thấm khô thịt đã làm sạch, cắt khối 3 cm ngang thớ. Cà rốt gọt vỏ, cắt khúc 3 cm; hành tây bổ múi. Sả đập dập, cắt đoạn dài; hành tím, tỏi và gừng băm nhỏ.'),
(410, 36, 2, 'Ướp: Trộn bò với 12 g bột gia vị bò kho, 10 ml nước mắm, 8 g đường, một nửa hành tỏi gừng và 5 ml dầu. Đậy kín, để ngăn mát 20–30 phút. Nếu bột gia vị đã rất mặn, giảm nước mắm ướp còn 5 ml.'),
(411, 36, 3, 'Xào thịt: Đun 15 ml dầu còn lại trong nồi đáy dày, phi phần hành tỏi gừng còn lại cùng sả trên lửa vừa 30 giây. Cho bò vào, đảo 6–8 phút cho các mặt săn rồi thêm 30 g tương cà, đảo thêm 1 phút.'),
(412, 36, 4, 'Hầm: Rót 1200 ml nước nóng, đun sôi và hớt bọt. Hạ lửa nhỏ, đậy hé nắp hầm 60–75 phút; cứ 20 phút đảo nhẹ và kiểm tra nước. Châm từng 100 ml nước nóng nếu không còn đủ ngập phần lớn thịt.'),
(413, 36, 5, 'Kiểm tra mềm: Xiên đũa qua một khối thịt; nếu còn kháng mạnh hoặc gân còn dai, hầm thêm 15–20 phút trước khi cho cà rốt. Loại thịt và độ già ảnh hưởng thời gian, nên lấy độ mềm làm mốc thay vì chỉ nhìn đồng hồ.'),
(414, 36, 6, 'Thêm rau: Khi bò gần mềm, cho cà rốt vào, nấu lửa nhỏ 15–20 phút đến khi xiên qua dễ. Thêm hành tây trong 5 phút cuối. Không cho cà rốt từ đầu vì sẽ nát trước khi thịt mềm.'),
(415, 36, 7, 'Hoàn thành: Nếm nước dùng rồi thêm dần tối đa 10 ml nước mắm còn lại nếu cần, đun thêm 1 phút. Bỏ các đoạn sả trước khi múc. Sốt có thể hơi sánh tự nhiên, không cần đun khô; dùng với cơm hoặc bánh mì chuẩn bị riêng.'),
(416, 37, 1, 'Sơ chế cá: Làm sạch máu đọng và màng bụng, rửa nhẹ rồi thấm khô cá. Cắt khoanh đều dày 2–3 cm. Nghệ cạo vỏ và giã hoặc băm nhỏ; nên đeo găng để đỡ nhuộm vàng tay. Hành tím, tỏi băm; hành lá thái nhỏ.'),
(417, 37, 2, 'Ướp: Trộn cá với 25 ml nước mắm, 8 g đường, 1 g tiêu, một nửa nghệ và một nửa hành tỏi. Đậy lại, để ngăn mát 15 phút. Xoa nhẹ lên hai mặt cá, không bóp mạnh làm thịt bị bở.'),
(418, 37, 3, 'Phi nghệ: Cho 15 ml dầu vào nồi đáy dày, đun lửa vừa nhỏ. Thêm hành tỏi và nghệ còn lại, đảo 30–45 giây cho dậy mùi, chưa sẫm màu. Nghệ dễ dính đáy nên đảo đều bằng sạn.'),
(419, 37, 4, 'Làm săn cá: Xếp cá một lớp vào nồi, thêm hết nước ướp. Đun lửa vừa 2 phút, dùng thìa rưới phần dầu nghệ lên mặt. Rót 250 ml nước nóng dọc thành nồi để tránh làm cá vỡ.'),
(420, 37, 5, 'Kho: Đợi sôi, hớt bọt và hạ lửa nhỏ, hé nắp kho 20–25 phút. Thỉnh thoảng nghiêng nồi và rưới sốt lên trên, không khuấy mạnh. Nếu nước gần cạn, thêm từng 30 ml nước nóng.'),
(421, 37, 6, 'Kiểm tra và cô sốt: Tâm cá cần đạt ít nhất 63°C, thịt đục và dễ tách khỏi xương. Nếu sốt còn loãng, mở nắp đun thêm 3–5 phút trên lửa vừa nhỏ. Không để nghệ khô cháy bám đáy.'),
(422, 37, 7, 'Hoàn thành: Nếm sốt bằng thìa sạch, thêm ít nước nóng nếu quá đậm rồi đun lại. Rắc hành lá và tắt bếp, để nghỉ 5 phút trước khi gắp ra đĩa. Thành phẩm vàng đều, còn một ít nước kho thơm nghệ.'),
(423, 38, 1, 'Sơ chế: Dùng gà đã làm sạch, thấm khô và chặt miếng đều 3–4 cm, nhặt bỏ vụn xương. Sả bóc lớp già, băm nhỏ phần non; hành tím và tỏi băm. Ớt rửa, bỏ hạt và băm nếu dùng, tránh chạm tay lên mắt.'),
(424, 38, 2, 'Ướp: Trộn gà với 30 ml nước mắm, 12 g đường, 1 g tiêu, một nửa sả, một nửa hành tỏi và ớt. Đậy kín, để ngăn mát 15–20 phút; có thể bỏ hoàn toàn ớt nếu không ăn cay.'),
(425, 38, 3, 'Phi gia vị: Làm nóng 15 ml dầu trong nồi trên lửa vừa nhỏ. Cho hành tỏi và sả còn lại vào, đảo 45–60 giây đến khi thơm. Không phi sả thành màu nâu sẫm vì khi kho tiếp sẽ dễ cháy.'),
(426, 38, 4, 'Xào gà: Cho gà và nước ướp vào, tăng lửa vừa rồi đảo 5–6 phút cho mặt gà chuyển đục và săn. Dùng sạn cạo nhẹ đáy để sả không bám, nếu quá khô có thể thêm 1 thìa nước từ phần đã chuẩn bị.'),
(427, 38, 5, 'Kho: Rót phần nước còn lại trong tổng 200 ml, đun sôi rồi hạ lửa nhỏ. Hé nắp kho 20–25 phút, trở gà một lần. Nếu sốt cạn sớm, thêm từng 30 ml nước nóng và tiếp tục nấu.'),
(428, 38, 6, 'Kiểm tra chín: Dùng nhiệt kế đo phần thịt dày nhất, tránh chạm xương, phải đạt ít nhất 74°C. Nếu chưa đạt, kho thêm 3–5 phút và đo lại. Thịt mềm vừa, sả thơm và nước kho không có mùi khét.'),
(429, 38, 7, 'Hoàn thành: Mở nắp, đun lửa vừa nhỏ 2–3 phút để sốt bám quanh gà. Nếm sốt đã nguội bớt, thêm nước nóng nếu đậm. Tắt bếp khi vẫn còn sốt, múc ra đĩa ăn cùng cơm và rau.');
INSERT INTO `recipe_steps` (`id_recipe_step`, `id_food`, `step_number`, `instruction`) VALUES
(430, 39, 1, 'Luộc trứng: Xếp trứng vào nồi nhỏ, thêm nước nguội ngập hơn trứng 2 cm. Đun sôi rồi hạ lửa vừa, luộc 10 phút. Vớt vào tô nước mát sạch 5 phút để dễ bóc, không dùng lại nước luộc trứng để luộc bầu.'),
(431, 39, 2, 'Sơ chế bầu: Gọt vỏ, bổ dọc và bỏ ruột xốp nếu hạt đã già. Rửa sạch, cắt miếng dày 1–1,5 cm. Không dùng bầu có vị đắng bất thường; chọn quả non để miếng bầu mềm và ít xơ.'),
(432, 39, 3, 'Đun nước: Cho 1500 ml nước và 2 g muối vào nồi sạch, đun sôi mạnh. Chuẩn bị rổ hoặc vá lỗ để vớt bầu ngay khi chín, tránh để bầu tiếp tục ngâm trong nước nóng.'),
(433, 39, 4, 'Luộc bầu: Cho bầu vào nước đang sôi, đảo nhẹ một lần và luộc 4–6 phút từ lúc sôi lại. Xiên đũa qua phần thịt dày thấy dễ và bầu hơi trong là đạt. Miếng dày có thể cần thêm 1 phút.'),
(434, 39, 5, 'Pha chấm trứng: Múc 40 ml nước luộc bầu nóng vào chén, hòa với 20 ml nước mắm và 4 g đường. Bóc vỏ trứng, bổ nhỏ rồi cho vào chén, dằm nhẹ một phần lòng đỏ để nước chấm sánh hơn.'),
(435, 39, 6, 'Dọn món: Vớt bầu cho ráo, bày ra đĩa và dùng với chén nước mắm trứng. Trứng cần có lòng trắng, lòng đỏ đông hoàn toàn. Bầu đạt khi mềm nhưng còn miếng, không luộc lâu đến trong suốt và nát.'),
(436, 40, 1, 'Nhặt rau: Chọn ngọn và lá non, bỏ lá sâu, úa và cọng già nhiều xơ. Bẻ thử cọng, cọng dễ gãy là phần thích hợp; cọng dai kéo sợi nên bỏ. Cắt hoặc bẻ khúc 5–6 cm.'),
(437, 40, 2, 'Rửa: Rửa rau nhiều lần trong nước sạch, nhấc rau ra khỏi chậu để đất cát ở lại đáy. Rửa thêm dưới vòi nước nhẹ rồi để ráo. Tách cọng dày khỏi phần lá và ngọn mềm nếu rau không đồng đều.'),
(438, 40, 3, 'Đun nước: Cho 1500 ml nước và 3 g muối vào nồi rộng, đun sôi mạnh. Chuẩn bị rổ và vá lỗ sạch. Lượng nước cần đủ để rau chìm khi nhấn nhẹ; nếu nồi nhỏ, luộc hai mẻ.'),
(439, 40, 4, 'Luộc cọng: Cho phần cọng dày vào trước, nhấn ngập và luộc 1–2 phút sau khi nước sôi lại. Mở nắp để dễ theo dõi, đảo nhẹ một lần cho phần cọng trên mặt cũng ngập nước.'),
(440, 40, 5, 'Luộc lá: Thêm lá và ngọn, luộc thêm 3–4 phút đến khi rau mềm, cọng dễ cắn và hết vị nhựa sống. Nếu cọng còn dai, nấu thêm 1 phút rồi thử lại. Không chỉ nhìn màu lá để quyết định rau đã chín.'),
(441, 40, 6, 'Dọn món: Vớt ra rổ, để ráo ngay rồi xếp ra đĩa, không ngâm trong nước luộc. Rót 25 ml nước tương để chấm, dùng khi rau còn ấm. Không đậy kín rau nóng vì hơi nước giữ lại làm lá dễ nhũn.'),
(442, 41, 1, 'Chuẩn bị gà: Dùng gà đã làm sạch và bỏ nội tạng, kiểm tra bỏ phần lông sót, thấm khô khoang bụng. Tránh xịt rửa gà dưới vòi mạnh làm bắn nước sống. Rửa tay và dụng cụ sau khi chạm gà sống.'),
(443, 41, 2, 'Chuẩn bị gia vị: Gừng rửa sạch, đập dập; hành tím bóc vỏ, đập nhẹ. Lá chanh rửa sạch, để ráo, giữ 2 lá nguyên để luộc, phần còn lại bỏ gân cứng và thái chỉ thật mảnh để rắc sau.'),
(444, 41, 3, 'Xếp nồi: Đặt gà vào nồi vừa kích thước, cho gừng, hành tím, 2 lá chanh và 5 g muối. Rót khoảng 3000 ml nước nguội để ngập gà 2–3 cm. Nếu nồi rộng, tăng nước đủ ngập; không bắt đầu bằng nước sôi.'),
(445, 41, 4, 'Luộc: Đun lửa vừa đến sôi nhẹ, hớt bọt rồi hạ lửa nhỏ và hé nắp. Nấu 30–40 phút tính từ khi sôi nhẹ, trở gà cẩn thận một lần bằng kẹp và vá lớn. Không để sôi bùng vì da dễ rách và thịt khô.'),
(446, 41, 5, 'Kiểm tra chín: Đo nhiệt kế ở phần dày nhất của đùi và ức, tránh xương, tất cả điểm cần đạt ít nhất 74°C. Nếu chưa đạt, nấu thêm từng 5 phút rồi đo lại. Không thay phép đo bằng việc chỉ nhìn nước chảy ra trong hay đục.'),
(447, 41, 6, 'Để nghỉ và pha chấm: Khi gà đạt nhiệt độ, tắt bếp, để trong nước luộc 5 phút rồi vớt ra khay sạch, nghỉ thêm 10 phút. Trộn 3 g muối còn lại, 1 g tiêu và 15 ml nước cốt chanh để làm chén chấm.'),
(448, 41, 7, 'Chặt và dùng: Dùng dao, thớt sạch, chặt gà theo khớp rồi thành miếng vừa ăn, xếp lên đĩa và rắc lá chanh thái chỉ. Không dùng lại thớt gà sống khi chưa vệ sinh. Món đạt khi thịt chín mềm, da nguyên và thơm lá chanh.'),
(449, 42, 1, 'Chuẩn bị thịt: Kiểm tra phần da đã cạo sạch lông, thấm khô thịt đã làm sạch và chia dải dày 4 cm. Gừng thái lát, hành tím bóc vỏ đập nhẹ. Dùng khu vực riêng cho thịt sống, không để nước thịt dính vào rau.'),
(450, 42, 2, 'Luộc: Cho thịt, gừng, hành tím và 4 g muối vào nồi, rót 1500 ml nước nguội đủ ngập thịt. Đun sôi, hớt bọt rồi hạ lửa nhỏ, hé nắp luộc 25–35 phút. Trở thịt một lần và châm nước nóng nếu không còn ngập.'),
(451, 42, 3, 'Chuẩn bị rau: Trong lúc chờ, nhặt xà lách và rau thơm, rửa kỹ từng lá nhiều lần bằng nước sạch rồi để thật ráo. Dưa leo rửa, cắt bỏ hai đầu và thái que. Chuẩn bị bằng dao thớt sạch chưa chạm thịt sống.'),
(452, 42, 4, 'Pha chấm: Hòa 30 ml nước mắm, 16 g đường và 100 ml nước ấm. Đợi nguội bớt rồi thêm 20 ml nước cốt chanh và tỏi băm. Nếm bằng thìa sạch, thêm ít nước nếu còn đậm; không thêm chanh khi nước còn quá nóng.'),
(453, 42, 5, 'Kiểm tra thịt: Đo tâm miếng dày nhất đạt ít nhất 63°C rồi gắp ra khay sạch và để nghỉ tối thiểu 3 phút, tốt hơn 5–10 phút cho dễ thái. Nếu muốn da mềm hơn, tiếp tục luộc thêm 5 phút trước khi vớt.'),
(454, 42, 6, 'Thái và bày: Thái thịt ngang thớ lát dày 2–3 mm. Bày riêng thịt, rau, dưa leo, bún và bánh tráng. Bún dùng loại mới, làm nóng hoặc xử lý theo hướng dẫn nơi sản xuất rồi để ráo trước khi ăn.'),
(455, 42, 7, 'Cuốn: Làm ẩm bánh tráng theo bao bì, đặt lên đĩa sạch. Xếp ít xà lách, rau thơm, dưa leo, bún và 2–3 lát thịt vào phần gần mép, gập hai bên rồi cuộn chắc vừa tay. Chấm nước mắm đã pha, cuốn lượng vừa phải để bánh không rách.'),
(456, 43, 1, 'Nhặt: Bỏ lá ngoài héo, sâu hoặc dập; bổ bắp cải và cắt bỏ phần lõi trắng quá cứng. Tách lá hoặc chia miếng nhỏ để nhìn rõ và làm sạch các kẽ, không chỉ rửa mặt ngoài bắp.'),
(457, 43, 2, 'Rửa và cắt: Rửa từng lá dưới vòi nước sạch, để ráo rồi cắt miếng khoảng 4–5 cm. Cọng dày có thể thái mỏng hơn lá để nhanh chín. Gừng rửa sạch, thái 3–4 lát mỏng.'),
(458, 43, 3, 'Đun nước: Cho 1500 ml nước, 3 g muối và gừng vào nồi rộng, đun sôi mạnh. Chuẩn bị vá lỗ cùng rổ sạch. Nếu bắp cải nhiều so với nồi, chia hai mẻ để nước sôi lại nhanh.'),
(459, 43, 4, 'Luộc cọng: Thả phần cọng dày vào trước, luộc 1–2 phút từ lúc nước sôi lại. Nhấn ngập bằng vá, không nén chặt. Giữ lửa vừa lớn và mở nắp để dễ theo dõi.'),
(460, 43, 5, 'Luộc lá: Thêm phần lá vào, đảo nhẹ rồi luộc thêm 2–3 phút. Lá hơi trong, mềm nhưng chưa nhũn; cọng dễ cắn và hết vị hăng sống là đạt. Miếng dày cần thêm khoảng 1 phút.'),
(461, 43, 6, 'Dọn món: Vớt ngay vào rổ cho ráo rồi bày ra đĩa, bỏ các lát gừng nếu không muốn ăn. Rót 25 ml nước tương để chấm. Không ngâm bắp cải trong nước nóng sau khi tắt bếp vì rau sẽ tiếp tục mềm và mất độ giòn.'),
(462, 44, 1, 'Chọn và gọt mướp: Dùng quả non, bỏ quả già nhiều xơ hoặc có vị đắng bất thường. Gọt lớp vỏ xanh cứng, rửa sạch rồi cắt xéo dày 1,5 cm. Miếng quá mỏng sẽ nát trước khi kịp thấm gia vị.'),
(463, 44, 2, 'Chuẩn bị tỏi: Bóc vỏ tỏi, đập dập rồi băm thô; hành lá rửa sạch, cắt khúc 2 cm. Pha 10 ml nước tương, 1 g muối với 30 ml nước lọc, khuấy tan và để gần bếp.'),
(464, 44, 3, 'Phi thơm: Cho 20 ml dầu vào chảo rộng, làm nóng lửa vừa rồi cho hai phần ba tỏi. Đảo 15–20 giây đến khi dậy mùi. Không phi đến nâu sẫm vì tỏi còn tiếp tục nấu cùng mướp.'),
(465, 44, 4, 'Xào mướp: Cho mướp vào, tăng lửa vừa lớn và đảo nhẹ 1 phút. Rót chén gia vị đã pha quanh thành chảo, đảo đều rồi đậy nắp 1–2 phút để hơi nóng làm chín phần giữa.'),
(466, 44, 5, 'Kiểm tra: Mở nắp, thêm phần tỏi còn lại và đảo 2–3 phút. Mướp chín khi hơi trong, mềm khi xiên đũa nhưng vẫn còn miếng. Nếu còn cứng, nấu thêm 1 phút; không thêm nhiều nước vì mướp sẽ tiết nước.'),
(467, 44, 6, 'Hoàn thành: Cho hành lá, đảo 20 giây và tắt bếp, trút ra đĩa cùng nước xào. Nếu nước nhiều, chấp nhận phần nước ngọt để chan cơm thay vì nấu cạn làm mướp nhũn. Nếm khi nguội bớt trước khi thêm gia vị.'),
(468, 45, 1, 'Làm sạch mực: Kéo bỏ đầu và ruột, lấy mai cứng, bỏ túi mực, mắt và răng ở giữa tua. Rửa kỹ khoang thân rồi để ráo, thấm khô. Cắt thân khoanh dày 1 cm hoặc miếng 3 cm, tua dài cắt ngắn.'),
(469, 45, 2, 'Chuẩn bị rau: Cần tây bỏ gốc, tước xơ cọng già, rửa kỹ và cắt khúc 4 cm, tách cọng với lá. Hành tây cắt múi 1 cm, tỏi băm, gừng thái sợi. Pha dầu hào, nước mắm, tiêu với 30 ml nước.'),
(470, 45, 3, 'Xào mực: Làm nóng chảo rộng lửa lớn với 15 ml dầu, phi một nửa tỏi và gừng 15 giây. Cho mực ráo vào, đảo 1–2 phút đến khi mặt ngoài chuyển trắng, miếng hơi cong. Trút ra tô sạch để nấu tiếp sau.'),
(471, 45, 4, 'Xào rau: Cho 10 ml dầu còn lại và phần tỏi còn lại vào chảo, đảo 15 giây. Thêm cọng cần tây cùng hành tây, xào lửa lớn 1–2 phút cho rau hơi mềm nhưng vẫn giòn.'),
(472, 45, 5, 'Kết hợp: Cho mực và nước tiết ra trong tô vào lại chảo, rót sốt, thêm lá cần tây. Đảo 1–2 phút đến khi mực đục hoàn toàn, không còn phần trong và tâm đạt ít nhất 63°C nếu đo. Miếng dày cần thêm thời gian.'),
(473, 45, 6, 'Hoàn thành: Tắt bếp khi mực vừa chín, trút ra đĩa ngay. Nếm nước sốt đã nguội bớt; không đun lâu chỉ để làm cạn nước vì mực sẽ dai. Nếu chảo nhỏ, chia mực hai mẻ ngay từ đầu để không bị luộc trong nước tiết ra.'),
(474, 46, 1, 'Sơ chế: Tôm đã bóc vỏ rạch lưng lấy chỉ, rửa rồi thấm khô. Bông cải tách nhánh 3 cm và rửa kỹ kẽ bông; thân gọt xơ, thái mỏng. Cà rốt gọt vỏ, cắt lát 0,3–0,5 cm; tỏi băm.'),
(475, 46, 2, 'Chần rau: Đun 1500 ml nước với 3 g muối. Khi sôi, cho cà rốt vào 2 phút rồi thêm bông cải, luộc thêm 2 phút. Vớt rau để ráo, giữ 45 ml nước chần nóng để pha sốt.'),
(476, 46, 3, 'Pha sốt: Hòa 15 ml dầu hào, 10 ml nước tương và 0,5 g tiêu cùng 45 ml nước chần. Đặt rau, tôm và sốt cạnh bếp; không cần thêm muối vào tôm vì sốt đã có độ mặn.'),
(477, 46, 4, 'Xào tôm: Đun 15 ml dầu lửa vừa lớn trong chảo rộng, phi một nửa tỏi 15 giây. Cho tôm vào, đảo 2–3 phút đến khi gần đục hết và cong nhẹ. Trút ra tô sạch để tiếp tục nấu ở bước cuối.'),
(478, 46, 5, 'Xào rau: Cho 10 ml dầu và tỏi còn lại vào chảo, đảo 15 giây rồi thêm rau đã chần. Xào lửa lớn 1 phút, rót một nửa sốt, đảo thêm 1 phút để rau nóng đều.'),
(479, 46, 6, 'Kết hợp: Cho tôm cùng nước trong tô và sốt còn lại vào, đảo 1–2 phút. Tôm chín phải đục toàn bộ, tâm đạt ít nhất 63°C nếu đo; cọng bông cải và cà rốt xiên dễ nhưng còn giòn. Nếu rau còn cứng, nấu thêm 1 phút với ít nước nóng.'),
(480, 46, 7, 'Hoàn thành: Tắt bếp và trút ra đĩa ngay khi tôm chín. Nước sốt chỉ cần phủ mỏng, không nấu đến khô. Nếu vị quá đậm, thêm 1–2 thìa nước nóng và đảo nhanh rồi tắt, dùng cùng cơm.'),
(481, 47, 1, 'Thái gà: Dùng thịt gà đã làm sạch, thấm khô rồi thái ngang thớ dày khoảng 0,5 cm. Bỏ xương vụn nếu còn, để thịt vào tô riêng. Dùng dao thớt khác hoặc rửa sạch trước khi sơ chế rau.'),
(482, 47, 2, 'Ướp: Trộn gà với 10 ml nước mắm, 10 ml dầu hào, 0,5 g tiêu và một nửa tỏi đã băm. Đậy lại, ướp ngăn mát 10 phút. Trong lúc chờ, băm hành tím và cắt nhỏ hành lá.'),
(483, 47, 3, 'Chuẩn bị mướp: Gọt bỏ vỏ cứng, rửa và cắt xéo dày 1,5 cm. Bỏ phần ruột già nhiều xơ; nếu quả có vị đắng bất thường thì không dùng. Để mướp ráo, chưa trộn chung với gà sống.'),
(484, 47, 4, 'Xào gà: Đun 20 ml dầu trong chảo rộng lửa vừa lớn, phi hành tím và tỏi còn lại 20 giây. Cho gà vào, dàn đều rồi đảo 4–5 phút cho các mặt chuyển đục và săn.'),
(485, 47, 5, 'Nấu mướp: Cho mướp và 50 ml nước vào chảo, đảo nhẹ rồi đậy nắp 2 phút trên lửa vừa. Mở nắp và xào thêm 2–3 phút đến khi mướp trong nhẹ, xiên dễ. Không cho quá nhiều nước vì mướp còn tiết nước.'),
(486, 47, 6, 'Kiểm tra và dùng: Đo tâm miếng gà dày nhất đạt ít nhất 74°C; nếu chưa đạt, nấu thêm 1–2 phút rồi đo lại. Rắc hành lá, đảo 20 giây và tắt bếp. Trút ra đĩa khi mướp còn nguyên miếng và dùng với cơm.'),
(487, 48, 1, 'Sơ chế: Thịt bò thấm khô, thái ngang thớ lát dày 2–3 mm. Bông cải tách nhánh 3 cm, gọt xơ phần thân rồi thái lát, rửa kỹ kẽ bông. Tỏi bóc vỏ và băm nhỏ, để riêng nửa phần cho thịt.'),
(488, 48, 2, 'Ướp bò: Trộn bò với 10 ml dầu hào, 10 ml nước tương, 1 g tiêu, 5 ml dầu và một nửa tỏi. Đậy lại, để ngăn mát 10 phút trong lúc chần bông cải, không cần thêm muối.'),
(489, 48, 3, 'Chần rau: Đun sôi 1500 ml nước với 3 g muối, cho bông cải vào 2–3 phút đến khi cọng hơi mềm. Vớt ráo, giữ 45 ml nước chần rồi hòa cùng 10 ml dầu hào còn lại để làm sốt xào.'),
(490, 48, 4, 'Xào bò: Làm nóng chảo rộng lửa lớn, thêm 15 ml dầu và trải bò một lớp. Để 30 giây rồi đảo 1–2 phút cho mặt thịt chuyển đục, trút ra tô sạch. Nếu chảo hẹp, chia hai mẻ để bò không ra quá nhiều nước.'),
(491, 48, 5, 'Xào bông cải: Thêm 10 ml dầu còn lại và tỏi còn lại, phi 15 giây rồi cho rau vào. Đảo lửa lớn 1 phút, rót sốt đã pha và xào thêm 1 phút. Cọng rau cần vừa mềm, không còn cứng ở giữa.'),
(492, 48, 6, 'Kết hợp: Cho bò cùng nước trong tô trở lại, đảo 1–2 phút cho chín đều và sốt bám rau. Tâm thịt bò cần đạt ít nhất 63°C rồi nghỉ 3 phút trước khi ăn. Nếu rau còn cứng, nên nấu rau thêm trước khi đưa bò trở lại.'),
(493, 48, 7, 'Hoàn thành: Tắt bếp, chuyển ra đĩa và dùng nóng sau thời gian nghỉ. Nước sốt chỉ cần một lớp mỏng; không cố đun cạn vì bò sẽ dai. Nếu sốt đậm, thêm 1–2 thìa nước nóng và đảo nhanh.'),
(494, 49, 1, 'Chuẩn bị: Cà chua bỏ cuống, băm nhỏ; hành tây thái hạt lựu, tỏi băm. Trộn bò bằm với 15 ml nước tương và 1 g tiêu, để ngăn mát trong lúc luộc nui. Thịt bò ở món này là bò bằm, cần nấu chín hoàn toàn.'),
(495, 49, 2, 'Luộc nui: Đun sôi 2000 ml nước với 5 g muối, cho nui vào và khuấy ngay để không dính. Nấu theo thời gian trên bao bì nhưng ngắn hơn 1 phút vì nui còn xào. Cắn thử thấy mềm ngoài và lõi hơi chắc, không còn bột sống cứng.'),
(496, 49, 3, 'Để ráo: Múc giữ 120 ml nước luộc rồi đổ nui ra rổ, không xả nước nếu sẽ xào ngay. Trộn nui với 5 ml dầu để hạn chế dính. Không để nui ngâm trong nước luộc khi chờ sốt.'),
(497, 49, 4, 'Xào bò: Làm nóng 20 ml dầu còn lại lửa vừa, phi tỏi 20 giây. Thêm hành tây, đảo 2 phút rồi cho bò vào, dằm tơi và xào 4–5 phút. Không để thịt đóng thành cục lớn.'),
(498, 49, 5, 'Nấu sốt: Thêm cà chua, 30 g tương cà, 4 g đường và 120 ml nước luộc nui. Hạ lửa vừa nhỏ, nấu 7–10 phút, dằm cà chua cho mềm. Thịt bò bằm cần đạt ít nhất 71°C nếu đo; sốt có độ sệt nhưng vẫn chảy được.'),
(499, 49, 6, 'Xào nui: Cho nui vào chảo sốt, đảo nhẹ lửa vừa 2–3 phút cho sốt bám từng ống. Nếu sốt quá đặc, thêm từng 15–30 ml nước nóng. Nếu nui còn cứng ở lõi, đậy nắp thêm 1 phút với chút nước.'),
(500, 49, 7, 'Hoàn thành: Nếm nui sau khi để nguội bớt rồi tắt bếp, chia ra 3 đĩa. Nui chín mềm vừa và không bở nát, thịt tơi, sốt phủ đều. Không xào kéo dài để làm khô vì nui sẽ hút hết sốt và dính thành khối.'),
(501, 50, 1, 'Chuẩn bị cải: Rửa cải chua 1–2 lần, nếm thử một miếng nhỏ để kiểm tra độ mặn. Nếu quá mặn, ngâm nước sạch 5 phút rồi xả lại. Vắt ráo và cắt khúc 1–2 cm, bỏ phần gốc già quá cứng.'),
(502, 50, 2, 'Chuẩn bị trứng: Đập từng quả vào chén kiểm tra rồi gom vào tô, đánh với 0,5 g tiêu. Hành tím bóc vỏ, băm nhỏ; hành lá rửa và thái nhỏ. Chưa cho nước mắm vào trứng để dễ kiểm soát vị của cải.'),
(503, 50, 3, 'Phi hành: Đun 20 ml dầu trong chảo chống dính trên lửa vừa. Cho hành tím vào, đảo 20–30 giây đến khi thơm, chưa vàng sẫm. Cho cải đã vắt ráo vào, tránh đổ nước còn đọng trong tô.'),
(504, 50, 4, 'Xào cải: Đảo lửa vừa lớn 4–5 phút, thêm 4 g đường. Khi cải ráo hơn, nếm rồi thêm từng ít nước mắm, tối đa 5 ml nếu cần. Nếu cải đã đủ mặn thì bỏ qua nước mắm.'),
(505, 50, 5, 'Thêm trứng: Hạ lửa vừa nhỏ, dàn cải đều rồi rót trứng vào. Chờ 20–30 giây cho trứng bắt đầu đông, sau đó đảo nhẹ thành mảng 2–3 phút. Trứng phải đông hết, không còn phần lỏng; tâm đạt 71°C nếu đo.'),
(506, 50, 6, 'Hoàn thành: Rắc hành lá, đảo 20 giây rồi tắt bếp. Trút ra đĩa khi trứng vừa chín để giữ độ mềm. Món đạt khi cải ráo, trứng bám quanh cải thành mảng, không khô vụn hoặc còn nước trứng sống.');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id_report` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED DEFAULT NULL,
  `target_type` enum('post','comment') NOT NULL,
  `target_id` int(10) UNSIGNED NOT NULL,
  `reason` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('pending','resolved','rejected') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id_report`, `id_user`, `target_type`, `target_id`, `reason`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'comment', 4, 'Nội dung không phù hợp', 'Người dùng yêu cầu Admin kiểm tra bình luận này.', 'rejected', '2026-10-05 14:52:03', '2026-10-13 23:09:21'),
(2, 3, 'post', 4, 'Thông tin cần kiểm tra', 'Yêu cầu kiểm tra nội dung bài viết.', 'resolved', '2026-10-05 14:52:03', '2026-10-05 14:52:03');

-- --------------------------------------------------------

--
-- Table structure for table `shopping_lists`
--

CREATE TABLE `shopping_lists` (
  `id_shopping_list` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `id_food` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
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
  `id_shopping_list_item` int(10) UNSIGNED NOT NULL,
  `id_shopping_list` int(10) UNSIGNED NOT NULL,
  `id_ingredient` int(10) UNSIGNED NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_checked` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
  `id_user` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `status` enum('active','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `name`, `email`, `password`, `avatar`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', 'scrypt$28be22e72c7bdbf725f1f5fa5e3fc68d$3d065ef50b6cccd98f98b11c55da1aa4aea3eb654161544f7ccf5df4fa84e7a6a14982bfb00088fd2aef5233aed9114b748f88d10eb52ff853948b3c32c68c83', '/images/users/admin.jpg', 'admin', 'active', '2026-10-05 14:52:02', '2026-10-13 13:03:43'),
(2, 'Nguyễn Văn An', 'an@gmail.com', 'scrypt$604b73119208f37d0a35770465dd3289$4628652a7434814a5e0077841246a5ba3f791fef65ba8f9b8cab5c1325a56d0558b0d8a527971ccdcdf50bc1c3cdf9e3904b4f4865de556fd71ab08952103af5', '/images/users/nguyen-van-an.jpg', 'user', 'active', '2026-10-05 14:52:02', '2026-10-13 23:04:21'),
(3, 'Trần Minh', 'minh@gmail.com', '123456', '/images/users/tran-minh.jpg', 'user', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(4, 'Lê Thu Hương', 'huong@gmail.com', '123456', '/images/users/le-thu-huong.jpg', 'user', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(5, 'Phạm Hoàng Nam', 'nam@gmail.com', '123456', '/images/users/pham-hoang-nam.jpg', 'user', 'active', '2026-10-05 14:52:02', '2026-10-05 14:52:02'),
(6, 'Tủn', 'tuntun@gmail.com', 'scrypt$234667993a42357b26c575ca7d92a739$fe1f1e7a9ed0de2e9a16edf93de887dd968a362933b35d5dde4fe9c81dc0350605ed60500b37dcce4bfc7992d6eeded8d6ceaa2031a4f7d3d94f787a38ea3b7d', '/images/users/admin.jpg', 'user', 'active', '2026-10-13 14:23:54', '2026-10-13 14:23:54'),
(7, 'dhkwbskansn', 'txuan@gmail.com', 'scrypt$bedca795ee09af347203543a1beff9bd$c060661d496f87f590241d06a523064d5eb7881a884a23c5e6419e74cbf13254cc72874cdef4f4d3f199f971b6199117779fd4d2363615dbc587f5be5c8f29ed', '/images/users/admin.jpg', 'user', 'active', '2026-10-13 14:45:00', '2026-10-13 14:45:00'),
(8, 'Thuy Trang', 'thuytrang5709@gmail.com', 'scrypt$1636b4cdb6ff568daaf57a16234e742a$2fcfca387243cf00668aa0ad3dedda398ddda899dc6520bd58f68f96fb167ffafd122aeec9c915bbc9d5facfb8cec104fe26e8faa95ce70c6ddf1f0c3cadcab2', '/images/users/admin.jpg', 'user', 'active', '2026-10-13 19:42:47', '2026-10-13 19:42:47'),
(9, 'thu thảo', 'nguyenthithuthao28062006@gmail.com', 'scrypt$83c08e777336b06603fc7f4b3c229c93$17e27eb3c33e8e69094ae2fcf3b04b3bf72f43a2725a313fdf5099c7f1f69c54831b0d82251cd23d28293c9e6b2e8060825547eb580e80f307db454b7a257463', '/images/users/admin.jpg', 'user', 'active', '2026-10-13 19:59:17', '2026-10-13 19:59:17'),
(10, 'Vỹ An', 'vyan@gmail.com', 'scrypt$6ab27c0c4c6ff0732160ba7d3bab95d2$fddb2cee2687c6fa0d9b135357defe723fd925d6cc1751102c20534775410960e30acf3d5b71585d5d41539027e680b9d10ee0975a2cbfe67425e1314b232093', '/images/users/admin.jpg', 'user', 'active', '2026-10-13 22:20:31', '2026-10-13 22:20:31'),
(11, 'Lý anh qui', 'sndhsh@gmail.com', 'scrypt$bd8ec5c08aacb200ce61157f73267211$e64e93393ec0856ba18d10c95495e5980bf804b7c0e84b3f70ab80b9b6a5f220f7784dc4a19f07bf27e93fb0ffaa453652d981d9f25efbb9a161a047a8283be9', '/images/users/admin.jpg', 'user', 'active', '2026-10-13 23:34:44', '2026-10-13 23:34:44'),
(12, 'Nguyễn Chí Linh', 'chilinh0605@gmail.com', 'scrypt$86a75a3bbcca6a200a08047ea3d5740c$f09c9a2130bb9c1f0b675e46236e0f8ad6f7d103f41464926da1b51c05bbaa23107a29d8a02d6f3c8f69513606dc8558e45d54bca949953ba524d88935536494', '/images/users/admin.jpg', 'user', 'active', '2026-10-13 23:38:58', '2026-10-13 23:38:58'),
(13, 'Nguyễn Trung', 'ntrungz0704@gmail.com', 'scrypt$b8f0ecc92cc37f3d41cb9229686eeee7$618b648066d2dc86fc561815c8cdd14e030d09dc733df6a7c63865fc3fc3bf0b1ec01f3617f45d88a4becbb4068853f3f94038661aa3bb53884ff3998212f27b', '/images/users/admin.jpg', 'user', 'active', '2026-10-13 23:40:50', '2026-10-13 23:40:50'),
(14, 'Terii', 'tamlhmts02106@gmail.com', 'scrypt$44a20feca14ab8003579322d228d111d$d4b080a9c6a041f2452729ca4028080da0b89f241b21d5e7500fec1ed0681db534ef6238266d25eaa08443f60ee001528668c60ac5587f9e7899f9180ca1c060', '/images/users/admin.jpg', 'user', 'active', '2026-10-13 23:47:12', '2026-10-13 23:47:12'),
(15, 'Yến Nhi', 'maileyennhi@gmail.com', 'scrypt$5dffd73b9167bc85d1819740477fa2d7$b6efa09a965ec210152b3c846c9a6a5a848862576fbbdc264f582cb5ff9b24927b1eb3bd280d6d4ad54315749e98bf89c337f76334b0faa857e922ed1106ff52', '/images/users/admin.jpg', 'user', 'active', '2026-10-13 23:47:49', '2026-10-13 23:47:49'),
(16, 'Ngọc Trâm', 'tranthingoctram@gmail.com', 'scrypt$42ac02787bda96ba413c48920ea0cc6f$52053501cc7a00fe3c558b2122f3092359f91b13864ef260f7da64ec55fba67b96b40fd64eb0343ef07f616e061f9cea5690cac1f8f681735283de44499656a8', '/images/users/admin.jpg', 'user', 'active', '2026-10-13 23:49:00', '2026-10-13 23:49:00'),
(17, 'Kiều Trúc', 'trucyeu@gmail.com', 'scrypt$230450fdc2de4496898a79b32e20dcbe$ea5bcddf3fc4f3e7553a20b0ead83e8c2a6995b34ecb4a20b656560411c5fd485838fe6abc0d545e0dcdb7b4470c7407be79c1b7a43d1198777481e8a0981415', '/images/users/admin.jpg', 'user', 'active', '2026-10-19 07:53:40', '2026-10-19 07:53:40');

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
  MODIFY `id_category` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id_favorite` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id_food` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `food_ingredients`
--
ALTER TABLE `food_ingredients`
  MODIFY `id_food_ingredient` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=737;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id_ingredient` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id_notification` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id_post` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id_post_like` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `recipe_steps`
--
ALTER TABLE `recipe_steps`
  MODIFY `id_recipe_step` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=693;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id_report` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shopping_lists`
--
ALTER TABLE `shopping_lists`
  MODIFY `id_shopping_list` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shopping_list_items`
--
ALTER TABLE `shopping_list_items`
  MODIFY `id_shopping_list_item` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
  ADD CONSTRAINT `fk_foods_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON UPDATE CASCADE;

--
-- Constraints for table `food_ingredients`
--
ALTER TABLE `food_ingredients`
  ADD CONSTRAINT `fk_food_ingredients_food` FOREIGN KEY (`id_food`) REFERENCES `foods` (`id_food`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_food_ingredients_ingredient` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredients` (`id_ingredient`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `fk_shopping_items_ingredient` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredients` (`id_ingredient`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_shopping_items_list` FOREIGN KEY (`id_shopping_list`) REFERENCES `shopping_lists` (`id_shopping_list`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
