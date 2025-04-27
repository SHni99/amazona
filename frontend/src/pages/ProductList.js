import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [clickedId, setClickedId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setClickedId('add');
    const res = await fetch("/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
      }),
    });
    if (res.ok) {
      setForm({ name: "", description: "", price: "" });
      setShowForm(false);
      fetchProducts();
    }
    setTimeout(() => setClickedId(null), 500);
  };

  const handleDelete = async (id) => {
    setClickedId(id);
    await fetch(`/products/${id}`, { method: "DELETE" });
    fetchProducts();
    setTimeout(() => setClickedId(null), 500);
  };

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Product List</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`bg-gray-800 text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-gray-900 transition ${clickedId === 'toggle' ? 'cursor-progress' : 'cursor-pointer'}`}
          onMouseDown={() => setClickedId('toggle')}
          onMouseUp={() => setClickedId(null)}
        >
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow mb-8 flex flex-col gap-4 max-w-lg">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input name="name" value={form.name} onChange={handleInput} required className="w-full border border-gray-300 rounded px-3 py-2 text-lg" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea name="description" value={form.description} onChange={handleInput} required className="w-full border border-gray-300 rounded px-3 py-2 text-lg" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Price</label>
            <input name="price" type="number" step="0.01" value={form.price} onChange={handleInput} required className="w-full border border-gray-300 rounded px-3 py-2 text-lg" />
          </div>
          <button
            type="submit"
            className={`bg-primary-600 text-white font-semibold px-6 py-2 rounded-md mt-2 shadow ${clickedId === 'add' ? 'cursor-progress' : 'cursor-pointer'}`}
          >
            Add Product
          </button>
        </form>
      )}
      {loading ? (
        <div className="text-center py-8 text-xl text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              addToCart={addToCart}
              onDelete={() => handleDelete(p._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
