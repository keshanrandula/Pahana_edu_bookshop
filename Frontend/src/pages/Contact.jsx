import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
        <p className="text-center text-gray-600 mb-10">
          We'd love to hear from you! Reach out with any questions, feedback, or just to say hello.
        </p>

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 text-center mb-10">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <FaPhoneAlt className="text-blue-500 text-3xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Phone</h2>
            <p className="text-gray-600 mt-2">+94 77 123 4567</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <FaEnvelope className="text-green-500 text-3xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-gray-600 mt-2">support@bookhaven.com</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <FaMapMarkerAlt className="text-red-500 text-3xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Address</h2>
            <p className="text-gray-600 mt-2">123 Book Street, Colombo, Sri Lanka</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded shadow-md">
          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
              <textarea rows="4" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your message here..." />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
