"use client";

import { Cart } from "@/widgets/Cart";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
  return (
    <div className="flex justify-between p-4 border-b-2">
      <SidebarTrigger />
      <Link href="/" className="text-xl">
        Well cosmetics
      </Link>
      <Cart />
    </div>
  );
};
