import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">BookHaven</h2>
          <p className="text-sm text-gray-400">Your trusted bookshop for stories that inspire and knowledge that empowers.</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-yellow-400"><FaFacebook /></a>
          <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
          <a href="#" className="hover:text-yellow-400"><FaTwitter /></a>
          <a href="mailto:info@bookhaven.com" className="hover:text-yellow-400"><FaEnvelope /></a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400 text-center md:text-right">
          &copy; 2025 BookHaven. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

