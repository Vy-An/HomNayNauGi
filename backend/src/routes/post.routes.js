const express = require('express');
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');
const { requireAuth, optionalAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', optionalAuth, postController.getPosts);
router.get('/featured', postController.featuredPosts);
router.post('/', requireAuth, postController.createPost);
router.post('/:id/like', requireAuth, postController.toggleLike);
router.get('/:id/comments', commentController.getCommentsByPost);
router.post('/:id/comments', requireAuth, commentController.createComment);
router.post('/:id/report', requireAuth, postController.reportPost);
router.get('/my-posts', requireAuth, require('../controllers/auth.controller').getMyPosts);
router.get('/me', requireAuth, require('../controllers/auth.controller').getMyPosts);
router.get('/:id', optionalAuth, postController.getPostById);

module.exports = router;
