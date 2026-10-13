const express = require('express');
const shoppingController = require('../controllers/shopping.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(requireAuth);

router.get('/', shoppingController.getShoppingList);
router.post('/add-food', shoppingController.addFoodToShoppingList);
router.post('/add-item', shoppingController.addCustomItem);
router.patch('/items/:id/toggle', shoppingController.toggleItem);
router.delete('/items/:id', shoppingController.deleteItem);
router.delete('/clear', shoppingController.clearShoppingList);

module.exports = router;
