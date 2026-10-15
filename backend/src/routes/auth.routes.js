const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', requireAuth, authController.getMe);
router.patch('/me', requireAuth, authController.updateProfile);
router.get('/me/posts', requireAuth, authController.getMyPosts);
router.get('/me/favorites', requireAuth, authController.getMyFavorites);
<<<<<<< HEAD
router.post('/me/favorites', requireAuth, authController.toggleFavorite);
router.post('/me/favorites/toggle', requireAuth, authController.toggleFavorite);
router.post('/me/favorites/:id/toggle', requireAuth, authController.toggleFavorite);
=======
router.post('/me/favorites/:id', requireAuth, authController.addFavorite);
router.post('/me/favorites', requireAuth, authController.addFavorite);
router.post('/me/favorites/:id/toggle', requireAuth, authController.toggleFavorite);
router.post('/me/favorites/toggle', requireAuth, authController.toggleFavorite);
>>>>>>> origin/develop
router.delete('/me/favorites/:id', requireAuth, authController.removeFavorite);

module.exports = router;