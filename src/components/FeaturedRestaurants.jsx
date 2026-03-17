// components/FeaturedRestaurants.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaClock,
  FaMotorcycle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Random placeholder images for restaurants
const placeholderImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1552566624-52f8b3ae5fd5?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
];

// Featured restaurants data
const featuredRestaurants = [
  {
    id: "item-7-go-iwo-road",
    name: "Item 7 Go Iwo Road",
    rating: 4.5,
    ratingCount: 250,
    cuisine: "Rice • Chicken • Beef • Shawarma",
    deliveryFee: 700,
    deliveryTime: "20-30",
    distance: 0.7,
    imageIndex: 0,
    promo: "Free drink on first order",
    isOpen: true,
    isFeatured: true,
  },
  {
    id: "shrider-store",
    name: "Shrider Store",
    rating: 5.0,
    ratingCount: 180,
    cuisine: "Amala • Eba • Pounded Yam • Soups",
    deliveryFee: 500,
    deliveryTime: "15-25",
    distance: 1.2,
    imageIndex: 1,
    promo: "10% off on first order",
    isOpen: true,
    isFeatured: true,
  },
  {
    id: "taste-of-lagos",
    name: "Taste of Lagos",
    rating: 4.8,
    ratingCount: 320,
    cuisine: "Jollof • Fried Rice • Grilled Fish",
    deliveryFee: 600,
    deliveryTime: "25-35",
    distance: 0.9,
    imageIndex: 2,
    promo: "Buy 1 Get 1 Free",
    isOpen: true,
    isFeatured: true,
  },
  {
    id: "buka-joint",
    name: "Buka Joint",
    rating: 4.3,
    ratingCount: 150,
    cuisine: "Local Dishes • Fufu • Soups",
    deliveryFee: 550,
    deliveryTime: "20-30",
    distance: 0.5,
    imageIndex: 3,
    promo: "Free delivery",
    isOpen: true,
    isFeatured: true,
  },
  {
    id: "spice-route",
    name: "Spice Route",
    rating: 4.7,
    ratingCount: 210,
    cuisine: "Grilled • Barbecue • Spicy Wings",
    deliveryFee: 650,
    deliveryTime: "25-40",
    distance: 1.5,
    imageIndex: 4,
    promo: "20% off on grills",
    isOpen: true,
    isFeatured: true,
  },
  {
    id: "chicken-republic",
    name: "Chicken Republic",
    rating: 4.4,
    ratingCount: 890,
    cuisine: "Fried Chicken • Wings • Fries",
    deliveryFee: 600,
    deliveryTime: "20-35",
    distance: 0.8,
    imageIndex: 5,
    promo: "Buy 5 pieces get 1 free",
    isOpen: true,
    isFeatured: true,
  },
  {
    id: "dominos-pizza",
    name: "Domino's Pizza",
    rating: 4.6,
    ratingCount: 650,
    cuisine: "Pizza • Pasta • Wings • Desserts",
    deliveryFee: 800,
    deliveryTime: "30-45",
    distance: 1.1,
    imageIndex: 6,
    promo: "50% off on 2nd pizza",
    isOpen: true,
    isFeatured: true,
  },
  {
    id: "kfc",
    name: "KFC",
    rating: 4.3,
    ratingCount: 1200,
    cuisine: "Fried Chicken • Burgers • Fries",
    deliveryFee: 700,
    deliveryTime: "25-40",
    distance: 1.3,
    imageIndex: 7,
    promo: "Monday special: 20% off",
    isOpen: true,
    isFeatured: true,
  },
];

