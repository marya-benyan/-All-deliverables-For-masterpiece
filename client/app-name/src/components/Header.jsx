import React from 'react';  

const Header = () => {   
  return (     
    <div className="bg-[#d39c94] py-4">       
      <div className="container mx-auto px-4">         
        <div className="flex justify-between items-center">           
          {/* Logo */}           
          <div className="flex items-center">             
            <a href="/" className="text-decoration-none">               
              <h2 className="text-2xl font-bold text-gray-800">                 
                <span className="text-gray-800 border border-gray-800 px-2 mr-1">E</span>LORA MARYA               
              </h2>             
            </a>           
          </div>            
          
          {/* Search Bar */}           
          <div className="flex-grow mx-8">             
            <div className="relative">               
              <input                 
                type="text"                 
                className="w-full rounded-md py-2 px-4 bg-[#ecf4fc] focus:outline-none focus:ring-2 focus:ring-[#bc7265]"                 
                placeholder="Search for products"               
              />               
              <button                 
                type="submit"                 
                className="absolute right-0 top-0 h-full bg-[#ecf4fc] text-gray-500 px-4 rounded-r-md hover:text-[#c37c73] transition duration-300"               
              >                 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">                   
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />                 
                </svg>               
              </button>             
            </div>           
          </div>            
          
          {/* Icons (Heart and Cart) */}           
          <div className="flex items-center space-x-6">             
            <a href="/wishlist" className="relative text-gray-800 hover:text-[#bc7265] transition duration-300">               
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">                 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />               
              </svg>               
              <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>             
            </a>             
            <a href="/ShoppingCart" className="relative text-gray-800 hover:text-[#bc7265] transition duration-300">               
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">                 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />               
              </svg>               
              <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>             
            </a>             
            <a href="/profile" className="text-gray-800 hover:text-[#bc7265] transition duration-300">               
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">                 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />               
              </svg>             
            </a>           
          </div>         
        </div>       
      </div>     
    </div>   
  ); 
};  

export default Header;