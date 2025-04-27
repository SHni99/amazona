import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    console.log('Current cart:', cartItems);

    // Make sure product has a valid ID, if not, generate one
    const productWithId = {
      ...product,
    };
    
    console.log('Product with validated ID:', productWithId);

    setCartItems((prev) => {
      // Check if product exists by ID
      const exist = prev.find((item) => item._id === productWithId._id);
      
      if (exist) {
        console.log('Updating existing item:', exist);
        return prev.map((item) =>
          item._id === productWithId._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        console.log('Adding new item to cart');
        return [...prev, { ...productWithId, qty: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const updateCartQty = (productId, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, qty: qty < 1 ? 1 : qty } : item
      )
    );
  };

  return (
    <Router>
      <nav style={{ padding: 16, borderBottom: "1px solid #eee", marginBottom: 24 }}>
        <Link to="/" style={{ marginRight: 16, fontWeight: "bold", fontSize: 24 }}>Amazona</Link>
        <Link to="/products" style={{ marginRight: 16 }}>Products</Link>
        <Link to="/cart" style={{ marginRight: 16 }}>Cart</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateCartQty={updateCartQty} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
