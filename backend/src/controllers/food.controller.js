const prisma = require('../lib/prisma');
const { resolveAssetUrl } = require('../utils/assetUrl');

const FALLBACK_IMAGE = '/images/foods/thit-kho-trung.jpg';

function formatQuantity(value) {
    if (value === null || value === undefined) return '';

    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return String(value);

    return Number.isInteger(numberValue)
        ? String(numberValue)
        : String(numberValue).replace(/\.?0+$/, '');
}

function formatFood(food) {
    const categoryName = food.categories?.name || 'Mon ngon';
    const categorySlug = food.categories?.slug || '';
    const likesCount = food._count?.favorites || 0;

    return {
        id: food.id_food,
        id_food: food.id_food,
        name: food.name,
        slug: food.slug,
        description: food.description || 'Mon an thom ngon cho bua com gia dinh.',
        image: resolveAssetUrl(food.image || FALLBACK_IMAGE),
        time: food.cooking_time ? `${food.cooking_time} phut` : '30 phut',
        cooking_time: food.cooking_time,
        cooking_time_minutes: food.cooking_time || 30,
        thoi_gian: food.cooking_time || 30,
        servings: food.servings,
        category: categoryName,
        categorySlug,
        loai_mon: categoryName,
        difficulty: food.cooking_time && food.cooking_time > 35 ? 'Can chuan bi' : 'De lam',
        rating: 4.8,
        rating_count: String(likesCount),
        likes: likesCount,
        is_favorite: false,
        ingredients: food.food_ingredients.map((item) => {
            const quantity = formatQuantity(item.quantity);
            const unit = item.ingredients?.unit || '';
            const name = item.ingredients?.name || '';

            return `${quantity} ${unit} ${name}`.replace(/\s+/g, ' ').trim();
        }),
        tags: [categoryName, food.cooking_time ? `${food.cooking_time} phut` : 'Mon ngon'],
        author: {
            name: 'Hom Nay An Gi'
        },
        created_at: food.created_at
    };
}

async function listFoods(req, res) {
    try {
        const foods = await prisma.foods.findMany({
            where: {
                status: 'active'
            },
            include: {
                categories: true,
                food_ingredients: {
                    include: {
                        ingredients: true
                    }
                },
                _count: {
                    select: {
                        favorites: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return res.json({
            success: true,
            message: 'Lay danh sach mon an thanh cong.',
            data: foods.map(formatFood)
        });
    } catch (error) {
        console.error('List foods error:', error);

        return res.status(500).json({
            success: false,
            message: 'Khong the lay danh sach mon an luc nay.',
            data: []
        });
    }
}

module.exports = {
    listFoods
};
