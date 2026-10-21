const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
require('../backend/node_modules/dotenv').config({ path: path.join(root, 'backend/.env'), quiet: true });
const { PrismaClient } = require('../backend/node_modules/@prisma/client');
const { verifyRecipes } = require('../backend/scripts/verify-detailed-recipes');
const baseUrl = new URL(process.env.DATABASE_URL);
const temporaryName = `homnaynaugi_hosting_check_${Date.now()}`;
assert.match(temporaryName, /^homnaynaugi_hosting_check_\d{13}$/);
assert.notEqual(baseUrl.pathname, '/' + temporaryName);
const testUrl = new URL(baseUrl);
testUrl.pathname = '/' + temporaryName;
const admin = new PrismaClient();
const test = new PrismaClient({ datasourceUrl: testUrl.toString() });
let created = false;

function importSql(sql, force = false) {
    const args = ['--protocol=TCP', '--host=' + baseUrl.hostname, '--port=' + (baseUrl.port || '3306'),
        '--user=' + decodeURIComponent(baseUrl.username), '--default-character-set=utf8mb4',
        '--batch', '--skip-column-names', '--database=' + temporaryName];
    if (force) args.push('--force');
    const result = spawnSync('C:/laragon/bin/mysql/mysql-8.0.30-winx64/bin/mysql.exe', args, {
        input: sql, encoding: 'utf8', env: { ...process.env, MYSQL_PWD: decodeURIComponent(baseUrl.password) }, windowsHide: true
    });
    if (result.error) throw result.error;
    assert.equal(result.status, 0, result.stderr);
    if (!force) assert(!result.stderr.includes('ERROR'), result.stderr);
    return result;
}

async function protectedData() {
    const tables = {
        users: 'id_user', posts: 'id_post', favorites: 'id_favorite', comments: 'id_comment',
        shopping_lists: 'id_shopping_list', shopping_list_items: 'id_shopping_list_item',
        notifications: 'id_notification', reports: 'id_report', post_likes: 'id_post_like'
    };
    const result = {};
    for (const [table, key] of Object.entries(tables)) result[table] = await test.$queryRawUnsafe(`SELECT * FROM ${table} ORDER BY ${key}`);
    result.foods = await test.foods.findMany({ orderBy: { id_food: 'asc' }, select: {
        id_food: true, name: true, slug: true, image: true, status: true, id_category: true, created_at: true
    } });
    result.customFood = await test.foods.findUnique({ where: { slug: 'mon-rieng-hosting' }, include: { food_ingredients: true, recipe_steps: true } });
    return JSON.stringify(result, (_, value) => typeof value === 'bigint' ? value.toString() : value);
}

async function mutableData() {
    return JSON.stringify({
        foods: await test.foods.findMany({ orderBy: { id_food: 'asc' } }),
        ingredients: await test.ingredients.findMany({ orderBy: { id_ingredient: 'asc' } }),
        links: await test.food_ingredients.findMany({ orderBy: { id_food_ingredient: 'asc' } }),
        steps: await test.recipe_steps.findMany({ orderBy: { id_recipe_step: 'asc' } })
    });
}

