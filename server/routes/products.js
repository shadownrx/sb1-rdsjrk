import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', adminMiddleware, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

router.post('/purchase/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (user.exp < product.price) {
      return res.status(400).json({ message: 'Insufficient EXP' });
    }
    user.exp -= product.price;
    await user.save();
    res.json({ message: 'Product purchased successfully', newExp: user.exp });
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing product', error: error.message });
  }
});

export default router;