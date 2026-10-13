const fs = require('fs');
const path = require('path');
const prisma = require('../lib/prisma');
const { resolveAssetUrl } = require('../utils/assetUrl');

const FALLBACK_IMAGE = '/images/foods/thit-kho-trung.jpg';

function clampLimit(value, defaultVal = 10, maxVal = 50) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) return defaultVal;
    return Math.min(Math.max(parsed, 1), maxVal);
}

function formatLikes(count) {
    const total = Number(count) || 0;
    if (total >= 1000) {
        return `${(total / 1000).toFixed(total >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`;
    }
    return String(total);
}

function formatRelativeTime(date) {
    const diffMs = Date.now() - new Date(date).getTime();
    const diffSec = Math.max(0, Math.floor(diffMs / 1000));
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return 'Vừa xong';
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHour < 24) return `${diffHour} giờ trước`;
    if (diffDay < 7) return `${diffDay} ngày trước`;
    return `${Math.floor(diffDay / 7)} tuần trước`;
}

function formatPost(post, currentUserId = null) {
    const food = post.foods;
    const likesCount = post._count?.post_likes ?? (Array.isArray(post.post_likes) ? post.post_likes.length : 0);
    const commentsCount = post._count?.comments || 0;
    const userLikes = Array.isArray(post.post_likes) ? post.post_likes : [];
    const isLiked = currentUserId ? userLikes.some((l) => l.id_user === currentUserId) : false;

    return {
        id_post: post.id_post,
        id_user: post.id_user,
        id_food: post.id_food,
        title: post.title,
        content: post.content,
        image: resolveAssetUrl(post.image),
        status: post.status,
        hidden_reason: post.hidden_reason || null,
        created_at: post.created_at,
        time: formatRelativeTime(post.created_at),
        likesCount,
        likes: formatLikes(likesCount),
        commentsCount,
        comments: commentsCount,
        isLiked,
        liked: isLiked,
        author: {
            id: post.users?.id_user || null,
            name: post.users?.name || 'Thành viên',
            avatar: resolveAssetUrl(post.users?.avatar || '/images/users/admin.jpg')
        },
        food: food ? {
            id: food.id_food,
            name: food.name,
            image: resolveAssetUrl(food.image),
            cooking_time: food.cooking_time,
            time: food.cooking_time ? `${food.cooking_time} phút` : '30 phút'
        } : null,
        foodName: food?.name || null
    };
}

function formatCommunityPost(post) {
    const food = post.foods;
    const likesCount = post._count?.post_likes || 0;
    const commentsCount = post._count?.comments || 0;

    return {
        id: food?.id_food || post.id_post,
        postId: post.id_post,
        foodId: food?.id_food || null,
        name: food?.name || post.title,
        title: post.title,
        description: post.content || food?.description || '',
        image: resolveAssetUrl(post.image || food?.image || FALLBACK_IMAGE),
        time: food?.cooking_time ? `${food.cooking_time} phút` : '30 phút',
        cookingTime: food?.cooking_time || null,
        likes: formatLikes(likesCount),
        likesCount,
        commentsCount,
        comments: commentsCount,
        author: {
            id: post.users?.id_user || null,
            name: post.users?.name || 'Cộng đồng',
            avatar: resolveAssetUrl(post.users?.avatar)
        },
        createdAt: post.created_at
    };
}

async function featuredPosts(req, res) {
    try {
        const limit = clampLimit(req.query.limit, 4, 12);
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
                        post_likes: true,
                        comments: true
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
            message: 'Lấy bài viết cộng đồng thành công.',
            data: formattedPosts
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể lấy bài viết cộng đồng lúc này.',
            data: []
        });
    }
}

