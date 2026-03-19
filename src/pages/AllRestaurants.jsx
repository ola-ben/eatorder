// pages/AllRestaurants.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaClock,
  FaMotorcycle,
  FaSearch,
  FaArrowLeft,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Nigerian restaurant aesthetic images - mixing food and restaurant vibes
const nigerianRestaurantImages = [
  // Local food joints and bukas
  "https://images.unsplash.com/photo-1552566624-52f8b3ae5fd5?w=400&h=300&fit=crop", // Modern restaurant interior
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop", // Busy restaurant
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop", // Cozy restaurant
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop", // Outdoor seating
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop", // Fine dining
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop", // Street food vibe
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop", // Restaurant counter
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop", // Food display
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop", // Colorful dishes
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop", // Traditional setting
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", // Local kitchen
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop", // Outdoor cooking
  "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop", // Jollof rice closeup
  "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop", // Fried rice
  "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=300&fit=crop", // Grilled fish
  "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop", // Fried chicken
];

// All restaurants data
const allRestaurants = [
  {
    id: "item-7-go-iwo-road",
    name: "Item 7 Go Iwo Road",
    rating: 4.5,
    ratingCount: 250,
    cuisine: "Rice • Chicken • Beef • Shawarma",
    deliveryFee: 700,
    deliveryTime: "20-30",
    distance: 0.7,
    imageIndex: 0, // Modern restaurant interior
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
    imageIndex: 1, // Busy restaurant
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
    imageIndex: 2, // Cozy restaurant
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
    imageIndex: 3, // Outdoor seating
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
    imageIndex: 4, // Fine dining
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
    imageIndex: 5, // Street food vibe
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
    imageIndex: 6, // Restaurant counter
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
    imageIndex: 7, // Food display
    promo: "Monday special: 20% off",
    isOpen: true,
    isFeatured: true,
  },
  {
    id: "mama-put",
    name: "Mama Put",
    rating: 4.2,
    ratingCount: 430,
    cuisine: "Local • Home-cooked • Nigerian",
    deliveryFee: 450,
    deliveryTime: "15-25",
    distance: 0.3,
    imageIndex: 8, // Colorful dishes
    promo: "Free soup with every order",
    isOpen: true,
    isFeatured: false,
  },
  {
    id: "kilimanjaro",
    name: "Kilimanjaro",
    rating: 4.9,
    ratingCount: 560,
    cuisine: "Grilled • Barbecue • Suya",
    deliveryFee: 750,
    deliveryTime: "25-35",
    distance: 1.4,
    imageIndex: 9, // Traditional setting
    promo: "Buy 2 get 1 free",
    isOpen: false,
    isFeatured: false,
  },
  {
    id: "sweet-sensation",
    name: "Sweet Sensation",
    rating: 4.1,
    ratingCount: 780,
    cuisine: "Pastries • Small chops • Drinks",
    deliveryFee: 500,
    deliveryTime: "20-30",
    distance: 0.6,
    imageIndex: 10, // Local kitchen
    promo: "Free drink with pastry",
    isOpen: true,
    isFeatured: false,
  },
  {
    id: "tantalizers",
    name: "Tantalizers",
    rating: 4.0,
    ratingCount: 920,
    cuisine: "Burgers • Fries • Chicken",
    deliveryFee: 650,
    deliveryTime: "25-35",
    distance: 1.0,
    imageIndex: 11, // Outdoor cooking
    promo: "20% off on combos",
    isOpen: true,
    isFeatured: false,
  },
  {
    id: "jollof-pot",
    name: "Jollof Pot",
    rating: 4.8,
    ratingCount: 340,
    cuisine: "Jollof Rice • Party Rice • Catering",
    deliveryFee: 600,
    deliveryTime: "25-35",
    distance: 1.8,
    imageIndex: 12, // Jollof rice closeup
    promo: "Free plantain",
    isOpen: true,
    isFeatured: false,
  },
  {
    id: "fish-lovers",
    name: "Fish Lovers Spot",
    rating: 4.6,
    ratingCount: 280,
    cuisine: "Grilled Fish • Tilapia • Catfish",
    deliveryFee: 550,
    deliveryTime: "20-30",
    distance: 2.1,
    imageIndex: 14, // Grilled fish
    promo: "Buy 1 fish get 1 drink free",
    isOpen: true,
    isFeatured: false,
  },
  {
    id: "suya-kingdom",
    name: "Suya Kingdom",
    rating: 4.9,
    ratingCount: 620,
    cuisine: "Suya • Grilled Meat • Spicy",
    deliveryFee: 650,
    deliveryTime: "15-25",
    distance: 1.3,
    imageIndex: 15, // Fried chicken (suya vibe)
    promo: "Free extra pepper",
    isOpen: true,
    isFeatured: true,
  },
];

