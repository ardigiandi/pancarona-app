import Badge from "../ui/Badge";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrderCard({ order, onTake, onUpdateStatus, loading }) {
  return (
    <div
      style={{
        background: "#0d1117",
        border: "1px solid #1e2330",
        borderRadius: 14,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 0,
        animation: "fadeIn .3s ease",
        transition: "border-color .2s, transform .2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#10b98145";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1e2330";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <div>
          <p
            style={{
              color: "#334155",
              fontSize: 10,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Order ID
          </p>
          <p
            style={{
              color: "#f1f5f9",
              fontWeight: 800,
              fontSize: 28,
              letterSpacing: -1.5,
              fontFamily: "'Syne', sans-serif",
              lineHeight: 1,
              marginTop: 2,
            }}
          >
            #{order.id}
          </p>
        </div>
        <Badge status={order.status} />
      </div>

      {/* Date */}
      <div
        style={{
          background: "#080b12",
          borderRadius: 8,
          padding: "10px 14px",
          marginBottom: 18,
        }}
      >
        <p
          style={{
            color: "#334155",
            fontSize: 10,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: 0.8,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Masuk
        </p>
        <p
          style={{
            color: "#94a3b8",
            fontSize: 12,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {formatDate(order.createdAt)}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => onTake(order.id)}
          disabled={loading}
          style={{
            flex: 1,
            padding: "10px 0",
            background: loading
              ? "#064e3b"
              : "linear-gradient(135deg, #10b981, #059669)",
            border: "none",
            borderRadius: 8,
            color: "#fff",
            fontWeight: 700,
            fontSize: 12,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Syne', sans-serif",
            letterSpacing: 0.3,
            boxShadow: loading ? "none" : "0 2px 16px #10b98128",
            transition: "all .15s",
          }}
        >
          {loading ? "Memproses..." : "🏃 Ambil Order"}
        </button>

        <button
          onClick={() => onUpdateStatus(order.id)}
          title="Update status order"
          style={{
            padding: "10px 13px",
            background: "#1e2330",
            border: "1px solid #2a2d3a",
            borderRadius: 8,
            color: "#94a3b8",
            cursor: "pointer",
            fontSize: 14,
            transition: "all .15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#8b5cf620";
            e.currentTarget.style.borderColor = "#8b5cf650";
            e.currentTarget.style.color = "#c4b5fd";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#1e2330";
            e.currentTarget.style.borderColor = "#2a2d3a";
            e.currentTarget.style.color = "#94a3b8";
          }}
        >
          ✏️
        </button>
      </div>
    </div>
  );
}
