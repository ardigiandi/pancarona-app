import { useEffect, useState } from "react";
import { api } from "../../api/api.js";

export default function ActivityFeed() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await api.get("/activities");
        setActivities(res.data);
      } catch (err) {
        console.error("Activity error:", err);
      }
    };

    fetchActivities();
  }, []);

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return "baru saja";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} menit lalu`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam lalu`;

    return `${Math.floor(seconds / 86400)} hari lalu`;
  };

  return (
    <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
      <h2 className="font-semibold text-white mb-4">Aktivitas Terkini</h2>

      <div className="space-y-4">
        {activities.map((act, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full mt-1.5 ${act.dot}`} />
              {i < activities.length - 1 && (
                <div className="w-px flex-1 bg-white/5 mt-1" style={{ height: "20px" }} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/70">
                <span className="text-white font-medium">{act.user}</span>{" "}
                {act.action}
              </p>
              <p className="text-xs text-white/25 mt-0.5">
                {timeAgo(act.time)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}