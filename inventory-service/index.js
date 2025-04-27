const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4005;

app.use(cors());
app.use(express.json());

// Basic in-memory inventory store
const inventory = {
  items: {
    // productId: quantity
  }
};

// Get inventory for a product
app.get('/inventory/:productId', (req, res) => {
  const { productId } = req.params;
  const quantity = inventory.items[productId] || 0;
  
  res.json({
    productId,
    quantity,
    inStock: quantity > 0
  });
});

// Get all inventory
app.get('/inventory', (req, res) => {
  const items = Object.entries(inventory.items).map(([productId, quantity]) => ({
    productId,
    quantity,
    inStock: quantity > 0
  }));
  
  res.json(items);
});

// Update inventory
app.put('/inventory/:productId', (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  
  if (quantity === undefined) {
    return res.status(400).json({ error: 'Quantity is required' });
  }
  
  inventory.items[productId] = quantity;
  
  res.json({
    productId,
    quantity,
    inStock: quantity > 0
  });
});

// Add some sample data
inventory.items['123'] = 10;
inventory.items['456'] = 5;
inventory.items['789'] = 0;

app.listen(PORT, () => {
  console.log(`Inventory service running on port ${PORT}`);
});
