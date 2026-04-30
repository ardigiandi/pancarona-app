import { Link } from "react-router";
import { useAuth } from "@/context/AuthContext";
import ProfileMenu from "../fragments/ProfileMenu";

export default function DesktopNavbar() {
  const { user } = useAuth();

  return (
    <div className="lg:flex hidden justify-between items-center w-full">
      <ul className="gap-10 hidden lg:flex">
        <li>
          <Link
            to="/"
            className="text-lg font-semibold tracking-tightest text-hitam"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="text-lg font-semibold tracking-tightest text-hitam"
          >
            Men
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="text-lg font-semibold tracking-tightest text-hitam"
          >
            Women
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="text-lg font-semibold tracking-tightest text-hitam"
          >
            Series
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="text-lg font-semibold tracking-tightest text-hitam"
          >
            Accessories
          </Link>
        </li>
      </ul>

      <div className="lg:flex gap-5 items-center hidden">
        {/* Search */}
        <div className="relative w-45">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-abusoft py-3.5 pl-6 pr-12 rounded-full border-none outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <img src="../assets/search-normal.svg" className="w-6 h-6" alt="" />
          </div>
        </div>

        {user ? (
          <ProfileMenu />
        ) : (
          <Link
            to="/auth/signin"
            className="bg-maroon text-lg tracking-tightest px-8 py-3 rounded-full font-medium text-white"
          >
            Sign In
          </Link>
        )}

      </div>
    </div>
  );
}
