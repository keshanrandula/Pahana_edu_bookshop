import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contact_number: '',
    address: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', formData);
      setMessage(res.data);
      setFormData({
        username: '',
        email: '',
        password: '',
        contact_number: '',
        address: ''
      });
    } catch (err) {
      console.error('Registration error:', err);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">User Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Register;
