import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaStar, FaArrowLeft } from "react-icons/fa";
import { GiMeat, GiDrinkMe, GiNoodles } from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { Pizza } from "./Pizza";

// Restaurant data
const restaurantsData = {
  "item-7-go-iwo-road": {
    id: "item-7-go-iwo-road",
    name: "Item 7 Go Iwo Road",
    rating: 4.5,
    cuisine: "Rice | Chicken | Beef | Shawarma",
    deliveryFee: 700,
    distance: 0.7,
    deliveryTime: "20-30 mins",
    image: "/images/restaurants/item7.jpg",
    dishes: [
      {
        name: "Jollof Rice with Chicken",
        ingredients:
          "Perfectly cooked jollof rice with grilled chicken, plantains, and coleslaw",
        price: 2500,
        photoName: "/images/pizzaimages/jollofricee.jpg",
        type: "maindishes",
      },
      {
        name: "Shawarma Wrap",
        ingredients:
          "Grilled chicken, beef, vegetables, and special sauce wrapped in toasted bread",
        price: 2000,
        photoName: "/images/pizzaimages/shawama.jpg",
        type: "extrasanddrinks",
      },
      {
        name: "Fried Rice & Chicken",
        ingredients:
          "Nigerian fried rice with mixed vegetables and fried chicken",
        price: 2200,
        photoName: "/images/pizzaimages/friedricewithchicken.jpg",
        type: "maindishes",
      },
      {
        name: "Grilled Fish",
        ingredients:
          "Fresh tilapia grilled with peppers, onions, and special spices",
        price: 3500,
        photoName: "/images/pizzaimages/fish.jpg",
        type: "proteins",
      },
      {
        name: "Coke",
        ingredients: "Chilled carbonated drink",
        price: 500,
        photoName: "/images/pizzaimages/coke.jpg",
        type: "extrasanddrinks",
      },
    ],
  },
  "shrider-store": {
    id: "shrider-store",
    name: "Shrider Store",
    rating: 5.0,
    cuisine: "Helmet | Jackets | Delivery Bag",
    deliveryFee: 500,
    distance: 1.2,
    deliveryTime: "15-25 mins",
    image: "/images/restaurants/shrider.jpg",
    dishes: [
      {
        name: "Amala & Beans Soup",
        ingredients: "Smooth amala with rich beans soup and assorted meat",
        price: 1700,
        photoName: "/images/pizzaimages/amalaa.jpg",
        type: "maindishes",
      },
      {
        name: "Pounded Yam with Egusi",
        ingredients: "Smooth pounded yam served with rich egusi soup and meat",
        price: 2000,
        photoName: "/images/pizzaimages/poundedyammm.jpg",
        type: "maindishes",
      },
      {
        name: "Eba & Efo Riro",
        ingredients: "Garri eba with vegetable soup, assorted meat and fish",
        price: 1800,
        photoName: "/images/pizzaimages/ebaa.jpg",
        type: "maindishes",
      },
      {
        name: "Moi Moi",
        ingredients: "Steamed bean pudding with fish and eggs",
        price: 700,
        photoName: "/images/pizzaimages/moimoii.jpg",
        type: "proteins",
      },
      {
        name: "Bush Meat",
        ingredients: "Spicy grilled bush meat with peppers and onions",
        price: 3500,
        photoName: "/images/pizzaimages/bushmeat.jpg",
        type: "proteins",
      },
      {
        name: "Fanta",
        ingredients: "Chilled orange carbonated drink",
        price: 500,
        photoName: "/images/pizzaimages/fanta.jpeg",
        type: "extrasanddrinks",
      },
    ],
  },
};

// Categories configuration
const categories = [
  {
    id: "maindishes",
    label: "Main Dishes",
    icon: <GiNoodles className="text-2xl md:text-3xl" />,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "proteins",
    label: "Proteins",
    icon: <GiMeat className="text-2xl md:text-3xl" />,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "extrasanddrinks",
    label: "Extras & Drinks",
    icon: <GiDrinkMe className="text-2xl md:text-3xl" />,
    gradient: "from-orange-500 to-red-500",
  },
];

export function RestaurantMenu() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("maindishes");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  const restaurant = restaurantsData[restaurantId];

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 text-white px-6 py-2 rounded-lg"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Filter dishes based on category and search
  const getFilteredDishes = () => {
    const categoryFiltered = restaurant.dishes.filter(
      (dish) => dish.type === selectedCategory,
    );

    if (searchQuery.trim() === "") return categoryFiltered;

    const query = searchQuery.toLowerCase().trim();
    return categoryFiltered.filter(
      (dish) =>
        dish.name.toLowerCase().includes(query) ||
        dish.ingredients.toLowerCase().includes(query),
    );
  };

  const filteredDishes = getFilteredDishes();
  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Restaurant Header */}
      <div
        className="relative h-48 md:h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurant.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-all z-10"
        >
          <FaArrowLeft />
        </button>

        {/* Restaurant Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{restaurant.rating}</span>
              </div>
              <span>•</span>
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <span>🚴 ₦{restaurant.deliveryFee}</span>
              <span>•</span>
              <span>📍 {restaurant.distance} km</span>
              <span>•</span>
              <span>⏱ {restaurant.deliveryTime}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-md mx-auto mb-8"
        >
          <div
            className={`relative flex items-center transition-all duration-300 ${isSearchFocused ? "scale-105" : ""}`}
          >
            <FaSearch
              className={`absolute left-4 text-gray-400 transition-colors ${isSearchFocused ? "text-red-500" : ""}`}
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search in this restaurant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-gray-200 focus:border-red-500 focus:outline-none shadow-lg"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  onClick={clearSearch}
                  className="absolute right-4 text-gray-400 hover:text-red-500"
                >
                  <IoClose className="text-xl" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="bg-white/20 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/30 grid grid-cols-3 gap-2 w-full max-w-md">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  relative px-2 py-3 rounded-xl font-medium text-xs md:text-sm
                  flex flex-col items-center gap-1.5 overflow-hidden
                  ${selectedCategory === category.id ? "text-white" : "text-gray-600"}
                `}
              >
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-red-500`}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                <span className="relative z-10 flex flex-col items-center gap-1">
                  <span
                    className={`text-2xl md:text-3xl ${selectedCategory !== category.id ? "text-orange-500" : "text-white"}`}
                  >
                    {category.icon}
                  </span>
                  <span className="text-[10px] md:text-xs font-medium">
                    {category.label}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-500/10 backdrop-blur-sm border border-orange-500/30">
              <span className="text-xl text-orange-500">
                {currentCategory?.icon}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">
                {currentCategory?.label}
              </h3>
              <p className="text-sm text-gray-500">
                {filteredDishes.length}{" "}
                {filteredDishes.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredDishes.length > 0 ? (
              filteredDishes.map((dish, index) => (
                <motion.div
                  key={dish.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Pizza
                    name={dish.name}
                    ingredients={dish.ingredients}
                    price={dish.price}
                    photoName={dish.photoName}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No items found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any items matching "{searchQuery}"
                  </p>
                  <button
                    onClick={clearSearch}
                    className="text-red-500 font-medium"
                  >
                    Clear search
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
