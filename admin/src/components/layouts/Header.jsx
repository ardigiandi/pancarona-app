import { Menu, Bell, Search, Sun } from "lucide-react";

const pageTitles = {
  dashboard: "Dashboard",
  users: "User Management",
  analytics: "Analytics",
  orders: "Orders",
  settings: "Settings",
};

export default function Header({ sidebarOpen, setSidebarOpen, activePage }) {
    
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#141418]">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white/40 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-white">
            {pageTitles[activePage]}
          </h1>
          <p className="text-xs text-white/30">
            Selamat datang kembali, Admin 👋
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-48">
          <Search size={14} className="text-white/30" />
          <input
            placeholder="Cari..."
            className="bg-transparent text-sm text-white/60 placeholder:text-white/20 outline-none w-full"
          />
        </div>

        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-400 rounded-full" />
        </button>
      </div>
    </header>
  );
}