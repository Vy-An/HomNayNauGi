const prisma = require('../lib/prisma');
const { resolveAssetUrl } = require('../utils/assetUrl');

const FALLBACK_IMAGE = '/images/foods/thit-kho-trung.jpg';

function clampLimit(value) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) return 4;

    return Math.min(Math.max(parsed, 1), 12);
}

function formatLikes(count) {
    const total = Number(count) || 0;

    if (total >= 1000) {
        return `${(total / 1000).toFixed(total >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`;
    }

    return String(total);
}

function formatCommunityPost(post) {
    const food = post.foods;
    const likesCount = post._count?.post_likes || 0;

    return {
        id: food?.id_food || post.id_post,
        postId: post.id_post,
        foodId: food?.id_food || null,
        name: food?.name || post.title,
        title: post.title,
        description: post.content || food?.description || '',
        image: resolveAssetUrl(post.image || food?.image || FALLBACK_IMAGE),
        time: food?.cooking_time ? `${food.cooking_time} ph\u00fat` : '30 ph\u00fat',
        cookingTime: food?.cooking_time || null,
        likes: formatLikes(likesCount),
        likesCount,
        author: {
            id: post.users?.id_user || null,
            name: post.users?.name || 'Cong dong',
            avatar: resolveAssetUrl(post.users?.avatar)
        },
        createdAt: post.created_at
    };
}

async function featuredPosts(req, res) {
    try {
        const limit = clampLimit(req.query.limit);
        const posts = await prisma.posts.findMany({
            where: {
                status: 'active'
            },
            include: {
                users: {
                    select: {
                        id_user: true,
                        name: true,
                        avatar: true
                    }
                },
                foods: {
                    select: {
                        id_food: true,
                        name: true,
                        description: true,
                        image: true,
                        cooking_time: true,
                        status: true
                    }
                },
                _count: {
                    select: {
                        post_likes: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        const formattedPosts = posts
            .filter((post) => !post.foods || post.foods.status === 'active')
            .sort((a, b) => {
                const likesDiff = (b._count?.post_likes || 0) - (a._count?.post_likes || 0);
                if (likesDiff !== 0) return likesDiff;

                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            })
            .slice(0, limit)
            .map(formatCommunityPost);

        return res.json({
            success: true,
            message: 'Lay bai viet cong dong thanh cong.',
            data: formattedPosts
        });
    } catch (error) {
        console.error('Featured posts error:', error);

        return res.status(500).json({
            success: false,
            message: 'Khong the lay bai viet cong dong luc nay.',
            data: []
        });
    }
}

module.exports = {
    featuredPosts
};
