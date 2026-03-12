import { useState, useEffect, useRef } from "react";
import { Pizza } from "./Pizza";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { GiMeat, GiDrinkMe, GiNoodles } from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

const dishesData = [
  {
    name: "Jollof Rice",
    ingredients:
      "Made with long-grain parboiled rice, tomatoes, tomato paste, onions, bell peppers, Scotch bonnet peppers, garlic, and ginger.",
    price: 1500.0,
    photoName: "/images/pizzaimages/jollofricee.jpg",
    type: "maindishes",
  },
  {
    name: "Amala & Beans Soup",
    ingredients:
      "Made from yam flour (elubo) mixed with hot water into a smooth, stretchy dough. Beans soup, often prepared as ewa alagbado or gbegiri, includes peeled cooked beans, palm oil, seasoning cubes with meat",
    price: 1700.0,
    photoName: "/images/pizzaimages/amalaa.jpg",
    type: "maindishes",
  },
  {
    name: "Pounded Yam",
    ingredients:
      "Made by boiling yam pieces until soft and then pounding or blending them into a smooth, stretchy dough using only yam and water.",
    price: 900.0,
    photoName: "/images/pizzaimages/poundedyammm.jpg",
    type: "maindishes",
  },
  {
    name: "Eba & Efo",
    ingredients:
      "made from garri (cassava flakes) mixed with hot water, while Efo (vegetable soup) is prepared with spinach or fluted pumpkin leaves, palm oil, tomatoes, peppers, onions, crayfish, locust beans, and assorted meat or fish.",
    price: 1500.0,
    photoName: "/images/pizzaimages/ebaa.jpg",
    type: "maindishes",
  },
  {
    name: "Fried rice and Chicken",
    ingredients:
      "Fried rice with chicken made with parboiled rice, mixed vegetables (carrots, peas, sweet corn, green beans), onions, garlic, soy sauce, curry powder, and seasoning, served with seasoned and fried or grilled chicken.",
    price: 2000.0,
    photoName: "/images/pizzaimages/friedricewithchicken.jpg",
    type: "maindishes",
  },
  {
    name: "Yam and Egg",
    ingredients:
      "Made with boiled yam slices served alongside a fried egg sauce prepared with eggs, tomatoes, onions, peppers, and seasoning.",
    price: 1700.0,
    photoName: "/images/pizzaimages/yamegg.jpg",
    type: "proteins",
  },
  {
    name: "Fish",
    ingredients:
      "Made with ingredients like fresh or smoked fish, onions, peppers, tomatoes, garlic, seasoning cubes, and palm or vegetable oil, depending on the cooking style.",
    price: 2500.0,
    photoName: "/images/pizzaimages/fish.jpg",
    type: "proteins",
  },
  {
    name: "Moi Moi",
    ingredients:
      "made from blended peeled beans, onions, peppers, oil (usually palm or vegetable), seasoning cubes, and optional additions like eggs, fish, or ground crayfish.",
    price: 500.0,
    photoName: "/images/pizzaimages/moimoii.jpg",
    type: "proteins",
  },
  {
    name: "Bush Meat",
    ingredients:
      "Prepared with ingredients like the meat itself (such as antelope or grasscutter), onions, peppers, garlic, ginger, seasoning cubes, and palm oil or vegetable oil, often cooked in a spicy sauce or soup.",
    price: 500.0,
    photoName: "/images/pizzaimages/bushmeat.jpg",
    type: "proteins",
  },
  {
    name: "Fanta",
    ingredients: "Carbonated drinks",
    price: 500.0,
    photoName: "/images/pizzaimages/fanta.jpeg",
    type: "extrasanddrinks",
  },
  {
    name: "Margerita Pizza",
    ingredients:
      "Fresh mozzarella, tomato sause, and basil on our hand-tossed dough",
    price: 4500.0,
    photoName: "/images/pizzaimages/Margheritapizza.jpg",
    type: "extrasanddrinks",
  },
  {
    name: "Shawarma",
    ingredients: "Carbonated drinks",
    price: 1000.0,
    photoName: "/images/pizzaimages/shawama.jpg",
    type: "extrasanddrinks",
  },
  {
    name: "Coke",
    ingredients: "Carbonated drinks",
    price: 1000.0,
    photoName: "/images/pizzaimages/coke.jpg",
    type: "extrasanddrinks",
  },
  {
    name: "Sprite",
    ingredients: "Carbonated drinks",
    price: 1000.0,
    photoName: "/images/pizzaimages/sprite.jpeg",
    type: "extrasanddrinks",
  },
];

