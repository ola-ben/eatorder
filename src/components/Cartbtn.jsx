import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Cartbtn() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [prevTotal, setPrevTotal] = useState(0);

  // Total count of items
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Track changes for animation
  useEffect(() => {
    setPrevTotal(totalCount);
  }, [totalCount]);

  // Calculate total price for tooltip
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  return (
    <div className="fixed right-4 z-50 bottom-8 md:bottom-10 lg:bottom-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative"
      >
        {/* Floating tooltip on hover */}
        <AnimatePresence>
          {isHovered && totalCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: -20 }}
              animate={{ opacity: 1, y: 0, x: -20 }}
              exit={{ opacity: 0, y: 10, x: -20 }}
              className="absolute bottom-full right-0 mb-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-gray-200 whitespace-nowrap"
            >
              <p className="text-xs text-gray-500">Total items: {totalCount}</p>
              <p className="text-sm font-bold text-red-600">
                {formatNaira(totalPrice)}
              </p>
              <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white/90 border-r border-b border-gray-200"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => navigate("/cartpage")}
          className="relative bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-opacity-90 group"
        >
          {/* Animated rings on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl bg-red-500"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  exit={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                  className="absolute inset-0 rounded-2xl bg-red-400"
                />
              </>
            )}
          </AnimatePresence>

          {/* Cart Icon */}
          <HiOutlineShoppingBag className="text-white text-3xl md:text-4xl relative z-10" />

          {/* Item Count Badge with Animation */}
          <AnimatePresence mode="wait">
            {totalCount > 0 && (
              <motion.div
                key={totalCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute -top-2 -right-2 z-20"
              >
                <motion.div
                  animate={
                    totalCount > prevTotal
                      ? {
                          scale: [1, 1.4, 1],
                          backgroundColor: ["#ef4444", "#22c55e", "#ef4444"],
                        }
                      : totalCount < prevTotal
                        ? {
                            scale: [1, 0.8, 1],
                            backgroundColor: ["#ef4444", "#f97316", "#ef4444"],
                          }
                        : {}
                  }
                  transition={{ duration: 0.5 }}
                  className="bg-red-500 text-white text-xs md:text-sm w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center font-bold shadow-lg"
                >
                  {totalCount}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse effect when cart has items */}
          {totalCount > 0 && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl bg-red-500 opacity-30"
            />
          )}
        </motion.button>

        {/* Mini cart preview (optional) - shows on long hover */}
        <AnimatePresence>
          {isHovered && totalCount > 0 && cart.length <= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-full right-0 mb-20 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 p-2 min-w-[200px]"
            >
              <p className="text-xs font-medium text-gray-500 mb-2 px-2">
                Recent items:
              </p>
              {cart.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg"
                >
                  <div className="w-6 h-6 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.photoName}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {item.quantity} x {formatNaira(item.price)}
                    </p>
                  </div>
                </div>
              ))}
              {cart.length > 3 && (
                <p className="text-[10px] text-gray-400 text-center mt-1">
                  +{cart.length - 3} more items
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
