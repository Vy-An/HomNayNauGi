const prisma = require('../lib/prisma');
const { resolveAssetUrl } = require('../utils/assetUrl');

function formatDecimal(val) {
    if (val === null || val === undefined) return '0';
    const num = Number(val);
    return Number.isInteger(num) ? String(num) : String(num).replace(/\.?0+$/, '');
}

/**
 * Lấy toàn bộ danh sách đi chợ của người dùng đang đăng nhập
 */
async function getShoppingList(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để xem danh sách đi chợ.'
            });
        }

        const lists = await prisma.shopping_lists.findMany({
            where: {
                id_user: req.user.id_user
            },
            include: {
                foods: {
                    select: {
                        id_food: true,
                        name: true,
                        slug: true,
                        image: true
                    }
                },
                shopping_list_items: {
                    include: {
                        ingredients: true
                    },
                    orderBy: {
                        id_shopping_list_item: 'asc'
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        const allItems = [];
        let totalItems = 0;
        let checkedCount = 0;

        const formattedLists = lists.map((list) => {
            const foodName = list.foods ? list.foods.name : 'Món tự thêm';
            const foodImage = list.foods ? resolveAssetUrl(list.foods.image) : null;

            const items = list.shopping_list_items.map((item) => {
                totalItems++;
                if (item.is_checked) checkedCount++;

                const formatted = {
                    id_shopping_list_item: item.id_shopping_list_item,
                    id_shopping_list: item.id_shopping_list,
                    id_ingredient: item.id_ingredient,
                    name: item.ingredients?.name || 'Nguyên liệu',
                    quantity: formatDecimal(item.quantity),
                    unit: item.unit || item.ingredients?.unit || 'phần',
                    is_checked: item.is_checked,
                    food_name: foodName,
                    id_food: list.id_food
                };
                allItems.push(formatted);
                return formatted;
            });

            return {
                id_shopping_list: list.id_shopping_list,
                id_food: list.id_food,
                food_name: foodName,
                food_slug: list.foods?.slug || '',
                food_image: foodImage,
                created_at: list.created_at,
                items
            };
        });

        return res.json({
            success: true,
            message: 'Lấy danh sách đi chợ thành công.',
            total_items: totalItems,
            checked_items: checkedCount,
            remaining_items: totalItems - checkedCount,
            lists: formattedLists,
            items: allItems
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đi chợ:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể lấy danh sách đi chợ lúc này.',
            lists: [],
            items: []
        });
    }
}

/**
 * Thêm toàn bộ nguyên liệu của món ăn vào danh sách đi chợ
 */
async function addFoodToShoppingList(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để thêm vào danh sách đi chợ.'
            });
        }

        const foodId = Number(req.body.foodId || req.body.id_food);
        if (!foodId || Number.isNaN(foodId)) {
            return res.status(400).json({
                success: false,
                message: 'ID món ăn không hợp lệ.'
            });
        }

        const food = await prisma.foods.findUnique({
            where: { id_food: foodId },
            include: {
                food_ingredients: {
                    include: {
                        ingredients: true
                    }
                }
            }
        });

        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy món ăn.'
            });
        }

        if (!food.food_ingredients.length) {
            return res.status(400).json({
                success: false,
                message: 'Món ăn này chưa có danh sách nguyên liệu.'
            });
        }

        // Tìm hoặc tạo shopping_list cho món này
        let shoppingList = await prisma.shopping_lists.findFirst({
            where: {
                id_user: req.user.id_user,
                id_food: food.id_food
            }
        });

        if (!shoppingList) {
            shoppingList = await prisma.shopping_lists.create({
                data: {
                    id_user: req.user.id_user,
                    id_food: food.id_food
                }
            });
        }

        // Thêm/cộng dồn các nguyên liệu
        let addedCount = 0;
        for (const fi of food.food_ingredients) {
            const existingItem = await prisma.shopping_list_items.findUnique({
                where: {
                    id_shopping_list_id_ingredient: {
                        id_shopping_list: shoppingList.id_shopping_list,
                        id_ingredient: fi.id_ingredient
                    }
                }
            });

            if (existingItem) {
                await prisma.shopping_list_items.update({
                    where: { id_shopping_list_item: existingItem.id_shopping_list_item },
                    data: {
                        quantity: Number(existingItem.quantity) + Number(fi.quantity || 1)
                    }
                });
            } else {
                await prisma.shopping_list_items.create({
                    data: {
                        id_shopping_list: shoppingList.id_shopping_list,
                        id_ingredient: fi.id_ingredient,
                        quantity: fi.quantity || 1,
                        unit: fi.ingredients?.unit || 'phần',
                        is_checked: false
                    }
                });
                addedCount++;
            }
        }

        return res.json({
            success: true,
            message: `Đã thêm các nguyên liệu của món "${food.name}" vào danh sách đi chợ!`,
            food_name: food.name,
            id_shopping_list: shoppingList.id_shopping_list
        });
    } catch (error) {
        console.error('Lỗi khi thêm món vào danh sách đi chợ:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể thêm món vào danh sách đi chợ lúc này.'
        });
    }
}

/**
 * Thêm một nguyên liệu tự nhập vào danh sách đi chợ
 */
