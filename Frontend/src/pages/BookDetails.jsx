import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    // You can store the selected book in localStorage or global state (e.g., Redux/Context)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Book added to cart!');
    navigate('/cart'); // Optional: navigate to cart
  };

  if (!book) return <p className="text-center mt-10">Loading book details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">{book.title}</h2>

      {/* <div className="flex flex-col md:flex-row gap-6">
        
        <div className="w-full md:w-1/2">
          <img
            src={`http://localhost:8080/${book.imageUrl}`}
            alt={book.title}
            className="w-full h-auto object-cover rounded"
          />
        </div> */}

        <div
      key={book.id}
      className="w-full md:w-1/2"
    >
      <img
        src={`http://localhost:8080/${book.imageUrl}`}
        alt={book.title}
        className="w-full h-56 object-cover"
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
    </div>
  );
};

export default BookDetails;
