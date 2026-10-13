const prisma = require('../lib/prisma');
const { resolveAssetUrl } = require('../utils/assetUrl');
const { hashPassword } = require('../utils/password');

const ALLOWED_ROLES = ['user', 'admin'];
const ALLOWED_STATUSES = ['active', 'blocked'];
const ALLOWED_FOOD_STATUSES = ['active', 'inactive'];

const USER_INCLUDE = {
    _count: {
        select: {
            posts: true,
            comments: true,
            favorites: true,
            shopping_lists: true
        }
    }
};

const FOOD_INCLUDE = {
    categories: true,
    food_ingredients: {
        include: {
            ingredients: true
        },
        orderBy: {
            id_food_ingredient: 'asc'
        }
    },
    recipe_steps: {
        orderBy: {
            step_number: 'asc'
        }
    },
    _count: {
        select: {
            favorites: true,
            posts: true,
            food_ingredients: true,
            recipe_steps: true
        }
    }
};

function parsePositiveInt(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function clampLimit(value, defaultValue = 10, maxValue = 100) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) return defaultValue;

    return Math.min(Math.max(parsed, 1), maxValue);
}

function normalizeEmail(value) {
    return String(value || '').trim().toLowerCase();
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatUser(user) {
    const counts = user._count || {};

    return {
        id: user.id_user,
        id_user: user.id_user,
        name: user.name,
        email: user.email,
        avatar: resolveAssetUrl(user.avatar),
        role: user.role,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at,
        stats: {
            posts: counts.posts || 0,
            comments: counts.comments || 0,
            favorites: counts.favorites || 0,
            shoppingLists: counts.shopping_lists || 0
        }
    };
}

function buildUserWhere(query = {}) {
    const where = {};
    const search = String(query.search || '').trim();

    if (search) {
        where.OR = [
            { name: { contains: search } },
            { email: { contains: search } }
        ];
    }

    if (ALLOWED_ROLES.includes(query.role)) {
        where.role = query.role;
    }

    if (ALLOWED_STATUSES.includes(query.status)) {
        where.status = query.status;
    }

    return where;
}

function getOrderBy(sort) {
    if (sort === 'oldest') return { created_at: 'asc' };
    if (sort === 'name') return { name: 'asc' };

    return { created_at: 'desc' };
}

async function getUserStats() {
    const [total, active, blocked, admins] = await Promise.all([
        prisma.users.count(),
        prisma.users.count({ where: { status: 'active' } }),
        prisma.users.count({ where: { status: 'blocked' } }),
        prisma.users.count({ where: { role: 'admin' } })
    ]);

    return {
        total,
        active,
        blocked,
        admins
    };
}

async function getUsers(req, res) {
    try {
        const page = Math.max(1, Number.parseInt(req.query?.page, 10) || 1);
        const limit = clampLimit(req.query?.limit);
        const skip = (page - 1) * limit;
        const where = buildUserWhere(req.query);

        const [total, users, stats] = await Promise.all([
            prisma.users.count({ where }),
            prisma.users.findMany({
                where,
                include: USER_INCLUDE,
                orderBy: getOrderBy(req.query?.sort),
                skip,
                take: limit
            }),
            getUserStats()
        ]);

        return res.json({
            success: true,
            data: users.map(formatUser),
            stats,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.max(1, Math.ceil(total / limit)),
                hasMore: skip + users.length < total
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể tải danh sách người dùng lúc này.',
            data: []
        });
    }
}

async function getUserById(req, res) {
    try {
        const userId = parsePositiveInt(req.params.id);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'ID người dùng không hợp lệ.'
            });
        }

        const user = await prisma.users.findUnique({
            where: { id_user: userId },
            include: {
                ...USER_INCLUDE,
                posts: {
                    select: {
                        id_post: true,
                        title: true,
                        status: true,
                        created_at: true,
                        _count: {
                            select: {
                                comments: true,
                                post_likes: true
                            }
                        }
                    },
                    orderBy: { created_at: 'desc' },
                    take: 5
                },
                comments: {
                    select: {
                        id_comment: true,
                        id_post: true,
                        content: true,
                        status: true,
                        created_at: true,
                        posts: {
                            select: {
                                title: true
                            }
                        }
                    },
                    orderBy: { created_at: 'desc' },
                    take: 5
                }
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng.'
            });
        }

        return res.json({
            success: true,
            data: {
                ...formatUser(user),
                recentPosts: user.posts.map((post) => ({
                    id: post.id_post,
                    title: post.title,
                    status: post.status,
                    created_at: post.created_at,
                    commentsCount: post._count?.comments || 0,
                    likesCount: post._count?.post_likes || 0
                })),
                recentComments: user.comments.map((comment) => ({
                    id: comment.id_comment,
                    id_post: comment.id_post,
                    postTitle: comment.posts?.title || '',
                    content: comment.content,
                    status: comment.status,
                    created_at: comment.created_at
                }))
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể tải chi tiết người dùng lúc này.'
        });
    }
}

async function createUser(req, res) {
    try {
        const body = req.body || {};
        const name = String(body.name || '').trim();
        const email = normalizeEmail(body.email);
        const password = String(body.password || '');
        const role = ALLOWED_ROLES.includes(body.role) ? body.role : 'user';
        const status = ALLOWED_STATUSES.includes(body.status) ? body.status : 'active';
        const avatar = String(body.avatar || '').trim() || '/images/users/admin.jpg';

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập đầy đủ tên, email và mật khẩu.'
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email không hợp lệ.'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Mật khẩu phải có ít nhất 6 ký tự.'
            });
        }

        const existing = await prisma.users.findUnique({
            where: { email }
        });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Email này đã được sử dụng.'
            });
        }

        const user = await prisma.users.create({
            data: {
                name,
                email,
                password: hashPassword(password),
                avatar,
                role,
                status
            },
            include: USER_INCLUDE
        });

        return res.status(201).json({
            success: true,
            message: 'Thêm người dùng thành công.',
            data: formatUser(user)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể thêm người dùng lúc này.'
        });
    }
}

async function updateUserStatus(req, res) {
    try {
        const userId = parsePositiveInt(req.params.id);
        const status = req.body?.status;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'ID người dùng không hợp lệ.'
            });
        }

        if (!ALLOWED_STATUSES.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Trạng thái không hợp lệ.'
            });
        }

        const existing = await prisma.users.findUnique({
            where: { id_user: userId }
        });

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng.'
            });
        }

        if (userId === req.user.id_user && status !== existing.status) {
            return res.status(400).json({
                success: false,
                message: 'Bạn không thể tự khóa tài khoản của chính mình.'
            });
        }

        const user = await prisma.users.update({
            where: { id_user: userId },
            data: {
                status,
                updated_at: new Date()
            },
            include: USER_INCLUDE
        });

        return res.json({
            success: true,
            message: 'Cập nhật trạng thái người dùng thành công.',
            data: formatUser(user)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể cập nhật trạng thái người dùng lúc này.'
        });
    }
}

