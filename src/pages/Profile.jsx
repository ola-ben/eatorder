// src/pages/Profile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiArrowSmallLeft,
  HiChevronDown,
  HiChevronUp,
  HiUser,
  HiShoppingBag,
  HiHeart,
  HiCog,
  HiMapPin,
  HiCreditCard,
} from "react-icons/hi2";

export default function Profile() {
  const navigate = useNavigate();

  const [fullName] = useState(localStorage.getItem("fullName") || "Guest User");
  const [phone] = useState(localStorage.getItem("phone") || "Not provided");
  const [email] = useState(localStorage.getItem("email") || "Not provided");
  const [address] = useState(localStorage.getItem("address") || "");

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: HiUser },
    { id: "orders", label: "Orders", icon: HiShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: HiHeart },
    { id: "addresses", label: "Addresses", icon: HiMapPin },
    { id: "payment", label: "Payment Methods", icon: HiCreditCard },
    { id: "settings", label: "Settings", icon: HiCog },
  ];

  const [activeTab, setActiveTab] = useState("overview");
  const [openOrderIndex, setOpenOrderIndex] = useState(null);

  const toggleOrder = (index) =>
    setOpenOrderIndex(openOrderIndex === index ? null : index);
  const clearOrders = () => {
    localStorage.removeItem("orders");
    setOrders([]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Profile Summary */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-ph/80 to-orange-500 text-white p-6 rounded-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <HiUser className="text-3xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{fullName}</h3>
                  <p className="text-white/80">{email}</p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <HiShoppingBag className="text-red-600 text-xl" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Wishlist Items</p>
                    <p className="text-2xl font-bold">{wishlist.length}</p>
                  </div>
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <HiHeart className="text-pink-600 text-xl" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Saved Addresses</p>
                    <p className="text-2xl font-bold">{address ? 1 : 0}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <HiMapPin className="text-green-600 text-xl" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

      case "orders":
        return (
          <motion.div
            key="orders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Order History</h3>
              {orders.length > 0 && (
                <button
                  onClick={clearOrders}
                  className="text-orange-500 hover:text-red-600 text-sm font-medium"
                >
                  Clear All
                </button>
              )}
            </div>

            {orders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No orders yet</p>
            ) : (
              orders
                .slice()
                .reverse()
                .map((order, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="border rounded-lg overflow-hidden mb-3"
                  >
                    <button
                      onClick={() => toggleOrder(idx)}
                      className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-semibold">
                        Order #{orders.length - idx}
                      </span>
                      {openOrderIndex === idx ? (
                        <HiChevronUp className="text-xl" />
                      ) : (
                        <HiChevronDown className="text-xl" />
                      )}
                    </button>

                    {openOrderIndex === idx && (
                      <div className="p-4 border-t">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Total:</span>
                            <span>₦{order.totalPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fulfillment:</span>
                            <span className="capitalize">{order.delivery}</span>
                          </div>
                          <div className="pt-2 border-t">
                            {order.items.map((item, i) => (
                              <div
                                key={i}
                                className="flex justify-between text-sm"
                              >
                                <span>
                                  {item.name} x {item.quantity}
                                </span>
                                <span>₦{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
            )}
          </motion.div>
        );

      case "wishlist":
        return (
          <motion.div
            key="wishlist"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <h3 className="font-semibold text-lg mb-4">My Wishlist</h3>
            {wishlist.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Coming Soon</p>
            ) : (
              <motion.div
                className="space-y-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {wishlist.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex justify-between items-center p-3 border rounded-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <span>{item.name}</span>
                    <span className="font-semibold">₦{item.price}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          />
        );
    }
  };

  return (
    <div className="font-poppins min-h-screen bg-gray-50">
      <div className="mx-4 my-10 lg:mx-80">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiArrowSmallLeft className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold">My Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="text-lg" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}
