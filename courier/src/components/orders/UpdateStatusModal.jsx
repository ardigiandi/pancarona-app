import { useState } from "react";
import { STATUS_OPTIONS } from "../../constants/status";

export default function UpdateStatusModal({ orderId, onConfirm, onClose, loading }) {
  const [form, setForm] = useState({ status: "ON_DELIVERY", note: "" });

  const inputStyle = {
    width: "100%",
    background: "#080b12",
    border: "1px solid #2a2d3a",
    borderRadius: 9,
    color: "#e2e8f0",
    padding: "11px 14px",
    fontSize: 13,
    fontFamily: "'DM Mono', monospace",
    outline: "none",
    transition: "border-color .15s",
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000b8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 20,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: "#0d1117",
          border: "1px solid #1e2330",
          borderRadius: 18,
          padding: "28px 28px 24px",
          width: "100%",
          maxWidth: 400,
          animation: "fadeIn .2s ease",
          boxShadow: "0 0 60px #00000080",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
          <div>
            <h3
              style={{
                color: "#f1f5f9",
                fontWeight: 800,
                fontSize: 18,
                fontFamily: "'Syne', sans-serif",
                letterSpacing: -0.4,
              }}
            >
              Update Status
            </h3>
            <p
              style={{
                color: "#475569",
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              Order #{orderId}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#1e2330",
              border: "none",
              borderRadius: 6,
              color: "#64748b",
              width: 28,
              height: 28,
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label
              style={{
                color: "#475569",
                fontSize: 11,
                fontFamily: "'DM Mono', monospace",
                letterSpacing: 0.8,
                textTransform: "uppercase",
                display: "block",
                marginBottom: 6,
              }}
            >
              Status Baru
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              style={{ ...inputStyle, cursor: "pointer" }}
              onFocus={(e) => (e.target.style.borderColor = "#10b981")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2d3a")}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} style={{ background: "#0d1117" }}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                color: "#475569",
                fontSize: 11,
                fontFamily: "'DM Mono', monospace",
                letterSpacing: 0.8,
                textTransform: "uppercase",
                display: "block",
                marginBottom: 6,
              }}
            >
              Catatan <span style={{ color: "#334155" }}>(opsional)</span>
            </label>
            <textarea
              placeholder="Tambahkan catatan untuk update ini..."
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={3}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              onFocus={(e) => (e.target.style.borderColor = "#10b981")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2d3a")}
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "11px 0",
              background: "transparent",
              border: "1px solid #2a2d3a",
              borderRadius: 9,
              color: "#64748b",
              cursor: "pointer",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              transition: "all .15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#475569";
              e.currentTarget.style.color = "#94a3b8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2a2d3a";
              e.currentTarget.style.color = "#64748b";
            }}
          >
            Batal
          </button>
          <button
            onClick={() => onConfirm(form.status, form.note)}
            disabled={loading}
            style={{
              flex: 2,
              padding: "11px 0",
              background: loading
                ? "#064e3b"
                : "linear-gradient(135deg, #10b981, #059669)",
              border: "none",
              borderRadius: 9,
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              boxShadow: loading ? "none" : "0 2px 16px #10b98128",
              transition: "all .15s",
            }}
          >
            {loading ? "Menyimpan..." : "Simpan Status"}
          </button>
        </div>
      </div>
    </div>
  );
}