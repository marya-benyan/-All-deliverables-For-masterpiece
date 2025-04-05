const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { isAuthenticated } = require("../middleware/authMiddleware"); // إذا كنت بحاجة للتوثيق

// تحقق من صحة التوثيق عند الوصول إلى هذه المسارات إذا لزم الأمر
router.get("/", isAuthenticated, cartController.getCart); // تأكد أن `getCart` هي دالة صحيحة في `cartController.js`
router.post("/", isAuthenticated, cartController.addToCart);
router.delete("/:productId", isAuthenticated, cartController.removeFromCart);

module.exports = router;
