const Order = require("../models/Order");

// دالة جلب جميع الطلبات
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("products.product");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "خطأ في جلب الطلبات" });
    }
};

// دالة جلب طلب معين
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("products.product");
        if (!order) {
            return res.status(404).json({ error: "الطلب غير موجود" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "خطأ في جلب الطلب" });
    }
};

// دالة إنشاء طلب
exports.createOrder = async (req, res) => {
    try {
        const { items, totalPrice, address } = req.body;

        const order = new Order({
            user: req.user.id,
            products: items,
            totalPrice,
            status: "قيد المعالجة",
            address,
        });

        await order.save();
        res.status(201).json({ message: "تم إنشاء الطلب بنجاح", order });
    } catch (error) {
        res.status(500).json({ error: "خطأ في إنشاء الطلب" });
    }
};

// دالة تحديث حالة الطلب
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body; // استلام الحالة الجديدة من الطلب

        // التأكد من أن الحالة المرسلة هي حالة صالحة
        if (!["قيد التنفيذ", "مكتمل", "ملغي"].includes(status)) {
            return res.status(400).json({ error: "الحالة غير صالحة" });
        }

        // تحديث حالة الطلب بناءً على المعرف
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true } // لإرجاع النسخة المعدلة من الكائن
        );

        if (!order) {
            return res.status(404).json({ error: "الطلب غير موجود" });
        }

        res.json({ message: "تم تحديث حالة الطلب بنجاح", order });
    } catch (error) {
        res.status(500).json({ error: "خطأ في تحديث حالة الطلب" });
    }
};
