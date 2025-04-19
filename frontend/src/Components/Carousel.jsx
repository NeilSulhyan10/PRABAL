import React, { useRef } from 'react';
import brush from "../Images/brush.jpg"
import cutlery from "../Images/cutlery.jpg"
import notebook from "../Images/notebook.jpg"
import soap from "../Images/soap.webp"
import straw from "../Images/straw.webp"
import wrap from "../Images/wrap.webp"
import tote from "../Images/tote.jpg"


const Carousel = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -250, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 250, behavior: 'smooth' });
  };

  const ecoProducts = [
    { id: 1, name: 'Bamboo Toothbrush', imageUrl: brush, price: '₹129' },
    { id: 2, name: 'Reusable Straw Set', imageUrl: straw, price: '₹199' },
    { id: 3, name: 'Eco Tote Bag', imageUrl: tote, price: '₹249' },
    { id: 4, name: 'Bamboo Cutlery Set', imageUrl: cutlery, price: '₹299' },
    { id: 5, name: 'Plant-Based Soap', imageUrl: soap, price: '₹99' },
    { id: 6, name: 'Beeswax Food Wraps', imageUrl:wrap, price: '₹349' },
    { id: 7, name: 'Eco Notebooks', imageUrl: notebook, price: '₹179' },
  ];

  return (
    <div className="relative w-4/5 mx-auto py-24">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-green-100 p-4 rounded-full shadow-lg text-xl cursor-pointer z-10 transition-all hover:bg-green-300 hover:scale-110 hover:rotate-6 hover:shadow-xl"
      >
        &#10094;
      </button>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto scroll-smooth space-x-8 hide-scrollbar transition-transform duration-500 ease-in-out"
        style={{ overflowY: 'hidden' }}
      >
        {ecoProducts.map((product) => (
          <div
            key={product.id}
            className="flex-none w-72 h-auto bg-white rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-3 hover:opacity-90"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-xl transition-transform transform hover:scale-110 hover:rotate-3 duration-300"
            />
            <div className="py-6 px-6 text-center bg-green-50 rounded-b-xl">
              <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-lg text-gray-600">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-green-100 p-4 rounded-full shadow-lg text-xl cursor-pointer z-10 transition-all hover:bg-green-300 hover:scale-110 hover:rotate-6 hover:shadow-xl"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
