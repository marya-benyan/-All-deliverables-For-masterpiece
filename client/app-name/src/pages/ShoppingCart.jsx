import { useState } from "react";

const ShoppingCart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Colorful Stylish", price: 150, quantity: 1, image: "/image1.jpg" },
    { id: 2, name: "Colorful Stylish", price: 150, quantity: 1, image: "/image2.jpg" },
    { id: 3, name: "Colorful Stylish", price: 150, quantity: 1, image: "/image3.jpg" },
    { id: 4, name: "Colorful Stylish", price: 150, quantity: 1, image: "/image4.jpg" },
    { id: 5, name: "Colorful Stylish", price: 150, quantity: 1, image: "/image5.jpg" },
  ]);

  const handleQuantityChange = (id, type) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1) } : item
    ));
  };

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <div className="bg-white min-h-screen">
      {/* Header with Navigation */}
      <div className="bg-white py-8 text-center">
        <h1 className="text-3xl font-bold text-[#b77c75]">SHOPPING CART</h1>
        <div className="flex justify-center gap-2 mt-2">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">-</span>
          <span className="text-[#b77c75]">Shopping Cart</span>
        </div>
      </div>
      
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Products Table */}
          <div className="w-full md:w-3/4">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-white border-b border-[#d39c94]">
                  <th className="p-4 text-left pl-8 text-[#b77c75]">Products</th>
                  <th className="p-4 text-center text-[#b77c75]">Price</th>
                  <th className="p-4 text-center text-[#b77c75]">Quantity</th>
                  <th className="p-4 text-center text-[#b77c75]">Total</th>
                  <th className="p-4 text-center text-[#b77c75]">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b border-[#d39c94]">
                    <td className="p-4 flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
                      <span className="text-[#b77c75]">{item.name}</span>
                    </td>
                    <td className="p-4 text-center text-[#b77c75]">${item.price}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <button
                          className="bg-[#d39c94] text-white px-3 py-1 rounded-none hover:bg-[#b77c75]"
                          onClick={() => handleQuantityChange(item.id, "decrease")}
                        >-</button>
                        <span className="px-4 py-1 border-t border-b border-[#d39c94] text-[#b77c75]">{item.quantity}</span>
                        <button
                          className="bg-[#d39c94] text-white px-3 py-1 rounded-none hover:bg-[#b77c75]"
                          onClick={() => handleQuantityChange(item.id, "increase")}
                        >+</button>
                      </div>
                    </td>
                    <td className="p-4 text-center text-[#b77c75]">${item.price * item.quantity}</td>
                    <td className="p-4 text-center">
                      <button
                        className="bg-[#d39c94] text-white px-3 py-1 rounded-none hover:bg-[#b77c75]"
                        onClick={() => handleRemove(item.id)}
                      >×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="w-full md:w-1/4">
            <div className="mb-6">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="p-3 w-full border border-[#d39c94] focus:outline-none focus:border-[#b77c75]"
                />
                <button className="bg-[#d39c94] text-white px-4 py-3 hover:bg-[#b77c75]">
                  Apply Coupon
                </button>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-none border border-[#d39c94]">
              <h2 className="text-xl font-bold mb-6 text-[#b77c75]">Cart Summary</h2>
              <div className="flex justify-between pb-2 mb-2 text-[#b77c75]">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between pb-2 mb-4 text-[#b77c75]">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 text-[#b77c75]">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <button className="w-full bg-[#d39c94] text-white py-3 mt-6 hover:bg-[#b77c75]">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-[#d39c94] text-white p-3 hover:bg-[#b77c75]">
          ↑
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;