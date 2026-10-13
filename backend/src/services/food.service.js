const prisma = require('../lib/prisma');
const { resolveAssetUrl } = require('../utils/assetUrl');

const FALLBACK_IMAGE = '/images/foods/thit-kho-trung.jpg';

function resolveImage(slug, image) {
    if (image) {
        return resolveAssetUrl(image);
    }
    return resolveAssetUrl(FALLBACK_IMAGE);
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

function formatFoodSummary(food, userId = null) {
    const rawIngredients = (food.food_ingredients || [])
        .map((fi) => fi.ingredients?.name)
        .filter(Boolean);

    const categoryName = food.categories?.name || 'Món ngon';
    const categorySlug = food.categories?.slug || 'viet';
    const cookingTime = food.cooking_time || 30;
    const isFavorite = Boolean(userId && food.favorites && food.favorites.some((f) => f.id_user === userId));
    const totalLikes = (food.favorites && food.favorites.length) ? food.favorites.length : 0;

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
<<<<<<< HEAD
        likes: (food.favorites && food.favorites.length) ? (food.favorites.length * 120 + 250) : 850,
        is_favorite: Boolean(userId && food.favorites && food.favorites.some((f) => f.id_user === userId)),
=======
        likes: totalLikes,
        is_favorite: isFavorite,
        isFavorite: isFavorite,
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
        category: categoryName,
        category_slug: categorySlug,
        sub_category: (food.cooking_time && food.cooking_time <= 15) ? 'nhanh' : 'viet',
        difficulty: cookingTime > 40 ? 'Trung bình' : 'Dễ làm',
        ingredients: rawIngredients,
        tags: [categoryName, (food.cooking_time && food.cooking_time <= 15) ? 'Món nhanh' : 'Món Việt', 'Dễ làm'].filter(Boolean),
        author: {
            name: 'Hôm Nay Nấu Gì',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
        }
    };
}

function formatFoodDetail(food, relatedFoods = [], userId = null) {
    const categoryName = food.categories?.name || 'Món ngon';
    const categorySlug = food.categories?.slug || 'viet';
    const cookingTime = food.cooking_time || 30;
    const servings = food.servings || 4;
    const isFavorite = Boolean(userId && food.favorites && food.favorites.some((f) => f.id_user === userId));
    const totalLikes = (food.favorites && food.favorites.length) ? food.favorites.length : 0;

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
<<<<<<< HEAD
        likes: (food.favorites && food.favorites.length) ? (food.favorites.length * 150 + 450) : '2.5k',
        is_favorite: Boolean(userId && food.favorites && food.favorites.some((f) => f.id_user === userId)),
=======
        likes: totalLikes,
        is_favorite: isFavorite,
        isFavorite: isFavorite,
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
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
        relatedFoods: relatedFoods.map((f) => formatFoodSummary(f, userId))
    };
}

/**
 * Lấy danh sách món ăn kèm chức năng tìm kiếm và lọc theo nguyên liệu/danh mục/thời gian
 */
