import React from 'react';
import { FaBookOpen, FaUsers, FaGlobe } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          Welcome to <span className="font-semibold text-blue-600">Pahana Bookshop</span> — your one-stop destination for books of every kind.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <FaBookOpen className="text-4xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To make reading accessible, affordable, and enjoyable for everyone across the globe.
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <FaUsers className="text-4xl text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Team</h2>
          <p className="text-gray-600">
            A passionate group of book lovers dedicated to delivering great reading experiences.
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <FaGlobe className="text-4xl text-purple-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-600">
            To become the leading online bookstore connecting readers and writers worldwide.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-4xl mx-auto mt-16 bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Story</h2>
        <p className="text-gray-600 leading-relaxed">
          Founded in 2025, Pahana Bookshop was born out of a love for reading and a desire to bring quality books to the hands of everyone—whether you love thrillers, biographies, comics, or academic texts. 
          We believe every book has the power to inspire, educate, and entertain. We’ve built a platform that connects readers with the stories that matter most to them.
        </p>
      </div>
    </div>
  );
}
