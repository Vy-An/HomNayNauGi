const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.get('/featured', postController.featuredPosts);

module.exports = router;
