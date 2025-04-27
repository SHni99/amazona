import React from "react";

export default function Profile() {
  // Placeholder: Replace with real user data
  const user = { name: "John Doe", email: "john@example.com" };
  const orders = [
    { id: 1, total: 59.98, date: "2025-04-01" },
    { id: 2, total: 19.99, date: "2025-03-28" },
  ];
  return (
    <div style={{ padding: 24 }}>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <h3>Order History</h3>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order #{order._id} - ${order.total} - {order.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
