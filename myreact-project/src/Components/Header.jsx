// src/components/Header.jsx
import React, { useContext, useState } from "react";
import {
  FiSearch,
  FiUser,
  FiLogIn,
  FiMenu,
  FiX,
  FiShoppingCart,
  FiHeart,
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { GrDashboard } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { isAuthenticated } from "../api/userApi";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // let { user, setUser } = useContext(userContext);

  // console.log(user);
  const { user } = isAuthenticated();
  const cart_items = useSelector((store) => store.cart.cart_items);
  let num = cart_items.length;

  const handleLogout = () => {
    localStorage.removeItem("login_token");
    navigate("/");
  };

  return (
    <header className="w-full shadow-md bg-white z-50">
      {/* Top Layer */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-5 bg-slate-800 text-white space-y-3 md:space-y-0">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-extrabold text-indigo-400 tracking-wide">
            BibekDev
          </span>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-1/2 flex items-center bg-slate-700 px-4 py-2 rounded">
          <FiSearch className="text-white mr-2" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent outline-none text-white placeholder-gray-300 text-sm w-full"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-5 text-white text-lg">
          {/* <Link to="/wishlist" className="hover:text-indigo-400 transition">
            <FiHeart />
          </Link>
           */}
          {user ? (
            <>
              <Link
                to={user.role === 1 ? "/admin/dashboard" : "/profile"}
                className="hover:text-indigo-400 transition"
                title={user.role === 1 ? "Dashboard" : "Profile"}
              >
                {user.role === 1 ? (
                  <RiDashboardHorizontalFill size={20} />
                ) : (
                  <CgProfile size={20} />
                )}
              </Link>

              {user.role !== 1 && (
                <Link
                  to="/cart"
                  className="relative hover:text-indigo-400 transition"
                  title="Cart"
                >
                  <FiShoppingCart />
                  <span className="absolute -top-2 -right-2 bg-indigo-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {num > 0 ? num : 0}
                  </span>
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="hover:text-red-500 cursor-pointer transition"
                title="Logout"
              >
                <FiLogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="hover:text-indigo-400 transition"
                title="Register"
              >
                <FiUser size={20} />
              </Link>
              <Link
                to="/login"
                className="hover:text-indigo-400 transition"
                title="Login"
              >
                <FiLogIn size={20} />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Bottom Layer - Nav */}
      <nav className="bg-gray-400  border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-3 md:py-4">
            {/* Centered Navigation */}
            <div className="hidden md:flex flex-1 justify-center space-x-8 text-slate-700 font-medium text-sm lg:text-base">
              <Link to="/" className="hover:text-indigo-600">
                Home
              </Link>
              <Link to="/product" className="hover:text-indigo-600">
                Products
              </Link>
              <Link to="/about" className="hover:text-indigo-600">
                About
              </Link>
              <Link to="/service" className="hover:text-indigo-600">
                Services
              </Link>
              <Link to="/blog" className="hover:text-indigo-600">
                Blog
              </Link>
              <Link to="/contact" className="hover:text-indigo-600">
                Contact
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-slate-700"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 text-slate-700 font-medium">
            <Link to="/" className="block hover:text-indigo-600">
              Home
            </Link>
            <Link to="/product" className="block hover:text-indigo-600">
              Products
            </Link>
            <Link to="/about" className="block hover:text-indigo-600">
              About
            </Link>
            <Link to="/service" className="block hover:text-indigo-600">
              Services
            </Link>
            <Link to="/blog" className="block hover:text-indigo-600">
              Blog
            </Link>
            <Link to="/contact" className="block hover:text-indigo-600">
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
