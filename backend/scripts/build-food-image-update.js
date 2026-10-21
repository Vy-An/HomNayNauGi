const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { recipes, root, seedRows, formatRows, normalizeLines } = require('./lib/recipe-data');

function buildImageFiles() {
    const foods = new Map(seedRows().foods.map(row => [row[3], row]));
    const images = recipes.map(recipe => {
        const food = foods.get(recipe.slug);
        assert(food, `Thiếu món: ${recipe.slug}`);
        const image = food[5];
        assert.match(image, /^\/images\/foods\/[a-z0-9-]+\.(?:jpg|jpeg|png|webp)$/);
        const filename = path.posix.basename(image);
        const localPath = path.join(root, 'backend/public/images/foods', filename);
        const contents = fs.readFileSync(localPath);
        assert(contents.length > 0, `Ảnh rỗng: ${filename}`);
        const sha256 = crypto.createHash('sha256').update(contents).digest('hex');
        return { slug: recipe.slug, name: food[2], filename, image: `${image}?v=${sha256.slice(0, 12)}`,
            sha256, bytes: contents.length };
    });
    assert.equal(images.length, 50);
    assert.equal(new Set(images.map(image => image.slug)).size, 50);
    assert.equal(new Set(images.map(image => image.filename)).size, 50);
    const sql = `-- CAP NHAT ANH HIEN TAI CUA 50 MON AN TREN HOSTING
-- 1. Upload/ghi de du 50 file vao public/images/foods cua BACKEND truoc.
--    Anh goc nam tai backend/public/images/foods trong du an local.
-- 2. Trong phpMyAdmin: chon database website, Export sao luu, Import file SQL nay.
-- Chi doi foods.image va updated_at; giu nguyen cong thuc va du lieu khac.
-- Doi chieu theo slug, khong phu thuoc ID tren hosting.
-- ?v= la ma SHA-256 cua noi dung anh, giup trinh duyet tai ban moi.
-- SQL khong chua noi dung anh; can upload file anh hoac deploy lai backend.
-- Co the import lai. Thanh cong: UPDATED va so_mon_khop_anh = 50.
-- Nguon: backend/public/images/foods; tao lai bang npm run images:sql.
-- Ban sua loi #1109: SET khong truy van bang tam; metadata duoc kiem tra rieng.

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET @hnng_images_database := DATABASE();
SET @hnng_images_ready := 0;
SET @hnng_images_applied := 0;
SET @hnng_images_transactional := 0;
DROP TEMPORARY TABLE IF EXISTS tmp_hnng_food_images;
CREATE TEMPORARY TABLE tmp_hnng_food_images (
  slug VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_hnng_food_images (slug, name, image) VALUES
${formatRows(images.map(image => [image.slug, image.name, image.image]))};

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;

SELECT COUNT(*) INTO @hnng_images_found
FROM foods f JOIN tmp_hnng_food_images r ON r.slug = f.slug;

SELECT COUNT(*) INTO @hnng_images_payload_rows FROM tmp_hnng_food_images;

SET @hnng_images_engine_sql := 'SELECT COUNT(*) INTO @hnng_images_transactional FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ''foods'' AND ENGINE = ''InnoDB''';
PREPARE hnng_images_engine_check FROM @hnng_images_engine_sql;
EXECUTE hnng_images_engine_check USING @hnng_images_database;
DEALLOCATE PREPARE hnng_images_engine_check;

SET @hnng_images_ready := (
  @hnng_images_found = 50 AND @hnng_images_transactional = 1
  AND @hnng_images_payload_rows = 50
);

UPDATE foods f JOIN tmp_hnng_food_images r ON r.slug = f.slug
SET f.image = r.image, f.updated_at = CURRENT_TIMESTAMP
WHERE @hnng_images_ready = 1 AND NOT (BINARY f.image <=> BINARY r.image);
SET @hnng_images_changed := ROW_COUNT();

SELECT COUNT(*) INTO @hnng_images_matched
FROM foods f JOIN tmp_hnng_food_images r ON r.slug = f.slug
WHERE BINARY f.image = BINARY r.image;

SET @hnng_images_applied := (@hnng_images_ready = 1 AND @hnng_images_matched = 50);
SET @hnng_images_finish_sql := IF(@hnng_images_applied = 1, 'COMMIT', 'ROLLBACK');
PREPARE hnng_images_finish FROM @hnng_images_finish_sql;
EXECUTE hnng_images_finish;
DEALLOCATE PREPARE hnng_images_finish;

SELECT IF(@hnng_images_applied = 1, 'UPDATED', 'NOT_UPDATED_CHECK_DETAILS') AS trang_thai,
  @hnng_images_database AS database_da_chon,
  @hnng_images_found AS so_mon_tim_thay,
  IF(@hnng_images_applied = 1, @hnng_images_matched, 0) AS so_mon_khop_anh,
  IF(@hnng_images_applied = 1, @hnng_images_changed, 0) AS so_mon_thay_doi;

SELECT r.slug AS mon_con_thieu, r.name AS ten_mon
FROM tmp_hnng_food_images r LEFT JOIN foods f ON f.slug = r.slug
WHERE f.id_food IS NULL;

DROP TEMPORARY TABLE IF EXISTS tmp_hnng_food_images;
`;
    const guide = `CẬP NHẬT ẢNH 50 MÓN ĂN TRÊN HOSTING

Gói này chứa đúng 50 ảnh hiện tại, giữ nguyên byte ảnh gốc và tên file.

1. Giải nén gói. Sao lưu thư mục ảnh đang dùng trên hosting nếu cần quay lại.
2. Upload/ghi đè thư mục public/images/foods vào thư mục public/images/foods
   của BACKEND. Nếu dùng repo dự án, chép vào backend/public/images/foods.
   Nếu backend chạy trên Render: đưa ảnh đã cập nhật vào repo và deploy lại
   backend để dịch vụ có đủ file mới. Chỉ upload frontend chưa cập nhật được ảnh.
3. Vào phpMyAdmin, chọn đúng database website, Export bản sao lưu SQL.
4. Import file update_food_images.sql trong gói, giữ mã hóa utf-8.
   Chạy toàn bộ file trong cùng một lần import.
5. Thành công: trang_thai = UPDATED, so_mon_khop_anh = 50.
   so_mon_thay_doi có thể bằng 0 nếu ảnh đã được cập nhật từ lần trước.
6. Tải lại website để xem ảnh mới.

File SQL chỉ cập nhật đường dẫn ảnh và thời điểm cập nhật của các món có slug
trong bộ 50 món, giữ nguyên ID, công thức, định lượng, tài khoản và bài viết.
Nếu thiếu một món, file không cập nhật và liệt kê slug còn thiếu.

Phần ?v= trong đường dẫn là phiên bản theo nội dung ảnh, KHÔNG phải tên file.
Ví dụ URL /images/foods/thit-kho-trung.jpg?v=abc vẫn dùng file thit-kho-trung.jpg.
Không đổi tên file thành chuỗi có ?v=.

food_images_manifest.json liệt kê slug, tên món, tên file, URL và SHA-256
để đối chiếu đúng ảnh trong gói. Không cần import file JSON vào phpMyAdmin.
`;
    const manifest = JSON.stringify({ count: images.length, totalBytes: images.reduce((sum, image) => sum + image.bytes, 0), images }, null, 2) + '\n';
    return { images, files: new Map([
        [path.join(root, 'update_food_images.sql'), sql],
        [path.join(root, 'food_images_manifest.json'), manifest],
        [path.join(root, 'HUONG_DAN_CAP_NHAT_ANH.txt'), guide]
    ]) };
}

if (require.main === module) {
    try {
        const check = process.argv.includes('--check');
        assert(process.argv.slice(2).every(arg => arg === '--check'), 'Chỉ hỗ trợ --check');
        const { images, files } = buildImageFiles();
        for (const [file, content] of files) {
            if (check) assert.equal(normalizeLines(fs.readFileSync(file, 'utf8')), normalizeLines(content), `Chạy lại npm run images:sql: ${file}`);
            else fs.writeFileSync(file, content, 'utf8');
        }
        console.log(JSON.stringify({ mode: check ? 'check' : 'write', images: images.length, bytes: images.reduce((sum, image) => sum + image.bytes, 0) }));
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}

module.exports = { buildImageFiles };
