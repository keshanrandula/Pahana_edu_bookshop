// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   FaUsers,
//   FaBook,
//   FaPlusCircle,
//   FaSearch,
//   FaChartBar,
//   FaCog,
//   FaBell,
//   FaUserCircle,
// } from 'react-icons/fa';

// export default function AdminDashboard() {
//   // Dummy stats – these can be fetched from backend later
//   const stats = [
//     { value: 10, label: 'Total Admins', icon: <FaUsers className="text-3xl text-blue-600" /> },
//     { value: 120, label: 'Books Available', icon: <FaBook className="text-3xl text-green-600" /> },
//     { value: '$5,700', label: 'Revenue', icon: <FaChartBar className="text-3xl text-purple-600" /> },
//   ];

//   const actions = [
//     {
//       to: '/AdminAdd',
//       icon: <FaUsers className="text-3xl text-blue-600 mb-2" />,
//       title: 'Add Admin',
//       subtitle: 'Register a new admin',
//     },
//     {
//       to: '/AddBook',
//       icon: <FaPlusCircle className="text-3xl text-green-600 mb-2" />,
//       title: 'Add Book',
//       subtitle: 'Upload a new book with image',
//     },
//     {
//       to: '/BookSearch',
//       icon: <FaSearch className="text-3xl text-yellow-500 mb-2" />,
//       title: 'Search Books',
//       subtitle: 'Find books by title or author',
//     },
//     {
//       to: '/AllBooks',
//       icon: <FaBook className="text-3xl text-purple-600 mb-2" />,
//       title: 'View All Books',
//       subtitle: 'Edit or delete books',
//     },
//     {
//       to: '/Reports',
//       icon: <FaChartBar className="text-3xl text-pink-600 mb-2" />,
//       title: 'Reports',
//       subtitle: 'Usage and revenue reports',
//     },
//     {
//       to: '/Settings',
//       icon: <FaCog className="text-3xl text-gray-700 mb-2" />,
//       title: 'Settings',
//       subtitle: 'System preferences',
//     },
//   ];

//   const activities = [
//     {
//       icon: '✓',
//       color: 'text-green-600',
//       text: 'Admin "john@example.com" registered',
//       time: '5 minutes ago',
//     },
//     {
//       icon: '!',
//       color: 'text-yellow-500',
//       text: 'Book update: "Spring Boot in Action"',
//       time: '1 hour ago',
//     },
//     {
//       icon: 'i',
//       color: 'text-blue-600',
//       text: 'User feedback from user@example.com',
//       time: '2 hours ago',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header */}
//       <header className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white shadow p-4 rounded">
//         <div>
//           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//           <p className="text-gray-600">Welcome back, Admin!</p>
//         </div>
//         <div className="flex items-center space-x-4 mt-4 md:mt-0">
//           <button className="relative">
//             <FaBell className="text-xl text-gray-600" />
//             <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1">3</span>
//           </button>
//           <div className="flex items-center space-x-2">
//             <FaUserCircle className="text-2xl text-gray-600" />
//             <span className="text-gray-800 font-semibold">Admin</span>
//           </div>
//         </div>
//       </header>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {stats.map((stat, idx) => (
//           <div key={idx} className="bg-white shadow rounded p-4 flex items-center space-x-4">
//             <div>{stat.icon}</div>
//             <div>
//               <h3 className="text-xl font-semibold">{stat.value}</h3>
//               <p className="text-gray-600">{stat.label}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quick Actions */}
//       <section className="mb-10">
//         <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {actions.map((action, idx) => (
//             <Link
//               key={idx}
//               to={action.to}
//               className="bg-white p-6 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center"
//             >
//               {action.icon}
//               <h3 className="font-semibold mb-1">{action.title}</h3>
//               <p className="text-sm text-gray-600">{action.subtitle}</p>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Recent Activity */}
//       <section>
//         <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
//         <div className="bg-white rounded shadow divide-y">
//           {activities.map((activity, idx) => (
//             <div key={idx} className="flex items-start p-4 space-x-3 hover:bg-gray-50">
//               <div className={`${activity.color} font-bold`}>{activity.icon}</div>
//               <div>
//                 <p className="text-sm text-gray-800">{activity.text}</p>
//                 <small className="text-gray-500">{activity.time}</small>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

////////////

// import React, { useEffect, useState } from 'react';

// const AdminDashboard = () => {
//   const [usersCount, setUsersCount] = useState(0);
//   const [booksCount, setBooksCount] = useState(0);
//   const [ordersCount, setOrdersCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const [usersRes, booksRes, ordersRes] = await Promise.all([
//           fetch("http://localhost:8080/api/auth/all"),
//           fetch("http://localhost:8080/api/books"),
//           fetch("http://localhost:8080/api/orders")
//         ]);

//         const usersData = await usersRes.json();
//         const booksData = await booksRes.json();
//         const ordersData = await ordersRes.json();

//         setUsersCount(usersData.length);
//         setBooksCount(Array.isArray(booksData) ? booksData.length : Object.keys(booksData).length);
//         setOrdersCount(Array.isArray(ordersData) ? ordersData.length : Object.keys(ordersData).length);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-600 text-xl">Loading Dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
//           <h2 className="text-xl font-semibold text-gray-700">👥 Users</h2>
//           <p className="text-3xl text-indigo-600 mt-2 font-bold">{usersCount}</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
//           <h2 className="text-xl font-semibold text-gray-700">📚 Books</h2>
//           <p className="text-3xl text-green-600 mt-2 font-bold">{booksCount}</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
//           <h2 className="text-xl font-semibold text-gray-700">🛒 Orders</h2>
//           <p className="text-3xl text-yellow-600 mt-2 font-bold">{ordersCount}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
//         <a href="/books" className="bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-lg transition">Manage Books</a>
//         <a href="/orders" className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-5 rounded-lg transition">View Orders</a>
//         <a href="/users" className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-5 rounded-lg transition">View Users</a>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



/////


import React, { useEffect, useState } from 'react';
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
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, bookRes, orderRes] = await Promise.all([
          fetch('http://localhost:8080/api/auth/all'),
          fetch('http://localhost:8080/api/books'),
          fetch('http://localhost:8080/api/orders'),
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
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const actions = [
    {
      to: '/admin/userdetails',
      icon: <FaUsers className="text-3xl text-blue-600 mb-2" />,
      title: 'view users',
      subtitle: 'userdetails',
    },
    {
      to: '/admin/bookadd',
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
      to: '/admin/bookview',
      icon: <FaBook className="text-3xl text-purple-600 mb-2" />,
      title: 'View All Books',
      subtitle: 'Edit or delete books',
    },
    {
      to: '/admin/orders',
      icon: <FaChartBar className="text-3xl text-pink-600 mb-2" />,
      title: 'ordersview',
      subtitle: 'order view',
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
      text: 'New user "john@example.com" registered',
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
      text: 'Order placed by user@example.com',
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
            <div key={idx} className="flex items-start p-4 space-x-3 hover:bg-gray-50">
              <div className={`${activity.color} font-bold text-xl`}>{activity.icon}</div>
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

