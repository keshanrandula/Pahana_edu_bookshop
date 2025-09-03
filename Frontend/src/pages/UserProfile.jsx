

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/register"); // Redirect if not logged in
    } else {
      setUser(storedUser);
      setUpdatedUser(storedUser);
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/auth/${user.id}`,
        updatedUser
      );
      toast.success("Profile updated successfully!", {
        position: "top-center",
        style: { backgroundColor: 'orange', color: 'white' },
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating profile!", { position: "top-center" },{ backgroundColor: 'orange', color: 'white' });
      console.error(error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.info("Logged out successfully!", { position: "top-center" });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-orange-100">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-orange-400 rounded-full border-2 border-white"></div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-orange-800 mb-6">
          {isEditing ? "Edit Profile" : "User Profile"}
        </h2>

        {!isEditing ? (
          <div className="space-y-4 mb-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-600">Username</p>
              <p className="font-medium text-gray-800">{user?.username}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-600">Email</p>
              <p className="font-medium text-gray-800">{user?.email}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-600">Contact Number</p>
              <p className="font-medium text-gray-800">{user?.contact_number}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-600">Address</p>
              <p className="font-medium text-gray-800">{user?.address}</p>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500 transition duration-300 shadow-md flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={updatedUser?.username || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={updatedUser?.email || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">Contact Number</label>
              <input
                type="text"
                name="contact_number"
                value={updatedUser?.contact_number || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={updatedUser?.address || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                required
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-orange-300 text-white py-2 rounded-lg hover:bg-orange-400 transition duration-300 shadow-md flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
