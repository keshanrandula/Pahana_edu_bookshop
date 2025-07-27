import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (index, amount) => {
    const updatedCart = [...cartItems];
    const newQty = (updatedCart[index].quantity || 1) + amount;

    if (newQty > 0) {
      updatedCart[index].quantity = newQty;
      setCartItems(updatedCart);
    }
  };

  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };

  const handlePayment = () => {
    alert('Redirecting to payment gateway...');
    // navigate('/payment'); // Optional: Create a Payment page and use this
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            // <div
            //   key={index}
            //   className="flex items-start gap-6 border p-4 rounded-lg shadow-md bg-white"
            // >
            //   <img
            //     src={`http://localhost:8080${item.imageUrl}`}
            //     alt={item.title}
            //     className="w-32 h-40 object-cover rounded"
            //   />
             <div key={item.id} className="flex items-start gap-6 border p-4 rounded-lg shadow-md bg-white">
  <img
    src={`http://localhost:8080/${item.imageUrl}`}
    alt={item.title}
    className="w-32 h-40 object-cover rounded"
  />

       

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">Author: {item.author}</p>
                <p className="text-sm text-gray-600">Category: {item.category}</p>
                <p className="text-sm text-gray-600">Price: Rs. {item.price.toFixed(2)}</p>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(index, -1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(index, 1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(index)}
                  className="mt-4 text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total and Payment Section */}
          <div className="text-right mt-6 space-y-4">
            <h4 className="text-2xl font-bold">Total: Rs. {calculateTotal()}</h4>

            <button
              onClick={handlePayment}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
