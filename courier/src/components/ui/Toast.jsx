import { useEffect } from "react";

export default function Toast({ msg, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3200);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isError = type === "error";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        background: isError ? "#120808" : "#080f0a",
        border: `1px solid ${isError ? "#ef444450" : "#10b98150"}`,
        color: isError ? "#fca5a5" : "#6ee7b7",
        padding: "13px 20px",
        borderRadius: 12,
        fontFamily: "'DM Mono', monospace",
        fontSize: 13,
        zIndex: 9999,
        boxShadow: `0 0 32px ${isError ? "#ef444420" : "#10b98120"}`,
        animation: "slideUp .25s ease",
        maxWidth: 340,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span style={{ fontSize: 16 }}>{isError ? "⚠️" : "✅"}</span>
      <span>{msg}</span>
      <button
        onClick={onClose}
        style={{
          marginLeft: "auto",
          background: "none",
          border: "none",
          color: "inherit",
          cursor: "pointer",
          opacity: 0.6,
          fontSize: 16,
          lineHeight: 1,
          padding: "0 0 0 8px",
        }}
      >
        ×
      </button>
    </div>
  );
}