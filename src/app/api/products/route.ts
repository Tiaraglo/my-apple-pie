import { getAllProducts } from "@/db/models/product";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

type ResponseType<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export async function GET() {
  const allProducts = await getAllProducts();

  return NextResponse.json(
    {
      statusCode: 200,
      message: "Success get all products!",
      data: allProducts,
    },
    {
      status: 200,
    }
  );
}
