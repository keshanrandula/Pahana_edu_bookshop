import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaBook,
  FaPlusCircle,
  FaSearch,
  FaChartBar,
  FaCog,
  FaBell,
  FaUserCircle,
} from 'react-icons/fa';

export default function AdminDashboard() {
  const stats = [
    { value: 10, label: 'Total Admins', icon: <FaUsers className="text-3xl text-blue-600" /> },
    { value: 120, label: 'Books Available', icon: <FaBook className="text-3xl text-green-600" /> },
    { value: '$5,700', label: 'Revenue', icon: <FaChartBar className="text-3xl text-purple-600" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white shadow p-4 rounded">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin!</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button className="relative">
            <FaBell className="text-xl text-gray-600" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1">3</span>
          </button>
          <div className="flex items-center space-x-2">
            <FaUserCircle className="text-2xl text-gray-600" />
            <span className="text-gray-800 font-semibold">Admin</span>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white shadow rounded p-4 flex items-center space-x-4">
            <div>{stat.icon}</div>
            <div>
              <h3 className="text-xl font-semibold">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/AdminAdd" className="bg-white p-6 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <FaUsers className="text-3xl text-blue-600 mb-2" />
            <h3 className="font-semibold mb-1">Add Admin</h3>
            <p className="text-sm text-gray-600">Register a new admin</p>
          </Link>
          <Link to="/AddBook" className="bg-white p-6 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <FaPlusCircle className="text-3xl text-green-600 mb-2" />
            <h3 className="font-semibold mb-1">Add Book</h3>
            <p className="text-sm text-gray-600">Upload a new book with image</p>
          </Link>
          <Link to="/BookSearch" className="bg-white p-6 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <FaSearch className="text-3xl text-yellow-500 mb-2" />
            <h3 className="font-semibold mb-1">Search Books</h3>
            <p className="text-sm text-gray-600">Find books by title or author</p>
          </Link>
          <Link to="/AllBooks" className="bg-white p-6 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <FaBook className="text-3xl text-purple-600 mb-2" />
            <h3 className="font-semibold mb-1">View All Books</h3>
            <p className="text-sm text-gray-600">Edit or delete books</p>
          </Link>
          <Link to="/Reports" className="bg-white p-6 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <FaChartBar className="text-3xl text-pink-600 mb-2" />
            <h3 className="font-semibold mb-1">Reports</h3>
            <p className="text-sm text-gray-600">Download usage and revenue reports</p>
          </Link>
          <Link to="/Settings" className="bg-white p-6 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <FaCog className="text-3xl text-gray-700 mb-2" />
            <h3 className="font-semibold mb-1">Settings</h3>
            <p className="text-sm text-gray-600">Configure system preferences</p>
          </Link>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white rounded shadow divide-y">
          <div className="flex items-start p-4 space-x-3 hover:bg-gray-50">
            <div className="text-green-600 font-bold">✓</div>
            <div>
              <p className="text-sm text-gray-800">Admin "john@example.com" registered</p>
              <small className="text-gray-500">5 minutes ago</small>
            </div>
          </div>
          <div className="flex items-start p-4 space-x-3 hover:bg-gray-50">
            <div className="text-yellow-500 font-bold">!</div>
            <div>
              <p className="text-sm text-gray-800">Book update: "Spring Boot in Action"</p>
              <small className="text-gray-500">1 hour ago</small>
            </div>
          </div>
          <div className="flex items-start p-4 space-x-3 hover:bg-gray-50">
            <div className="text-blue-600 font-bold">i</div>
            <div>
              <p className="text-sm text-gray-800">User feedback received from user@example.com</p>
              <small className="text-gray-500">2 hours ago</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