function createSlug(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function formatDecimal(value) {
    if (value === null || value === undefined) return '';
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return String(value);

    return Number.isInteger(numberValue)
        ? String(numberValue)
        : String(numberValue).replace(/\.?0+$/, '');
}

function formatAdminFood(food) {
    const counts = food._count || {};

    return {
        id: food.id_food,
        id_food: food.id_food,
        id_category: food.id_category,
        name: food.name,
        slug: food.slug,
        description: food.description || '',
        image: resolveAssetUrl(food.image || '/images/foods/thit-kho-trung.jpg'),
        image_path: food.image || '',
        cooking_time: food.cooking_time,
        servings: food.servings,
        status: food.status,
        created_at: food.created_at,
        updated_at: food.updated_at,
        category: food.categories ? {
            id: food.categories.id_category,
            name: food.categories.name,
            slug: food.categories.slug
        } : null,
        ingredients: (food.food_ingredients || []).map((item) => ({
            id_food_ingredient: item.id_food_ingredient,
            id_ingredient: item.id_ingredient,
            name: item.ingredients?.name || '',
            unit: item.ingredients?.unit || '',
            quantity: formatDecimal(item.quantity),
            note: item.note || ''
        })),
        steps: (food.recipe_steps || []).map((step) => ({
            id_recipe_step: step.id_recipe_step,
            step_number: step.step_number,
            instruction: step.instruction
        })),
        stats: {
            favorites: counts.favorites || 0,
            posts: counts.posts || 0,
            ingredients: counts.food_ingredients || 0,
            steps: counts.recipe_steps || 0
        }
    };
}

function buildFoodWhere(query = {}) {
    const where = {};
    const search = String(query.search || '').trim();

    if (search) {
        where.OR = [
            { name: { contains: search } },
            { slug: { contains: createSlug(search) || search } },
            { description: { contains: search } },
            {
                categories: {
                    name: { contains: search }
                }
            },
            {
                food_ingredients: {
                    some: {
                        ingredients: {
                            name: { contains: search }
                        }
                    }
                }
            }
        ];
    }

    if (query.category) {
        const categoryId = Number(query.category);
        if (!Number.isNaN(categoryId)) {
            where.id_category = categoryId;
        }
    }

    if (ALLOWED_FOOD_STATUSES.includes(query.status)) {
        where.status = query.status;
    }

    return where;
}

function getFoodOrderBy(sort) {
    if (sort === 'oldest') return { created_at: 'asc' };
    if (sort === 'name') return { name: 'asc' };
    if (sort === 'time_asc') return { cooking_time: 'asc' };
    if (sort === 'time_desc') return { cooking_time: 'desc' };

    return { created_at: 'desc' };
}

function normalizeFoodIngredients(value) {
    const rawItems = Array.isArray(value)
        ? value
        : String(value || '')
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);

    return rawItems
        .map((item) => {
            if (typeof item === 'object' && item !== null) {
                const id = parsePositiveInt(item.id_ingredient || item.id);
                const name = String(item.name || '').trim();
                const quantity = Number(item.quantity || 1);

                return {
                    id_ingredient: id,
                    name,
                    unit: String(item.unit || 'phần').trim() || 'phần',
                    quantity: quantity > 0 ? String(quantity) : '1',
                    note: String(item.note || '').trim() || null
                };
            }

            const [nameOrId, quantityValue, noteValue, unitValue] = String(item)
                .split('|')
                .map((part) => part.trim());
            const id = parsePositiveInt(nameOrId);
            const quantity = Number(quantityValue || 1);

            return {
                id_ingredient: id,
                name: id ? '' : nameOrId,
                unit: unitValue || 'phần',
                quantity: quantity > 0 ? String(quantity) : '1',
                note: noteValue || null
            };
        })
        .filter((item) => item.id_ingredient || item.name);
}

function normalizeRecipeSteps(value) {
    const rawSteps = Array.isArray(value)
        ? value
        : String(value || '')
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);

    return rawSteps
        .map((item) => {
            if (typeof item === 'object' && item !== null) {
                return String(item.instruction || '').trim();
            }

            return String(item).trim();
        })
        .filter(Boolean)
        .map((instruction, index) => ({
            step_number: index + 1,
            instruction
        }));
}

async function getUniqueFoodSlug(rawValue, currentFoodId = null) {
    const baseSlug = createSlug(rawValue) || `mon-an-${Date.now()}`;
    let slug = baseSlug;
    let suffix = 2;

    while (await prisma.foods.findFirst({
        where: {
            slug,
            ...(currentFoodId ? { NOT: { id_food: currentFoodId } } : {})
        }
    })) {
        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
    }

    return slug;
}

async function getFoodStats() {
    const [total, active, inactive, categories] = await Promise.all([
        prisma.foods.count(),
        prisma.foods.count({ where: { status: 'active' } }),
        prisma.foods.count({ where: { status: 'inactive' } }),
        prisma.categories.count()
    ]);

    return {
        total,
        active,
        inactive,
        categories
    };
}

async function getDashboard(req, res) {
    try {
        const [
            foodStats,
            userStats,
            postsTotal,
            postsActive,
            postsHidden,
            postsPending,
            reportsTotal,
            reportsPending,
            latestFoods
        ] = await Promise.all([
            getFoodStats(),
            getUserStats(),
            prisma.posts.count(),
            prisma.posts.count({ where: { status: 'active' } }),
            prisma.posts.count({ where: { status: 'hidden' } }),
            prisma.posts.count({ where: { status: 'pending' } }),
            prisma.reports.count(),
            prisma.reports.count({ where: { status: 'pending' } }),
            prisma.foods.findMany({
                include: {
                    categories: true
                },
                orderBy: {
                    created_at: 'desc'
                },
                take: 6
            })
        ]);

        return res.json({
            success: true,
            data: {
                stats: {
                    foods: foodStats,
                    users: userStats,
                    posts: {
                        total: postsTotal,
                        active: postsActive,
                        hidden: postsHidden,
                        pending: postsPending
                    },
                    reports: {
                        total: reportsTotal,
                        pending: reportsPending
                    }
                },
                latestFoods: latestFoods.map((food) => ({
                    id: food.id_food,
                    id_food: food.id_food,
                    name: food.name,
                    image: resolveAssetUrl(food.image || '/images/foods/thit-kho-trung.jpg'),
                    status: food.status,
                    created_at: food.created_at,
                    category: food.categories ? {
                        id: food.categories.id_category,
                        name: food.categories.name,
                        slug: food.categories.slug
                    } : null
                }))
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể tải dữ liệu dashboard lúc này.',
            data: null
        });
    }
}

async function resolveFoodIngredientRows(tx, foodId, inputValue) {
    const normalizedItems = normalizeFoodIngredients(inputValue);
    const rowsByIngredient = new Map();

    for (const item of normalizedItems) {
        let ingredient = null;

        if (item.id_ingredient) {
            ingredient = await tx.ingredients.findUnique({
                where: { id_ingredient: item.id_ingredient }
            });
        } else if (item.name) {
            ingredient = await tx.ingredients.findUnique({
                where: { name: item.name }
            });

            if (!ingredient) {
                ingredient = await tx.ingredients.create({
                    data: {
                        name: item.name,
                        unit: item.unit || 'phần'
                    }
                });
            }
        }

        if (!ingredient) continue;

        rowsByIngredient.set(ingredient.id_ingredient, {
            id_food: foodId,
            id_ingredient: ingredient.id_ingredient,
            quantity: item.quantity,
            note: item.note
        });
    }

    return Array.from(rowsByIngredient.values());
}

async function getAdminFoodDetailRecord(idOrSlug) {
    const id = parsePositiveInt(idOrSlug);

    return prisma.foods.findFirst({
        where: id ? { id_food: id } : { slug: String(idOrSlug || '') },
        include: FOOD_INCLUDE
    });
}

async function getFoodOptions(req, res) {
    try {
        const [categories, ingredients] = await Promise.all([
            prisma.categories.findMany({
                orderBy: { name: 'asc' }
            }),
            prisma.ingredients.findMany({
                orderBy: { name: 'asc' }
            })
        ]);

        return res.json({
            success: true,
            data: {
                categories: categories.map((category) => ({
                    id: category.id_category,
                    id_category: category.id_category,
                    name: category.name,
                    slug: category.slug
                })),
                ingredients: ingredients.map((ingredient) => ({
                    id: ingredient.id_ingredient,
                    id_ingredient: ingredient.id_ingredient,
                    name: ingredient.name,
                    unit: ingredient.unit
                }))
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể tải danh mục và nguyên liệu lúc này.',
            data: {
                categories: [],
                ingredients: []
            }
        });
    }
}

async function getFoods(req, res) {
    try {
        const page = Math.max(1, Number.parseInt(req.query?.page, 10) || 1);
        const limit = clampLimit(req.query?.limit, 10, 100);
        const skip = (page - 1) * limit;
        const where = buildFoodWhere(req.query);

        const [total, foods, stats] = await Promise.all([
            prisma.foods.count({ where }),
            prisma.foods.findMany({
                where,
                include: FOOD_INCLUDE,
                orderBy: getFoodOrderBy(req.query?.sort),
                skip,
                take: limit
            }),
            getFoodStats()
        ]);

        return res.json({
            success: true,
            data: foods.map(formatAdminFood),
            stats,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.max(1, Math.ceil(total / limit)),
                hasMore: skip + foods.length < total
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể tải danh sách món ăn lúc này.',
            data: []
        });
    }
}

async function getFoodById(req, res) {
    try {
        const food = await getAdminFoodDetailRecord(req.params.id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy món ăn.'
            });
        }

        return res.json({
            success: true,
            data: formatAdminFood(food)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể tải chi tiết món ăn lúc này.'
        });
    }
}

