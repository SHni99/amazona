const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4004;

app.use(cors());
app.use(express.json());

// Basic in-memory payment store
const payments = [];

// Process a payment
app.post('/payments', (req, res) => {
  const { orderId, amount, method } = req.body;
  
  if (!orderId || !amount || !method) {
    return res.status(400).json({ error: 'Order ID, amount, and payment method are required' });
  }
  
  // In a real application, you would integrate with a payment gateway here
  const payment = {
    id: Date.now().toString(),
    orderId,
    amount,
    method,
    status: 'completed',
    timestamp: new Date().toISOString()
  };
  
  payments.push(payment);
  
  res.status(201).json(payment);
});

// Get payment by ID
app.get('/payments/:id', (req, res) => {
  const { id } = req.params;
  const payment = payments.find(p => p._id === id);
  
  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }
  
  res.json(payment);
});

// Get payments by order ID
app.get('/payments/order/:orderId', (req, res) => {
  const { orderId } = req.params;
  const orderPayments = payments.filter(p => p.orderId === orderId);
  
  res.json(orderPayments);
});

// Get all payments
app.get('/payments', (req, res) => {
  res.json(payments);
});

app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});
