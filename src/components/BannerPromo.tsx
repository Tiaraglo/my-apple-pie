import React from "react";

export default function BannerPromo() {
  return (
    <div className="relative bg-gradient-to-r from-blue-100 via-white to-blue-100 pt-20 pb-16">
      <div className="absolute inset-0">
        <img
          src="assets/macbookair.jpeg"
          className="w-full h-full object-cover opacity-30"
          alt="MacBook Air"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto mb-10">
          <p className="text-4xl sm:text-5xl font-bold text-gray-800">
            MacBook Air 15
          </p>
          <p className="text-xl sm:text-2xl text-gray-600 mt-2">
            Promo with 100% cashback🫰!!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-2">
          <p className="text-lg font-medium text-blue-600 hover:underline cursor-pointer">
            Learn More
          </p>
          <p className="text-lg font-medium text-blue-600 hover:underline cursor-pointer"></p>
        </div>
      </div>
    </div>
  );
}
