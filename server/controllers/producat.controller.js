const Product = require("../models/Tour.model");

// Create Product (Admin)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, stock } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      subCategory,
      stock,
      images: req.body.images || [], // لو هترفع Cloudinary urls من الـ frontend
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all products (with pagination & search)
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", category } = req.query;

    const filter = {};
    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update product (Admin)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete product (Admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};