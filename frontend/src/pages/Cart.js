import React from "react";

export default function Cart({ cartItems, removeFromCart, updateCartQty }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
      <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <div>
          <div style={{
            display: "flex",
            fontWeight: 600,
            padding: "12px 0",
            borderBottom: "2px solid #eee",
            fontSize: 18
          }}>
            <div style={{ flex: 2 }}>Product</div>
            <div style={{ flex: 1, textAlign: "center" }}>Price</div>
            <div style={{ flex: 1, textAlign: "center" }}>Qty</div>
            <div style={{ flex: 1, textAlign: "center" }}>Subtotal</div>
            <div style={{ width: 60 }}></div>
          </div>
          {cartItems.map((item) => (
            console.log("item is actually: ", item),
            <div key={item._id} style={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #eee",
              padding: "18px 0"
            }}>
              <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
                <img
                  src={item.image && item.image.trim() !== "" ? "assets/angular.png" : "assets/angular.png"}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'assets/angular.png'; }}
                  alt={item.name}
                  style={{ width: 64, height: 64, borderRadius: 8, marginRight: 18, background: "#f7f7f7" }}
                />
                <span style={{ fontWeight: 500, fontSize: 18 }}>{item.name}</span>
              </div>
              <div style={{ flex: 1, textAlign: "center", fontWeight: 600, color: "#0a7", fontSize: 17 }}>
                ${item.price.toFixed(2)}
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={e => updateCartQty(item._id, Number(e.target.value))}
                  style={{ width: 48, padding: 4, fontSize: 16, borderRadius: 4, border: "1px solid #ccc", textAlign: "center" }}
                />
              </div>
              <div style={{ flex: 1, textAlign: "center", fontWeight: 500, fontSize: 17 }}>
                ${(item.price * item.qty).toFixed(2)}
              </div>
              <div style={{ width: 60, textAlign: "center" }}>
                <button
                  style={{ color: "#fff", background: "#d32f2f", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontWeight: 600 }}
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{ textAlign: "right", fontSize: 22, fontWeight: 700, marginTop: 32 }}>
            Total: ${total.toFixed(2)}
          </div>
          <div style={{ textAlign: "right", marginTop: 18 }}>
            <button style={{ padding: "12px 32px", background: "#0a7", color: "#fff", fontWeight: 700, fontSize: 18, borderRadius: 8, border: "none", cursor: "pointer" }}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
