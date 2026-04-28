import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiArrowSmallLeft,
  HiShoppingBag,
  HiChevronDown,
  HiChevronUp,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlinePhone,
} from "react-icons/hi2";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { FaNairaSign, FaRegStar, FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export default function OrdersPage() {
  const navigate = useNavigate();
  const { loggedIn, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!authLoading && !loggedIn) {
      toast.error("Please login to view your orders");
      navigate("/logiformpage");
      return;
    }

    setTimeout(() => {
      // Load orders from localStorage
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      // Sort by date (most recent first)
      const sortedOrders = savedOrders.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      setOrders(sortedOrders);
      setIsLoading(false);
    }, 1000);
  }, [authLoading, loggedIn, navigate]);

  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return {
          bg: "bg-gradient-to-r from-green-500 to-green-600",
          light: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
          icon: "✅",
        };
      case "Processing":
        return {
          bg: "bg-gradient-to-r from-yellow-500 to-amber-500",
          light: "bg-yellow-50",
          text: "text-yellow-700",
          border: "border-yellow-200",
          icon: "⚙️",
        };
      case "Pending":
        return {
          bg: "bg-gradient-to-r from-orange-500 to-red-500",
          light: "bg-orange-50",
          text: "text-orange-700",
          border: "border-orange-200",
          icon: "⏳",
        };
      case "Cancelled":
        return {
          bg: "bg-gradient-to-r from-gray-500 to-gray-600",
          light: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          icon: "❌",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-blue-500 to-blue-600",
          light: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          icon: "📦",
        };
    }
  };

  const getFilteredOrders = () => {
    if (filterStatus === "all") return orders;
    return orders.filter(
      (order) => order.status?.toLowerCase() === filterStatus.toLowerCase(),
    );
  };

  const filteredOrders = getFilteredOrders();

  const toggleOrderExpansion = (orderId) => {
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
        duration: 4000,
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
        duration: 4000,
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

  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-montserrat">
        <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-gray-500">Loading your orders...</p>
          </div>
        </div>
      </section>
    );
  }

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
                onClick={() => navigate("/profile")}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <HiArrowSmallLeft className="text-xl" />
              </motion.button>
              <h1 className="text-xl font-bold">My Orders</h1>
            </div>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
            >
              <HiShoppingBag className="text-xl" />
            </motion.div>
          </div>

          {/* Order Stats with Animation */}
          {orders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-2 mt-4"
            >
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-center">
                <p className="text-2xl font-bold">{orders.length}</p>
                <p className="text-xs opacity-90">Total</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-center">
                <p className="text-2xl font-bold">
                  {orders.filter((o) => o.status === "Delivered").length}
                </p>
                <p className="text-xs opacity-90">Delivered</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-center">
                <p className="text-2xl font-bold">
                  {orders.filter((o) => o.status === "Processing").length}
                </p>
                <p className="text-xs opacity-90">Active</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Filter Tabs */}
        {orders.length > 0 && (
          <div className="sticky top-24 z-10 bg-white border-b border-gray-200 p-3">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {["all", "processing", "delivered", "pending"].map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-all ${
                    filterStatus === status
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 pb-8">
          {orders.length === 0 ? (
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
                <HiShoppingBag className="text-8xl text-gray-300 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-6">
                Looks like you haven't placed any orders
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
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                No {filterStatus} orders found
              </p>
              <button
                onClick={() => setFilterStatus("all")}
                className="text-red-500 font-medium"
              >
                View all orders
              </button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredOrders.map((order, index) => {
                const statusStyle = getStatusColor(order.status);

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    layout
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  >
                    {/* Order Header - Always Visible */}
                    <div
                      onClick={() => toggleOrderExpansion(order.id)}
                      className="p-5 cursor-pointer hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">
                            Order #{order.id}
                          </p>
                          <div className="flex items-center gap-2">
                            <HiOutlineClock className="text-gray-400" />
                            <p className="text-sm text-gray-600">
                              {order.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} text-white shadow-sm`}
                          >
                            {statusStyle.icon} {order.status}
                          </motion.span>
                          <motion.div
                            animate={{
                              rotate: expandedOrder === order.id ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {expandedOrder === order.id ? (
                              <HiChevronUp className="text-gray-400 text-xl" />
                            ) : (
                              <HiChevronDown className="text-gray-400 text-xl" />
                            )}
                          </motion.div>
                        </div>
                      </div>

                      {/* Order Preview */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-red-50 p-2 rounded-xl">
                            <HiShoppingBag className="text-red-500 text-xl" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Items</p>
                            <p className="font-semibold">
                              {order.items?.length || 0} items
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="text-xl font-bold text-red-600">
                            {formatNaira(order.totalPrice)}
                          </p>
                        </div>
                      </div>

                      {/* Preview Images */}
                      {order.items && order.items.length > 0 && (
                        <div className="flex items-center gap-1 mt-3">
                          {order.items.slice(0, 3).map((item, i) => (
                            <div key={i} className="relative">
                              <img
                                src={
                                  item.photoName ||
                                  "/images/pizzaimages/placeholder.jpg"
                                }
                                alt={item.name}
                                className="w-8 h-8 object-cover rounded-full border-2 border-white shadow-sm"
                                style={{ zIndex: 10 - i }}
                                onError={(e) => {
                                  e.target.src =
                                    "/images/pizzaimages/placeholder.jpg";
                                }}
                              />
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Expanded Order Details with Animation */}
                    <AnimatePresence>
                      {expandedOrder === order.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
                        >
                          <div className="p-5 space-y-4">
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
                                  <span className="truncate">
                                    {order.email}
                                  </span>
                                </div>
                                {order.delivery === "delivery" && (
                                  <div className="flex items-start gap-2 text-gray-600">
                                    <HiOutlineLocationMarker className="text-gray-400 mt-1" />
                                    <span>{order.address}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-gray-600">
                                  <span className="text-gray-400">📦</span>
                                  <span className="capitalize">
                                    {order.delivery}
                                  </span>
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
                                className="py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1"
                              >
                                <HiShoppingBag className="text-lg" />
                                Reorder
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => handleRateOrder(order.id, e)}
                                className="py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1"
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
          )}
        </div>
      </div>
    </section>
  );
}
