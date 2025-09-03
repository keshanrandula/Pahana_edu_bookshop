


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAdmin, setUpdatedAdmin] = useState(null);

 
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (!storedAdmin) {
      navigate("/admin/login"); // Redirect if not logged in
    } else {
      setAdmin(storedAdmin);
      setUpdatedAdmin(storedAdmin);
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedAdmin({ ...updatedAdmin, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8080/api/admin/update", updatedAdmin);
      toast.success("Profile updated successfully!", { position: "top-center" });
      setAdmin(updatedAdmin);
      localStorage.setItem("admin", JSON.stringify(updatedAdmin));
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating profile!", { position: "top-center" });
      console.error(error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast.info("Logged out successfully!", { position: "top-center" });
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isEditing ? "Edit Admin Profile" : "Admin Profile"}
        </h2>

        {!isEditing ? (
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium text-gray-800">{admin?.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{admin?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Password</p>
              <p className="font-medium text-gray-800">••••••••</p>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={updatedAdmin?.username || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={updatedAdmin?.email || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={updatedAdmin?.password || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
