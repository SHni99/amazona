const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Product Schema/Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  brand: { type: String, default: '' },
  category: { type: String, default: '' },
  countInStock: { type: Number, default: 0 }
}, { timestamps: true, id: false });

const Product = mongoose.model('Product', productSchema);

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Get product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params._id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

// Create a new product
app.post('/products', async (req, res) => {
  const { name, description, price, image, brand, category, countInStock } = req.body;
  
  if (!name || !description || typeof price !== 'number') {
    return res.status(400).json({ message: 'Invalid product data' });
  }
  
  try {
    const newProduct = new Product({ 
      name, 
      description, 
      price,
      image: image || '',
      brand: brand || '',
      category: category || '',
      countInStock: countInStock || 0
    });
    
    const savedProduct = await newProduct.save();
    console.log('Product saved to MongoDB:', savedProduct);
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Failed to create product', error: err.message });
  }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const removed = await Product.findByIdAndDelete(req.params._id);
    if (!removed) return res.status(404).json({ message: 'Product not found' });
    res.json(removed);
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

// Update a product
app.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
