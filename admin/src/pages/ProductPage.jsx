import { useState, useEffect } from "react";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";
import { X, ImagePlus, Pencil, Trash2, Plus, ChevronLeft } from "lucide-react";
import { formatPrice } from "../lib/formatPrice.js";

const availableSizes = ["S", "M", "L", "XL"];
const emptyForm = { name: "", price: "", description: "" };

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [view, setView] = useState("list"); // "list" | "create" | "edit"
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [stocks, setStocks] = useState({});
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setSelectedSizes([]);
    setStocks({});
    setImages([]);
    setPreviews([]);
    setEditingProduct(null);
  };

  const openCreate = () => {
    resetForm();
    setView("create");
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description || "",
    });
    const sizeNames = product.sizes.map((s) => s.size);
    const stockMap = {};
    product.sizes.forEach((s) => {
      stockMap[s.size] = String(s.stock);
    });
    setSelectedSizes(sizeNames);
    setStocks(stockMap);
    setImages([]);
    setPreviews(product.images || []);
    setView("edit");
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus produk ini?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus produk");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (view === "create" && images.length < 3) {
      alert("Upload minimal 3 foto produk!");
      return;
    }
    if (selectedSizes.length === 0) {
      alert("Pilih minimal 1 ukuran!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);

      const sizes = selectedSizes.map((size) => ({
        size,
        stock: parseInt(stocks[size] || 0),
      }));
      formData.append("sizes", JSON.stringify(sizes));
      images.forEach((img) => formData.append("images", img));

      if (view === "edit") {
        await updateProduct(editingProduct.id, formData);
        alert("Produk berhasil diupdate!");
      } else {
        await createProduct(formData);
        alert("Produk berhasil dibuat!");
      }

      resetForm();
      setView("list");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal menyimpan produk");
    } finally {
      setLoading(false);
    }
  };

  // ─── LIST VIEW ───────────────────────────────────────────
  if (view === "list") {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Produk</h1>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 transition-colors rounded-lg text-sm font-medium text-white"
          >
            <Plus size={16} /> Tambah Produk
          </button>
        </div>

        {loadingProducts ? (
          <p className="text-white/30 text-sm">Loading...</p>
        ) : products.length === 0 ? (
          <div className="bg-[#141418] border border-white/5 rounded-2xl p-10 text-center">
            <p className="text-white/20 text-sm">Belum ada produk</p>
          </div>
        ) : (
          <div className="bg-[#141418] border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-white/5">
                <tr className="text-white/30 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-medium">Produk</th>
                  <th className="text-left px-5 py-3 font-medium hidden md:table-cell">
                    Harga
                  </th>
                  <th className="text-left px-5 py-3 font-medium hidden md:table-cell">
                    Ukuran & Stok
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-white/80 font-medium">{p.name}</p>
                          <p className="text-white/30 text-xs">
                            {p.description?.slice(0, 40)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-white/60 hidden md:table-cell">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {p.sizes.map((s) => (
                          <span
                            key={s.size}
                            className={`px-2 py-0.5 rounded text-xs border ${
                              s.stock === 0
                                ? "border-white/5 text-white/20"
                                : "border-white/10 text-white/50"
                            }`}
                          >
                            {s.size} ({s.stock})
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-violet-500/20 text-white/30 hover:text-violet-400 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-white/30 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // ─── CREATE / EDIT VIEW ──────────────────────────────────
  return (
    <div className="max-w-2xl space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            resetForm();
            setView("list");
          }}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="text-xl font-semibold text-white">
          {view === "edit" ? "Edit Produk" : "Tambah Produk"}
        </h1>
      </div>

      {/* Info */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl p-5 space-y-4">
        <h2 className="font-semibold text-white mb-2">Informasi Produk</h2>
        <div>
          <label className="block text-xs text-white/30 mb-1.5">
            Nama Produk
          </label>
          <input
            type="text"
            name="name"
            placeholder="Masukkan nama produk"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 outline-none focus:border-violet-500/50 transition-colors placeholder:text-white/20"
          />
        </div>
        <div>
          <label className="block text-xs text-white/30 mb-1.5">
            Harga (Rp)
          </label>
          <input
            type="number"
            name="price"
            placeholder="Masukkan harga"
            value={form.price}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 outline-none focus:border-violet-500/50 transition-colors placeholder:text-white/20"
          />
        </div>
        <div>
          <label className="block text-xs text-white/30 mb-1.5">
            Deskripsi
          </label>
          <textarea
            name="description"
            placeholder="Masukkan deskripsi produk"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 outline-none focus:border-violet-500/50 transition-colors placeholder:text-white/20 resize-none"
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl p-5 space-y-4">
        <h2 className="font-semibold text-white">Ukuran & Stok</h2>
        <div className="flex gap-2">
          {availableSizes.map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                selectedSizes.includes(size)
                  ? "bg-violet-600 border-violet-600 text-white"
                  : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {selectedSizes.length > 0 && (
          <div className="space-y-2">
            {selectedSizes.map((size) => (
              <div key={size} className="flex items-center gap-3">
                <span className="text-sm text-white/60 w-8">{size}</span>
                <input
                  type="number"
                  placeholder="Jumlah stok"
                  value={stocks[size] ?? ""}
                  onChange={(e) =>
                    setStocks({ ...stocks, [size]: e.target.value })
                  }
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 outline-none focus:border-violet-500/50 transition-colors placeholder:text-white/20"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Images */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white">Foto Produk</h2>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border ${
              previews.length >= 3
                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                : "text-amber-400 bg-amber-500/10 border-amber-500/20"
            }`}
          >
            {previews.length}/3 foto {previews.length < 3 ? "(minimal 3)" : "✓"}
          </span>
        </div>

        {previews.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {previews.map((src, i) => (
              <div key={i} className="relative w-24 h-24">
                <img
                  src={src}
                  alt={`preview-${i}`}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center"
                >
                  <X size={10} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-white/10 rounded-xl py-6 cursor-pointer hover:border-violet-500/40 transition-colors">
          <ImagePlus size={24} className="text-white/20" />
          <span className="text-sm text-white/30">
            {view === "edit"
              ? "Upload foto baru (opsional)"
              : "Klik untuk upload foto"}
          </span>
          <span className="text-xs text-white/20">
            JPG, PNG, WEBP — Minimal 3 foto
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 transition-colors rounded-xl text-sm font-semibold text-white"
      >
        {loading
          ? "Menyimpan..."
          : view === "edit"
            ? "Simpan Perubahan"
            : "Simpan Produk"}
      </button>
    </div>
  );
}
