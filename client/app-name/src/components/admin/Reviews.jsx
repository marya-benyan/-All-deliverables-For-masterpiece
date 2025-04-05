import React, { useState, useEffect } from 'react';
import { getReviews } from '../../services/api';
import { toast } from 'react-toastify';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getReviews();
      console.log('Reviews Response:', response.data);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error.response?.data);
      toast.error('Error fetching reviews', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Reviews</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">Product</th><th className="py-3 px-6 text-left">User</th><th className="py-3 px-6 text-left">Rating</th><th className="py-3 px-6 text-left">Comment</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6">{review.product?.name || 'N/A'}</td>
                <td className="py-3 px-6">{review.user?.name || 'N/A'}</td>
                <td className="py-3 px-6">{review.rating} stars</td>
                <td className="py-3 px-6">{review.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Reviews;