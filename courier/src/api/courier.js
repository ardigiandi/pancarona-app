const API_BASE = "http://localhost:5000/api";

const request = async (method, path, body) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
};

// ── Auth ──────────────────────────────────────────────────
export const loginCourier = (email, password) =>
  request("POST", "/courier/auth/login", { email, password });

export const registerCourier = (name, email, password, vehicle) =>
  request("POST", "/courier/auth/register", { name, email, password, vehicle });

export const logoutCourier = () =>
  request("POST", "/courier/logout");

export const getCourierProfile = () =>
  request("GET", "/courier/me");

// ── Orders ────────────────────────────────────────────────
export const getAvailableOrders = () =>
  request("GET", "/courier/orders/available");

export const takeOrder = (orderId, courierId) =>
  request("PUT", `/courier/take-order/${orderId}`, { courierId });

export const updateOrderStatus = (orderId, status, note) =>
  request("PATCH", `/courier/order/${orderId}/status`, { status, note });

export const updateOrderLocation = (orderId, lat, lng) =>
  request("POST", "/courier/order/location", { orderId, lat, lng });