async function validateFoodPayload(body, isCreate = false) {
    const name = String(body.name || '').trim();
    const categoryId = parsePositiveInt(body.id_category || body.category_id);
    const cookingTime = body.cooking_time === '' || body.cooking_time === undefined || body.cooking_time === null
        ? null
        : Number.parseInt(body.cooking_time, 10);
    const servings = body.servings === '' || body.servings === undefined || body.servings === null
        ? null
        : Number.parseInt(body.servings, 10);
    const status = body.status || 'active';

    if (isCreate && !name) {
        return { error: 'Tên món ăn không được để trống.' };
    }

    if (isCreate && !categoryId) {
        return { error: 'Vui lòng chọn danh mục cho món ăn.' };
    }

    if (categoryId) {
        const category = await prisma.categories.findUnique({
            where: { id_category: categoryId }
        });

        if (!category) {
            return { error: 'Danh mục món ăn không tồn tại.' };
        }
    }

    if (cookingTime !== null && (!Number.isInteger(cookingTime) || cookingTime < 1)) {
        return { error: 'Thời gian nấu phải là số lớn hơn 0.' };
    }

    if (servings !== null && (!Number.isInteger(servings) || servings < 1)) {
        return { error: 'Khẩu phần phải là số lớn hơn 0.' };
    }

    if (!ALLOWED_FOOD_STATUSES.includes(status)) {
        return { error: 'Trạng thái món ăn không hợp lệ.' };
    }

    return {
        value: {
            name,
            categoryId,
            cookingTime,
            servings,
            status
        }
    };
}

async function createFood(req, res) {
    try {
        const body = req.body || {};
        const validation = await validateFoodPayload(body, true);

        if (validation.error) {
            return res.status(400).json({
                success: false,
                message: validation.error
            });
        }

        const slug = await getUniqueFoodSlug(body.slug || validation.value.name);

        const foodId = await prisma.$transaction(async (tx) => {
            const food = await tx.foods.create({
                data: {
                    id_category: validation.value.categoryId,
                    name: validation.value.name,
                    slug,
                    description: String(body.description || '').trim() || null,
                    image: String(body.image || '').trim() || null,
                    cooking_time: validation.value.cookingTime,
                    servings: validation.value.servings,
                    status: validation.value.status
                }
            });

            const ingredientRows = await resolveFoodIngredientRows(tx, food.id_food, body.ingredients);
            if (ingredientRows.length) {
                await tx.food_ingredients.createMany({
                    data: ingredientRows
                });
            }

            const steps = normalizeRecipeSteps(body.steps);
            if (steps.length) {
                await tx.recipe_steps.createMany({
                    data: steps.map((step) => ({
                        id_food: food.id_food,
                        step_number: step.step_number,
                        instruction: step.instruction
                    }))
                });
            }

            return food.id_food;
        });

        const food = await getAdminFoodDetailRecord(foodId);

        return res.status(201).json({
            success: true,
            message: 'Thêm món ăn thành công.',
            data: formatAdminFood(food)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể thêm món ăn lúc này.'
        });
    }
}

async function updateFood(req, res) {
    try {
        const foodId = parsePositiveInt(req.params.id);
        if (!foodId) {
            return res.status(400).json({
                success: false,
                message: 'ID món ăn không hợp lệ.'
            });
        }

        const existing = await prisma.foods.findUnique({
            where: { id_food: foodId }
        });

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy món ăn.'
            });
        }

        const body = req.body || {};
        const validation = await validateFoodPayload({
            ...existing,
            ...body,
            id_category: body.id_category ?? body.category_id ?? existing.id_category
        });

        if (validation.error) {
            return res.status(400).json({
                success: false,
                message: validation.error
            });
        }

        const data = {};

        if (body.name !== undefined) data.name = validation.value.name;
        if (body.id_category !== undefined || body.category_id !== undefined) data.id_category = validation.value.categoryId;
        if (body.description !== undefined) data.description = String(body.description || '').trim() || null;
        if (body.image !== undefined) data.image = String(body.image || '').trim() || null;
        if (body.cooking_time !== undefined) data.cooking_time = validation.value.cookingTime;
        if (body.servings !== undefined) data.servings = validation.value.servings;
        if (body.status !== undefined) data.status = validation.value.status;

        if (body.slug !== undefined || body.name !== undefined) {
            data.slug = await getUniqueFoodSlug(body.slug || validation.value.name, foodId);
        }

        data.updated_at = new Date();

        await prisma.$transaction(async (tx) => {
            await tx.foods.update({
                where: { id_food: foodId },
                data
            });

            if (body.ingredients !== undefined) {
                await tx.food_ingredients.deleteMany({
                    where: { id_food: foodId }
                });

                const ingredientRows = await resolveFoodIngredientRows(tx, foodId, body.ingredients);
                if (ingredientRows.length) {
                    await tx.food_ingredients.createMany({
                        data: ingredientRows
                    });
                }
            }

            if (body.steps !== undefined) {
                await tx.recipe_steps.deleteMany({
                    where: { id_food: foodId }
                });

                const steps = normalizeRecipeSteps(body.steps);
                if (steps.length) {
                    await tx.recipe_steps.createMany({
                        data: steps.map((step) => ({
                            id_food: foodId,
                            step_number: step.step_number,
                            instruction: step.instruction
                        }))
                    });
                }
            }
        });

        const food = await getAdminFoodDetailRecord(foodId);

        return res.json({
            success: true,
            message: 'Cập nhật món ăn thành công.',
            data: formatAdminFood(food)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể cập nhật món ăn lúc này.'
        });
    }
}

