const prisma = require('../lib/prisma');

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';

const INGREDIENT_ALIASES = {
    thit: ['Thit', 'Thịt', 'heo', 'gà', 'ga', 'bò', 'bo', 'cá', 'ca', 'sườn', 'suon'],
    'thit-heo': ['Thịt ba chỉ', 'Thịt heo', 'heo', 'Sườn non'],
    'thit-ga': ['Thịt gà', 'gà'],
    'thit-bo': ['Thịt bò', 'bò'],
    ca: ['Cá', 'cá', 'Cá basa', 'Cá lóc'],
    tom: ['Tôm', 'tôm', 'Cua', 'cua'],
    trung: ['Trung', 'Trứng', 'trung', 'trứng'],
    'dau-hu': ['Đậu hũ', 'đậu hũ'],
    rau: ['Rau', 'rau', 'Cải', 'cải', 'Bông cải', 'Đậu que', 'Cà rốt', 'Giá', 'Bí đỏ']
};

const CATEGORY_ALIASES = {
    man: ['mon-man', 'mon-kho', 'mon-chien', 'mon-xao', 'mon-luoc'],
    canh: ['mon-canh'],
    xao: ['mon-xao'],
    kho: ['mon-kho'],
    nuong: ['mon-nuong'],
    chien: ['mon-chien'],
    lau: ['mon-lau'],
    rau: ['mon-rau']
};

function clampQuantity(quantity) {
    const parsed = Number.parseInt(quantity, 10);
    if (Number.isNaN(parsed)) return 1;
    return Math.min(Math.max(parsed, 1), 50);
}

function normalizeList(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value.flatMap(normalizeList);

    return String(value)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

function expandAliases(values, aliases) {
    return values.flatMap((value) => aliases[value] || [value]);
}

function buildWhere({ ingredients = [], categories = [] }) {
    const where = {
        status: 'active'
    };

    const categorySlugs = expandAliases(categories, CATEGORY_ALIASES);
    if (categorySlugs.length) {
        where.categories = {
            slug: {
                in: categorySlugs
            }
        };
    }

    const ingredientNames = expandAliases(ingredients, INGREDIENT_ALIASES);
    if (ingredientNames.length) {
        where.food_ingredients = {
            some: {
                ingredients: {
                    OR: ingredientNames.map((name) => ({
                        name: {
                            contains: name
                        }
                    }))
                }
            }
        };
    }

    return where;
}

function shuffle(items) {
    const cloned = [...items];

    for (let index = cloned.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [cloned[index], cloned[randomIndex]] = [cloned[randomIndex], cloned[index]];
    }

    return cloned;
}

function formatQuantity(value) {
    if (value === null || value === undefined) return '';

    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return String(value);
    return Number.isInteger(numberValue) ? String(numberValue) : String(numberValue).replace(/\.?0+$/, '');
}

function formatFood(food) {
    return {
        id: food.id_food,
        name: food.name,
        slug: food.slug,
        description: food.description,
        image: food.image || FALLBACK_IMAGE,
        time: food.cooking_time ? `${food.cooking_time} phut` : '30 phut',
        cookingTime: food.cooking_time,
        servings: food.servings,
        category: food.categories
            ? {
                id: food.categories.id_category,
                name: food.categories.name,
                slug: food.categories.slug
            }
            : null,
        ingredients: food.food_ingredients.map((item) => {
            const quantity = formatQuantity(item.quantity);
            const unit = item.ingredients?.unit || '';
            const name = item.ingredients?.name || '';
            const note = item.note ? ` (${item.note})` : '';

            return `${quantity} ${unit} ${name}${note}`.replace(/\s+/g, ' ').trim();
        }),
        steps: food.recipe_steps.map((step) => step.instruction),
        likes: '0',
        author: {
            name: 'Hom Nay Nau Gi'
        }
    };
}

async function findFoods(where) {
    return prisma.foods.findMany({
        where,
        include: {
            categories: true,
            food_ingredients: {
                include: {
                    ingredients: true
                }
            },
            recipe_steps: {
                orderBy: {
                    step_number: 'asc'
                }
            }
        }
    });
}

async function getRandomMeals(options = {}) {
    const quantity = clampQuantity(options.quantity);
    const ingredients = normalizeList(options.ingredients);
    const categories = normalizeList(options.categories);
    const filteredWhere = buildWhere({ ingredients, categories });

    const hasFilters = ingredients.length || categories.length;
    const matchedFoods = await findFoods(filteredWhere);
    const selectedFoods = shuffle(matchedFoods).slice(0, quantity);
    let fallbackCount = 0;

    if (selectedFoods.length < quantity) {
        const selectedIds = new Set(selectedFoods.map((food) => food.id_food));
        const fallbackFoods = await findFoods({
            status: 'active',
            id_food: {
                notIn: Array.from(selectedIds)
            }
        });

        const fillFoods = shuffle(fallbackFoods).slice(0, quantity - selectedFoods.length);
        fallbackCount = fillFoods.length;
        selectedFoods.push(...fillFoods);
    }

    return {
        requested: quantity,
        matchedFilters: !hasFilters || matchedFoods.length > 0,
        totalCandidates: matchedFoods.length,
        fallbackCount,
        foods: selectedFoods.map(formatFood)
    };
}

async function getRandomOptions() {
    const [categories, ingredients] = await Promise.all([
        prisma.categories.findMany({
            orderBy: {
                name: 'asc'
            }
        }),
        prisma.ingredients.findMany({
            orderBy: {
                name: 'asc'
            }
        })
    ]);

    return {
        categories: categories.map((category) => ({
            id: category.id_category,
            name: category.name,
            slug: category.slug
        })),
        ingredients: ingredients.map((ingredient) => ({
            id: ingredient.id_ingredient,
            name: ingredient.name,
            unit: ingredient.unit
        }))
    };
}

module.exports = {
    getRandomMeals,
    getRandomOptions
};
