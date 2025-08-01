import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BookShop from './BookShop'; // Import your BookShop component
import About from './About';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Header />
      
      {/* Include the BookShop component */}
      <BookShop />
      
       <About />
      
      <Footer />
    </div>
  );
}