"use client";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store/ui/ui-store";
import { useCartStore } from "@/store/cart/cart-store";
import { useEffect, useState } from "react";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  // prevent hydration error
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* LOGO */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* CENTER MENU */}
      <div className="hidden sm:block">
        <Link
          href="/gender/men"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Men
        </Link>
        <Link
          href="/gender/women"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Women
        </Link>
        <Link
          href="/gender/kid"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Kids
        </Link>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link
          href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}
          className="mx-2"
        >
          <div className="relative">
            {totalItemsInCart > 0 && loaded && (
              <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white fade-in">
                {totalItemsInCart}
              </span>
            )}

            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={openSideMenu}
          className="p-2 m-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
