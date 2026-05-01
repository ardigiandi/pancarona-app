import { useState } from "react";
import { createProduct } from "../services/productService.js";

export default function ProductPage() {
  const availableSizes = ["S", "M", "L", "XL"];

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [stocks, setStocks] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);

      // 🔥 sizes tanpa JSON
      selectedSizes.forEach((size, index) => {
        formData.append(`sizes[${index}][size]`, size);
        formData.append(`sizes[${index}][stock]`, stocks[size] || 0);
      });

      // images
      images.forEach((img) => {
        formData.append("images", img);
      });

      await createProduct(formData);

      alert("Product berhasil dibuat");

      setForm({ name: "", price: "", description: "" });
      setSelectedSizes([]);
      setStocks({});
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Gagal membuat product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* SIZE */}
        <div>
          <p className="mb-2 font-semibold">Sizes</p>
          <div className="flex gap-2 mb-2">
            {availableSizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 border rounded ${
                  selectedSizes.includes(size)
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* STOCK INPUT */}
          {selectedSizes.map((size) => (
            <div key={size} className="flex gap-2 items-center mb-1">
              <span>{size}</span>
              <input
                type="number"
                placeholder="Stock"
                value={stocks[size] || ""}
                onChange={(e) =>
                  setStocks({ ...stocks, [size]: e.target.value })
                }
                className="border p-1 w-24"
              />
            </div>
          ))}
        </div>

        {/* IMAGES */}
        <input type="file" multiple onChange={handleImageChange} />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Loading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
