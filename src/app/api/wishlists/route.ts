import {
  addWishlist,
  deleteWishlist,
  getALlWishlists,
  getWishlistUserLogin,
  WishlistModelType,
} from "@/db/models/wishlist";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  excerpt: string;
  slug: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
}

export interface PostRequestBody {
  productId: string;
}

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id") as string;
  console.log(userId, "ini user id get");

  try {
    const dataWishlist: WishlistItem[] = await getWishlistUserLogin(userId);
    console.log(dataWishlist, "ini datanya");

    return NextResponse.json<ApiResponse<WishlistItem[]>>({
      statusCode: 200,
      message: "Wishlist fetched successfully",
      data: dataWishlist,
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json<ApiResponse<never>>(
      {
        statusCode: 500,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // const body: PostRequestBody = await request.json();
    const body: { productId: string } = await request.json();
    const userId = request.headers.get("x-user-id") as string;

    if (!userId || !body.productId) {
      return NextResponse.json<ApiResponse<never>>(
        {
          statusCode: 400,
          error: "User ID and Product ID are required",
        },
        { status: 400 }
      );
    }

    const newDataWishlist = {
      userId,
      productId: body.productId,
    };

    await addWishlist(newDataWishlist);

    return NextResponse.json<ApiResponse<null>>({
      statusCode: 200,
      message: "Success!, Product added to wishlist",
    });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    return NextResponse.json<ApiResponse<never>>(
      {
        statusCode: 500,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const productId = data.productId;

    // console.log(data, "ini product idnya");

    const delWishlist = await deleteWishlist(productId);

    return NextResponse.json<ApiResponse<null>>({
      statusCode: 200,
      message: "Success!, Wishlist deleted",
    });
  } catch (error) {
    console.error(error, "eror delete");
    return NextResponse.json<ApiResponse<never>>(
      {
        statusCode: 500,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
