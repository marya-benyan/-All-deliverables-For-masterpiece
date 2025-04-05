import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [tempUser, setTempUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    photo: "",
  });
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    type: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/me");
        const userData = response.data;
        console.log("User Data from API:", userData);

        // مش هنعمل redirect هنا، الـ ProtectedRoute هيتكفل بده
        setUser(userData);
        setTempUser({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          bio: userData.bio || "",
          photo: userData.photo || "",
        });
        setEvents(userData.events || []);
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
        setError(error.response?.data?.error || "فشل في جلب بيانات المستخدم. حاول مرة أخرى لاحقًا.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSave = async () => {
    try {
      const response = await axios.put("http://localhost:5000/api/users/me", tempUser);
      setUser(response.data.user);
      setIsEditing(false);
      setError("");
    } catch (error) {
      console.error("Error updating user data:", error.response?.data || error.message);
      setError(error.response?.data?.error || "فشل في تحديث بيانات المستخدم. حاول مرة أخرى.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout");
      console.log("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      setError(error.response?.data?.error || "فشل في تسجيل الخروج. حاول مرة أخرى.");
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setTempUser({ ...user });
    setIsEditing(false);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUser((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location || !newEvent.type) {
      setError("يرجى ملء جميع حقول الحدث.");
      return;
    }
    setEvents((prev) => [...prev, { ...newEvent, id: Date.now() }]);
    setNewEvent({ title: "", date: "", location: "", type: "" });
    setError("");
  };

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const colors = {
    blueGrey: "#3E4A56",
    rose: "#d39c94",
    white: "#ffffff",
  };

  const calculateDaysRemaining = (eventDate) => {
    const today = new Date();
    const eventDay = new Date(eventDate);
    const diffTime = eventDay - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getEventIcon = (type) => {
    switch (type) {
      case "Workshop": return "🛠️";
      case "Class": return "📚";
      case "Event": return "🎭";
      case "Delivery": return "📦";
      default: return "📅";
    }
  };

  if (error && !user) {
    return (
      <div className="min-h-screen bg-blue-gray flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-rose text-white rounded hover:bg-opacity-90"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-blue-gray" style={{ backgroundColor: colors.white }}>
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg my-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold" style={{ color: colors.blueGrey }}>
              My Profile
            </h2>
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1 text-sm font-medium text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                  style={{ backgroundColor: colors.rose }}
                >
                  <span>✏️</span> Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 text-sm font-medium text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                    style={{ backgroundColor: colors.rose }}
                  >
                    <span>💾</span> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 text-sm font-medium text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                    style={{ backgroundColor: colors.blueGrey }}
                  >
                    <span>✖️</span> Cancel
                  </button>
                </>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm font-medium text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                style={{ backgroundColor: "#e53e3e" }}
              >
                <span>🚪</span> Logout
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={tempUser.photo || "/default-photo.jpg"}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover mb-4 border-4 shadow-md"
                  style={{ borderColor: colors.rose }}
                />
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                )}
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={tempUser.name}
                  onChange={handleChange}
                  className="w-full text-center text-xl font-semibold border border-gray-300 rounded p-2 focus:outline-none focus:border-rose"
                  style={{ color: colors.blueGrey, borderColor: "#e5e7eb" }}
                />
              ) : (
                <h3 className="text-xl font-semibold" style={{ color: colors.blueGrey }}>{user.name}</h3>
              )}
              <p className="text-sm text-gray-500 mt-2">Member since March 2025</p>
            </div>

            <div className="col-span-2 bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={tempUser.email}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-rose focus:ring-1 focus:ring-rose"
                      style={{ color: colors.blueGrey }}
                    />
                  ) : (
                    <p className="mt-1" style={{ color: colors.blueGrey }}>{user.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={tempUser.phone}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-rose focus:ring-1 focus:ring-rose"
                      style={{ color: colors.blueGrey }}
                    />
                  ) : (
                    <p className="mt-1" style={{ color: colors.blueGrey }}>{user.phone}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={tempUser.address}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-rose focus:ring-1 focus:ring-rose"
                      style={{ color: colors.blueGrey }}
                    />
                  ) : (
                    <p className="mt-1" style={{ color: colors.blueGrey }}>{user.address}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={tempUser.bio}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-rose focus:ring-1 focus:ring-rose resize-y"
                      style={{ color: colors.blueGrey }}
                      rows="4"
                    />
                  ) : (
                    <p className="mt-1 leading-relaxed" style={{ color: colors.blueGrey }}>{user.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold" style={{ color: colors.blueGrey }}>Upcoming Events</h3>
              <button
                className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded"
                style={{ backgroundColor: colors.rose, color: colors.white }}
                onClick={() => setNewEvent({ title: "", date: "", location: "", type: "" })}
              >
                <span>➕</span> Add Event
              </button>
            </div>

            {newEvent.title !== undefined && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.blueGrey }}>Add New Event</h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleEventChange}
                    placeholder="Event Title"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-rose"
                  />
                  <input
                    type="datetime-local"
                    name="date"
                    value={newEvent.date}
                    onChange={handleEventChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-rose"
                  />
                  <input
                    type="text"
                    name="location"
                    value={newEvent.location}
                    onChange={handleEventChange}
                    placeholder="Location"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-rose"
                  />
                  <select
                    name="type"
                    value={newEvent.type}
                    onChange={handleEventChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-rose"
                  >
                    <option value="">Select Event Type</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Class">Class</option>
                    <option value="Event">Event</option>
                    <option value="Delivery">Delivery</option>
                  </select>
                  <button
                    onClick={handleAddEvent}
                    className="w-full p-2 text-white rounded-lg font-semibold hover:opacity-90 transition-all"
                    style={{ background: `linear-gradient(to right, #bc7265, #d39c94)` }}
                  >
                    Add Event
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {events.map((event) => {
                const daysRemaining = calculateDaysRemaining(event.date);
                return (
                  <div key={event.id} className="bg-white rounded-lg p-4 shadow-sm border-l-4" style={{ borderLeftColor: daysRemaining <= 7 ? colors.rose : colors.blueGrey }}>
                    <div className="flex justify-between">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: daysRemaining <= 7 ? `${colors.rose}20` : `${colors.blueGrey}20` }}>
                          <span className="text-lg">{getEventIcon(event.type)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium" style={{ color: colors.blueGrey }}>{event.title}</h4>
                          <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                          <p className="text-sm text-gray-500">{event.location}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-xs font-medium px-2 py-1 rounded-full" 
                          style={{ 
                            backgroundColor: daysRemaining <= 3 ? `${colors.rose}` : (daysRemaining <= 7 ? `${colors.rose}60` : `${colors.blueGrey}40`),
                            color: daysRemaining <= 3 ? colors.white : (daysRemaining <= 7 ? colors.white : colors.blueGrey)
                          }}>
                          {daysRemaining === 0 ? "Today" : 
                           daysRemaining === 1 ? "Tomorrow" : 
                           `${daysRemaining} days left`}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button className="text-xs p-1 rounded hover:bg-gray-100">
                            <span>📝</span>
                          </button>
                          <button className="text-xs p-1 rounded hover:bg-gray-100">
                            <span>🔔</span>
                          </button>
                          <button
                            className="text-xs p-1 rounded hover:bg-gray-100"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <span>🗑️</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;