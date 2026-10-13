const express = require('express');
const authController = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', requireAuth, authController.logout);
router.get('/me', requireAuth, authController.getMe);
router.patch('/me', requireAuth, authController.updateProfile);
router.get('/me/posts', requireAuth, authController.getMyPosts);
router.get('/me/favorites', requireAuth, authController.getMyFavorites);
<<<<<<< HEAD
router.post('/me/favorites', requireAuth, authController.toggleFavorite);
router.post('/me/favorites/toggle', requireAuth, authController.toggleFavorite);
router.post('/me/favorites/:id/toggle', requireAuth, authController.toggleFavorite);
=======
router.post('/me/favorites/:id', requireAuth, authController.toggleFavorite);
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
router.delete('/me/favorites/:id', requireAuth, authController.removeFavorite);

module.exports = router;
