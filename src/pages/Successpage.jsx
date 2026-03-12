import { HiCheckCircle, HiArrowSmallLeft } from "react-icons/hi2";
import {
  HiShoppingBag,
  HiOutlineLocationMarker,
  HiOutlineMail,
} from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlineFire,
  HiOutlineTruck,
} from "react-icons/hi2";
import { FaNairaSign } from "react-icons/fa6";
import { IoTimeOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";

export default function Successpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top when page loads with multiple strategies
  useEffect(() => {
    window.scrollTo(0, 0);

    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);

    // Simulate loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(loadingTimeout);
    };
  }, []);

  // Order details passed via state from checkout page
  const order = location.state?.order;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  if (!order) {
    return (
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-montserrat flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4"
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
          <h3 className="text-xl font-semibold mb-2">No Order Found</h3>
          <p className="text-gray-500 mb-6">
            We couldn't find any order details
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Go back home
          </motion.button>
        </motion.div>
      </section>
    );
  }

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
            <p className="text-gray-500">Loading your order...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-montserrat relative overflow-hidden">
      {/* Decorative Elements - Red theme */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"
      />

      {/* Floating Icons - Red theme */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 right-20 text-4xl opacity-10 hidden lg:block"
      >
        🎉
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-20 left-20 text-5xl opacity-10 hidden lg:block"
      >
        ✅
      </motion.div>

      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm min-h-screen shadow-2xl relative z-10">
        {/* Header with Gradient - Red theme */}
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
              <h1 className="text-xl font-bold">Order Success!</h1>
            </div>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
            >
              <HiCheckCircle className="text-xl" />
            </motion.div>
          </div>

          {/* Success Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white/90 text-xs border border-white/10"
          >
            <HiOutlineSparkles className="text-yellow-300" />
            <span>🎉 Your order has been placed successfully!</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 pb-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Success Icon and Message - Red theme success icon */}
            <motion.div variants={itemVariants} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="inline-block"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <HiCheckCircle className="text-white text-6xl" />
                </div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-2xl font-bold text-gray-800 mb-2"
              >
                Thank You, {order.fullName}! 🎉
              </motion.h1>

              <motion.p variants={itemVariants} className="text-gray-600">
                Your order has been received and is being processed.
              </motion.p>
            </motion.div>

            {/* Order Number Card - Red theme */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-5 border border-red-200 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 mb-1">Order Number</p>
                  <p className="text-2xl font-bold text-red-700">{order.id}</p>
                </div>
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-xl">
                  <HiShoppingBag className="text-white text-2xl" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-sm text-red-600">
                <IoTimeOutline />
                <span>Placed on {new Date().toLocaleDateString()}</span>
              </div>
            </motion.div>

            {/* Customer Details - Red accents */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-lg"
            >
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <HiOutlineUser className="text-red-500" />
                Customer Details
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <HiOutlineUser className="text-gray-400" />
                  <span>{order.fullName}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <HiOutlinePhone className="text-gray-400" />
                  <span>{order.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <HiOutlineMail className="text-gray-400" />
                  <span>{order.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  {order.delivery === "delivery" ? (
                    <>
                      <HiOutlineLocationMarker className="text-gray-400" />
                      <span>{order.address}</span>
                    </>
                  ) : (
                    <>
                      <CiDeliveryTruck className="text-gray-400" />
                      <span>Pickup from store</span>
                    </>
                  )}
                </div>
                {order.note && (
                  <div className="mt-2 p-3 bg-gray-100 rounded-xl text-sm text-gray-600">
                    <span className="font-medium">Note:</span> {order.note}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Order Items - Red accents */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-lg"
            >
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <HiShoppingBag className="text-red-500" />
                Order Items
              </h3>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={item.photoName}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl"
                          onError={(e) => {
                            e.target.src =
                              "/images/pizzaimages/placeholder.jpg";
                          }}
                        />
                        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg">
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatNaira(item.price)} each
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-red-600">
                      {formatNaira(item.price * item.quantity)}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Order Total - Red gradient */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                    {formatNaira(order.totalPrice)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Including all taxes and fees
                </p>
              </div>
            </motion.div>

            {/* Delivery Info - Red theme */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-5 border border-red-200 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-xl">
                  <HiOutlineTruck className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-semibold">Estimated Delivery Time</p>
                  <p className="text-sm text-gray-600">
                    {order.delivery === "delivery"
                      ? "30-45 minutes"
                      : "Ready for pickup in 15-20 minutes"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons - Red theme */}
            <motion.div variants={itemVariants} className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/orders")}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <HiShoppingBag className="text-xl" />
                View My Orders
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/")}
                className="w-full bg-white border-2 border-red-500 text-red-500 py-4 rounded-xl font-semibold hover:bg-red-50 transition-all"
              >
                Continue Shopping
              </motion.button>
            </motion.div>

            {/* Trust Badges - Red accents */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4 text-xs text-gray-500"
            >
              <div className="flex items-center gap-1">
                <HiOutlineFire className="text-red-500" />
                <span>Fresh Ingredients</span>
              </div>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <div className="flex items-center gap-1">
                <IoShieldCheckmarkOutline className="text-red-500" />
                <span>Quality Guaranteed</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave Divider - Red theme */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto opacity-30"
        >
          <path
            fill="#EF4444"
            fillOpacity="0.1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}
