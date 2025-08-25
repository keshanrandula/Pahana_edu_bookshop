import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-orange-500">Pahana Bookshop</h2>
          <p className="text-sm text-orange-300">
            Your trusted bookshop for stories that inspire and knowledge that empowers.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-orange-400 hover:text-orange-300 text-xl transition-colors">
            <FaFacebook />
          </a>
          <a href="#" className="text-orange-400 hover:text-orange-300 text-xl transition-colors">
            <FaInstagram />
          </a>
          <a href="#" className="text-orange-400 hover:text-orange-300 text-xl transition-colors">
            <FaTwitter />
          </a>
          <a href="mailto:info@pahanabooks.com" className="text-orange-400 hover:text-orange-300 text-xl transition-colors">
            <FaEnvelope />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-orange-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Pahana Bookshop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}