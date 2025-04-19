// components/Cart.jsx
import React from 'react';
import EcoRating from '../../Components/EcoRating';

const Cart = ({ cartItems, setCartItems }) => {
  const switchToAlternative = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index] = updatedItems[index].alternative;
    setCartItems(updatedItems);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600 mb-10 tracking-tight">
        🛒 Your Eco Cart
      </h2>

      {!cartItems || cartItems.length === 0 ? (
        <p className="text-gray-400 text-xl">Your cart’s feeling empty 🌱</p>
      ) : (
        cartItems.map((item, idx) => (
          <div
            key={idx}
            className="relative backdrop-blur-md border border-white/20 bg-white/10 rounded-2xl p-6 mb-8 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-[1.015] hover:shadow-lg"
          >
            {/* Accent ring */}
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-green-300 via-emerald-400 to-lime-400 blur-sm opacity-25 animate-pulse z-[-1]" />

            {/* Main Item Info */}
            <h3 className="text-2xl font-semibold text-white mb-2">{item.name}</h3>
            <p className="text-gray-200 mb-1">💰 ₹{item.price}</p>
            <EcoRating rating={item.ecoRating} />
            <p className="text-sm text-gray-400 mt-1">
              🌍 Carbon Footprint: {item.carbonFootprint} kg CO₂
            </p>

            {/* Greener Alternative Suggestion */}
            {item.alternative && item.ecoRating < 4 && (
              <div className="mt-6 bg-green-100/10 border border-green-400/30 rounded-xl p-4">
                <h4 className="text-green-300 font-semibold text-lg mb-1 flex items-center gap-1">
                  🌿 Greener Alternative Available:
                </h4>
                <p className="text-white font-medium text-lg">
                  {item.alternative.name} — ₹{item.alternative.price}
                </p>
                <EcoRating rating={item.alternative.ecoRating} />
                <p className="text-sm text-green-200 mt-1">
                  Carbon Footprint: {item.alternative.carbonFootprint} kg CO₂
                </p>
                <button
                  onClick={() => switchToAlternative(idx)}
                  className="mt-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-300"
                >
                  🌱 Switch to Greener Option
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
