import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
  const { id } = useParams(); // get book id from URL
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    publisher: '',
    language: '',
    price: '',
    pages: '',
    imageUrl: '',
    category: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/books`)
      .then(res => {
        const foundBook = res.data.find(book => book.id === id);
        if (foundBook) setBookData(foundBook);
      })
      .catch(err => {
        console.error("Failed to fetch book", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookData(prev => ({
          ...prev,
          imageUrl: reader.result // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/books/${id}`, bookData)
      .then(() => {
        alert("Book updated successfully!");
        navigate("/books");
      })
      .catch(err => {
        console.error("Update failed", err);
        alert("Update failed!");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Update Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border rounded"
            type="text"
            name="title"
            placeholder="Title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 border rounded"
            type="text"
            name="author"
            placeholder="Author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 border rounded"
            type="text"
            name="publisher"
            placeholder="Publisher"
            value={bookData.publisher}
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border rounded"
            type="text"
            name="language"
            placeholder="Language"
            value={bookData.language}
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border rounded"
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            value={bookData.price}
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border rounded"
            type="number"
            name="pages"
            placeholder="Pages"
            value={bookData.pages}
            onChange={handleChange}
          />

          <input
            className="w-full p-3 border rounded"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {bookData.imageUrl && (
            <img
              src={bookData.imageUrl}
              alt="Preview"
              className="w-32 h-32 object-cover mt-2 rounded"
            />
          )}

          <select
            className="w-full p-3 border rounded"
            name="category"
            value={bookData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="Biography">Biography</option>
            <option value="History">History</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
