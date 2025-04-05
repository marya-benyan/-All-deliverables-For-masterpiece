import React, { useState, useEffect } from 'react';
import { getCustomOrders, updateCustomOrder } from '../../services/api';
import { toast } from 'react-toastify';

const CustomOrders = () => {
  const [customOrders, setCustomOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomOrders();
  }, []);

  const fetchCustomOrders = async () => {
    try {
      setLoading(true);
      const response = await getCustomOrders();
      setCustomOrders(response.data);
    } catch (error) {
      console.error('Error fetching custom orders:', error.response?.data);
      toast.error('Error fetching custom orders', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateCustomOrder(orderId, { status: newStatus });
      toast.success('Order status updated', { position: 'top-right' });
      fetchCustomOrders(); // Refresh data
    } catch (error) {
      console.error('Error updating status:', error.response?.data);
      toast.error('Error updating status', { position: 'top-right' });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Custom Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Images</th>
              <th className="py-3 px-6 text-left">Price Range</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customOrders.map((order) => (
              <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6">{order.name}</td>
                <td className="py-3 px-6">{order.user?.name || 'N/A'}</td>
                <td className="py-3 px-6">{order.designDescription}</td>
                <td className="py-3 px-6">
                  {order.images.length > 0 ? (
                    <div className="flex gap-2">
                      {order.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:5000/${img}`}
                          alt="Custom Order"
                          className="w-12 h-12 object-cover rounded"
                        />
                      ))}
                    </div>
                  ) : (
                    'No Images'
                  )}
                </td>
                <td className="py-3 px-6">
                  ${order.priceRange?.min || 0} - ${order.priceRange?.max || 0}
                </td>
                <td className="py-3 px-6">{order.status}</td>
                <td className="py-3 px-6">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="p-2 border rounded-lg"
                  >
                    <option value="قيد التنفيذ">قيد التنفيذ</option>
                    <option value="مكتمل">مكتمل</option>
                    <option value="ملغى">ملغى</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CustomOrders;