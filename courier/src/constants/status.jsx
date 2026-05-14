export const STATUS_META = {
  pending: {
    label: "Pending",
    color: "#94a3b8",
    bg: "#1e233020",
    border: "#94a3b840",
  },
  paid: {
    label: "Menunggu",
    color: "#f59e0b",
    bg: "#fef3c720",
    border: "#f59e0b40",
  },
  pickup_process: {
    label: "Pickup",
    color: "#3b82f6",
    bg: "#dbeafe20",
    border: "#3b82f640",
  },
  on_delivery: {
    label: "Dikirim",
    color: "#8b5cf6",
    bg: "#ede9fe20",
    border: "#8b5cf640",
  },
  delivered: {
    label: "Terkirim",
    color: "#10b981",
    bg: "#d1fae520",
    border: "#10b98140",
  },
  cancelled: {
    label: "Batal",
    color: "#ef4444",
    bg: "#fee2e220",
    border: "#ef444440",
  },
};

export const STATUS_OPTIONS = [
  { value: "pickup_process", label: "Sedang Pickup" },
  { value: "on_delivery", label: "Dalam Pengiriman" },
  { value: "delivered", label: "Sudah Terkirim" },
  { value: "cancelled", label: "Dibatalkan" },
];

export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080b12; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0d1117; }
  ::-webkit-scrollbar-thumb { background: #1e2330; border-radius: 4px; }
  @keyframes slideUp   { from { transform: translateY(16px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
  @keyframes fadeIn    { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes spin      { to { transform: rotate(360deg) } }
  @keyframes pulse     { 0%,100% { opacity: 1 } 50% { opacity: .4 } }
`;
