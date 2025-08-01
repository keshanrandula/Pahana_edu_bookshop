import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [adminData, setAdminData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:8080/api/admin/register', adminData);
      const responseMessage = res.data.message || res.data;

      setMessage(responseMessage);

      if (responseMessage === "Admin register successful!" || res.status === 200) {
        localStorage.setItem("adminEmail", adminData.email);
        localStorage.setItem("adminToken", res.data.token || "");

        setAdminData({ username: '', email: '', password: '' });

        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
      }
    } catch (err) {
      console.error('Admin registration failed:', err);
      setMessage(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Admin Registration</h2>
          <p className="text-gray-600">Create your admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={adminData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={adminData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-md text-white font-semibold ${isLoading ? 'bg-orange-400' : 'bg-orange-600 hover:bg-orange-700'} transition duration-200 flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4z" />
                </svg>
                Processing...
              </>
            ) : (
              'Register as Admin'
            )}
          </button>
        </form>

        {message && (
          <div className={`mt-5 p-3 rounded-md text-center text-sm ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
            {message.includes('successful') && <p className="mt-1">Redirecting to dashboard...</p>}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/admin/login" className="text-orange-600 hover:underline font-medium">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
