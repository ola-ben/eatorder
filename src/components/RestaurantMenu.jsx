import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiArrowLeft, FiSearch, FiHeart, FiShare2, FiX } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { TbMotorbike } from "react-icons/tb";
import { Pizza } from "./Pizza";
import TopNav from "./TopNav";
import { useCart } from "../context/CartContext";

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
    image: "/images/pizzaimages/jollofricee.jpg",
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
    ratingCount: 180,
    cuisine: "Amala • Eba • Pounded Yam • Soups",
    deliveryFee: 500,
    distance: 1.2,
    deliveryTime: "15-25 mins",
    image: "/images/pizzaimages/amalaa.jpg",
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
        photoName: "/images/pizzaimages/jollofricee.jpg",
        type: "maindishes",
      },
      {
        name: "Grilled Tilapia",
        ingredients:
          "Fresh tilapia grilled with peppers, onions, and special sauce",
        price: 4000,
        photoName: "/images/pizzaimages/fish.jpg",
        type: "proteins",
      },
      {
        name: "Fried Rice",
        ingredients: "Nigerian fried rice with mixed vegetables and liver",
        price: 2000,
        photoName: "/images/pizzaimages/friedricewithchicken.jpg",
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
        photoName: "/images/pizzaimages/amalaa.jpg",
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
        photoName: "/images/pizzaimages/bushmeat.jpg",
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
        photoName: "/images/pizzaimages/yamegg.jpg",
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
    image: "/images/pizzaimages/Margheritapizza.jpg",
    dishes: [
      {
        name: "Margherita Pizza",
        ingredients:
          "Fresh mozzarella, tomato sauce, and basil on hand-tossed dough",
        price: 4500,
        photoName: "/images/pizzaimages/Margheritapizza.jpg",
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
        photoName: "/images/pizzaimages/shawama.jpg",
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
        photoName: "/images/pizzaimages/friedricewithchicken.jpg",
        type: "proteins",
      },
      {
        name: "Fries (Large)",
        ingredients: "Large portion of seasoned fries",
        price: 1000,
        photoName: "/images/pizzaimages/fanta.jpeg",
        type: "extrasanddrinks",
      },
    ],
  },
};

const categories = [
  { id: "maindishes", label: "Main Dishes" },
  { id: "proteins", label: "Proteins" },
  { id: "extrasanddrinks", label: "Extras & Drinks" },
];

