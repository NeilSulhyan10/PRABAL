import React, { useState, useEffect } from "react";

const Profile = () => {
  const orders = [
    { id: 1, date: "2025-04-10", total: "$50.00", status: "Delivered" },
    { id: 2, date: "2025-04-05", total: "$120.00", status: "Shipped" },
    { id: 3, date: "2025-03-28", total: "$30.00", status: "Processing" },
  ];

  const [activeSection, setActiveSection] = useState("profile");

  const [user, setUser] = useState({
    ecoPoints: 6, // Change this based on product tags
    rewardUnlocked: false,
  });

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleCheckRewards = () => {
    const unlocked = user.ecoPoints >= 10;
    setUser((prev) => ({ ...prev, rewardUnlocked: unlocked }));
  };

  useEffect(() => {
    handleCheckRewards();
  }, [user.ecoPoints]); // Run on ecoPoints change

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4">
        <h2 className="text-xl font-bold mb-6">Account</h2>
        <ul className="space-y-4 text-gray-700">
          <li
            className={`font-semibold cursor-pointer ${
              activeSection === "profile" ? "text-pink-500" : ""
            }`}
            onClick={() => handleSectionClick("profile")}
          >
            Overview
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === "orders" ? "text-pink-500" : ""
            }`}
            onClick={() => handleSectionClick("orders")}
          >
            Orders & Returns
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === "ecoRewards" ? "text-pink-500" : ""
            }`}
            onClick={() => handleSectionClick("ecoRewards")}
          >
            Coupons
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === "wishlist" ? "text-pink-500" : ""
            }`}
            onClick={() => handleSectionClick("wishlist")}
          >
            Wishlist
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === "delete" ? "text-pink-500" : ""
            }`}
            onClick={() => handleSectionClick("delete")}
          >
            Delete Account
          </li>
        </ul>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-8">
        {/* Profile Details */}
        {activeSection === "profile" && (
          <div className="bg-white shadow p-6 rounded-md mb-8">
            <h3 className="text-2xl font-bold mb-6">Profile Details</h3>
            <div className="grid grid-cols-2 gap-4 text-gray-800">
              <div>
                <p className="font-medium">Full Name</p>
                <p>Rishika</p>
              </div>
              <div>
                <p className="font-medium">Mobile Number</p>
                <p>9028802444</p>
              </div>
              <div>
                <p className="font-medium">Email ID</p>
                <p>- not added -</p>
              </div>
              <div>
                <p className="font-medium">Address</p>
                <p>- not added -</p>
              </div>
              <div>
                <p className="font-medium">Pin Code</p>
                <p>- not added -</p>
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
              EDIT
            </button>
          </div>
        )}

        {/* Order History */}
        {activeSection === "orders" && (
          <div className="bg-white shadow p-6 rounded-md">
            <h3 className="text-2xl font-bold mb-6">Order History</h3>
            {orders.length > 0 ? (
              <table className="min-w-full text-gray-800">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4">Order ID</th>
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Total</th>
                    <th className="text-left py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="py-2 px-4">{order.id}</td>
                      <td className="py-2 px-4">{order.date}</td>
                      <td className="py-2 px-4">{order.total}</td>
                      <td className="py-2 px-4">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No orders placed yet.</p>
            )}
          </div>
        )}

        {/* Rewards Section */}
        {activeSection === "ecoRewards" && (
          <div className="bg-white shadow p-6 rounded-md">
            <h3 className="text-2xl font-bold mb-6">My Rewards</h3>

            {/* Sample list of purchased products with tags */}
            {(() => {
              const purchasedProducts = [
                { name: "Bamboo Toothbrush", tags: ["eco-friendly", "biodegradable"] },
                { name: "Reusable Cotton Bag", tags: ["recyclable", "plastic-free"] },
                { name: "Eco Water Bottle", tags: ["eco-friendly", "low carbon footprint"] },
              ];

              // Count points based on product tags
              const points = purchasedProducts.reduce((totalPoints, product) => {
                totalPoints += product.tags.length;
                return totalPoints;
              }, 0);

              const rewardThresholds = [10, 20, 30];
              const nextRewardThreshold = rewardThresholds.find(
                (threshold) => points < threshold
              ) || rewardThresholds[rewardThresholds.length - 1];

              return (
                <div>
                  <p className="text-lg font-medium mb-4">Your Points: {points}</p>
                  <div className="mb-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                            Progress
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                            {points} / {nextRewardThreshold} points
                          </span>
                        </div>
                      </div>
                      <div className="flex mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div
                            className="bg-pink-500 h-2.5 rounded-full"
                            style={{ width: `${(points / nextRewardThreshold) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {points >= nextRewardThreshold ? (
                    <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
                      🎉 Congratulations! You have unlocked a reward at {nextRewardThreshold} points! 🎁
                    </div>
                  ) : (
                    <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-md">
                      Keep going! You need {nextRewardThreshold - points} more points to unlock your next reward.
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Wishlist Section */}
        {activeSection === "wishlist" && (
          <div className="bg-white shadow p-6 rounded-md">
            <h3 className="text-2xl font-bold mb-6">My Wishlist</h3>

            {/* Sample wishlist items */}
            {[{ id: 1, name: "Bamboo Toothbrush", image: "https://via.placeholder.com/100", price: "$3.99" },
              { id: 2, name: "Reusable Cotton Bag", image: "https://via.placeholder.com/100", price: "$6.49" }]
              .map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b py-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.price}</p>
                    </div>
                  </div>
                  <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Remove
                  </button>
                </div>
              ))}
          </div>
        )}

        {/* Delete Account */}
        {activeSection === "delete" && (
          <div className="bg-white shadow p-6 rounded-md">
            <h3 className="text-2xl font-bold mb-6 text-red-600">Delete Account</h3>
            <p>Are you sure you want to delete your account?</p>
            <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
