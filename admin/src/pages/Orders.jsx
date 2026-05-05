import { useEffect, useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { api } from "../api/api.js";
import { formatPrice } from "../lib/formatPrice.js";

const statusStyles = {
  pending: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  paid: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  shipped: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  done: "bg-white/5 text-white/30 border border-white/10",
  cancelled: "bg-rose-500/15 text-rose-400 border border-rose-500/20",
};

const statusOptions = ["pending", "paid", "shipped", "done", "cancelled"];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null); // ← track order yang di-expand

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal update status");
    }
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.user.name.toLowerCase().includes(search.toLowerCase()) ||
      String(o.id).includes(search);
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const summary = [
    { label: "Total Pesanan", value: orders.length, color: "text-white" },
    {
      label: "Paid",
      value: orders.filter((o) => o.status === "paid").length,
      color: "text-emerald-400",
    },
    {
      label: "Pending",
      value: orders.filter((o) => o.status === "pending").length,
      color: "text-amber-400",
    },
    {
      label: "Cancelled",
      value: orders.filter((o) => o.status === "cancelled").length,
      color: "text-rose-400",
    },
  ];

  if (loading) return <p className="text-white/30 text-sm">Loading...</p>;

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((card) => (
          <div
            key={card.label}
            className="bg-[#141418] border border-white/5 rounded-2xl p-4"
          >
            <p className="text-xs text-white/30 mb-1">{card.label}</p>
            <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex gap-3">
        <div className="flex items-center gap-2 bg-[#141418] border border-white/10 rounded-lg px-3 py-2 flex-1 max-w-xs">
          <Search size={14} className="text-white/30" />
          <input
            placeholder="Cari pesanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-white/60 placeholder:text-white/20 outline-none w-full"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-[#141418] border border-white/10 hover:border-white/20 transition-colors rounded-lg text-sm text-white/50 outline-none cursor-pointer"
        >
          <option value="all">Semua Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/5">
            <tr className="text-white/30 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3 font-medium">ID</th>
              <th className="text-left px-5 py-3 font-medium">Pelanggan</th>
              <th className="text-left px-5 py-3 font-medium hidden md:table-cell">
                Alamat
              </th>
              <th className="text-left px-5 py-3 font-medium">Total</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">
                Tanggal
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-white/20">
                  Tidak ada pesanan
                </td>
              </tr>
            )}
            {filtered.map((order) => (
              <>
                {/* Row utama */}
                <tr
                  key={order.id}
                  className="hover:bg-white/3 transition-colors cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === order.id ? null : order.id)
                  }
                >
                  <td className="px-5 py-3.5 text-violet-400 font-mono text-xs">
                    #{order.id}
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-white/80">{order.user.name}</p>
                    <p className="text-white/30 text-xs">{order.user.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-white/40 text-xs hidden md:table-cell">
                    {order.address}
                  </td>
                  <td className="px-5 py-3.5 text-white font-semibold">
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td
                    className="px-5 py-3.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border outline-none cursor-pointer bg-transparent ${statusStyles[order.status]}`}
                    >
                      {statusOptions.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-[#141418] text-white"
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3.5 text-white/30 text-xs hidden lg:table-cell">
                    {new Date(order.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3.5 text-white/30">
                    {expandedId === order.id ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </td>
                </tr>

                {/* Row expand — detail produk */}
                {expandedId === order.id && (
                  <tr key={`${order.id}-items`} className="bg-white/2">
                    <td colSpan={7} className="px-5 py-4">
                      <p className="text-xs text-white/30 uppercase tracking-wider mb-3">
                        Detail Produk
                      </p>
                      <div className="flex flex-col gap-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <p className="text-white/80 text-sm">
                                {item.name}
                              </p>
                              <p className="text-white/30 text-xs">
                                Size: {item.size}
                              </p>
                            </div>
                            <p className="text-white/50 text-xs">{item.qty}x</p>
                            <p className="text-white text-sm font-semibold">
                              {formatPrice(item.price * item.qty)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