export function RestaurantMenu() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { cart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("maindishes");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [restaurantId]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 160);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const restaurant = restaurantsData[restaurantId];

  const totalCount = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const filtered = useMemo(() => {
    if (!restaurant) return [];
    const inCat = restaurant.dishes.filter(
      (d) => d.type === selectedCategory,
    );
    const q = searchQuery.toLowerCase().trim();
    if (!q) return inCat;
    return inCat.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.ingredients.toLowerCase().includes(q),
    );
  }, [restaurant, selectedCategory, searchQuery]);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <h2 className="text-xl font-bold mb-2 text-ink">
            Restaurant not found
          </h2>
          <p className="text-ink-soft mb-4">
            We couldn't find that restaurant.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-brand text-white px-5 py-2.5 rounded-full font-semibold"
          >
            Back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-canvas">
      <TopNav />
      <div className="max-w-md mx-auto bg-white min-h-screen relative pb-32 lg:max-w-7xl lg:bg-transparent lg:px-6 lg:pt-6 lg:pb-24">
        {/* Floating header buttons over hero (mobile only) */}
        <div className="lg:hidden absolute top-3 left-3 right-3 z-30 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-card flex items-center justify-center text-ink"
          >
            <FiArrowLeft />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-card flex items-center justify-center text-ink"
            >
              <FiSearch />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-card flex items-center justify-center text-ink">
              <FiShare2 />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-card flex items-center justify-center text-ink">
              <FiHeart />
            </button>
          </div>
        </div>

        {/* Sticky compact header on scroll (mobile only) */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="lg:hidden fixed top-0 inset-x-0 z-30 bg-white border-b border-gray-100"
            >
              <div className="max-w-md mx-auto px-3 h-14 flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <FiArrowLeft />
                </button>
                <h2 className="font-semibold text-ink truncate flex-1">
                  {restaurant.name}
                </h2>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <FiSearch />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero image */}
        <div className="relative h-52 lg:h-80 w-full overflow-hidden lg:rounded-3xl">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
          <div className="hidden lg:block absolute bottom-6 left-8 text-white">
            <p className="text-xs uppercase tracking-wider text-white/80">
              Featured restaurant
            </p>
            <h1 className="text-4xl font-extrabold mt-1">{restaurant.name}</h1>
            <p className="text-sm text-white/90 mt-1">{restaurant.cuisine}</p>
          </div>
        </div>

        {/* Restaurant info card (overlaps hero) */}
        <div className="px-4 lg:px-0 -mt-8 lg:mt-6 relative z-10">
          <div className="bg-white rounded-2xl shadow-card p-4 lg:p-6 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="lg:flex lg:items-center lg:gap-6">
              <div className="flex items-start justify-between gap-3 lg:block">
                <div className="min-w-0 lg:hidden">
                  <h1 className="text-xl font-bold text-ink leading-tight">
                    {restaurant.name}
                  </h1>
                  <p className="text-sm text-ink-soft mt-1 line-clamp-1">
                    {restaurant.cuisine}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-brand-soft text-brand px-3 py-1.5 rounded-full text-sm font-semibold shrink-0 lg:text-base">
                  <FaStar className="text-[12px] lg:text-sm" />
                  {restaurant.rating}
                  <span className="text-brand/70 font-medium">
                    ({restaurant.ratingCount}+)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 lg:mt-0 flex items-center justify-between lg:justify-end lg:gap-8 text-xs lg:text-sm text-ink-soft">
              <div className="flex items-center gap-1.5">
                <FiClock className="text-gray-400" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TbMotorbike className="text-gray-400" />
                <span>₦{restaurant.deliveryFee} delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>📍 {restaurant.distance} km</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search inline (when open) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden px-4 pt-4"
            >
              <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-3 h-11">
                <FiSearch className="text-gray-500" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search in ${restaurant.name}`}
                  className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-gray-500"
                />
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchOpen(false);
                  }}
                  className="text-gray-500"
                >
                  <FiX />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category tabs */}
        <div className="sticky top-0 lg:top-16 z-20 bg-white lg:bg-transparent pt-4 lg:pt-8 pb-2 lg:pb-4">
          {scrolled && <div className="h-14 lg:hidden" />}
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 lg:px-0">
            {categories.map((c) => {
              const active = c.id === selectedCategory;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-4 lg:px-5 h-10 lg:h-11 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
                    active
                      ? "bg-brand text-white border-brand shadow-card"
                      : "bg-white text-ink border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes */}
        <div className="px-4 lg:px-0 pt-4 pb-6 lg:pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-5"
            >
              {filtered.length > 0 ? (
                filtered.map((dish) => (
                  <Pizza
                    key={dish.name}
                    name={dish.name}
                    ingredients={dish.ingredients}
                    price={dish.price}
                    photoName={dish.photoName}
                  />
                ))
              ) : (
                <div className="text-center py-12 col-span-full">
                  <div className="text-5xl mb-2">🔍</div>
                  <p className="font-semibold text-ink">No items found</p>
                  <p className="text-sm text-ink-soft">
                    Try a different search or category
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sticky View Cart bar */}
        <AnimatePresence>
          {totalCount > 0 && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              className="fixed bottom-4 inset-x-0 z-40 px-4"
            >
              <button
                onClick={() => navigate("/cartpage")}
                className="max-w-md lg:max-w-lg mx-auto w-full bg-brand text-white rounded-2xl shadow-pop h-14 flex items-center justify-between px-5 hover:bg-brand-deep transition-colors"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <span className="bg-white/20 w-7 h-7 rounded-full flex items-center justify-center text-sm">
                    {totalCount}
                  </span>
                  View cart
                </span>
                <span className="font-bold">
                  ₦{totalPrice.toLocaleString("en-NG")}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
