const express = require('express');
const adminController = require('../controllers/admin.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/admin.middleware');

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get('/dashboard', adminController.getDashboard);
router.get('/users', adminController.getUsers);
router.post('/users', adminController.createUser);
router.get('/users/:id', adminController.getUserById);
router.patch('/users/:id/status', adminController.updateUserStatus);
router.get('/foods/options', adminController.getFoodOptions);
router.get('/foods', adminController.getFoods);
router.post('/foods', adminController.createFood);
router.get('/foods/:id', adminController.getFoodById);
router.patch('/foods/:id', adminController.updateFood);
router.patch('/foods/:id/status', adminController.updateFoodStatus);

<<<<<<< HEAD
// Categories
router.get('/categories', adminController.getCategories);
router.post('/categories', adminController.createCategory);
router.patch('/categories/:id', adminController.updateCategory);
router.patch('/categories/:id/status', adminController.updateCategoryStatus);

// Community Posts
router.get('/posts', adminController.getAdminPosts);
router.patch('/posts/:id/status', adminController.updatePostStatus);

// Community Reports
router.get('/reports', adminController.getAdminReports);
router.patch('/reports/:id', adminController.handleAdminReport);
=======
// Quản lý danh mục món ăn
router.get('/categories', adminController.getCategories);
router.post('/categories', adminController.createCategory);
router.get('/categories/:id', adminController.getCategoryById);
router.patch('/categories/:id', adminController.updateCategory);
router.put('/categories/:id', adminController.updateCategory);
router.patch('/categories/:id/status', adminController.updateCategoryStatus);

// Quản lý bài viết cộng đồng (Kiểm duyệt & Báo cáo)
router.get('/posts', adminController.getPosts);
router.get('/posts/:id', adminController.getPostById);
router.patch('/posts/:id/status', adminController.updatePostStatus);
router.put('/posts/:id/status', adminController.updatePostStatus);
router.delete('/posts/:id', adminController.deletePost);
router.get('/reports', adminController.getReports);
router.patch('/reports/:id/status', adminController.updateReportStatus);
router.put('/reports/:id/status', adminController.updateReportStatus);
router.patch('/comments/:id/status', adminController.updateCommentStatus);
>>>>>>> origin/develop

module.exports = router;
