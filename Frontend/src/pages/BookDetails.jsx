


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetails = () => {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/books`)
      .then((res) => {
        const foundBook = res.data.find((b) => b.id === id);
        setBook(foundBook);
      })
      .catch((err) => console.error('Error fetching book:', err));
  }, [id]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));

    toast.success("Book added to cart!", { 
      position: "top-center",
      style: { backgroundColor: 'orange', color: 'white' },
    });

    setTimeout(() => navigate('/cart'), 3000); 
  };

  if (!book) return <p className="text-center mt-10">Loading book details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">{book.title}</h2>

      <div key={book.id} className="w-full md:w-1/2">
        <img
          src={`http://localhost:8080/${book.imageUrl}`}
          alt={book.title}
          className="h-60 w-auto object-contain transition-transform duration-300 hover:scale-105 "
        />

        {/* Book Details */}
        <div className="w-full md:w-1/2 space-y-2">
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Language:</strong> {book.language}</p>
          <p><strong>Pages:</strong> {book.pages}</p>
          <p><strong>Category:</strong> {book.category}</p>
          <p className="text-xl font-bold text-blue-600 mt-4">Price: Rs. {book.price}</p>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleAddToCart}
          className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700"
        >
          Add to Cart
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default BookDetails;

