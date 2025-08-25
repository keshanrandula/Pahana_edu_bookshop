import React from 'react';
import { FaBook, FaUserFriends, FaLightbulb } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-medium text-gray-900 mb-3">About Pahana Bookshop</h1>
        <p className="text-orange-600">
          Your trusted source for quality books since 2025
        </p>
      </div>

      {/* Key Points */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 border border-orange-100 rounded-lg bg-orange-50">
          <FaBook className="text-2xl text-orange-600 mb-3" />
          <h2 className="text-lg font-medium mb-2 text-gray-800">Curated Selection</h2>
          <p className="text-gray-600 text-sm">
            Carefully chosen books across all genres to match every reader's taste.
          </p>
        </div>
        <div className="p-6 border border-orange-100 rounded-lg bg-orange-50">
          <FaUserFriends className="text-2xl text-orange-600 mb-3" />
          <h2 className="text-lg font-medium mb-2 text-gray-800">Reader-Focused</h2>
          <p className="text-gray-600 text-sm">
            We prioritize your reading experience above all else.
          </p>
        </div>
        <div className="p-6 border border-orange-100 rounded-lg bg-orange-50">
          <FaLightbulb className="text-2xl text-orange-600 mb-3" />
          <h2 className="text-lg font-medium mb-2 text-gray-800">Knowledge Hub</h2>
          <p className="text-gray-600 text-sm">
            More than a bookstore - a community for learning and discovery.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto">
        <div className="border-t border-orange-200 pt-8">
          <h2 className="text-xl font-medium mb-4 text-gray-800">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Pahana Bookshop began with a simple idea: make great books easily accessible to everyone. 
              What started as a small online store has grown into a beloved destination for readers worldwide.
            </p>
            <p>
              We carefully select each title in our collection, ensuring quality content that educates, entertains, 
              and inspires our community of readers.
            </p>
            <p className="text-orange-600 font-medium">
              Thank you for being part of our story. We're excited to help you discover your next favorite book.
            </p>
          </div>
        </div>
      </div>
    </div>
    
 
  );
}