const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4006;

app.use(cors());
app.use(express.json());

// Basic in-memory review store
const reviews = [];

// Create a review
app.post('/reviews', (req, res) => {
  const { productId, userId, rating, comment } = req.body;
  
  if (!productId || !userId || !rating) {
    return res.status(400).json({ error: 'Product ID, user ID, and rating are required' });
  }
  
  const review = {
    id: Date.now().toString(),
    productId,
    userId,
    rating,
    comment: comment || '',
    timestamp: new Date().toISOString()
  };
  
  reviews.push(review);
  
  res.status(201).json(review);
});

// Get reviews by product ID
app.get('/reviews/product/:productId', (req, res) => {
  const { productId } = req.params;
  const productReviews = reviews.filter(r => r.productId === productId);
  
  res.json(productReviews);
});

// Get reviews by user ID
app.get('/reviews/user/:userId', (req, res) => {
  const { userId } = req.params;
  const userReviews = reviews.filter(r => r.userId === userId);
  
  res.json(userReviews);
});

// Get review by ID
app.get('/reviews/:id', (req, res) => {
  const { id } = req.params;
  const review = reviews.find(r => r._id === id);
  
  if (!review) {
    return res.status(404).json({ error: 'Review not found' });
  }
  
  res.json(review);
});

// Get all reviews
app.get('/reviews', (req, res) => {
  res.json(reviews);
});

// Add some sample data
reviews.push({
  id: '1',
  productId: '123',
  userId: 'user1',
  rating: 5,
  comment: 'Great product!',
  timestamp: new Date().toISOString()
});

reviews.push({
  id: '2',
  productId: '123',
  userId: 'user2',
  rating: 4,
  comment: 'Good quality for the price',
  timestamp: new Date().toISOString()
});

app.listen(PORT, () => {
  console.log(`Review service running on port ${PORT}`);
});
