const monthlyData = [
  { month: "Jan", revenue: 45, users: 30 },
  { month: "Feb", revenue: 60, users: 45 },
  { month: "Mar", revenue: 55, users: 40 },
  { month: "Apr", revenue: 80, users: 65 },
  { month: "Mei", revenue: 70, users: 55 },
  { month: "Jun", revenue: 90, users: 75 },
];

const trafficSources = [
  { source: "Organik", percent: 42, color: "bg-violet-500" },
  { source: "Sosial Media", percent: 28, color: "bg-indigo-500" },
  { source: "Referral", percent: 18, color: "bg-emerald-500" },
  { source: "Iklan", percent: 12, color: "bg-amber-500" },
];

export default function Analytics() {
  const maxVal = Math.max(...monthlyData.map((d) => Math.max(d.revenue, d.users)));

  return (
    <div className="space-y-5">
      {/* Revenue & Users Chart */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-white">Pendapatan vs Pengguna</h2>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-violet-500 inline-block rounded" /> Pendapatan</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 inline-block rounded" /> Pengguna</span>
          </div>
        </div>
        <p className="text-white/30 text-xs mb-5">6 bulan terakhir</p>
        <div className="flex items-end gap-3 h-40">
          {monthlyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end gap-0.5 h-32">
                <div
                  className="flex-1 bg-violet-500/60 rounded-t-md transition-all duration-500"
                  style={{ height: `${(d.revenue / maxVal) * 100}%` }}
                />
                <div
                  className="flex-1 bg-emerald-500/60 rounded-t-md transition-all duration-500"
                  style={{ height: `${(d.users / maxVal) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-white/30">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-4">Sumber Traffic</h2>
          <div className="space-y-3">
            {trafficSources.map((src) => (
              <div key={src.source}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">{src.source}</span>
                  <span className="text-white font-medium">{src.percent}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${src.color}`}
                    style={{ width: `${src.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#141418] border border-white/5 rounded-2xl p-5 space-y-4">
          <h2 className="font-semibold text-white mb-4">Ringkasan Performa</h2>
          {[
            { label: "Rata-rata sesi", value: "4m 23d" },
            { label: "Halaman per sesi", value: "3.8" },
            { label: "Rasio konversi", value: "6.2%" },
            { label: "Pelanggan baru", value: "1,248" },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
              <span className="text-sm text-white/40">{item.label}</span>
              <span className="text-sm font-semibold text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}