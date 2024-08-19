import AddWishlistButton from "@/components/AddWishlistButton";
import { BASE_URL } from "@/constant";
import type { Metadata, ResolvingMetadata } from "next";

type Meta = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Meta,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  const data = await fetch(`${BASE_URL}/api/products/${slug}`).then((res) =>
    res.json()
  );

  console.log(data, "ini datanya");

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `detail${data.data.slug}`,
    description: data.data.excerpt,
  };
}

async function getDetailProduct(slug: string) {
  const response = await fetch(`${BASE_URL}/api/products/${slug}`);

  const detailProduct = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch detail product");
  }
  console.log(detailProduct, "data detail");

  return detailProduct;
}

export default async function DetailProduct({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params, "ini paramsss");

  const data = await getDetailProduct(params.slug);

  const dataOneProduct = data.data;
  console.log(dataOneProduct, "ini datanya");

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-[url('https://live.staticflickr.com/5225/5684012860_f5d35198cf_b.jpg')] bg-cover bg-center"></div>
      </div>
      <div className="relative max-w-5xl w-full bg-gray-300 shadow-xl rounded-lg p-12 lg:p-16 z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="flex-1">
            <img
              src={dataOneProduct.thumbnail}
              alt={dataOneProduct.name}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
            <div className="flex overflow-x-auto space-x-3 mt-4">
              {dataOneProduct.images
                .slice(0, 4)
                .map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`product-thumbnail-${index}`}
                    className="w-32 h-32 object-cover rounded-md cursor-pointer border border-gray-300"
                  />
                ))}
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {dataOneProduct.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-blue-200 text-blue-800 text-xs font-medium py-1 px-2 rounded-full border border-blue-300 shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mt-2">
                {dataOneProduct.name}
              </h1>
            </div>
            <p className="text-gray-700 text-lg lg:text-xl">
              {dataOneProduct.description}
            </p>
            <h6 className="text-3xl lg:text-4xl font-semibold mt-4">
              {dataOneProduct.price}
            </h6>
            <div className="flex items-center gap-6 mt-8">
              <AddWishlistButton
                productId={dataOneProduct._id}
              ></AddWishlistButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
