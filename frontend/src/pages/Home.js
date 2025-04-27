import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(90deg, #f5f6fa 60%, #e0f7fa 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start"
    }}>
      {/* Announcement Section */}
      <div style={{
        width: "100%",
        background: "#ffe082",
        padding: "18px 0",
        textAlign: "center",
        fontWeight: 700,
        fontSize: 22,
        color: "#7a5600",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        letterSpacing: 1
      }}>
        <span role="img" aria-label="announcement" style={{ marginRight: 8 }}>📢</span>
        Big Spring Sale! Save up to 40% on select categories. Free shipping for orders over $50!
      </div>
      {/* Main Welcome Card */}
      <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        padding: "48px 40px",
        textAlign: "center",
        maxWidth: 480,
        marginTop: 48
      }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 12, color: "#0a7" }}>Amazona</h1>
        <p style={{ fontSize: 20, color: "#333", marginBottom: 28 }}>
          Shop from a wide range of products, with fast delivery and great deals!
        </p>
        <Link to="/products" style={{
          display: "inline-block",
          padding: "14px 36px",
          background: "#0a7",
          color: "#fff",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 18,
          textDecoration: "none",
          boxShadow: "0 2px 8px rgba(10,167,120,0.08)",
          transition: "background 0.2s"
        }}>
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
