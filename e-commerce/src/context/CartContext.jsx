import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/cart");
      setCart(data);
    } catch (err) {
      console.error("Gagal fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async ({
    productId,
    name,
    image,
    price,
    size,
    qty,
    stock,
  }) => {
    try {
      const { data } = await api.post("/cart", {
        productId,
        name,
        image,
        price,
        size,
        qty,
        stock,
      });
      setCart(data);
    } catch (err) {
      console.error("Gagal tambah item:", err);
    }
  };

  const changeQty = async (productId, size, delta) => {
    try {
      await api.put("/cart", { productId, size, delta });
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, qty: item.qty + delta }
            : item,
        ),
      );
    } catch (err) {
      console.error("Gagal update qty:", err.response?.data);
    }
  };

  const removeItem = async (productId, size) => {
    try {
      await api.delete(`/cart/${productId}/${size}`);
      setCart((prev) =>
        prev.filter(
          (item) => !(item.productId === productId && item.size === size),
        ),
      );
    } catch (err) {
      console.error("Gagal hapus item:", err);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart");
      setCart([]);
    } catch (err) {
      console.error("Gagal clear cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, addItem, changeQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
