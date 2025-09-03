

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBookView = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const deleteBook = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      fetchBooks(); // Refresh the list
      toast.success("Book deleted successfully!", { 
        position: "top-center",
        style: { backgroundColor: 'orange', color: 'white' },
      });
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error("Failed to delete book!", { 
        position: "top-center",
        style: { backgroundColor: 'red', color: 'white' },
      });
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/update/${id}`); // Redirect to update page 
  };

  return (
    <div className="min-h-screen bg-white-50 p-6">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Admin Book Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img
              src={`http://localhost:8080/${book.imageUrl}`}
              alt={book.title}
              className="h-60 w-auto object-contain transition-transform duration-300 hover:scale-105 mx-auto"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-800">{book.title}</h2>
              <p className="text-gray-600 text-sm mb-1">Author: {book.author}</p>
              <p className="text-gray-600 text-sm mb-1">Publisher: {book.publisher}</p>
              <p className="text-gray-600 text-sm mb-1">Language: {book.language}</p>
              <p className="text-gray-600 text-sm mb-1">Pages: {book.pages}</p>
              <p className="text-gray-600 text-sm mb-1">Category: {book.category}</p>
              <p className="text-green-700 font-bold mt-2">Rs. {book.price.toFixed(2)}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleUpdate(book.id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminBookView;

