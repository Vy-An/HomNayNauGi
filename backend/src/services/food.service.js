const prisma = require('../lib/prisma');

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';

// Mapping ảnh HD chất lượng cao tương ứng với các món ăn trong cơ sở dữ liệu
const DISH_IMAGES = {
    'thit-kho-trung': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    'ca-kho-to': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80',
    'ga-kho-gung': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80',
    'suon-xao-chua-ngot': 'https://images.unsplash.com/photo-1544025162-8314e3fc4585?w=800&auto=format&fit=crop&q=80',
    'bo-xao-hanh-tay': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
    'trung-chien-hanh': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    'ca-chien-nuoc-mam': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    'canh-chua-ca-loc': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80',
    'canh-bi-do-thit-bam': 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&auto=format&fit=crop&q=80',
    'canh-cai-thit-bam': 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=80',
    'canh-ca-chua-trung': 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?w=800&auto=format&fit=crop&q=80',
    'rau-muong-xao-toi': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    'cai-thia-xao-toi': 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&auto=format&fit=crop&q=80',
    'dau-que-xao-toi': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    'rau-cu-luoc': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=80',
    'thit-ba-chi-luoc': 'https://images.unsplash.com/photo-1544025162-8314e3fc4585?w=800&auto=format&fit=crop&q=80',
    'dau-hu-sot-ca-chua': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    'ga-chien-nuoc-mam': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80'
};

function resolveImage(slug, image) {
    if (image && (image.startsWith('http://') || image.startsWith('https://'))) {
        return image;
    }
    return DISH_IMAGES[slug] || FALLBACK_IMAGE;
}

function formatQuantity(value) {
    if (value === null || value === undefined) return '';
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return String(value);
    return Number.isInteger(numberValue) ? String(numberValue) : String(numberValue).replace(/\.?0+$/, '');
}

