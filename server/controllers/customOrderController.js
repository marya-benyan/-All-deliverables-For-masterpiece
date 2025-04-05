const CustomOrder = require('../models/CustomOrder');

exports.getCustomOrders = async (req, res) => {
  try {
    const customOrders = await CustomOrder.find().populate('user');
    res.json(customOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// باقي الدوال (createCustomOrder, updateCustomOrder, deleteCustomOrder) زي ما كتبناهم قبل كده
exports.createCustomOrder = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    const { name, designDescription, message, material } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    if (!name || !designDescription) {
      return res.status(400).json({ error: "الاسم والوصف مطلوبان" });
    }

    let priceRange;
    switch (material) {
      case 'mosaic':
        priceRange = { min: 50, max: 150 };
        break;
      case 'charcoal':
        priceRange = { min: 20, max: 60 };
        break;
      case 'acrylic':
        priceRange = { min: 30, max: 90 };
        break;
      default:
        priceRange = { min: 20, max: 100 };
    }

    const customOrder = new CustomOrder({
      user: req.user.id,
      name,
      designDescription,
      images,
      message,
      priceRange,
      status: 'قيد التنفيذ',
    });

    const newCustomOrder = await customOrder.save();
    console.log('Custom order saved:', newCustomOrder);
    res.status(201).json(newCustomOrder);
  } catch (error) {
    console.error('Create custom order error:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateCustomOrder = async (req, res) => {
  try {
    const customOrder = await CustomOrder.findById(req.params.id);
    if (!customOrder) {
      return res.status(404).json({ error: 'Custom order not found' });
    }
    customOrder.designDescription = req.body.designDescription || customOrder.designDescription;
    customOrder.message = req.body.message || customOrder.message;
    customOrder.status = req.body.status || customOrder.status;
    if (req.files && req.files.length > 0) {
      customOrder.images = req.files.map(file => file.path);
    }
    const updatedCustomOrder = await customOrder.save();
    res.json(updatedCustomOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCustomOrder = async (req, res) => {
  try {
    const customOrder = await CustomOrder.findById(req.params.id);
    if (!customOrder) {
      return res.status(404).json({ error: 'Custom order not found' });
    }
    await customOrder.remove();
    res.json({ message: 'Custom order deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};