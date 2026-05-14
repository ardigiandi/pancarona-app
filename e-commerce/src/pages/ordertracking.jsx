import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import Pusher from "pusher-js";
import { useAuth } from "../context/AuthContext";
import api from "@/lib/api";
import { formatPrice } from "@/utils/formatPrice";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Status yang berarti kurir sedang aktif bergerak (lowercase sesuai DB)
const ACTIVE_STATUSES = ["pickup_process", "on_delivery"];

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], map.getZoom(), { animate: true });
    }
  }, [coords, map]);
  return null;
}

// Simpan & ambil orders dari sessionStorage agar tidak hilang saat refresh
const STORAGE_KEY_ORDERS = "pancarona_orders";
const STORAGE_KEY_LOCATIONS = "pancarona_courier_locations";

function saveToSession(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function loadFromSession(key) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function OrderTracking() {
  const { id } = useParams();
  const { user } = useAuth();
  const hasFetched = useRef(false);

  const [orders, setOrders] = useState(() => {
    // Langsung load dari sessionStorage saat pertama render
    // sehingga tidak kosong saat refresh
    const saved = loadFromSession(STORAGE_KEY_ORDERS);
    if (!saved) return [];
    // Kalau ada id di URL, filter hanya order yg sesuai
    if (id) return saved.filter((o) => String(o.id) === String(id));
    return saved;
  });

  const [courierLocations, setCourierLocations] = useState(() => {
    return loadFromSession(STORAGE_KEY_LOCATIONS) ?? {};
  });

  const [loading, setLoading] = useState(orders.length === 0); // tidak loading kalau sudah ada data dari session

  // ── Fetch order data ──────────────────────────────────
  useEffect(() => {
    // Kalau user belum siap atau sudah pernah fetch, skip
    if (!user || hasFetched.current) return;
    hasFetched.current = true;

    const fetchOrderData = async () => {
      try {
        const endpoint = id ? `/orders/${id}` : "/orders/latest";
        const { data } = await api.get(endpoint);
        const orderArray = Array.isArray(data) ? data : [data];

        setOrders(orderArray);
        saveToSession(STORAGE_KEY_ORDERS, orderArray);

        // Simpan lokasi awal dari response API kalau ada
        orderArray.forEach((order) => {
          if (order.last_lat && order.last_lng) {
            setCourierLocations((prev) => {
              const updated = {
                ...prev,
                [order.id]: {
                  lat: Number(order.last_lat),
                  lng: Number(order.last_lng),
                },
              };
              saveToSession(STORAGE_KEY_LOCATIONS, updated);
              return updated;
            });
          }
        });
      } catch (err) {
        console.error("Gagal memuat status pelacakan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [user, id]);

  // ── Pusher realtime ───────────────────────────────────
  useEffect(() => {
    if (!user || orders.length === 0) return;

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
      encrypted: true,
    });

    // Channel per-user untuk update status
    const statusChannel = pusher.subscribe(`user-order-${user.id}`);
    statusChannel.bind("status-update", (data) => {
      setOrders((prev) => {
        const updated = prev.map((o) =>
          Number(o.id) === Number(data.orderId)
            ? { ...o, status: data.status }
            : o,
        );
        saveToSession(STORAGE_KEY_ORDERS, updated);
        return updated;
      });
    });

    // Channel per-order untuk update lokasi
    const locationChannels = orders.map((order) => {
      const ch = pusher.subscribe(`order-${order.id}`);
      ch.bind("location-update", (coords) => {
        setCourierLocations((prev) => {
          const updated = {
            ...prev,
            [order.id]: { lat: coords.lat, lng: coords.lng },
          };
          saveToSession(STORAGE_KEY_LOCATIONS, updated);
          return updated;
        });
      });
      return { channel: ch, orderId: order.id };
    });

    return () => {
      statusChannel.unbind_all();
      pusher.unsubscribe(`user-order-${user.id}`);
      locationChannels.forEach((lc) => {
        lc.channel.unbind_all();
        pusher.unsubscribe(`order-${lc.orderId}`);
      });
    };
  }, [user, orders.length]); // orders.length agar tidak re-subscribe tiap render

  // ── Render states ─────────────────────────────────────
  if (loading) {
    return (
      <div
        className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-white"
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
      >
        <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-600 rounded-full animate-spin mb-3" />
        <p className="text-xs font-semibold text-slate-500">
          Memuat detail pelacakan...
        </p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div
        className="w-full p-12 text-center bg-white border border-slate-100 rounded-2xl max-w-xl mx-auto my-10 shadow-sm"
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
      >
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-2xl mb-3">
          📦
        </div>
        <h3 className="font-bold text-slate-800 text-md">
          Tidak Ada Pengiriman Aktif
        </h3>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen bg-slate-50/50 py-6 px-4 md:px-8 antialiased text-slate-800"
      style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
    >
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {orders.map((singleOrder) => {
          const hasLocation = !!courierLocations[singleOrder.id];

          // Fix: pakai lowercase sesuai nilai DB
          const isOnDelivery = ACTIVE_STATUSES.includes(
            singleOrder.status?.toLowerCase(),
          );

          return (
            <div
              key={singleOrder.id}
              className="w-full bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-linear-to-r from-slate-50/40 to-white">
                <div>
                  <h2 className="font-extrabold text-slate-900 text-base">
                    Pesanan Pancarona
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ID Pesanan:{" "}
                    <span className="font-mono font-bold text-slate-700">
                      #{singleOrder.id}
                    </span>
                  </p>
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {singleOrder.status || "Dalam Pengiriman"}
                </span>
              </div>

              {/* Main Grid */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Kiri: Info pengiriman */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-2.5">
                    <h3 className="font-bold text-[11px] text-slate-400 uppercase tracking-wider">
                      Informasi Pengiriman
                    </h3>
                    <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100/50 text-xs space-y-3">
                      <div className="flex gap-4">
                        <div className="text-slate-400 w-20 shrink-0 font-medium">
                          Penerima:
                        </div>
                        <div className="text-slate-800 font-bold">
                          {singleOrder.fullName}
                        </div>
                      </div>
                      <div className="h-px bg-slate-200/50 w-full" />
                      <div className="flex gap-4">
                        <div className="text-slate-400 w-20 shrink-0 font-medium">
                          Alamat Kirim:
                        </div>
                        <div className="text-slate-700 leading-relaxed font-medium">
                          {singleOrder.address}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50/30 rounded-2xl border border-dashed border-slate-200/60 flex justify-between items-center">
                    <div>
                      <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">
                        Total Tagihan
                      </span>
                      <span className="inline-block text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 mt-0.5">
                        Lunas via Sistem
                      </span>
                    </div>
                    <span className="text-xl font-black text-rose-700 tracking-tight">
                      {formatPrice(singleOrder.totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Kanan: Peta */}
                <div className="lg:col-span-5 space-y-2.5 w-full">
                  <h3 className="font-bold text-[11px] text-slate-400 uppercase tracking-wider">
                    Lokasi Kurir Real-Time
                  </h3>
                  {isOnDelivery && hasLocation ? (
                    <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-100 shadow-inner relative z-10">
                      <MapContainer
                        center={[
                          courierLocations[singleOrder.id].lat,
                          courierLocations[singleOrder.id].lng,
                        ]}
                        zoom={15}
                        style={{ height: "100%", width: "100%" }}
                        zoomControl={true}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker
                          position={[
                            courierLocations[singleOrder.id].lat,
                            courierLocations[singleOrder.id].lng,
                          ]}
                        >
                          <Popup>
                            <div className="p-0.5 text-xs font-semibold text-slate-800">
                              Kurir membawa pesanan #{singleOrder.id}
                            </div>
                          </Popup>
                        </Marker>
                        <RecenterMap
                          coords={courierLocations[singleOrder.id]}
                        />
                      </MapContainer>
                    </div>
                  ) : (
                    <div className="w-full h-48 rounded-2xl bg-amber-50/40 border border-amber-100 flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mb-2" />
                      <p className="text-xs font-bold text-amber-800">
                        Menunggu Koordinat Kurir
                      </p>
                      <p className="text-[10px] text-amber-600/70 max-w-[200px] mt-0.5 leading-normal">
                        Sinyal GPS kurir aktif otomatis saat mulai jalan.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Daftar Produk */}
              <div className="p-6 bg-slate-50/10 border-t border-slate-50">
                <h3 className="font-bold text-[11px] text-slate-400 uppercase tracking-wider mb-3">
                  Daftar Produk
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {singleOrder.items?.length > 0 ? (
                    singleOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 items-center bg-white p-2.5 border border-slate-100 rounded-2xl shadow-xs"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-xl bg-slate-50 border shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-slate-800 truncate">
                            {item.name}
                          </h4>
                          <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                            Ukuran: {item.size} <span className="mx-1">•</span>{" "}
                            Qty: {item.qty}
                          </p>
                        </div>
                        <p className="text-xs font-extrabold text-slate-900 pr-1">
                          {formatPrice(item.price * item.qty)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 col-span-full">
                      Tidak ada item.
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
