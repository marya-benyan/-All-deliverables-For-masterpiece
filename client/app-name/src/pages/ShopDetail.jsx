import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// ضبط axios عشان يبعت الـ cookies مع كل طلب
axios.defaults.withCredentials = true;

const ShopDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        console.log("Product Response:", response.data);
        setProduct(response.data);

        const relatedResponse = await axios.get("http://localhost:5000/api/products", {
          params: {
            category: response.data.category_id?._id || "",
          },
        });
        console.log("Related Products Response:", relatedResponse.data);
        const related = relatedResponse.data.products
          ? relatedResponse.data.products.filter((p) => p._id !== id).slice(0, 4)
          : [];
        setRelatedProducts(related);

        const reviewsResponse = await axios.get(`http://localhost:5000/api/reviews/product/${id}`);
        console.log("Reviews Response:", reviewsResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching product:", error.response?.data || error.message);
        if (error.response?.status === 404) {
          setError("Product not found");
        } else {
          setError("An error occurred while fetching the product");
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      // ما نحتاجش نجيب الـ token يدوياً لأنه بيتبعت مع الـ cookie
      const response = await axios.post(
        "http://localhost:5000/api/reviews",
        {
          product: id,
          rating: newReview.rating,
          comment: newReview.comment,
        }
      );
      setReviews([...reviews, response.data]);
      setNewReview({ rating: 5, comment: "" });
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        alert("Please login to submit a review");
      } else {
        alert(error.response?.data?.error || "An error occurred while submitting your review");
      }
    }
  };

  const handleImageChange = (direction) => {
    if (!product || !product.images) return;
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    } else if (direction === "prev") {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white py-5 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop Detail</h1>
          <div className="flex justify-center">
            <p className="text-gray-600">
              <a href="/" className="hover:text-blue-500">
                Home
              </a>{" "}
              - <span className="text-gray-800">Shop Detail</span>
            </p>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="relative">
              <img
                src={`http://localhost:5000/${product.images[currentImageIndex]}`}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => handleImageChange("prev")}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
              >
                ←
              </button>
              <button
                onClick={() => handleImageChange("next")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
              >
                →
              </button>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/${image}`}
                  alt={`Thumbnail ${index}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                    currentImageIndex === index ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h2>
            <div className="flex items-center mb-4">
              <div className="text-yellow-400">
                {"★".repeat(
                  Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1))
                )}
                {"☆".repeat(
                  5 -
                    Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1))
                )}
              </div>
              <span className="text-gray-600 ml-2">({reviews.length} Reviews)</span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              ${product.discountApplied ? product.discountedPrice : product.price.toFixed(2)}
              {product.discountApplied && (
                <span className="text-gray-400 line-through ml-2">${product.price.toFixed(2)}</span>
              )}
            </h3>

            {/* Quantity and Buttons */}
            <div className="flex items-center mb-6">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-12 text-center border-0"
                  value={quantity}
                  readOnly
                />
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Add to Cart
              </button>
              <button className="ml-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Add to Wishlist
              </button>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center">
              <p className="text-gray-700 font-medium mr-2">Share on:</p>
              <div className="flex space-x-2">
                {["facebook", "twitter", "linkedin", "pinterest"].map((social) => (
                  <a key={social} href="#" className="text-gray-600 hover:text-blue-500">
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex space-x-4 border-b mb-6">
            <button className="text-blue-500 font-medium pb-2 border-b-2 border-blue-500">
              Description
            </button>
            <button className="text-gray-600 hover:text-blue-500 font-medium pb-2">
              Additional Information
            </button>
            <button className="text-gray-600 hover:text-blue-500 font-medium pb-2">
              Reviews ({reviews.length})
            </button>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">Product Description</h4>
            <p className="text-gray-700 mb-4">{product.description}</p>
          </div>

          {/* Reviews */}
          <div className="mt-6">
  <h4 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h4>
  {reviews.map((review) => (
    <div key={review._id} className="border-b py-4">
      <div className="flex items-center mb-2">
        <span className="text-yellow-400">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </span>
        <span className="ml-2 text-gray-600">
          {review.user?.name || "Anonymous"} {/* تأكدي إن الـ name بيظهر */}
        </span>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  ))}

            {/* Add Review Form */}
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Add a Review</h4>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="border rounded-lg px-4 py-2 w-full"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} Star{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Comment</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="border rounded-lg px-4 py-2 w-full"
                    rows="4"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-lg text-center">
              <img
                src={`http://localhost:5000/${item.images[0]}`}
                alt={item.name}
                className="w-full h-auto rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-gray-700 mb-4">
                ${item.discountApplied ? item.discountedPrice : item.price.toFixed(2)}
                {item.discountApplied && (
                  <span className="text-gray-400 line-through ml-2">${item.price.toFixed(2)}</span>
                )}
              </p>
              <div className="flex justify-center space-x-2">
                <a
                  href={`/ShopDetail/${item._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  View Detail
                </a>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;