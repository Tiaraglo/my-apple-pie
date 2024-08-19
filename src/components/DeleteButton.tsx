"use client";
import { BASE_URL } from "@/constant";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  productId: string;
  onDelete: (id: string) => void;
}

export default function DeleteButton({
  productId,
  onDelete,
}: DeleteButtonProps) {
  const router = useRouter();
  const deleteWishlist = async () => {
    try {
      console.log(
        "Attempting to delete product from wishlist with ID:",
        productId
      );

      const response = await fetch(`${BASE_URL}/api/wishlists`, {
        method: "DELETE",
        body: JSON.stringify({ productId }),
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response, "ini tohh responsenyaa");

      if (!response.ok) {
        const errorText = await response.text();
        console.error(errorText, "error occurred here");
        throw new Error("Failed to delete this product from wishlist.");
      }

      onDelete(productId);

      router.push("/wishlist");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="btn btn-primary btn-sm" onClick={deleteWishlist}>
      Deitail
    </button>
  );
}