async function updateFoodStatus(req, res) {
    return updateFood({
        params: req.params,
        body: {
            status: req.body?.status
        }
    }, res);
}

// ==========================================
<<<<<<< HEAD
// 3. QUẢN LÝ DANH MỤC (CATEGORIES)
// ==========================================

async function getCategories(req, res) {
    try {
        const search = String(req.query?.search || '').trim();
        const status = req.query?.status;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { slug: { contains: search } }
            ];
        }
        if (status === 'active' || status === 'hidden') {
            where.status = status;
        }

        const categories = await prisma.categories.findMany({
            where,
            include: {
                _count: {
                    select: { foods: true }
                }
            },
            orderBy: { id_category: 'asc' }
        });

        const formatted = categories.map((cat) => ({
            id: cat.id_category,
            id_category: cat.id_category,
            name: cat.name,
            slug: cat.slug,
            status: cat.status || 'active',
            foodsCount: cat._count?.foods || 0,
            created_at: cat.created_at,
            updated_at: cat.updated_at
        }));

        return res.json({
            success: true,
            total: formatted.length,
            data: formatted
        });
    } catch (error) {
        console.error('Lỗi getCategories:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể tải danh sách danh mục lúc này.',
            data: []
        });
    }
}

async function createCategory(req, res) {
    try {
        const name = String(req.body?.name || '').trim();
        let slug = String(req.body?.slug || '').trim();

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Tên danh mục không được để trống.'
            });
        }

        if (!slug) {
            slug = createSlug(name);
        } else {
            slug = createSlug(slug);
        }

        const existing = await prisma.categories.findFirst({
            where: {
                OR: [{ name }, { slug }]
            }
        });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Tên hoặc đường dẫn (slug) danh mục đã tồn tại.'
            });
        }

        const category = await prisma.categories.create({
            data: { name, slug }
        });

        return res.json({
            success: true,
            message: 'Tạo danh mục thành công.',
            data: category
        });
    } catch (error) {
        console.error('Lỗi createCategory:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể tạo danh mục lúc này.'
        });
    }
}

async function updateCategory(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID danh mục không hợp lệ.'
            });
        }

        const category = await prisma.categories.findUnique({
            where: { id_category: id }
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy danh mục.'
            });
        }

        const name = req.body?.name ? String(req.body.name).trim() : category.name;
        let slug = req.body?.slug ? createSlug(req.body.slug) : (req.body?.name ? createSlug(req.body.name) : category.slug);

        const duplicate = await prisma.categories.findFirst({
            where: {
                id_category: { not: id },
                OR: [{ name }, { slug }]
            }
        });

        if (duplicate) {
            return res.status(409).json({
                success: false,
                message: 'Tên hoặc slug danh mục đã bị trùng với danh mục khác.'
            });
        }

        const updated = await prisma.categories.update({
            where: { id_category: id },
            data: {
                name,
                slug,
                updated_at: new Date()
            }
        });

        return res.json({
            success: true,
            message: 'Cập nhật danh mục thành công.',
            data: updated
        });
    } catch (error) {
        console.error('Lỗi updateCategory:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể cập nhật danh mục lúc này.'
        });
    }
}

async function updateCategoryStatus(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        const status = req.body?.status;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID danh mục không hợp lệ.'
            });
        }

        if (status !== 'active' && status !== 'hidden') {
            return res.status(400).json({
                success: false,
                message: 'Trạng thái danh mục không hợp lệ (phải là active hoặc hidden).'
            });
        }

        const category = await prisma.categories.findUnique({
            where: { id_category: id }
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy danh mục.'
            });
        }

        const updated = await prisma.categories.update({
            where: { id_category: id },
            data: {
                status,
                updated_at: new Date()
            }
        });

        return res.json({
            success: true,
            message: status === 'active' ? 'Đã cho phép hiển thị danh mục.' : 'Đã ẩn danh mục.',
            data: updated
        });
    } catch (error) {
        console.error('Lỗi updateCategoryStatus:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể cập nhật trạng thái danh mục lúc này.'
        });
    }
}