async function getPosts(req, res) {
    try {
        const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
        const limit = clampLimit(req.query.limit, 10, 50);
        const skip = (page - 1) * limit;
        const filter = req.query.filter || 'all';
        const foodId = req.query.food_id ? Number(req.query.food_id) : null;
        const currentUserId = req.user ? req.user.id_user : null;

        const where = {
            status: 'active'
        };

        if (foodId && !Number.isNaN(foodId)) {
            where.id_food = foodId;
        }

        const include = {
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
                    image: true,
                    cooking_time: true
                }
            },
            _count: {
                select: {
                    post_likes: true,
                    comments: true
                }
            },
            post_likes: {
                select: {
                    id_user: true
                }
            }
        };

        let orderBy = { created_at: 'desc' };
        if (filter === 'newest') {
            orderBy = { created_at: 'desc' };
        }

        const [total, rawPosts] = await Promise.all([
            prisma.posts.count({ where }),
            prisma.posts.findMany({
                where,
                include,
                orderBy,
                skip: filter === 'liked' || filter === 'trending' || filter === 'random' ? 0 : skip,
                take: filter === 'liked' || filter === 'trending' || filter === 'random' ? 100 : limit
            })
        ]);

        let formatted = rawPosts.map((p) => formatPost(p, currentUserId));

        if (filter === 'liked') {
            formatted.sort((a, b) => b.likesCount - a.likesCount);
            formatted = formatted.slice(skip, skip + limit);
        } else if (filter === 'trending') {
            formatted.sort((a, b) => {
                const diffLikes = b.likesCount - a.likesCount;
                if (diffLikes !== 0) return diffLikes;
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
            formatted = formatted.slice(skip, skip + limit);
        } else if (filter === 'random') {
            formatted.sort(() => 0.5 - Math.random());
            formatted = formatted.slice(skip, skip + limit);
        }

        return res.json({
            success: true,
            total,
            page,
            limit,
            hasMore: skip + formatted.length < total,
            data: formatted
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể lấy danh sách bài viết lúc này.',
            data: []
        });
    }
}

async function getPostById(req, res) {
    try {
        const id = Number(req.params.id);
        if (!id || Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID bài viết không hợp lệ.'
            });
        }

        const currentUserId = req.user ? req.user.id_user : null;
        const post = await prisma.posts.findUnique({
            where: {
                id_post: id
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
                        image: true,
                        cooking_time: true
                    }
                },
                _count: {
                    select: {
                        post_likes: true,
                        comments: true
                    }
                },
                post_likes: {
                    select: {
                        id_user: true
                    }
                }
            }
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Bài viết không tồn tại.'
            });
        }

        if (post.status !== 'active') {
            const isAuthor = currentUserId && post.id_user === currentUserId;
            const isAdmin = req.user && req.user.role === 'admin';
            if (!isAuthor && !isAdmin) {
                return res.status(404).json({
                    success: false,
                    message: 'Bài viết không tồn tại hoặc đang chờ kiểm duyệt.'
                });
            }
        }

        return res.json({
            success: true,
            data: formatPost(post, currentUserId)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể lấy thông tin bài viết.'
        });
    }
}

async function createPost(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để đăng bài viết.'
            });
        }

        const { title, content, image, id_food } = req.body;
        const trimmedContent = (content || '').trim();

        if (!trimmedContent) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập nội dung bài viết.'
            });
        }

        let foodRecord = null;
        if (id_food) {
            const parsedFoodId = Number(id_food);
            if (!Number.isNaN(parsedFoodId)) {
                foodRecord = await prisma.foods.findUnique({
                    where: { id_food: parsedFoodId }
                });
                if (!foodRecord || foodRecord.status !== 'active') {
                    return res.status(400).json({
                        success: false,
                        message: 'Món ăn được gắn không tồn tại trong hệ thống.'
                    });
                }
            }
        }

        let savedImagePath = null;
        if (image && typeof image === 'string') {
            const matches = image.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
            if (matches) {
                let ext = matches[1].toLowerCase();
                if (ext === 'jpeg') ext = 'jpg';
                const base64Data = matches[2];
                const buffer = Buffer.from(base64Data, 'base64');

                if (buffer.length > 5 * 1024 * 1024) {
                    return res.status(400).json({
                        success: false,
                        message: 'Kích thước ảnh không được vượt quá 5MB.'
                    });
                }

                const postsDir = path.join(__dirname, '..', '..', 'public', 'images', 'posts');
                if (!fs.existsSync(postsDir)) {
                    fs.mkdirSync(postsDir, { recursive: true });
                }

                const filename = `post-${Date.now()}-${Math.floor(Math.random() * 10000)}.${ext}`;
                const filepath = path.join(postsDir, filename);
                fs.writeFileSync(filepath, buffer);
                savedImagePath = `/images/posts/${filename}`;
            } else if (image.startsWith('/images/') || image.startsWith('http://') || image.startsWith('https://')) {
                savedImagePath = image;
            }
        }

        const finalTitle = (title || '').trim() || (foodRecord ? foodRecord.name : 'Mâm cơm bếp nhà');

        const newPost = await prisma.posts.create({
            data: {
                id_user: req.user.id_user,
                id_food: foodRecord ? foodRecord.id_food : null,
                title: finalTitle,
                content: trimmedContent,
                image: savedImagePath,
                status: 'pending'
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
                        image: true,
                        cooking_time: true
                    }
                },
                _count: {
                    select: {
                        post_likes: true,
                        comments: true
                    }
                },
                post_likes: {
                    select: {
                        id_user: true
                    }
                }
            }
        });

        return res.status(201).json({
            success: true,
            message: 'Đăng bài viết thành công! Bài viết của bạn đang chờ kiểm duyệt trước khi hiển thị công khai.',
            data: formatPost(newPost, req.user.id_user)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể đăng bài viết lúc này.'
        });
    }
}

