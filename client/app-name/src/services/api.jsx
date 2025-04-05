import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`API Error: ${error.response.status} - ${error.response.data.error || error.message}`);
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    } else {
      console.error("API Error: No response from server", error.message);
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const registerUser = (userData) => api.post("/users/register", userData);

export const loginUser = async ({ email, password }) => {
  console.log('loginUser called with:', { email, password }); // Debug log عشان نشوف البيانات
  const response = await api.post('/users/login', { email, password });
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response;
};

export const logoutUser = () => {
  localStorage.removeItem('user');
  return api.post("/users/logout");
};

export const getCurrentUser = () => api.get("/users/me");
export const updateUser = (userData) => api.put("/users/me", userData);

export const forgotPassword = (email) => api.post("/users/forgot-password", { email });
export const resetPassword = (token, password) => api.post(`/users/reset-password/${token}`, { password });

// Admin endpoints
export const getUsers = () => api.get("/admin/users");
export const getReviews = () => api.get("/admin/reviews");
export const getContactMessages = () => api.get("/admin/contact-messages");
export const replyContactMessage = (id, reply) => api.post(`/admin/contact-messages/${id}/reply`, { reply });
export const getGiftMessages = () => api.get("/admin/gift-messages");
export const getDiscounts = () => api.get("/admin/discounts");
export const addDiscount = (discountData) => api.post("/admin/discounts", discountData);

// Category endpoints
export const getCategories = () => api.get("/categories");
export const addCategory = (categoryData) => api.post("/categories", categoryData);

// Product endpoints
export const getProducts = (params = {}) => {
  return api.get("/products", { params }); // ضفنا params للـ pagination
};

export const addProduct = async (formData) => {
  console.log('Adding product with data:', Object.fromEntries(formData)); // Debug log
  const response = await api.post('/products', formData, { // غيرنا من /admin/products لـ /products لأنه معرف كده في productRoutes.js
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const addCustomProduct = async (formData) => {
  console.log('Adding custom product with data:', Object.fromEntries(formData));
  const response = await api.post('/products/custom', formData, { // غيرنا لـ /products/custom لأنه معرف كده في productRoutes.js
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const getCustomOrders = () => api.get('/custom-orders');
export const updateCustomOrder = (id, data) => api.put(`/custom-orders/${id}`, data);

export default api;