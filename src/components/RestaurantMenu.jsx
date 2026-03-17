// components/RestaurantMenu.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaStar, FaArrowLeft } from "react-icons/fa";
import { GiMeat, GiDrinkMe, GiNoodles } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { Pizza } from "./Pizza";
import Cartbtn from "./Cartbtn";

// Restaurant data
const restaurantsData = {
  "item-7-go-iwo-road": {
    id: "item-7-go-iwo-road",
    name: "Item 7 Go Iwo Road",
    rating: 4.5,
    ratingCount: 250,
    cuisine: "Rice • Chicken • Beef • Shawarma",
    deliveryFee: 700,
    distance: 0.7,
    deliveryTime: "20-30 mins",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop",
    dishes: [
      {
        name: "Jollof Rice with Chicken",
        ingredients:
          "Perfectly cooked jollof rice with grilled chicken, plantains, and coleslaw",
        price: 2500,
        photoName:
          "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Shawarma Wrap",
        ingredients:
          "Grilled chicken, beef, vegetables, and special sauce wrapped in toasted bread",
        price: 2000,
        photoName:
          "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
        type: "extrasanddrinks",
      },
      {
        name: "Fried Rice & Chicken",
        ingredients:
          "Nigerian fried rice with mixed vegetables and fried chicken",
        price: 2200,
        photoName:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Grilled Fish",
        ingredients:
          "Fresh tilapia grilled with peppers, onions, and special spices",
        price: 3500,
        photoName:
          "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=300&fit=crop",
        type: "proteins",
      },
      {
        name: "Coke",
        ingredients: "Chilled carbonated drink",
        price: 500,
        photoName:
          "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400&h=300&fit=crop",
        type: "extrasanddrinks",
      },
    ],
  },
  "shrider-store": {
    id: "shrider-store",
    name: "Shrider Store",
    rating: 5.0,
    ratingCount: 180,
    cuisine: "Amala • Eba • Pounded Yam • Soups",
    deliveryFee: 500,
    distance: 1.2,
    deliveryTime: "15-25 mins",
    image:
      "https://images.unsplash.com/photo-1552566624-52f8b3ae5fd5?w=800&h=400&fit=crop",
    dishes: [
      {
        name: "Amala & Beans Soup",
        ingredients: "Smooth amala with rich beans soup and assorted meat",
        price: 1700,
        photoName:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Pounded Yam with Egusi",
        ingredients: "Smooth pounded yam served with rich egusi soup and meat",
        price: 2000,
        photoName:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Eba & Efo Riro",
        ingredients: "Garri eba with vegetable soup, assorted meat and fish",
        price: 1800,
        photoName:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Moi Moi",
        ingredients: "Steamed bean pudding with fish and eggs",
        price: 700,
        photoName:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
        type: "proteins",
      },
      {
        name: "Bush Meat",
        ingredients: "Spicy grilled bush meat with peppers and onions",
        price: 3500,
        photoName:
          "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop",
        type: "proteins",
      },
      {
        name: "Fanta",
        ingredients: "Chilled orange carbonated drink",
        price: 500,
        photoName:
          "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400&h=300&fit=crop",
        type: "extrasanddrinks",
      },
    ],
  },
  "taste-of-lagos": {
    id: "taste-of-lagos",
    name: "Taste of Lagos",
    rating: 4.8,
    ratingCount: 320,
    cuisine: "Jollof • Fried Rice • Grilled Fish",
    deliveryFee: 600,
    distance: 0.9,
    deliveryTime: "25-35 mins",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=400&fit=crop",
    dishes: [
      {
        name: "Jollof Rice Special",
        ingredients:
          "Party jollof rice with fried plantains, coleslaw, and grilled chicken",
        price: 2800,
        photoName:
          "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Grilled Tilapia",
        ingredients:
          "Fresh tilapia grilled with peppers, onions, and special sauce",
        price: 4000,
        photoName:
          "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=300&fit=crop",
        type: "proteins",
      },
      {
        name: "Fried Rice",
        ingredients: "Nigerian fried rice with mixed vegetables and liver",
        price: 2000,
        photoName:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Pepper Soup",
        ingredients: "Spicy pepper soup with goat meat or fish",
        price: 1800,
        photoName:
          "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
        type: "proteins",
      },
    ],
  },
  "buka-joint": {
    id: "buka-joint",
    name: "Buka Joint",
    rating: 4.3,
    ratingCount: 150,
    cuisine: "Local Dishes • Fufu • Soups",
    deliveryFee: 550,
    distance: 0.5,
    deliveryTime: "20-30 mins",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=400&fit=crop",
    dishes: [
      {
        name: "Fufu with Egusi",
        ingredients:
          "Smooth fufu served with rich melon seed soup and assorted meat",
        price: 1800,
        photoName:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Oha Soup",
        ingredients:
          "Traditional oha leaves soup with cocoyam thickener and assorted meat",
        price: 2000,
        photoName:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Banga Soup",
        ingredients: "Palm nut soup with fresh catfish and spices",
        price: 2200,
        photoName:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
        type: "maindishes",
      },
    ],
  },
  "spice-route": {
    id: "spice-route",
    name: "Spice Route",
    rating: 4.7,
    ratingCount: 210,
    cuisine: "Grilled • Barbecue • Spicy Wings",
    deliveryFee: 650,
    distance: 1.5,
    deliveryTime: "25-40 mins",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop",
    dishes: [
      {
        name: "Grilled Chicken",
        ingredients: "Half chicken grilled with peri-peri sauce and spices",
        price: 3000,
        photoName:
          "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
        type: "proteins",
      },
      {
        name: "Spicy Wings",
        ingredients: "Chicken wings tossed in hot pepper sauce",
        price: 2000,
        photoName:
          "https://images.unsplash.com/photo-1527477396000-2716fcb3b6c3?w=400&h=300&fit=crop",
        type: "proteins",
      },
      {
        name: "Barbecue Platter",
        ingredients: "Assorted grilled meats with barbecue sauce and fries",
        price: 5000,
        photoName:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
        type: "maindishes",
      },
    ],
  },
  "chicken-republic": {
    id: "chicken-republic",
    name: "Chicken Republic",
    rating: 4.4,
    ratingCount: 890,
    cuisine: "Fried Chicken • Wings • Fries",
    deliveryFee: 600,
    distance: 0.8,
    deliveryTime: "20-35 mins",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop",
    dishes: [
      {
        name: "Fried Chicken (4 pieces)",
        ingredients: "Crispy fried chicken pieces with secret spices",
        price: 2500,
        photoName:
          "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop",
        type: "proteins",
      },
      {
        name: "Chicken Wings (6 pieces)",
        ingredients: "Spicy or mild chicken wings with dipping sauce",
        price: 2000,
        photoName:
          "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop",
        type: "proteins",
      },
      {
        name: "French Fries",
        ingredients: "Crispy golden fries with salt and seasoning",
        price: 800,
        photoName:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
        type: "extrasanddrinks",
      },
      {
        name: "Chicken Burger",
        ingredients: "Grilled chicken patty with lettuce, tomato, and mayo",
        price: 1800,
        photoName:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
        type: "maindishes",
      },
    ],
  },
  "dominos-pizza": {
    id: "dominos-pizza",
    name: "Domino's Pizza",
    rating: 4.6,
    ratingCount: 650,
    cuisine: "Pizza • Pasta • Wings • Desserts",
    deliveryFee: 800,
    distance: 1.1,
    deliveryTime: "30-45 mins",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop",
    dishes: [
      {
        name: "Margherita Pizza",
        ingredients:
          "Fresh mozzarella, tomato sauce, and basil on hand-tossed dough",
        price: 4500,
        photoName:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Pepperoni Pizza",
        ingredients: "Tomato sauce, mozzarella, and double pepperoni",
        price: 5200,
        photoName:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Chicken Pasta",
        ingredients: "Creamy alfredo pasta with grilled chicken and mushrooms",
        price: 3200,
        photoName:
          "https://images.unsplash.com/photo-1645112411342-4665e1ff9c9f?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Garlic Bread",
        ingredients: "Toasted bread with garlic butter and herbs",
        price: 1200,
        photoName:
          "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop",
        type: "extrasanddrinks",
      },
    ],
  },
  kfc: {
    id: "kfc",
    name: "KFC",
    rating: 4.3,
    ratingCount: 1200,
    cuisine: "Fried Chicken • Burgers • Fries",
    deliveryFee: 700,
    distance: 1.3,
    deliveryTime: "25-40 mins",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    dishes: [
      {
        name: "Streetwise 2 (2pcs Chicken)",
        ingredients: "2 pieces of fried chicken with fries and coleslaw",
        price: 2200,
        photoName:
          "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Zinger Burger",
        ingredients: "Spicy chicken fillet with lettuce and mayo in a bun",
        price: 2500,
        photoName:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
        type: "maindishes",
      },
      {
        name: "Chicken Bucket (6pcs)",
        ingredients: "6 pieces of original recipe or hot & spicy chicken",
        price: 6500,
        photoName:
          "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop",
        type: "proteins",
      },
      {
        name: "Fries (Large)",
        ingredients: "Large portion of seasoned fries",
        price: 1000,
        photoName:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const searchInputRef = useRef(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const restaurant = restaurantsData[restaurantId];

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
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
      {/* Cart Button - Fixed Position */}
      <Cartbtn />

      {/* Restaurant Header with Background Image */}
      <div className="relative h-48 md:h-64 bg-cover bg-center bg-gray-200">
        {/* Background Image with Loading State */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(${restaurant.image})`,
            opacity: imageLoaded ? 1 : 0,
          }}
        />

        {/* Show placeholder while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Hidden Image Preloader */}
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="hidden"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-all z-10"
        >
          <FaArrowLeft />
        </button>

        {/* Restaurant Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
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
                <span className="text-white/70 text-xs">
                  ({restaurant.ratingCount}+)
                </span>
              </div>
              <span className="text-white/50">•</span>
              <span>{restaurant.cuisine}</span>
              <span className="text-white/50">•</span>
              <span className="flex items-center gap-1">
                <span>🚴</span> ₦{restaurant.deliveryFee}
              </span>
              <span className="text-white/50">•</span>
              <span className="flex items-center gap-1">
                <span>📍</span> {restaurant.distance} km
              </span>
              <span className="text-white/50">•</span>
              <span className="flex items-center gap-1">
                <span>⏱</span> {restaurant.deliveryTime}
              </span>
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
                  <FaSearch className="text-6xl mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold mb-2">No items found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any items matching "{searchQuery}"
                  </p>
                  <button
                    onClick={clearSearch}
                    className="text-red-500 font-medium hover:text-red-600"
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





