const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const recipes = require('../../data/recipes.json');

const root = path.resolve(__dirname, '../../..');
const revision = '2026-10-20 00:00:00';
const normalizeLines = text => text.replace(/\r\n/g, '\n');

function validateRecipes() {
    assert.equal(recipes.length, 50, 'Phải có đúng 50 công thức');
    const slugs = new Set();
    const ingredients = new Map();
    for (const recipe of recipes) {
        assert.match(recipe.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        assert(!slugs.has(recipe.slug), `Trùng slug: ${recipe.slug}`);
        slugs.add(recipe.slug);
        assert(Number.isInteger(recipe.servings) && recipe.servings > 0 && recipe.servings <= 255);
        assert(Number.isInteger(recipe.cooking_time) && recipe.cooking_time > 0 && recipe.cooking_time <= 65535);
        assert(recipe.description.trim().length >= 80, `Mô tả quá ngắn: ${recipe.slug}`);
        assert(recipe.steps.length >= 6, `Thiếu bước: ${recipe.slug}`);
        assert(recipe.ingredients.length >= 4, `Thiếu nguyên liệu: ${recipe.slug}`);
        const names = new Set();
        for (const [name, quantity, unit, note] of recipe.ingredients) {
            assert(name && name.length <= 150 && unit && unit.length <= 50);
            assert(!names.has(name), `Trùng nguyên liệu ${name}: ${recipe.slug}`);
            names.add(name);
            assert(Number.isFinite(quantity) && quantity > 0 && quantity < 100000000);
            assert(note === null || (typeof note === 'string' && note.length <= 255));
            assert(!ingredients.has(name) || ingredients.get(name) === unit, `Khác đơn vị: ${name}`);
            ingredients.set(name, unit);
        }
        for (const instruction of recipe.steps) {
            assert(typeof instruction === 'string' && instruction.trim().length >= 100, `Bước quá ngắn: ${recipe.slug}`);
            assert(Buffer.byteLength(instruction, 'utf8') <= 65535);
        }
        assert(!JSON.stringify(recipe).includes('\uFFFD'), `Lỗi UTF-8: ${recipe.slug}`);
    }
    return { foods: recipes.length, steps: recipes.reduce((n, r) => n + r.steps.length, 0),
        ingredientLinks: recipes.reduce((n, r) => n + r.ingredients.length, 0), ingredients: ingredients.size };
}

function sqlValue(value) {
    if (value === null) return 'NULL';
    if (typeof value === 'number') return String(value);
    if (typeof value === 'object' && value.raw) return value.raw;
    return "'" + value.replace(/\\/g, '\\\\').replace(/'/g, "''") + "'";
}

function formatRows(rows) {
    return rows.map(row => '(' + row.map(sqlValue).join(', ') + ')').join(',\n');
}

// Read VALUES without splitting at commas/semicolons inside Vietnamese prose.
// Supports the dump's string literals, numbers, NULL and NOW() expressions.
function readInsert(sql, table) {
    const match = new RegExp('INSERT INTO `?' + table + '`?\\s*\\(([^)]+)\\)\\s*VALUES\\s*', 'i').exec(sql);
    assert(match, `Không tìm thấy INSERT ${table}`);
    const start = match.index + match[0].length;
    let position = start;
    const rows = [];
    const skipSpace = () => { while (/\s/.test(sql[position] || '') && position < sql.length) position++; };
    while (position < sql.length) {
        skipSpace();
        if (sql[position] !== '(') break;
        position++;
        const row = [];
        while (position < sql.length) {
            skipSpace();
            if (sql[position] === "'") {
                position++;
                let value = '';
                let closed = false;
                while (position < sql.length) {
                    const c = sql[position++];
                    if (c === '\\') {
                        const escaped = sql[position++];
                        value += ({ n: '\n', r: '\r', t: '\t', '0': '\0' })[escaped] ?? escaped;
                    } else if (c === "'") {
                        if (sql[position] === "'") { value += "'"; position++; }
                        else { closed = true; break; }
                    } else value += c;
                }
                assert(closed, `Chuỗi SQL chưa đóng: ${table}`);
                row.push(value);
            } else {
                const tokenStart = position;
                let depth = 0;
                while (position < sql.length) {
                    const c = sql[position];
                    if (depth === 0 && (c === ',' || c === ')')) break;
                    if (c === '(') depth++;
                    if (c === ')') depth--;
                    position++;
                }
                const token = sql.slice(tokenStart, position).trim();
                if (/^NULL$/i.test(token)) row.push(null);
                else if (/^-?\d+(?:\.\d+)?$/.test(token)) row.push(Number(token));
                else {
                    assert(/^(NOW\(\)|CURRENT_TIMESTAMP)$/i.test(token), `Biểu thức không hỗ trợ: ${token}`);
                    row.push({ raw: token });
                }
            }
            skipSpace();
            if (sql[position] === ')') { position++; break; }
            assert.equal(sql[position++], ',', `Sai dấu phân cách: ${table}`);
        }
        assert.equal(row.length, match[1].split(',').length, `Sai số cột: ${table}`);
        rows.push(row);
        const rowEnd = position;
        skipSpace();
        if (sql[position] === ',') position++;
        else { position = rowEnd; break; }
    }
    assert(rows.length > 0);
    return { start, end: position, rows };
}

function replaceInsert(sql, table, rows) {
    const { start, end } = readInsert(sql, table);
    return sql.slice(0, start) + formatRows(rows) + sql.slice(end);
}

function seedRows() {
    const sql = fs.readFileSync(path.join(root, 'hom_nay_an_gi.sql'), 'utf8');
    return { sql, foods: readInsert(sql, 'foods').rows, ingredients: readInsert(sql, 'ingredients').rows,
        links: readInsert(sql, 'food_ingredients').rows, steps: readInsert(sql, 'recipe_steps').rows };
}

module.exports = { recipes, root, revision, normalizeLines, validateRecipes, sqlValue, formatRows, readInsert, replaceInsert, seedRows };
