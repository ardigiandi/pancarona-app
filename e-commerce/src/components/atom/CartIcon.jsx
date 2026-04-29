import { Link } from "react-router";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <Link to="/cart" className="relative">
      <img src="/assets/shopping-bag.svg" alt="" className="w-5 h-5 lg:w-6 lg:h-6" />

      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-maroon text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
