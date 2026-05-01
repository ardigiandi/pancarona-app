import {
  LayoutDashboard,
  Users,
  BarChart3,
  ShoppingCart,
  Settings,
  Zap,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activePage, setActivePage, sidebarOpen }) {
  return (
    <aside
      className={`transition-all duration-300 flex flex-col bg-[#141418] border-r border-white/5 ${
        sidebarOpen ? "w-60" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {sidebarOpen && (
          <span className="font-bold text-lg tracking-tight text-white">
            Admin<span className="text-violet-400">Pancarona</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activePage === id;
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative ${
                active
                  ? "bg-violet-600/20 text-violet-300"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-violet-400 rounded-r-full" />
              )}
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && (
                <span className="text-sm font-medium flex-1 text-left">
                  {label}
                </span>
              )}
              {sidebarOpen && active && (
                <ChevronRight size={14} className="text-violet-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      {sidebarOpen && (
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-xs font-bold">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin Dev</p>
              <p className="text-xs text-white/30 truncate">admin@site.com</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}