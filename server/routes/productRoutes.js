const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/', // تأكدي إن المجلد موجود
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', (req, res, next) => {
    res.set('Cache-Control', 'no-store'); // منع الـ caching
    next();
  }, productController.getProducts);router.get('/:id', productController.getProductById); // جلب منتج معين بـ ID
router.post('/', isAuthenticated, upload.array('images'), productController.addProduct); // إضافة منتج (للـ admin)
router.post('/custom', isAuthenticated, upload.single('image'), productController.addCustomProduct); // إضافة منتج مخصص (للمستخدمين)

module.exports = router;