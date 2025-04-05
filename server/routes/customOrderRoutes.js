const express = require('express');
const router = express.Router();
const customOrderController = require('../controllers/customOrderController'); // تأكدي من المسار
const { isAuthenticated } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', customOrderController.getCustomOrders);
router.post('/', isAuthenticated, upload.array('images'), customOrderController.createCustomOrder);
router.put('/:id', isAuthenticated, upload.array('images'), customOrderController.updateCustomOrder);
router.delete('/:id', isAuthenticated, customOrderController.deleteCustomOrder);

module.exports = router;