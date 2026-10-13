const express = require('express');
const foodController = require('../controllers/food.controller');
<<<<<<< HEAD
const authController = require('../controllers/auth.controller');
=======
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
const { requireAuth, optionalAuth } = require('../middleware/auth.middleware');

const router = express.Router();

// Lấy danh sách món ăn (hỗ trợ tìm kiếm, lọc theo nguyên liệu, danh mục, thời gian, sắp xếp)
router.get('/', optionalAuth, foodController.getFoods);

// Lấy danh sách options (categories, ingredients) cho bộ lọc
router.get('/options', foodController.getFoodOptions);

// Xem chi tiết món ăn theo ID hoặc Slug
router.get('/quick-suggestions', foodController.getQuickSuggestions);
router.get('/:id', optionalAuth, foodController.getFoodById);

<<<<<<< HEAD
// Lưu / bỏ lưu món ăn yêu thích
router.post('/:id/favorite', requireAuth, authController.toggleFavorite);
=======
// Lưu hoặc bỏ lưu món ăn yêu thích
router.post('/:id/favorite', requireAuth, foodController.toggleFavorite);
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12

module.exports = router;
