import { Link } from "react-router";
import { useCart } from "@/context/CartContext";
import CartFragment from "@/components/fragments/Cart";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <div className="max-w-6xl mx-auto mt-14 px-5 lg:px-0">
      <div className="flex gap-2">
        <Link to="/" className="text-lg">
          Home
        </Link>
        <span>/</span>
        <span className="text-lg font-medium">Cart</span>
      </div>

      <CartFragment cart={cart} />
    </div>
  );
}
