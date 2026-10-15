-- Add enough foods to make the public site have 50 active foods.
-- Safe to run more than once: existing slugs/ingredients/steps are skipped.
SET NAMES utf8mb4;
START TRANSACTION;

SET @foods_needed := GREATEST(0, 50 - (SELECT COUNT(*) FROM foods WHERE status = 'active'));

CREATE TEMPORARY TABLE tmp_food_candidates (
  ord INT NOT NULL PRIMARY KEY,
  category_slug VARCHAR(150) NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  cooking_time SMALLINT UNSIGNED NOT NULL,
  servings TINYINT UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_food_candidates (ord, category_slug, name, slug, description, image, cooking_time, servings) VALUES
(1, 'mon-canh', 'Canh rau ngót thịt bằm', 'canh-rau-ngot-thit-bam', 'Rau ngót nấu thịt bằm ngọt nước, dễ ăn cho bữa cơm gia đình.', '/images/foods/canh-rau-ngot-thit-bam.jpg', 25, 4),
(2, 'mon-canh', 'Canh mướp tôm', 'canh-muop-tom', 'Canh mướp nấu tôm thanh ngọt, hợp những ngày cần món nhẹ bụng.', '/images/foods/canh-muop-tom.jpg', 20, 4),
(3, 'mon-canh', 'Canh khổ qua nhồi thịt', 'canh-kho-qua-nhoi-thit', 'Khổ qua nhồi thịt nấu mềm, vị đắng nhẹ và nước dùng trong.', '/images/foods/canh-kho-qua-nhoi-thit.jpg', 45, 4),
(4, 'mon-canh', 'Canh bí xanh tôm', 'canh-bi-xanh-tom', 'Bí xanh mềm mát nấu cùng tôm, nước canh ngọt tự nhiên.', '/images/foods/canh-bi-xanh-tom.jpg', 25, 4),
(5, 'mon-canh', 'Canh rong biển đậu hũ', 'canh-rong-bien-dau-hu', 'Rong biển và đậu hũ mềm tạo món canh nhẹ, nhanh và thanh.', '/images/foods/canh-rong-bien-dau-hu.jpg', 15, 3),
(6, 'mon-canh', 'Canh khoai mỡ thịt bằm', 'canh-khoai-mo-thit-bam', 'Khoai mỡ sánh mềm nấu thịt bằm, thơm béo và dễ ăn.', '/images/foods/canh-khoai-mo-thit-bam.jpg', 30, 4),
(7, 'mon-canh', 'Canh cải chua sườn', 'canh-cai-chua-suon', 'Cải chua nấu sườn có vị chua dịu, ăn rất bắt cơm.', '/images/foods/canh-cai-chua-suon.jpg', 40, 4),
(8, 'mon-kho', 'Cá lóc kho tiêu', 'ca-loc-kho-tieu', 'Cá lóc kho tiêu cay thơm, nước kho sánh đậm vị.', '/images/foods/ca-loc-kho-tieu.jpg', 45, 4),
(9, 'mon-kho', 'Thịt kho mắm ruốc', 'thit-kho-mam-ruoc', 'Thịt ba chỉ kho mắm ruốc thơm sả, mặn ngọt đậm đà.', '/images/foods/thit-kho-mam-ruoc.jpg', 35, 4),
(10, 'mon-kho', 'Tôm rim thịt ba chỉ', 'tom-rim-thit-ba-chi', 'Tôm rim cùng thịt ba chỉ có màu đẹp, vị mặn ngọt hài hòa.', '/images/foods/tom-rim-thit-ba-chi.jpg', 30, 4),
(11, 'mon-kho', 'Sườn kho thơm', 'suon-kho-thom', 'Sườn kho thơm mềm, vị chua ngọt nhẹ rất đưa cơm.', '/images/foods/suon-kho-thom.jpg', 40, 4),
(12, 'mon-kho', 'Bò kho cà rốt', 'bo-kho-ca-rot', 'Bò kho cà rốt thơm mềm, dùng với cơm hoặc bánh mì đều ngon.', '/images/foods/bo-kho-ca-rot.jpg', 60, 4),
(13, 'mon-kho', 'Cá basa kho nghệ', 'ca-basa-kho-nghe', 'Cá basa kho nghệ có màu vàng đẹp, thơm và ít tanh.', '/images/foods/ca-kho-to.jpg', 35, 4),
(14, 'mon-kho', 'Gà kho sả ớt', 'ga-kho-sa-ot', 'Gà kho sả ớt thơm cay nhẹ, hợp bữa cơm ngày mưa.', '/images/foods/ga-kho-sa-ot.jpg', 40, 4),
(15, 'mon-xao', 'Mực xào cần tây', 'muc-xao-can-tay', 'Mực xào cần tây giòn ngọt, thơm mùi rau cần và hành tây.', '/images/foods/muc-xao-can-tay.jpg', 20, 3),
(16, 'mon-xao', 'Tôm xào bông cải', 'tom-xao-bong-cai', 'Tôm xào bông cải xanh giòn, màu sắc bắt mắt và giàu dinh dưỡng.', '/images/foods/tom-xao-bong-cai.jpg', 25, 3),
(17, 'mon-xao', 'Gà xào mướp', 'ga-xao-muop', 'Thịt gà xào mướp mềm ngọt, chế biến nhanh cho bữa tối.', '/images/foods/ga-xao-muop.jpg', 25, 3),
(18, 'mon-xao', 'Bò xào bông cải', 'bo-xao-bong-cai', 'Bò xào bông cải mềm giòn, món nhanh gọn cho ngày bận.', '/images/foods/bo-xao-bong-cai.jpg', 25, 3),
(19, 'mon-xao', 'Nui xào bò', 'nui-xao-bo', 'Nui xào bò sốt cà chua là món no bụng, hợp cả bữa sáng.', '/images/foods/nui-xao-bo.jpg', 30, 3),
(20, 'mon-xao', 'Cải chua xào trứng', 'cai-chua-xao-trung', 'Cải chua xào trứng chua nhẹ, béo thơm và rất nhanh.', '/images/foods/cai-chua-xao-trung.jpg', 15, 2),
(21, 'mon-rau', 'Mướp xào tỏi', 'muop-xao-toi', 'Mướp xào tỏi mềm ngọt, món rau đơn giản cho bữa cơm.', '/images/foods/muop-xao-toi.jpg', 15, 3),
(22, 'mon-chien', 'Đậu hũ chiên sả', 'dau-hu-chien-sa', 'Đậu hũ chiên vàng áo sả thơm, ăn kèm nước tương rất hợp.', '/images/foods/dau-hu-chien-sa.jpg', 20, 3),
(23, 'mon-chien', 'Chả cá chiên thì là', 'cha-ca-chien-thi-la', 'Chả cá chiên thơm thì là, bên ngoài vàng giòn bên trong dai mềm.', '/images/foods/cha-ca-chien-thi-la.jpg', 25, 3),
(24, 'mon-chien', 'Tôm chiên bột', 'tom-chien-bot', 'Tôm chiên bột giòn rụm, phù hợp làm món mặn hoặc ăn chơi.', '/images/foods/tom-chien-bot.jpg', 25, 3),
(25, 'mon-chien', 'Cánh gà chiên giòn', 'canh-ga-chien-gion', 'Cánh gà chiên giòn vàng, thịt bên trong mềm ngọt.', '/images/foods/ga-chien-nuoc-mam.jpg', 35, 4),
(26, 'mon-chien', 'Trứng chiên thịt bằm', 'trung-chien-thit-bam', 'Trứng chiên thịt bằm mềm thơm, dễ làm và rất hao cơm.', '/images/foods/trung-chien-thit-bam.jpg', 15, 3),
(27, 'mon-chien', 'Cá rô phi chiên giòn', 'ca-ro-phi-chien-gion', 'Cá rô phi chiên giòn, chấm nước mắm tỏi ớt rất ngon.', '/images/foods/ca-chien-nuoc-mam.jpg', 30, 4),
(28, 'mon-luoc', 'Bầu luộc chấm trứng', 'bau-luoc-cham-trung', 'Bầu luộc mềm ngọt, ăn cùng trứng luộc và nước mắm rất thanh.', '/images/foods/bau-luoc-cham-trung.jpg', 20, 3),
(29, 'mon-luoc', 'Rau lang luộc', 'rau-lang-luoc', 'Rau lang luộc xanh mềm, món rau dân dã cho bữa cơm nhà.', '/images/foods/rau-lang-luoc.jpg', 15, 3),
(30, 'mon-luoc', 'Gà luộc lá chanh', 'ga-luoc-la-chanh', 'Gà luộc da vàng, thịt ngọt, rắc lá chanh thơm nhẹ.', '/images/foods/ga-luoc-la-chanh.jpg', 45, 4),
(31, 'mon-luoc', 'Thịt heo luộc cuốn rau', 'thit-heo-luoc-cuon-rau', 'Thịt heo luộc cuốn rau sống, chấm mắm nêm hoặc nước mắm chua ngọt.', '/images/foods/thit-heo-luoc-cuon-rau.jpg', 35, 4),
(32, 'mon-luoc', 'Bắp cải luộc', 'bap-cai-luoc', 'Bắp cải luộc ngọt giòn, món rau nhanh cho mọi bữa cơm.', '/images/foods/bap-cai-luoc.jpg', 15, 3),
(33, 'mon-man', 'Cà tím nướng mỡ hành', 'ca-tim-nuong-mo-hanh', 'Cà tím nướng mềm thơm, phủ mỡ hành béo nhẹ và nước mắm chua ngọt.', '/images/foods/dau-hu-sot-ca-chua.jpg', 25, 3),
(34, 'mon-man', 'Thịt băm sốt cà chua', 'thit-bam-sot-ca-chua', 'Thịt băm sốt cà chua mềm thơm, dễ ăn cho cả nhà.', '/images/foods/dau-hu-sot-ca-chua.jpg', 20, 3),
(35, 'mon-man', 'Đậu hũ nhồi thịt sốt cà', 'dau-hu-nhoi-thit-sot-ca', 'Đậu hũ nhồi thịt sốt cà chua đậm vị, mềm béo và bắt cơm.', '/images/foods/dau-hu-sot-ca-chua.jpg', 35, 4),
(36, 'mon-man', 'Cá basa sốt chua ngọt', 'ca-basa-sot-chua-ngot', 'Cá basa chiên áp chảo rồi sốt chua ngọt với cà chua và thơm.', '/images/foods/ca-basa-kho-nghe.jpg', 35, 4),
(37, 'mon-man', 'Gà rang lá chanh', 'ga-rang-la-chanh', 'Gà rang lá chanh thơm lừng, thịt săn và đậm đà.', '/images/foods/ga-kho-gung.jpg', 35, 4),
(38, 'mon-man', 'Bò lúc lắc', 'bo-luc-lac', 'Bò lúc lắc mềm thơm, xào nhanh cùng ớt chuông và hành tây.', '/images/foods/bo-xao-hanh-tay.jpg', 25, 3),
(39, 'mon-luoc', 'Tôm hấp sả', 'tom-hap-sa', 'Tôm hấp sả giữ vị ngọt tự nhiên, thơm và rất nhanh.', '/images/foods/tom-xao-bong-cai.jpg', 20, 3),
(40, 'mon-luoc', 'Cá hấp gừng', 'ca-hap-gung', 'Cá hấp gừng thanh nhẹ, giữ được độ ngọt và ít dầu mỡ.', '/images/foods/ca-kho-to.jpg', 30, 4);

CREATE TEMPORARY TABLE tmp_food_candidate_ingredients (
  food_slug VARCHAR(255) NOT NULL,
  ingredient_name VARCHAR(150) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  note VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_food_candidate_ingredients (food_slug, ingredient_name, quantity, note) VALUES
('canh-rau-ngot-thit-bam', 'Rau ngót', 300.00, NULL),
('canh-rau-ngot-thit-bam', 'Thịt heo bằm', 150.00, NULL),
('canh-muop-tom', 'Mướp', 300.00, NULL),
('canh-muop-tom', 'Tôm', 200.00, NULL),
('canh-kho-qua-nhoi-thit', 'Khổ qua', 400.00, NULL),
('canh-kho-qua-nhoi-thit', 'Thịt heo bằm', 250.00, NULL),
('canh-kho-qua-nhoi-thit', 'Bún tàu', 50.00, NULL),
('canh-bi-xanh-tom', 'Bí xanh', 400.00, NULL),
('canh-bi-xanh-tom', 'Tôm', 150.00, NULL),
('canh-rong-bien-dau-hu', 'Rong biển', 30.00, NULL),
('canh-rong-bien-dau-hu', 'Đậu hũ', 2.00, NULL),
('canh-khoai-mo-thit-bam', 'Khoai mỡ', 400.00, NULL),
('canh-khoai-mo-thit-bam', 'Thịt heo bằm', 150.00, NULL),
('canh-cai-chua-suon', 'Cải chua', 300.00, NULL),
('canh-cai-chua-suon', 'Sườn non', 300.00, NULL),
('ca-loc-kho-tieu', 'Cá lóc', 500.00, NULL),
('ca-loc-kho-tieu', 'Tiêu', 5.00, NULL),
('ca-loc-kho-tieu', 'Hành tím', 20.00, NULL),
('thit-kho-mam-ruoc', 'Thịt ba chỉ', 500.00, NULL),
('thit-kho-mam-ruoc', 'Mắm ruốc', 30.00, NULL),
('thit-kho-mam-ruoc', 'Sả', 40.00, NULL),
('tom-rim-thit-ba-chi', 'Tôm', 300.00, NULL),
('tom-rim-thit-ba-chi', 'Thịt ba chỉ', 200.00, NULL),
('suon-kho-thom', 'Sườn non', 500.00, NULL),
('suon-kho-thom', 'Thơm', 200.00, NULL),
('bo-kho-ca-rot', 'Thịt bò', 500.00, NULL),
('bo-kho-ca-rot', 'Cà rốt', 300.00, NULL),
('bo-kho-ca-rot', 'Sả', 30.00, NULL),
('ca-basa-kho-nghe', 'Cá basa', 500.00, NULL),
('ca-basa-kho-nghe', 'Nghệ', 30.00, NULL),
('ga-kho-sa-ot', 'Thịt gà', 600.00, NULL),
('ga-kho-sa-ot', 'Sả', 50.00, NULL),
('ga-kho-sa-ot', 'Ớt chuông', 100.00, NULL),
('muc-xao-can-tay', 'Mực', 400.00, NULL),
('muc-xao-can-tay', 'Cần tây', 150.00, NULL),
('muc-xao-can-tay', 'Hành tây', 100.00, NULL),
('tom-xao-bong-cai', 'Tôm', 300.00, NULL),
('tom-xao-bong-cai', 'Bông cải xanh', 300.00, NULL),
('tom-xao-bong-cai', 'Cà rốt', 100.00, NULL),
('ga-xao-muop', 'Thịt gà', 350.00, NULL),
('ga-xao-muop', 'Mướp', 300.00, NULL),
('bo-xao-bong-cai', 'Thịt bò', 400.00, NULL),
('bo-xao-bong-cai', 'Bông cải xanh', 300.00, NULL),
('nui-xao-bo', 'Nui', 250.00, NULL),
('nui-xao-bo', 'Thịt bò', 250.00, NULL),
('nui-xao-bo', 'Cà chua', 150.00, NULL),
('cai-chua-xao-trung', 'Cải chua', 300.00, NULL),
('cai-chua-xao-trung', 'Trứng gà', 3.00, NULL),
('muop-xao-toi', 'Mướp', 400.00, NULL),
('muop-xao-toi', 'Tỏi', 20.00, NULL),
('dau-hu-chien-sa', 'Đậu hũ', 4.00, NULL),
('dau-hu-chien-sa', 'Sả', 40.00, NULL),
('cha-ca-chien-thi-la', 'Chả cá', 400.00, NULL),
('cha-ca-chien-thi-la', 'Thì là', 30.00, NULL),
('tom-chien-bot', 'Tôm', 400.00, NULL),
('tom-chien-bot', 'Bột chiên giòn', 150.00, NULL),
('canh-ga-chien-gion', 'Cánh gà', 600.00, NULL),
('canh-ga-chien-gion', 'Bột chiên giòn', 150.00, NULL),
('trung-chien-thit-bam', 'Trứng gà', 4.00, NULL),
('trung-chien-thit-bam', 'Thịt heo bằm', 150.00, NULL),
('ca-ro-phi-chien-gion', 'Cá rô phi', 600.00, NULL),
('bau-luoc-cham-trung', 'Bầu', 500.00, NULL),
('bau-luoc-cham-trung', 'Trứng gà', 2.00, NULL),
('rau-lang-luoc', 'Rau lang', 500.00, NULL),
('ga-luoc-la-chanh', 'Thịt gà', 800.00, NULL),
('ga-luoc-la-chanh', 'Lá chanh', 10.00, NULL),
('thit-heo-luoc-cuon-rau', 'Thịt ba chỉ', 500.00, NULL),
('thit-heo-luoc-cuon-rau', 'Dưa leo', 200.00, NULL),
('thit-heo-luoc-cuon-rau', 'Xà lách', 200.00, NULL),
('bap-cai-luoc', 'Bắp cải', 500.00, NULL),
('ca-tim-nuong-mo-hanh', 'Cà tím', 400.00, NULL),
('ca-tim-nuong-mo-hanh', 'Hành lá', 50.00, NULL),
('thit-bam-sot-ca-chua', 'Thịt heo bằm', 300.00, NULL),
('thit-bam-sot-ca-chua', 'Cà chua', 300.00, NULL),
('dau-hu-nhoi-thit-sot-ca', 'Đậu hũ', 4.00, NULL),
('dau-hu-nhoi-thit-sot-ca', 'Thịt heo bằm', 200.00, NULL),
('dau-hu-nhoi-thit-sot-ca', 'Cà chua', 300.00, NULL),
('ca-basa-sot-chua-ngot', 'Cá basa', 500.00, NULL),
('ca-basa-sot-chua-ngot', 'Cà chua', 200.00, NULL),
('ca-basa-sot-chua-ngot', 'Thơm', 150.00, NULL),
('ga-rang-la-chanh', 'Thịt gà', 600.00, NULL),
('ga-rang-la-chanh', 'Lá chanh', 10.00, NULL),
('bo-luc-lac', 'Thịt bò', 500.00, NULL),
('bo-luc-lac', 'Ớt chuông', 200.00, NULL),
('bo-luc-lac', 'Hành tây', 150.00, NULL),
('tom-hap-sa', 'Tôm', 500.00, NULL),
('tom-hap-sa', 'Sả', 50.00, NULL),
('ca-hap-gung', 'Cá lóc', 500.00, NULL),
('ca-hap-gung', 'Gừng', 40.00, NULL);

CREATE TEMPORARY TABLE tmp_food_candidate_steps (
  food_slug VARCHAR(255) NOT NULL,
  step_number SMALLINT UNSIGNED NOT NULL,
  instruction TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_food_candidate_steps (food_slug, step_number, instruction) VALUES
('canh-rau-ngot-thit-bam', 1, 'Rửa sạch rau ngót, vò nhẹ cho rau mềm và thịt bằm ướp ít nước mắm.'),
('canh-rau-ngot-thit-bam', 2, 'Phi thơm hành, xào thịt bằm săn rồi thêm nước vào đun sôi.'),
('canh-rau-ngot-thit-bam', 3, 'Cho rau ngót vào nấu chín, nêm vừa ăn rồi tắt bếp.'),
('canh-muop-tom', 1, 'Gọt mướp, cắt miếng vừa ăn; tôm bóc vỏ và ướp nhẹ.'),
('canh-muop-tom', 2, 'Xào sơ tôm cho thơm rồi thêm nước vào đun sôi.'),
('canh-muop-tom', 3, 'Cho mướp vào nấu vừa chín, nêm gia vị và dùng nóng.'),
('canh-kho-qua-nhoi-thit', 1, 'Làm sạch khổ qua, bỏ ruột; trộn thịt bằm với bún tàu và gia vị.'),
('canh-kho-qua-nhoi-thit', 2, 'Nhồi nhân vào khổ qua rồi cho vào nồi nước đang sôi.'),
('canh-kho-qua-nhoi-thit', 3, 'Hầm đến khi khổ qua mềm, nêm lại nước dùng cho vừa ăn.'),
('canh-bi-xanh-tom', 1, 'Gọt bí xanh, cắt lát; tôm làm sạch và băm hoặc để nguyên con.'),
('canh-bi-xanh-tom', 2, 'Xào sơ tôm rồi thêm nước vào nấu sôi.'),
('canh-bi-xanh-tom', 3, 'Cho bí xanh vào nấu mềm, nêm gia vị và rắc tiêu nếu thích.'),
('canh-rong-bien-dau-hu', 1, 'Ngâm rong biển cho nở, rửa sạch; cắt đậu hũ thành miếng nhỏ.'),
('canh-rong-bien-dau-hu', 2, 'Đun nước dùng, cho đậu hũ vào nấu nhẹ lửa.'),
('canh-rong-bien-dau-hu', 3, 'Thêm rong biển, nêm vừa ăn và tắt bếp ngay khi sôi lại.'),
('canh-khoai-mo-thit-bam', 1, 'Gọt khoai mỡ, bào hoặc đập dập; thịt bằm ướp ít gia vị.'),
('canh-khoai-mo-thit-bam', 2, 'Xào thịt bằm cho săn rồi thêm nước vào đun sôi.'),
('canh-khoai-mo-thit-bam', 3, 'Cho khoai mỡ vào khuấy nhẹ đến khi canh sánh và chín mềm.'),
('canh-cai-chua-suon', 1, 'Chần sườn qua nước sôi, rửa sạch bọt; cải chua cắt vừa ăn.'),
('canh-cai-chua-suon', 2, 'Hầm sườn đến khi mềm và nước dùng ngọt.'),
('canh-cai-chua-suon', 3, 'Cho cải chua vào nấu thêm vài phút, nêm lại cho vừa miệng.'),
('ca-loc-kho-tieu', 1, 'Cá lóc làm sạch, cắt khúc và ướp với nước mắm, tiêu, hành tím.'),
('ca-loc-kho-tieu', 2, 'Thắng màu nhẹ rồi cho cá vào kho với lửa vừa.'),
('ca-loc-kho-tieu', 3, 'Kho đến khi nước sánh lại, rắc thêm tiêu và dùng với cơm nóng.'),
('thit-kho-mam-ruoc', 1, 'Thịt ba chỉ thái nhỏ, sả băm nhuyễn và mắm ruốc pha loãng.'),
('thit-kho-mam-ruoc', 2, 'Rang thịt cho ra bớt mỡ rồi cho sả vào đảo thơm.'),
('thit-kho-mam-ruoc', 3, 'Thêm mắm ruốc, đường và chút nước, kho đến khi thịt thấm.'),
('tom-rim-thit-ba-chi', 1, 'Tôm rửa sạch, thịt ba chỉ thái mỏng và ướp với nước mắm.'),
('tom-rim-thit-ba-chi', 2, 'Rang thịt trước cho săn rồi cho tôm vào đảo đều.'),
('tom-rim-thit-ba-chi', 3, 'Rim nhỏ lửa đến khi nước sốt áo đều tôm thịt.'),
('suon-kho-thom', 1, 'Chặt sườn vừa ăn, chần sơ và ướp gia vị.'),
('suon-kho-thom', 2, 'Áp chảo sườn cho săn rồi thêm thơm và ít nước.'),
('suon-kho-thom', 3, 'Kho nhỏ lửa đến khi sườn mềm, nước kho sánh lại.'),
('bo-kho-ca-rot', 1, 'Thịt bò cắt miếng, ướp với sả và gia vị bò kho.'),
('bo-kho-ca-rot', 2, 'Xào thịt cho săn rồi thêm nước hầm đến khi mềm.'),
('bo-kho-ca-rot', 3, 'Cho cà rốt vào nấu chín, nêm lại và dùng nóng.'),
('ca-basa-kho-nghe', 1, 'Cá basa rửa sạch, cắt khúc và ướp với nghệ, nước mắm.'),
('ca-basa-kho-nghe', 2, 'Cho cá vào nồi cùng ít nước màu và kho lửa nhỏ.'),
('ca-basa-kho-nghe', 3, 'Kho đến khi cá thấm, nước kho sệt và thơm mùi nghệ.'),
('ga-kho-sa-ot', 1, 'Gà chặt miếng vừa ăn, ướp với sả băm và gia vị.'),
('ga-kho-sa-ot', 2, 'Phi thơm sả rồi cho gà vào đảo săn.'),
('ga-kho-sa-ot', 3, 'Kho nhỏ lửa đến khi gà chín mềm và nước kho cạn vừa.'),
('muc-xao-can-tay', 1, 'Làm sạch mực, khứa nhẹ và cắt miếng; cần tây cắt khúc.'),
('muc-xao-can-tay', 2, 'Xào mực nhanh trên lửa lớn cho săn.'),
('muc-xao-can-tay', 3, 'Thêm cần tây, hành tây vào đảo đều rồi nêm vừa ăn.'),
('tom-xao-bong-cai', 1, 'Bông cải tách nhánh, chần sơ; tôm làm sạch.'),
('tom-xao-bong-cai', 2, 'Xào tôm với tỏi cho thơm và vừa chín.'),
('tom-xao-bong-cai', 3, 'Cho rau củ vào đảo nhanh, nêm gia vị rồi tắt bếp.'),
('ga-xao-muop', 1, 'Thịt gà thái miếng mỏng, ướp với chút nước mắm.'),
('ga-xao-muop', 2, 'Xào gà cho săn rồi cho mướp vào đảo đều.'),
('ga-xao-muop', 3, 'Nêm lại gia vị, xào đến khi mướp vừa chín tới.'),
('bo-xao-bong-cai', 1, 'Thịt bò thái mỏng, ướp dầu hào và tiêu; bông cải chần sơ.'),
('bo-xao-bong-cai', 2, 'Xào bò nhanh trên lửa lớn rồi trút ra.'),
('bo-xao-bong-cai', 3, 'Xào bông cải, cho bò vào đảo lại và nêm vừa ăn.'),
('nui-xao-bo', 1, 'Luộc nui vừa chín tới, xả nước lạnh và để ráo.'),
('nui-xao-bo', 2, 'Xào bò với cà chua cho thành sốt nhẹ.'),
('nui-xao-bo', 3, 'Cho nui vào đảo đều, nêm lại và dùng khi còn nóng.'),
('cai-chua-xao-trung', 1, 'Rửa cải chua cho bớt mặn rồi cắt nhỏ.'),
('cai-chua-xao-trung', 2, 'Xào cải chua cho ráo và thơm.'),
('cai-chua-xao-trung', 3, 'Đổ trứng đã đánh vào, đảo đều đến khi trứng chín.'),
('muop-xao-toi', 1, 'Gọt mướp, cắt lát vừa ăn; tỏi băm nhỏ.'),
('muop-xao-toi', 2, 'Phi thơm tỏi với ít dầu ăn.'),
('muop-xao-toi', 3, 'Cho mướp vào xào nhanh, nêm vừa ăn và tắt bếp.'),
('dau-hu-chien-sa', 1, 'Cắt đậu hũ miếng vừa ăn và để ráo nước.'),
('dau-hu-chien-sa', 2, 'Chiên đậu hũ vàng đều các mặt.'),
('dau-hu-chien-sa', 3, 'Phi sả thơm, đảo đậu hũ với sả và chút gia vị.'),
('cha-ca-chien-thi-la', 1, 'Trộn chả cá với thì là cắt nhỏ và chút tiêu.'),
('cha-ca-chien-thi-la', 2, 'Nặn thành miếng vừa ăn.'),
('cha-ca-chien-thi-la', 3, 'Chiên ngập dầu vừa đến khi chả cá vàng thơm.'),
('tom-chien-bot', 1, 'Tôm bóc vỏ, chừa đuôi và thấm khô.'),
('tom-chien-bot', 2, 'Pha bột chiên giòn theo hướng dẫn, nhúng tôm vào bột.'),
('tom-chien-bot', 3, 'Chiên tôm trong dầu nóng đến khi vàng giòn.'),
('canh-ga-chien-gion', 1, 'Cánh gà rửa sạch, khứa nhẹ và ướp gia vị.'),
('canh-ga-chien-gion', 2, 'Áo cánh gà với bột chiên giòn.'),
('canh-ga-chien-gion', 3, 'Chiên lửa vừa đến khi cánh gà chín vàng đều.'),
('trung-chien-thit-bam', 1, 'Đánh trứng với thịt bằm, hành lá và gia vị.'),
('trung-chien-thit-bam', 2, 'Làm nóng chảo dầu rồi đổ hỗn hợp trứng vào.'),
('trung-chien-thit-bam', 3, 'Chiên vàng hai mặt, cắt miếng và dùng nóng.'),
('ca-ro-phi-chien-gion', 1, 'Làm sạch cá, khứa vài đường và thấm khô.'),
('ca-ro-phi-chien-gion', 2, 'Ướp cá với ít muối rồi chiên trong dầu nóng.'),
('ca-ro-phi-chien-gion', 3, 'Chiên đến khi cá vàng giòn hai mặt và để ráo dầu.'),
('bau-luoc-cham-trung', 1, 'Gọt bầu, cắt miếng vừa ăn; luộc trứng chín.'),
('bau-luoc-cham-trung', 2, 'Đun sôi nước, cho bầu vào luộc vừa chín.'),
('bau-luoc-cham-trung', 3, 'Vớt bầu ra, dùng cùng trứng luộc và nước chấm.'),
('rau-lang-luoc', 1, 'Nhặt rau lang, rửa nhiều lần cho sạch đất cát.'),
('rau-lang-luoc', 2, 'Đun nước thật sôi rồi cho rau vào luộc.'),
('rau-lang-luoc', 3, 'Vớt rau khi vừa chín, giữ nước luộc làm canh nếu thích.'),
('ga-luoc-la-chanh', 1, 'Rửa sạch gà, cho vào nồi cùng nước và ít muối.'),
('ga-luoc-la-chanh', 2, 'Luộc lửa vừa đến khi gà chín, ủ thêm vài phút.'),
('ga-luoc-la-chanh', 3, 'Chặt gà ra đĩa, rắc lá chanh thái chỉ lên trên.'),
('thit-heo-luoc-cuon-rau', 1, 'Luộc thịt ba chỉ với ít muối và hành tím đến khi chín.'),
('thit-heo-luoc-cuon-rau', 2, 'Thái thịt mỏng, rửa sạch rau sống và dưa leo.'),
('thit-heo-luoc-cuon-rau', 3, 'Cuốn thịt với rau, dùng cùng nước chấm tùy thích.'),
('bap-cai-luoc', 1, 'Tách bắp cải, rửa sạch và cắt miếng vừa ăn.'),
('bap-cai-luoc', 2, 'Đun sôi nước với chút muối rồi cho bắp cải vào.'),
('bap-cai-luoc', 3, 'Luộc vừa chín, vớt ra để ráo và dùng nóng.'),
('ca-tim-nuong-mo-hanh', 1, 'Nướng cà tím đến khi vỏ xém và ruột mềm.'),
('ca-tim-nuong-mo-hanh', 2, 'Bóc vỏ cà, rưới mỡ hành lên trên.'),
('ca-tim-nuong-mo-hanh', 3, 'Dùng cùng nước mắm chua ngọt và cơm nóng.'),
('thit-bam-sot-ca-chua', 1, 'Ướp thịt bằm với chút nước mắm và tiêu.'),
('thit-bam-sot-ca-chua', 2, 'Xào cà chua đến khi mềm thành sốt.'),
('thit-bam-sot-ca-chua', 3, 'Cho thịt vào đảo chín, nêm vừa ăn và rắc hành lá.'),
('dau-hu-nhoi-thit-sot-ca', 1, 'Khoét nhẹ đậu hũ, nhồi thịt bằm đã ướp vào giữa.'),
('dau-hu-nhoi-thit-sot-ca', 2, 'Chiên sơ đậu hũ cho định hình.'),
('dau-hu-nhoi-thit-sot-ca', 3, 'Nấu sốt cà chua rồi cho đậu hũ vào rim thấm.'),
('ca-basa-sot-chua-ngot', 1, 'Cá basa cắt miếng, thấm khô và chiên sơ.'),
('ca-basa-sot-chua-ngot', 2, 'Xào cà chua, thơm với gia vị thành sốt chua ngọt.'),
('ca-basa-sot-chua-ngot', 3, 'Cho cá vào áo sốt nhẹ để cá thấm đều.'),
('ga-rang-la-chanh', 1, 'Gà chặt miếng vừa ăn, ướp với nước mắm và tiêu.'),
('ga-rang-la-chanh', 2, 'Rang gà trên lửa vừa đến khi săn và vàng nhẹ.'),
('ga-rang-la-chanh', 3, 'Thêm lá chanh thái chỉ, đảo đều rồi tắt bếp.'),
('bo-luc-lac', 1, 'Thịt bò cắt khối nhỏ, ướp dầu hào và tiêu.'),
('bo-luc-lac', 2, 'Áp chảo bò trên lửa lớn cho xém cạnh.'),
('bo-luc-lac', 3, 'Thêm ớt chuông, hành tây vào đảo nhanh rồi dùng nóng.'),
('tom-hap-sa', 1, 'Tôm rửa sạch, cắt râu; sả đập dập.'),
('tom-hap-sa', 2, 'Lót sả dưới nồi, xếp tôm lên trên.'),
('tom-hap-sa', 3, 'Hấp đến khi tôm đỏ đều, dùng cùng muối tiêu chanh.'),
('ca-hap-gung', 1, 'Cá làm sạch, khứa nhẹ hai mặt và ướp chút muối.'),
('ca-hap-gung', 2, 'Xếp gừng thái sợi lên cá rồi đem hấp.'),
('ca-hap-gung', 3, 'Hấp đến khi cá chín, dùng cùng nước mắm gừng.');

INSERT INTO ingredients (name, unit, created_at, updated_at) VALUES
('Rau ngót', 'g', NOW(), NOW()),
('Mướp', 'g', NOW(), NOW()),
('Tôm', 'g', NOW(), NOW()),
('Khổ qua', 'g', NOW(), NOW()),
('Bún tàu', 'g', NOW(), NOW()),
('Bí xanh', 'g', NOW(), NOW()),
('Rong biển', 'g', NOW(), NOW()),
('Khoai mỡ', 'g', NOW(), NOW()),
('Cải chua', 'g', NOW(), NOW()),
('Tiêu', 'g', NOW(), NOW()),
('Hành tím', 'g', NOW(), NOW()),
('Mắm ruốc', 'g', NOW(), NOW()),
('Sả', 'g', NOW(), NOW()),
('Nghệ', 'g', NOW(), NOW()),
('Mực', 'g', NOW(), NOW()),
('Cần tây', 'g', NOW(), NOW()),
('Nui', 'g', NOW(), NOW()),
('Tỏi', 'g', NOW(), NOW()),
('Chả cá', 'g', NOW(), NOW()),
('Thì là', 'g', NOW(), NOW()),
('Bột chiên giòn', 'g', NOW(), NOW()),
('Cánh gà', 'g', NOW(), NOW()),
('Cá rô phi', 'g', NOW(), NOW()),
('Bầu', 'g', NOW(), NOW()),
('Rau lang', 'g', NOW(), NOW()),
('Lá chanh', 'g', NOW(), NOW()),
('Dưa leo', 'g', NOW(), NOW()),
('Xà lách', 'g', NOW(), NOW()),
('Bắp cải', 'g', NOW(), NOW()),
('Cà tím', 'g', NOW(), NOW()),
('Hành lá', 'g', NOW(), NOW()),
('Gừng', 'g', NOW(), NOW())
ON DUPLICATE KEY UPDATE unit = VALUES(unit), updated_at = CURRENT_TIMESTAMP;

INSERT INTO foods (id_category, name, slug, description, image, cooking_time, servings, status, created_at, updated_at)
SELECT c.id_category, pick.name, pick.slug, pick.description, pick.image, pick.cooking_time, pick.servings, 'active', NOW(), NOW()
FROM (
  SELECT ranked.*
  FROM (
    SELECT f.*, ROW_NUMBER() OVER (ORDER BY f.ord) AS rn
    FROM tmp_food_candidates f
    WHERE NOT EXISTS (
      SELECT 1 FROM foods existing_food WHERE existing_food.slug = f.slug
    )
  ) ranked
  WHERE ranked.rn <= @foods_needed
) pick
JOIN categories c ON c.slug = pick.category_slug;

INSERT INTO food_ingredients (id_food, id_ingredient, quantity, note)
SELECT f.id_food, i.id_ingredient, fi.quantity, fi.note
FROM tmp_food_candidate_ingredients fi
JOIN foods f ON f.slug = fi.food_slug
JOIN ingredients i ON i.name = fi.ingredient_name
WHERE NOT EXISTS (
  SELECT 1
  FROM food_ingredients existing_fi
  WHERE existing_fi.id_food = f.id_food
    AND existing_fi.id_ingredient = i.id_ingredient
);

INSERT INTO recipe_steps (id_food, step_number, instruction)
SELECT f.id_food, s.step_number, s.instruction
FROM tmp_food_candidate_steps s
JOIN foods f ON f.slug = s.food_slug
WHERE NOT EXISTS (
  SELECT 1
  FROM recipe_steps existing_step
  WHERE existing_step.id_food = f.id_food
    AND existing_step.step_number = s.step_number
);

DROP TEMPORARY TABLE IF EXISTS tmp_food_candidate_steps;
DROP TEMPORARY TABLE IF EXISTS tmp_food_candidate_ingredients;
DROP TEMPORARY TABLE IF EXISTS tmp_food_candidates;

COMMIT;

SELECT COUNT(*) AS active_foods_after_import FROM foods WHERE status = 'active';
