import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import BookDetails from './pages/BookDetails'; // Assuming you have this component


import AdminRegister from './pages/Admin/AdminRegister';  
import AdminLogin from './pages/Admin/AdminLogin';
import BookAdd from './pages/Admin/BookAdd'; 
import AdminBookView from './pages/Admin/AdminBookView'; 
import UpdateBook from './pages/Admin/UpdateBook'; // Assuming you have this component
import AdminProfile from './pages/Admin/AdminProfile'; // Assuming you have this component
import UserDetails from './pages/Admin/UserDetails'; // Assuming you have this component
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact'; // Assuming you have this component  
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/Admin/AdminDashboard';
import BookShop from './pages/BookShop'; // Assuming you have this component
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminOrderView from './pages/Admin/OrderView'; // Assuming you have this component



function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> 
      <Route path="/userprofile" element={<UserProfile />} /> 
        {/* <Route path="/profile/:userId" element={<UserProfile />} /> */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* Assuming you have this component */}
      <Route path="/bookshop" element={<BookShop />} /> {/* Assuming you have this component */}
      <Route path="/cart" element={<Cart />} /> {/* Assuming you have this component */}
      {/* Admin routes */}
      <Route path="/checkout" element={<Checkout />} /> {/* Assuming you have this component */}
      
      {/* Admin routes */}
      





      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/bookadd" element={<BookAdd />} />
      <Route path="/admin/bookview" element={<AdminBookView />} />
      <Route path="/admin/update/:id" element={<UpdateBook />} /> 
      <Route path="/admin/profile" element={<AdminProfile />} /> {/* Assuming you have this component */}
      <Route path="/admin/userdetails" element={<UserDetails/>} /> {/* Assuming you have this component */}
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/admin/orders" element={<AdminOrderView />} /> {/* Assuming you have this component */}



      {/* Add more routes as needed */}
      
      
      
      
      
    </Routes>
  );
}

export default App;
