const express = require('express');
const foodController = require('../controllers/food.controller');
const authController = require('../controllers/auth.controller');
const { requireAuth, optionalAuth } = require('../middleware/auth.middleware');

const router = express.Router();

// Lấy danh sách món ăn (hỗ trợ tìm kiếm, lọc theo nguyên liệu, danh mục, thời gian, sắp xếp)
router.get('/', optionalAuth, foodController.getFoods);

// Lấy danh sách options (categories, ingredients) cho bộ lọc
router.get('/options', foodController.getFoodOptions);

// Xem chi tiết món ăn theo ID hoặc Slug
router.get('/quick-suggestions', foodController.getQuickSuggestions);
router.get('/:id', optionalAuth, foodController.getFoodById);

// Lưu / bỏ lưu món ăn yêu thích
router.post('/:id/favorite', requireAuth, authController.toggleFavorite);

module.exports = router;
