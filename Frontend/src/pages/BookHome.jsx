import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookHome = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch books from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error("Failed to fetch books:", err));
  }, []);

  return (
    
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600"> Pahana Edu BookShop</h1>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col"
          >
            <img
              src={`http://localhost:8080/${book.imageUrl}`}
              alt={book.title}
              className="h-60 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />

            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
              <p className="text-gray-600 text-sm">Author: {book.author}</p>
              <p className="text-gray-600 text-sm">Category: {book.category}</p>
              <p className="text-gray-800 font-bold mt-2">Rs. {book.price}</p>

              {/* Details Button */}
              <button
                onClick={() => navigate(`/book/${book.id}`)}
                className="mt-auto bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 flex items-center justify-center"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Books Found */}
      {books.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No books available.</p>
      )}
    </div>
  );
};

export default BookHome;
