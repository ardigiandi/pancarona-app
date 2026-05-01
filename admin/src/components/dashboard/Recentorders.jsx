const orders = [
  { id: "#ORD-001", customer: "Budi Santoso", product: "MacBook Pro", amount: "Rp 24.500.000", status: "Selesai" },
  { id: "#ORD-002", customer: "Siti Rahayu", product: "iPhone 15 Pro", amount: "Rp 18.900.000", status: "Proses" },
  { id: "#ORD-003", customer: "Andi Wijaya", product: "Samsung Galaxy S24", amount: "Rp 12.300.000", status: "Pending" },
  { id: "#ORD-004", customer: "Dewi Lestari", product: "iPad Air", amount: "Rp 9.800.000", status: "Selesai" },
  { id: "#ORD-005", customer: "Riko Pratama", product: "AirPods Pro", amount: "Rp 3.200.000", status: "Batal" },
];

const statusStyles = {
  Selesai: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  Proses: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  Pending: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  Batal: "bg-rose-500/15 text-rose-400 border border-rose-500/20",
};

export default function RecentOrders() {
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
              <th className="text-left pb-3 font-medium hidden md:table-cell">Produk</th>
              <th className="text-left pb-3 font-medium">Total</th>
              <th className="text-left pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/3 transition-colors">
                <td className="py-3 text-violet-400 font-mono text-xs">{order.id}</td>
                <td className="py-3 text-white/80">{order.customer}</td>
                <td className="py-3 text-white/50 hidden md:table-cell">{order.product}</td>
                <td className="py-3 text-white font-medium">{order.amount}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}