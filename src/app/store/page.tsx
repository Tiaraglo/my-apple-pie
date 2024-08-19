// import React from "react";
// // import StoreHero from '../StoreHero'
// // import HeroCarousal from './HeroCarousal'

import ProductCarousal from "./ProductCarousal";
import StoreProduct from "./StoreProduct";

const Page = () => {
  return (
    <div className="bg-[#F5F5F7] min-h-screen">
      <div className=" container mx-auto">
        <ProductCarousal />
        <StoreProduct />
      </div>
    </div>
  );
};

export default Page;
