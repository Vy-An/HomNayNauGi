const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
require('../backend/node_modules/dotenv').config({ path: path.join(root, 'backend/.env'), quiet: true });
const { PrismaClient } = require('../backend/node_modules/@prisma/client');
const { updateRecipes } = require('../backend/scripts/update-detailed-recipes');
const { verifyRecipes } = require('../backend/scripts/verify-detailed-recipes');
const baseUrl = new URL(process.env.DATABASE_URL);
const temporaryName = `homnaynaugi_recipe_check_${Date.now()}`;
assert.match(temporaryName, /^homnaynaugi_recipe_check_\d{13}$/);
assert.notEqual(baseUrl.pathname, '/' + temporaryName);
const testUrl = new URL(baseUrl);
testUrl.pathname = '/' + temporaryName;
const admin = new PrismaClient();
const test = new PrismaClient({ datasourceUrl: testUrl.toString() });
let created = false;

function importSql(filename) {
    const result = spawnSync('C:/laragon/bin/mysql/mysql-8.0.30-winx64/bin/mysql.exe', [
        '--protocol=TCP', '--host=' + baseUrl.hostname, '--port=' + (baseUrl.port || '3306'),
        '--user=' + decodeURIComponent(baseUrl.username), '--default-character-set=utf8mb4', '--database=' + temporaryName,
    ], { input: fs.readFileSync(path.join(root, filename), 'utf8'), encoding: 'utf8',
        env: { ...process.env, MYSQL_PWD: decodeURIComponent(baseUrl.password) }, windowsHide: true });
    if (result.error) throw result.error;
    assert.equal(result.status, 0, `${filename}: ${result.stderr}`);
}

async function protectedFields() {
    return test.foods.findMany({ orderBy: { id_food: 'asc' }, select: {
        id_food: true, slug: true, name: true, image: true, status: true, id_category: true
    } });
}

async function main() {
    await admin.$executeRawUnsafe(`CREATE DATABASE \`${temporaryName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    created = true;
    importSql('hom_nay_an_gi.sql');
    console.log(JSON.stringify({ stage: 'fresh-seed-import', ...await verifyRecipes(test) }));
    importSql('add_foods_to_50.sql');
    console.log(JSON.stringify({ stage: 'add-on-full-database', ...await verifyRecipes(test) }));
    await test.foods.deleteMany({ where: { id_food: { gt: 18 } } });
    importSql('add_foods_to_50.sql');
    console.log(JSON.stringify({ stage: 'add-from-18-to-50', ...await verifyRecipes(test) }));
    const before = await protectedFields();
    await updateRecipes(test);
    await updateRecipes(test);
    await verifyRecipes(test);
    assert.deepEqual(await protectedFields(), before);
    assert.equal(await test.foods.count(), 50);
    assert.equal(await test.recipe_steps.count(), 325);
    assert.equal(await test.food_ingredients.count(), 441);
    console.log(JSON.stringify({ stage: 'repeat-update', duplicateSteps: 0, duplicateIngredientLinks: 0, protectedFields: 'unchanged' }));

    await test.foods.update({ where: { slug: 'thit-kho-trung' }, data: { description: 'rollback-sentinel' } });
    const beforeSteps = await test.recipe_steps.findMany({ orderBy: { id_recipe_step: 'asc' } });
    let writes = 0;
    const injectedClient = { $transaction: (callback, options) => test.$transaction(tx => callback(new Proxy(tx, {
        get(target, key) {
            if (key !== 'foods') return target[key];
            return new Proxy(target.foods, { get(foods, operation) {
                if (operation !== 'update') return foods[operation];
                return async args => { if (++writes === 5) throw new Error('injected-rollback'); return foods.update(args); };
            } });
        }
    })), options) };
    await assert.rejects(updateRecipes(injectedClient), /injected-rollback/);
    assert.equal((await test.foods.findUnique({ where: { slug: 'thit-kho-trung' } })).description, 'rollback-sentinel');
    assert.deepEqual(await test.recipe_steps.findMany({ orderBy: { id_recipe_step: 'asc' } }), beforeSteps);
    console.log(JSON.stringify({ stage: 'forced-error-rollback', rolledBack: true }));
}

main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(async () => {
    await test.$disconnect();
    if (created) {
        assert.match(temporaryName, /^homnaynaugi_recipe_check_\d{13}$/);
        await admin.$executeRawUnsafe(`DROP DATABASE \`${temporaryName}\``);
        console.log('Đã xóa database kiểm thử tạm.');
    }
    await admin.$disconnect();
});
