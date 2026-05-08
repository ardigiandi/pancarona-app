import { useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router";

import { Button } from "../ui/button";

import { MenuIcon } from "lucide-react";
import CartIcon from "../atom/CartIcon";
import { useAuth } from "@/context/AuthContext";
import ProfileMenu from "../fragments/ProfileMenu";

export default function MobileNavbar() {
  const { user } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = [
    {
      name: "Home",
      href: "#",
    },
    {
      name: "Men",
      href: "#",
    },
    {
      name: "Women",
      href: "#",
    },
    {
      name: "Series",
      href: "#",
    },
    {
      name: "Contact",
      href: "#",
    },
  ];

  return (
    <div className="flex lg:hidden">
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-6">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex items-center gap-3 justify-start"
                onClick={() => scrollToSection(item.id)}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </nav>

          <div className="p-3 h-lvh flex items-end">
            {user ? (
              <ProfileMenu />
            ) : (
              <Link
                to="/auth/signin"
                className="bg-maroon text-sm w-full text-center tracking-tightest px-4 py-2 rounded-full font-medium text-white"
              >
                Sign In
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
