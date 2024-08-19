"use client";

import { BASE_URL } from "@/constant";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
// import { redirect } from "next/dist/server/api-utils";
import React from "react";

interface AddWishlistButtonProps {
  productId: string;
}

const AddWishlistButton: React.FC<AddWishlistButtonProps> = ({ productId }) => {
  const router = useRouter();

  const addWishlist = async () => {
    try {
      console.log("Attempting to add product to wishlist with ID:", productId);

      const response = await fetch(`${BASE_URL}/api/wishlists`, {
        method: "POST",
        body: JSON.stringify({
          productId,
        }),
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response, "ini responsenyaa");

      if (!response.ok) {
        const errorText = await response.text();
        console.error(errorText, "error disini");
        throw new Error("Failed to add this product to wishlist..");
      }

      const { data } = await response.json();

      console.log(data, "ini tohh datanya");
      router.push("/wishlist");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link href={"/wishlist"}>
      <button
        onClick={() => {
          addWishlist();
        }}
        className="bg-blue-900 text-white font-semibold py-4 px-8 rounded-lg shadow-xl hover:bg-violet-700 transition-colors duration-200"
      >
        Add to Wishlist
      </button>
    </Link>
  );
};

export default AddWishlistButton;
