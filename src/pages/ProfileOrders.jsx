import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiPlus,
  HiShoppingBag,
  HiOutlineClock,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
} from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaNairaSign, FaRegStar, FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function ProfileOrders() {
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [hoveredOrder, setHoveredOrder] = useState(null);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    // Sort by date (most recent first) and show only the 3 most recent
    const sortedOrders = savedOrders.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    setRecentOrders(sortedOrders.slice(0, 3));
  }, []);

  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return {
          bg: "bg-green-100",
          text: "text-green-600",
          border: "border-green-200",
          icon: "✅",
          gradient: "from-green-500 to-green-600",
        };
      case "Processing":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-600",
          border: "border-yellow-200",
          icon: "⚙️",
          gradient: "from-yellow-500 to-amber-500",
        };
      case "Pending":
        return {
          bg: "bg-orange-100",
          text: "text-orange-600",
          border: "border-orange-200",
          icon: "⏳",
          gradient: "from-orange-500 to-red-500",
        };
      default:
        return {
          bg: "bg-blue-100",
          text: "text-blue-600",
          border: "border-blue-200",
          icon: "📦",
          gradient: "from-blue-500 to-blue-600",
        };
    }
  };

  const handleAddOrder = () => {
    navigate("/");
  };

  const handleViewAllOrders = () => {
    navigate("/orders");
  };

  const toggleOrderExpansion = (orderId, e) => {
    e.stopPropagation();
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleReorder = (order, e) => {
    e.stopPropagation();
    toast.success(
      <div className="flex items-center gap-2">
        <HiShoppingBag className="text-xl" />
        <div>
          <p className="font-semibold">Reorder in Progress</p>
          <p className="text-sm">Adding items to your cart...</p>
        </div>
      </div>,
      {
        icon: "🛒",
        duration: 3000,
        style: {
          background: "#FEF3C7",
          color: "#92400E",
          border: "1px solid #F59E0B",
          borderRadius: "12px",
        },
      },
    );
  };

  const handleRateOrder = (orderId, e) => {
    e.stopPropagation();
    toast.success(
      <div className="flex items-center gap-2">
        <FaStar className="text-yellow-500 text-xl" />
        <div>
          <p className="font-semibold">Rate Your Experience</p>
          <p className="text-sm">Rating feature coming soon!</p>
        </div>
      </div>,
      {
        icon: "⭐",
        duration: 3000,
        style: {
          background: "#FEF3C7",
          color: "#92400E",
          border: "1px solid #F59E0B",
          borderRadius: "12px",
        },
      },
    );
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

  if (recentOrders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 pb-8 text-center"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <HiOutlineShoppingBag className="text-7xl text-gray-300 mx-auto mb-4" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-6">
          Looks like you haven't placed any orders
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddOrder}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
        >
          Start Shopping
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="p-4 pb-8">
      {/* Header with gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-4"
      >
        <div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            Recent Orders
          </h3>
          <p className="text-xs text-gray-500">
            Your latest {recentOrders.length} orders
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddOrder}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-1"
        >
          <HiPlus className="text-lg" /> Order
        </motion.button>
      </motion.div>

      {/* Orders List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {recentOrders.map((order, index) => {
          const statusStyle = getStatusStyle(order.status);
          const isExpanded = expandedOrder === order.id;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              layout
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all relative"
            >
              {/* Decorative gradient line */}
              <div
                className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${statusStyle.gradient}`}
              />

              {/* Order Header - Always Visible */}
              <div
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                onHoverStart={() => setHoveredOrder(index)}
                onHoverEnd={() => setHoveredOrder(null)}
                className="p-4 cursor-pointer hover:bg-gray-50/50 transition-colors pl-5"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-800">
                        {order.id}
                      </span>
                      {hoveredOrder === index && !isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs text-red-500"
                        >
                          Click to expand
                        </motion.span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <HiOutlineClock className="text-gray-400" />
                      <span>{order.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border} flex items-center gap-1`}
                    >
                      <span>{statusStyle.icon}</span>
                      {order.status}
                    </motion.span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isExpanded ? (
                        <HiOutlineChevronUp className="text-gray-400 text-xl" />
                      ) : (
                        <HiOutlineChevronDown className="text-gray-400 text-xl" />
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Order Stats */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-red-50 p-1.5 rounded-lg">
                      <HiShoppingBag className="text-red-500 text-sm" />
                    </div>
                    <span className="text-sm text-gray-600">
                      {order.items?.length || 0}{" "}
                      {order.items?.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaNairaSign className="text-gray-400 text-xs" />
                    <span className="font-bold text-red-600">
                      {formatNaira(order.totalPrice).replace("₦", "")}
                    </span>
                  </div>
                </div>

                {/* Preview items with images */}
                {order.items && order.items.length > 0 && !isExpanded && (
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      {order.items.slice(0, 3).map((item, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.1, zIndex: 10 }}
                          className="relative"
                          style={{ marginLeft: i > 0 ? "-8px" : "0" }}
                        >
                          <img
                            src={
                              item.photoName ||
                              "/images/pizzaimages/placeholder.jpg"
                            }
                            alt={item.name}
                            className="w-7 h-7 object-cover rounded-full border-2 border-white shadow-sm"
                            onError={(e) => {
                              e.target.src =
                                "/images/pizzaimages/placeholder.jpg";
                            }}
                          />
                        </motion.div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-7 h-7 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Expanded Order Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      {/* Customer Details Card */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <HiOutlineUser className="text-red-500" />
                          Customer Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <HiOutlineUser className="text-gray-400" />
                            <span>{order.fullName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <HiOutlinePhone className="text-gray-400" />
                            <span>{order.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <HiOutlineMail className="text-gray-400" />
                            <span className="truncate">{order.email}</span>
                          </div>
                          {order.delivery === "delivery" && (
                            <div className="flex items-start gap-2 text-gray-600">
                              <HiOutlineLocationMarker className="text-gray-400 mt-1" />
                              <span>{order.address}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-gray-600">
                            <span className="text-gray-400">📦</span>
                            <span className="capitalize">{order.delivery}</span>
                          </div>
                          {order.note && (
                            <div className="mt-2 p-2 bg-gray-50 rounded-lg text-sm text-gray-600">
                              <span className="font-medium">Note:</span>{" "}
                              {order.note}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Order Items Card */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <HiShoppingBag className="text-red-500" />
                          Order Items
                        </h4>
                        <div className="space-y-3">
                          {order.items?.map((item, i) => (
                            <motion.div
                              key={i}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <img
                                    src={
                                      item.photoName ||
                                      "/images/pizzaimages/placeholder.jpg"
                                    }
                                    alt={item.name}
                                    className="w-12 h-12 object-cover rounded-xl"
                                  />
                                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {item.quantity}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-sm">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatNaira(item.price)} each
                                  </p>
                                </div>
                              </div>
                              <p className="font-semibold text-sm">
                                {formatNaira(item.price * item.quantity)}
                              </p>
                            </motion.div>
                          ))}
                        </div>

                        {/* Order Total */}
                        <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-lg font-bold text-red-600">
                            {formatNaira(order.totalPrice)}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons - Only Reorder and Rate */}
                      <div className="grid grid-cols-2 gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => handleReorder(order, e)}
                          className="py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1"
                        >
                          <HiShoppingBag className="text-lg" />
                          Reorder
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => handleRateOrder(order.id, e)}
                          className="py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1"
                        >
                          <FaRegStar className="text-lg" />
                          Rate
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* View All Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleViewAllOrders}
        className="w-full mt-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <HiShoppingBag className="text-lg" />
        View All Orders ({recentOrders.length})
        <HiOutlineChevronRight className="text-lg" />
      </motion.button>

      {/* Quick Stats */}
      {recentOrders.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-2 mt-4"
        >
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-2 rounded-xl text-center">
            <p className="text-xs text-green-600">Delivered</p>
            <p className="font-bold text-green-700">
              {recentOrders.filter((o) => o.status === "Delivered").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-2 rounded-xl text-center">
            <p className="text-xs text-yellow-600">Processing</p>
            <p className="font-bold text-yellow-700">
              {recentOrders.filter((o) => o.status === "Processing").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2 rounded-xl text-center">
            <p className="text-xs text-blue-600">Total</p>
            <p className="font-bold text-blue-700">{recentOrders.length}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
