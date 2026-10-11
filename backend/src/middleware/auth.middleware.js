const crypto = require('crypto');
const prisma = require('../lib/prisma');

const AUTH_SECRET = process.env.JWT_SECRET || 'hnag_auth_secret_key_2026';

function signToken(userId) {
    const timestamp = Date.now();
    const signature = crypto
        .createHmac('sha256', AUTH_SECRET)
        .update(`${userId}.${timestamp}`)
        .digest('hex');
    return `${userId}.${timestamp}.${signature}`;
}

function verifyToken(token) {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [userIdStr, timestampStr, signature] = parts;
    const userId = Number(userIdStr);
    const timestamp = Number(timestampStr);
    if (!Number.isInteger(userId) || Number.isNaN(timestamp)) return null;

    const expectedSignature = crypto
        .createHmac('sha256', AUTH_SECRET)
        .update(`${userId}.${timestamp}`)
        .digest('hex');

    if (signature !== expectedSignature) return null;
    if (Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000) return null;

    return userId;
}

async function resolveUserFromRequest(req) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7).trim();
    } else if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }

    if (!token) return null;
    const userId = verifyToken(token);
    if (!userId) return null;

    const user = await prisma.users.findUnique({
        where: { id_user: userId }
    });

    if (!user || user.status !== 'active') return null;
    return user;
}

async function requireAuth(req, res, next) {
    try {
        const user = await resolveUserFromRequest(req);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để thực hiện chức năng này.'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Xác thực không hợp lệ.'
        });
    }
}

async function optionalAuth(req, res, next) {
    try {
        const user = await resolveUserFromRequest(req);
        if (user) {
            req.user = user;
        }
    } catch (error) {
    }
    next();
}

module.exports = {
    signToken,
    verifyToken,
    requireAuth,
    optionalAuth
};
