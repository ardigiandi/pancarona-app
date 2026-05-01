import api from "@/lib/api";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getProductBySlug = async (slug) => {
  const res = await api.get(`/products/${slug}`);
  return res.data;
};
