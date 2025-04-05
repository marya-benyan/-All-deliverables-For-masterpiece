import { useState } from "react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: "Colorful Stylish", price: 150, image: "/api/placeholder/100/100" },
    { id: 2, name: "Colorful Stylish", price: 150, image: "/api/placeholder/100/100" },
    { id: 3, name: "Colorful Stylish", price: 150, image: "/api/placeholder/100/100" },
    { id: 4, name: "Colorful Stylish", price: 150, image: "/api/placeholder/100/100" },
    { id: 5, name: "Colorful Stylish", price: 150, image: "/api/placeholder/100/100" },
  ]);

  const handleRemove = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const handleMoveToCart = (item) => {
    // Placeholder for moving item to cart logic
    console.log(`Moved ${item.name} to cart`);
    // You could integrate this with a cart context or state management
    // For now, we'll just remove it from wishlist
    setWishlist(wishlist.filter(w => w.id !== item.id));
  };

  return (
    <div className="bg-white" style={{ minHeight: "100vh" }}>
      {/* Header with Navigation */}
      <div className="py-8 text-center" style={{ backgroundColor: "#d39c94" }}>
        <h1 className="text-3xl font-bold text-white">WISHLIST</h1>
        <div className="flex justify-center gap-2 mt-2">
          <span className="text-white opacity-80">Home</span>
          <span className="text-white opacity-80">-</span>
          <span className="text-white font-medium">Wishlist</span>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Wishlist Items */}
          <div className="w-full md:w-3/4">
            {wishlist.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center border" style={{ borderColor: "#ecf4fc" }}>
                <p className="text-lg" style={{ color: "#c37c73" }}>Your wishlist is empty</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center border"
                    style={{ borderColor: "#ecf4fc" }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg mr-4 mb-3 md:mb-0"
                    />
                    <div className="flex-grow">
                      <h5 className="text-lg font-semibold" style={{ color: "#c37c73" }}>{item.name}</h5>
                      <p className="font-medium" style={{ color: "#d39c94" }}>${item.price}</p>
                    </div>
                    <div className="flex gap-2 mt-3 md:mt-0">
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="px-4 py-2 rounded text-white hover:opacity-90 transition"
                        style={{ backgroundColor: "#c37c73" }}
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-90 transition"
                        style={{ backgroundColor: "#d39c94" }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Summary */}
          <div className="w-full md:w-1/4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden border" style={{ borderColor: "#ecf4fc" }}>
              <div className="p-4 border-b" style={{ backgroundColor: "#d39c94" }}>
                <h2 className="text-xl font-bold text-white">Wishlist Summary</h2>
              </div>
              <div className="p-4">
                <p style={{ color: "#c37c73" }}>
                  You can move items to the cart to proceed with your purchase.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="font-medium" style={{ color: "#c37c73" }}>
                    Total Items: {wishlist.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-12 h-12 flex items-center justify-center text-white p-3 rounded-full hover:opacity-90 transition shadow-lg"
          style={{ backgroundColor: "#c37c73" }}>
          ↑
        </button>
      </div>
    </div>
  );
};

export default Wishlist;