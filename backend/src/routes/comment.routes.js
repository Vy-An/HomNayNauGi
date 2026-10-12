const express = require('express');
const commentController = require('../controllers/comment.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.patch('/:id', requireAuth, commentController.updateComment);
router.delete('/:id', requireAuth, commentController.deleteComment);

module.exports = router;
