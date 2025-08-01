import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contact_number: '',
    address: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', formData);

      if (res.data === 'User registered successfully!') {
        // Now fetch user data and store in localStorage
        const userRes = await axios.get('http://localhost:8080/api/auth/all');
        const registeredUser = userRes.data.find(user => user.email === formData.email);
        if (registeredUser) {
          localStorage.setItem('user', JSON.stringify(registeredUser));
          navigate('/userprofile');
        }
      } else {
        setMessage(res.data); // e.g., Email already exists
      }
    } catch (error) {
      console.error(error);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border rounded"
            required
          />
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
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded">
            Register
          </button>
        </form>
        {message && <p className="text-center text-red-600 mt-4">{message}</p>}
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
