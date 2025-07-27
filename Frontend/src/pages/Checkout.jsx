import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card', // default
    cardNumber: '',
    expiry: '',
    cvv: '',
    upiId: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    const requiredFields = ['fullName', 'email', 'address', 'city', 'zip'];

    if (formData.paymentMethod === 'card') {
      requiredFields.push('cardNumber', 'expiry', 'cvv');
    } else if (formData.paymentMethod === 'upi') {
      requiredFields.push('upiId');
    }

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1')}`);
        return;
      }
    }

    alert(`Order placed successfully via ${formData.paymentMethod.toUpperCase()}!`);
    localStorage.removeItem('cart');
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      <form onSubmit={handleCheckout} className="space-y-6">
        {/* Shipping Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" className="border p-2 rounded w-full" required />
            <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="border p-2 rounded w-full" required />
            <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="border p-2 rounded w-full" required />
            <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="border p-2 rounded w-full" required />
            <input name="zip" value={formData.zip} onChange={handleInputChange} placeholder="ZIP Code" className="border p-2 rounded w-full" required />
          </div>
        </div>

        {/* Payment Method Selection */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Select Payment Method</h3>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} />
              Card
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleInputChange} />
              UPI
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
              Cash on Delivery
            </label>
          </div>
        </div>

        {/* Conditional Payment Fields */}
        {formData.paymentMethod === 'card' && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Card Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} className="border p-2 rounded w-full" />
              <input name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} className="border p-2 rounded w-full" />
              <input name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} className="border p-2 rounded w-full" />
            </div>
          </div>
        )}

        {formData.paymentMethod === 'upi' && (
          <div>
            <h3 className="text-xl font-semibold mb-2">UPI Payment</h3>
            <input name="upiId" placeholder="UPI ID (e.g., name@bank)" value={formData.upiId} onChange={handleInputChange} className="border p-2 rounded w-full" />
          </div>
        )}

        {/* Order Summary */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <ul className="divide-y">
            {cartItems.map((item, idx) => (
              <li key={idx} className="py-2 flex justify-between">
                <span>{item.title} (x{item.quantity || 1})</span>
                <span>Rs. {(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="text-right font-bold mt-4">Total: Rs. {calculateTotal()}</p>
        </div>

        {/* Confirm Order */}
        <div className="text-center">
          <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