async function addCustomItem(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập.'
            });
        }

        const name = String(req.body.name || '').trim();
        const quantity = Math.max(0.1, Number(req.body.quantity) || 1);
        const unit = String(req.body.unit || 'cái').trim();

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập tên nguyên liệu.'
            });
        }

        // Tìm hoặc tạo nguyên liệu
        let ingredient = await prisma.ingredients.findUnique({
            where: { name }
        });

        if (!ingredient) {
            ingredient = await prisma.ingredients.create({
                data: {
                    name,
                    unit: unit || 'cái'
                }
            });
        }

        // Tìm hoặc tạo danh sách chung (không gắn với món cụ thể)
        let list = await prisma.shopping_lists.findFirst({
            where: {
                id_user: req.user.id_user,
                id_food: null
            }
        });

        if (!list) {
            list = await prisma.shopping_lists.create({
                data: {
                    id_user: req.user.id_user,
                    id_food: null
                }
            });
        }

        const existingItem = await prisma.shopping_list_items.findUnique({
            where: {
                id_shopping_list_id_ingredient: {
                    id_shopping_list: list.id_shopping_list,
                    id_ingredient: ingredient.id_ingredient
                }
            }
        });

        let item;
        if (existingItem) {
            item = await prisma.shopping_list_items.update({
                where: { id_shopping_list_item: existingItem.id_shopping_list_item },
                data: {
                    quantity: Number(existingItem.quantity) + quantity
                }
            });
        } else {
            item = await prisma.shopping_list_items.create({
                data: {
                    id_shopping_list: list.id_shopping_list,
                    id_ingredient: ingredient.id_ingredient,
                    quantity: quantity,
                    unit: unit,
                    is_checked: false
                }
            });
        }

        return res.json({
            success: true,
            message: `Đã thêm "${name}" vào danh sách đi chợ!`,
            item
        });
    } catch (error) {
        console.error('Lỗi khi thêm nguyên liệu tùy chỉnh:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể thêm nguyên liệu lúc này.'
        });
    }
}

/**
 * Đánh dấu đã mua / chưa mua nguyên liệu (Toggle Checked)
 */
async function toggleItem(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập.'
            });
        }

        const itemId = Number(req.params.id);
        if (!itemId || Number.isNaN(itemId)) {
            return res.status(400).json({
                success: false,
                message: 'ID nguyên liệu không hợp lệ.'
            });
        }

        const item = await prisma.shopping_list_items.findUnique({
            where: { id_shopping_list_item: itemId },
            include: {
                shopping_lists: true
            }
        });

        if (!item || item.shopping_lists.id_user !== req.user.id_user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy nguyên liệu trong danh sách của bạn.'
            });
        }

        const updated = await prisma.shopping_list_items.update({
            where: { id_shopping_list_item: itemId },
            data: {
                is_checked: !item.is_checked
            }
        });

        return res.json({
            success: true,
            message: updated.is_checked ? 'Đã đánh dấu mua xong!' : 'Đã bỏ đánh dấu mua.',
            is_checked: updated.is_checked,
            id_shopping_list_item: updated.id_shopping_list_item
        });
    } catch (error) {
        console.error('Lỗi khi đổi trạng thái nguyên liệu:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể cập nhật trạng thái lúc này.'
        });
    }
}

/**
 * Xóa một nguyên liệu khỏi danh sách đi chợ
 */
async function deleteItem(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập.'
            });
        }

        const itemId = Number(req.params.id);
        if (!itemId || Number.isNaN(itemId)) {
            return res.status(400).json({
                success: false,
                message: 'ID nguyên liệu không hợp lệ.'
            });
        }

        const item = await prisma.shopping_list_items.findUnique({
            where: { id_shopping_list_item: itemId },
            include: {
                shopping_lists: true
            }
        });

        if (!item || item.shopping_lists.id_user !== req.user.id_user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy nguyên liệu trong danh sách của bạn.'
            });
        }

        await prisma.shopping_list_items.delete({
            where: { id_shopping_list_item: itemId }
        });

        // Kiểm tra nếu danh sách cha không còn nguyên liệu nào thì xóa luôn list đó
        const remainingCount = await prisma.shopping_list_items.count({
            where: { id_shopping_list: item.id_shopping_list }
        });

        if (remainingCount === 0) {
            await prisma.shopping_lists.delete({
                where: { id_shopping_list: item.id_shopping_list }
            });
        }

        return res.json({
            success: true,
            message: 'Đã xóa nguyên liệu khỏi danh sách đi chợ.',
            id_shopping_list_item: itemId
        });
    } catch (error) {
        console.error('Lỗi khi xóa nguyên liệu:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể xóa nguyên liệu lúc này.'
        });
    }
}

/**
 * Xóa toàn bộ danh sách đi chợ của người dùng
 */
async function clearShoppingList(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập.'
            });
        }

        await prisma.shopping_lists.deleteMany({
            where: {
                id_user: req.user.id_user
            }
        });

        return res.json({
            success: true,
            message: 'Đã dọn sạch danh sách đi chợ.'
        });
    } catch (error) {
        console.error('Lỗi khi dọn dẹp danh sách đi chợ:', error);
        return res.status(500).json({
            success: false,
            message: 'Không thể dọn sạch danh sách đi chợ lúc này.'
        });
    }
}

module.exports = {
    getShoppingList,
    addFoodToShoppingList,
    addCustomItem,
    toggleItem,
    deleteItem,
    clearShoppingList
};
