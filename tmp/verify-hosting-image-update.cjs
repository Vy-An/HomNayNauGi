const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
require('../backend/node_modules/dotenv').config({ path: path.join(root, 'backend/.env'), quiet: true });
const { PrismaClient } = require('../backend/node_modules/@prisma/client');
const baseUrl = new URL(process.env.DATABASE_URL);
const temporaryName = `homnaynaugi_images_check_${Date.now()}`;
assert.match(temporaryName, /^homnaynaugi_images_check_\d{13}$/);
assert.notEqual(baseUrl.pathname, '/' + temporaryName);
const testUrl = new URL(baseUrl);
testUrl.pathname = '/' + temporaryName;
const admin = new PrismaClient();
const test = new PrismaClient({ datasourceUrl: testUrl.toString() });
let created = false;
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'food_images_manifest.json'), 'utf8'));
const update = fs.readFileSync(path.join(root, 'update_food_images.sql'), 'utf8');

function importSql(sql) {
    const result = spawnSync('C:/laragon/bin/mysql/mysql-8.0.30-winx64/bin/mysql.exe', [
        '--protocol=TCP', '--host=' + baseUrl.hostname, '--port=' + (baseUrl.port || '3306'),
        '--user=' + decodeURIComponent(baseUrl.username), '--default-character-set=utf8mb4',
        '--batch', '--skip-column-names', '--database=' + temporaryName
    ], { input: sql, encoding: 'utf8', env: { ...process.env, MYSQL_PWD: decodeURIComponent(baseUrl.password) }, windowsHide: true });
    if (result.error) throw result.error;
    assert.equal(result.status, 0, result.stderr);
    assert(!result.stderr.includes('ERROR'), result.stderr);
    return result.stdout;
}

async function protectedState() {
    const result = {};
    const tables = { users: 'id_user', posts: 'id_post', favorites: 'id_favorite', comments: 'id_comment',
        shopping_lists: 'id_shopping_list', shopping_list_items: 'id_shopping_list_item', ingredients: 'id_ingredient',
        food_ingredients: 'id_food_ingredient', recipe_steps: 'id_recipe_step', categories: 'id_category',
        notifications: 'id_notification', reports: 'id_report', post_likes: 'id_post_like' };
    for (const [table, key] of Object.entries(tables)) result[table] = await test.$queryRawUnsafe(`SELECT * FROM ${table} ORDER BY ${key}`);
    result.foods = (await test.foods.findMany({ orderBy: { id_food: 'asc' } })).map(({ image, updated_at, ...food }) => food);
    result.custom = await test.foods.findUnique({ where: { slug: 'anh-rieng-hosting' } });
    return JSON.stringify(result, (_, value) => typeof value === 'bigint' ? value.toString() : value);
}

async function allFoods() { return JSON.stringify(await test.foods.findMany({ orderBy: { id_food: 'asc' } })); }

async function main() {
    await admin.$executeRawUnsafe(`CREATE DATABASE \`${temporaryName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    created = true;
    importSql(fs.readFileSync(path.join(root, 'hom_nay_an_gi.sql'), 'utf8'));
    await test.$executeRawUnsafe('UPDATE foods SET id_food = id_food + 1000');
    const food = await test.foods.findFirst();
    await test.foods.create({ data: { id_category: food.id_category, name: 'Ảnh riêng hosting', slug: 'anh-rieng-hosting',
        image: '/keep-custom.jpg', description: 'Nội dung riêng giữ nguyên.', cooking_time: 9, servings: 2 } });
    const before = await protectedState();
    const first = importSql(update);
    assert.match(first, /^UPDATED\t[^\n]*\t50\t50\t50$/m);
    for (const image of manifest.images) assert.equal((await test.foods.findUnique({ where: { slug: image.slug } })).image, image.image);
    assert.equal(await protectedState(), before);
    console.log('PASS: cập nhật đúng 50 ảnh với ID khác local, giữ công thức, nguyên liệu và dữ liệu khác.');

    const after = await allFoods();
    const second = importSql(update);
    assert.match(second, /^UPDATED\t[^\n]*\t50\t50\t0$/m);
    assert.equal(await allFoods(), after);
    console.log('PASS: import lại không đổi dữ liệu đã đúng.');

    await test.foods.update({ where: { slug: 'thit-kho-trung' }, data: { slug: 'thit-kho-trung-missing' } });
    const missingBefore = await allFoods();
    assert.match(importSql(update), /^NOT_UPDATED_CHECK_DETAILS\t/m);
    assert.equal(await allFoods(), missingBefore);
    console.log('PASS: thiếu một slug không cập nhật dở dang.');

    for (const image of manifest.images) {
        const response = await fetch('http://localhost:5000' + image.image, { signal: AbortSignal.timeout(15000) });
        assert.equal(response.status, 200, image.filename);
        const digest = crypto.createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex');
        assert.equal(digest, image.sha256, image.filename);
    }
    console.log('PASS: 50 URL có phiên bản đều tải đúng byte ảnh hiện tại từ backend local.');
}

main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(async () => {
    await test.$disconnect();
    if (created) {
        assert.match(temporaryName, /^homnaynaugi_images_check_\d{13}$/);
        await admin.$executeRawUnsafe(`DROP DATABASE \`${temporaryName}\``);
        console.log('Đã xóa database kiểm thử tạm.');
    }
    await admin.$disconnect();
});
