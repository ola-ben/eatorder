import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiArrowSmallLeft,
  HiShoppingBag,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineShoppingBag,
  HiOutlineCreditCard,
  HiOutlineTruck,
  HiOutlineCheckCircle,
  HiOutlineXMark,
} from "react-icons/hi2";
import { FaNairaSign } from "react-icons/fa6";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function Cartpage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  const handleRemoveItem = (itemName) => {
    removeFromCart(itemName);
    toast.success(
      <div className="flex items-center gap-2">
        <HiOutlineTrash className="text-red-500 text-xl" />
        <div>
          <p className="font-semibold">Item Removed</p>
          <p className="text-sm">Item has been removed from your cart</p>
        </div>
      </div>,
      {
        icon: "🗑️",
        duration: 3000,
        style: {
          background: "#FEE2E2",
          color: "#991B1B",
          border: "1px solid #EF4444",
          borderRadius: "12px",
        },
      },
    );
  };

  const handleQuantityUpdate = (item, action) => {
    if (action === "increase") {
      addToCart(item);
      toast.success("Quantity increased", {
        icon: "➕",
        duration: 2000,
        style: {
          background: "#DCFCE7",
          color: "#166534",
          border: "1px solid #22C55E",
          borderRadius: "12px",
        },
      });
    } else {
      if (item.quantity === 1) {
        handleRemoveItem(item.name);
      } else {
        removeFromCart(item.name);
        toast.success("Quantity decreased", {
          icon: "➖",
          duration: 2000,
          style: {
            background: "#FEF9C3",
            color: "#854D0E",
            border: "1px solid #EAB308",
            borderRadius: "12px",
          },
        });
      }
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast.success(
      <div className="flex items-center gap-2">
        <HiOutlineXMark className="text-red-500 text-xl" />
        <div>
          <p className="font-semibold">Cart Cleared</p>
          <p className="text-sm">All items have been removed</p>
        </div>
      </div>,
      {
        icon: "🧹",
        duration: 3000,
        style: {
          background: "#FEE2E2",
          color: "#991B1B",
          border: "1px solid #EF4444",
          borderRadius: "12px",
        },
      },
    );
  };

  const handleProceedToCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      navigate("/checkoutpage", { state: { cart, totalPrice } });
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-montserrat">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl">
        {/* Header with Gradient */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-red-500 to-red-600 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/")}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <HiArrowSmallLeft className="text-xl" />
              </motion.button>
              <h1 className="text-xl font-bold">My Cart</h1>
            </div>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="bg-white/20 p-2 rounded-full backdrop-blur-sm relative"
            >
              <HiShoppingBag className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </motion.div>
          </div>

          {/* Cart Stats */}
          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-2 mt-4"
            >
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-center">
                <p className="text-2xl font-bold">{totalItems}</p>
                <p className="text-xs opacity-90">Total Items</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-center">
                <p className="text-2xl font-bold">{cart.length}</p>
                <p className="text-xs opacity-90">Products</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 pb-8">
          {cart.length === 0 ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <HiOutlineShoppingBag className="text-8xl text-gray-300 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any items to your cart yet
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Start Shopping
              </motion.button>
            </motion.div>
          ) : (
            <>
              {/* Clear Cart Button */}
              <div className="flex justify-end mb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearCart}
                  className="text-red-500 text-sm flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors"
                >
                  <HiOutlineTrash />
                  Clear Cart
                </motion.button>
              </div>

              {/* Cart Items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {cart.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    layout
                    onHoverStart={() => setHoveredItem(item.name)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image with Quantity Badge */}
                        <div className="relative">
                          <img
                            src={item.photoName}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl"
                            onError={(e) => {
                              e.target.src =
                                "/images/pizzaimages/placeholder.jpg";
                            }}
                          />
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg"
                          >
                            {item.quantity}
                          </motion.span>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {formatNaira(item.price)} each
                              </p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemoveItem(item.name)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <HiOutlineXMark className="text-xl" />
                            </motion.button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  handleQuantityUpdate(item, "decrease")
                                }
                                className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-xl transition-colors"
                              >
                                <HiOutlineMinus className="text-sm" />
                              </motion.button>

                              <motion.span
                                key={item.quantity}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="font-semibold w-8 text-center"
                              >
                                {item.quantity}
                              </motion.span>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  handleQuantityUpdate(item, "increase")
                                }
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition-colors"
                              >
                                <HiOutlinePlus className="text-sm" />
                              </motion.button>
                            </div>

                            {/* Item Total */}
                            <motion.p
                              key={item.quantity}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="font-bold text-red-600"
                            >
                              {formatNaira(item.price * item.quantity)}
                            </motion.p>
                          </div>
                        </div>
                      </div>

                      {/* Animated Progress Bar (for visual appeal) */}
                      <AnimatePresence>
                        {hoveredItem === item.name && (
                          <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "100%", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-3"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Order Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-lg"
              >
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>{formatNaira(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>{formatNaira(0)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total</span>
                      <motion.span
                        key={totalPrice}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-red-600"
                      >
                        {formatNaira(totalPrice)}
                      </motion.span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Including all taxes and fees
                    </p>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToCheckout}
                  disabled={isCheckingOut}
                  className="w-full mt-5 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <HiOutlineCreditCard className="text-xl" />
                      <span>Proceed to Checkout</span>
                    </>
                  )}
                </motion.button>

                {/* Secure Checkout Notice */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500"
                >
                  <HiOutlineCheckCircle className="text-green-500" />
                  <span>Secure Checkout</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <HiOutlineTruck className="text-red-500" />
                  <span>Free Delivery</span>
                </motion.div>
              </motion.div>

              {/* Continue Shopping Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mt-6"
              >
                <button
                  onClick={() => navigate("/")}
                  className="text-red-500 font-medium flex items-center gap-1 mx-auto hover:gap-2 transition-all"
                >
                  <HiArrowSmallLeft className="text-lg" />
                  Continue Shopping
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
