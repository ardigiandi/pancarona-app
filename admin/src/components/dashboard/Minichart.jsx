import { useEffect, useState } from "react";
import { api } from "../../api/api.js";
import { formatPrice } from "../../lib/formatPrice.js";

export default function MiniChart() {
  const [weekData, setWeekData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await api.get("/weekly-revenue");
        setWeekData(res.data);
      } catch (err) {
        console.error("Chart error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, []);

  if (loading) return <p className="text-white">Loading chart...</p>;

  const max = Math.max(...weekData.map((d) => d.value), 1);

  const total = weekData.reduce((acc, curr) => acc + curr.value, 0);


  return (
    <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-white">Pendapatan Minggu Ini</h2>
        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          realtime
        </span>
      </div>

      <p className="text-2xl font-bold text-white mb-5">
        {formatPrice(total)}
      </p>

      <div className="flex items-end gap-2 h-24">
        {weekData.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-md transition-all duration-500"
              style={{
                height: `${(d.value / max) * 100}%`,
                background:
                  d.day === "Kam"
                    ? "linear-gradient(to top, #7c3aed, #a78bfa)"
                    : "rgba(255,255,255,0.06)",
              }}
            />
            <span className="text-[10px] text-white/30">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
