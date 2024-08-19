import Carousal from "@/components/Carousal";
import Accessories from "./accessories/page";
import Footer from "@/components/Footer";
import BannerPromo from "@/components/BannerPromo";
import ProductCarousel from "./store/ProductCarousal";
import Card from "@/components/Card";
import { getAllProducts } from "@/db/models/product";
import Link from "next/link";

const fetchHomeProduct = async () => {
  const dataProduct = await getAllProducts();
  return dataProduct.slice(0, 5);
};

export default async function Home() {
  const data = await fetchHomeProduct();
  console.log(data, "data product di home");

  return (
    <>
      <BannerPromo />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {data.map((product, i) => (
          <div key={i} className="card glass w-80">
            <figure>
              <img src={product.thumbnail} alt={product.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">{product.price}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link href="/products">
        <div className="flex justify-center mt-4">
          <button className="btn btn-ghost">See All</button>
        </div>
      </Link>
      <Accessories />
      <Carousal />
      <Footer />
    </>
  );
}
