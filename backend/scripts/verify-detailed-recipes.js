const assert = require('node:assert/strict');
const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env'), quiet: true });
const { PrismaClient } = require('@prisma/client');
const { recipes, validateRecipes } = require('./lib/recipe-data');

async function verifyRecipes(prisma, apiBase) {
    const summary = validateRecipes();
    const foods = await prisma.foods.findMany({ where: { slug: { in: recipes.map(recipe => recipe.slug) } }, include: {
        food_ingredients: { include: { ingredients: true } }, recipe_steps: { orderBy: { step_number: 'asc' } }
    } });
    assert.equal(foods.length, recipes.length, 'Database thiếu công thức');
    const bySlug = new Map(foods.map(food => [food.slug, food]));
    const sortIngredients = rows => rows.sort((a, b) => a[0].localeCompare(b[0], 'vi'));
    let apiChecks = 0;
    for (const recipe of recipes) {
        const food = bySlug.get(recipe.slug);
        assert.equal(food.description, recipe.description, recipe.slug);
        assert.equal(food.cooking_time, recipe.cooking_time, recipe.slug);
        assert.equal(food.servings, recipe.servings, recipe.slug);
        assert.deepEqual(food.recipe_steps.map(step => step.step_number), recipe.steps.map((_, index) => index + 1), recipe.slug);
        assert.deepEqual(food.recipe_steps.map(step => step.instruction), recipe.steps, recipe.slug);
        assert.deepEqual(sortIngredients(food.food_ingredients.map(row => [row.ingredients.name, Number(row.quantity), row.ingredients.unit, row.note])),
            sortIngredients(recipe.ingredients.map(row => [...row])), recipe.slug);
        if (apiBase) {
            const response = await fetch(`${apiBase}/api/foods/${recipe.slug}`, { signal: AbortSignal.timeout(10000) });
            assert.equal(response.status, 200, `HTTP: ${recipe.slug}`);
            const body = await response.json();
            assert.equal(body.success, true, recipe.slug);
            assert.equal(body.data.description, recipe.description, recipe.slug);
            assert.equal(body.data.cooking_time_minutes, recipe.cooking_time, recipe.slug);
            assert.equal(body.data.servings, recipe.servings, recipe.slug);
            assert.deepEqual(body.data.steps, recipe.steps, recipe.slug);
            const byName = (a, b) => a.name.localeCompare(b.name, 'vi');
            assert.deepEqual([...body.data.ingredients].sort(byName), food.food_ingredients.map(row => ({ name: row.ingredients.name,
                amount: `${Number(row.quantity)} ${row.ingredients.unit}${row.note ? ` (${row.note})` : ''}` })).sort(byName), recipe.slug);
            apiChecks++;
        }
    }
    return { ...summary, verifiedDatabase: foods.length, verifiedApi: apiChecks };
}

if (require.main === module) {
    const args = process.argv.slice(2);
    assert(args.length === 0 || (args.length === 2 && args[0] === '--api'), 'Dùng --api http://localhost:5000 để kiểm tra HTTP');
    const prisma = new PrismaClient();
    verifyRecipes(prisma, args[1]).then(result => console.log(JSON.stringify(result)))
        .catch(error => { console.error(error.message); process.exitCode = 1; })
        .finally(() => prisma.$disconnect());
}

module.exports = { verifyRecipes };
