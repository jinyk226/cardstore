import React from "react";
import ModeToggle from "./ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "./UserButton";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <div className="flex space-x-2">
          <ModeToggle />
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart /> Cart
            </Link>
          </Button>
          <UserButton />
        </div>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <div>
              <ModeToggle />
            </div>
            <Button asChild variant="ghost">
              <Link href="/cart">
                <ShoppingCart /> Cart
              </Link>
            </Button>
            <UserButton />
            <SheetDescription />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
