import { Product } from "../Models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, brand, category, price, originalPrice } = req.body;

    if (!name || !brand || !category || !price) {
      return res.status(400).json({
        message: "Name, brand, category, and price are required fields",
      });
    }
    


    const product = new Product({
      ...req.body,
      
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    let {
      page = 1, limit = 16, sortBy = 'createdAt', order = 'desc',
      brand, category, minPrice, maxPrice, search
    } = req.query;

    // safe numeric parsing + bounds
    page = Math.max(1, parseInt(page) || 1);
    limit = Math.min(100, Math.max(1, parseInt(limit) || 16)); // cap limit to 100

    const filter = {};
    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined && minPrice !== '') filter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined && maxPrice !== '') filter.price.$lte = Number(maxPrice);
    }
    if (search) filter.name = { $regex: search, $options: 'i' };

    const sort = {};
    sort[sortBy] = order === 'asc' ? 1 : -1;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(); // faster for read-only

    return res.json({
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
      products
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};