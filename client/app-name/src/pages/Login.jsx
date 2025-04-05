import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

const Login = ({ showMessage, checkAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      console.log("Login Response:", response.data);

      const { user, message } = response.data;
      console.log("Message:", message);
      console.log("User:", user);

      toast.success(message, { position: "top-right" });
      console.log("Toast executed");

      // تحديث حالة الـ authentication في App.jsx
      await checkAuth();

      // Redirect based on role
      if (user.role === "admin") {
        console.log("Navigating to /admin");
        navigate("/admin"); // غيرتها لـ /admin
      } else {
        console.log("Navigating to /profile");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(
        "خطأ في تسجيل الدخول: " + (error.response?.data?.error || error.message),
        { position: "top-right" }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      <ToastContainer />
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full bg-opacity-30"
        style={{ backgroundColor: "#b8e0ec", filter: "blur(60px)", transform: "translate(-30%, -30%)" }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-opacity-30"
        style={{ backgroundColor: "#d39c94", filter: "blur(70px)", transform: "translate(30%, 30%)" }}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-xl p-0 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        <div
          className="w-full md:w-1/2 p-8 text-white flex flex-col justify-center items-start"
          style={{
            background: `linear-gradient(135deg, #bc7265 0%, #d39c94 100%)`,
            clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)",
          }}
        >
          <h2 className="text-4xl font-bold mb-4">WELCOME BACK!</h2>
          <p className="text-xl opacity-90">Hope, You and your Family have a Great Day</p>
          <div className="mt-10 space-y-4">
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Quick login process</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Secure authentication</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Easy access</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:pl-12">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "#bc7265" }}>
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <label className="text-sm font-medium mb-1 block" style={{ color: "#bc7265" }}>
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-50 border-b-2 rounded-lg focus:outline-none text-gray-800"
                  style={{ borderColor: "#b8e0ec" }}
                  placeholder="Enter your email"
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#bc7265" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-8 relative">
              <label className="text-sm font-medium mb-1 block" style={{ color: "#bc7265" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-gray-50 border-b-2 rounded-lg focus:outline-none text-gray-800"
                  style={{ borderColor: "#b8e0ec" }}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#bc7265" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-3 text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
              style={{ background: `linear-gradient(to right, #bc7265, #d39c94)` }}
              disabled={loading}
            >
              {loading ? "جاري تسجيل الدخول..." : "Login"}
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="text-sm font-medium hover:underline"
                style={{ color: "#bc7265" }}
              >
                Forgot Password?
              </button>
            </div>

            <div className="mt-2 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={handleSignUpClick}
                  className="font-medium hover:underline"
                  style={{ color: "#bc7265" }}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;