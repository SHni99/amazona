const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Placeholder: In-memory users
const users = [];

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  users.push({ name, email, password });
  res.json({ message: 'User registered' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
});

app.get('/profile/:email', (req, res) => {
  const user = users.find(u => u.email === req.params.email);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ name: user.name, email: user.email });
});

app.listen(4001, () => console.log('User service running on port 4001'));
