// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Checkout = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     address: '',
//     city: '',
//     zip: '',
//     paymentMethod: 'card', // default
//     cardNumber: '',
//     expiry: '',
//     cvv: '',
//     upiId: '',
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const calculateTotal = () => {
//     return cartItems
//       .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
//       .toFixed(2);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCheckout = (e) => {
//     e.preventDefault();

//     const requiredFields = ['fullName', 'email', 'address', 'city', 'zip'];

//     if (formData.paymentMethod === 'card') {
//       requiredFields.push('cardNumber', 'expiry', 'cvv');
//     } else if (formData.paymentMethod === 'upi') {
//       requiredFields.push('upiId');
//     }

//     for (const field of requiredFields) {
//       if (!formData[field].trim()) {
//         alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1')}`);
//         return;
//       }
//     }

//     alert(`Order placed successfully via ${formData.paymentMethod.toUpperCase()}!`);
//     localStorage.removeItem('cart');
//     navigate('/');
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

//       <form onSubmit={handleCheckout} className="space-y-6">
//         {/* Shipping Info */}
//         <div>
//           <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" className="border p-2 rounded w-full" required />
//             <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="border p-2 rounded w-full" required />
//             <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="border p-2 rounded w-full" required />
//             <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="border p-2 rounded w-full" required />
//             <input name="zip" value={formData.zip} onChange={handleInputChange} placeholder="ZIP Code" className="border p-2 rounded w-full" required />
//           </div>
//         </div>

//         {/* Payment Method Selection */}
//         <div>
//           <h3 className="text-xl font-semibold mb-2">Select Payment Method</h3>
//           <div className="flex gap-4">
//             <label className="flex items-center gap-2">
//               <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} />
//               Card
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleInputChange} />
//               UPI
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
//               Cash on Delivery
//             </label>
//           </div>
//         </div>

//         {/* Conditional Payment Fields */}
//         {formData.paymentMethod === 'card' && (
//           <div>
//             <h3 className="text-xl font-semibold mb-2">Card Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <input name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} className="border p-2 rounded w-full" />
//               <input name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} className="border p-2 rounded w-full" />
//               <input name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} className="border p-2 rounded w-full" />
//             </div>
//           </div>
//         )}

//         {formData.paymentMethod === 'upi' && (
//           <div>
//             <h3 className="text-xl font-semibold mb-2">UPI Payment</h3>
//             <input name="upiId" placeholder="UPI ID (e.g., name@bank)" value={formData.upiId} onChange={handleInputChange} className="border p-2 rounded w-full" />
//           </div>
//         )}

//         {/* Order Summary */}
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
//           <ul className="divide-y">
//             {cartItems.map((item, idx) => (
//               <li key={idx} className="py-2 flex justify-between">
//                 <span>{item.title} (x{item.quantity || 1})</span>
//                 <span>Rs. {(item.price * (item.quantity || 1)).toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//           <p className="text-right font-bold mt-4">Total: Rs. {calculateTotal()}</p>
//         </div>

//         {/* Confirm Order */}
//         <div className="text-center">
//           <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
//             Confirm Order
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Checkout;

/////////////////////////////////////////////////////
// 
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Checkout = () => {
//   const [cartItems, setCartItems] = useState([]);
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
//   const [isProcessing, setIsProcessing] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) setCartItems(JSON.parse(savedCart));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);
//   };

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validateCard = () => /^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''));
//   const validateExpiry = () => /^\d{2}\/\d{2}$/.test(formData.expiry);
//   const validateCVV = () => /^\d{3,4}$/.test(formData.cvv);

//   const handleCheckout = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     // Basic validation
//     const required = ['fullName', 'email', 'address', 'city', 'zip'];
//     for (const field of required) {
//       if (!formData[field]) {
//         alert(`Please enter your ${field}`);
//         setIsProcessing(false);
//         return;
//       }
//     }

//     if (!validateEmail(formData.email)) {
//       alert('Invalid email');
//       setIsProcessing(false);
//       return;
//     }

//     if (formData.paymentMethod === 'card') {
//       if (!validateCard() || !validateExpiry() || !validateCVV()) {
//         alert('Invalid card details');
//         setIsProcessing(false);
//         return;
//       }
//     }

//     if (formData.paymentMethod === 'paypal' && !validateEmail(formData.paypalEmail)) {
//       alert('Invalid PayPal email');
//       setIsProcessing(false);
//       return;
//     }

//     try {
//       await fetch('http://localhost:8080/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...formData,
//           total: parseFloat(calculateTotal()),
//           items: cartItems
//         })
//       });

