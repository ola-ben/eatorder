import { useNavigate } from "react-router-dom";
import { MdOutlinePersonAdd, MdLogout } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loginbtn() {
  const navigate = useNavigate();
  const { loggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = () => {
    console.log("Button clicked, loggedIn:", loggedIn);
    const currentStatus = localStorage.getItem("loggedIn") === "true";

    if (currentStatus) {
      navigate("/profile");
    } else {
      navigate("/logiformpage");
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[9999]" ref={dropdownRef}>
      {loggedIn ? (
        // Logged in state with dropdown
        <div className="relative">
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-opacity-90"
          >
            <HiUserCircle className="text-xl" />
            <span className="text-sm font-medium">Profile</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoChevronDown className="text-lg" />
            </motion.div>
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 overflow-hidden"
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2"
                  >
                    <HiUserCircle className="text-lg" />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/orders");
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2"
                  >
                    <span className="text-lg">📦</span>
                    My Orders
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <MdLogout className="text-lg" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Logged out state
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-opacity-90"
        >
          <MdOutlinePersonAdd className="text-xl" />
          <span className="text-sm font-medium">Login / Sign Up</span>
        </motion.button>
      )}
    </div>
  );
}
