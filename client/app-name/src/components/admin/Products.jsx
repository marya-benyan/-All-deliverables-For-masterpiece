import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, getCategories } from '../../services/api';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    stock: '', // تأكدي إن القيمة هنا بتتغير لما تدخلي قيمة في الـ input
    images: [],
  });

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const productsResponse = await getProducts({ page: currentPage, limit: 6 });
      console.log("Products Response:", productsResponse.data);
      const fetchedProducts = Array.isArray(productsResponse.data.products) ? productsResponse.data.products : [];
      setProducts(fetchedProducts);
      setTotalPages(productsResponse.data.totalPages || 1);

      const categoriesResponse = await getCategories();
      console.log("Categories Response:", categoriesResponse.data);
      setCategories(Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []);
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      console.log("New Product before sending:", newProduct);
      const formData = new FormData();
      Object.keys(newProduct).forEach((key) => {
        if (key === 'images') {
          newProduct.images.forEach((image) => formData.append('images', image));
        } else {
          formData.append(key, newProduct[key]);
        }
      });

      if (!newProduct.name || !newProduct.price || !newProduct.category_id || !newProduct.stock) {
        throw new Error('يرجى ملء جميع الحقول المطلوبة');
      }

      const stockValue = parseInt(newProduct.stock, 10);
      if (isNaN(stockValue) || stockValue < 0) {
        throw new Error('الستوك يجب أن يكون رقم صحيح غير سالب');
      }

      await addProduct(formData);
      setCurrentPage(1);
      fetchData();
      setNewProduct({ name: '', description: '', price: '', category_id: '', stock: '', images: [] });
      toast.success("تم إضافة المنتج بنجاح", { position: "top-right" });
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
      toast.error("خطأ في إضافة المنتج: " + (error.response?.data?.error || error.message), {
        position: "top-right",
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewProduct({ ...newProduct, images: files });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setLoading(true);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Products</h2>
      <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={newProduct.category_id}
          onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          min="0"
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center">
                  No products available.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                console.log("Product:", product);
                return (
                  <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6">
                      {product.images?.length > 0 ? (
                        <img
                          src={`http://localhost:5000/${product.images[0]}`}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td className="py-3 px-6">{product.name}</td>
                    <td className="py-3 px-6">${product.price}</td>
                    <td className="py-3 px-6">{product.category_id?.name || 'Uncategorized'}</td>
                    <td className="py-3 px-6">{product.stock !== undefined ? product.stock : 'N/A'}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Products;