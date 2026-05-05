import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  BarChart2,
  ShoppingCart,
  Package,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", path: "/analytics", icon: BarChart2 },
  { name: "Orders", path: "/orders", icon: ShoppingCart },
  { name: "Products", path: "/product", icon: Package },
  { name: "Users", path: "/users", icon: Users },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar({ sidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useAuth();

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "AD";

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } min-h-screen bg-[#0f0f13] border-r border-white/5 flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/5">
        {sidebarOpen ? (
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Pancarona</h1>
            <p className="text-xs text-white/30 mt-0.5">Admin Panel</p>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">P</span>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} className="shrink-0" />

              {sidebarOpen && (
                <span className="text-sm font-medium flex-1 text-left">
                  {item.name}
                </span>
              )}

              {sidebarOpen && isActive && (
                <ChevronRight size={14} className="text-white/50" />
              )}

              {/* Tooltip saat sidebar collapsed */}
              {!sidebarOpen && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-[#1e1e24] border border-white/10 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {item.name}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Admin info + logout */}
      <div className="px-2 py-4 border-t border-white/5">
        {sidebarOpen ? (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {getInitials(admin?.admin?.name || admin?.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {admin?.admin?.name || admin?.name || "Admin"}
              </p>
              <p className="text-xs text-white/30 truncate">
                {admin?.admin?.email || admin?.email}
              </p>
            </div>
            <button
              onClick={logout}
              className="text-white/20 hover:text-rose-400 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
              {getInitials(admin?.admin?.name || admin?.name)}
            </div>
            <button
              onClick={logout}
              className="text-white/20 hover:text-rose-400 transition-colors"
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}