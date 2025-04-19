import React, { useState, useEffect } from "react";
import { BadgeCheck } from "lucide-react";
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  ShoppingBag,
  Package,
  LineChart as LineChartIcon,
  Leaf,
  User,
  Mail,
  Building2,
} from "lucide-react";

const ecoIcons = ["🌱", "🍀", "🌿", "🌍", "🪴"];

const Dashboard = () => {
  const [selectedIcon] = useState(ecoIcons[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // optional: for loading state
  const [error, setError] = useState(null);
  const monthlySalesData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 500 },
    { month: "Apr", sales: 700 },
    { month: "May", sales: 450 },
    { month: "June", sales: 100 },
    { month: "July", sales: 320 },
    { month: "Aug", sales: 140 },
    { month: "Sept", sales: 463 },
    { month: "Oct", sales: 361 },
    { month: "Nov", sales: 510 },
    { month: "Dec", sales: 809 },
  ];

  const dailySalesData = Array.from({ length: 30 }, (_, i) => ({
    date: `Apr ${i + 1}`,
    sales: Math.floor(Math.random() * 100),
  }));

  const sellerInfo = {
    seller_id: 101,
    seller_name: "Dhriti Shah",
    seller_email: "dhriti@example.com",
    seller_company_name: "EcoSpark Pvt. Ltd.",
    seller_company_description:
      "EcoSpark is dedicated to delivering sustainable and eco-friendly products with minimal environmental impact.",
  };

  const stats = {
    totalProducts: 24,
    inStock: 160,
    monthlySales: "₹1,230",
  };
  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("seller_id");
      try {
        const response = await axios.get(`http://localhost:5000/api/sellers/${id}`);
        setData(response.data);
        console.log(response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchData(); // ← Call the function here!
  }, []);
  
  return (
    <div className="bg-gray-50 min-h-screen font-['Poppins'] text-[#1F2421]">
      <div className="container mx-auto py-10 px-4">
        <p className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500 drop-shadow-md tracking-wide">
          {selectedIcon} Seller Dashboard
        </p>
        <div className="w-32 h-1 mt-4 mx-auto bg-gradient-to-r from-green-500 to-yellow-400 rounded-full animate-pulse"></div>

        {/* Seller Info */}
        <div className="bg-white shadow-md rounded-2xl p-8 mb-10 mt-8">
          <h2 className="text-2xl font-semibold text-[#2e7d32] mb-6">🏢 Seller Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-[#1F2421]">
            <p>
              <BadgeCheck className="inline mr-2 text-[#43a047]" />
              <strong>Seller ID:</strong> {sellerInfo.seller_id}
            </p>
            <p>
              <User className="inline mr-2 text-[#43a047]" />
              <strong>Name:</strong> {sellerInfo.seller_name}
            </p>
            <p>
              <Mail className="inline mr-2 text-[#43a047]" />
              <strong>Email:</strong> {sellerInfo.seller_email}
            </p>
            <p>
              <Building2 className="inline mr-2 text-[#43a047]" />
              <strong>Company:</strong> {sellerInfo.seller_company_name}
            </p>
            <p className="md:col-span-2">
              <Leaf className="inline mr-2 text-[#43a047]" />
              <strong>Description:</strong> {sellerInfo.seller_company_description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard icon={<Package size={24} />} label="Total Products" value={stats.totalProducts} />
          <StatCard icon={<ShoppingBag size={24} />} label="Items in Stock" value={stats.inStock} />
          <StatCard icon={<LineChartIcon size={24} />} label="Monthly Sales" value={stats.monthlySales} />
        </div>

        {/* Daily Sales Chart */}
        <div className="bg-white shadow-md rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-semibold text-[#2e7d32] mb-6">📆 Daily Sales (April)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2e7d32" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Sales Chart */}
        <div className="bg-white shadow-md rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-[#2e7d32] mb-6">📊 Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlySalesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#66bb6a">
                {monthlySalesData.map((_, i) => (
                  <Cell key={i} fill="#388e3c" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white shadow-md p-6 rounded-2xl border hover:shadow-xl transition-all duration-300">
    <div className="flex items-center space-x-4">
      <div className="text-[#2e7d32]">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-[#388e3c]">{label}</p>
        <p className="text-xl font-bold text-[#1F2421]">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
