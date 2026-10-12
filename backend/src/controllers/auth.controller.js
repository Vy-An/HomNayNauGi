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

        return res.json({
            success: true,
            user: formatUser(req.user)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Không thể lấy thông tin người dùng.'
        });
    }
}

module.exports = {
    login,
    register,
    logout,
    getMe
};
