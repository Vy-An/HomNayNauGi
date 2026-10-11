const express = require('express');
const postController = require('../controllers/post.controller');
const { requireAuth, optionalAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', optionalAuth, postController.getPosts);
router.get('/featured', postController.featuredPosts);
router.get('/:id', optionalAuth, postController.getPostById);
router.post('/', requireAuth, postController.createPost);
router.post('/:id/like', requireAuth, postController.toggleLike);

module.exports = router;
