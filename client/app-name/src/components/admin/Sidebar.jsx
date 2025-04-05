import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/api';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully", { position: "top-right" });
      navigate('/login');
    } catch (error) {
      toast.error("Error logging out: " + (error.response?.data?.error || error.message), {
        position: "top-right",
      });
      navigate('/login');
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin' }, // الـ Dashboard الرئيسي
    { name: 'Products', path: '/admin/products' },
    { name: 'Categories', path: '/admin/categories' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Reviews', path: '/admin/reviews' },
    { name: 'Custom Orders', path: '/admin/custom-orders' },
    // شلت Discounts وGift Messages وContact Messages لأنهم مش في الـ routes
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Masterpiece Admin
      </div>
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block py-3 px-4 mb-2 rounded-lg transition-all duration-200 ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="p-4 bg-red-600 hover:bg-red-700 transition-all duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;