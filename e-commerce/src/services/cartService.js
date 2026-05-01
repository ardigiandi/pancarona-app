import api from "@/lib/api";

export const getCart = async () => {
  const res = await api.get("/cart");
  return res.data;
};

export const addToCart = async () => {
  const res = await api.post("/cart", data);
  return res.data;
};

export const updateQty = async () => {
  const res = api.put("/cart", data);
  return res.data;
};

export const removeItem = async () => {
  const res = api.delete(`/cart/${productId}/${size}`);
  return res.data;
};

export const clearCart = async () => {
  const res = await api.delete("/cart");
  return res.data;
};
