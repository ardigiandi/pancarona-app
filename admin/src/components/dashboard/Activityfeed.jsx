const activities = [
  { user: "Budi S.", action: "membuat pesanan baru", time: "2 menit lalu", dot: "bg-violet-500" },
  { user: "Admin", action: "mengupdate stok produk", time: "15 menit lalu", dot: "bg-blue-500" },
  { user: "Siti R.", action: "mendaftar akun baru", time: "1 jam lalu", dot: "bg-emerald-500" },
  { user: "Sistem", action: "backup database selesai", time: "3 jam lalu", dot: "bg-amber-500" },
  { user: "Andi W.", action: "mengajukan retur barang", time: "5 jam lalu", dot: "bg-rose-500" },
];

export default function ActivityFeed() {
  return (
    <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
      <h2 className="font-semibold text-white mb-4">Aktivitas Terkini</h2>
      <div className="space-y-4">
        {activities.map((act, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${act.dot}`} />
              {i < activities.length - 1 && (
                <div className="w-px flex-1 bg-white/5 mt-1 mb-0" style={{ height: "20px" }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/70">
                <span className="text-white font-medium">{act.user}</span> {act.action}
              </p>
              <p className="text-xs text-white/25 mt-0.5">{act.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}