"use client";

import clsx from "clsx";
import Link from "next/link";

import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShareOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { logout } from "@/actions/auth/logout";
import { useUIStore } from "@/store/ui/ui-store";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
  const { data: session } = useSession();

  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <div>
      {/* BG BLACK*/}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 "></div>
      )}

      {/* BLUR */}
      {isSideMenuOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-10 fade-in backdrop-filter backdrop-blur-sm"
          onClick={closeSideMenu}
        ></div>
      )}

      {/* MENU */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        {/* CLOSE BUTTON */}
        <button
          className="absolute top-5
         right-5 cursor-pointer"
          onClick={closeSideMenu}
        >
          <IoCloseOutline size={50} />
        </button>

        {/* INPUT */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />

          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-lg border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* OPTIONS */}
        <Link
          href="/profile"
          onClick={closeSideMenu}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 roudned transition-all duration-300"
        >
          <IoPersonOutline size={24} />

          <span className="ml-3 text-lg">Profile</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 roudned transition-all"
        >
          <IoTicketOutline size={24} />

          <span className="ml-3 text-lg">My Orders</span>
        </Link>

        <Link
          href="/login"
          onClick={closeSideMenu}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 roudned transition-all"
        >
          <IoLogInOutline size={24} />

          <span className="ml-3 text-lg">Sign in</span>
        </Link>

        <button
          onClick={() => {
            logout();
            closeSideMenu();
          }}
          className="w-full flex items-center mt-10 p-2 hover:bg-gray-100 roudned transition-all"
        >
          <IoLogOutOutline size={24} />

          <span className="ml-3 text-lg">Sign out</span>
        </button>

        {/* SEPARATOR */}
        <div className="w-full h-px bg-gray-200 my-10"></div>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 roudned transition-all"
        >
          <IoShareOutline size={24} />

          <span className="ml-3 text-lg">Products</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 roudned transition-all"
        >
          <IoTicketOutline size={24} />

          <span className="ml-3 text-lg">Orders</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 roudned transition-all"
        >
          <IoPeopleOutline size={24} />

          <span className="ml-3 text-lg">Users</span>
        </Link>
      </nav>
    </div>
  );
};
