

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:8080/api/orders/${id}`);
        toast.success("✅ Order deleted successfully!", {
          position: "top-right",
          style: { backgroundColor: 'orange', color: 'white' },
          autoClose: 2000,
        });
        fetchOrders(); // Refresh
      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error("❌ Failed to delete order");
      }
    }
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${id}`, {
        status: "Confirmed"
      });
      fetchOrders(); // Refresh
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-orange-600 border-b-2 border-orange-200 pb-2"> All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div key={order.id || idx} className="border border-orange-200 rounded-lg shadow-md p-6 bg-white hover:shadow-orange-100 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-orange-700">Order #{idx + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-700"><strong className="text-orange-600">Name:</strong> {order.fullName}</p>
                  <p className="text-gray-700"><strong className="text-orange-600">Email:</strong> {order.email}</p>
                </div>
                <div>
                  <p className="text-gray-700"><strong className="text-orange-600">Payment:</strong> {order.paymentMethod}</p>
                  <p className="text-gray-700"><strong className="text-orange-600">Total:</strong> Rs. {order.total?.toFixed(2)}</p>
                </div>
              </div>
              <p className="mb-4"><strong className={`px-2 py-1 rounded ${order.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
                Status: {order.status || "Pending"}
              </strong></p>

              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2 text-orange-600 border-b border-orange-200 pb-1">Ordered Books:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {order.items?.map((book, index) => (
                    <div key={index} className="flex items-center gap-4 border border-orange-100 p-3 rounded-lg bg-orange-50">
                      {book.image && (
                        <img
                          src={`http://localhost:8080/${book.image}`}
                          alt={book.title}
                          className="w-16 h-24 object-cover border rounded border-orange-200"
                        />
                      )}
                      <div>
                        <p className="font-medium text-orange-800">{book.title}</p>
                        <p className="text-sm text-orange-600">Qty: {book.quantity}</p>
                        <p className="text-sm text-orange-600">Price: Rs. {book.price?.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => handleConfirm(order.id)}
                  className={`font-semibold py-2 px-4 rounded-lg transition-colors ${order.status === "Confirmed" 
                    ? "bg-green-100 text-green-700 border border-green-300 cursor-default" 
                    : "bg-orange-500 hover:bg-orange-600 text-white"}`}
                  disabled={order.status === "Confirmed"}
                >
                  {order.status === "Confirmed" ? "✅ Confirmed" : "Confirm Order"}
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="bg-white text-red-600 hover:bg-orange-50 font-semibold py-2 px-4 rounded-lg transition-colors border border-orange-300"
                >
                  Delete Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ViewOrders;


