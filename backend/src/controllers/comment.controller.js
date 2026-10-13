const prisma = require('../lib/prisma');
const { resolveAssetUrl } = require('../utils/assetUrl');

function parsePositiveInt(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function clampLimit(value, defaultVal = 20, maxVal = 50) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) return defaultVal;

    return Math.min(Math.max(parsed, 1), maxVal);
}

function formatRelativeTime(date) {
    const diffMs = Date.now() - new Date(date).getTime();
    const diffSec = Math.max(0, Math.floor(diffMs / 1000));
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return 'Vua xong';
    if (diffMin < 60) return `${diffMin} phut truoc`;
    if (diffHour < 24) return `${diffHour} gio truoc`;
    if (diffDay < 7) return `${diffDay} ngay truoc`;

    return `${Math.floor(diffDay / 7)} tuan truoc`;
}

function formatComment(comment) {
    return {
        id: comment.id_comment,
        id_comment: comment.id_comment,
        id_post: comment.id_post,
        id_user: comment.id_user,
        content: comment.content,
        status: comment.status,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
        time: formatRelativeTime(comment.created_at),
        author: {
            id: comment.users?.id_user || null,
            name: comment.users?.name || 'Thanh vien',
            avatar: resolveAssetUrl(comment.users?.avatar || '/images/users/admin.jpg')
        }
    };
}

async function findActivePost(postId) {
    if (!postId) return null;

    return prisma.posts.findFirst({
        where: {
            id_post: postId,
            status: 'active'
        }
    });
}

async function getCommentsByPost(req, res) {
    try {
        const postId = parsePositiveInt(req.params.id || req.params.postId);
        if (!postId) {
            return res.status(400).json({
                success: false,
                message: 'ID bai viet khong hop le.',
                data: []
            });
        }

        const post = await findActivePost(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Bai viet khong ton tai.',
                data: []
            });
        }

        const page = Math.max(1, Number.parseInt(req.query?.page, 10) || 1);
        const limit = clampLimit(req.query?.limit);
        const skip = (page - 1) * limit;
        const where = {
            id_post: postId,
            status: 'active'
        };

        const [total, comments] = await Promise.all([
            prisma.comments.count({ where }),
            prisma.comments.findMany({
                where,
                include: {
                    users: {
                        select: {
                            id_user: true,
                            name: true,
                            avatar: true
                        }
                    }
                },
                orderBy: {
                    created_at: 'asc'
                },
                skip,
                take: limit
            })
        ]);

        return res.json({
            success: true,
            total,
            page,
            limit,
            hasMore: skip + comments.length < total,
            data: comments.map(formatComment)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Khong the lay danh sach binh luan luc nay.',
            data: []
        });
    }
}

async function createComment(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui long dang nhap de binh luan.'
            });
        }

        const postId = parsePositiveInt(req.params.id || req.params.postId);
        const content = (req.body?.content || '').trim();

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: 'ID bai viet khong hop le.'
            });
        }

        if (!content) {
            return res.status(400).json({
                success: false,
                message: 'Noi dung binh luan khong duoc de trong.'
            });
        }

        if (content.length > 1000) {
            return res.status(400).json({
                success: false,
                message: 'Binh luan khong duoc vuot qua 1000 ky tu.'
            });
        }

        const post = await findActivePost(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Bai viet khong ton tai.'
            });
        }

        const comment = await prisma.comments.create({
            data: {
                id_post: postId,
                id_user: req.user.id_user,
                content,
                status: 'active'
            },
            include: {
                users: {
                    select: {
                        id_user: true,
                        name: true,
                        avatar: true
                    }
                }
            }
        });

        const commentsCount = await prisma.comments.count({
            where: {
                id_post: postId,
                status: 'active'
            }
        });

        return res.status(201).json({
            success: true,
            message: 'Them binh luan thanh cong.',
            commentsCount,
            data: formatComment(comment)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Khong the them binh luan luc nay.'
        });
    }
}

async function updateComment(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui long dang nhap de sua binh luan.'
            });
        }

        const commentId = parsePositiveInt(req.params.id);
        const content = (req.body?.content || '').trim();

        if (!commentId) {
            return res.status(400).json({
                success: false,
                message: 'ID binh luan khong hop le.'
            });
        }

        if (!content) {
            return res.status(400).json({
                success: false,
                message: 'Noi dung binh luan khong duoc de trong.'
            });
        }

        if (content.length > 1000) {
            return res.status(400).json({
                success: false,
                message: 'Binh luan khong duoc vuot qua 1000 ky tu.'
            });
        }

        const existing = await prisma.comments.findUnique({
            where: { id_comment: commentId },
            include: {
                users: {
                    select: {
                        id_user: true,
                        name: true,
                        avatar: true
                    }
                }
            }
        });

        if (!existing || existing.status !== 'active') {
            return res.status(404).json({
                success: false,
                message: 'Binh luan khong ton tai.'
            });
        }

        const isOwner = existing.id_user === req.user.id_user;
        if (!isOwner) {
            return res.status(403).json({
                success: false,
                message: 'Ban khong co quyen sua binh luan nay.'
            });
        }

        const updated = await prisma.comments.update({
            where: { id_comment: commentId },
            data: {
                content,
                updated_at: new Date()
            },
            include: {
                users: {
                    select: {
                        id_user: true,
                        name: true,
                        avatar: true
                    }
                }
            }
        });

        return res.json({
            success: true,
            message: 'Cap nhat binh luan thanh cong.',
            data: formatComment(updated)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Khong the cap nhat binh luan luc nay.'
        });
    }
}

async function deleteComment(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui long dang nhap de xoa binh luan.'
            });
        }

        const commentId = parsePositiveInt(req.params.id);
        if (!commentId) {
            return res.status(400).json({
                success: false,
                message: 'ID binh luan khong hop le.'
            });
        }

        const existing = await prisma.comments.findUnique({
            where: { id_comment: commentId }
        });

        if (!existing || existing.status !== 'active') {
            return res.status(404).json({
                success: false,
                message: 'Binh luan khong ton tai.'
            });
        }

        const isOwner = existing.id_user === req.user.id_user;
        if (!isOwner) {
            return res.status(403).json({
                success: false,
                message: 'Ban khong co quyen xoa binh luan nay.'
            });
        }

        await prisma.comments.update({
            where: { id_comment: commentId },
            data: {
                status: 'hidden',
                updated_at: new Date()
            }
        });

        const commentsCount = await prisma.comments.count({
            where: {
                id_post: existing.id_post,
                status: 'active'
            }
        });

        return res.json({
            success: true,
            message: 'Xoa binh luan thanh cong.',
            id_comment: commentId,
            id_post: existing.id_post,
            commentsCount
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Khong the xoa binh luan luc nay.'
        });
    }
}

module.exports = {
    getCommentsByPost,
    createComment,
    updateComment,
    deleteComment
};
