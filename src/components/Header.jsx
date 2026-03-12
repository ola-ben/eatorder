import { FaRegClock, FaStar, FaRegHeart } from "react-icons/fa";
import { FaLocationDot, FaPhone, FaMotorcycle } from "react-icons/fa6";
import { IoCall, IoTimeOutline, IoRestaurant, IoPizza } from "react-icons/io5";
import { HiOutlineShoppingBag, HiOutlineSparkles } from "react-icons/hi2";
import { GiChefToque, GiFoodTruck } from "react-icons/gi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

  // Scroll to top whenever header mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const isOpen = () => {
    const hours = currentTime.getHours();
    return hours >= 9 && hours < 22;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <section className="relative font-rubik overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url("/images/pizzaimages/amalaa.jpg")' }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
      />

      {/* Floating Food Icons (Decorative) */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 right-20 text-4xl opacity-20 hidden lg:block"
      >
        🍕
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-20 left-20 text-5xl opacity-20 hidden lg:block"
      >
        🍔
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white/90 text-sm mb-6 border border-white/10"
          >
            <HiOutlineSparkles className="text-yellow-300" />
            <span>🍕 Now Serving Hot & Fresh Meals</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Delicious Food
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Delivered to Your Doorstep
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl"
          >
            Fresh ingredients, amazing flavors, and lightning-fast delivery
            right to your door. Experience the taste of perfection.
          </motion.p>

          {/* Info Cards Grid - Compact 2x2 on mobile, 4x1 on desktop */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
          >
            {/* Delivery Time Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center gap-2 md:flex-row md:text-left md:items-center md:gap-3">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-xl flex-shrink-0 w-10 h-10 flex items-center justify-center">
                  <FaRegClock className="text-white text-lg md:text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="text-white/60 text-[10px] md:text-xs whitespace-nowrap">
                    Delivery Time
                  </p>
                  <p className="text-white font-semibold text-sm md:text-base whitespace-nowrap">
                    30–45 min
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Free Delivery Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center gap-2 md:flex-row md:text-left md:items-center md:gap-3">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-xl flex-shrink-0 w-10 h-10 flex items-center justify-center">
                  <GiFoodTruck className="text-white text-lg md:text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="text-white/60 text-[10px] md:text-xs whitespace-nowrap">
                    Free Delivery
                  </p>
                  <p className="text-white font-semibold text-sm md:text-base whitespace-nowrap">
                    Over ₦7,000
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Customer Rating Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center gap-2 md:flex-row md:text-left md:items-center md:gap-3">
                <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-2 rounded-xl flex-shrink-0 w-10 h-10 flex items-center justify-center">
                  <FaStar className="text-white text-lg md:text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="text-white/60 text-[10px] md:text-xs whitespace-nowrap">
                    Customer Rating
                  </p>
                  <p className="text-white font-semibold text-sm md:text-base whitespace-nowrap">
                    4.95 (500+)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Expert Chefs Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center gap-2 md:flex-row md:text-left md:items-center md:gap-3">
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-2 rounded-xl flex-shrink-0 w-10 h-10 flex items-center justify-center">
                  <GiChefToque className="text-white text-lg md:text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="text-white/60 text-[10px] md:text-xs whitespace-nowrap">
                    Expert Chefs
                  </p>
                  <p className="text-white font-semibold text-sm md:text-base whitespace-nowrap">
                    15+ Years Exp
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            {/* Call Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={() => (window.location.href = "tel:+2347063026384")}
              className="group relative bg-gradient-to-r from-[#069494] to-[#047b68] text-white rounded-2xl px-8 py-4 flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Animated Background */}
              <motion.div
                animate={{
                  x: isHovered ? "100%" : "-100%",
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent skew-x-12"
              />

              <IoCall className="text-2xl relative z-10" />
              <div className="text-left relative z-10">
                <p className="text-xs opacity-80">Call to order</p>
                <p className="font-semibold">(+234) 706-302-6384</p>
              </div>
            </motion.button>

            {/* Opening Hours */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/10"
            >
              <div
                className={`w-3 h-3 rounded-full ${isOpen() ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
              />
              <div>
                <p className="text-white/60 text-xs">Open now</p>
                <p className="text-white font-semibold flex items-center gap-2">
                  <IoTimeOutline />
                  9:00 AM - 10:00 PM
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-white/20"
          >
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <HiOutlineShoppingBag className="text-lg" />
              <span>1000+ daily orders</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full" />
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <FaRegHeart className="text-lg" />
              <span>95% repeat customers</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full" />
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <FaPhone className="text-lg" />
              <span>24/7 support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave Divider at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}
