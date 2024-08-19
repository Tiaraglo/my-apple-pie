import React from "react";

const ItemCard = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                alt="Album"
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold">
                New album is released!
              </h2>
              <p className="text-sm">
                Click the button to listen on Spotiwhy app.
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">Listen</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ItemCard;
