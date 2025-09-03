import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import BookDetails from './pages/BookDetails';
import BookHome from './pages/BookHome'; 


import AdminRegister from './pages/Admin/AdminRegister';  
import AdminLogin from './pages/Admin/AdminLogin';
import BookAdd from './pages/Admin/BookAdd'; 
import AdminBookView from './pages/Admin/AdminBookView'; 
import UpdateBook from './pages/Admin/UpdateBook'; 
import AdminProfile from './pages/Admin/AdminProfile';
import UserDetails from './pages/Admin/UserDetails'; 
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';   
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/Admin/AdminDashboard';
import BookShop from './pages/BookShop'; 
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminOrderView from './pages/Admin/OrderView'; 
import MyOrders from './pages/MyOrders';
import Help from './pages/Help'; 
import UserFeedback from './pages/UserFeedback'; 
import AdminFeedback from './pages/Admin/AdminFeedback'; 





function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> 
      <Route path="/userprofile" element={<UserProfile />} /> 
        {/* <Route path="/profile/:userId" element={<UserProfile />} /> */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
      <Route path="/bookshop" element={<BookShop />} /> 
      <Route path="/cart" element={<Cart />} /> 
      {/* Admin routes */}
      <Route path="/checkout" element={<Checkout />} /> 
      <Route path="/myorders" element={<MyOrders />} /> 
      <Route path="/help" element={<Help />} />
      <Route path="/bookhome" element={<BookHome />} /> 
      <Route path="/userfeedback" element={<UserFeedback />} /> 


      
      {/* User routes */}

      
      {/* Admin routes */}
      





      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/bookadd" element={<BookAdd />} />
      <Route path="/admin/bookview" element={<AdminBookView />} />
      <Route path="/admin/update/:id" element={<UpdateBook />} /> 
      <Route path="/admin/profile" element={<AdminProfile />} /> 
      <Route path="/admin/userdetails" element={<UserDetails/>} /> 
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/admin/orders" element={<AdminOrderView />} /> 
      <Route path="/admin/feedback" element={<AdminFeedback />} /> 

    



    
      
      
      
      
      
    </Routes>
  );
}

export default App;
