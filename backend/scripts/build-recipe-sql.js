const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { recipes, root, revision, normalizeLines, validateRecipes, readInsert, replaceInsert, seedRows } = require('./lib/recipe-data');
const { buildHostingSql } = require('./build-hosting-recipe-sql');

function buildFiles() {
    const summary = validateRecipes();
    const seed = seedRows();
    const bySlug = new Map(recipes.map(recipe => [recipe.slug, recipe]));
    assert.equal(seed.foods.length, 50, 'Seed phải chứa đúng 50 món');
    const foodIds = new Map(seed.foods.map(row => [row[3], row[0]]));
    for (const recipe of recipes) assert(foodIds.has(recipe.slug), `Thiếu món trong seed: ${recipe.slug}`);

    const ingredients = seed.ingredients.map(row => [...row]);
    const ingredientIds = new Map(ingredients.map(row => [row[1], row[0]]));
    const units = new Map(ingredients.map(row => [row[1], row[2]]));
    let nextIngredient = Math.max(...ingredients.map(row => row[0])) + 1;
    for (const recipe of recipes) {
        for (const [name, , unit] of recipe.ingredients) {
            if (!ingredientIds.has(name)) {
                ingredientIds.set(name, nextIngredient);
                ingredients.push([nextIngredient++, name, unit, revision, revision]);
                units.set(name, unit);
            }
            assert.equal(units.get(name), unit, `Không được đổi đơn vị nguyên liệu đang có: ${name}`);
        }
    }

    const oldLinks = new Map(seed.links.map(row => [`${row[1]}:${row[2]}`, row[0]]));
    const oldSteps = new Map(seed.steps.map(row => [`${row[1]}:${row[2]}`, row[0]]));
    let nextLink = Math.max(...seed.links.map(row => row[0])) + 1;
    let nextStep = Math.max(...seed.steps.map(row => row[0])) + 1;
    const links = [];
    const steps = [];
    for (const recipe of recipes) {
        const id = foodIds.get(recipe.slug);
        for (const [name, quantity, , note] of recipe.ingredients) {
            const ingredientId = ingredientIds.get(name);
            links.push([oldLinks.get(`${id}:${ingredientId}`) ?? nextLink++, id, ingredientId, quantity, note]);
        }
        recipe.steps.forEach((instruction, index) => {
            steps.push([oldSteps.get(`${id}:${index + 1}`) ?? nextStep++, id, index + 1, instruction]);
        });
    }
    let dump = seed.sql;
    const foods = seed.foods.map(row => {
        const recipe = bySlug.get(row[3]);
        const updated = [...row];
        updated[4] = recipe.description;
        updated[6] = recipe.cooking_time;
        updated[7] = recipe.servings;
        updated[10] = revision;
        return updated;
    });
    dump = replaceInsert(dump, 'foods', foods);
    dump = replaceInsert(dump, 'ingredients', ingredients);
    dump = replaceInsert(dump, 'food_ingredients', links);
    dump = replaceInsert(dump, 'recipe_steps', steps);
    for (const [table, rows] of [['ingredients', ingredients], ['food_ingredients', links], ['recipe_steps', steps]]) {
        const pattern = new RegExp('(ALTER TABLE `' + table + '`\\s+MODIFY[^;]*AUTO_INCREMENT=)\\d+');
        assert(pattern.test(dump), `Thiếu AUTO_INCREMENT: ${table}`);
        dump = dump.replace(pattern, (_, prefix) => prefix + (Math.max(...rows.map(row => row[0])) + 1));
    }

    // Keep the extra fallback candidates and the existing add-to-50 selection logic.
    // Replace only recipes in the canonical set; names, slugs and images stay intact.
    const addPath = path.join(root, 'add_foods_to_50.sql');
    let addition = fs.readFileSync(addPath, 'utf8');
    const candidates = readInsert(addition, 'tmp_food_candidates').rows.map(row => {
        const recipe = bySlug.get(row[3]);
        if (!recipe) return row;
        const updated = [...row];
        updated[4] = recipe.description;
        updated[6] = recipe.cooking_time;
        updated[7] = recipe.servings;
        return updated;
    });
    const candidateSlugs = new Set(candidates.map(row => row[3]));
    const candidateLinks = readInsert(addition, 'tmp_food_candidate_ingredients').rows.filter(row => !bySlug.has(row[0]));
    const candidateSteps = readInsert(addition, 'tmp_food_candidate_steps').rows.filter(row => !bySlug.has(row[0]));
    for (const recipe of recipes.filter(recipe => candidateSlugs.has(recipe.slug))) {
        recipe.ingredients.forEach(([name, quantity, , note]) => candidateLinks.push([recipe.slug, name, quantity, note]));
        recipe.steps.forEach((instruction, index) => candidateSteps.push([recipe.slug, index + 1, instruction]));
    }
    const candidateIngredients = readInsert(addition, 'ingredients').rows;
    const candidateNames = new Set(candidateIngredients.map(row => row[0]));
    for (const row of ingredients) {
        if (!candidateNames.has(row[1])) {
            candidateNames.add(row[1]);
            candidateIngredients.push([row[1], row[2], { raw: 'NOW()' }, { raw: 'NOW()' }]);
        }
    }
    addition = replaceInsert(addition, 'tmp_food_candidates', candidates);
    addition = replaceInsert(addition, 'tmp_food_candidate_ingredients', candidateLinks);
    addition = replaceInsert(addition, 'tmp_food_candidate_steps', candidateSteps);
    addition = replaceInsert(addition, 'ingredients', candidateIngredients);
    return { summary, files: new Map([
        [path.join(root, 'hom_nay_an_gi.sql'), dump],
        [addPath, addition],
        [path.join(root, 'update_detailed_recipes.sql'), buildHostingSql()]
    ]) };
}

if (require.main === module) {
    try {
        const check = process.argv.includes('--check');
        assert(process.argv.slice(2).every(arg => arg === '--check'), 'Chỉ hỗ trợ tùy chọn --check');
        const { summary, files } = buildFiles();
        for (const [file, content] of files) {
            if (check) assert.equal(normalizeLines(fs.readFileSync(file, 'utf8')), normalizeLines(content), `SQL chưa đồng bộ: ${file}. Chạy npm run recipes:sql`);
            else fs.writeFileSync(file, content, 'utf8');
        }
        console.log(JSON.stringify({ mode: check ? 'check' : 'write-sql', ...summary }));
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}

module.exports = { buildFiles };
