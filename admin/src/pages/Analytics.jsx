import { useEffect, useState } from "react";
import { api } from "../api/api.js";
import { formatPrice } from "../lib/formatPrice.js";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard")
      .then(({ data }) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-white/30 text-sm">Loading...</p>;
  if (!data) return null;

  const recentOrders = data.recentOrders || [];
  const maxRevenue = Math.max(...recentOrders.map((o) => o.totalPrice), 1);

  return (
    <div className="space-y-5">
      <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-white">5 Order Terakhir</h2>
          <span className="text-xs text-white/40">Revenue per order</span>
        </div>
        <p className="text-white/30 text-xs mb-5">Berdasarkan data terbaru</p>
        <div className="flex items-end gap-3 h-40">
          {recentOrders.map((order, i) => (
            <div
              key={order.id}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div className="w-full flex items-end gap-0.5 h-32">
                <div
                  className="flex-1 bg-violet-500/60 rounded-t-md transition-all duration-500"
                  style={{
                    height: `${(order.totalPrice / maxRevenue) * 100}%`,
                  }}
                  title={formatPrice(order.totalPrice)}
                />
              </div>
              <span className="text-[10px] text-white/30">#{order.id}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-4">Order Terbaru</h2>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-white/60">{order.user.name}</p>
                  <p className="text-xs text-white/20">#{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    {formatPrice(order.totalPrice)}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      order.status === "paid"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : order.status === "pending"
                          ? "bg-amber-500/15 text-amber-400"
                          : order.status === "shipped"
                            ? "bg-blue-500/15 text-blue-400"
                            : "bg-white/5 text-white/30"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ringkasan */}
        <div className="bg-[#141418] border border-white/5 rounded-2xl p-5 space-y-4">
          <h2 className="font-semibold text-white mb-4">Ringkasan</h2>
          {[
            { label: "Total Users", value: data.totalUsers },
            { label: "Total Orders", value: data.totalOrders },
            { label: "Total Products", value: data.totalProducts },
            { label: "Total Revenue", value: formatPrice(data.totalRevenue) },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
            >
              <span className="text-sm text-white/40">{item.label}</span>
              <span className="text-sm font-semibold text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