//       const billWindow = window.open('', '_blank');
//       billWindow.document.write(`
//         <html><head><title>Receipt</title></head><body>
//         <h2>Thank you for your order!</h2>
//         <p>Name: ${formData.fullName}</p>
//         <p>Email: ${formData.email}</p>
//         <p>Total: Rs. ${calculateTotal()}</p>
//         <hr>
//         ${cartItems.map(item => `
//           <div>
//              <img src="http://localhost:8080/${item.imageUrl}" width="100" />
//             <p>${item.title} x${item.quantity || 1} - Rs. ${(item.price * (item.quantity || 1)).toFixed(2)}</p>
//           </div>
//         `).join('')}
//         </body></html>
//       `);
//       billWindow.document.close();
//       billWindow.print();

//       localStorage.removeItem('cart');
//       alert('Order placed successfully!');
//       navigate('/');
//     } catch (err) {
//       alert('Checkout failed');
//       console.error(err);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg mt-10">
//       <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Checkout</h2>
//       <form onSubmit={handleCheckout} className="grid md:grid-cols-2 gap-6">
//         {/* Shipping Info */}
//         <div>
//           <label>Full Name</label>
//           <input name="fullName" value={formData.fullName} onChange={handleInputChange} required className="border p-2 w-full mb-4" />
//           <label>Email</label>
//           <input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="border p-2 w-full mb-4" />
//           <label>Address</label>
//           <input name="address" value={formData.address} onChange={handleInputChange} required className="border p-2 w-full mb-4" />
//           <label>City</label>
//           <input name="city" value={formData.city} onChange={handleInputChange} required className="border p-2 w-full mb-4" />
//           <label>ZIP Code</label>
//           <input name="zip" value={formData.zip} onChange={handleInputChange} required className="border p-2 w-full mb-4" />
//         </div>

//         {/* Payment Info */}
//         <div>
//           <label>Payment Method</label>
//           <div className="flex gap-4 mb-4">
//             {['card', 'paypal', 'cod'].map(method => (
//               <label key={method}>
//                 <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={handleInputChange} />
//                 {method === 'card' ? 'Card' : method === 'paypal' ? 'PayPal' : 'Cash on Delivery'}
//               </label>
//             ))}
//           </div>

//           {formData.paymentMethod === 'card' && (
//             <>
//               <label>Card Number</label>
//               <input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="border p-2 w-full mb-2" />
//               <label>Expiry (MM/YY)</label>
//               <input name="expiry" value={formData.expiry} onChange={handleInputChange} className="border p-2 w-full mb-2" />
//               <label>CVV</label>
//               <input name="cvv" value={formData.cvv} onChange={handleInputChange} className="border p-2 w-full mb-4" />
//             </>
//           )}

//           {formData.paymentMethod === 'paypal' && (
//             <>
//               <label>PayPal Email</label>
//               <input name="paypalEmail" type="email" value={formData.paypalEmail} onChange={handleInputChange} className="border p-2 w-full mb-4" />
//             </>
//           )}

//           <button type="submit" disabled={isProcessing} className="bg-orange-600 text-white px-6 py-3 w-full rounded hover:bg-orange-700">
//             {isProcessing ? 'Processing...' : 'Place Order'}
//           </button>
//         </div>
//       </form>

//       {/* Order Summary with Images */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold text-orange-600 mb-4">Order Summary</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {cartItems.map((item, index) => (
//             <div key={index} className="bg-white border rounded-lg p-4 shadow">
//               <img src={`http://localhost:8080/${item.imageUrl}`} alt={item.title} className="w-full h-40 object-cover mb-2 rounded" />
//               <h4 className="font-bold">{item.title}</h4>
//               <p>Qty: {item.quantity || 1}</p>
//               <p>Price: Rs. {(item.price * (item.quantity || 1)).toFixed(2)}</p>
//             </div>
//           ))}
//         </div>
//         <div className="text-right mt-6 font-bold text-lg">
//           Total: Rs. {calculateTotal()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
///////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Checkout = () => {
//   const [cartItems, setCartItems] = useState([]);
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
//     paypalEmail: '',
//     receiptImage: null
//   });
//   const [isProcessing, setIsProcessing] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) setCartItems(JSON.parse(savedCart));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileUpload = (e) => {
//     setFormData(prev => ({ ...prev, receiptImage: e.target.files[0] }));
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);
//   };

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validateCard = () => /^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''));
//   const validateExpiry = () => /^\d{2}\/\d{2}$/.test(formData.expiry);
//   const validateCVV = () => /^\d{3,4}$/.test(formData.cvv);

//   const handleCheckout = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     // Basic validation
//     const required = ['fullName', 'email', 'address', 'city', 'zip'];
//     for (const field of required) {
//       if (!formData[field]) {
//         alert(`Please enter your ${field}`);
//         setIsProcessing(false);
//         return;
//       }
//     }

//     if (!validateEmail(formData.email)) {
//       alert('Invalid email');
//       setIsProcessing(false);
//       return;
//     }

//     if (formData.paymentMethod === 'card') {
//       if (!validateCard() || !validateExpiry() || !validateCVV()) {
//         alert('Invalid card details');
//         setIsProcessing(false);
//         return;
//       }
//     }

