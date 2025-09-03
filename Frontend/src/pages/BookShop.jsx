import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import NavBar from "../components/Navbar"; 
import Footer from "../components/Footer"; 


const BookShop = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  // Fetch books from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error("Failed to fetch books:", err));
  }, []);

  // Filter books
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category ? book.category === category : true)
  );

  // Go to Cart
  const goToCart = () => navigate('/cart');

  return (

    <>
    <NavBar />
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600"> Pahana Edu BookShop</h1>

      {/* Search & Category */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded px-4 py-2 w-full outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-orange-600 rounded px-4 py-2 w-full md:w-1/3"
        >
          <option value="">Select Category</option>
                <option value="Bussiness and Economics">Bussiness and Economics</option>
                <option value="Engineering and Technology">Engineering and Technology</option>
                <option value="Psychology">Psychology</option>
                <option value="Science">Science</option>
                <option value="Novels">Novels</option>
        </select>
      </div>

      {/* Books Grid */}
{/*       
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img
              src={`http://localhost:8080/${book.imageUrl}`}
              alt={book.title}
              className="w-full h-56 object-cover"
            />
      

            <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
            <p className="text-gray-600 text-sm">Author: {book.author}</p>
            <p className="text-gray-600 text-sm">Category: {book.category}</p>
            <p className="text-gray-800 font-bold mt-2">${book.price}</p>

            <button
              onClick={goToCart}
              className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <FaShoppingCart />
              Add to Cart
            </button>
          </div>
        ))}
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredBooks.map((book) => (
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

        {/* <button
          onClick={goToCart}
          className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <FaShoppingCart />
          details
        </button> */}
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

      {/* No results */}
      {filteredBooks.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No books found.</p>
      )}
    </div>
    <Footer />
    </>
  );
};

export default BookShop;
