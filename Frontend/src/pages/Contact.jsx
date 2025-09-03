


import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('Sending...');

    const formDataToSend = new FormData();
    formDataToSend.append('access_key', '0e853cbf-02bf-48e5-b6e7-41a25a5d6e9e'); // Web3Forms API key
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setResult('');
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        toast.success('Form Submitted Successfully!');
      } else {
        console.error('Error', data);
        toast.error(data.message || 'Submission failed.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <NavBar />
    
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-orange-400 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            details about our bookshop, our mission, and how we can help you find your next great read.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

            {isSubmitted ? (
              <div className="text-center py-8">
                <FiCheckCircle className="mx-auto text-orange-500 text-5xl mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition flex items-center justify-center space-x-2"
                >
                  <FaPaperPlane />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Contact Details</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-orange-100">
                <div className="bg-orange-100 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">pahana edu bookshop</h3>
                  <p className="text-gray-600">dehiwala,colombo</p>
                  <button className="mt-2 text-orange-600 hover:text-orange-800 text-sm font-medium">
                    Get Directions →
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-orange-100">
                <div className="bg-orange-100 p-3 rounded-full">
                  <FaPhone className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                  <p className="text-gray-600">0761234567</p>
                  <p className="text-gray-500 text-sm mt-1">Mon-Fri: 9am-6pm</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-orange-100">
                <div className="bg-orange-100 p-3 rounded-full">
                  <FaEnvelope className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                  <p className="text-gray-600">pahana edu books@gmail.com</p>
                  <p className="text-gray-500 text-sm mt-1">We respond within 24 hours</p>
                </div>
              </div>

             
            </div>
          </div>
        </div>

        
      </div>
    </div>
     <Footer />

</>
  );
};

export default ContactUs;