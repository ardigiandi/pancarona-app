import { Users, ShoppingCart, DollarSign, Activity } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import RecentOrders from "../components/dashboard/Recentorders";
import ActivityFeed from "../components/dashboard/Activityfeed";
import MiniChart from "../components/dashboard/Minichart";
import { useEffect, useState } from "react";
import { api } from "../api/api.js";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("Error dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard()
  }, []);

  if(loading) {
    return <div className="text-center">Loading...</div>
  }

  if(!data){
    return <div className="text-center">Data not found</div>
  }

  const formatRupiah =(num) => {
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num)
  }

  const stats = [
    {
      title: "Total Pengguna",
      value: data.totalUsers,
      change: "-",
      positive: true,
      icon: Users,
      color: "violet",
    },
    {
      title: "Total Pesanan",
      value: data.totalOrders,
      change: "-",
      positive: true,
      icon: ShoppingCart,
      color: "indigo",
    },
    {
      title: "Pendapatan",
      value: formatRupiah(data.totalRevenue),
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <MiniChart />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>

      <RecentOrders orders={data.recentOrders} />
    </div>
  );
}
