import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaBook,
  FaAngleDown,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setUserName(user.name.toUpperCase());
    }
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaBook className="text-2xl" />
          <h1 className="text-2xl font-bold tracking-wide">pahana bookshop</h1>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/shop" className="hover:text-yellow-300">Shop</Link>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 hover:text-yellow-300"
            >
              <span>Categories</span>
              <FaAngleDown className="mt-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white text-black rounded shadow-md mt-2 w-40 z-50">
                <Link to="/categories/fiction" className="block px-4 py-2 hover:bg-gray-100">Fiction</Link>
                <Link to="/categories/non-fiction" className="block px-4 py-2 hover:bg-gray-100">Non-Fiction</Link>
                <Link to="/categories/children" className="block px-4 py-2 hover:bg-gray-100">Children</Link>
                <Link to="/categories/education" className="block px-4 py-2 hover:bg-gray-100">Education</Link>
                <Link to="/categories/sci-fi" className="block px-4 py-2 hover:bg-gray-100">Sci-Fi</Link>
              </div>
            )}
          </div>

          <Link to="/about" className="hover:text-yellow-300">About</Link>
          <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <FaSearch className="text-xl cursor-pointer hover:text-yellow-300" />
          <Link to="/cart">
            <FaShoppingCart className="text-xl cursor-pointer hover:text-yellow-300" />
          </Link>
          {userName ? (
            <Link to="/userprofile" className="flex items-center space-x-1 hover:text-yellow-300 font-semibold">
              <FaUserCircle className="text-xl" />
              <span>{userName}</span>
            </Link>
          ) : (
            <Link to="/login" className="hover:text-yellow-300 font-semibold">
              Sign Up
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link to="/" className="block py-2 hover:text-yellow-300">Home</Link>
          <Link to="/shop" className="block py-2 hover:text-yellow-300">Shop</Link>

          <div>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center w-full py-2 hover:text-yellow-300"
            >
              Categories <FaAngleDown className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="bg-white text-black rounded shadow-md mt-2 w-full">
                <Link to="/categories/fiction" className="block px-4 py-2 hover:bg-gray-100">Fiction</Link>
                <Link to="/categories/non-fiction" className="block px-4 py-2 hover:bg-gray-100">Non-Fiction</Link>
                <Link to="/categories/children" className="block px-4 py-2 hover:bg-gray-100">Children</Link>
                <Link to="/categories/education" className="block px-4 py-2 hover:bg-gray-100">Education</Link>
                <Link to="/categories/sci-fi" className="block px-4 py-2 hover:bg-gray-100">Sci-Fi</Link>
              </div>
            )}
          </div>

          <Link to="/about" className="block py-2 hover:text-yellow-300">About</Link>
          <Link to="/contact" className="block py-2 hover:text-yellow-300">Contact</Link>

          <div className="flex flex-col space-y-2 mt-4">
            <div className="flex space-x-4">
              <FaSearch className="text-xl cursor-pointer hover:text-yellow-300" />
              <Link to="/cart">
                <FaShoppingCart className="text-xl cursor-pointer hover:text-yellow-300" />
              </Link>
            </div>
            {userName ? (
              <Link to="/userprofile" className="flex items-center space-x-1 hover:text-yellow-300 font-semibold">
                <FaUserCircle className="text-xl" />
                <span>{userName}</span>
              </Link>
            ) : (
              <Link to="/login" className="hover:text-yellow-300 font-semibold">
                Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