async function deleteCategory(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID danh mục không hợp lệ.'
            });
        }

        const foodsCount = await prisma.foods.count({
            where: { id_category: id }
        });

        if (foodsCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Không thể xóa vì danh mục đang có ${foodsCount} món ăn liên kết. Vui lòng chuyển các món sang danh mục khác trước khi xóa.`
            });
        }

        await prisma.categories.delete({
            where: { id_category: id }
        });

        return res.json({
            success: true,
            message: 'Đã xóa danh mục thành công.'
        });
    } catch (error) {
        console.error('Lỗi deleteCategory:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể xóa danh mục lúc này.'
        });
    }
}

// ==========================================
// 4. QUẢN LÝ BÀI VIẾT & BÁO CÁO CỘNG ĐỒNG
// ==========================================

async function getAdminPosts(req, res) {
    try {
        const page = Math.max(1, Number.parseInt(req.query?.page, 10) || 1);
        const limit = clampLimit(req.query?.limit, 10, 100);
        const skip = (page - 1) * limit;
        const search = String(req.query?.search || '').trim();
        const status = req.query?.status;

        const where = {};
=======
// QUẢN LÝ BÀI VIẾT CỘNG ĐỒNG & KIỂM DUYỆT
// ==========================================

async function getPosts(req, res) {
    try {
        const page = Math.max(1, parsePositiveInt(req.query.page) || 1);
        const limit = clampLimit(req.query.limit, 10, 50);
        const skip = (page - 1) * limit;
        const search = String(req.query.search || '').trim();
        const status = String(req.query.status || '').trim().toLowerCase();

        const where = {};
        if (['active', 'hidden', 'pending'].includes(status)) {
            where.status = status;
        }

>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { content: { contains: search } },
                { users: { name: { contains: search } } }
            ];
        }
<<<<<<< HEAD
        if (status === 'active' || status === 'hidden') {
            where.status = status;
        }

        const [total, posts] = await Promise.all([
            prisma.posts.count({ where }),
            prisma.posts.findMany({
                where,
=======

        const [total, pendingTotal, activeTotal, hiddenTotal, posts] = await Promise.all([
            prisma.posts.count({ where }),
            prisma.posts.count({ where: { status: 'pending' } }),
            prisma.posts.count({ where: { status: 'active' } }),
            prisma.posts.count({ where: { status: 'hidden' } }),
            prisma.posts.findMany({
                where,
                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
                include: {
                    users: {
                        select: {
                            id_user: true,
                            name: true,
                            email: true,
                            avatar: true,
                            role: true,
                            status: true
                        }
                    },
                    foods: {
                        select: {
                            id_food: true,
                            name: true,
                            slug: true
                        }
                    },
                    _count: {
                        select: {
                            post_likes: true,
                            comments: true
                        }
                    }
                }
            })
        ]);

        // Lấy chi tiết báo cáo vi phạm cho từng bài viết để phục vụ tooltip hover nhanh
        const postIds = posts.map(p => p.id_post);
        const reportsMap = {};

        if (postIds.length > 0) {
            const rawReports = await prisma.reports.findMany({
                where: {
                    target_type: 'post',
                    target_id: { in: postIds }
                },
                include: {
                    users: {
                        select: {
                            id_user: true,
                            name: true,
                            email: true,
                            avatar: true
                        }
                    }
                },
                orderBy: { created_at: 'desc' }
            });

            rawReports.forEach(r => {
                if (!reportsMap[r.target_id]) reportsMap[r.target_id] = [];
                reportsMap[r.target_id].push({
                    id_report: r.id_report,
                    reason: r.reason,
                    description: r.description,
                    status: r.status,
                    created_at: r.created_at,
                    reporter: r.users ? {
                        id_user: r.users.id_user,
                        name: r.users.name || 'Người dùng ẩn danh',
                        email: r.users.email,
                        avatar: resolveAssetUrl(r.users.avatar || '/images/users/default.png')
                    } : null
                });
            });
        }

        const formattedPosts = posts.map(p => ({
            id_post: p.id_post,
            id_user: p.id_user,
            id_food: p.id_food,
            title: p.title,
            content: p.content,
            image: resolveAssetUrl(p.image),
            status: p.status,
            hidden_reason: p.hidden_reason || null,
            created_at: p.created_at,
            updated_at: p.updated_at,
            likes_count: p._count.post_likes,
            comments_count: p._count.comments,
            reports_count: reportsMap[p.id_post]?.length || 0,
            reports: reportsMap[p.id_post] || [],
            author: {
                id_user: p.users?.id_user,
                name: p.users?.name || 'Ẩn danh',
                email: p.users?.email || '',
                avatar: resolveAssetUrl(p.users?.avatar || '/images/users/default.png'),
                role: p.users?.role,
                status: p.users?.status
            },
            food: p.foods ? {
                id_food: p.foods.id_food,
                name: p.foods.name,
                slug: p.foods.slug
            } : null
        }));

        const allTotal = pendingTotal + activeTotal + hiddenTotal;

        return res.json({
            success: true,
            data: formattedPosts,
            pagination: {
                page,
                limit,
                total,
                allTotal,
                totalPages: Math.ceil(total / limit) || 1,
                pendingTotal,
                activeTotal,
                hiddenTotal
            }
        });
    } catch (error) {
        console.error('getPosts error:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể tải danh sách bài viết kiểm duyệt.'
        });
    }
}

async function getPostById(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID bài viết không hợp lệ.' });
        }

        const post = await prisma.posts.findUnique({
            where: { id_post: id },
            include: {
                users: true,
                foods: true,
                _count: {
                    select: {
                        post_likes: true,
                        comments: true
                    }
                }
            }
        });

        if (!post) {
            return res.status(404).json({ success: false, message: 'Bài viết không tồn tại.' });
        }

        const reports = await prisma.reports.findMany({
            where: {
                target_type: 'post',
                target_id: id
            },
            include: {
                users: {
                    select: {
                        id_user: true,
                        name: true,
                        email: true,
                        avatar: true
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        });

        return res.json({
            success: true,
            data: {
                id_post: post.id_post,
                id_user: post.id_user,
                title: post.title,
                content: post.content,
                image: resolveAssetUrl(post.image),
                status: post.status,
                hidden_reason: post.hidden_reason || null,
                created_at: post.created_at,
                likes_count: post._count.post_likes,
                comments_count: post._count.comments,
                reports_count: reports.length,
                reports,
                author: {
                    id_user: post.users?.id_user,
                    name: post.users?.name,
                    email: post.users?.email,
                    avatar: resolveAssetUrl(post.users?.avatar)
                },
                food: post.foods ? {
                    id_food: post.foods.id_food,
                    name: post.foods.name
                } : null
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi khi tải chi tiết bài viết.' });
    }
}

async function updatePostStatus(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        const { status, hidden_reason } = req.body || {};

        if (!id || !['active', 'hidden', 'pending'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu trạng thái không hợp lệ. Chấp nhận: active, hidden, pending.'
            });
        }

        const dataToUpdate = { status };
        if (status === 'hidden') {
            const trimmedReason = typeof hidden_reason === 'string' ? hidden_reason.trim() : '';
            dataToUpdate.hidden_reason = trimmedReason || 'Vi phạm tiêu chuẩn cộng đồng';
        } else if (status === 'active') {
            dataToUpdate.hidden_reason = null;
        }

        const updated = await prisma.posts.update({
            where: { id_post: id },
            data: dataToUpdate
        });

        // Nếu admin ẩn bài viết do vi phạm, tự động đánh dấu các report liên quan thành resolved
        if (status === 'hidden') {
            await prisma.reports.updateMany({
                where: {
                    target_type: 'post',
                    target_id: id,
                    status: 'pending'
                },
                data: { status: 'resolved' }
            });
        }

        const statusMsg = status === 'active' 
            ? 'Đã duyệt bài viết thành công (bài viết đã hiển thị trên cộng đồng)!' 
            : (status === 'hidden' ? `Đã ẩn bài viết. Lý do: "${dataToUpdate.hidden_reason}".` : 'Đã đưa bài viết về trạng thái chờ duyệt.');

        return res.json({
            success: true,
            message: statusMsg,
            data: {
                id_post: updated.id_post,
                status: updated.status,
                hidden_reason: updated.hidden_reason
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Không thể cập nhật trạng thái bài viết.' });
    }
}

async function deletePost(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID bài viết không hợp lệ.' });
        }

        // Xóa các báo cáo liên quan bài viết trước
        await prisma.reports.deleteMany({
            where: {
                target_type: 'post',
                target_id: id
            }
        });

        await prisma.posts.delete({
            where: { id_post: id }
        });

        return res.json({
            success: true,
            message: 'Đã xóa bài viết vi phạm thành công.'
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Không thể xóa bài viết lúc này.' });
    }
}

// ==========================================
// QUẢN LÝ BÁO CÁO VI PHẠM (REPORTS)
// ==========================================

async function getReports(req, res) {
    try {
        const page = Math.max(1, parsePositiveInt(req.query.page) || 1);
        const limit = clampLimit(req.query.limit, 10, 50);
        const skip = (page - 1) * limit;
        const search = String(req.query.search || '').trim();
        const status = String(req.query.status || '').trim().toLowerCase();
        const targetType = String(req.query.target_type || '').trim().toLowerCase();

        const where = {};

        if (['post', 'comment'].includes(targetType)) {
            where.target_type = targetType;
        }

        if (['pending', 'resolved', 'rejected'].includes(status)) {
            where.status = status;
        } else if (status === 'handled') {
            where.status = { in: ['resolved', 'rejected'] };
        }

        if (search) {
            where.OR = [
                { reason: { contains: search } },
                { description: { contains: search } },
                { users: { name: { contains: search } } }
            ];
        }

        const [total, pendingTotal, resolvedTotal, rejectedTotal, allTotal, reports] = await Promise.all([
            prisma.reports.count({ where }),
            prisma.reports.count({ where: { status: 'pending' } }),
            prisma.reports.count({ where: { status: 'resolved' } }),
            prisma.reports.count({ where: { status: 'rejected' } }),
            prisma.reports.count(),
            prisma.reports.findMany({
                where,
                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
                include: {
                    users: {
                        select: {
                            id_user: true,
                            name: true,
                            email: true,
                            avatar: true
                        }
                    }
                }
            })
        ]);

        // Lấy thông tin bài viết và bình luận bị báo cáo
        const postIds = [...new Set(reports.filter(r => r.target_type === 'post').map(r => r.target_id))];
        const commentIds = [...new Set(reports.filter(r => r.target_type === 'comment').map(r => r.target_id))];

        let postsMap = new Map();
        let commentsMap = new Map();

        if (postIds.length > 0) {
            const targetPosts = await prisma.posts.findMany({
                where: { id_post: { in: postIds } },
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
                include: {
                    users: {
                        select: {
                            id_user: true,
                            name: true,
                            email: true,
                            avatar: true
                        }
                    },
<<<<<<< HEAD
                    foods: {
                        select: {
                            id_food: true,
                            name: true
                        }
                    },
=======
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
                    _count: {
                        select: {
                            post_likes: true,
                            comments: true
                        }
                    }
<<<<<<< HEAD
                },
                orderBy: { id_post: 'desc' },
                skip,
                take: limit
            })
        ]);

        const formatted = posts.map((post) => ({
            id: post.id_post,
            id_post: post.id_post,
            title: post.title,
            content: post.content,
            image: resolveAssetUrl(post.image || '/images/posts/post-1.jpg'),
            status: post.status,
            created_at: post.created_at,
            updated_at: post.updated_at,
            author: {
                id: post.users?.id_user,
                name: post.users?.name || 'Ẩn danh',
                email: post.users?.email || '',
                avatar: resolveAssetUrl(post.users?.avatar || '/images/users/admin.jpg')
            },
            food: post.foods ? { id: post.foods.id_food, name: post.foods.name } : null,
            likesCount: post._count?.post_likes || 0,
            commentsCount: post._count?.comments || 0
        }));

        return res.json({
            success: true,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
            data: formatted
        });
    } catch (error) {
        console.error('Lỗi getAdminPosts:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể tải danh sách bài viết cộng đồng lúc này.',
            data: []
=======
                }
            });

            targetPosts.forEach(p => postsMap.set(p.id_post, p));
        }

        if (commentIds.length > 0) {
            const targetComments = await prisma.comments.findMany({
                where: { id_comment: { in: commentIds } },
                include: {
                    users: {
                        select: {
                            id_user: true,
                            name: true,
                            email: true,
                            avatar: true
                        }
                    },
                    posts: {
                        select: {
                            id_post: true,
                            title: true
                        }
                    }
                }
            });

            targetComments.forEach(c => commentsMap.set(c.id_comment, c));
        }

        const formattedReports = reports.map(r => {
            const targetPost = r.target_type === 'post' ? postsMap.get(r.target_id) : null;
            const targetComment = r.target_type === 'comment' ? commentsMap.get(r.target_id) : null;

            return {
                id_report: r.id_report,
                id_user: r.id_user,
                target_type: r.target_type,
                target_id: r.target_id,
                reason: r.reason,
                description: r.description,
                status: r.status,
                created_at: r.created_at,
                updated_at: r.updated_at,
                reporter: r.users ? {
                    id_user: r.users.id_user,
                    name: r.users.name || 'Người dùng ẩn danh',
                    email: r.users.email,
                    avatar: resolveAssetUrl(r.users.avatar || '/images/users/default.png')
                } : null,
                post: targetPost ? {
                    id_post: targetPost.id_post,
                    title: targetPost.title,
                    content: targetPost.content,
                    image: resolveAssetUrl(targetPost.image),
                    status: targetPost.status,
                    hidden_reason: targetPost.hidden_reason,
                    likes_count: targetPost._count?.post_likes || 0,
                    comments_count: targetPost._count?.comments || 0,
                    author: {
                        id_user: targetPost.users?.id_user,
                        name: targetPost.users?.name || 'Tác giả',
                        email: targetPost.users?.email,
                        avatar: resolveAssetUrl(targetPost.users?.avatar || '/images/users/default.png')
                    }
                } : null,
                comment: targetComment ? {
                    id_comment: targetComment.id_comment,
                    id_post: targetComment.id_post,
                    post_title: targetComment.posts?.title || `Bài viết #${targetComment.id_post}`,
                    content: targetComment.content,
                    status: targetComment.status,
                    created_at: targetComment.created_at,
                    author: {
                        id_user: targetComment.users?.id_user,
                        name: targetComment.users?.name || 'Tác giả bình luận',
                        email: targetComment.users?.email,
                        avatar: resolveAssetUrl(targetComment.users?.avatar || '/images/users/default.png')
                    }
                } : null
            };
        });

        return res.json({
            success: true,
            data: formattedReports,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit) || 1,
                pendingTotal,
                resolvedTotal,
                rejectedTotal,
                allTotal
            }
        });
    } catch (error) {
        console.error('getReports error:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể tải danh sách báo cáo vi phạm.'
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
        });
    }
}

