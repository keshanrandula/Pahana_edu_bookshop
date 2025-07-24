import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

import AdminRegister from './pages/Admin/AdminRegister';  
import AdminLogin from './pages/Admin/AdminLogin';
import BookAdd from './pages/Admin/BookAdd'; 
import AdminBookView from './pages/Admin/AdminBookView'; 
import UpdateBook from './pages/Admin/UpdateBook'; // Assuming you have this component
import AdminProfile from './pages/Admin/AdminProfile'; // Assuming you have this component
import AdminDashboard from './pages/Admin/UserDetails'; // Assuming you have this component
import UserDetails from './pages/Admin/UserDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />




      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/bookadd" element={<BookAdd />} />
      <Route path="/admin/bookview" element={<AdminBookView />} />
      <Route path="/admin/update/:id" element={<UpdateBook />} /> 
      <Route path="/admin/profile" element={<AdminProfile />} /> {/* Assuming you have this component */}
      <Route path="/admin/userdetails" element={<UserDetails/>} /> {/* Assuming you have this component */}
      
      {/* Add more routes as needed */}
      
      
      
      
      
    </Routes>
  );
}

export default App;
