const prisma = require('../lib/prisma');
const { signToken } = require('../middleware/auth.middleware');
const { resolveAssetUrl } = require('../utils/assetUrl');
const { hashPassword, isHashedPassword, verifyPassword } = require('../utils/password');

function formatUser(user) {
    return {
        id: user.id_user,
        id_user: user.id_user,
        name: user.name,
        email: user.email,
        avatar: resolveAssetUrl(user.avatar),
        role: user.role,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at
    };
}

function normalizeEmail(value) {
    return String(value || '').trim().toLowerCase();
}

function normalizeName(value) {
    return String(value || '').trim().replace(/\s+/g, ' ');
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function login(req, res) {
    try {
        const { email, account, password } = req.body || {};
        const identifier = String(email || account || '').trim();
        const normalizedIdentifier = normalizeEmail(identifier);

        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp đầy đủ email và mật khẩu.'
            });
        }

        const user = await prisma.users.findFirst({
            where: {
                OR: [
                    { email: normalizedIdentifier },
                    { name: identifier }
                ]
            }
        });

        if (!user || !verifyPassword(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không chính xác.'
            });
        }

        if (user.status !== 'active') {
            return res.status(403).json({
                success: false,
                message: 'Tài khoản của bạn đã bị khóa hoặc vô hiệu hóa.'
            });
        }

        if (!isHashedPassword(user.password)) {
            await prisma.users.update({
                where: { id_user: user.id_user },
                data: {
                    password: hashPassword(password),
                    updated_at: new Date()
                }
            });
        }

        const token = signToken(user.id_user);

        return res.json({
            success: true,
            message: 'Đăng nhập thành công.',
            token,
            user: formatUser(user)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể đăng nhập lúc này.'
        });
    }
}

async function register(req, res) {
    try {
        const { name, email, password } = req.body || {};
        const trimmedName = normalizeName(name);
        const trimmedEmail = normalizeEmail(email);

        if (!trimmedName || !trimmedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ họ tên, email và mật khẩu.'
            });
        }

        if (!isValidEmail(trimmedEmail)) {
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
            where: { email: trimmedEmail }
        });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Email này đã được sử dụng.'
            });
        }

        const user = await prisma.users.create({
            data: {
                name: trimmedName,
                email: trimmedEmail,
                password: hashPassword(password),
                avatar: '/images/users/admin.jpg',
                role: 'user',
                status: 'active'
            }
        });

        const token = signToken(user.id_user);

        return res.status(201).json({
            success: true,
            message: 'Đăng ký tài khoản thành công.',
            token,
            user: formatUser(user)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể tạo tài khoản lúc này.'
        });
    }
}

async function logout(req, res) {
    return res.json({
        success: true,
        message: 'Đăng xuất thành công.'
    });
}

async function getMe(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Chưa đăng nhập.'
            });
        }

        const [postsCount, activePostsCount, favoritesCount] = await Promise.all([
            prisma.posts.count({ where: { id_user: req.user.id_user } }),
            prisma.posts.count({ where: { id_user: req.user.id_user, status: 'active' } }),
            prisma.favorites.count({ where: { id_user: req.user.id_user } })
        ]);

        return res.json({
            success: true,
            user: {
                ...formatUser(req.user),
                stats: {
                    posts: postsCount,
                    activePosts: activePostsCount,
                    favorites: favoritesCount
                }
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể lấy thông tin người dùng.'
        });
    }
}

async function updateProfile(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Chưa đăng nhập.'
            });
        }

        const { name, avatar } = req.body || {};
        const updateData = {};

        if (name !== undefined) {
            const trimmedName = normalizeName(name);
            if (!trimmedName) {
                return res.status(400).json({
                    success: false,
                    message: 'Họ tên không được để trống.'
                });
            }
            updateData.name = trimmedName;
        }

        if (avatar !== undefined) {
            updateData.avatar = String(avatar || '').trim() || null;
        }

        updateData.updated_at = new Date();

        const updatedUser = await prisma.users.update({
            where: { id_user: req.user.id_user },
            data: updateData
        });

        const [postsCount, activePostsCount, favoritesCount] = await Promise.all([
            prisma.posts.count({ where: { id_user: req.user.id_user } }),
            prisma.posts.count({ where: { id_user: req.user.id_user, status: 'active' } }),
            prisma.favorites.count({ where: { id_user: req.user.id_user } })
        ]);

        return res.json({
            success: true,
            message: 'Cập nhật thông tin thành công.',
            user: {
                ...formatUser(updatedUser),
                stats: {
                    posts: postsCount,
                    activePosts: activePostsCount,
                    favorites: favoritesCount
                }
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể cập nhật thông tin lúc này.'
        });
    }
}

