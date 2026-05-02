import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function PaymentSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="text-center mt-20 text-white">
      <h1 className="text-2xl font-bold">Pembayaran Berhasil 🎉</h1>
      <p className="mt-2">Terima kasih sudah berbelanja</p>
    </div>
  );
}