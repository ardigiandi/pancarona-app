import { useEffect, useState } from "react";
import { api } from "../api/api.js";

export default function Settings() {
  const [admin, setAdmin] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  useEffect(() => {
    api.get("/me")
      .then(({ data }) => {
        setAdmin(data.admin);
        setForm({ name: data.admin.name, email: data.admin.email });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSaveProfile = async () => {
    if (!form.name || !form.email) {
      alert("Nama dan email tidak boleh kosong");
      return;
    }
    setSaving(true);
    try {
      await api.put("/profile", form);
      alert("Profil berhasil disimpan");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan profil");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      alert("Semua field password harus diisi");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Password baru tidak cocok");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert("Password baru minimal 6 karakter");
      return;
    }
    setUpdatingPassword(true);
    try {
      await api.put("/password", {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });
      alert("Password berhasil diupdate");
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Gagal update password");
    } finally {
      setUpdatingPassword(false);
    }
  };

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "AD";

  if (loading) return <p className="text-white/30 text-sm">Loading...</p>;

  return (
    <div className="max-w-2xl space-y-5">
      {/* Profile */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">Profil</h2>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-lg font-bold text-white">
            {getInitials(form.name)}
          </div>
          <div>
            <p className="text-sm text-white/60">{form.name}</p>
            <p className="text-xs text-white/30 mt-0.5">{form.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/30 mb-1.5">Nama Lengkap</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-white/30 mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>
        </div>
        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 transition-colors rounded-lg text-sm font-medium text-white"
        >
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>

      {/* Notifikasi */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">Notifikasi</h2>
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, val]) => {
            const labels = {
              email: "Notifikasi Email",
              push: "Push Notification",
              sms: "Notifikasi SMS",
            };
            return (
              <div key={key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-white/60">{labels[key]}</span>
                <button
                  onClick={() => setNotifications((p) => ({ ...p, [key]: !p[key] }))}
                  className={`w-10 h-5 rounded-full transition-all duration-200 relative ${val ? "bg-violet-600" : "bg-white/10"}`}
                >
                  <span
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200"
                    style={{ left: val ? "22px" : "2px" }}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keamanan */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">Keamanan</h2>
        <div className="space-y-3">
          {[
            { label: "Password Lama", key: "oldPassword" },
            { label: "Password Baru", key: "newPassword" },
            { label: "Konfirmasi Password", key: "confirmPassword" },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block text-xs text-white/30 mb-1.5">{label}</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordForm[key]}
                onChange={(e) => setPasswordForm({ ...passwordForm, [key]: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
          ))}
          <button
            onClick={handleUpdatePassword}
            disabled={updatingPassword}
            className="px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 disabled:opacity-50 transition-colors rounded-lg text-sm text-white/60 hover:text-white/80"
          >
            {updatingPassword ? "Mengupdate..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}