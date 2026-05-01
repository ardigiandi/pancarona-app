import { Search, Filter } from "lucide-react";

const orders = [
  { id: "#ORD-001", customer: "Budi Santoso", product: "MacBook Pro", amount: "Rp 24.500.000", status: "Selesai", date: "01 Mei 2024" },
  { id: "#ORD-002", customer: "Siti Rahayu", product: "iPhone 15 Pro", amount: "Rp 18.900.000", status: "Proses", date: "30 Apr 2024" },
  { id: "#ORD-003", customer: "Andi Wijaya", product: "Samsung Galaxy S24", amount: "Rp 12.300.000", status: "Pending", date: "29 Apr 2024" },
  { id: "#ORD-004", customer: "Dewi Lestari", product: "iPad Air", amount: "Rp 9.800.000", status: "Selesai", date: "28 Apr 2024" },
  { id: "#ORD-005", customer: "Riko Pratama", product: "AirPods Pro", amount: "Rp 3.200.000", status: "Batal", date: "27 Apr 2024" },
  { id: "#ORD-006", customer: "Maya Sari", product: "Apple Watch Ultra", amount: "Rp 11.500.000", status: "Proses", date: "26 Apr 2024" },
];

const statusStyles = {
  Selesai: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  Proses: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  Pending: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  Batal: "bg-rose-500/15 text-rose-400 border border-rose-500/20",
};

const summaryCards = [
  { label: "Total Pesanan", value: "3,249", color: "text-white" },
  { label: "Selesai", value: "2,801", color: "text-emerald-400" },
  { label: "Dalam Proses", value: "312", color: "text-blue-400" },
  { label: "Dibatalkan", value: "136", color: "text-rose-400" },
];

export default function Orders() {
  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-[#141418] border border-white/5 rounded-2xl p-4">
            <p className="text-xs text-white/30 mb-1">{card.label}</p>
            <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex gap-3">
        <div className="flex items-center gap-2 bg-[#141418] border border-white/10 rounded-lg px-3 py-2 flex-1 max-w-xs">
          <Search size={14} className="text-white/30" />
          <input placeholder="Cari pesanan..." className="bg-transparent text-sm text-white/60 placeholder:text-white/20 outline-none w-full" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#141418] border border-white/10 hover:border-white/20 transition-colors rounded-lg text-sm text-white/50 hover:text-white/80">
          <Filter size={14} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/5">
            <tr className="text-white/30 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3 font-medium">ID</th>
              <th className="text-left px-5 py-3 font-medium">Pelanggan</th>
              <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Produk</th>
              <th className="text-left px-5 py-3 font-medium">Total</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/3 transition-colors cursor-pointer">
                <td className="px-5 py-3.5 text-violet-400 font-mono text-xs">{order.id}</td>
                <td className="px-5 py-3.5 text-white/80">{order.customer}</td>
                <td className="px-5 py-3.5 text-white/40 hidden md:table-cell">{order.product}</td>
                <td className="px-5 py-3.5 text-white font-semibold">{order.amount}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-white/30 text-xs hidden lg:table-cell">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}