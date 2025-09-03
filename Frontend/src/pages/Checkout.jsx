
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';
import jsPDF from 'jspdf';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
    paypalEmail: ''
  });

  //  Check login status
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to proceed with checkout.");
      navigate("/login");
      return;
    }

    // Prefill user info
    setFormData(prev => ({
      ...prev,
      username: user.username || '',
      email: user.email || '',
      address: user.address || ''
    }));

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [navigate]);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const generateInvoicePDF = () => {

  //   const doc = new jsPDF();
  //   let y = 20;

  //   doc.setFontSize(18);
  //   doc.text("Book Store - Invoice", 70, y);
  //   y += 10;

  //   doc.setFontSize(12);
  //   doc.text(`Customer: ${formData.username}`, 20, y); y += 6;
  //   doc.text(`Email: ${formData.email}`, 20, y); y += 6;
  //   doc.text(`Address: ${formData.address}, ${formData.city}, ${formData.zip}`, 20, y); y += 10;

  //   doc.text("Books:", 20, y); y += 6;

  //   cartItems.forEach((item, index) => {
  //     doc.text(`${index + 1}. ${item.title} - Qty: ${item.quantity || 1} - Rs. ${item.price.toFixed(2)}`, 25, y);
  //     y += 6;
  //   });

  //   y += 6;
  //   doc.text(`Total: Rs. ${calculateTotal()}`, 20, y);

  //   doc.save(`invoice_${Date.now()}.pdf`);
  // };
const generateInvoicePDF = () => {
    const doc = new jsPDF();
    let y = 20;

    

    // Header
    doc.setFontSize(22);
    doc.setTextColor(214, 89, 39); 
    doc.setFont('helvetica', 'bold');
    doc.text("PAHANA EDU BOOKSHOP", 105, y, null, null, 'center');
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor(81, 81, 81);
    doc.setFont('helvetica', 'normal');
    doc.text("123 Education Street, Colombo 05", 105, y, null, null, 'center');
    y += 5;
    doc.text("Tel: 011-1234567 | Email: info@pahanaedu.lk", 105, y, null, null, 'center');
    y += 15;

    // Invoice title
    doc.setFontSize(18);
    doc.setTextColor(214, 89, 39); 
    doc.text("INVOICE", 105, y, null, null, 'center');
    y += 10;

    
    doc.setFontSize(10);
    doc.setTextColor(81, 81, 81);
    doc.text(`Invoice #: INV-${Date.now().toString().slice(-6)}`, 20, y);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, y);
    y += 15;

    // Customer details box
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(255, 243, 224); 
    doc.rect(20, y, 170, 30, 'FD'); 
    doc.setFontSize(12);
    doc.setTextColor(214, 89, 39);
    doc.text("BILL TO:", 25, y + 8);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`${formData.username}`, 60, y + 8);
    doc.text(`${formData.email}`, 60, y + 15);
    doc.text(`${formData.address}, ${formData.city}, ${formData.zip}`, 60, y + 22);
    y += 35;

    // Table header
    doc.setFillColor(214, 89, 39); 
    doc.rect(20, y, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text("No.", 25, y + 7);
    doc.text("Book Title", 40, y + 7);
    doc.text("Qty", 140, y + 7);
    doc.text("Price", 160, y + 7);
    doc.text("Total", 180, y + 7);
    y += 10;

    // Table rows
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    let grandTotal = 0;
    
    cartItems.forEach((item, index) => {
        const itemTotal = (item.quantity || 1) * item.price;
        grandTotal += itemTotal;
        
        doc.text(`${index + 1}.`, 25, y + 7);
        doc.text(item.title, 40, y + 7);
        doc.text(`${item.quantity || 1}`, 140, y + 7, null, null, 'right');
        doc.text(`Rs. ${item.price.toFixed(2)}`, 160, y + 7, null, null, 'right');
        doc.text(`Rs. ${itemTotal.toFixed(2)}`, 180, y + 7, null, null, 'right');
        
        y += 10;
        
        if (index < cartItems.length - 1) {
            doc.setDrawColor(200, 200, 200);
            doc.line(25, y, 185, y);
            y += 5;
        }
    });

    y += 10;
    // Grand total
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text("TOTAL:", 140, y + 7);
    doc.text(`Rs. ${grandTotal.toFixed(2)}`, 180, y + 7, null, null, 'right');

    y += 15;
    // Footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(81, 81, 81);
    doc.text("Thank you for your purchase!", 105, y, null, null, 'center');
    y += 5;
    doc.text("pahana bookshop billpayment", 105, y, null, null, 'center');
    y += 5;
    doc.text("- payment", 105, y, null, null, 'center');
    y += 10;
    doc.text("Returns accepted within 7 days with original receipt", 105, y, null, null, 'center');

    // Save the PDF
    doc.save(`PahanaEdu_Invoice_${Date.now().toString().slice(-6)}.pdf`);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      ...formData,
      total: parseFloat(calculateTotal()),
      items: cartItems.map(item => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.imageUrl
      }))
    };

    try {
      await axios.post('http://localhost:8080/api/orders', orderData);
      generateInvoicePDF();
      setOrderPlaced(true);
      localStorage.removeItem('cart');
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  if (orderPlaced) {
    return (
      <div className="p-10 text-center">
        <FaCheckCircle className="text-orange-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600">Thank you for your purchase.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 space-y-4">
        <h2 className="text-xl font-semibold">Shipping & Payment</h2>

        <input type="text" name="username" value={formData.username} onChange={handleInputChange}
          placeholder="Username" required className="w-full border p-2 rounded" />
        <input type="email" name="email" value={formData.email} onChange={handleInputChange}
          placeholder="Email" required className="w-full border p-2 rounded" />
        <input type="text" name="address" value={formData.address} onChange={handleInputChange}
          placeholder="Address" required className="w-full border p-2 rounded" />
        <input type="text" name="city" value={formData.city} onChange={handleInputChange}
          placeholder="City" required className="w-full border p-2 rounded" />
        <input type="text" name="zip" value={formData.zip} onChange={handleInputChange}
          placeholder="Zip Code" required className="w-full border p-2 rounded" />

        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}
          className="w-full border p-2 rounded">
          <option value="card">Credit/Debit Card</option>
          <option value="paypal">PayPal</option>
        </select>

        {formData.paymentMethod === 'card' && (
          <>
            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange}
              placeholder="Card Number" required className="w-full border p-2 rounded" />
            <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange}
              placeholder="Expiry (MM/YY)" required className="w-full border p-2 rounded" />
            <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange}
              placeholder="CVV" required className="w-full border p-2 rounded" />
          </>
        )}

        {formData.paymentMethod === 'paypal' && (
          <input type="email" name="paypalEmail" value={formData.paypalEmail} onChange={handleInputChange}
            placeholder="PayPal Email" required className="w-full border p-2 rounded" />
        )}

        <button type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded hover:bg-orange-700">
          Place Order & Download Invoice
        </button>
      </form>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <img
                src={`http://localhost:8080/${item.imageUrl}`}
                alt={item.title}
                className="w-20 h-28 object-cover rounded border"
              />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                <p className="text-sm text-gray-600">Price: Rs. {item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-4" />
        <div className="text-right">
          <p className="text-lg font-bold">Total: Rs. {calculateTotal()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



