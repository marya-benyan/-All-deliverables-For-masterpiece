const { Product } = require('../models');
const path = require('path');
const fs = require('fs');

exports.getProducts = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');

    const { category, price, search, sort, page = 1, limit = 6 } = req.query;

    let query = {};
    if (category) query.category_id = category;
    if (price && price !== 'price-all') {
      const [minPrice, maxPrice] = price.split('-').map(Number);
      query.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (search) query.name = { $regex: search, $options: 'i' };

    let sortOption = {};
    switch (sort) {
      case 'latest':
        sortOption = { createdAt: -1 };
        break;
      case 'popularity':
        sortOption = { popularity: -1 };
        break;
      case 'best rating':
        sortOption = { rating: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .populate('category_id', 'name');

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limitNum);

    res.json({
      products,
      totalPages,
      currentPage: pageNum,
      totalProducts,
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'خطأ في جلب قائمة المنتجات' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category_id', 'name');
    if (!product) {
      return res.status(404).json({ error: 'المنتج غير موجود' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({ error: 'خطأ في جلب تفاصيل المنتج' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);
    const { name, description, price, category_id, stock } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];

    if (!name || !price || !category_id || stock === undefined || stock === '') {
      console.log('Missing fields:', { name, price, category_id, stock });
      return res.status(400).json({ error: 'جميع الحقول المطلوبة يجب توفيرها' });
    }

    const stockValue = parseInt(stock, 10);
    if (isNaN(stockValue) || stockValue < 0) {
      console.log('Invalid stock value:', stock);
      return res.status(400).json({ error: 'الستوك يجب أن يكون رقم صحيح غير سالب' });
    }

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      category_id,
      stock: stockValue,
      images,
      createdBy: req.user?.id,
    });

    const newProduct = await product.save();
    console.log('New product saved:', newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ error: 'خطأ في إضافة المنتج' });
  }
};

exports.addCustomProduct = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !price) {
      console.log('Missing required fields:', { name, price });
      return res.status(400).json({ error: 'الاسم والسعر مطلوبان' });
    }

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      stock: 1,
      images: image ? [image] : [],
      category_id: null,
      isCustom: true,
      createdBy: req.user?.id,
    });

    const newProduct = await product.save();
    console.log('Custom product saved:', newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Add custom product error:', error);
    res.status(500).json({ error: 'خطأ في إضافة المنتج المخصص' });
  }
};