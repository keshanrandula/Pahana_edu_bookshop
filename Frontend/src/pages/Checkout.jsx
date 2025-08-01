


////////new checkout
//  import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaCheckCircle } from 'react-icons/fa';
// import jsPDF from 'jspdf';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     address: '',
//     city: '',
//     zip: '',
//     paymentMethod: 'card',
//     cardNumber: '',
//     expiry: '',
//     cvv: '',
//     paypalEmail: ''
//   });

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const calculateTotal = () => {
//     return cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const generateInvoicePDF = () => {
//     const doc = new jsPDF();
//     let y = 20;

//     doc.setFontSize(18);
//     doc.text("Book Store - Invoice", 70, y);
//     y += 10;

//     doc.setFontSize(12);
//     doc.text(`Customer: ${formData.fullName}`, 20, y); y += 6;
//     doc.text(`Email: ${formData.email}`, 20, y); y += 6;
//     doc.text(`Address: ${formData.address}, ${formData.city}, ${formData.zip}`, 20, y); y += 10;

//     doc.text("Books:", 20, y); y += 6;

//     cartItems.forEach((item, index) => {
//       doc.text(`${index + 1}. ${item.title} - Qty: ${item.quantity || 1} - Rs. ${item.price.toFixed(2)}`, 25, y);
//       y += 6;
//     });

//     y += 6;
//     doc.text(`Total: Rs. ${calculateTotal()}`, 20, y);

//     doc.save(`invoice_${Date.now()}.pdf`);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const orderData = {
//       ...formData,
//       total: parseFloat(calculateTotal()),
//       items: cartItems.map(item => ({
//         title: item.title,
//         price: item.price,
//         quantity: item.quantity || 1,
//         image: item.imageUrl
//       }))
//     };

//     try {
//       await axios.post('http://localhost:8080/api/orders', orderData);
//       generateInvoicePDF();
//       setOrderPlaced(true);
//       localStorage.removeItem('cart');
//     } catch (error) {
//       alert('Failed to place order. Please try again.');
//     }
//   };

//   if (orderPlaced) {
//     return (
//       <div className="p-10 text-center">
//         <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
//         <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
//         <p className="text-gray-600">Thank you for your purchase.</p>
//         <button
//           onClick={() => navigate('/')}
//           className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Back to Home
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
//       {/* Form */}
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 space-y-4">
//         <h2 className="text-xl font-semibold">Shipping & Payment</h2>

//         <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
//           placeholder="Full Name" required className="w-full border p-2 rounded" />
//         <input type="email" name="email" value={formData.email} onChange={handleInputChange}
//           placeholder="Email" required className="w-full border p-2 rounded" />
//         <input type="text" name="address" value={formData.address} onChange={handleInputChange}
//           placeholder="Address" required className="w-full border p-2 rounded" />
//         <input type="text" name="city" value={formData.city} onChange={handleInputChange}
//           placeholder="City" required className="w-full border p-2 rounded" />
//         <input type="text" name="zip" value={formData.zip} onChange={handleInputChange}
//           placeholder="Zip Code" required className="w-full border p-2 rounded" />

//         <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}
//           className="w-full border p-2 rounded">
//           <option value="card">Credit/Debit Card</option>
//           <option value="paypal">PayPal</option>
//         </select>

//         {formData.paymentMethod === 'card' && (
//           <>
//             <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange}
//               placeholder="Card Number" required className="w-full border p-2 rounded" />
//             <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange}
//               placeholder="Expiry (MM/YY)" required className="w-full border p-2 rounded" />
//             <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange}
//               placeholder="CVV" required className="w-full border p-2 rounded" />
//           </>
//         )}

//         {formData.paymentMethod === 'paypal' && (
//           <input type="email" name="paypalEmail" value={formData.paypalEmail} onChange={handleInputChange}
//             placeholder="PayPal Email" required className="w-full border p-2 rounded" />
//         )}

//         <button type="submit"
//           className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
//           Place Order & Download Invoice
//         </button>
//       </form>

//       {/* Order Summary */}
//       <div className="bg-gray-50 p-6 rounded shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//         <div className="space-y-4 max-h-[500px] overflow-y-auto">
//           {cartItems.map((item, index) => (
//             <div key={index} className="flex items-center gap-4">
//               <img
//                 src={`http://localhost:8080/${item.imageUrl}`}
//                 alt={item.title}
//                 className="w-20 h-28 object-cover rounded border"
//               />
//               <div className="flex-1">
//                 <p className="font-medium">{item.title}</p>
//                 <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
//                 <p className="text-sm text-gray-600">Price: Rs. {item.price.toFixed(2)}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <hr className="my-4" />
//         <div className="text-right">
//           <p className="text-lg font-bold">Total: Rs. {calculateTotal()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

//////////////////new upadate


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaCheckCircle } from 'react-icons/fa';
// import jsPDF from 'jspdf';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     address: '',
//     city: '',
//     zip: '',
//     paymentMethod: 'card',
//     cardNumber: '',
//     expiry: '',
//     cvv: '',
//     paypalEmail: ''
//   });

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }

//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         username: user.username || '',
//         email: user.email || '',
//         address: user.address || ''
//       }));
//     }
//   }, []);

