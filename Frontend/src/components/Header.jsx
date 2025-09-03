import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  
  return (
    
    <header className="relative w-full h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/i1.jpg"
          alt="Bookstore Banner"
          className="w-full h-full object-cover"
          loading="eager" // For above-the-fold images
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />


      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Welcome to Our Bookshop
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Discover your next favorite book in our extensive collection
          </p>
          {/* <button 
          
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
          >
            Browse Books
          </button> */}
           <button
            onClick={() => navigate("/bookhome")}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
          >
            Browse Books
          </button>

          
        </div>
      </div>
    </header>
  );
}