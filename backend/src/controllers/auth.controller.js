const prisma = require('../lib/prisma');
const { signToken } = require('../middleware/auth.middleware');
const { resolveAssetUrl } = require('../utils/assetUrl');

function formatUser(user) {
    return {
        id: user.id_user,
        name: user.name,
        email: user.email,
        avatar: resolveAssetUrl(user.avatar),
        role: user.role,
        status: user.status
    };
}

async function login(req, res) {
    try {
        const { email, account, password } = req.body;
        const identifier = (email || account || '').trim();

        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp đầy đủ email và mật khẩu.'
            });
        }

        const user = await prisma.users.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { name: identifier }
                ]
            }
        });

        if (!user || user.password !== password) {
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
        const { name, email, password } = req.body;
        const trimmedName = (name || '').trim();
        const trimmedEmail = (email || '').trim().toLowerCase();

        if (!trimmedName || !trimmedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ họ tên, email và mật khẩu.'
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
                password: password,
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
    getMe
};
