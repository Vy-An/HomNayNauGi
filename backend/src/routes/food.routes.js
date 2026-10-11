const express = require('express');
const foodController = require('../controllers/food.controller');

const router = express.Router();

// Lấy danh sách món ăn (hỗ trợ tìm kiếm, lọc theo nguyên liệu, danh mục, thời gian, sắp xếp)
router.get('/', foodController.getFoods);

// Lấy danh sách options (categories, ingredients) cho bộ lọc
router.get('/options', foodController.getFoodOptions);

// Xem chi tiết món ăn theo ID hoặc Slug
router.get('/:id', foodController.getFoodById);

module.exports = router;
