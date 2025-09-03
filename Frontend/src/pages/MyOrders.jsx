


import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/orders");
      const userOrders = res.data.filter(
        (order) => order.email?.toLowerCase() === user.email.toLowerCase()
      );
      setOrders(userOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center text-white bg-orange-500 rounded-lg p-4 max-w-md mx-auto mt-10 font-semibold shadow-md">
        Please login to view your orders.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-orange-600 mt-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mb-2"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-2"> My Orders</h1>
        <div className="w-20 h-1 bg-orange-400 mx-auto rounded-full"></div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-orange-700 bg-orange-100 inline-block px-4 py-2 rounded-lg">
            You have no orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div
              key={order.id}
              className="bg-white border border-orange-200 p-6 rounded-xl shadow-lg hover:shadow-orange-100 transition-shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <h2 className="text-lg font-semibold text-orange-800">
                  Order #{idx + 1} —{" "}
                  <span
                    className={`${
                      order.status === "Confirmed"
                        ? "text-green-600 bg-green-100"
                        : "text-orange-600 bg-orange-100"
                    } px-2 py-1 rounded-full text-sm font-bold`}
                  >
                    {order.status || "Pending"}
                  </span>
                </h2>
                <p className="text-orange-700 font-medium bg-orange-50 px-3 py-1 rounded-full">
                  Total: Rs. {order.total?.toFixed(2)}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {order.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 border border-orange-100 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors"
                  >
                    {item.image && (
                      <img
                        src={`http://localhost:8080/${item.image}`}
                        alt={item.title}
                        className="w-16 h-24 object-cover border border-orange-200 rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium text-orange-900">{item.title}</p>
                      <p className="text-sm text-orange-700">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-orange-700">
                        Price: Rs. {item.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;