async function getFoods(query = {}, userId = null) {
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
        const catList = normalizeList(category);
        if (catList.length === 1) {
            const catNum = Number(catList[0]);
            if (!Number.isNaN(catNum)) {
                where.id_category = catNum;
            } else {
                where.categories = {
                    OR: [
                        { slug: catList[0] },
                        { name: { contains: catList[0] } }
                    ]
                };
            }
        } else if (catList.length > 1) {
            where.categories = {
                OR: catList.map((c) => {
                    const catNum = Number(c);
                    if (!Number.isNaN(catNum)) {
                        return { id_category: catNum };
                    }
                    return {
                        OR: [
                            { slug: c },
                            { name: { contains: c } }
                        ]
                    };
                })
            };
        }
    }

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

    if (sub_category === 'nhanh' || cook_time === 'under_15') {
        where.cooking_time = { not: null, gt: 0, lte: 15 };
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

<<<<<<< HEAD
    let formattedFoods = rawFoods.map((f) => formatFoodSummary(f, userId));

    // Xử lý sub_category nếu có
    if (sub_category && sub_category !== 'all') {
        formattedFoods = formattedFoods.filter((f) => f.sub_category === sub_category);
    }
=======
    let formattedFoods = rawFoods.map((food) => formatFoodSummary(food, userId));
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12

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
async function getFoodById(idOrSlug, userId = null) {
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

    return formatFoodDetail(food, relatedFoods, userId);
<<<<<<< HEAD
=======
}

/**
 * Chức năng lưu hoặc bỏ lưu món ăn yêu thích của người dùng (Toggle Favorite)
 */
async function toggleFavorite(idOrSlug, userId) {
    if (!userId) {
        const error = new Error('Vui lòng đăng nhập để lưu món ăn yêu thích.');
        error.status = 401;
        throw error;
    }

    const isNum = !Number.isNaN(Number(idOrSlug));
    const food = await prisma.foods.findFirst({
        where: {
            status: 'active',
            ...(isNum ? { id_food: Number(idOrSlug) } : { slug: String(idOrSlug) })
        }
    });

    if (!food) {
        const error = new Error('Không tìm thấy thông tin món ăn yêu cầu.');
        error.status = 404;
        throw error;
    }

    const foodId = food.id_food;

    const existing = await prisma.favorites.findUnique({
        where: {
            id_user_id_food: {
                id_user: userId,
                id_food: foodId
            }
        }
    });

    let isFavorite = false;
    let message = '';

    if (existing) {
        await prisma.favorites.delete({
            where: {
                id_favorite: existing.id_favorite
            }
        });
        isFavorite = false;
        message = `Đã bỏ lưu món "${food.name}" khỏi danh sách yêu thích.`;
    } else {
        await prisma.favorites.create({
            data: {
                id_user: userId,
                id_food: foodId
            }
        });
        isFavorite = true;
        message = `Đã lưu món "${food.name}" vào danh sách yêu thích!`;
    }

    const [totalLikes, userTotalFavorites] = await Promise.all([
        prisma.favorites.count({
            where: { id_food: foodId }
        }),
        prisma.favorites.count({
            where: { id_user: userId }
        })
    ]);

    return {
        success: true,
        is_favorite: isFavorite,
        isFavorite: isFavorite,
        message,
        id_food: foodId,
        likes: totalLikes,
        userTotalFavorites
    };
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
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
            id_category: c.id_category,
            name: c.name,
            slug: c.slug
        })),
        ingredients: ingredients.map((i) => ({
            id: i.id_ingredient,
            id_ingredient: i.id_ingredient,
            name: i.name,
            unit: i.unit
        }))
    };
}

async function getQuickSuggestions() {
    const [under15Count, mediumCount, longCount, categories] = await Promise.all([
        prisma.foods.count({ where: { status: 'active', cooking_time: { lte: 15 } } }),
        prisma.foods.count({ where: { status: 'active', cooking_time: { gt: 15, lte: 30 } } }),
        prisma.foods.count({ where: { status: 'active', cooking_time: { gt: 30 } } }),
        prisma.categories.findMany({
            where: {
                foods: {
                    some: { status: 'active' }
                }
            },
            include: {
                _count: {
                    select: {
                        foods: { where: { status: 'active' } }
                    }
                }
            },
            orderBy: { id_category: 'asc' }
        })
    ]);

    const categoryIcons = {
        'mon-canh': 'fa-spoon text-blue-500',
        'mon-kho': 'fa-fire-flame-simple text-amber-600',
        'mon-xao': 'fa-fire-burner text-amber-500',
        'mon-chien': 'fa-fire text-red-500',
        'mon-rau': 'fa-leaf text-emerald-500',
        'mon-luoc': 'fa-water text-cyan-500',
        'mon-man': 'fa-bowl-food text-orange-500'
    };

    const suggestions = [];

    if (under15Count > 0) {
        suggestions.push({
            id: 'under_15',
            label: 'Dưới 15 phút',
            type: 'cook_time',
            param: 'cook_time',
            value: 'under_15',
            count: under15Count,
            icon: 'fa-bolt text-amber-500',
            emoji: '⚡',
            url: '#/danh-sach?cook_time=under_15'
        });
    }

    if (mediumCount > 0) {
        suggestions.push({
            id: '15_to_30',
            label: '15 – 30 phút',
            type: 'cook_time',
            param: 'cook_time',
            value: '15_to_30',
            count: mediumCount,
            icon: 'fa-stopwatch text-emerald-600',
            emoji: '⏱️',
            url: '#/danh-sach?cook_time=15_to_30'
        });
    }

    if (longCount > 0) {
        suggestions.push({
            id: 'above_30',
            label: 'Trên 30 phút',
            type: 'cook_time',
            param: 'cook_time',
            value: 'above_30',
            count: longCount,
            icon: 'fa-hourglass text-amber-600',
            emoji: '🍲',
            url: '#/danh-sach?cook_time=above_30'
        });
    }

    categories.forEach((cat) => {
        const icon = categoryIcons[cat.slug] || 'fa-bowl-food text-emerald-500';
        suggestions.push({
            id: cat.slug,
            label: cat.name,
            category_name: cat.name,
            type: 'category',
            param: 'category',
            value: cat.slug,
            count: cat._count.foods,
            icon: icon,
            url: `#/danh-sach?category=${cat.slug}`
        });
    });

    return suggestions;
}

module.exports = {
    getFoods,
    getFoodById,
    getFoodOptions,
    getQuickSuggestions,
    toggleFavorite
};
