import { Users, ShoppingCart, DollarSign, Activity } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import RecentOrders from "../components/dashboard/RecentOrders";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import MiniChart from "../components/dashboard/MiniChart";

const stats = [
  {
    title: "Total Pengguna",
    value: "12,847",
    change: "+8.2%",
    positive: true,
    icon: Users,
    color: "violet",
  },
  {
    title: "Total Pesanan",
    value: "3,249",
    change: "+5.1%",
    positive: true,
    icon: ShoppingCart,
    color: "indigo",
  },
  {
    title: "Pendapatan",
    value: "Rp 182jt",
    change: "+12.4%",
    positive: true,
    icon: DollarSign,
    color: "emerald",
  },
  {
    title: "Bounce Rate",
    value: "24.8%",
    change: "-2.1%",
    positive: false,
    icon: Activity,
    color: "amber",
  },
];

const handleLogout = async () => {
  await fetch("http://localhost:5000/api/admin/logout", {
    method: "POST",
    credentials: "include", // 🔥 WAJIB
  });

  window.location.href = "/login";
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <MiniChart />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>

      <RecentOrders />
    </div>
  );
}
