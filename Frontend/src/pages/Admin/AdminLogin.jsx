


import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Login API
      const res = await axios.post('http://localhost:8080/api/admin/login', credentials);

      if (res.data === "Admin login successful!") {
        // Step 2: Fetch full profile using email
        const userRes = await axios.get(
          `http://localhost:8080/api/admin/profile?email=${credentials.email}`
        );

        if (userRes.data) {
          // Step 3: Save full admin object to localStorage
          localStorage.setItem("admin", JSON.stringify(userRes.data));

          // Step 4: Redirect
          navigate('/admin/dashboard');
        }
      } else {
        alert(res.data);
      }

      setCredentials({ email: '', password: '' });
    } catch (err) {
      console.error('Login error:', err);
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-red-600">{message}</p>
        )}

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an admin account?{' '}
          <Link to="/admin/register" className="text-orange-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

