export default function Spinner({ size = 36, label = "Memuat..." }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div
        style={{
          width: size,
          height: size,
          border: "3px solid #1e2330",
          borderTopColor: "#10b981",
          borderRadius: "50%",
          animation: "spin 0.75s linear infinite",
          margin: "0 auto 16px",
        }}
      />
      <p
        style={{
          color: "#475569",
          fontFamily: "'DM Mono', monospace",
          fontSize: 13,
        }}
      >
        {label}
      </p>
    </div>
  );
}