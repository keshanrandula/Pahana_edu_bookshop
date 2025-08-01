import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6">📦 All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div key={order.id || idx} className="border rounded-lg shadow p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2">Order #{idx + 1}</h3>
              <p><strong>Name:</strong> {order.fullName}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Total:</strong> Rs. {order.total?.toFixed(2)}</p>

              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Ordered Books:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {order.items?.map((book, index) => (
                    <div key={index} className="flex items-center gap-4 border p-3 rounded">
                      {book.image && (
                        <img
                          src={`http://localhost:8080/${book.image}`}
                          alt={book.title}
                          className="w-16 h-24 object-cover border rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{book.title}</p>
                        <p className="text-sm text-gray-600">Qty: {book.quantity}</p>
                        <p className="text-sm text-gray-600">Price: Rs. {book.price?.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                

                      
              </div>
              <div className="mt-4 flex justify-end">

                         <button
                        onClick={() => handleDelete(order._id)}
                        className="text-white bg-red-600 hover:bg-red-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Delete Order
                      </button>
                      </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
