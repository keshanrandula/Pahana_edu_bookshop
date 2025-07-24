import React, { useState } from 'react';
import axios from 'axios';
import { FiBook, FiUser, FiDollarSign, FiFileText } from 'react-icons/fi';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    language: '',
    price: '',
    pages: '',
    category: '',
    image: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post('http://localhost:8080/api/books/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Book added successfully!');
    } catch (error) {
      setMessage('Error adding book. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-300 p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-8 text-blue-900">
        <h2 className="text-3xl font-bold text-center mb-6">📘 Add a New Book</h2>

        {message && (
          <div className="text-center mb-4 text-blue-700 font-semibold">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Common Input Fields */}
          {[
            { name: "title", icon: <FiBook />, placeholder: "Enter book title" },
            { name: "author", icon: <FiUser />, placeholder: "Enter book author" },
            { name: "publisher", icon: <FiUser />, placeholder: "Enter book publisher" },
            { name: "language", icon: <FiFileText />, placeholder: "Enter book language" },
            { name: "price", icon: <FiDollarSign />, placeholder: "Enter book price", type: "number" },
            { name: "pages", icon: <FiFileText />, placeholder: "Enter number of pages", type: "number" },
          ].map(({ name, icon, placeholder, type = "text" }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1 capitalize">{name}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                  {icon}
                </span>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  placeholder={placeholder}
                  className="w-full pl-10 pr-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          ))}

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <div className="relative">
              <FiFileText className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Biography">Biography</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Book Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full py-2 bg-blue-50 border border-blue-200 rounded-lg file:bg-blue-500 file:text-white file:px-3 file:py-1 file:rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-sky-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            ➕ Add Book
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-blue-700">
          <a href="/books" className="text-blue-600 hover:underline font-medium">
            📖 View All Books
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
