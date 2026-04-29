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

import { Button } from "../ui/button";

import { MenuIcon } from "lucide-react";
import CartIcon from "../atom/CartIcon";

export default function MobileNavbar() {
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
