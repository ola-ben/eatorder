import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiArrowSmallLeft,
  HiShoppingBag,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlineFire,
  HiOutlineCheckCircle,
  HiOutlineTruck,
} from "react-icons/hi2";
import {
  HiOutlineLocationMarker,
  HiOutlineMail, // This is from 'hi', not 'hi2'
} from "react-icons/hi";
import {
  CiCircleCheck,
  CiCreditCard1,
  CiLock,
  CiDeliveryTruck,
} from "react-icons/ci";
import { FaNairaSign, FaRegCreditCard } from "react-icons/fa6";
import { IoTimeOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function Checkoutpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Get cart and totalPrice from location state or context
  const cartItems = location.state?.cart || cart;
  const totalPrice =
    location.state?.totalPrice ||
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [delivery, setDelivery] = useState("pickup");
  const [currentStep, setCurrentStep] = useState(1);

  // Load saved profile info from localStorage
  const [fullName, setFullName] = useState(
    () => localStorage.getItem("fullName") || "",
  );
  const [phone, setPhone] = useState(() => localStorage.getItem("phone") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [address, setAddress] = useState(
    () => localStorage.getItem("address") || "",
  );
  const [note, setNote] = useState("");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Save changes to localStorage whenever inputs change
  useEffect(() => {
    localStorage.setItem("fullName", fullName);
  }, [fullName]);

  useEffect(() => {
    localStorage.setItem("phone", phone);
  }, [phone]);

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem("address", address);
  }, [address]);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  const handlePlaceOrder = () => {
    // Validation
    if (!fullName || !phone || !email) {
      toast.error(
        <div className="flex items-center gap-2">
          <HiOutlineUser className="text-red-500 text-xl" />
          <div>
            <p className="font-semibold">Missing Information</p>
            <p className="text-sm">Please fill all required fields</p>
          </div>
        </div>,
        {
          duration: 3000,
          style: {
            background: "#FEE2E2",
            color: "#991B1B",
            border: "1px solid #EF4444",
            borderRadius: "12px",
          },
        },
      );
      return;
    }

    if (delivery === "delivery" && !address) {
      toast.error(
        <div className="flex items-center gap-2">
          <HiOutlineLocationMarker className="text-red-500 text-xl" />
          <div>
            <p className="font-semibold">Address Required</p>
            <p className="text-sm">Please enter your delivery address</p>
          </div>
        </div>,
        {
          duration: 3000,
          style: {
            background: "#FEE2E2",
            color: "#991B1B",
            border: "1px solid #EF4444",
            borderRadius: "12px",
          },
        },
      );
      return;
    }

    setIsPlacingOrder(true);

    // Simulate order processing
    setTimeout(() => {
      // Generate order ID
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;

      const order = {
        id: orderId,
        fullName,
        phone,
        email,
        delivery,
        address: delivery === "delivery" ? address : "Pickup from store",
        note,
        items: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          photoName: item.photoName,
        })),
        totalPrice,
        date: new Date().toLocaleDateString(),
        status: "Processing",
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const updatedOrders = [order, ...existingOrders];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      clearCart(); // Clear cart after order

      toast.success(
        <div className="flex items-center gap-2">
          <HiOutlineCheckCircle className="text-green-500 text-xl" />
          <div>
            <p className="font-semibold">Order Placed Successfully!</p>
            <p className="text-sm">Order #{orderId}</p>
          </div>
        </div>,
        {
          duration: 4000,
          style: {
            background: "#DCFCE7",
            color: "#166534",
            border: "1px solid #22C55E",
            borderRadius: "12px",
          },
        },
      );

      navigate("/successpage", { state: { order } });
    }, 2000);
  };

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
            <p className="text-gray-500">Loading checkout...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-montserrat relative overflow-hidden">
      {/* Decorative Elements */}
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

      {/* Floating Food Icons */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 right-20 text-4xl opacity-10 hidden lg:block"
      >
        🍕
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-20 left-20 text-5xl opacity-10 hidden lg:block"
      >
        🍔
      </motion.div>

      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm min-h-screen shadow-2xl relative z-10">
        {/* Header with Gradient */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-red-500 to-red-600 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/cartpage")}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <HiArrowSmallLeft className="text-xl" />
              </motion.button>
              <h1 className="text-xl font-bold">Checkout</h1>
            </div>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="bg-white/20 p-2 rounded-full backdrop-blur-sm relative"
            >
              <HiShoppingBag className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </motion.div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step <= currentStep
                        ? "bg-white text-red-600"
                        : "bg-white/30 text-white"
                    }`}
                  >
                    {step < currentStep ? "✓" : step}
                  </motion.div>
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full ${
                      step < currentStep ? "bg-white" : "bg-white/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-2 text-white/80">
            {currentStep === 1 && "Delivery Options"}
            {currentStep === 2 && "Customer Information"}
            {currentStep === 3 && "Review & Place Order"}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 pb-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Fulfillment option */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineTruck className="text-red-500 text-xl" />
                <p className="font-semibold">Fulfillment Option</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setDelivery("pickup");
                    setCurrentStep(2);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    delivery === "pickup"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-200"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        delivery === "pickup"
                          ? "bg-red-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {delivery === "pickup" && "✓"}
                    </div>
                    <HiShoppingBag
                      className={`text-2xl ${
                        delivery === "pickup" ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`font-medium ${
                        delivery === "pickup" ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      Pickup
                    </p>
                    <p className="text-xs text-gray-500">Free</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setDelivery("delivery");
                    setCurrentStep(2);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    delivery === "delivery"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-200"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        delivery === "delivery"
                          ? "bg-red-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {delivery === "delivery" && "✓"}
                    </div>
                    <CiDeliveryTruck
                      className={`text-2xl ${
                        delivery === "delivery"
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`font-medium ${
                        delivery === "delivery"
                          ? "text-red-500"
                          : "text-gray-600"
                      }`}
                    >
                      Delivery
                    </p>
                    <p className="text-xs text-gray-500">
                      {totalPrice > 7000 ? "Free" : "₦1,500"}
                    </p>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Customer info */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineUser className="text-red-500 text-xl" />
                <p className="font-semibold">Customer Information</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Fullname"
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08012345678"
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  />
                </div>
              </div>
            </motion.div>

            {/* Delivery address if delivery selected */}
            <AnimatePresence>
              {delivery === "delivery" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-lg overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <HiOutlineLocationMarker className="text-red-500 text-xl" />
                    <p className="font-semibold">Delivery Address</p>
                  </div>

                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full delivery address"
                    rows="3"
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Special instructions */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineSparkles className="text-red-500 text-xl" />
                <p className="font-semibold">Special Instructions</p>
              </div>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Any special requests? (e.g., extra sauce, no onions, etc.)"
                rows="3"
                className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              />
            </motion.div>

            {/* Order Summary */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <HiShoppingBag className="text-red-500 text-xl" />
                <p className="font-semibold">Order Summary</p>
              </div>

              {/* Order Items Preview */}
              <div className="space-y-3 mb-4">
                {cartItems.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {item.quantity}x
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm">
                      {formatNaira(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <p className="text-sm text-gray-500 text-center">
                    +{cartItems.length - 3} more items
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatNaira(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className={totalPrice > 7000 ? "text-green-600" : ""}>
                    {delivery === "delivery"
                      ? totalPrice > 7000
                        ? "Free"
                        : "₦1,500"
                      : "Free"}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                      {formatNaira(
                        totalPrice +
                          (delivery === "delivery" && totalPrice <= 7000
                            ? 1500
                            : 0),
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Savings Badge */}
              {totalPrice > 7000 && delivery === "delivery" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-green-50 p-3 rounded-xl flex items-center gap-2"
                >
                  <HiOutlineFire className="text-green-500" />
                  <span className="text-sm text-green-700">
                    You've unlocked free delivery! 🎉
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Place Order Button */}
            <motion.div
              variants={itemVariants}
              className="sticky bottom-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-lg"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentStep(3);
                  handlePlaceOrder();
                }}
                disabled={isPlacingOrder}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPlacingOrder ? (
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
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <CiCreditCard1 className="text-xl" />
                    <span>
                      Place Order •{" "}
                      {formatNaira(
                        totalPrice +
                          (delivery === "delivery" && totalPrice <= 7000
                            ? 1500
                            : 0),
                      )}
                    </span>
                  </>
                )}
              </motion.button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <CiLock className="text-green-500" />
                  <span>Secure Payment</span>
                </div>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <div className="flex items-center gap-1">
                  <IoShieldCheckmarkOutline className="text-green-500" />
                  <span>Data Protected</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
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