export function FeaturedRestaurants() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);
  const [visibleRestaurants, setVisibleRestaurants] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollContainerRef = useRef(null);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  // Filter only featured restaurants that are open
  useEffect(() => {
    const featured = featuredRestaurants.filter(
      (r) => r.isFeatured && r.isOpen,
    );
    setVisibleRestaurants(featured);
  }, []);

  // Check scroll position to show/hide navigation arrows (for mobile only)
  const checkScrollPosition = () => {
    if (scrollContainerRef.current && window.innerWidth < 1024) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkScrollPosition();
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, [visibleRestaurants]);

  // Scroll functions (for mobile)
  const scroll = (direction) => {
    if (scrollContainerRef.current && window.innerWidth < 1024) {
      const scrollAmount = 300; // Width of one card
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Handle drag to scroll (for mobile)
  const handleDragStart = (e) => {
    if (window.innerWidth < 1024) {
      dragStartX.current = e.clientX;
      dragScrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
    }
  };

  const handleDragMove = (e) => {
    if (!dragStartX.current || window.innerWidth >= 1024) return;
    const dx = e.clientX - dragStartX.current;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = dragScrollLeft.current - dx;
    }
  };

  const handleDragEnd = () => {
    dragStartX.current = 0;
    dragScrollLeft.current = 0;
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  // Split restaurants for desktop (LG+)
  const firstRowRestaurants = visibleRestaurants.slice(0, 4);
  const secondRowRestaurants = visibleRestaurants.slice(4, 8);

  // For mobile: create pairs of restaurants (2 per row, 4 total visible per scroll)
  const mobileRestaurantPairs = [];
  for (let i = 0; i < visibleRestaurants.length; i += 2) {
    mobileRestaurantPairs.push(visibleRestaurants.slice(i, i + 2));
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end mb-8"
        >
          <div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full mb-4 shadow-lg"
            >
              <span className="text-lg">🔥</span>
              <span className="text-sm font-medium">Featured Restaurants</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Popular Near You
            </h2>
          </div>

          {/* Navigation Arrows - Only visible on mobile/tablet */}
          <div className="flex lg:hidden items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("left")}
              className={`p-3 rounded-full bg-white shadow-lg border border-gray-200 transition-all ${
                canScrollLeft
                  ? "text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                  : "text-gray-300 cursor-not-allowed"
              }`}
              disabled={!canScrollLeft}
            >
              <FaChevronLeft />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("right")}
              className={`p-3 rounded-full bg-white shadow-lg border border-gray-200 transition-all ${
                canScrollRight
                  ? "text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                  : "text-gray-300 cursor-not-allowed"
              }`}
              disabled={!canScrollRight}
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile/Tablet: Horizontal Scroll with 4 cards visible (2 rows of 2) */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-6 hide-scrollbar cursor-grab active:cursor-grabbing"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {mobileRestaurantPairs.map((pair, pairIndex) => (
              <div
                key={pairIndex}
                className="flex-none w-[calc(100vw-2rem)] sm:w-[500px]"
              >
                {/* First row of the pair */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {pair[0] && (
                    <RestaurantCard
                      restaurant={pair[0]}
                      hoveredId={hoveredId}
                      setHoveredId={setHoveredId}
                      onClick={handleRestaurantClick}
                      placeholderImages={placeholderImages}
                    />
                  )}
                  {pair[1] && (
                    <RestaurantCard
                      restaurant={pair[1]}
                      hoveredId={hoveredId}
                      setHoveredId={setHoveredId}
                      onClick={handleRestaurantClick}
                      placeholderImages={placeholderImages}
                    />
                  )}
                </div>

                {/* Second row of the pair (if exists) */}
                {visibleRestaurants[pairIndex * 2 + 2] && (
                  <div className="grid grid-cols-2 gap-4">
                    {visibleRestaurants[pairIndex * 2 + 2] && (
                      <RestaurantCard
                        restaurant={visibleRestaurants[pairIndex * 2 + 2]}
                        hoveredId={hoveredId}
                        setHoveredId={setHoveredId}
                        onClick={handleRestaurantClick}
                        placeholderImages={placeholderImages}
                      />
                    )}
                    {visibleRestaurants[pairIndex * 2 + 3] && (
                      <RestaurantCard
                        restaurant={visibleRestaurants[pairIndex * 2 + 3]}
                        hoveredId={hoveredId}
                        setHoveredId={setHoveredId}
                        onClick={handleRestaurantClick}
                        placeholderImages={placeholderImages}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Mobile Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-4"
          >
            <div className="flex gap-1">
              {mobileRestaurantPairs.map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />
              ))}
            </div>
            <p className="text-xs text-gray-500 ml-2">Swipe to see more →</p>
          </motion.div>
        </div>

        {/* LG Screens: Grid View - 4 cards up, 4 cards down */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* First Row - 4 cards */}
            {firstRowRestaurants.length > 0 && (
              <div className="grid grid-cols-4 gap-6">
                {firstRowRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
                    onClick={handleRestaurantClick}
                    placeholderImages={placeholderImages}
                  />
                ))}
              </div>
            )}

            {/* Second Row - 4 cards */}
            {secondRowRestaurants.length > 0 && (
              <div className="grid grid-cols-4 gap-6">
                {secondRowRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
                    onClick={handleRestaurantClick}
                    placeholderImages={placeholderImages}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/restaurants")}
            className="inline-flex items-center gap-2 bg-white border-2 border-red-500 text-red-500 px-6 py-3 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>View All Restaurants</span>
            <span>→</span>
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

// Restaurant Card Component
function RestaurantCard({
  restaurant,
  hoveredId,
  setHoveredId,
  onClick,
  placeholderImages,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300 },
      }}
      onHoverStart={() => setHoveredId(restaurant.id)}
      onHoverEnd={() => setHoveredId(null)}
      onClick={() => onClick(restaurant.id)}
      className="w-full bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group relative"
    >
      {/* Promo Badge */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-2 left-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg"
      >
        {restaurant.promo}
      </motion.div>

      {/* Image Container */}
      <div className="relative h-32 sm:h-36 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={
            placeholderImages[restaurant.imageIndex % placeholderImages.length]
          }
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />

        {/* Overlay with quick view */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
          >
            View Menu →
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-sm text-gray-800 group-hover:text-red-500 transition-colors line-clamp-1">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded-full flex-shrink-0">
            <FaStar className="text-yellow-500 text-[10px]" />
            <span className="font-semibold text-[10px]">
              {restaurant.rating}
            </span>
          </div>
        </div>

        <p className="text-[10px] text-gray-500 mb-2 line-clamp-1">
          {restaurant.cuisine}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-gray-600 mb-2">
          <span className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded-full">
            <FaMotorcycle className="text-red-500 text-[8px]" />₦
            {restaurant.deliveryFee}
          </span>
          <span className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded-full">
            <FaClock className="text-red-500 text-[8px]" />
            {restaurant.deliveryTime} min
          </span>
          <span className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded-full">
            <MdLocationOn className="text-red-500 text-[8px]" />
            {restaurant.distance} km
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span
            className={`w-1.5 h-1.5 rounded-full ${restaurant.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
          />
          <span className="text-[8px] text-gray-500">
            {restaurant.isOpen ? "Open now" : "Closed"}
          </span>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: hoveredId === restaurant.id ? "100%" : "0%" }}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"
        />
      </div>
    </motion.div>
  );
}
