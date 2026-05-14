import { STATUS_META } from "../../constants/status";

export default function Badge({ status }) {
  const meta = STATUS_META[status] ?? {
    label: status,
    color: "#94a3b8",
    bg: "#1e233020",
    border: "#1e233060",
  };

  return (
    <span
      style={{
        background: meta.bg,
        color: meta.color,
        border: `1px solid ${meta.border}`,
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 10,
        fontWeight: 700,
        fontFamily: "'DM Mono', monospace",
        letterSpacing: 0.8,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {meta.label}
    </span>
  );
}