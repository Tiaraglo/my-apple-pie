"use server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Navbar = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const isLoggedIn = !!token;

  return (
    <header className="sticky top-0 left-0 w-full backdrop-blur-sm bg-gradient-to-r from-slate-50/90 to-gray-50/90 z-50 text-black">
      <div className="container mx-auto flex justify-between lg:gap-5 font-semibold text-sm items-center flex-wrap px-4 lg:px-8">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img src="./assets/icon.svg" alt="icons" className="h-12" />
          </Link>
          {isLoggedIn ? (
            <>
              <form
                action={async () => {
                  "use server";
                  cookies().get("token") && cookies().delete("token");
                  return redirect("/");
                }}
              >
                <button
                  type="submit"
                  className="bg-black text-white text-xs px-4 py-2 rounded-lg hover:bg-white hover:text-black transition duration-300"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-black text-white text-xs px-4 py-2 rounded-lg hover:bg-white hover:text-black transition duration-300">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
        <nav className="flex space-x-4">
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/store" className="hover:underline">
            Store
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/detail" className="hover:underline">
            iPhone
          </Link>
          <Link href="/detail" className="hover:underline">
            Watch
          </Link>
          <Link href="/detail" className="hover:underline">
            AirPods
          </Link>
          <Link href="/detail" className="hover:underline">
            Tv & Home
          </Link>
          <Link href="/detail" className="hover:underline">
            Entertainment
          </Link>
          <Link href="/detail" className="hover:underline">
            Accessories
          </Link>
          <Link href="/detail" className="hover:underline">
            Support
          </Link>
        </nav>
        <div className="flex space-x-4">
          <Link
            href="/about"
            className="hover:text-gray-500 transition duration-300"
          >
            <BiSearch className="text-lg" />
          </Link>
          <Link href="/wishlist">
            <HiOutlineShoppingBag className="text-lg" />
          </Link>
          <Link
            href="/wishlist"
            className="hover:text-gray-500 transition duration-300"
          >
            Wishlist
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
