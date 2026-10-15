const mealRandomService = require('../services/mealRandom.service');

async function randomMeals(req, res) {
    try {
        const result = await mealRandomService.getRandomMeals({
            quantity: req.query.quantity,
            ingredients: req.query.ingredients,
            categories: req.query.categories,
            cook_time: req.query.cook_time
        });

        if (!result.foods.length) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy món ăn nào phù hợp với bộ lọc đã chọn.',
                data: []
            });
        }

        return res.json({
            success: true,
            message: result.fallbackCount
                ? 'Không đủ món khớp bộ lọc, đã bổ sung món ngẫu nhiên.'
                : 'Lấy món ăn ngẫu nhiên thành công.',
            meta: {
                requested: result.requested,
                matchedFilters: result.matchedFilters,
                totalCandidates: result.totalCandidates,
                fallbackCount: result.fallbackCount,
                timeRelaxedCount: result.timeRelaxedCount,
                cookTime: result.cookTime
            },
            data: result.foods
        });
    } catch (error) {
        console.error('Random meals error:', error);

        return res.status(500).json({
            success: false,
            message: 'Khong the random mon an luc nay.',
            data: []
        });
    }
}

async function randomOptions(req, res) {
    try {
        const options = await mealRandomService.getRandomOptions();

        return res.json({
            success: true,
            data: options
        });
    } catch (error) {
        console.error('Random options error:', error);

        return res.status(500).json({
            success: false,
            message: 'Khong the lay danh sach tuy chon.',
            data: {
                categories: [],
                ingredients: []
            }
        });
    }
}

module.exports = {
    randomMeals,
    randomOptions
};
