import { useState } from "react";
import { loginCourier, registerCourier } from "../api/courier";
import Toast from "../components/ui/Toast";
import { useToast } from "../hooks/useToast";

const INITIAL_FORM = { name: "", email: "", password: "", vehicle: "" };

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const { toast, notify, dismiss } = useToast();

  const handleField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      notify("Email dan password wajib diisi", "error");
      return;
    }

    setLoading(true);
    try {
      let res;
      if (mode === "login") {
        res = await loginCourier(form.email, form.password);
        if (res.data) {
          onLogin(res.data);
          return;
        }
      } else {
        if (!form.name || !form.vehicle) {
          notify("Semua field wajib diisi", "error");
          setLoading(false);
          return;
        }
        res = await registerCourier(form.name, form.email, form.password, form.vehicle);
        if (res.message?.toLowerCase().includes("berhasil")) {
          notify("Registrasi berhasil! Silakan login.");
          setMode("login");
          setForm(INITIAL_FORM);
          setLoading(false);
          return;
        }
      }
      notify(res.message ?? "Terjadi kesalahan", "error");
    } catch {
      notify("Koneksi gagal. Cek server backend.", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#080b12",
    border: "1px solid #1e2330",
    borderRadius: 9,
    color: "#e2e8f0",
    padding: "12px 14px",
    fontSize: 14,
    fontFamily: "'DM Mono', monospace",
    outline: "none",
    transition: "border-color .15s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080b12",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Syne', sans-serif",
        padding: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, #10b98108 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, #3b82f608 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#0d1117",
          border: "1px solid #1e2330",
          borderRadius: 22,
          padding: "40px 36px",
          animation: "fadeIn .4s ease",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 0 80px #10b98108",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#10b98112",
              border: "1px solid #10b98128",
              borderRadius: 14,
              padding: "10px 18px",
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 22 }}>🚚</span>
            <span
              style={{
                color: "#10b981",
                fontWeight: 800,
                fontSize: 20,
                letterSpacing: -0.5,
              }}
            >
              SwiftRoute
            </span>
          </div>
          <p
            style={{
              color: "#334155",
              fontSize: 12,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: 0.5,
            }}
          >
            Courier Management System
          </p>
        </div>

        {/* Mode tabs */}
        <div
          style={{
            display: "flex",
            background: "#080b12",
            borderRadius: 11,
            padding: 4,
            marginBottom: 28,
          }}
        >
          {[
            { key: "login", label: "Masuk" },
            { key: "register", label: "Daftar" },
          ].map((m) => (
            <button
              key={m.key}
              onClick={() => {
                setMode(m.key);
                setForm(INITIAL_FORM);
              }}
              style={{
                flex: 1,
                padding: "10px 0",
                border: "none",
                borderRadius: 8,
                background: mode === m.key ? "#10b981" : "transparent",
                color: mode === m.key ? "#fff" : "#475569",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Syne', sans-serif",
                letterSpacing: 0.3,
                transition: "all .2s ease",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Form fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {mode === "register" && (
            <input
              style={inputStyle}
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleField("name")}
              onFocus={(e) => (e.target.style.borderColor = "#10b981")}
              onBlur={(e) => (e.target.style.borderColor = "#1e2330")}
            />
          )}
          <input
            style={inputStyle}
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleField("email")}
            onFocus={(e) => (e.target.style.borderColor = "#10b981")}
            onBlur={(e) => (e.target.style.borderColor = "#1e2330")}
          />
          <input
            style={inputStyle}
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleField("password")}
            onFocus={(e) => (e.target.style.borderColor = "#10b981")}
            onBlur={(e) => (e.target.style.borderColor = "#1e2330")}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          {mode === "register" && (
            <input
              style={inputStyle}
              placeholder="Kendaraan (contoh: Motor, Mobil)"
              value={form.vehicle}
              onChange={handleField("vehicle")}
              onFocus={(e) => (e.target.style.borderColor = "#10b981")}
              onBlur={(e) => (e.target.style.borderColor = "#1e2330")}
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 20,
            padding: "14px 0",
            background: loading
              ? "#064e3b"
              : "linear-gradient(135deg, #10b981, #059669)",
            border: "none",
            borderRadius: 11,
            color: "#fff",
            fontWeight: 800,
            fontSize: 15,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Syne', sans-serif",
            letterSpacing: 0.3,
            boxShadow: loading ? "none" : "0 4px 24px #10b98135",
            transition: "all .2s ease",
          }}
        >
          {loading
            ? "Memproses..."
            : mode === "login"
            ? "Masuk ke Dashboard"
            : "Daftar Sekarang"}
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#334155",
            fontSize: 12,
            fontFamily: "'DM Mono', monospace",
            marginTop: 20,
          }}
        >
          {mode === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            style={{
              background: "none",
              border: "none",
              color: "#10b981",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "underline",
              padding: 0,
            }}
          >
            {mode === "login" ? "Daftar" : "Login"}
          </button>
        </p>
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={dismiss} />}
    </div>
  );
}