//     if (formData.paymentMethod === 'paypal' && !validateEmail(formData.paypalEmail)) {
//       alert('Invalid PayPal email');
//       setIsProcessing(false);
//       return;
//     }

//     try {
//       const orderData = {
//         fullName: formData.fullName,
//         email: formData.email,
//         address: formData.address,
//         city: formData.city,
//         zip: formData.zip,
//         paymentMethod: formData.paymentMethod,
//         cardNumber: formData.cardNumber,
//         expiry: formData.expiry,
//         cvv: formData.cvv,
//         paypalEmail: formData.paypalEmail,
//         total: parseFloat(calculateTotal()),
//         items: cartItems
//       };

//       const payload = new FormData();
//       payload.append('order', new Blob([JSON.stringify(orderData)], { type: 'application/json' }));
//       if (formData.receiptImage) {
//         payload.append('image', formData.receiptImage);
//       }

//       const response = await fetch('http://localhost:8080/api/orders', {
//         method: 'POST',
//         body: payload
//       });

//       if (response.ok) {
//         alert('Order placed successfully!');
//         localStorage.removeItem('cart');
//         navigate('/');
//       } else {
//         alert('Checkout failed');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Something went wrong');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg mt-10">
//       <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Checkout</h2>
//       <form onSubmit={handleCheckout} className="grid md:grid-cols-2 gap-6">
//         {/* Shipping Info */}
//         <div>
//           <label>Full Name</label>
//           <input name="fullName" value={formData.fullName} onChange={handleInputChange} required className="border p-2 w-full mb-4" />
//           <label>Email</label>
//           <input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="border p-2 w-full mb-4" />
//           <label>Address</label>
//           <input name="address" value={formData.address} onChange={handleInputChange} required className="border p-2 w-full mb-4" />
//           <label>City</label>
//           <input name="city" value={formData.city} onChange={handleInputChange} required className="border p-2 w-full mb-4" />
//           <label>ZIP Code</label>
//           <input name="zip" value={formData.zip} onChange={handleInputChange} required className="border p-2 w-full mb-4" />
//           <label>Upload Receipt (optional)</label>
//           <input type="file" accept="image/*" onChange={handleFileUpload} className="mb-4" />
//         </div>

//         {/* Payment Info */}
//         <div>
//           <label>Payment Method</label>
//           <div className="flex gap-4 mb-4">
//             {['card', 'paypal', 'cod'].map(method => (
//               <label key={method}>
//                 <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={handleInputChange} />
//                 {method === 'card' ? 'Card' : method === 'paypal' ? 'PayPal' : 'Cash on Delivery'}
//               </label>
//             ))}
//           </div>

//           {formData.paymentMethod === 'card' && (
//             <>
//               <label>Card Number</label>
//               <input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="border p-2 w-full mb-2" />
//               <label>Expiry (MM/YY)</label>
//               <input name="expiry" value={formData.expiry} onChange={handleInputChange} className="border p-2 w-full mb-2" />
//               <label>CVV</label>
//               <input name="cvv" value={formData.cvv} onChange={handleInputChange} className="border p-2 w-full mb-4" />
//             </>
//           )}

//           {formData.paymentMethod === 'paypal' && (
//             <>
//               <label>PayPal Email</label>
//               <input name="paypalEmail" type="email" value={formData.paypalEmail} onChange={handleInputChange} className="border p-2 w-full mb-4" />
//             </>
//           )}

//           <button type="submit" disabled={isProcessing} className="bg-orange-600 text-white px-6 py-3 w-full rounded hover:bg-orange-700">
//             {isProcessing ? 'Processing...' : 'Place Order'}
//           </button>
//         </div>
//       </form>

//       {/* Order Summary */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold text-orange-600 mb-4">Order Summary</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {cartItems.map((item, index) => (
//             <div key={index} className="bg-white border rounded-lg p-4 shadow">
//               <img src={`http://localhost:8080/${item.imageUrl}`} alt={item.title} className="w-full h-40 object-cover mb-2 rounded" />
//               <h4 className="font-bold">{item.title}</h4>
//               <p>Qty: {item.quantity || 1}</p>
//               <p>Price: Rs. {(item.price * (item.quantity || 1)).toFixed(2)}</p>
//             </div>
//           ))}
//         </div>
//         <div className="text-right mt-6 font-bold text-lg">
//           Total: Rs. {calculateTotal()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

// // ////////////////

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaCheckCircle } from 'react-icons/fa';

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
//       {/* Left: Form */}
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
//               placeholder="Expiry Date (MM/YY)" required className="w-full border p-2 rounded" />
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
//           Place Order
//         </button>
//       </form>

//       {/* Right: Order Summary */}
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


//////
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
    fullName: '',
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

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

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
    doc.text(`Customer: ${formData.fullName}`, 20, y); y += 6;
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
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
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

        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
          placeholder="Full Name" required className="w-full border p-2 rounded" />
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
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
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