function normalizeList(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value.flatMap(normalizeList);
    return String(value)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

function formatFoodSummary(food) {
    const rawIngredients = (food.food_ingredients || [])
        .map((fi) => fi.ingredients?.name)
        .filter(Boolean);

    const categoryName = food.categories?.name || 'Món ngon';
    const categorySlug = food.categories?.slug || 'viet';
    const cookingTime = food.cooking_time || 30;

    return {
        id: food.id_food,
        name: food.name,
        slug: food.slug,
        description: food.description || 'Món ăn thơm ngon, hấp dẫn và cung cấp đầy đủ dinh dưỡng, dễ dàng thực hiện tại nhà.',
        image: resolveImage(food.slug, food.image),
        time: `${cookingTime} phút`,
        cooking_time_minutes: cookingTime,
        servings: food.servings || 4,
        rating: 4.8,
        rating_count: '1.5k',
        likes: (food.favorites && food.favorites.length) ? (food.favorites.length * 120 + 250) : 850,
        is_favorite: false,
        category: categoryName,
        category_slug: categorySlug,
        sub_category: categorySlug === 'mon-chay' ? 'chay' : (cookingTime <= 20 ? 'nhanh' : 'viet'),
        difficulty: cookingTime > 40 ? 'Trung bình' : 'Dễ làm',
        ingredients: rawIngredients,
        tags: [categoryName, cookingTime <= 20 ? 'Món nhanh' : 'Món Việt', 'Dễ làm'].filter(Boolean),
        author: {
            name: 'Hôm Nay Nấu Gì',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
        }
    };
}

function formatFoodDetail(food, relatedFoods = []) {
    const categoryName = food.categories?.name || 'Món ngon';
    const categorySlug = food.categories?.slug || 'viet';
    const cookingTime = food.cooking_time || 30;
    const servings = food.servings || 4;

    const ingredients = (food.food_ingredients || []).map((item) => {
        const qty = formatQuantity(item.quantity);
        const unit = item.ingredients?.unit || '';
        const name = item.ingredients?.name || '';
        const note = item.note ? ` (${item.note})` : '';
        return {
            name: name,
            amount: `${qty} ${unit}${note}`.trim()
        };
    });

    const steps = (food.recipe_steps || [])
        .sort((a, b) => a.step_number - b.step_number)
        .map((s) => s.instruction);

    return {
        id: food.id_food,
        name: food.name,
        slug: food.slug,
        description: food.description || 'Món ăn đặc sản thơm ngon, đậm đà chuẩn vị gia đình Việt Nam.',
        image: resolveImage(food.slug, food.image),
        time: `${cookingTime} phút`,
        cooking_time_minutes: cookingTime,
        portions: `${servings} người`,
        servings: servings,
        difficulty: cookingTime > 40 ? 'Trung bình' : 'Dễ làm',
        likes: (food.favorites && food.favorites.length) ? (food.favorites.length * 150 + 450) : '2.5k',
        calories: cookingTime <= 20 ? '350 kcal' : '520 kcal',
        category: categoryName,
        category_slug: categorySlug,
        mealType: 'Bữa chính',
        ingredients: ingredients,
        steps: steps.length ? steps : [
            'Sơ chế sạch các nguyên liệu trước khi nấu.',
            'Tẩm ướp gia vị vừa ăn theo khẩu vị gia đình trong 15-20 phút.',
            'Tiến hành nấu chín đều các nguyên liệu theo nhiệt độ vừa phải.',
            'Bày trí ra đĩa hoặc tô và thưởng thức ngay khi còn nóng sốt.'
        ],
        relatedFoods: relatedFoods.map(formatFoodSummary)
    };
}

/**
 * Lấy danh sách món ăn kèm chức năng tìm kiếm và lọc theo nguyên liệu/danh mục/thời gian
 */
async function getFoods(query = {}) {
    const {
        search = '',
        category = 'all',
        sub_category = '',
        ingredients = '',
        cook_time = 'all',
        sort = 'newest',
        page = 1,
        limit = 50
    } = query;

    const where = {
        status: 'active'
    };

    // 1. Tìm kiếm theo từ khóa (tên món, mô tả hoặc tên nguyên liệu)
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
        where.OR = [
            { name: { contains: trimmedSearch } },
            { description: { contains: trimmedSearch } },
            {
                food_ingredients: {
                    some: {
                        ingredients: {
                            name: { contains: trimmedSearch }
                        }
                    }
                }
            }
        ];
    }

    // 2. Lọc theo danh mục
    if (category && category !== 'all') {
        const catNum = Number(category);
        if (!Number.isNaN(catNum)) {
            where.id_category = catNum;
        } else {
            where.categories = {
                OR: [
                    { slug: category },
                    { name: { contains: category } }
                ]
            };
        }
    }

    // 3. Lọc theo nguyên liệu
    const ingredientList = normalizeList(ingredients);
    if (ingredientList.length > 0) {
        where.food_ingredients = {
            some: {
                ingredients: {
                    OR: ingredientList.map((nameOrId) => {
                        const ingId = Number(nameOrId);
                        if (!Number.isNaN(ingId)) {
                            return { id_ingredient: ingId };
                        }
                        return { name: { contains: nameOrId } };
                    })
                }
            }
        };
    }

    // 4. Lọc theo thời gian nấu
    if (cook_time === 'under_15') {
        where.cooking_time = { lte: 15 };
    } else if (cook_time === '15_to_30') {
        where.cooking_time = { gt: 15, lte: 30 };
    } else if (cook_time === 'above_30') {
        where.cooking_time = { gt: 30 };
    }

    // 5. Sắp xếp (Sorting)
    let orderBy = { created_at: 'desc' };
    if (sort === 'time_asc') {
        orderBy = { cooking_time: 'asc' };
    } else if (sort === 'time_desc') {
        orderBy = { cooking_time: 'desc' };
    } else if (sort === 'name_asc') {
        orderBy = { name: 'asc' };
    } else if (sort === 'newest') {
        orderBy = { id_food: 'desc' };
    }

    const pageNum = Math.max(1, Number(page) || 1);
    const take = Math.min(100, Math.max(1, Number(limit) || 50));
    const skip = (pageNum - 1) * take;

    const [total, rawFoods] = await Promise.all([
        prisma.foods.count({ where }),
        prisma.foods.findMany({
            where,
            include: {
                categories: true,
                food_ingredients: {
                    include: {
                        ingredients: true
                    }
                },
                favorites: true
            },
            orderBy,
            skip,
            take
        })
    ]);

    let formattedFoods = rawFoods.map(formatFoodSummary);

    // Xử lý sub_category nếu có
    if (sub_category && sub_category !== 'all') {
        formattedFoods = formattedFoods.filter((f) => f.sub_category === sub_category);
    }

    return {
        foods: formattedFoods,
        total,
        page: pageNum,
        limit: take
    };
}

/**
 * Lấy chi tiết món ăn theo ID hoặc Slug, kèm các bước thực hiện, nguyên liệu và món liên quan
 */
async function getFoodById(idOrSlug) {
    const isNum = !Number.isNaN(Number(idOrSlug));
    const where = {
        status: 'active',
        ...(isNum ? { id_food: Number(idOrSlug) } : { slug: String(idOrSlug) })
    };

    const food = await prisma.foods.findFirst({
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
            },
            favorites: true
        }
    });

    if (!food) {
        return null;
    }

    // Lấy các món ăn liên quan trong cùng danh mục
    const relatedFoods = await prisma.foods.findMany({
        where: {
            status: 'active',
            id_category: food.id_category,
            id_food: { not: food.id_food }
        },
        take: 3,
        include: {
            categories: true,
            food_ingredients: {
                include: {
                    ingredients: true
                }
            },
            favorites: true
        }
    });

    return formatFoodDetail(food, relatedFoods);
}

/**
 * Lấy danh sách các danh mục và nguyên liệu có trong database
 */
async function getFoodOptions() {
    const [categories, ingredients] = await Promise.all([
        prisma.categories.findMany({
            orderBy: { id_category: 'asc' }
        }),
        prisma.ingredients.findMany({
            orderBy: { name: 'asc' }
        })
    ]);

    return {
        categories: categories.map((c) => ({
            id: c.id_category,
            name: c.name,
            slug: c.slug
        })),
        ingredients: ingredients.map((i) => ({
            id: i.id_ingredient,
            name: i.name,
            unit: i.unit
        }))
    };
}

module.exports = {
    getFoods,
    getFoodById,
    getFoodOptions
};
