import { getProductBySlug } from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const oneProduct = await getProductBySlug(slug);

  return NextResponse.json(
    {
      statusCode: 200,
      message: `Success get a product of ${oneProduct.name}`,
      data: oneProduct,
    },
    {
      status: 200,
    }
  );
}
