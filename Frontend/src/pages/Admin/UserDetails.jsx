import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users on component mount
  useEffect(() => {
    axios.get("http://localhost:8080/api/auth/all")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-5">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">User Details</h1>
        
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-blue-200">
              <thead className="bg-blue-100 text-blue-700">
                <tr>
                  <th className="py-2 px-4 border">Username</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Contact Number</th>
                  <th className="py-2 px-4 border">Address</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition">
                    <td className="py-2 px-4 border">{user.username}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border">{user.contact_number}</td>
                    <td className="py-2 px-4 border">{user.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;

