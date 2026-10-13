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
router.post('/me/favorites/:id', requireAuth, authController.addFavorite);
router.post('/me/favorites', requireAuth, authController.addFavorite);
router.delete('/me/favorites/:id', requireAuth, authController.removeFavorite);

module.exports = router;
