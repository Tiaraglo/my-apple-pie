"use client";

import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/constant";
import DeleteButton from "@/components/DeleteButton";

interface WishlistItem {
  _id: string;
  productId: string;
  userId: string;
  products: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    excerpt: string;
    price: string;
    tags: string[];
    thumbnail: string;
    images: string[];
  };
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlistUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/wishlists`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const dataWishlist = await response.json();
      console.log(dataWishlist.data, "Fetched wishlist data");

      setWishlist(dataWishlist.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistUser();
  }, []);

  const handleDelete = (id: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item._id !== id)
    );
  };

  console.log(wishlist, "Current wishlist data");

  if (loading) {
    return <h2>Loading... please wait a few moments...</h2>;
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <div className="pb-20">
        <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
          <h2 className="col-span-2">Product</h2>
          <h2>Price</h2>
          <h2>Quantity</h2>
          <h2>Sub Total</h2>
        </div>

        <button className="py-1 px-4 text-sm bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold uppercase mb-4 rounded-lg shadow-lg transform hover:scale-105 hover:bg-gradient-to-r hover:from-red-700 hover:to-pink-700 duration-300">
          Reset Your Wishlist
        </button>

        <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
          <div className="flex items-center gap-4">
            <input
              className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
              type="text"
              placeholder="Coupon Number"
            />
            <p className="text-sm mdl:text-base font-semibold">Apply Coupon</p>
          </div>
          <p className="text-lg font-semibold">Update Wishlist</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div key={item._id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={item.products.thumbnail}
                    alt={item.products.name}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-lg font-semibold">
                    {item.products.name}
                  </h2>
                  <p className="text-sm">{item.products.excerpt}</p>
                  <div className="card-actions justify-end">
                    <DeleteButton
                      productId={item._id}
                      onDelete={handleDelete}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Your wishlist is empty.</p>
          )}
        </div>

        <div className="max-w-7xl gap-4 flex justify-end mt-4">
          <div className="w-96 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-right">
              Wishlist Totals
            </h1>
            <div>
              <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                Subtotal
                <span className="font-semibold tracking-wide font-titleFont">
                  {wishlist.length}
                </span>
              </p>
              <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                Shipping Charge
                <span className="font-semibold tracking-wide font-titleFont">
                  Rp{wishlist.length * 15000}
                </span>
              </p>
              <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                {/* Total */}
                <span className="font-bold tracking-wide text-lg font-titleFont">
                  Enter Your Card to buy...
                </span>
              </p>
            </div>
            <div className="flex justify-end">
              <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
