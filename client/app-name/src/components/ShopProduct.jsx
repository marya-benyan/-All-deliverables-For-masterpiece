import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopProduct = ({ categoryFilter, priceFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products', {
          params: {
            category: categoryFilter === 'all' ? '' : categoryFilter,
            price: priceFilter === 'price-all' ? '' : priceFilter,
            search: searchTerm,
            sort: sortBy.toLowerCase(),
            page: currentPage,
            limit: productsPerPage,
          },
        });
        console.log('Products Response:', response.data);
        // لو الـ response array مباشرة، نستخدمه كده
        const fetchedProducts = Array.isArray(response.data) ? response.data : response.data.products || [];
        setProducts(fetchedProducts);
        // لو مفيش totalPages في الـ response، نحسبها محلياً مؤقتاً
        setTotalPages(
          Array.isArray(response.data) 
            ? Math.ceil(response.data.length / productsPerPage) 
            : response.data.totalPages || 1
        );
      } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
        setProducts([]); // Reset products on error
      }
    };

    fetchProducts();
  }, [categoryFilter, priceFilter, searchTerm, sortBy, currentPage]);

  const handleSortSelect = (option) => {
    setSortBy(option);
    setSortDropdownOpen(false);
    setCurrentPage(1); // Reset to page 1 when sorting changes
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Products</h2>

        {/* Search and Sort Section */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between">
            <div className="relative w-full md:w-auto mb-4 md:mb-0">
              <div className="flex items-center border border-[#d39c94] rounded-full overflow-hidden">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="w-full px-4 py-2 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-[#d39c94] px-3 py-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="relative w-auto">
              <button
                className="flex items-center border border-[#d39c94] rounded-full px-4 py-2 text-sm text-[#d39c94]"
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              >
                <span>Sort by: {sortBy}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {sortDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-10">
                  <button onClick={() => handleSortSelect('Latest')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Latest</button>
                  <button onClick={() => handleSortSelect('Popularity')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Popularity</button>
                  <button onClick={() => handleSortSelect('Best Rating')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Best Rating</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="bg-white">
                <div className="overflow-hidden">
                  <img
                    src={`http://localhost:5000/${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-base font-medium text-gray-800 mb-2">{product.name}</h3>
                  <div className="mb-4">
                    <span className="text-base text-gray-800">${product.discountApplied ? product.discountedPrice : product.price.toFixed(2)}</span>
                    {product.discountApplied && (
                      <span className="text-gray-400 line-through ml-2">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between px-2">
                    <a
                      href={`/ShopDetail/${product._id}`}
                      className="flex items-center text-[#d39c94] hover:text-[#b77c75] transition-colors border border-[#d39c94] rounded px-3 py-1 mr-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      View Detail
                    </a>
                    <a
                      href="/cart"
                      className="flex items-center text-[#d39c94] hover:text-[#b77c75] transition-colors border border-[#d39c94] rounded px-3 py-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                        <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No products found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="flex items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100"
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded mx-1 ${
                  currentPage === page
                    ? 'bg-[#d39c94] text-white'
                    : 'border text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100"
            >
              »
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ShopProduct;