export default function AllRestaurants() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(allRestaurants);

  // Ref for header to calculate proper padding
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculate header height for proper content positioning
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter and sort restaurants
  useEffect(() => {
    let filtered = [...allRestaurants];

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.cuisine.toLowerCase().includes(query),
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "deliveryTime":
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case "distance":
          return a.distance - b.distance;
        default:
          return 0;
      }
    });

    setFilteredRestaurants(filtered);
  }, [searchQuery, sortBy]);

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Fixed Header */}
      <div
        ref={headerRef}
        className="bg-white shadow-sm fixed top-0 left-0 right-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleGoBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </motion.button>
            <h1 className="text-2xl font-bold text-gray-800">
              All Restaurants
            </h1>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search restaurants by name or cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:outline-none shadow-sm"
              />
            </div>
          </div>

          {/* Sort and Count */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              {filteredRestaurants.length}{" "}
              {filteredRestaurants.length === 1 ? "restaurant" : "restaurants"}{" "}
              found
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-red-500 bg-white"
            >
              <option value="rating">Sort by: Rating</option>
              <option value="deliveryTime">Sort by: Delivery Time</option>
              <option value="distance">Sort by: Distance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div style={{ height: headerHeight }} className="w-full" />

      {/* Restaurants Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {filteredRestaurants.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
          >
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative"
                style={{ zIndex: 10 }}
              >
                <RestaurantCard
                  restaurant={restaurant}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  onClick={handleRestaurantClick}
                  nigerianRestaurantImages={nigerianRestaurantImages}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </motion.div>
        )}
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
  nigerianRestaurantImages,
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

      {/* Closed Badge */}
      {!restaurant.isOpen && (
        <div className="absolute top-2 right-2 z-10 bg-gray-800/80 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
          Closed
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-28 sm:h-32 lg:h-36 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={
            nigerianRestaurantImages[
              restaurant.imageIndex % nigerianRestaurantImages.length
            ]
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
            className="bg-white text-gray-800 px-2 py-1 lg:px-3 lg:py-1 rounded-full text-[10px] lg:text-xs font-semibold shadow-lg"
          >
            View Menu →
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-2 lg:p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-xs lg:text-sm text-gray-800 group-hover:text-red-500 transition-colors line-clamp-1">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 bg-green-50 px-1 py-0.5 lg:px-1.5 lg:py-0.5 rounded-full flex-shrink-0">
            <FaStar className="text-yellow-500 text-[8px] lg:text-[10px]" />
            <span className="font-semibold text-[8px] lg:text-[10px]">
              {restaurant.rating}
            </span>
            <span className="text-[6px] lg:text-[8px] text-gray-500">
              ({restaurant.ratingCount})
            </span>
          </div>
        </div>

        <p className="text-[8px] lg:text-[10px] text-gray-500 mb-1 lg:mb-2 line-clamp-1">
          {restaurant.cuisine}
        </p>

        <div className="flex flex-wrap items-center gap-1 lg:gap-1.5 text-[8px] lg:text-[10px] text-gray-600 mb-1 lg:mb-2">
          <span className="flex items-center gap-1 bg-gray-100 px-1 py-0.5 lg:px-1.5 lg:py-0.5 rounded-full">
            <FaMotorcycle className="text-red-500 text-[6px] lg:text-[8px]" />₦
            {restaurant.deliveryFee}
          </span>
          <span className="flex items-center gap-1 bg-gray-100 px-1 py-0.5 lg:px-1.5 lg:py-0.5 rounded-full">
            <FaClock className="text-red-500 text-[6px] lg:text-[8px]" />
            {restaurant.deliveryTime} min
          </span>
          <span className="flex items-center gap-1 bg-gray-100 px-1 py-0.5 lg:px-1.5 lg:py-0.5 rounded-full">
            <MdLocationOn className="text-red-500 text-[6px] lg:text-[8px]" />
            {restaurant.distance} km
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span
            className={`w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full ${restaurant.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
          />
          <span className="text-[7px] lg:text-[8px] text-gray-500">
            {restaurant.isOpen ? "Open now" : "Closed"}
          </span>
        </div>

        {/* Featured indicator */}
        {restaurant.isFeatured && (
          <div className="absolute bottom-0 right-0 bg-gradient-to-l from-yellow-400 to-orange-500 text-white text-[6px] lg:text-[8px] px-1 lg:px-2 py-0.5 rounded-tl-lg">
            Featured
          </div>
        )}

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: hoveredId === restaurant.id ? "100%" : "0%" }}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"
        />
      </div>
    </motion.div>
  );
}
