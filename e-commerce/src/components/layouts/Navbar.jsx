import { Link } from "react-router";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useCart } from "@/context/CartContext";
import CartIcon from "../atom/CartIcon";

export default function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="max-w-6xl mx-auto flex justify-between items-center py-7 gap-32 px-5 lg:px-0">
      <Link to="/">
        <img
          src="/assets/Pancarona..png"
          alt=""
          className="w-37.75 lg:w-56 h-fit"
        />
      </Link>

      <div className="flex items-center gap-5 lg:w-full">
        <DesktopNavbar className="hidden lg:block" />

        {/* Cart dulu di mobile */}
        <div className="order-1 lg:order-3">
          <CartIcon />
        </div>

        {/* Menu setelah cart */}
        <div className="order-2 lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}
