import React, { useState } from "react";
import { addCustomProduct } from "../services/api";
import { toast } from "react-toastify";

const CreateCustomProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [material, setMaterial] = useState("");
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("designDescription", description);
      formData.append("material", material);
      formData.append("message", message);
      images.forEach((image) => {
        formData.append("images", image);
      });

      console.log("Sending custom product data:", Object.fromEntries(formData));

      if (!productName || !description || !material) {
        throw new Error("يرجى ملء جميع الحقول المطلوبة: الاسم، الوصف، المادة");
      }

      await addCustomProduct(formData);
      toast.success("✅ تم إرسال طلبك المخصص بنجاح! سيتم مراجعته قريبًا.", {
        position: "top-right",
        autoClose: 5000,
      });
      setProductName("");
      setDescription("");
      setMaterial("");
      setMessage("");
      setImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.error("Error creating custom product:", error.response?.data || error.message);
      toast.error("خطأ في إنشاء الطلب: " + (error.response?.data?.error || error.message), {
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#b8e0ec] bg-opacity-20 filter blur-3xl transform -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#d39c94] bg-opacity-20 filter blur-3xl transform translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 relative z-10 border-t-4 border-[#bc7265] rtl transform transition-all hover:shadow-xl">
        <h2 className="text-4xl font-extrabold text-center mb-10 tracking-tight" style={{ color: "#bc7265" }}>
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#b8e0ec] text-[#bc7265] mr-3 shadow-md">
            🎨
          </span>
          صمم منتجك المخصص
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#b8e0ec] text-[#bc7265] ml-3 shadow-md">
            ✨
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8 text-right">
          <div className="space-y-3">
            <label className="block text-sm font-semibold" style={{ color: "#bc7265" }}>
              اسم المنتج *
            </label>
            <div className="relative">
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="w-full p-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bc7265] text-gray-800 placeholder-gray-400 transition-all duration-300 shadow-sm"
                style={{ borderColor: "#b8e0ec" }}
                placeholder="مثال: لوحة عائلية"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#bc7265" }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold" style={{ color: "#bc7265" }}>
              وصف التصميم *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bc7265] text-gray-800 placeholder-gray-400 min-h-40 resize-y transition-all duration-300 shadow-sm"
              style={{ borderColor: "#b8e0ec" }}
              placeholder="صف تفاصيل التصميم (الألوان، الأحجام، إلخ)"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold" style={{ color: "#bc7265" }}>
              المادة المستخدمة *
            </label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              required
              className="w-full p-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bc7265] text-gray-800 transition-all duration-300 shadow-sm"
              style={{ borderColor: "#b8e0ec" }}
              placeholder="اختر المادة"
            >
              <option value="">اختر المادة</option>
              <option value="mosaic">فسيفساء (50-150$)</option>
              <option value="charcoal">فحم (20-60$)</option>
              <option value="acrylic">أكريليك (30-90$)</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold" style={{ color: "#bc7265" }}>
              صور مرجعية (اختياري)
            </label>
            <div className="relative bg-gray-50 rounded-xl border-2 border-dashed p-8 transition-all duration-300 hover:border-[#bc7265]" style={{ borderColor: "#b8e0ec" }}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <svg
                  className="mx-auto h-14 w-14"
                  style={{ color: "#bc7265" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-600 font-medium">
                  اسحب الصور هنا أو انقر لرفع صور مرجعية (يمكنك رفع أكثر من صورة)
                </p>
              </div>
            </div>
            {previewImages.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4">
                {previewImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`معاينة ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border-2 shadow-md"
                    style={{ borderColor: "#d39c94" }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold" style={{ color: "#bc7265" }}>
              رسالة إضافية (اختياري)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bc7265] text-gray-800 placeholder-gray-400 min-h-32 resize-y transition-all duration-300 shadow-sm"
              style={{ borderColor: "#b8e0ec" }}
              placeholder="أضف تعليقات أو طلبات خاصة"
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
            style={{ background: `linear-gradient(to right, #bc7265, #d39c94)` }}
          >
            <span>🚀 إرسال طلب التصميم</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomProduct;