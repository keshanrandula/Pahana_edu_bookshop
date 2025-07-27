import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import About from './About'; 
import Contact from './Contact';    


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Top section */}
      <main className="flex-grow">
        <section className="p-8 text-center bg-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
          <p className="text-lg text-gray-600">This is the main content of the homepage.</p>
        </section>

        {/* About section */}
        <section className="bg-gray-100 py-10">
          <About />
        </section>

        {/* Contact section */}
        <section className="bg-gray-50 py-10">
          <Contact /> 
          </section>      


       
      </main>

      <Footer />
    </div>
  );
}
