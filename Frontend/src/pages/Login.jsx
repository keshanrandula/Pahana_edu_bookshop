

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', formData);

      if (res.data === 'Login successful!') {
        const userRes = await axios.get('http://localhost:8080/api/auth/all');
        const foundUser = userRes.data.find(user => user.email === formData.email);
        if (foundUser) {
          localStorage.setItem('user', JSON.stringify(foundUser));
          navigate('/home');
        }
      } else {
        setMessage(res.data);
      }
    } catch (err) {
      setMessage('Login failed. Please try again.');
      console.error(err);
    }
  };

  const handleBookRideClick = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      setShowLoginMessage(true);
    } else {
      navigate('/reservation');
    }
  };

  useEffect(() => {
    if (showLoginMessage) {
      const timer = setTimeout(() => {
        setShowLoginMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLoginMessage]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded">
            Login
          </button>
        </form>
        {message && <p className="text-center text-red-600 mt-4">{message}</p>}
        {showLoginMessage && <p className="text-center text-yellow-500 mt-4">Please login to continue booking.</p>}
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange-600 hover:underline">
            Register here
          </Link>
        </p>
        <div className="text-center mt-6">
          {/* <button
            onClick={handleBookRideClick}
            className="text-sm text-blue-500 underline hover:text-blue-700"
          >
            Book a Ride
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;

