const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "خطأ في جلب سلة المشتريات." });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.json({ message: "تمت إضافة المنتج إلى السلة." });
    } catch (error) {
        res.status(500).json({ error: "خطأ في إضافة المنتج." });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        await Cart.findOneAndUpdate(
            { user: req.user.id },
            { $pull: { items: { product: productId } } },
            { new: true }
        );

        res.json({ message: "تمت إزالة المنتج من السلة." });
    } catch (error) {
        res.status(500).json({ error: "خطأ في إزالة المنتج." });
    }
};