async function main() {
    await admin.$executeRawUnsafe(`CREATE DATABASE \`${temporaryName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    created = true;
    importSql(fs.readFileSync(path.join(root, 'hom_nay_an_gi.sql'), 'utf8'));
    // Recreate the old short recipes with only their original ingredient dictionary.
    await test.recipe_steps.deleteMany({ where: { step_number: { gt: 3 } } });
    await test.recipe_steps.updateMany({ data: { instruction: 'Công thức ngắn cũ trên hosting.' } });
    await test.food_ingredients.deleteMany({ where: { id_ingredient: { gte: 60 } } });
    await test.ingredients.deleteMany({ where: { id_ingredient: { gte: 60 } } });
    await test.$executeRawUnsafe('UPDATE foods SET id_food = id_food + 1000');
    const firstFood = await test.foods.findFirst();
    const extra = await test.foods.create({ data: { id_category: firstFood.id_category, slug: 'mon-rieng-hosting', name: 'Món riêng hosting',
        description: 'Giữ nguyên nội dung riêng.', image: '/keep-custom.jpg', status: 'inactive', cooking_time: 10, servings: 2 } });
    const ingredient = await test.ingredients.create({ data: { name: 'Nguyên liệu riêng hosting', unit: 'g' } });
    await test.food_ingredients.create({ data: { id_food: extra.id_food, id_ingredient: ingredient.id_ingredient, quantity: 123, note: 'giữ nguyên' } });
    await test.recipe_steps.create({ data: { id_food: extra.id_food, step_number: 1, instruction: 'Bước nấu riêng giữ nguyên.' } });
    await test.favorites.create({ data: { id_food: extra.id_food, id_user: 1 } });
    await test.$executeRaw`INSERT INTO posts (id_food, id_user, title, content, status) VALUES (${extra.id_food}, 1, 'Bài viết riêng hosting', 'Nội dung giữ nguyên.', 'active')`;
    const before = await protectedData();
    const originalIngredients = await test.ingredients.findMany({ orderBy: { id_ingredient: 'asc' } });
    const update = fs.readFileSync(path.join(root, 'update_detailed_recipes.sql'), 'utf8');
    const first = importSql(update);
    assert.match(first.stdout, /^UPDATED\t/m);
    await verifyRecipes(test);
    assert.equal(await protectedData(), before);
    for (const old of originalIngredients) assert.deepEqual(await test.ingredients.findUnique({ where: { id_ingredient: old.id_ingredient } }), old);
    console.log('PASS: nâng cấp công thức cũ với ID khác local, giữ món riêng và dữ liệu liên quan.');

    const second = importSql(update);
    assert.match(second.stdout, /^UPDATED\t/m);
    await verifyRecipes(test);
    assert.equal(await protectedData(), before);
    assert.equal(await test.foods.count(), 51);
    assert.equal(await test.recipe_steps.count(), 326);
    assert.equal(await test.food_ingredients.count(), 442);
    console.log('PASS: import lần hai không tạo món, nguyên liệu theo món hoặc bước trùng.');

    await test.foods.update({ where: { slug: 'thit-kho-trung' }, data: { slug: 'thit-kho-trung-missing' } });
    const missingBefore = await mutableData();
    const missing = importSql(update);
    assert.match(missing.stdout, /^NOT_UPDATED_CHECK_DETAILS\t/m);
    assert.equal(await mutableData(), missingBefore);
    console.log('PASS: thiếu slug không ghi bất kỳ thay đổi nào.');
    await test.foods.update({ where: { slug: 'thit-kho-trung-missing' }, data: { slug: 'thit-kho-trung' } });

    await test.ingredients.update({ where: { name: 'Muối' }, data: { unit: 'kg' } });
    const unitBefore = await mutableData();
    const conflict = importSql(update);
    assert.match(conflict.stdout, /^NOT_UPDATED_CHECK_DETAILS\t/m);
    assert.equal(await mutableData(), unitBefore);
    console.log('PASS: khác đơn vị nguyên liệu không ghi bất kỳ thay đổi nào.');
    await test.ingredients.update({ where: { name: 'Muối' }, data: { unit: 'g' } });

    await test.foods.update({ where: { slug: 'thit-kho-trung' }, data: { description: 'rollback-sentinel' } });
    const rollbackBefore = await mutableData();
    const broken = update.replace('INSERT INTO food_ingredients (id_food, id_ingredient, quantity, note)',
        'INSERT INTO food_ingredients (id_food, id_ingredient, missing_quantity, note)');
    assert.notEqual(broken, update);
    const failed = importSql(broken, true);
    assert.match(failed.stderr, /Unknown column 'missing_quantity'/);
    assert.match(failed.stdout, /^NOT_UPDATED_CHECK_DETAILS\t/m);
    assert.equal(await mutableData(), rollbackBefore);
    console.log('PASS: lỗi giữa chừng và client vẫn chạy tiếp sẽ rollback toàn bộ.');
}

main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(async () => {
    await test.$disconnect();
    if (created) {
        assert.match(temporaryName, /^homnaynaugi_hosting_check_\d{13}$/);
        await admin.$executeRawUnsafe(`DROP DATABASE \`${temporaryName}\``);
        console.log('Đã xóa database kiểm thử tạm.');
    }
    await admin.$disconnect();
});
