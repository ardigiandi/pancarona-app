import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });

  return (
    <div className="max-w-2xl space-y-5">
      {/* Profile */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">Profil</h2>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-lg font-bold">
            AD
          </div>
          <div>
            <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
              Ubah foto
            </button>
            <p className="text-xs text-white/30 mt-0.5">JPG, PNG. Max 2MB</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Nama Lengkap", value: "Admin Dev", type: "text" },
            { label: "Email", value: "admin@site.com", type: "email" },
            { label: "No. HP", value: "+62 812-3456-7890", type: "tel" },
            { label: "Jabatan", value: "Super Admin", type: "text" },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs text-white/30 mb-1.5">{field.label}</label>
              <input
                type={field.type}
                defaultValue={field.value}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
          ))}
        </div>
        <button className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 transition-colors rounded-lg text-sm font-medium text-white">
          Simpan Perubahan
        </button>
      </div>

      {/* Notifikasi */}
      <div className="bg-[#141418] border border-white/5 rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">Notifikasi</h2>
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, val]) => {
            const labels = { email: "Notifikasi Email", push: "Push Notification", sms: "Notifikasi SMS" };
            return (
              <div key={key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-white/60">{labels[key]}</span>
                <button
                  onClick={() => setNotifications((p) => ({ ...p, [key]: !p[key] }))}
                  className={`w-10 h-5 rounded-full transition-all duration-200 relative ${val ? "bg-violet-600" : "bg-white/10"}`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${val ? "left-5.5" : "left-0.5"}`}
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
          {["Password Lama", "Password Baru", "Konfirmasi Password"].map((label) => (
            <div key={label}>
              <label className="block text-xs text-white/30 mb-1.5">{label}</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
          ))}
          <button className="px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 transition-colors rounded-lg text-sm text-white/60 hover:text-white/80">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}