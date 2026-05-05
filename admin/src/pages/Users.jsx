import { useEffect, useState } from "react";
import { Search, Plus, Trash2, Shield, User } from "lucide-react";
import { api } from "../api/api.js";

const avatarColors = ["bg-violet-600", "bg-indigo-600", "bg-emerald-600", "bg-rose-600", "bg-amber-600", "bg-blue-600"];

const statusStyles = {
  aktif: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  nonaktif: "bg-white/5 text-white/30 border border-white/10",
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus user ini?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus user");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name) =>
    name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  if (loading) return <p className="text-white/30 text-sm">Loading...</p>;

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 bg-[#141418] border border-white/10 rounded-lg px-3 py-2 w-full sm:w-64">
          <Search size={14} className="text-white/30" />
          <input
            placeholder="Cari pengguna..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-white/60 placeholder:text-white/20 outline-none w-full"
          />
        </div>
        <p className="text-white/30 text-sm">{filtered.length} pengguna</p>
      </div>

      {/* Table */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/5">
            <tr className="text-white/30 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3 font-medium">Pengguna</th>
              <th className="text-left px-5 py-3 font-medium hidden md:table-cell">No. HP</th>
              <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Alamat</th>
              <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Bergabung</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-white/20">
                  Tidak ada pengguna
                </td>
              </tr>
            )}
            {filtered.map((user, i) => (
              <tr key={user.id} className="hover:bg-white/3 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-xs font-bold text-white`}>
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-white/30 text-xs">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-white/50 text-xs hidden md:table-cell">
                  {user.phone || "-"}
                </td>
                <td className="px-5 py-3.5 text-white/50 text-xs hidden md:table-cell">
                  {user.address || "-"}
                </td>
                <td className="px-5 py-3.5 text-white/30 text-xs hidden lg:table-cell">
                  {new Date(user.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-white/20 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={15} />
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