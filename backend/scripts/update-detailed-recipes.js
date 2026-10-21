const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env'), quiet: true });
const { PrismaClient } = require('@prisma/client');
const { recipes, root, normalizeLines, validateRecipes } = require('./lib/recipe-data');
const { buildFiles } = require('./build-recipe-sql');

const include = { food_ingredients: { include: { ingredients: true } }, recipe_steps: { orderBy: { step_number: 'asc' } } };

async function updateRecipes(prisma) {
    const summary = validateRecipes();
    // Check every generated artifact before touching the database.
    const { files } = buildFiles();
    for (const [file, content] of files) assert.equal(normalizeLines(fs.readFileSync(file, 'utf8')), normalizeLines(content), 'Chạy npm run recipes:sql trước khi cập nhật');
    return prisma.$transaction(async tx => {
        const foods = await tx.foods.findMany({ where: { slug: { in: recipes.map(recipe => recipe.slug) } }, include });
        const bySlug = new Map(foods.map(food => [food.slug, food]));
        const missing = recipes.filter(recipe => !bySlug.has(recipe.slug)).map(recipe => recipe.slug);
        assert.equal(missing.length, 0, `Database thiếu món: ${missing.join(', ')}. Import seed trước khi chạy.`);
        const ingredients = await tx.ingredients.findMany();
        const byName = new Map(ingredients.map(ingredient => [ingredient.name, ingredient]));
        for (const recipe of recipes) {
            for (const [name, , unit] of recipe.ingredients) {
                const existing = byName.get(name);
                if (existing) assert.equal(existing.unit, unit, `Khác đơn vị trong database: ${name}; dừng để tránh sai danh sách đi chợ`);
            }
        }
        const directory = path.join(root, 'tmp/recipe-backups');
        fs.mkdirSync(directory, { recursive: true });
        const backup = path.join(directory, `recipes-before-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
        fs.writeFileSync(backup, JSON.stringify({ createdAt: new Date().toISOString(), foods, ingredients }, null, 2), { encoding: 'utf8', flag: 'wx' });
        console.log(`Bản sao lưu: ${backup}`);
        for (const recipe of recipes) {
            const food = bySlug.get(recipe.slug);
            const rows = [];
            for (const [name, quantity, unit, note] of recipe.ingredients) {
                let ingredient = byName.get(name);
                if (!ingredient) {
                    ingredient = await tx.ingredients.upsert({ where: { name }, create: { name, unit }, update: {} });
                    assert.equal(ingredient.unit, unit, `Khác đơn vị: ${name}`);
                    byName.set(name, ingredient);
                }
                rows.push({ id_food: food.id_food, id_ingredient: ingredient.id_ingredient, quantity, note });
            }
            await tx.foods.update({ where: { id_food: food.id_food }, data: {
                description: recipe.description, cooking_time: recipe.cooking_time, servings: recipe.servings, updated_at: new Date()
            } });
            await tx.food_ingredients.deleteMany({ where: { id_food: food.id_food } });
            await tx.food_ingredients.createMany({ data: rows });
            await tx.recipe_steps.deleteMany({ where: { id_food: food.id_food } });
            await tx.recipe_steps.createMany({ data: recipe.steps.map((instruction, index) => ({ id_food: food.id_food, step_number: index + 1, instruction })) });
        }
        return { ...summary, backup };
    }, { maxWait: 10000, timeout: 120000, isolationLevel: 'Serializable' });
}

if (require.main === module) {
    const prisma = new PrismaClient();
    updateRecipes(prisma).then(result => console.log(JSON.stringify(result)))
        .catch(error => { console.error(error.message); process.exitCode = 1; })
        .finally(() => prisma.$disconnect());
}

module.exports = { updateRecipes };
