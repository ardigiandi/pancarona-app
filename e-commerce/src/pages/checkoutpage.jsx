import { Link } from "react-router";
import { useCart } from "@/context/CartContext";
import Checkout from "@/components/fragments/Checkout";

export default function CheckoutPage() {
  const { cart } = useCart();

  return (
    <div className="max-w-6xl mx-auto mt-25 px-5 lg:px-0">
      <div className="flex gap-2 items-center">
        <Link to="/" className="text-lg tracking-tightest leading-4">Home</Link>
        <span>/</span>
        <Link to="/cart" className="text-lg tracking-tightest leading-4">Cart</Link>
        <span>/</span>
        <span className="text-lg tracking-tightest leading-4 font-medium">Checkout</span>
      </div>
    
      <Checkout cart={cart} />
    </div>
  );
}