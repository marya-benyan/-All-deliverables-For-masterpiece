import React, { useState } from 'react';

const Navbar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Categories Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 bg-[#d39c94] text-white px-4 py-2 rounded hover:bg-[#bc7265] transition duration-300"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              <span>Categories</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isCategoriesOpen && (
              <div className="absolute z-10 bg-[#ecf4fc] shadow-lg rounded-lg mt-2 w-48">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-[#b8e0ec]">
                  Paintings
                </a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-[#b8e0ec]">
                  Candles
                </a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-[#b8e0ec]">
                  Resin art
                </a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-[#b8e0ec]">
                  Books
                </a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-[#b8e0ec]">
                  Makeup
                </a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-[#b8e0ec]">
                  Printed clothing
                </a>
              </div>
            )}
          </div>

          {/* Navigation Links - Centered */}
          <div className={`flex-1 flex justify-center ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="flex flex-col lg:flex-row lg:space-x-6">
              <a
                href="/"
                className="block px-4 py-2 text-gray-800 hover:text-[#bc7265] transition duration-300"
              >
                Home
              </a>
              <a
                href="/shop"
                className="block px-4 py-2 text-gray-800 hover:text-[#bc7265] transition duration-300"
              >
                Shop
              </a>
              <a
                href="/contact"
                className="block px-4 py-2 text-gray-800 hover:text-[#bc7265] transition duration-300"
              >
                Contact us
              </a>
              <a
                href="/about"
                className="block px-4 py-2 text-gray-800 hover:text-[#bc7265] transition duration-300"
              >
                About us
              </a>
              <a
                href="/login"
                className="block px-4 py-2 text-gray-800 hover:text-[#bc7265] transition duration-300"
              >
                Login
              </a>
            </div>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden">
            <button 
              className="text-gray-800 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;