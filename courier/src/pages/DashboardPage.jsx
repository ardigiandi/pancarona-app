import { useState, useEffect, useCallback } from "react";
import {
  getCourierProfile,
  getAvailableOrders,
  takeOrder,
  updateOrderStatus,
  logoutCourier,
} from "../api/courier";
import Sidebar from "../components/layout/Sidebar";
import OrderCard from "../components/orders/OrderCard";
import UpdateStatusModal from "../components/orders/UpdateStatusModal";
import ProfileCard from "../components/profile/ProfileCard";
import Spinner from "../components/ui/Spinner";
import Toast from "../components/ui/Toast";
import { useToast } from "../hooks/useToast";

export default function DashboardPage({ courier: initialCourier, onLogout }) {
  const [activeTab, setActiveTab] = useState("orders");
  const [courier, setCourier] = useState(initialCourier);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const [updateModal, setUpdateModal] = useState(null); // orderId | null
  const { toast, notify, dismiss } = useToast();

  // ── Loaders ───────────────────────────────────────────
  const loadOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const res = await getAvailableOrders();
      setOrders(res.data ?? []);
    } catch {
      notify("Gagal memuat daftar order", "error");
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const loadProfile = useCallback(async () => {
    try {
      const res = await getCourierProfile();
      if (res.data) setCourier(res.data);
    } catch {}
  }, []);

  useEffect(() => {
    if (activeTab === "orders") loadOrders();
    if (activeTab === "profile") loadProfile();
  }, [activeTab]);

  // ── Actions ───────────────────────────────────────────
  const handleTakeOrder = async (orderId) => {
    setActionLoading((p) => ({ ...p, [orderId]: true }));
    try {
      const res = await takeOrder(orderId, courier.id);
      if (res.message?.toLowerCase().includes("berhasil")) {
        notify(`Order #${orderId} berhasil diambil! 🚀`);
        loadOrders();
      } else {
        notify(res.message ?? "Gagal mengambil order", "error");
      }
    } catch {
      notify("Koneksi gagal", "error");
    } finally {
      setActionLoading((p) => ({ ...p, [orderId]: false }));
    }
  };

  const handleUpdateStatus = async (status, note) => {
    if (!updateModal) return;
    setActionLoading((p) => ({ ...p, statusUpdate: true }));
    try {
      const res = await updateOrderStatus(updateModal, status, note);
      if (res.data || res.message?.toLowerCase().includes("update")) {
        notify(`Status order #${updateModal} diperbarui ✅`);
        setUpdateModal(null);
        loadOrders();
      } else {
        notify(res.message ?? "Gagal update status", "error");
      }
    } catch {
      notify("Koneksi gagal", "error");
    } finally {
      setActionLoading((p) => ({ ...p, statusUpdate: false }));
    }
  };

  const handleLogout = async () => {
    try {
      await logoutCourier();
    } finally {
      onLogout();
    }
  };

  // ── Render ────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#080b12" }}>
      <Sidebar
        courier={courier}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />

      <main
        style={{
          flex: 1,
          padding: "36px 40px",
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        {/* Page Header */}
        <header style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <h1
                style={{
                  color: "#f1f5f9",
                  fontWeight: 800,
                  fontSize: 28,
                  letterSpacing: -1,
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {activeTab === "orders" ? "Order Tersedia" : "Profil Kurir"}
              </h1>
              <p
                style={{
                  color: "#334155",
                  fontSize: 13,
                  marginTop: 5,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {activeTab === "orders"
                  ? `${orders.length} order siap diambil`
                  : `ID: #${courier.id}`}
              </p>
            </div>

            {activeTab === "orders" && (
              <button
                onClick={loadOrders}
                disabled={ordersLoading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "9px 16px",
                  background: "#10b98115",
                  border: "1px solid #10b98130",
                  borderRadius: 9,
                  color: "#10b981",
                  cursor: ordersLoading ? "not-allowed" : "pointer",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: 0.3,
                  transition: "all .15s",
                }}
                onMouseEnter={(e) => {
                  if (!ordersLoading) e.currentTarget.style.background = "#10b98125";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#10b98115";
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    animation: ordersLoading ? "spin .8s linear infinite" : "none",
                  }}
                >
                  🔄
                </span>
                Refresh
              </button>
            )}
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "linear-gradient(to right, #1e2330, transparent)",
              marginTop: 20,
            }}
          />
        </header>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <>
            {ordersLoading ? (
              <Spinner label="Memuat daftar order..." />
            ) : orders.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 20px",
                  background: "#0d1117",
                  borderRadius: 18,
                  border: "1px dashed #1e2330",
                  animation: "fadeIn .3s ease",
                }}
              >
                <span style={{ fontSize: 52 }}>📭</span>
                <p
                  style={{
                    color: "#334155",
                    marginTop: 16,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 14,
                  }}
                >
                  Belum ada order tersedia
                </p>
                <p style={{ color: "#1e2d40", fontFamily: "'DM Mono', monospace", fontSize: 12, marginTop: 6 }}>
                  Cek lagi nanti atau tekan Refresh
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: 16,
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                }}
              >
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onTake={handleTakeOrder}
                    onUpdateStatus={(id) => setUpdateModal(id)}
                    loading={!!actionLoading[order.id]}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && <ProfileCard courier={courier} />}
      </main>

      {/* Update Modal */}
      {updateModal !== null && (
        <UpdateStatusModal
          orderId={updateModal}
          onConfirm={handleUpdateStatus}
          onClose={() => setUpdateModal(null)}
          loading={!!actionLoading.statusUpdate}
        />
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={dismiss} />}
    </div>
  );
}