const NAV_ITEMS = [
  { id: "orders", icon: "📦", label: "Order Tersedia" },
  { id: "profile", icon: "👤", label: "Profil Kurir" },
];

export default function Sidebar({ courier, activeTab, onTabChange, onLogout }) {
  return (
    <aside
      style={{
        width: 230,
        minWidth: 230,
        background: "#0d1117",
        borderRight: "1px solid #1e2330",
        display: "flex",
        flexDirection: "column",
        padding: "28px 0",
        height: "100vh",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "0 20px 24px",
          borderBottom: "1px solid #1e2330",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: "linear-gradient(135deg, #064e3b, #10b981)",
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
            }}
          >
            🚚
          </div>
          <div>
            <p
              style={{
                color: "#f1f5f9",
                fontWeight: 800,
                fontSize: 16,
                letterSpacing: -0.5,
                fontFamily: "'Syne', sans-serif",
              }}
            >
              SwiftRoute
            </p>
            <p
              style={{
                color: "#10b981",
                fontSize: 10,
                fontFamily: "'DM Mono', monospace",
                letterSpacing: 0.5,
              }}
            >
              Courier Portal
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "18px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <p
          style={{
            color: "#334155",
            fontSize: 10,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: 1.2,
            textTransform: "uppercase",
            padding: "0 10px",
            marginBottom: 8,
          }}
        >
          Menu
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 9,
                border: "none",
                background: isActive ? "#10b98118" : "transparent",
                color: isActive ? "#10b981" : "#64748b",
                cursor: "pointer",
                fontFamily: "'Syne', sans-serif",
                fontWeight: isActive ? 700 : 500,
                fontSize: 13,
                textAlign: "left",
                width: "100%",
                borderLeft: `2px solid ${isActive ? "#10b981" : "transparent"}`,
                transition: "all .15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#10b98110";
                  e.currentTarget.style.color = "#94a3b8";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#64748b";
                }
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Courier Info + Logout */}
      <div style={{ padding: "0 12px" }}>
        <div
          style={{
            background: "#10b98110",
            border: "1px solid #10b98122",
            borderRadius: 11,
            padding: "12px 14px",
            marginBottom: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 30,
                height: 30,
                background: "#10b98125",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              🧑
            </div>
            <div style={{ overflow: "hidden" }}>
              <p
                style={{
                  color: "#e2e8f0",
                  fontWeight: 700,
                  fontSize: 13,
                  fontFamily: "'Syne', sans-serif",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {courier.name}
              </p>
              <p
                style={{
                  color: "#475569",
                  fontSize: 11,
                  fontFamily: "'DM Mono', monospace",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {courier.vehicle ?? "Kurir"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          style={{
            width: "100%",
            padding: "9px 0",
            background: "transparent",
            border: "1px solid #1e2330",
            borderRadius: 9,
            color: "#64748b",
            cursor: "pointer",
            fontFamily: "'Syne', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transition: "all .2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#ef444455";
            e.currentTarget.style.color = "#ef4444";
            e.currentTarget.style.background = "#ef444410";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#1e2330";
            e.currentTarget.style.color = "#64748b";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <span>🚪</span> Keluar
        </button>
      </div>
    </aside>
  );
}