<<<<<<< HEAD
async function updatePostStatus(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        const status = req.body?.status;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID bài viết không hợp lệ.'
            });
        }

        if (status !== 'active' && status !== 'hidden') {
            return res.status(400).json({
                success: false,
                message: 'Trạng thái bài viết không hợp lệ (phải là active hoặc hidden).'
            });
        }

        const post = await prisma.posts.findUnique({
            where: { id_post: id }
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài viết.'
            });
        }

        const updated = await prisma.posts.update({
            where: { id_post: id },
            data: {
                status,
                updated_at: new Date()
            }
        });

        return res.json({
            success: true,
            message: status === 'active' ? 'Đã cho phép hiển thị bài viết.' : 'Đã ẩn bài viết khỏi cộng đồng.',
            data: updated
        });
    } catch (error) {
        console.error('Lỗi updatePostStatus:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể cập nhật trạng thái bài viết lúc này.'
        });
    }
}

async function deleteAdminPost(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID bài viết không hợp lệ.'
            });
        }

        const post = await prisma.posts.findUnique({
            where: { id_post: id }
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài viết.'
            });
        }

        await prisma.posts.delete({
            where: { id_post: id }
        });

        return res.json({
            success: true,
            message: 'Đã xóa bài viết thành công.'
        });
    } catch (error) {
        console.error('Lỗi deleteAdminPost:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể xóa bài viết lúc này.'
        });
    }
}

