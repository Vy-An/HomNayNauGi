const mealRandomService = require('../services/mealRandom.service');

async function randomMeals(req, res) {
    try {
        const result = await mealRandomService.getRandomMeals({
            quantity: req.query.quantity,
            ingredients: req.query.ingredients,
            categories: req.query.categories
        });

        if (!result.foods.length) {
            return res.status(404).json({
                success: false,
                message: 'Khong tim thay mon an nao trong database.',
                data: []
            });
        }

        return res.json({
            success: true,
            message: result.fallbackCount
                ? 'Khong du mon khop bo loc, da bo sung mon ngau nhien.'
                : 'Lay mon an ngau nhien thanh cong.',
            meta: {
                requested: result.requested,
                matchedFilters: result.matchedFilters,
                totalCandidates: result.totalCandidates,
                fallbackCount: result.fallbackCount
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
