function requireAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Vui lòng đăng nhập để truy cập trang quản trị.'
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Bạn không có quyền quản trị.'
        });
    }

    return next();
}

module.exports = {
    requireAdmin
};
