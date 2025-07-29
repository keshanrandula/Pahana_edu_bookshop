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
  // Dummy stats – these can be fetched from backend later
  const stats = [
    { value: 10, label: 'Total Admins', icon: <FaUsers className="text-3xl text-blue-600" /> },
    { value: 120, label: 'Books Available', icon: <FaBook className="text-3xl text-green-600" /> },
    { value: '$5,700', label: 'Revenue', icon: <FaChartBar className="text-3xl text-purple-600" /> },
  ];

  const actions = [
    {
      to: '/AdminAdd',
      icon: <FaUsers className="text-3xl text-blue-600 mb-2" />,
      title: 'Add Admin',
      subtitle: 'Register a new admin',
    },
    {
      to: '/AddBook',
      icon: <FaPlusCircle className="text-3xl text-green-600 mb-2" />,
      title: 'Add Book',
      subtitle: 'Upload a new book with image',
    },
    {
      to: '/BookSearch',
      icon: <FaSearch className="text-3xl text-yellow-500 mb-2" />,
      title: 'Search Books',
      subtitle: 'Find books by title or author',
    },
    {
      to: '/AllBooks',
      icon: <FaBook className="text-3xl text-purple-600 mb-2" />,
      title: 'View All Books',
      subtitle: 'Edit or delete books',
    },
    {
      to: '/Reports',
      icon: <FaChartBar className="text-3xl text-pink-600 mb-2" />,
      title: 'Reports',
      subtitle: 'Usage and revenue reports',
    },
    {
      to: '/Settings',
      icon: <FaCog className="text-3xl text-gray-700 mb-2" />,
      title: 'Settings',
      subtitle: 'System preferences',
    },
  ];

  const activities = [
    {
      icon: '✓',
      color: 'text-green-600',
      text: 'Admin "john@example.com" registered',
      time: '5 minutes ago',
    },
    {
      icon: '!',
      color: 'text-yellow-500',
      text: 'Book update: "Spring Boot in Action"',
      time: '1 hour ago',
    },
    {
      icon: 'i',
      color: 'text-blue-600',
      text: 'User feedback from user@example.com',
      time: '2 hours ago',
    },
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
      <section>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white rounded shadow divide-y">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex items-start p-4 space-x-3 hover:bg-gray-50">
              <div className={`${activity.color} font-bold`}>{activity.icon}</div>
              <div>
                <p className="text-sm text-gray-800">{activity.text}</p>
                <small className="text-gray-500">{activity.time}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
