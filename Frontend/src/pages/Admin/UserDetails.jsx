

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/api/auth/all")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:8080/api/auth/${id}`)
      .then(() => {
        toast.success("User deleted successfully!", {
          position: "top-center",
          style: { backgroundColor: "orange", color: "white" },
        });
        fetchUsers(); // Refresh list
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user.", {
          position: "top-center",
          style: { backgroundColor: "red", color: "white" },
        });
      });
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-5">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">User Details</h1>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-orange-500">
              <thead className="bg-orange-600 text-black-500">
                <tr>
                  <th className="py-2 px-4 border">Username</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Contact Number</th>
                  <th className="py-2 px-4 border">Address</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-orange-500 transition">
                    <td className="py-2 px-4 border">{user.username}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border">{user.contact_number}</td>
                    <td className="py-2 px-4 border">{user.address}</td>
                    <td className="py-2 px-4 border text-center">
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserDetails;

