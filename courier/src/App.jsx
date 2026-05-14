import { useState, useEffect } from "react";
import { getCourierProfile } from "./api/courier";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import { GLOBAL_STYLES } from "./constants/status";

function FullscreenSpinner() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080b12",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        fontFamily: "'Syne', sans-serif",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          border: "3px solid #1e2330",
          borderTopColor: "#10b981",
          borderRadius: "50%",
          animation: "spin 0.75s linear infinite",
        }}
      />
      <p
        style={{
          color: "#334155",
          fontSize: 13,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        Memeriksa sesi...
      </p>
    </div>
  );
}

export default function App() {
  const [courier, setCourier] = useState(null);
  const [checking, setChecking] = useState(true);

  // Check existing session on mount
  useEffect(() => {
    getCourierProfile()
      .then((res) => {
        if (res?.data) setCourier(res.data);
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      {checking ? (
        <FullscreenSpinner />
      ) : courier ? (
        <DashboardPage courier={courier} onLogout={() => setCourier(null)} />
      ) : (
        <AuthPage onLogin={(data) => setCourier(data)} />
      )}
    </>
  );
}
