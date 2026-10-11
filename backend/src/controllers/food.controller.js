const foodService = require('../services/food.service');

/**
 * Controller lấy danh sách món ăn với chức năng tìm kiếm và bộ lọc nguyên liệu/danh mục
 */
async function getFoods(req, res) {
    try {
        const result = await foodService.getFoods(req.query);

        return res.json({
            success: true,
            message: 'Lấy danh sách món ăn thành công.',
            total: result.total,
            page: result.page,
            limit: result.limit,
            data: result.foods
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách món ăn:', error);

        return res.status(500).json({
            success: false,
            message: 'Không thể lấy danh sách món ăn lúc này.',
            data: []
        });
    }
}

/**
 * Controller xem chi tiết món ăn theo ID hoặc Slug
 */
async function getFoodById(req, res) {
    try {
        const { id } = req.params;
        const food = await foodService.getFoodById(id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thông tin món ăn yêu cầu.',
                data: null
            });
        }

        return res.json({
            success: true,
            message: 'Lấy chi tiết món ăn thành công.',
            data: food
        });
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết món ăn:', error);

        return res.status(500).json({
            success: false,
            message: 'Không thể lấy chi tiết món ăn lúc này.',
            data: null
        });
    }
}

/**
 * Controller lấy danh sách options (categories, ingredients) phục vụ bộ lọc
 */
async function getFoodOptions(req, res) {
    try {
        const options = await foodService.getFoodOptions();

        return res.json({
            success: true,
            message: 'Lấy danh mục và nguyên liệu thành công.',
            data: options
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh mục và nguyên liệu:', error);

        return res.status(500).json({
            success: false,
            message: 'Không thể lấy thông tin tùy chọn lọc.',
            data: {
                categories: [],
                ingredients: []
            }
        });
    }
}

async function getQuickSuggestions(req, res) {
    try {
        const suggestions = await foodService.getQuickSuggestions();

        return res.json({
            success: true,
            message: 'Lấy danh sách gợi ý nhanh thành công.',
            data: suggestions
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách gợi ý nhanh:', error);

        return res.status(500).json({
            success: false,
            message: 'Không thể lấy danh sách gợi ý nhanh lúc này.',
            data: []
        });
    }
}

module.exports = {
    getFoods,
    listFoods: getFoods,
    getFoodById,
    getFoodOptions,
    getQuickSuggestions
};