// Category configuration with icons and colors - icon on top, text below
const categories = [
  {
    id: "maindishes",
    label: "Main Dishes",
    icon: <GiNoodles className="text-2xl md:text-3xl" />,
    gradient: "from-orange-500 to-red-500",
    lightColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    borderColor: "border-orange-500/30",
    shadow: "shadow-orange-500/20",
  },
  {
    id: "proteins",
    label: "Proteins",
    icon: <GiMeat className="text-2xl md:text-3xl" />,
    gradient: "from-orange-500 to-red-500",
    lightColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    borderColor: "border-orange-500/30",
    shadow: "shadow-orange-500/20",
  },
  {
    id: "extrasanddrinks",
    label: "Extras & Drinks",
    icon: <GiDrinkMe className="text-2xl md:text-3xl" />,
    gradient: "from-orange-500 to-red-500",
    lightColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    borderColor: "border-orange-500/30",
    shadow: "shadow-orange-500/20",
  },
];

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("maindishes");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const searchInputRef = useRef(null);

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter dishes based on selected category and search query
  const getFilteredDishes = () => {
    // First filter by category
    const categoryFiltered = dishesData.filter(
      (dish) => dish.type === selectedCategory,
    );

    // If there's a search query, filter further by name or ingredients
    if (searchQuery.trim() === "") {
      return categoryFiltered;
    }

    const query = searchQuery.toLowerCase().trim();
    return categoryFiltered.filter(
      (dish) =>
        dish.name.toLowerCase().includes(query) ||
        dish.ingredients.toLowerCase().includes(query),
    );
  };

  const filteredDishes = getFilteredDishes();
  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - "Our Menu" badge and description remain */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full mb-4 shadow-lg backdrop-blur-sm bg-opacity-90"
          >
            <HiOutlineSparkles className="text-lg" />
            <span className="text-sm font-medium">Our Menu</span>
          </motion.div>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our authentic Nigerian cuisine made with fresh ingredients
            and traditional recipes
          </p>
        </motion.div>

        {/* Search Box with Animation - Matching header's glass morphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative max-w-md mx-auto mb-8"
        >
          <div
            className={`relative flex items-center transition-all duration-300 ${
              isSearchFocused ? "scale-105" : ""
            }`}
          >
            <FaSearch
              className={`absolute left-4 text-gray-400 transition-colors duration-300 ${
                isSearchFocused ? "text-red-500" : ""
              }`}
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-gray-200 focus:border-red-500 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={clearSearch}
                  className="absolute right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <IoClose className="text-xl" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Search hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-xs text-gray-500 mt-2 text-center"
          >
            Search by dish name or ingredients
          </motion.p>
        </motion.div>

        {/* Category Tabs - Compact, all visible, icon on top, no count badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="bg-white/20 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/30 grid grid-cols-3 gap-2 w-full max-w-md mx-auto">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * (index + 1) }}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSearchQuery("");
                }}
                className={`
                  relative px-2 py-3 rounded-xl font-medium text-xs md:text-sm transition-all duration-300
                  flex flex-col items-center gap-1.5 overflow-hidden
                  ${
                    selectedCategory === category.id
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                {/* Glass morphism background for all tabs */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

                {/* Background for selected tab - using same orange-red gradient */}
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Hover effect for non-selected tabs */}
                {selectedCategory !== category.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-white/60 backdrop-blur-sm"
                  />
                )}

                {/* Content (stays above background) */}
                <span className="relative z-10 flex flex-col items-center gap-1">
                  <span
                    className={`text-2xl md:text-3xl ${selectedCategory !== category.id ? "text-orange-500" : "text-white"}`}
                  >
                    {category.icon}
                  </span>
                  <span className="text-[10px] md:text-xs font-medium whitespace-nowrap">
                    {category.label}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Header - Matching header's style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-between items-center gap-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl bg-orange-500/10 backdrop-blur-sm border border-orange-500/30`}
            >
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
                {filteredDishes.length === 1 ? "item" : "items"} available
              </p>
            </div>
          </div>

          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 flex items-center gap-2 border border-gray-200 shadow-sm"
            >
              <FaSearch className="text-gray-400 text-xs" />
              <span>"{searchQuery}"</span>
              <button
                onClick={clearSearch}
                className="ml-1 text-gray-400 hover:text-gray-600"
              >
                <IoClose className="text-lg" />
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full text-center py-16"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-md mx-auto border border-gray-200">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No items found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any items matching "{searchQuery}"
                  </p>
                  <button
                    onClick={clearSearch}
                    className="text-red-500 font-medium hover:text-red-600 transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Show result count */}
        {filteredDishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8 text-sm text-gray-500"
          >
            Showing {filteredDishes.length} of{" "}
            {dishesData.filter((dish) => dish.type === selectedCategory).length}{" "}
            items
          </motion.div>
        )}

        {/* Scroll to Top Button - Matching header's style */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 hover:scale-110 backdrop-blur-sm bg-opacity-90"
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
