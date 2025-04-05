import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/admin/Sidebar";

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact/admin/contact-messages", {
          withCredentials: true,
        });
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load messages");
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleReply = async (messageId) => {
    if (!reply) {
      alert("Please enter a reply");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/contact/admin/contact-messages/${messageId}/reply`,
        { reply },
        { withCredentials: true }
      );
      const updatedMessage = response.data.data;
      setMessages((prev) =>
        prev.map((msg) => (msg._id === updatedMessage._id ? updatedMessage : msg))
      );
      setReply(""); // Reset reply field
      alert("Reply sent successfully");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send reply");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-lg mb-6">Welcome, Admin! Manage your contact messages and more here.</p>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <ul className="space-y-4">
              {messages.map((msg) => (
                <li key={msg._id} className="p-4 bg-white rounded shadow">
                  <p><strong>From:</strong> {msg.sender_name} ({msg.sender_email})</p>
                  <p><strong>Subject:</strong> {msg.subject}</p>
                  <p><strong>Message:</strong> {msg.message}</p>
                  <p><strong>Status:</strong> {msg.status}</p>
                  {msg.reply && <p><strong>Reply:</strong> {msg.reply}</p>}
                  {msg.status === "pending" && (
                    <div className="mt-2">
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Type your reply here"
                        className="w-full p-2 border rounded"
                      />
                      <button
                        onClick={() => handleReply(msg._id)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Send Reply
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Outlet /> {/* لعرض الـ sub-pages زي products وusers */}
      </div>
    </div>
  );
};

export default AdminDashboard;