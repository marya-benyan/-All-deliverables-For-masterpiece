import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const genAI = new GoogleGenerativeAI("AIzaSyALZx9dbdu1eRJZGmKxUQzSUd6KZMxJhLw");

const Footer = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // إضافة رسالة المستخدم
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const aiReply =
        result.response.candidates[0].content.parts[0].text ||
        "I'm sorry, I couldn't generate a response.";
      setMessages([...newMessages, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error: Unable to fetch response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#ecf4fc] text-black py-10">
    <div className="container mx-auto px-6 md:px-12 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* القسم الأول: معلومات الشركة */}
        <div>
          <h2 className="text-2xl font-bold flex items-center mb-4">
            <span className="bg-[#f0e6e6] text-[#d39c94] px-2 py-1 rounded-md text-lg font-bold mr-2">E</span>
            LORA MARYA
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.
          </p>
          <p className="text-sm flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2 text-[#d39c94]" /> Jordan - Amman
          </p>
          <p className="text-sm flex items-center mb-2">
            <FaEnvelope className="mr-2 text-[#d39c94]" /> info@example.com
          </p>
          <p className="text-sm flex items-center">
            <FaPhone className="mr-2 text-[#d39c94]" /> +012 345 67890
          </p>
        </div>

        {/* القسم الثاني: الروابط السريعة */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2">
            {["Home", "Our Shop", "Shop Detail", "Shopping Cart", "Checkout", "Contact Us"].map((link, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">›</span>
                <a href="#" className="hover:text-gray-600 transition">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* القسم الثالث: الروابط السريعة (مكرر كما في التصميم) */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2">
            {["Home", "Our Shop", "Shop Detail", "Shopping Cart", "Checkout", "Contact Us"].map((link, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">›</span>
                <a href="#" className="hover:text-gray-600 transition">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* القسم الرابع: النشرة البريدية */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
          <form>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 mb-3 text-sm rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 mb-3 text-sm rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="submit"
              className="w-full bg-[#d39c94] text-white py-2 text-sm rounded hover:bg-[#b77c75] transition duration-300"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      {/* حقوق النشر */}
      <div className="text-center mt-6 border-t border-gray-300 pt-4 text-sm">
        <p>© <strong>ELORA MARYA</strong>. All Rights Reserved. Designed by MARYA</p>
      </div>
    </div>
      {/* سهم التمرير إلى الأعلى */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-[oklch(0.985_0.001_106.423)] text-[oklch(0.81_0.117_11.638)] p-3 rounded-full shadow-lg hover:bg-[oklch(0.95_0.001_106.423)] transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* زر تشغيل Chatbot AI */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-24 right-8 bg-[oklch(0.985_0.001_106.423)] text-[oklch(0.81_0.117_11.638)] p-3 rounded-full shadow-lg hover:bg-[oklch(0.95_0.001_106.423)] transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* Chatbot AI */}
      {showChatbot && (
        <div className="fixed bottom-32 right-8 bg-white p-6 rounded-lg shadow-lg w-80">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="text-lg font-bold">Chatbot AI</h3>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-xl font-bold"
            >
              ✖
            </button>
          </div>
          <div className="h-64 overflow-y-auto bg-gray-100 p-3 rounded-md">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-md ${
                  msg.role === "user"
                    ? "bg-blue-200 text-right"
                    : "bg-gray-300 text-left"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {/* مؤشر تحميل عند انتظار الرد */}
            {loading && (
              <div className="text-gray-500 text-center">Loading...</div>
            )}
          </div>
          <form onSubmit={handleChatSubmit} className="flex mt-2">
  <input
    type="text"
    placeholder="Type your message..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
  />
  <button
    type="submit"
    className="bg-gray-700 text-white px-6 py-2 ml-2 rounded-lg hover:bg-gray-800 transition duration-300"
  >
    Send
  </button>
</form>

        </div>
      )}
    </div>
  );
};

export default Footer;
