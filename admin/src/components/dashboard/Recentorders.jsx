export default function RecentOrders({ orders }) {
  const statusStyles = {
    paid: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    processing: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
    pending: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    cancelled: "bg-rose-500/15 text-rose-400 border border-rose-500/20",
  };

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  return (
    <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-white">Pesanan Terbaru</h2>
        <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
          Lihat semua →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/30 text-xs uppercase tracking-wider">
              <th className="text-left pb-3 font-medium">ID Pesanan</th>
              <th className="text-left pb-3 font-medium">Pelanggan</th>
              <th className="text-left pb-3 font-medium hidden md:table-cell">
                Produk
              </th>
              <th className="text-left pb-3 font-medium">Total</th>
              <th className="text-left pb-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/3 transition-colors">
                <td className="py-3 text-violet-400 font-mono text-xs">
                  #{order.id}
                </td>

                <td className="py-3 text-white/80">
                  {order.user?.name || "User"}
                </td>

                <td className="py-3 text-white/50 hidden md:table-cell">
                  {order.product?.name || "-"}
                </td>

                <td className="py-3 text-white font-medium">
                  {formatRupiah(order.totalPrice)}
                </td>

                <td className="py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      statusStyles[order.status] ||
                      "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center text-white/40 py-4">Belum ada pesanan</p>
        )}
      </div>
    </div>
  );
}
