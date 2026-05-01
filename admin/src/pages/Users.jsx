import { Search, Plus, MoreHorizontal, Shield, User } from "lucide-react";

const users = [
  { name: "Budi Santoso", email: "budi@email.com", role: "Admin", status: "Aktif", joined: "Jan 2024", avatar: "BS" },
  { name: "Siti Rahayu", email: "siti@email.com", role: "Editor", status: "Aktif", joined: "Feb 2024", avatar: "SR" },
  { name: "Andi Wijaya", email: "andi@email.com", role: "Pengguna", status: "Nonaktif", joined: "Mar 2024", avatar: "AW" },
  { name: "Dewi Lestari", email: "dewi@email.com", role: "Editor", status: "Aktif", joined: "Mar 2024", avatar: "DL" },
  { name: "Riko Pratama", email: "riko@email.com", role: "Pengguna", status: "Aktif", joined: "Apr 2024", avatar: "RP" },
  { name: "Maya Sari", email: "maya@email.com", role: "Pengguna", status: "Pending", joined: "Apr 2024", avatar: "MS" },
];

const avatarColors = ["bg-violet-600", "bg-indigo-600", "bg-emerald-600", "bg-rose-600", "bg-amber-600", "bg-blue-600"];

const statusStyles = {
  Aktif: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  Nonaktif: "bg-white/5 text-white/30 border border-white/10",
  Pending: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
};

const roleIcon = (role) => {
  if (role === "Admin") return <Shield size={12} className="inline mr-1" />;
  return <User size={12} className="inline mr-1" />;
};

export default function Users() {
  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 bg-[#141418] border border-white/10 rounded-lg px-3 py-2 w-full sm:w-64">
          <Search size={14} className="text-white/30" />
          <input
            placeholder="Cari pengguna..."
            className="bg-transparent text-sm text-white/60 placeholder:text-white/20 outline-none w-full"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 transition-colors rounded-lg text-sm font-medium text-white">
          <Plus size={16} />
          Tambah Pengguna
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/5">
            <tr className="text-white/30 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3 font-medium">Pengguna</th>
              <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Role</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Bergabung</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user, i) => (
              <tr key={user.email} className="hover:bg-white/3 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-xs font-bold text-white`}>
                      {user.avatar}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-white/30 text-xs">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span className="text-white/50 text-xs">
                    {roleIcon(user.role)}{user.role}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-white/30 text-xs hidden lg:table-cell">{user.joined}</td>
                <td className="px-5 py-3.5">
                  <button className="text-white/20 hover:text-white/60 transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}