
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBook,
  FaPlusCircle,
  FaChartBar,
  FaSignOutAlt,
  FaUserCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShoppingCart,
  FaComments, // Feedback icon
} from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalOrders: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, bookRes, orderRes] = await Promise.all([
          fetch("http://localhost:8080/api/auth/all"),
          fetch("http://localhost:8080/api/books"),
          fetch("http://localhost:8080/api/orders"),
        ]);

        const users = await userRes.json();
        const books = await bookRes.json();
        const orders = await orderRes.json();

        setStats({
          totalUsers: Array.isArray(users) ? users.length : 0,
          totalBooks: Array.isArray(books) ? books.length : Object.keys(books).length,
          totalOrders: Array.isArray(orders) ? orders.length : Object.keys(orders).length,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const actions = [
    {
      to: "/admin/userdetails",
      icon: <FaUsers className="text-3xl text-blue-600 mb-2" />,
      title: "View Users",
      subtitle: "User details",
    },
    {
      to: "/admin/bookadd",
      icon: <FaPlusCircle className="text-3xl text-green-600 mb-2" />,
      title: "Add Book",
      subtitle: "Upload a new book with image",
    },
    {
      to: "/admin/feedback",
      icon: <FaComments className="text-3xl text-yellow-500 mb-2" />,
      title: "Feedback",
      subtitle: "User feedback",
    },
    {
      to: "/admin/bookview",
      icon: <FaBook className="text-3xl text-purple-600 mb-2" />,
      title: "View All Books",
      subtitle: "Edit or delete books",
    },
    {
      to: "/admin/orders",
      icon: <FaChartBar className="text-3xl text-pink-600 mb-2" />,
      title: "Orders",
      subtitle: "View all orders",
    },
    {
      to: "/admin/login",
      icon: <FaSignOutAlt className="text-3xl text-gray-700 mb-2" />,
      title: "Logout",
      subtitle: "Logout from admin",
    },
  ];

  const activities = [
    {
      icon: <FaCheckCircle className="text-green-600 text-xl" />,
      text: 'New user "john@example.com" registered',
      time: "5 minutes ago",
    },
    {
      icon: <FaExclamationTriangle className="text-yellow-500 text-xl" />,
      text: 'Book update: "Spring Boot in Action"',
      time: "1 hour ago",
    },
    {
      icon: <FaShoppingCart className="text-blue-600 text-xl" />,
      text: "Order placed by user@example.com",
      time: "2 hours ago",
    },
  ];

  const handleLogout = () => {
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white shadow p-4 rounded">
  <div>
    <h1 className="text-2xl font-bold text-orange-500"> pahana edu bookshop </h1>
    <p className="text-orange-600">Admin Dashboard</p>
  </div>

  {/* Profile Link */}
  <Link to="/admin/profile" className="flex items-center space-x-2 mt-4 md:mt-0 hover:text-orange-700">
    <FaUserCircle className="text-2xl text-gray-600" />
    <span className="text-orange-600 font-semibold">Admin</span>
  </Link>
</header>


      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded p-4 flex items-center space-x-4">
          <FaUsers className="text-3xl text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold">{stats.totalUsers}</h3>
            <p className="text-gray-600">Total Users</p>
          </div>
        </div>
        <div className="bg-white shadow rounded p-4 flex items-center space-x-4">
          <FaBook className="text-3xl text-green-600" />
          <div>
            <h3 className="text-xl font-semibold">{stats.totalBooks}</h3>
            <p className="text-gray-600">Books Available</p>
          </div>
        </div>
        <div className="bg-white shadow rounded p-4 flex items-center space-x-4">
          <FaChartBar className="text-3xl text-purple-600" />
          <div>
            <h3 className="text-xl font-semibold">{stats.totalOrders}</h3>
            <p className="text-gray-600">Total Orders</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, idx) => (
            <Link
              key={idx}
              to={action.to}
              className="bg-white p-6 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              {action.icon}
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      {/* <section>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white rounded shadow divide-y">
          {activities.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-start p-4 space-x-3 hover:bg-gray-50"
            >
              {activity.icon}
              <div>
                <p className="text-sm text-gray-800">{activity.text}</p>
                <small className="text-gray-500">{activity.time}</small>
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}


