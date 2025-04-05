const { Category } = require('../models');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ error: "خطأ في جلب قائمة الأصناف" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Create category error:", error);
    res.status(400).json({ error: error.message });
  }
};