import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import PromoBanner from "./components/PromoBanner";
import ProductCategories from "./components/ProductCategories";
import FeaturesSection from "./components/FeaturesSection";
import HeroBanner from "./components/HeroBanner";
import TrandyProducts from "./components/TrandyProducts";
import NewsletterSection from "./components/NewsletterSection";
import JustArrivedSection from "./components/JustArrivedSection";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ShopPage from "./pages/ShopPage";
import Profile from "./pages/Profile";
import ShoppingCart from "./pages/ShoppingCart";
import Wishlist from "./pages/Wishlist";
import ShopDetail from "./pages/ShopDetail";
import CreateCustomProduct from "./pages/CreateCustomProduct";
import OrderHistory from "./pages/OrderHistory";
import PaymentPage from "./pages/PaymentPage";
import AdminDashboard from "./pages/AdminDashboard";
import Products from "./components/admin/Products";
import CustomOrders from "./components/admin/CustomOrders";
import Users from "./components/admin/Users";
import Reviews from "./components/admin/Reviews";
import Categories from "./components/admin/Categories";

axios.defaults.withCredentials = true;

const App = () => {
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/me");
      console.log("Auth Check Response:", response.data);
      setIsAuthenticated(true);
      setUserRole(response.data.role);
    } catch (error) {
      console.error("Auth check error:", error.response?.data || error.message);
      setIsAuthenticated(false);
      setUserRole(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const ProtectedRoute = ({ children }) => {
    if (isAuthenticated === null) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (userRole === "admin") return <Navigate to="/admin" replace />;
    return children;
  };

  const AdminRoute = ({ children }) => {
    if (isAuthenticated === null) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    console.log("AdminRoute userRole:", userRole);
    return userRole === "admin" ? children : <Navigate to="/profile" replace />;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />
        {message && (
          <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 text-center z-50">
            {message}
          </div>
        )}

        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <>
                  <HeroBanner />
                  <FeaturesSection />
                  <ProductCategories />
                  <PromoBanner />
                  <TrandyProducts />
                  <NewsletterSection />
                  <JustArrivedSection />
                </>
              }
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route
              path="/login"
              element={<Login showMessage={showMessage} checkAuth={checkAuth} />}
            />
            <Route path="/register" element={<Register showMessage={showMessage} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/ShopDetail/:id" element={<ShopDetail />} />

            {/* Authenticated User Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ShoppingCart"
              element={
                <ProtectedRoute>
                  <ShoppingCart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/custom-product"
              element={
                <ProtectedRoute>
                  <CreateCustomProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            >
              <Route path="products" element={<Products />} />
              <Route path="custom-orders" element={<CustomOrders />} />
              <Route path="users" element={<Users />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="categories" element={<Categories />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;