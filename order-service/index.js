const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Placeholder: In-memory orders
const orders = [];

app.post('/order', (req, res) => {
  const { email, items, total } = req.body;
  const order = { id: orders.length + 1, email, items, total, date: new Date().toISOString() };
  orders.push(order);
  res.json({ message: 'Order placed', order });
});

app.get('/orders/:email', (req, res) => {
  const userOrders = orders.filter(o => o.email === req.params.email);
  res.json(userOrders);
});

app.listen(4003, () => console.log('Order service running on port 4003'));
