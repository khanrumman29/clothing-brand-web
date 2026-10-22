import { Product } from '../models/Product.js';
import { defaultProducts } from '../data/initialData.js';
import { isDbConnected } from '../config/db.js';

// In-memory fallback product list
let inMemoryProducts = defaultProducts.map((p, idx) => ({
  ...p,
  _id: `mock-prod-${idx + 1}`
}));

/**
 * @desc    Get all products (with optional filtering)
 * @route   GET /api/products
 * @access  Public
 */
export const getAllProducts = async (req, res) => {
  const { category, gender, search } = req.query;

  try {
    if (isDbConnected()) {
      const query = {};
      if (category && category !== 'All') {
        query.category = new RegExp(category, 'i');
      }
      if (gender && gender !== 'All') {
        query.gender = new RegExp(gender, 'i');
      }
      if (search) {
        query.$or = [
          { name: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') }
        ];
      }

      const products = await Product.find(query).sort({ createdAt: -1 });

      if (products && products.length > 0) {
        return res.json({
          success: true,
          count: products.length,
          source: 'database',
          data: products
        });
      }
    }

    // Fallback in-memory filter
    let results = [...inMemoryProducts];
    if (category && category !== 'All') {
      results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (gender && gender !== 'All') {
      results = results.filter((p) => p.gender.toLowerCase() === gender.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: results.length,
      source: isDbConnected() ? 'default' : 'memory',
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    if (isDbConnected()) {
      const product = await Product.findById(id);
      if (product) {
        return res.json({ success: true, data: product });
      }
    }

    const inMem = inMemoryProducts.find((p) => p._id === id || p.id === id);
    if (!inMem) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: inMem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Admin
 */
export const createProduct = async (req, res) => {
  try {
    const newProductData = req.body;

    if (!newProductData.name || !newProductData.price || !newProductData.image) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and image are required fields!'
      });
    }

    if (isDbConnected()) {
      const created = await Product.create(newProductData);
      return res.status(201).json({
        success: true,
        message: 'Product created successfully in Database',
        data: created
      });
    }

    // In-memory creation
    const newProduct = {
      ...newProductData,
      _id: `mock-prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    inMemoryProducts.unshift(newProduct);

    res.status(201).json({
      success: true,
      message: 'Product created in Memory (Connect MongoDB to save permanently)',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Admin
 */
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (isDbConnected()) {
      const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (updated) {
        return res.json({
          success: true,
          message: 'Product updated successfully in Database',
          data: updated
        });
      }
    }

    const index = inMemoryProducts.findIndex((p) => p._id === id || p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    inMemoryProducts[index] = { ...inMemoryProducts[index], ...req.body };
    res.json({
      success: true,
      message: 'Product updated in Memory',
      data: inMemoryProducts[index]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (isDbConnected()) {
      const deleted = await Product.findByIdAndDelete(id);
      if (deleted) {
        return res.json({ success: true, message: 'Product removed from Database' });
      }
    }

    inMemoryProducts = inMemoryProducts.filter((p) => p._id !== id && p.id !== id);
    res.json({ success: true, message: 'Product removed from Memory' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Seed default catalog
 * @route   POST /api/products/seed
 * @access  Admin
 */
export const seedProducts = async (req, res) => {
  try {
    inMemoryProducts = defaultProducts.map((p, idx) => ({
      ...p,
      _id: `mock-prod-${idx + 1}`
    }));

    if (isDbConnected()) {
      await Product.deleteMany({});
      const seeded = await Product.insertMany(defaultProducts);
      return res.json({
        success: true,
        message: `Successfully seeded ${seeded.length} products to Database!`,
        count: seeded.length
      });
    }

    res.json({
      success: true,
      message: `Seeded ${inMemoryProducts.length} default products in Memory!`,
      count: inMemoryProducts.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
