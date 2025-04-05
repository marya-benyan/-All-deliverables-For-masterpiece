const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");  // تأكد من المسار

router.post("/", paymentController.processPayment);  // تأكد من أن الدالة معرفّة
router.get("/:orderId", paymentController.getPaymentStatus);

module.exports = router;
