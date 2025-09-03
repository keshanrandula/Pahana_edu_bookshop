// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminProfile = () => {
//   const navigate = useNavigate();
//   const [admin, setAdmin] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedAdmin, setUpdatedAdmin] = useState(null);

//   useEffect(() => {
//     const storedAdmin = JSON.parse(localStorage.getItem("admin"));
//     if (!storedAdmin) {
//       navigate("/admin/login"); // redirect if not logged in
//     } else {
//       setAdmin(storedAdmin);
//       setUpdatedAdmin(storedAdmin);
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     setUpdatedAdmin({ ...updatedAdmin, [e.target.name]: e.target.value });
//   };

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(
//         `http://localhost:8080/api/admin/${admin.id}`,
//         updatedAdmin
//       );
//       toast.success("Profile updated successfully!", {
//         position: "top-center",
//       });
//       setAdmin(res.data);
//       localStorage.setItem("admin", JSON.stringify(res.data));
//       setIsEditing(false);
//     } catch (error) {
//       toast.error("Error updating profile!", { position: "top-center" });
//       console.error(error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("admin");
//     toast.info("Logged out successfully!", { position: "top-center" });
//     navigate("/admin/profile");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100 p-6">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
//         <div className="flex justify-center mb-6">
//           <div className="relative">
//             <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
//               {admin?.username?.charAt(0).toUpperCase()}
//             </div>
//             <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
//           </div>
//         </div>

//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           {isEditing ? "Edit Profile" : "Admin Profile"}
//         </h2>

//         {!isEditing ? (
//           <div className="space-y-4 mb-6">
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">Username</p>
//               <p className="font-medium text-gray-800">{admin?.username}</p>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">Email</p>
//               <p className="font-medium text-gray-800">{admin?.email}</p>
//             </div>

//             <div className="flex space-x-3 mt-6">
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition duration-300 shadow-md"
//               >
//                 Edit Profile
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition duration-300 shadow-md"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         ) : (
//           <form onSubmit={handleUpdateProfile} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={updatedAdmin?.username || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={updatedAdmin?.email || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={updatedAdmin?.password || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
//                 required
//               />
//             </div>

//             <div className="flex space-x-3 pt-2">
//               <button
//                 type="submit"
//                 className="flex-1 bg-gradient-to-r from-green-500 to-lime-500 text-white py-2 rounded-lg hover:from-green-600 hover:to-lime-600 transition duration-300 shadow-md"
//               >
//                 Save Changes
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(false)}
//                 className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white py-2 rounded-lg hover:from-gray-500 hover:to-gray-600 transition duration-300 shadow-md"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;