//   const calculateTotal = () => {
//     return cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const generateInvoicePDF = () => {
//     const doc = new jsPDF();
//     let y = 20;

//     doc.setFontSize(18);
//     doc.text("Book Store - Invoice", 70, y);
//     y += 10;

//     doc.setFontSize(12);
//     doc.text(`Customer: ${formData.username}`, 20, y); y += 6;
//     doc.text(`Email: ${formData.email}`, 20, y); y += 6;
//     doc.text(`Address: ${formData.address}, ${formData.city}, ${formData.zip}`, 20, y); y += 10;

//     doc.text("Books:", 20, y); y += 6;

//     cartItems.forEach((item, index) => {
//       doc.text(`${index + 1}. ${item.title} - Qty: ${item.quantity || 1} - Rs. ${item.price.toFixed(2)}`, 25, y);
//       y += 6;
//     });

//     y += 6;
//     doc.text(`Total: Rs. ${calculateTotal()}`, 20, y);

//     doc.save(`invoice_${Date.now()}.pdf`);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const orderData = {
//       ...formData,
//       total: parseFloat(calculateTotal()),
//       items: cartItems.map(item => ({
//         title: item.title,
//         price: item.price,
//         quantity: item.quantity || 1,
//         image: item.imageUrl
//       }))
//     };

//     try {
//       await axios.post('http://localhost:8080/api/orders', orderData);
//       generateInvoicePDF();
//       setOrderPlaced(true);
//       localStorage.removeItem('cart');
//     } catch (error) {
//       alert('Failed to place order. Please try again.');
//     }
//   };

//   if (orderPlaced) {
//     return (
//       <div className="p-10 text-center">
//         <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
//         <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
//         <p className="text-gray-600">Thank you for your purchase.</p>
//         <button
//           onClick={() => navigate('/')}
//           className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Back to Home
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
//       {/* Form */}
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 space-y-4">
//         <h2 className="text-xl font-semibold">Shipping & Payment</h2>

//         <input type="text" name="username" value={formData.username} onChange={handleInputChange}
//           placeholder="Username" required className="w-full border p-2 rounded" />
//         <input type="email" name="email" value={formData.email} onChange={handleInputChange}
//           placeholder="Email" required className="w-full border p-2 rounded" />
//         <input type="text" name="address" value={formData.address} onChange={handleInputChange}
//           placeholder="Address" required className="w-full border p-2 rounded" />
//         <input type="text" name="city" value={formData.city} onChange={handleInputChange}
//           placeholder="City" required className="w-full border p-2 rounded" />
//         <input type="text" name="zip" value={formData.zip} onChange={handleInputChange}
//           placeholder="Zip Code" required className="w-full border p-2 rounded" />

//         <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}
//           className="w-full border p-2 rounded">
//           <option value="card">Credit/Debit Card</option>
//           <option value="paypal">PayPal</option>
//         </select>

//         {formData.paymentMethod === 'card' && (
//           <>
//             <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange}
//               placeholder="Card Number" required className="w-full border p-2 rounded" />
//             <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange}
//               placeholder="Expiry (MM/YY)" required className="w-full border p-2 rounded" />
//             <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange}
//               placeholder="CVV" required className="w-full border p-2 rounded" />
//           </>
//         )}

//         {formData.paymentMethod === 'paypal' && (
//           <input type="email" name="paypalEmail" value={formData.paypalEmail} onChange={handleInputChange}
//             placeholder="PayPal Email" required className="w-full border p-2 rounded" />
//         )}

//         <button type="submit"
//           className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
//           Place Order & Download Invoice
//         </button>
//       </form>

//       {/* Order Summary */}
//       <div className="bg-gray-50 p-6 rounded shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//         <div className="space-y-4 max-h-[500px] overflow-y-auto">
//           {cartItems.map((item, index) => (
//             <div key={index} className="flex items-center gap-4">
//               <img
//                 src={`http://localhost:8080/${item.imageUrl}`}
//                 alt={item.title}
//                 className="w-20 h-28 object-cover rounded border"
//               />
//               <div className="flex-1">
//                 <p className="font-medium">{item.title}</p>
//                 <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
//                 <p className="text-sm text-gray-600">Price: Rs. {item.price.toFixed(2)}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <hr className="my-4" />
//         <div className="text-right">
//           <p className="text-lg font-bold">Total: Rs. {calculateTotal()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

//////////////////////////// login with


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

  // 🔐 Check login status
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

  const generateInvoicePDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.text("Book Store - Invoice", 70, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Customer: ${formData.username}`, 20, y); y += 6;
    doc.text(`Email: ${formData.email}`, 20, y); y += 6;
    doc.text(`Address: ${formData.address}, ${formData.city}, ${formData.zip}`, 20, y); y += 10;

    doc.text("Books:", 20, y); y += 6;

    cartItems.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.title} - Qty: ${item.quantity || 1} - Rs. ${item.price.toFixed(2)}`, 25, y);
      y += 6;
    });

    y += 6;
    doc.text(`Total: Rs. ${calculateTotal()}`, 20, y);

    doc.save(`invoice_${Date.now()}.pdf`);
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



