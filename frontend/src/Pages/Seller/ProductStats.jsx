import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const downloadPDF = (type, productList) => {
  const doc = new jsPDF();
  const title = type === "product" ? "Product Report" : "Revenue Report";

  doc.setFontSize(18);
  doc.text(title, 14, 22);

  if (type === "product") {
    const headers = [
      ["Name", "EcoScore", "Avg Feedback", "Category", "Tags", "Best Seller"],
    ];
    const data = productList.map((p) => [
      p.name,
      p.ecoScore,
      p.avgFeedback,
      p.category,
      p.tags.join(", "),
      p.isBestSeller ? "Yes" : "No",
    ]);
    autoTable(doc, {
      startY: 30,
      head: headers,
      body: data,
    });
  } else {
    const headers = [["Name", "Price", "Sold", "Stock", "Revenue"]];
    const data = productList.map((p) => [
      p.name,
      `₹${p.price}`,
      p.sold,
      p.stock,
      `₹${p.price * p.sold}`,
    ]);
    autoTable(doc, {
      startY: 30,
      head: headers,
      body: data,
    });
  }

  doc.save(`${title.replace(" ", "_").toLowerCase()}.pdf`);
};

const ProductStats = () => {
  const productList = [
    {
      name: "Eco-Friendly Water Bottle",
      ecoScore: 4.8,
      price: 349,
      stock: 120,
      sold: 80,
      avgFeedback: 4.6,
      category: "Bottle",
      isBestSeller: true,
      tags: ["Plastic-Free", "Reusable", "Recyclable"],
    },
    {
      name: "Reusable Bamboo Straw",
      ecoScore: 4.2,
      price: 99,
      stock: 300,
      sold: 150,
      avgFeedback: 4.3,
      category: "Accessories",
      isBestSeller: false,
      tags: ["Biodegradable", "Zero Waste", "Plastic-Free"],
    },
    {
      name: "Biodegradable Phone Case",
      ecoScore: 4.6,
      price: 499,
      stock: 80,
      sold: 20,
      avgFeedback: 4.4,
      category: "Accessories",
      isBestSeller: false,
      tags: ["Biodegradable", "Recyclable"],
    },
    {
      name: "Recycled Tote Bag",
      ecoScore: 4.4,
      price: 199,
      stock: 200,
      sold: 180,
      avgFeedback: 4.7,
      category: "Bags",
      isBestSeller: false,
      tags: ["Reused Materials", "Recyclable", "Green Packaging"],
    },
    {
      name: "Organic Cotton T-Shirt",
      ecoScore: 4.7,
      price: 599,
      stock: 150,
      sold: 130,
      avgFeedback: 4.8,
      category: "Clothing",
      isBestSeller: false,
      tags: ["Low Carbon Footprint", "Local Purchase", "Biodegradable"],
    },
  ];

  const tagColors = {
    "Plastic-Free": "bg-green-100 text-green-800",
    Reusable: "bg-blue-100 text-blue-800",
    Recyclable: "bg-yellow-100 text-yellow-800",
    Biodegradable: "bg-lime-100 text-lime-800",
    "Zero Waste": "bg-pink-100 text-pink-800",
    "Reused Materials": "bg-purple-100 text-purple-800",
    "Green Packaging": "bg-cyan-100 text-cyan-800",
    "Low Carbon Footprint": "bg-orange-100 text-orange-800",
    "Local Purchase": "bg-teal-100 text-teal-800",
  };

  const totalProducts = productList.length;
  const ecoScoreAvg = (
    productList.reduce((sum, p) => sum + p.ecoScore, 0) / totalProducts
  ).toFixed(2);
  const avgFeedback = (
    productList.reduce((sum, p) => sum + p.avgFeedback, 0) / totalProducts
  ).toFixed(2);
  const avgPrice = Math.round(
    productList.reduce((sum, p) => sum + p.price, 0) / totalProducts
  );
  const mostExpensive = productList.reduce((prev, curr) =>
    curr.price > prev.price ? curr : prev
  );
  const cheapest = productList.reduce((prev, curr) =>
    curr.price < prev.price ? curr : prev
  );
  const bestSeller = productList.find((p) => p.isBestSeller)?.name || "None";

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <p className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500 drop-shadow-md tracking-wide">
          🌱 Eco Dashboard
        </p>
        <div className="w-32 h-1 mt-4 mx-auto bg-gradient-to-r from-green-500 to-yellow-400 rounded-full animate-pulse"></div>

        {/* Stats Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mb-12">
          <StatCard title="🛍 Total Products" value={totalProducts} />
          <StatCard title="🌿 Avg. EcoScore" value={ecoScoreAvg} />
          <StatCard title="⭐ Avg. Feedback" value={avgFeedback} />
          <StatCard title="💸 Avg. Price" value={`₹${avgPrice}`} />
          <StatCard title="🔥 Best Seller" value={bestSeller} />
          <StatCard
            title="🏆 Most Expensive"
            value={`${mostExpensive.name} (₹${mostExpensive.price})`}
          />
          <StatCard
            title="💰 Cheapest"
            value={`${cheapest.name} (₹${cheapest.price})`}
          />
        </div>

        {/* Product Listing Table */}
        <div className="bg-white shadow-md rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-semibold text-[#2e7d32] mb-6">🛒 Product Listing</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-spacing-y-3">
              <thead className="text-[#1B4332] uppercase text-sm tracking-widest">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">EcoScore</th>
                  <th className="p-3">Avg. Feedback</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Tags</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr
                    key={index}
                    className="bg-[#f9f9f9] hover:scale-[1.02] transition-all duration-300 rounded-xl shadow-sm text-[#1F2421]"
                  >
                    <td className="p-4 font-semibold">{product.name}</td>
                    <td className="p-4">{product.ecoScore}</td>
                    <td className="p-4">{product.avgFeedback}</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {product.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-xs font-medium px-3 py-1 rounded-full ${
                              tagColors[tag] || "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                        {product.isBestSeller && (
                          <span className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
                            🔥 Best Seller
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Report Table */}
        <div className="bg-white shadow-md rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-semibold text-[#2e7d32] mb-6">📈 Revenue Report</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-spacing-y-3">
              <thead className="text-[#1B4332] uppercase text-sm tracking-widest">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Sold</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr
                    key={index}
                    className="bg-[#f9f9f9] hover:scale-[1.02] transition-all duration-300 rounded-xl shadow-sm text-[#1F2421]"
                  >
                    <td className="p-4 font-semibold">{product.name}</td>
                    <td className="p-4">{`₹${product.price}`}</td>
                    <td className="p-4">{product.sold}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">{`₹${product.price * product.sold}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex justify-center gap-6">
          <button
            className="bg-[#66bb6a] text-white text-xl font-semibold px-6 py-3 rounded-full hover:bg-[#5caa57] transition duration-300"
            onClick={() => downloadPDF("product", productList)}
          >
            Download Product Report
          </button>
          <button
            className="bg-[#ffb74d] text-white text-xl font-semibold px-6 py-3 rounded-full hover:bg-[#ff9800] transition duration-300"
            onClick={() => downloadPDF("revenue", productList)}
          >
            Download Revenue Report
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}; 

const StatCard = ({ title, value }) => (
  <div className="bg-white border border-[#9CCC65] shadow-md rounded-xl p-6">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-2xl font-bold text-[#388e3c]">{value}</p>
  </div>
);

export default ProductStats;
