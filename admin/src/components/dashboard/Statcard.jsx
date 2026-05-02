import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ title, value, change, positive, icon: Icon, color }) {
  const colors = {
    violet: "from-violet-500/20 to-violet-600/5 border-violet-500/20",
    indigo: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/20",
    emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20",
    amber: "from-amber-500/20 to-amber-600/5 border-amber-500/20",
  };
  const iconColors = {
    violet: "bg-violet-500/20 text-violet-400",
    indigo: "bg-indigo-500/20 text-indigo-400",
    emerald: "bg-emerald-500/20 text-emerald-400",
    amber: "bg-amber-500/20 text-amber-400",
  };

  return (
    <div
      className={`relative p-5 rounded-2xl border bg-linear-to-br ${colors[color]} overflow-hidden`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-white">{value}</p>
          <div
            className={`flex items-center gap-1 mt-1 text-xs font-medium ${
              positive ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change} dari bulan lalu
          </div>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColors[color]}`}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}