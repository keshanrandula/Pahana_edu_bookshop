import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiKey } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  // Get stored email from localStorage after successful login
  const storedEmail = localStorage.getItem('adminEmail');

  useEffect(() => {
    if (!storedEmail) {
      navigate('/admin/login');
      return;
    }

    // Fetch all admins and filter by stored email
    axios
      .get('http://localhost:8080/api/admin/admins')
      .then((res) => {
        const foundAdmin = res.data.find((a) => a.email === storedEmail);
        if (foundAdmin) {
          setAdmin(foundAdmin);
        } else {
          localStorage.removeItem('adminEmail');
          navigate('/admin/login');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch admin info:', err);
        navigate('/admin/login');
      });
  }, [storedEmail, navigate]);

  if (!admin) {
    return <p className="text-center mt-20 text-blue-600">Loading admin profile...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">👤 Admin Profile</h2>

        <div className="space-y-4 text-blue-900">
          <div className="flex items-center">
            <FiUser className="text-blue-400 mr-3" />
            <span className="font-semibold w-24">Username:</span> {admin.username}
          </div>
          <div className="flex items-center">
            <FiMail className="text-blue-400 mr-3" />
            <span className="font-semibold w-24">Email:</span> {admin.email}
          </div>
          <div className="flex items-center">
            <FiKey className="text-blue-400 mr-3" />
            <span className="font-semibold w-24">ID:</span> {admin.id}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              localStorage.removeItem('adminEmail');
              navigate('/admin/login');
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
