const Payment = require("../models/Payment");

exports.processPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod, amount } = req.body;

        const payment = new Payment({
            user: req.user.id,
            order: orderId,
            paymentMethod,
            amount,
            status: "قيد المعالجة",
        });

        await payment.save();
        res.status(201).json({ message: "تمت عملية الدفع بنجاح", payment });
    } catch (error) {
        res.status(500).json({ error: "خطأ في معالجة الدفع" });
    }
};

exports.getPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const payment = await Payment.findOne({ order: orderId });

        if (!payment) {
            return res.status(404).json({ error: "عملية الدفع غير موجودة" });
        }

        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: "خطأ في جلب حالة الدفع" });
    }
};
