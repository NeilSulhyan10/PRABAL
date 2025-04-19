import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.jpg";
import axios from "axios";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [buyerData, setBuyerData] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👇 Fetch Buyer Data
  useEffect(() => {
    const fetchBuyer = async () => {
      const token = localStorage.getItem("token"); // assuming you're storing JWT
      const buyerId = localStorage.getItem("buyerId"); // or get from auth context
      
      if (token && buyerId) {
        try {
          const res = await axios.get(`http://localhost:5000/buyers/${buyerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBuyerData(res.data); // Assuming res.data has name, email, etc.
        } catch (error) {
          console.error("Error fetching buyer:", error);
        }
      }
    };

    fetchBuyer();
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md relative z-50">
      <div className="max-w-screen-xl w-full px-8 flex items-center justify-between py-4">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center space-x-4 rtl:space-x-reverse">
            <img src={logo} className="h-16 w-19" alt="Logo" />
            <span className="text-3xl font-semibold whitespace-nowrap dark:text-white">
              ECO-CART
            </span>
          </Link>
          <ul className="hidden md:flex gap-8 text-lg font-medium text-gray-700 dark:text-white">
            <li><Link to='/' className="hover:text-blue-500">Home</Link></li>
            <li><Link to='/' className="hover:text-blue-500">About Us</Link></li>
            <li><Link to='/' className="hover:text-blue-500">Contact Us</Link></li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-8 absolute right-8" ref={dropdownRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-3 pl-10 rounded-md w-[500px] text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-lg text-gray-500"></i>
          </div>

          <Link to='/cart'><i className="fa-solid fa-cart-shopping text-2xl text-white"></i></Link>
          <Link to='/'><i className="fa-regular fa-heart text-2xl text-white"></i></Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-10 h-10 rounded-full"
                src={buyerData?.photo || "/default-avatar.jpg"}
                alt="user"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50 divide-y divide-gray-100 dark:divide-gray-600">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {buyerData?.name || "Loading..."}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {buyerData?.email || ""}
                  </span>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li><Link to='/profile' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link></li>
                  <li><Link to='/' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link></li>
                  <li><Link to='/' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link></li>
                  <li><Link to='/login' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Log out</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
