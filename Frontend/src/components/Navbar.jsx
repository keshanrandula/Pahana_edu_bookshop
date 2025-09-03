// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { 
//   FaShoppingCart, 
//   FaAngleDown, 
//   FaUser, 
//   FaSignOutAlt, 
//   FaBars,
//   FaTimes,
//   FaHome,
//   FaBook,
//   FaInfoCircle,
//   FaEnvelope
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [isCatDropdownOpen, setCatDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const capitalize = (str) => {
//     if (!str) return "";
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   // Animation variants
//   const mobileMenuVariants = {
//     hidden: { x: "100%" },
//     visible: { x: 0 },
//     exit: { x: "100%" }
//   };

//   return (
//     <>
//       <nav className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg py-3 px-6 flex justify-between items-center sticky top-0 z-50">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-white hover:text-orange-200 transition-colors duration-300">
//           <span className="font-extrabold">Pahana</span> 
//           <span className="font-light"> Bookshop</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-8 items-center">
//           <Link to="/" className="text-white hover:text-orange-200 transition-colors duration-300 font-medium">
//             Home
//           </Link>
//           <Link to="/bookshop" className="text-white hover:text-orange-200 transition-colors duration-300 font-medium">
//             Shop
//           </Link>

//           {/* Categories Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setCatDropdownOpen(!isCatDropdownOpen)}
//               className="flex items-center space-x-1 text-white hover:text-orange-200 transition-colors duration-300 font-medium"
//             >
//               <span>Categories</span>
//               <motion.span
//                 animate={{ rotate: isCatDropdownOpen ? 180 : 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <FaAngleDown className="mt-1" />
//               </motion.span>
//             </button>
//             <AnimatePresence>
//               {isCatDropdownOpen && (
//                 <motion.div
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   variants={dropdownVariants}
//                   transition={{ duration: 0.2 }}
//                   className="absolute bg-white text-gray-800 rounded-lg shadow-xl mt-2 w-48 z-50 overflow-hidden"
//                 >
//                   <Link 
//                     to="/categories/fiction" 
//                     className="block px-4 py-3 hover:bg-orange-50 transition-colors duration-200 border-b border-gray-100"
//                   >
//                     Fiction
//                   </Link>
//                   <Link 
//                     to="/categories/non-fiction" 
//                     className="block px-4 py-3 hover:bg-orange-50 transition-colors duration-200 border-b border-gray-100"
//                   >
//                     Non-Fiction
//                   </Link>
//                   <Link 
//                     to="/categories/children" 
//                     className="block px-4 py-3 hover:bg-orange-50 transition-colors duration-200 border-b border-gray-100"
//                   >
//                     Children
//                   </Link>
//                   <Link 
//                     to="/categories/education" 
//                     className="block px-4 py-3 hover:bg-orange-50 transition-colors duration-200 border-b border-gray-100"
//                   >
//                     Education
//                   </Link>
//                   <Link 
//                     to="/categories/sci-fi" 
//                     className="block px-4 py-3 hover:bg-orange-50 transition-colors duration-200"
//                   >
//                     Sci-Fi
//                   </Link>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           <Link to="/about" className="text-white hover:text-orange-200 transition-colors duration-300 font-medium">
//             About
//           </Link>
//           <Link to="/contact" className="text-white hover:text-orange-200 transition-colors duration-300 font-medium">
//             Contact
//           </Link>
//         </div>

//         {/* Right Side: Cart + Profile */}
//         <div className="flex items-center space-x-6">
//           <Link to="/cart" className="text-white hover:text-orange-200 text-xl relative transition-colors duration-300">
//             <FaShoppingCart />
//             <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//               0
//             </span>
//           </Link>

//           {user ? (
//             <div className="hidden md:block relative">
//               <button 
//                 onClick={() => setDropdownOpen(!isDropdownOpen)}
//                 className="flex items-center space-x-2 focus:outline-none"
//               >
//                 <div className="w-9 h-9 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold shadow-md hover:shadow-lg transition-shadow duration-300">
//                   {user.username?.charAt(0).toUpperCase()}
//                 </div>
//                 <span className="hidden sm:inline-block font-medium text-white">
//                   {capitalize(user.username)}
//                 </span>
//               </button>

//               {/* Profile Dropdown */}
//               <AnimatePresence>
//                 {isDropdownOpen && (
//                   <motion.div
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     variants={dropdownVariants}
//                     transition={{ duration: 0.2 }}
//                     className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden"
//                     onClick={() => setDropdownOpen(false)}
//                   >
//                     <Link
//                       to="/userprofile"
//                       className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 transition-colors duration-200"
//                     >
//                       <FaUser className="mr-2 text-orange-600" />
//                       Profile
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 border-t border-gray-100"
//                     >
//                       <FaSignOutAlt className="mr-2" />
//                       Logout
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ) : (
//             <div className="hidden md:flex items-center space-x-4">
//               <Link
//                 to="/login"
//                 className="text-white hover:text-orange-200 transition-colors duration-300 font-medium"
//               >
//                 Login
//               </Link>
//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Link
//                   to="/register"
//                   className="bg-white text-orange-600 px-5 py-2 rounded-full font-medium hover:bg-orange-50 transition-colors duration-300 shadow-md"
//                 >
//                   Register
//                 </Link>
//               </motion.div>
//             </div>
//           )}

//           {/* Mobile Menu Button */}
//           <button 
//             onClick={toggleMobileMenu}
//             className="md:hidden text-white text-2xl focus:outline-none"
//           >
//             {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={mobileMenuVariants}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-40 overflow-y-auto"
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-8">
//                 <Link 
//                   to="/" 
//                   onClick={closeMobileMenu}
//                   className="text-2xl font-bold text-orange-600"
//                 >
//                   Pahana Bookshop
//                 </Link>
//                 <button 
//                   onClick={closeMobileMenu}
//                   className="text-gray-500 text-xl"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <Link
//                   to="/"
//                   onClick={closeMobileMenu}
//                   className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
//                 >
//                   <FaHome className="mr-3 text-orange-600" />
//                   Home
//                 </Link>

//                 <Link
//                   to="/bookshop"
//                   onClick={closeMobileMenu}
//                   className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
//                 >
//                   <FaBook className="mr-3 text-orange-600" />
//                   Shop
//                 </Link>

//                 <div className="px-4 py-3">
//                   <button
//                     onClick={() => setCatDropdownOpen(!isCatDropdownOpen)}
//                     className="flex items-center w-full text-gray-700"
//                   >
//                     <FaAngleDown className={`mr-3 transition-transform duration-200 ${isCatDropdownOpen ? 'rotate-180' : ''}`} />
//                     Categories
//                   </button>
//                   {isCatDropdownOpen && (
//                     <div className="mt-2 ml-8 space-y-2">
//                       <Link
//                         to="/categories/fiction"
//                         onClick={closeMobileMenu}
//                         className="block px-3 py-2 text-gray-600 hover:bg-orange-50 rounded transition-colors duration-200"
//                       >
//                         Fiction
//                       </Link>
//                       <Link
//                         to="/categories/non-fiction"
//                         onClick={closeMobileMenu}
//                         className="block px-3 py-2 text-gray-600 hover:bg-orange-50 rounded transition-colors duration-200"
//                       >
//                         Non-Fiction
//                       </Link>
//                       <Link
//                         to="/categories/children"
//                         onClick={closeMobileMenu}
//                         className="block px-3 py-2 text-gray-600 hover:bg-orange-50 rounded transition-colors duration-200"
//                       >
//                         Children
//                       </Link>
//                       <Link
//                         to="/categories/education"
//                         onClick={closeMobileMenu}
//                         className="block px-3 py-2 text-gray-600 hover:bg-orange-50 rounded transition-colors duration-200"
//                       >
//                         Education
//                       </Link>
//                       <Link
//                         to="/categories/sci-fi"
//                         onClick={closeMobileMenu}
//                         className="block px-3 py-2 text-gray-600 hover:bg-orange-50 rounded transition-colors duration-200"
//                       >
//                         Sci-Fi
//                       </Link>
//                     </div>
//                   )}
//                 </div>

//                 <Link
//                   to="/about"
//                   onClick={closeMobileMenu}
//                   className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
//                 >
//                   <FaInfoCircle className="mr-3 text-orange-600" />
//                   About
//                 </Link>

//                 <Link
//                   to="/contact"
//                   onClick={closeMobileMenu}
//                   className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
//                 >
//                   <FaEnvelope className="mr-3 text-orange-600" />
//                   Contact
//                 </Link>

//                 {user ? (
//                   <>
//                     <Link
//                       to="/userprofile"
//                       onClick={closeMobileMenu}
//                       className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
//                     >
//                       <FaUser className="mr-3 text-orange-600" />
//                       Profile
//                     </Link>
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         closeMobileMenu();
//                       }}
//                       className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
//                     >
//                       <FaSignOutAlt className="mr-3" />
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <div className="pt-4 space-y-3">
//                     <Link
//                       to="/login"
//                       onClick={closeMobileMenu}
//                       className="block w-full text-center bg-orange-600 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-700 transition-colors duration-300"
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       to="/register"
//                       onClick={closeMobileMenu}
//                       className="block w-full text-center border border-orange-600 text-orange-600 px-5 py-2 rounded-full font-medium hover:bg-orange-50 transition-colors duration-300"
//                     >
//                       Register
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Overlay */}
//       {isMobileMenuOpen && (
//         <div 
//           onClick={closeMobileMenu}
//           className="fixed inset-0 bg-black bg-opacity-50 z-30"
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;


//////////////////////////


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaShoppingCart, 
  FaUser, 
  FaSignOutAlt, 
  FaBars,
  FaTimes,
  FaHome,
  FaBook,
  FaEnvelope
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg py-3 px-6 flex justify-between items-center sticky top-0 z-50">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white hover:text-orange-200 transition-colors duration-300">
          <span className="font-extrabold">Pahana Edu</span> 
          <span className="font-light"> Bookshop</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-white hover:text-orange-200 transition-colors duration-300 font-medium">
            Home
          </Link>
          <Link to="/bookshop" className="text-white hover:text-orange-200 transition-colors duration-300 font-medium">
            Shop
          </Link>
          <Link to="/contact" className="text-white hover:text-orange-200 transition-colors duration-300 font-medium">
            Contact Us
          </Link>

          {/* new add help */}
            <Link to="/help" className="text-white hover:text-orange-200 transition-colors duration-300 font-medium">
             Help
          </Link>

         {/* new add help */}
            <Link to="/userfeedback" className="text-white hover:text-orange-200 transition-colors duration-300 font-medium">
              Feedback
          </Link>

          <Link to="/myorders" className="text-white hover:text-orange-200 transition-colors duration-300 font-medium">
              MyOrders
          </Link>

        </div>

        

        {/* Right Side: Cart + Profile */}
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="relative text-white hover:text-orange-200 text-xl transition-colors duration-300">
            <FaShoppingCart />
            {/* <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
             
            </span> */}
          </Link>

          {user ? (
            <div className="hidden md:block relative">
              <button 
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold shadow-md hover:shadow-lg transition-shadow duration-300">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline-block font-medium text-white">
                  {capitalize(user.username)}
                </span>
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Link
                      to="/userprofile"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 transition-colors duration-200"
                    >
                      <FaUser className="mr-2 text-orange-600" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 border-t border-gray-100"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-orange-200 transition-colors duration-300 font-medium"
              >
                Login
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="bg-white text-orange-600 px-5 py-2 rounded-full font-medium hover:bg-orange-50 transition-colors duration-300 shadow-md"
                >
                  Register
                </Link>
              </motion.div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-white text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div 
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <Link 
                    to="/" 
                    onClick={closeMobileMenu}
                    className="text-2xl font-bold text-orange-600"
                  >
                    Pahana Bookshop
                  </Link>
                  <button 
                    onClick={closeMobileMenu}
                    className="text-gray-500 text-xl"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="space-y-4">
                  <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                  >
                    <FaHome className="mr-3 text-orange-600" />
                    Home
                  </Link>

                  <Link
                    to="/bookshop"
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                  >
                    <FaBook className="mr-3 text-orange-600" />
                    Shop
                  </Link>
                  {/* new add help sections */}
                  
                  <Link
                    to="/help"
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                  >
                    <FaEnvelope className="mr-3 text-orange-600" />
                    Help
                  </Link>



                  <Link
                    to="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                  >
                    <FaEnvelope className="mr-3 text-orange-600" />
                    Contact Us
                  </Link>

                  
                  <Link
                    to="/userfeedback"
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                  >
                    <FaEnvelope className="mr-3 text-orange-600" />
                     Feedback
                  </Link>


                   
                  <Link
                    to="/myorders"
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                  >
                    <FaEnvelope className="mr-3 text-orange-600" />
                     MyOrders
                  </Link>



                  {user ? (
                    <>
                      <Link
                        to="/userprofile"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                      >
                        <FaUser className="mr-3 text-orange-600" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          closeMobileMenu();
                        }}
                        className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <FaSignOutAlt className="mr-3" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="pt-4 space-y-3">
                      <Link
                        to="/login"
                        onClick={closeMobileMenu}
                        className="block w-full text-center bg-orange-600 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-700 transition-colors duration-300"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={closeMobileMenu}
                        className="block w-full text-center border border-orange-600 text-orange-600 px-5 py-2 rounded-full font-medium hover:bg-orange-50 transition-colors duration-300"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;