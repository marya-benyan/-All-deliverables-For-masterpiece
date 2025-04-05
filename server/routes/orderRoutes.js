const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", isAuthenticated, orderController.getOrders); // تأكد من أن getOrders معرفة في orderController
router.get("/:id", isAuthenticated, orderController.getOrderById); // تأكد من أن getOrderById معرفة في orderController
router.post("/", isAuthenticated, orderController.createOrder); // تأكد من أن createOrder معرفة في orderController
router.put("/:id", isAuthenticated, orderController.updateOrderStatus); // تأكد من أن updateOrderStatus معرفة في orderController

module.exports = router;