/////////////


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminProfile = () => {
//   const [admin, setAdmin] = useState(null);

//   useEffect(() => {
//     const storedAdmin = JSON.parse(localStorage.getItem("user"));
//     if (storedAdmin) {
//       axios
//         .get(`http://localhost:8080/api/admin/profile?email=${storedAdmin.email}`)
//         .then((res) => setAdmin(res.data))
//         .catch((err) => console.error(err));
//     }
//   }, []);

//   if (!admin) {
//     return <p className="text-center mt-10 text-red-500">No admin profile found.</p>;
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Admin Profile</h2>
//         <p><strong>Username:</strong> {admin.username}</p>
//         <p><strong>Email:</strong> {admin.email}</p>
//         <button
//           onClick={() => {
//             localStorage.removeItem("user");
//             window.location.href = "/admin/login";
//           }}
//           className="mt-4 w-full bg-red-600 text-white py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;



////////////////////////


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminProfile = () => {
//   const navigate = useNavigate();
//   const [admin, setAdmin] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedAdmin, setUpdatedAdmin] = useState(null);

//   // Load admin from localStorage (after login)
//   useEffect(() => {
//     const storedAdmin = JSON.parse(localStorage.getItem("admin"));
//     if (!storedAdmin) {
//       navigate("/admin-login"); // Redirect if not logged in
//     } else {
//       setAdmin(storedAdmin);
//       setUpdatedAdmin(storedAdmin);
//     }
//   }, [navigate]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setUpdatedAdmin({ ...updatedAdmin, [e.target.name]: e.target.value });
//   };

//   // Handle profile update
//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(
//         "http://localhost:8080/api/admin/update",
//         updatedAdmin
//       );
//       toast.success("Profile updated successfully!", {
//         position: "top-center",
//         style: { backgroundColor: "orange", color: "white" },
//       });
//       setAdmin(updatedAdmin);
//       localStorage.setItem("admin", JSON.stringify(updatedAdmin));
//       setIsEditing(false);
//     } catch (error) {
//       toast.error("Error updating profile!", { position: "top-center" });
//       console.error(error);
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("admin");
//     toast.info("Logged out successfully!", { position: "top-center" });
//     navigate("/admin/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-orange-100">
//         <div className="flex justify-center mb-6">
//           <div className="relative">
//             <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
//               {admin?.username?.charAt(0).toUpperCase()}
//             </div>
//             <div className="absolute bottom-0 right-0 w-6 h-6 bg-orange-400 rounded-full border-2 border-white"></div>
//           </div>
//         </div>

//         <h2 className="text-3xl font-bold text-center text-orange-800 mb-6">
//           {isEditing ? "Edit Admin Profile" : "Admin Profile"}
//         </h2>

//         {!isEditing ? (
//           <div className="space-y-4 mb-6">
//             <div className="bg-orange-50 p-4 rounded-lg">
//               <p className="text-sm text-orange-600">Username</p>
//               <p className="font-medium text-gray-800">{admin?.username}</p>
//             </div>
//             <div className="bg-orange-50 p-4 rounded-lg">
//               <p className="text-sm text-orange-600">Email</p>
//               <p className="font-medium text-gray-800">{admin?.email}</p>
//             </div>
//             <div className="bg-orange-50 p-4 rounded-lg">
//               <p className="text-sm text-orange-600">Password</p>
//               <p className="font-medium text-gray-800">••••••••</p>
//             </div>

//             <div className="flex space-x-3 mt-6">
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md flex items-center justify-center"
//               >
//                 ✏️ Edit Profile
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex-1 bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500 transition duration-300 shadow-md flex items-center justify-center"
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           </div>
//         ) : (
//           <form onSubmit={handleUpdateProfile} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-orange-700 mb-1">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={updatedAdmin?.username || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-orange-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={updatedAdmin?.email || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-orange-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={updatedAdmin?.password || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
//                 required
//               />
//             </div>

//             <div className="flex space-x-3 pt-2">
//               <button
//                 type="submit"
//                 className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md flex items-center justify-center"
//               >
//                 ✅ Save Changes
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(false)}
//                 className="flex-1 bg-orange-300 text-white py-2 rounded-lg hover:bg-orange-400 transition duration-300 shadow-md flex items-center justify-center"
//               >
//                 ❌ Cancel
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;



////////////////////////


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAdmin, setUpdatedAdmin] = useState(null);

  // Load admin from localStorage (after login)
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (!storedAdmin) {
      navigate("/admin/login"); // Redirect if not logged in
    } else {
      setAdmin(storedAdmin);
      setUpdatedAdmin(storedAdmin);
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedAdmin({ ...updatedAdmin, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8080/api/admin/update", updatedAdmin);
      toast.success("Profile updated successfully!", { position: "top-center" });
      setAdmin(updatedAdmin);
      localStorage.setItem("admin", JSON.stringify(updatedAdmin));
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating profile!", { position: "top-center" });
      console.error(error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast.info("Logged out successfully!", { position: "top-center" });
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isEditing ? "Edit Admin Profile" : "Admin Profile"}
        </h2>

        {!isEditing ? (
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium text-gray-800">{admin?.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{admin?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Password</p>
              <p className="font-medium text-gray-800">••••••••</p>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={updatedAdmin?.username || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={updatedAdmin?.email || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={updatedAdmin?.password || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
