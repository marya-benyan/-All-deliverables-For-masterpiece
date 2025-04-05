const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router.get('/', categoryController.getCategories);
router.post('/', isAuthenticated, isAdmin, categoryController.createCategory);

module.exports = router;