async function toggleLike(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để thả tim bài viết.'
            });
        }

        const postId = Number(req.params.id);
        if (!postId || Number.isNaN(postId)) {
            return res.status(400).json({
                success: false,
                message: 'ID bài viết không hợp lệ.'
            });
        }

        const post = await prisma.posts.findUnique({
            where: { id_post: postId }
        });

        if (!post || post.status !== 'active') {
            return res.status(404).json({
                success: false,
                message: 'Bài viết không tồn tại.'
            });
        }

        const existingLike = await prisma.post_likes.findUnique({
            where: {
                id_post_id_user: {
                    id_post: postId,
                    id_user: req.user.id_user
                }
            }
        });

        let isLiked = false;
        if (existingLike) {
            await prisma.post_likes.delete({
                where: {
                    id_post_like: existingLike.id_post_like
                }
            });
            isLiked = false;
        } else {
            await prisma.post_likes.create({
                data: {
                    id_post: postId,
                    id_user: req.user.id_user
                }
            });
            isLiked = true;
        }

        const likesCount = await prisma.post_likes.count({
            where: { id_post: postId }
        });

        return res.json({
            success: true,
            message: isLiked ? 'Đã thích bài viết.' : 'Đã bỏ thích bài viết.',
            isLiked,
            liked: isLiked,
            likesCount,
            likes: formatLikes(likesCount)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể cập nhật lượt thích lúc này.'
        });
    }
}

async function reportPost(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để gửi báo cáo vi phạm.'
            });
        }

        const id = Number(req.params.id);
        if (!id || Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID bài viết không hợp lệ.'
            });
        }

        const { reason, description } = req.body || {};
        const trimmedReason = typeof reason === 'string' ? reason.trim() : '';

        if (!trimmedReason) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp lý do báo cáo vi phạm.'
            });
        }

        const post = await prisma.posts.findUnique({
            where: { id_post: id }
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Bài viết không tồn tại.'
            });
        }

        const existingPending = await prisma.reports.findFirst({
            where: {
                id_user: req.user.id_user,
                target_type: 'post',
                target_id: id,
                status: 'pending'
            }
        });

        if (existingPending) {
            return res.status(400).json({
                success: false,
                message: 'Bạn đã gửi báo cáo cho bài viết này và đang chờ xử lý.'
            });
        }

        await prisma.reports.create({
            data: {
                id_user: req.user.id_user,
                target_type: 'post',
                target_id: id,
                reason: trimmedReason.slice(0, 255),
                description: description ? String(description).trim() : null,
                status: 'pending'
            }
        });

        return res.status(201).json({
            success: true,
            message: 'Báo cáo vi phạm đã được gửi thành công. Ban quản trị sẽ sớm xem xét và xử lý.'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể gửi báo cáo vi phạm lúc này.'
        });
    }
}

module.exports = {
    featuredPosts,
    getPosts,
    getPostById,
    createPost,
    toggleLike,
    reportPost
};