async function getAdminReports(req, res) {
    try {
        const status = req.query?.status;
        const where = {};
        if (['pending', 'resolved', 'rejected'].includes(status)) {
            where.status = status;
        }

        const reports = await prisma.reports.findMany({
            where,
            include: {
                users: {
                    select: {
                        id_user: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        });

        const enriched = await Promise.all(reports.map(async (rep) => {
            let targetInfo = null;
            if (rep.target_type === 'post') {
                const targetPost = await prisma.posts.findUnique({
                    where: { id_post: rep.target_id },
                    select: { id_post: true, title: true, status: true }
                });
                targetInfo = targetPost;
            } else if (rep.target_type === 'comment') {
                const targetComment = await prisma.comments.findUnique({
                    where: { id_comment: rep.target_id },
                    select: { id_comment: true, content: true, status: true }
                });
                targetInfo = targetComment;
            }

            return {
                id: rep.id_report,
                id_report: rep.id_report,
                reporter: rep.users ? { id: rep.users.id_user, name: rep.users.name, email: rep.users.email } : null,
                target_type: rep.target_type,
                target_id: rep.target_id,
                target_info: targetInfo,
                reason: rep.reason,
                description: rep.description,
                status: rep.status,
                created_at: rep.created_at,
                updated_at: rep.updated_at
            };
        }));

        return res.json({
            success: true,
            total: enriched.length,
            data: enriched
        });
    } catch (error) {
        console.error('Lỗi getAdminReports:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể tải báo cáo lúc này.',
=======
async function updateReportStatus(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        const { status, action, reason } = req.body || {};

        if (!id || !['pending', 'resolved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Trạng thái xử lý không hợp lệ. Chấp nhận: pending, resolved, rejected.'
            });
        }

        const report = await prisma.reports.findUnique({
            where: { id_report: id }
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy báo cáo vi phạm.'
            });
        }

        // Tùy chọn ẩn hoặc khôi phục nội dung bị báo cáo
        if (action === 'hide') {
            if (report.target_type === 'post') {
                await prisma.posts.update({
                    where: { id_post: report.target_id },
                    data: {
                        status: 'hidden',
                        hidden_reason: reason || `Bị ẩn do vi phạm báo cáo #${id} (${report.reason})`
                    }
                });
            } else if (report.target_type === 'comment') {
                await prisma.comments.update({
                    where: { id_comment: report.target_id },
                    data: { status: 'hidden' }
                });
            }
        } else if (action === 'restore') {
            if (report.target_type === 'post') {
                await prisma.posts.update({
                    where: { id_post: report.target_id },
                    data: {
                        status: 'active',
                        hidden_reason: null
                    }
                });
            } else if (report.target_type === 'comment') {
                await prisma.comments.update({
                    where: { id_comment: report.target_id },
                    data: { status: 'active' }
                });
            }
        }

        const updated = await prisma.reports.update({
            where: { id_report: id },
            data: {
                status,
                updated_at: new Date()
            }
        });

        const statusLabel = status === 'resolved' ? 'Đã giải quyết' : (status === 'rejected' ? 'Bỏ qua vi phạm' : 'Đang chờ xử lý');

        return res.json({
            success: true,
            message: `Đã cập nhật trạng thái báo cáo thành "${statusLabel}".`,
            data: updated
        });
    } catch (error) {
        console.error('updateReportStatus error:', error);
        return res.status(500).json({ success: false, message: 'Không thể cập nhật báo cáo vi phạm.' });
    }
}
// ==========================================
// QUẢN LÝ DANH MỤC MÓN ĂN (CATEGORIES)
// ==========================================

async function getCategories(req, res) {
    try {
        const { search = '', status = 'all', sort = 'newest' } = req.query;
        const page = parsePositiveInt(req.query.page) || 1;
        const limit = req.query.limit === 'all' ? null : clampLimit(req.query.limit, 10, 100);

        const where = {};

        if (search.trim()) {
            const trimmed = search.trim();
            where.OR = [
                { name: { contains: trimmed } },
                { slug: { contains: createSlug(trimmed) || trimmed } }
            ];
        }

        let orderBy = { created_at: 'desc' };
        if (sort === 'oldest') orderBy = { created_at: 'asc' };
        else if (sort === 'name_asc') orderBy = { name: 'asc' };
        else if (sort === 'name_desc') orderBy = { name: 'desc' };

        const [totalMatching, totalAll, rawCategories] = await Promise.all([
            prisma.categories.count({ where }),
            prisma.categories.count(),
            prisma.categories.findMany({
                where,
                include: {
                    _count: {
                        select: { foods: true }
                    }
                },
                orderBy,
                ...(limit ? { skip: (page - 1) * limit, take: limit } : {})
            })
        ]);

        const formattedCategories = rawCategories.map((c) => ({
            id: c.id_category,
            id_category: c.id_category,
            name: c.name,
            slug: c.slug,
            status: c.status || 'active',
            created_at: c.created_at,
            updated_at: c.updated_at,
            foodsCount: c._count?.foods || 0
        }));

        if (sort === 'foods_desc') {
            formattedCategories.sort((a, b) => b.foodsCount - a.foodsCount);
        }

        const totalFoodsAssigned = rawCategories.reduce((sum, c) => sum + (c._count?.foods || 0), 0);
        const pageNum = limit ? page : 1;
        const totalPages = limit ? Math.max(1, Math.ceil(totalMatching / limit)) : 1;
        const skip = limit ? (page - 1) * limit : 0;
        const hasMore = limit ? (skip + rawCategories.length < totalMatching) : false;

        return res.json({
            success: true,
            data: formattedCategories,
            stats: {
                total: totalAll,
                active: totalAll,
                inactive: 0,
                totalFoodsAssigned
            },
            pagination: {
                total: totalMatching,
                page: pageNum,
                limit: limit || totalMatching,
                totalPages,
                hasMore
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể tải danh sách danh mục lúc này.',
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
            data: []
        });
    }
}

<<<<<<< HEAD
async function handleAdminReport(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        const status = req.body?.status;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID báo cáo không hợp lệ.'
            });
        }

        if (!['resolved', 'rejected', 'pending'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Trạng thái báo cáo không hợp lệ.'
            });
        }

        const report = await prisma.reports.update({
            where: { id_report: id },
            data: {
                status,
                updated_at: new Date()
            }
        });

        if (status === 'resolved' && req.body?.hideTarget) {
            if (report.target_type === 'post') {
                await prisma.posts.update({
                    where: { id_post: report.target_id },
                    data: { status: 'hidden' }
                }).catch(() => {});
            } else if (report.target_type === 'comment') {
                await prisma.comments.update({
                    where: { id_comment: report.target_id },
                    data: { status: 'hidden' }
                }).catch(() => {});
            }
=======
async function getCategoryById(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID danh mục không hợp lệ.' });
        }

        const category = await prisma.categories.findUnique({
            where: { id_category: id },
            include: {
                _count: {
                    select: { foods: true }
                },
                foods: {
                    take: 5,
                    select: {
                        id_food: true,
                        name: true,
                        slug: true,
                        image: true,
                        cooking_time: true,
                        status: true
                    }
                }
            }
        });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin danh mục.' });
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
        }

        return res.json({
            success: true,
<<<<<<< HEAD
            message: status === 'resolved' ? 'Đã xử lý xong báo cáo vi phạm.' : 'Đã từ chối báo cáo vi phạm.',
            data: report
        });
    } catch (error) {
        console.error('Lỗi handleAdminReport:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể xử lý báo cáo lúc này.'
        });
