const { recipes, validateRecipes, formatRows } = require('./lib/recipe-data');

function buildHostingSql() {
    const summary = validateRecipes();
    const ingredientUnits = new Map();
    const foodRows = [];
    const ingredientRows = [];
    const stepRows = [];
    for (const recipe of recipes) {
        foodRows.push([recipe.slug, recipe.description, recipe.cooking_time, recipe.servings]);
        for (const [name, quantity, unit, note] of recipe.ingredients) {
            ingredientUnits.set(name, unit);
            ingredientRows.push([recipe.slug, name, quantity, note]);
        }
        recipe.steps.forEach((instruction, index) => stepRows.push([recipe.slug, index + 1, instruction]));
    }
    return `-- CAP NHAT CONG THUC CHI TIET CHO DATABASE DA CO TREN HOSTING
-- Chon dung database trong phpMyAdmin, Export ban sao luu, sau do Import file nay.
-- Khong can doi ten database trong file. Khong tao lai bang hoac xoa mon an.
-- Tim mon theo slug, nguyen lieu theo ten; khong phu thuoc ID tren local.
-- Giu nguyen anh, ID, trang thai, danh muc, tai khoan, bai viet va du lieu di cho.
-- Can du ${summary.foods} slug mon an, don vi nguyen lieu khop va 4 bang InnoDB.
-- Khong can quyen CREATE ROUTINE. Can quyen CREATE TEMPORARY TABLES.
-- Ban sua loi #1109: SET khong truy van bang tam; metadata duoc kiem tra rieng.
-- Co the import lai: khong nhan doi nguyen lieu hoac buoc nau.
-- Thanh cong: trang_thai = UPDATED, ${summary.foods} mon / ${summary.steps} buoc / ${summary.ingredientLinks} dinh luong.
-- Du lieu nguon: backend/data/recipes.json; tao lai bang npm run recipes:sql.

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET @hnng_recipe_database := DATABASE();
SET @hnng_recipe_ready := 0;
SET @hnng_recipe_applied := 0;
SET @hnng_recipe_transactional_tables := 0;

DROP TEMPORARY TABLE IF EXISTS tmp_hnng_recipe_foods;
DROP TEMPORARY TABLE IF EXISTS tmp_hnng_recipe_ingredients;
DROP TEMPORARY TABLE IF EXISTS tmp_hnng_recipe_links;
DROP TEMPORARY TABLE IF EXISTS tmp_hnng_recipe_steps;

CREATE TEMPORARY TABLE tmp_hnng_recipe_foods (
  slug VARCHAR(255) NOT NULL PRIMARY KEY,
  description TEXT NOT NULL,
  cooking_time SMALLINT UNSIGNED NOT NULL,
  servings TINYINT UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_hnng_recipe_foods (slug, description, cooking_time, servings) VALUES
${formatRows(foodRows)};

CREATE TEMPORARY TABLE tmp_hnng_recipe_ingredients (
  name VARCHAR(150) NOT NULL PRIMARY KEY,
  unit VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_hnng_recipe_ingredients (name, unit) VALUES
${formatRows([...ingredientUnits])};

CREATE TEMPORARY TABLE tmp_hnng_recipe_links (
  food_slug VARCHAR(255) NOT NULL,
  ingredient_name VARCHAR(150) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  note VARCHAR(255) NULL,
  PRIMARY KEY (food_slug, ingredient_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_hnng_recipe_links (food_slug, ingredient_name, quantity, note) VALUES
${formatRows(ingredientRows)};

CREATE TEMPORARY TABLE tmp_hnng_recipe_steps (
  food_slug VARCHAR(255) NOT NULL,
  step_number SMALLINT UNSIGNED NOT NULL,
  instruction TEXT NOT NULL,
  PRIMARY KEY (food_slug, step_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_hnng_recipe_steps (food_slug, step_number, instruction) VALUES
${formatRows(stepRows)};

-- Bat dau giao dich sau khi nap xong du lieu vao cac bang tam.
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;

SELECT COUNT(*) INTO @hnng_recipe_found
FROM foods f JOIN tmp_hnng_recipe_foods r ON r.slug = f.slug;

SELECT COUNT(*) INTO @hnng_recipe_unit_conflicts
FROM ingredients i JOIN tmp_hnng_recipe_ingredients r ON r.name = i.name
WHERE BINARY i.unit <> BINARY r.unit;

SELECT COUNT(*) INTO @hnng_recipe_food_rows FROM tmp_hnng_recipe_foods;
SELECT COUNT(*) INTO @hnng_recipe_ingredient_rows FROM tmp_hnng_recipe_ingredients;
SELECT COUNT(*) INTO @hnng_recipe_link_rows FROM tmp_hnng_recipe_links;
SELECT COUNT(*) INTO @hnng_recipe_step_rows FROM tmp_hnng_recipe_steps;

-- Giu truy van metadata trong PREPARE de cong cu import khong doi ngu canh
-- sang information_schema. Schema website duoc truyen bang tham so da luu.
SET @hnng_recipe_engine_sql := 'SELECT COUNT(*) INTO @hnng_recipe_transactional_tables FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME IN (''foods'', ''ingredients'', ''food_ingredients'', ''recipe_steps'') AND ENGINE = ''InnoDB''';
PREPARE hnng_recipe_engine_check FROM @hnng_recipe_engine_sql;
EXECUTE hnng_recipe_engine_check USING @hnng_recipe_database;
DEALLOCATE PREPARE hnng_recipe_engine_check;

SET @hnng_recipe_ready := (
  @hnng_recipe_found = ${summary.foods}
  AND @hnng_recipe_unit_conflicts = 0
  AND @hnng_recipe_transactional_tables = 4
  AND @hnng_recipe_food_rows = ${summary.foods}
  AND @hnng_recipe_ingredient_rows = ${summary.ingredients}
  AND @hnng_recipe_link_rows = ${summary.ingredientLinks}
  AND @hnng_recipe_step_rows = ${summary.steps}
);

-- Moi lenh ghi deu bi chan neu dieu kien kiem tra khong dat.
INSERT INTO ingredients (name, unit, created_at, updated_at)
SELECT r.name, r.unit, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM tmp_hnng_recipe_ingredients r
LEFT JOIN ingredients i ON i.name = r.name
WHERE i.id_ingredient IS NULL AND @hnng_recipe_ready = 1;

UPDATE foods f JOIN tmp_hnng_recipe_foods r ON r.slug = f.slug
SET f.description = r.description,
    f.cooking_time = r.cooking_time,
    f.servings = r.servings,
    f.updated_at = CURRENT_TIMESTAMP
WHERE @hnng_recipe_ready = 1;

DELETE fi FROM food_ingredients fi
JOIN foods f ON f.id_food = fi.id_food
JOIN tmp_hnng_recipe_foods r ON r.slug = f.slug
WHERE @hnng_recipe_ready = 1;

INSERT INTO food_ingredients (id_food, id_ingredient, quantity, note)
SELECT f.id_food, i.id_ingredient, r.quantity, r.note
FROM tmp_hnng_recipe_links r
JOIN foods f ON f.slug = r.food_slug
JOIN ingredients i ON i.name = r.ingredient_name
WHERE @hnng_recipe_ready = 1
ORDER BY f.id_food, i.id_ingredient;

DELETE rs FROM recipe_steps rs
JOIN foods f ON f.id_food = rs.id_food
JOIN tmp_hnng_recipe_foods r ON r.slug = f.slug
WHERE @hnng_recipe_ready = 1;

INSERT INTO recipe_steps (id_food, step_number, instruction)
SELECT f.id_food, r.step_number, r.instruction
FROM tmp_hnng_recipe_steps r
JOIN foods f ON f.slug = r.food_slug
WHERE @hnng_recipe_ready = 1
ORDER BY f.id_food, r.step_number;

-- Kiem tra noi dung va so dong truoc khi COMMIT.
SELECT COUNT(*) INTO @hnng_recipe_valid_foods
FROM foods f JOIN tmp_hnng_recipe_foods r ON r.slug = f.slug
WHERE BINARY f.description = BINARY r.description
  AND f.cooking_time = r.cooking_time AND f.servings = r.servings;

SELECT COUNT(*) INTO @hnng_recipe_total_steps
FROM recipe_steps rs JOIN foods f ON f.id_food = rs.id_food
JOIN tmp_hnng_recipe_foods r ON r.slug = f.slug;

SELECT COUNT(*) INTO @hnng_recipe_valid_steps
FROM tmp_hnng_recipe_steps r JOIN foods f ON f.slug = r.food_slug
JOIN recipe_steps rs ON rs.id_food = f.id_food AND rs.step_number = r.step_number
WHERE BINARY rs.instruction = BINARY r.instruction;

SELECT COUNT(*) INTO @hnng_recipe_total_links
FROM food_ingredients fi JOIN foods f ON f.id_food = fi.id_food
JOIN tmp_hnng_recipe_foods r ON r.slug = f.slug;

SELECT COUNT(*) INTO @hnng_recipe_valid_links
FROM tmp_hnng_recipe_links r JOIN foods f ON f.slug = r.food_slug
JOIN ingredients i ON i.name = r.ingredient_name
JOIN food_ingredients fi ON fi.id_food = f.id_food AND fi.id_ingredient = i.id_ingredient
WHERE fi.quantity = r.quantity AND (BINARY fi.note <=> BINARY r.note);

SET @hnng_recipe_applied := (
  @hnng_recipe_ready = 1
  AND @hnng_recipe_valid_foods = ${summary.foods}
  AND @hnng_recipe_total_steps = ${summary.steps}
  AND @hnng_recipe_valid_steps = ${summary.steps}
  AND @hnng_recipe_total_links = ${summary.ingredientLinks}
  AND @hnng_recipe_valid_links = ${summary.ingredientLinks}
);

-- COMMIT/ROLLBACK dong khong can stored procedure tren hosting.
SET @hnng_recipe_finish_sql := IF(@hnng_recipe_applied = 1, 'COMMIT', 'ROLLBACK');
PREPARE hnng_recipe_finish FROM @hnng_recipe_finish_sql;
EXECUTE hnng_recipe_finish;
DEALLOCATE PREPARE hnng_recipe_finish;

SELECT
  IF(@hnng_recipe_applied = 1, 'UPDATED', 'NOT_UPDATED_CHECK_DETAILS') AS trang_thai,
  @hnng_recipe_database AS database_da_chon,
  @hnng_recipe_found AS so_mon_tim_thay,
  IF(@hnng_recipe_applied = 1, ${summary.foods}, 0) AS so_mon_da_cap_nhat,
  IF(@hnng_recipe_applied = 1, ${summary.steps}, 0) AS so_buoc_moi,
  IF(@hnng_recipe_applied = 1, ${summary.ingredientLinks}, 0) AS so_dinh_luong_moi,
  @hnng_recipe_unit_conflicts AS so_nguyen_lieu_khac_don_vi,
  @hnng_recipe_transactional_tables AS so_bang_InnoDB;

-- Hai ket qua duoi day rong neu khong co mon thieu hoac don vi khac.
SELECT r.slug AS mon_con_thieu
FROM tmp_hnng_recipe_foods r LEFT JOIN foods f ON f.slug = r.slug
WHERE f.id_food IS NULL;

SELECT i.name AS nguyen_lieu, i.unit AS don_vi_hien_tai, r.unit AS don_vi_can_co
FROM ingredients i JOIN tmp_hnng_recipe_ingredients r ON r.name = i.name
WHERE BINARY i.unit <> BINARY r.unit;

DROP TEMPORARY TABLE IF EXISTS tmp_hnng_recipe_steps;
DROP TEMPORARY TABLE IF EXISTS tmp_hnng_recipe_links;
DROP TEMPORARY TABLE IF EXISTS tmp_hnng_recipe_ingredients;
DROP TEMPORARY TABLE IF EXISTS tmp_hnng_recipe_foods;
`;
}

module.exports = { buildHostingSql };
