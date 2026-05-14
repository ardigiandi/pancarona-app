const FIELDS = [
  { icon: "📧", label: "Email", key: "email" },
  { icon: "🚗", label: "Kendaraan", key: "vehicle", fallback: "Belum diisi" },
  { icon: "🆔", label: "ID Kurir", key: "id", prefix: "#" },
];

export default function ProfileCard({ courier }) {
  return (
    <div
      style={{
        maxWidth: 480,
        background: "#0d1117",
        border: "1px solid #1e2330",
        borderRadius: 20,
        overflow: "hidden",
        animation: "fadeIn .3s ease",
      }}
    >
      {/* Cover gradient */}
      <div
        style={{
          height: 110,
          background:
            "linear-gradient(135deg, #022c22 0%, #065f46 50%, #10b981 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "#10b98120",
            border: "1px solid #10b98130",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: 60,
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "#34d39915",
          }}
        />

        {/* Avatar */}
        <div
          style={{
            position: "absolute",
            bottom: -28,
            left: 28,
            width: 56,
            height: 56,
            background: "#0d1117",
            border: "3px solid #0d1117",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            boxShadow: "0 4px 20px #00000060",
          }}
        >
          🚚
        </div>
      </div>

      <div style={{ padding: "40px 28px 28px" }}>
        {/* Name & Status */}
        <div style={{ marginBottom: 24 }}>
          <h2
            style={{
              color: "#f1f5f9",
              fontWeight: 800,
              fontSize: 24,
              letterSpacing: -0.6,
              fontFamily: "'Syne', sans-serif",
            }}
          >
            {courier.name}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#10b981",
                display: "inline-block",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                color: "#10b981",
                fontSize: 12,
                fontFamily: "'DM Mono', monospace",
                letterSpacing: 0.5,
              }}
            >
              Kurir Aktif
            </span>
          </div>
        </div>

        {/* Info rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FIELDS.map((field) => {
            const rawValue = courier[field.key];
            const value = rawValue
              ? `${field.prefix ?? ""}${rawValue}`
              : field.fallback ?? "-";

            return (
              <div
                key={field.key}
                style={{
                  background: "#080b12",
                  borderRadius: 10,
                  padding: "13px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  border: "1px solid #1e2330",
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{field.icon}</span>
                <div>
                  <p
                    style={{
                      color: "#334155",
                      fontSize: 10,
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      marginBottom: 3,
                    }}
                  >
                    {field.label}
                  </p>
                  <p
                    style={{
                      color: rawValue ? "#e2e8f0" : "#475569",
                      fontSize: 14,
                      fontWeight: rawValue ? 600 : 400,
                      fontFamily: field.key === "id" ? "'DM Mono', monospace" : "'Syne', sans-serif",
                    }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}