=======
            data: {
                id: category.id_category,
                id_category: category.id_category,
                name: category.name,
                slug: category.slug,
                status: category.status,
                created_at: category.created_at,
                updated_at: category.updated_at,
                foodsCount: category._count?.foods || 0,
                recentFoods: (category.foods || []).map(f => ({
                    ...f,
                    image: resolveAssetUrl(f.image)
                }))
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết danh mục:', error);
        return res.status(500).json({ success: false, message: 'Không thể lấy thông tin danh mục.' });
    }
}

async function createCategory(req, res) {
    try {
        const { name, slug, status } = req.body;
        const trimmedName = String(name || '').trim();

        if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'Tên danh mục là bắt buộc và phải có từ 2 đến 100 ký tự.'
            });
        }

        const existingName = await prisma.categories.findFirst({
            where: { name: trimmedName }
        });

        if (existingName) {
            return res.status(400).json({
                success: false,
                message: `Tên danh mục "${trimmedName}" đã tồn tại.`
            });
        }

        let baseSlug = createSlug(slug || trimmedName);
        if (!baseSlug) baseSlug = `danh-muc-${Date.now()}`;

        let finalSlug = baseSlug;
        let suffix = 1;
        while (await prisma.categories.findUnique({ where: { slug: finalSlug } })) {
            finalSlug = `${baseSlug}-${suffix++}`;
        }

        const categoryStatus = status === 'inactive' ? 'inactive' : 'active';

        const newCategory = await prisma.categories.create({
            data: {
                name: trimmedName,
                slug: finalSlug
            }
        });

        return res.status(201).json({
            success: true,
            message: `Tạo danh mục "${newCategory.name}" thành công!`,
            data: {
                id: newCategory.id_category,
                id_category: newCategory.id_category,
                name: newCategory.name,
                slug: newCategory.slug,
                status: categoryStatus,
                created_at: newCategory.created_at,
                updated_at: newCategory.updated_at,
                foodsCount: 0
            }
        });
    } catch (error) {
        console.error('Lỗi khi tạo danh mục:', error);
        return res.status(500).json({ success: false, message: 'Không thể tạo danh mục lúc này.' });
    }
}

async function updateCategory(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID danh mục không hợp lệ.' });
        }

        const category = await prisma.categories.findUnique({
            where: { id_category: id }
        });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục yêu cầu.' });
        }

        const { name, slug, status } = req.body;
        const data = {};

        if (name !== undefined) {
            const trimmedName = String(name || '').trim();
            if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
                return res.status(400).json({
                    success: false,
                    message: 'Tên danh mục phải có từ 2 đến 100 ký tự.'
                });
            }

            const duplicate = await prisma.categories.findFirst({
                where: {
                    name: trimmedName,
                    id_category: { not: id }
                }
            });

            if (duplicate) {
                return res.status(400).json({
                    success: false,
                    message: `Tên danh mục "${trimmedName}" đã được sử dụng bởi danh mục khác.`
                });
            }

            data.name = trimmedName;
        }

        if (slug !== undefined) {
            const trimmedSlug = createSlug(slug);
            if (!trimmedSlug) {
                return res.status(400).json({
                    success: false,
                    message: 'Slug danh mục không hợp lệ.'
                });
            }

            const duplicateSlug = await prisma.categories.findFirst({
                where: {
                    slug: trimmedSlug,
                    id_category: { not: id }
                }
            });

            if (duplicateSlug) {
                return res.status(400).json({
                    success: false,
                    message: `Slug "${trimmedSlug}" đã được sử dụng bởi danh mục khác.`
                });
            }

            data.slug = trimmedSlug;
        }

        if (status !== undefined) {
            if (!['active', 'inactive'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Trạng thái danh mục chỉ có thể là "active" hoặc "inactive".'
                });
            }
        }

        data.updated_at = new Date();

        const updated = await prisma.categories.update({
            where: { id_category: id },
            data,
            include: {
                _count: {
                    select: { foods: true }
                }
            }
        });

        return res.json({
            success: true,
            message: `Cập nhật danh mục "${updated.name}" thành công!`,
            data: {
                id: updated.id_category,
                id_category: updated.id_category,
                name: updated.name,
                slug: updated.slug,
                status: status || 'active',
                created_at: updated.created_at,
                updated_at: updated.updated_at,
                foodsCount: updated._count?.foods || 0
            }
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật danh mục:', error);
        return res.status(500).json({ success: false, message: 'Không thể cập nhật danh mục lúc này.' });
    }
}

async function updateCategoryStatus(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID danh mục không hợp lệ.' });
        }

        const category = await prisma.categories.findUnique({
            where: { id_category: id },
            include: {
                _count: { select: { foods: true } }
            }
        });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục yêu cầu.' });
        }

        let targetStatus = req.body.status;
        if (!targetStatus || !['active', 'inactive'].includes(targetStatus)) {
            targetStatus = 'active';
        }

        const updated = await prisma.categories.update({
            where: { id_category: id },
            data: {
                updated_at: new Date()
            }
        });

        const actionText = targetStatus === 'active' ? 'kích hoạt hiển thị' : 'ẩn';

        return res.json({
            success: true,
            message: `Đã ${actionText} danh mục "${category.name}" thành công.`,
            data: {
                id: updated.id_category,
                id_category: updated.id_category,
                name: updated.name,
                slug: updated.slug,
                status: targetStatus,
                foodsCount: category._count?.foods || 0
            }
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái danh mục:', error);
        return res.status(500).json({ success: false, message: 'Không thể thay đổi trạng thái danh mục.' });
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
    }
}

async function updateCommentStatus(req, res) {
    try {
        const id = parsePositiveInt(req.params.id);
        const { status } = req.body || {};

        if (!id || !['active', 'hidden'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Trạng thái bình luận không hợp lệ. Chấp nhận: active, hidden.'
            });
        }

        const comment = await prisma.comments.findUnique({
            where: { id_comment: id }
        });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Bình luận không tồn tại.'
            });
        }

        const updated = await prisma.comments.update({
            where: { id_comment: id },
            data: {
                status,
                updated_at: new Date()
            }
        });

        const statusLabel = status === 'hidden' ? 'Đã ẩn bình luận' : 'Hiển thị bình luận';

        return res.json({
            success: true,
            message: `Đã cập nhật: ${statusLabel}.`,
            data: updated
        });
    } catch (error) {
        console.error('updateCommentStatus error:', error);
        return res.status(500).json({ success: false, message: 'Không thể cập nhật trạng thái bình luận.' });
    }
}

module.exports = {
    getDashboard,
    getUsers,
    getUserById,
    createUser,
    updateUserStatus,
    getFoodOptions,
    getFoods,
    getFoodById,
    createFood,
    updateFood,
    updateFoodStatus,
<<<<<<< HEAD
    getCategories,
    createCategory,
    updateCategory,
    updateCategoryStatus,
    deleteCategory,
    getAdminPosts,
    updatePostStatus,
    deleteAdminPost,
    getAdminReports,
    handleAdminReport
=======
    getPosts,
    getPostById,
    updatePostStatus,
    deletePost,
    getReports,
    updateReportStatus,
    updateCommentStatus,
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    updateCategoryStatus
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
};

