import React, { useState } from "react";
import logo from "../assets/logo.png";
import heartIcon from "../assets/like.svg";
import searchIcon from "../assets/search.svg";
import cartIcon from "../assets/cart.svg";
import humanIcon from "../assets/client.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full shadow-md">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div>
          <img src={logo} alt="logo" className="h-10" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center items-center font-medium gap-10">
          <h1 className="cursor-pointer hover:text-gray-600">Home</h1>
          <h1 className="cursor-pointer hover:text-gray-600">Shop</h1>
          <h1 className="cursor-pointer hover:text-gray-600">About</h1>
          <h1 className="cursor-pointer hover:text-gray-600">Contact</h1>
        </div>

        {/* Icons (always visible) */}
        <div className="flex items-center gap-6">
          <img src={humanIcon} alt="account" className="h-6 cursor-pointer" />
          <img src={searchIcon} alt="search" className="h-5 cursor-pointer" />
          <img src={heartIcon} alt="wishlist" className="h-5 cursor-pointer" />
          <img src={cartIcon} alt="cart" className="h-5 cursor-pointer" />

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex flex-col gap-1 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-gray-100 font-medium">
          <h1 className="cursor-pointer hover:text-gray-600">Home</h1>
          <h1 className="cursor-pointer hover:text-gray-600">Shop</h1>
          <h1 className="cursor-pointer hover:text-gray-600">About</h1>
          <h1 className="cursor-pointer hover:text-gray-600">Contact</h1>
        </div>
      )}
    </div>
  );
};

export default Navbar;
