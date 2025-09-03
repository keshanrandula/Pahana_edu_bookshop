


import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    language: "",
    price: "",
    pages: "",
    category: "",
    image: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "price" || name === "pages") && value < 0) {
      setMessage(`${name.charAt(0).toUpperCase() + name.slice(1)} cannot be negative.`);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage(""); 
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (parseFloat(formData.price) < 0 || parseFloat(formData.pages) < 0) {
      setMessage("Price and Pages must be positive numbers.");
      return;
    }

    if (parseFloat(formData.price) > 5000) {
      setMessage("Price should not exceed 5000.");
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:8080/api/books/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("✅ Book added successfully!");
    } catch (error) {
      setMessage("❌ Error adding book. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white-100 to-white-200 p-6 ">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-8 text-orange-600">
        <h2 className="text-3xl font-bold text-center mb-6">📘 Add a New Book</h2>

        {message && (
          <div
            className={`text-center mb-4 font-semibold ${
              message.includes("✅")
                ? "text-green-600"
                : message.includes("❌")
                ? "text-red-600"
                : "text-orange-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields */}
          {[
            { name: "title", placeholder: "Enter book title" },
            { name: "author", placeholder: "Enter book author" },
            { name: "publisher", placeholder: "Enter book publisher" },
            { name: "language", placeholder: "Enter book language" },
          ].map(({ name, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {name}
              </label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className="w-full px-4 py-2.5 bg-orange-50 border border-orange-200 rounded-lg text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          ))}

         
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 font-bold">
                Rs
              </span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="Enter book price"
                className="w-full pl-10 pr-4 py-2.5 bg-orange-50 border border-orange-200 rounded-lg text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Pages */}
          <div>
            <label className="block text-sm font-medium mb-1">Pages</label>
            <input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              required
              placeholder="Enter number of pages"
              className="w-full px-4 py-2.5 bg-orange-50 border border-orange-200 rounded-lg text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-orange-50 border border-orange-200 rounded-lg text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Category</option>
              <option value="Bussiness and Economics">
                Bussiness and Economics
              </option>
              <option value="Engineering and Technology">
                Engineering and Technology
              </option>
              <option value="Psychology">Psychology</option>
              <option value="Science">Science</option>
              <option value="Novels">Novels</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Book Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full py-2 bg-orange-50 border border-orange-200 rounded-lg file:bg-orange-500 file:text-white file:px-3 file:py-1 file:rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Add Book
          </button>
        </form>

        {/* <div className="mt-6 text-center text-sm text-orange-700">
          <a
            href="/books"
            className="text-orange-600 hover:underline font-medium"
          >
            View All Books
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default AddBook;
