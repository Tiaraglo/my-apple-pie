import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  thumbnail: string;
  name: string;
  images: string[];
}

interface CardProps {
  data: Product[];
}

export default function Card(props: CardProps) {
  return (
    <div className="flex mt-10 h-full items-center justify-center bg-neutral-800">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-[url('https://live.staticflickr.com/5225/5684012860_f5d35198cf_b.jpg')] bg-cover bg-center"></div>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {props.data.map((product) => (
          <div
            key={product.id}
            className="group relative cursor-pointer items-center justify-center overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-2xl hover:shadow-black/30"
          >
            <div className="h-100 w-85">
              <img
                className="h-full w-full object-cover rounded-t-lg transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110"
                src={product.thumbnail}
                alt={product.name}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black rounded-lg group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70" />
            <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
              <h1 className="font-dmserif text-2xl font-bold text-white">
                {product.name}
              </h1>
              <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {product.excerpt}
              </p>
              <p className="text-lg font-semibold text-white">
                {product.price}
              </p>
              <p className="text-sm text-gray-300">{product.slug}</p>
              <Link
                href={`/products/${product.slug}`}
                className="mt-2 rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60"
              >
                See More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
