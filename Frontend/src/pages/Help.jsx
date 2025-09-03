


import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import NavBar from "../components/Navbar"; 
import Footer from "../components/Footer"; 

const Help = () => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    
 
    doc.setFillColor(255, 102, 0);  
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255); 
    doc.text("PHANA EDU BOOKSHOP", 105, 20, { align: 'center' });
    
    
    doc.setFontSize(16);
    doc.setTextColor(204, 51, 0);  
    doc.text("User Guidelines Handbook", 105, 45, { align: 'center' });
    
    
    doc.setDrawColor(255, 102, 0);
    doc.setLineWidth(0.8);
    doc.line(20, 50, 190, 50);
    
    // Guidelines content in table format
    const guidelines = [
      { 
        section: "Account Access", 
        points: [
          "Register using your  email, password  and other details ",
          "Login with your email and password",
          "you can access your homepage"
        ] 
      },
      { 
        section: "Book Purchases", 
        points: [
          "Browse by category or search directly",
          "View book details and availability",
          "Add to cart and proceed to checkout"
        ] 
      },
      { 
        section: "Order Management", 
        points: [
          "first details check then can acess cart ",
          "View order order details",
          "you checkout your order"
        ] 
      },
      { 
        section: "Support", 
        points: [
          "24/7 chat support available",
          "Email: support@phanaedu.com",
          "Phone: +123 456 7890"
        ] 
      }
    ];

    let yPos = 60;
    
    guidelines.forEach((item, index) => {
      // Section header
      doc.setFontSize(14);
      doc.setTextColor(13, 71, 161);
      doc.text(`${index + 1}. ${item.section}`, 20, yPos);
      yPos += 8;
      
      // Points
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      item.points.forEach(point => {
        doc.text(`• ${point}`, 25, yPos);
        yPos += 7;
      });
      
      yPos += 10;  
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for choosing Phana Edu Bookshop", 105, 280, { align: 'center' });
    doc.text("© 2025 Phana Edu Bookshop | All Rights Reserved", 105, 285, { align: 'center' });

    // Save PDF
    doc.save("PhanaEdu_User_Guidelines.pdf");
  };

  return (
    <>
        <NavBar />
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-orange-800 text-center">
        Phana Edu Bookshop User Guide
      </h1>
      
      <div className="space-y-6">
        {/* Account Section */}
        <div className="p-5 bg-orange-50 rounded-xl border-l-4 border-orange-500">
          <h2 className="text-xl font-semibold text-orange-700 mb-3">1. Account Access</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Register using your  email, password  and other details</li>
            <li>Login with your email and password</li>
            <li>you can access your homepage</li>
          </ul>
        </div>

        {/* Purchases Section */}
        <div className="p-5 bg-orange-50 rounded-xl border-l-4 border-orange-500">
          <h2 className="text-xl font-semibold text-green-700 mb-3">2. Book Purchases</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Browse by category or search directly</li>
            <li>View book details and availability</li>
            <li>Add to cart and proceed to checkout</li>
          </ul>
        </div>

        {/* Orders Section */}
        <div className="p-5 bg-orange-50 rounded-xl border-l-4 border-orange-500">
          <h2 className="text-xl font-semibold text-purple-700 mb-3">3. Order Management</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>first details check then can acess cart </li>
            <li>View order order details</li>
            <li>you checkout your order</li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="p-5 bg-orange-50 rounded-xl border-l-4 border-orange-500">
          <h2 className="text-xl font-semibold text-yellow-700 mb-3">4. Support</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>24/7 chat support available</li>
            <li>Email: support@phanaedu.com</li>
            <li>Phone: +123 456 7890</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={downloadPDF}
          className="px-8 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Download Complete Guide (PDF)
        </button>
        <p className="mt-3 text-gray-500 text-sm">
          Printable version with additional details and resources
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Help;