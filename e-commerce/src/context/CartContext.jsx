import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedSize) => {
    const selected = product.size.find((s) => s.size === selectedSize);

    if (!selected || selected.stock === 0) {
      alert("Stock habis!");
      return;
    }

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === selectedSize,
      );

      if (existing) {
        if (existing.qty >= selected.stock) {
          alert("Stock tidak cukup!");
          return prev;
        }

        return prev.map((item) =>
          item.id === product.id && item.size === selectedSize
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size: selectedSize,
          qty: 1,
          stock: selected.stock,
          checked: false,
        },
      ];
    });
  };

  const toggleItem = (id, size) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, checked: !item.checked }
          : item,
      ),
    );

  const toggleSelectAll = (checked) =>
    setCart((prev) => prev.map((item) => ({ ...item, checked })));

  const changeQty = (id, size, delta) =>
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.size === size) {
          const newQty = item.qty + delta;

          if (newQty < 1) return item;

          if (newQty > item.stock) {
            alert("Melebihi stock!");
            return item;
          }

          return { ...item, qty: newQty };
        }
        return item;
      }),
    );

  const removeItem = (id, size) =>
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size)),
    );

  const clearCart = () => setCart([]);

  const deleteSelected = () =>
    setCart((prev) => prev.filter((item) => !item.checked));

  const selectedItems = cart.filter((i) => i.checked);
  const totalItems = selectedItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice = selectedItems.reduce((s, i) => s + i.price * i.qty, 0);
  const allChecked = cart.length > 0 && cart.every((i) => i.checked);
  const someChecked = cart.some((i) => i.checked);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        toggleItem,
        toggleSelectAll,
        changeQty,
        removeItem,
        deleteSelected,
        totalItems,
        clearCart,
        totalPrice,
        allChecked,
        someChecked,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