async function getMyPosts(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Chưa đăng nhập.'
            });
        }

        const posts = await prisma.posts.findMany({
            where: {
                id_user: req.user.id_user
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
                    where: {
                        id_user: req.user.id_user
                    },
                    select: {
                        id_user: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        const formattedPosts = posts.map(post => {
            const likesCount = post._count?.post_likes || 0;
            const commentsCount = post._count?.comments || 0;
            const isLiked = Array.isArray(post.post_likes) && post.post_likes.length > 0;

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
                likesCount,
                likes: likesCount,
                commentsCount,
                comments: commentsCount,
                isLiked,
                liked: isLiked,
                author: {
                    id: post.users?.id_user || req.user.id_user,
                    name: post.users?.name || req.user.name,
                    avatar: resolveAssetUrl(post.users?.avatar || req.user.avatar)
                },
                food: post.foods ? {
                    id: post.foods.id_food,
                    name: post.foods.name,
                    image: resolveAssetUrl(post.foods.image),
                    cooking_time: post.foods.cooking_time
                } : null,
                foodName: post.foods?.name || null
            };
        });

        return res.json({
            success: true,
            total: formattedPosts.length,
            data: formattedPosts
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể lấy bài viết của bạn lúc này.',
            data: []
        });
    }
}

async function getMyFavorites(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Chưa đăng nhập.'
            });
        }

        const favorites = await prisma.favorites.findMany({
            where: {
                id_user: req.user.id_user
            },
            include: {
                foods: {
                    include: {
                        categories: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        const formattedFavorites = favorites.map(fav => {
            const food = fav.foods;
            return {
                id_favorite: fav.id_favorite,
                id_food: fav.id_food,
                created_at: fav.created_at,
                food: {
                    id: food.id_food,
                    id_food: food.id_food,
                    name: food.name,
                    slug: food.slug,
                    description: food.description,
                    image: resolveAssetUrl(food.image || '/images/foods/thit-kho-trung.jpg'),
                    cooking_time: food.cooking_time,
                    time: food.cooking_time ? `${food.cooking_time} phút` : '30 phút',
                    category: food.categories?.name || 'Món ngon',
                    category_slug: food.categories?.slug || 'viet'
                }
            };
        });

        return res.json({
            success: true,
            total: formattedFavorites.length,
            data: formattedFavorites
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể lấy danh sách món yêu thích lúc này.',
            data: []
        });
    }
}

async function removeFavorite(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Chưa đăng nhập.'
            });
        }

        const foodId = Number(req.params.id);
        if (!foodId || Number.isNaN(foodId)) {
            return res.status(400).json({
                success: false,
                message: 'ID món ăn không hợp lệ.'
            });
        }

        const existing = await prisma.favorites.findUnique({
            where: {
                id_user_id_food: {
                    id_user: req.user.id_user,
                    id_food: foodId
                }
            }
        });

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: 'Món ăn không nằm trong danh sách yêu thích.'
            });
        }

        await prisma.favorites.delete({
            where: {
                id_favorite: existing.id_favorite
            }
        });

        const remainingCount = await prisma.favorites.count({
            where: { id_user: req.user.id_user }
        });

        return res.json({
            success: true,
            message: 'Đã xóa món khỏi danh sách yêu thích.',
            id_food: foodId,
            remainingCount
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể xóa món yêu thích lúc này.'
        });
    }
}

async function addFavorite(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Chưa đăng nhập.'
            });
        }

        const foodId = Number(req.params.id || req.body?.id_food || req.body?.foodId || req.body?.id);
        if (!foodId || Number.isNaN(foodId)) {
            return res.status(400).json({
                success: false,
                message: 'ID món ăn không hợp lệ.'
            });
        }

        const food = await prisma.foods.findUnique({
            where: { id_food: foodId },
            include: { categories: true }
        });

        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy món ăn này.'
            });
        }

        const existing = await prisma.favorites.findUnique({
            where: {
                id_user_id_food: {
                    id_user: req.user.id_user,
                    id_food: foodId
                }
            }
        });

        if (!existing) {
            await prisma.favorites.create({
                data: {
                    id_user: req.user.id_user,
                    id_food: foodId
                }
            });
        }

        const totalCount = await prisma.favorites.count({
            where: { id_user: req.user.id_user }
        });

        return res.json({
            success: true,
            message: 'Đã thêm món vào danh sách yêu thích.',
            id_food: foodId,
            totalCount,
            food: {
                id: food.id_food,
                id_food: food.id_food,
                name: food.name,
                image: resolveAssetUrl(food.image || '/images/foods/thit-kho-trung.jpg'),
                cooking_time: food.cooking_time,
                time: food.cooking_time ? `${food.cooking_time} phút` : '30 phút',
                category: food.categories?.name || 'Món ngon'
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể thêm món yêu thích lúc này.'
        });
    }
}

async function toggleFavorite(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để thực hiện chức năng này.'
            });
        }

        const foodId = Number(req.params.id || req.body?.id_food || req.body?.foodId || req.body?.id);
        if (!foodId || Number.isNaN(foodId)) {
            return res.status(400).json({
                success: false,
                message: 'ID món ăn không hợp lệ.'
            });
        }

        const foodService = require('../services/food.service');
        const result = await foodService.toggleFavorite(foodId, req.user.id_user);

        return res.json(result);
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Không thể tương tác yêu thích lúc này.'
        });
    }
}

module.exports = {
    login,
    register,
    logout,
    getMe,
    updateProfile,
    getMyPosts,
    getMyFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite
};

