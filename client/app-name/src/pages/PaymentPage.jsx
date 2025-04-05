import React, { useState } from "react";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const handlePayment = (e) => {
    e.preventDefault();
    alert("✅ تمت عملية الدفع بنجاح!");
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-opacity-30" style={{ backgroundColor: "white", filter: "blur(60px)", transform: "translate(-30%, -30%)" }}></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-opacity-30" style={{ backgroundColor: "white", filter: "blur(70px)", transform: "translate(30%, 30%)" }}></div>

      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 relative z-10 border-t-4 border-[#d39c94] rtl">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "#bc7265" }}>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#b8e0ec] text-[#bc7265] mr-2">
            💳
          </span>
          إتمام الدفع
        </h2>

        <form onSubmit={handlePayment} className="space-y-6">
          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-medium" style={{ color: "#bc7265" }}>
              اختر طريقة الدفع
            </label>
            <div className="relative">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-3 bg-gray-50 border-b-2 rounded-lg focus:outline-none text-gray-800 placeholder-gray-400 transition-all duration-300 appearance-none"
                style={{ borderColor: "#b8e0ec" }}
              >
                <option value="credit_card">💳 بطاقة ائتمان</option>
                <option value="paypal">🅿️ PayPal</option>
                <option value="cash">💵 الدفع عند الاستلام</option>
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#bc7265" }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Credit Card Details */}
          {paymentMethod === "credit_card" && (
            <div className="bg-white border-2 border-[#b8e0ec] rounded-lg p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: "#bc7265" }}>
                  رقم البطاقة
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9101 1121"
                    required
                    className="w-full p-3 bg-gray-50 border-b-2 rounded-lg focus:outline-none text-gray-800 placeholder-gray-400 transition-all duration-300"
                    style={{ borderColor: "#b8e0ec" }}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#bc7265" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <label className="block text-sm font-medium" style={{ color: "#bc7265" }}>
                    تاريخ الانتهاء
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    required
                    className="w-full p-3 bg-gray-50 border-b-2 rounded-lg focus:outline-none text-gray-800 placeholder-gray-400 transition-all duration-300"
                    style={{ borderColor: "#b8e0ec" }}
                  />
                </div>

                <div className="space-y-2 flex-1">
                  <label className="block text-sm font-medium" style={{ color: "#bc7265" }}>
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    required
                    className="w-full p-3 bg-gray-50 border-b-2 rounded-lg focus:outline-none text-gray-800 placeholder-gray-400 transition-all duration-300"
                    style={{ borderColor: "#b8e0ec" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* PayPal Info */}
          {paymentMethod === "paypal" && (
            <div className="bg-[#b8e0ec] bg-opacity-20 border-2 border-[#b8e0ec] rounded-lg p-6 text-center">
              <div className="text-[#bc7265] mb-4 text-sm font-medium">
                سيتم تحويلك إلى موقع PayPal لإتمام عملية الدفع
              </div>
              <div className="text-4xl mb-2">🅿️</div>
            </div>
          )}

          {/* Cash on Delivery Info */}
          {paymentMethod === "cash" && (
            <div className="bg-[#d39c94] bg-opacity-10 border-2 border-[#d39c94] rounded-lg p-6 text-center">
              <div className="text-[#bc7265] mb-4 text-sm font-medium">
                سيتم تحصيل المبلغ عند استلام الطلب
              </div>
              <div className="text-4xl mb-2">💵</div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full p-3 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(to right, #bc7265, #d39c94)` }}
            >
              <span>💸 تأكيد الدفع</span>
            </button>
          </div>

          {/* Security Note */}
          <div className="text-center text-sm text-gray-500 mt-4">
            جميع البيانات مشفرة ومؤمنة 🔒
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;