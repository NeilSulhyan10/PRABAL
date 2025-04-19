import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.jpg";
export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md relative z-50">
      <div className="max-w-screen-xl w-full px-8 flex items-center justify-between py-4">
        {/* LEFT SIDE: Logo + Nav Links */}
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center space-x-4 rtl:space-x-reverse">
            <img
              src={logo}
              className="h-16 w-19"
              alt="Logo"
            />
            <span className="text-3xl font-semibold whitespace-nowrap dark:text-white">
              ECO-CART
            </span>
          </Link>

          <ul className="hidden md:flex gap-8 text-lg font-medium text-gray-700 dark:text-white">
            <li><Link to= '/' className="hover:text-blue-500">Home</Link></li>
            <li><Link to= '/' className="hover:text-blue-500">About Us</Link></li>
            {/* <li><Link to= '/' className="hover:text-blue-500">Services</Link></li> */}
            <li><Link to= '/' className="hover:text-blue-500">Contact Us</Link></li>
          </ul>
        </div>

        {/* RIGHT SIDE: Search + Cart + Wishlist + Profile */}
        <div className="flex items-center gap-8 absolute right-8" ref={dropdownRef}>
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-3 pl-10 rounded-md w-[500px] text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-lg text-gray-500"></i>
          </div>

          {/* Cart */}
          <Link to='/cart'><i className="fa-solid fa-cart-shopping text-2xl text-white"></i></Link>

          {/* Wishlist */}
          <Link to='/'><i className="fa-regular fa-heart text-2xl text-white"></i></Link>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-10 h-10 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50 divide-y divide-gray-100 dark:divide-gray-600">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
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