import React from "react";

export default function Login() {
  return (
    <div style={{ padding: 24, maxWidth: 320, margin: "auto" }}>
      <h2>Login</h2>
      <form>
        <div style={{ marginBottom: 12 }}>
          <input type="email" placeholder="Email" style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input type="password" placeholder="Password" style={{ width: "100%", padding: 8 }} />
        </div>
        <button type="submit" style={{ width: "100%", padding: 8 }}>Login</button>
      </form>
      <p style={{ marginTop: 16 }}>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
