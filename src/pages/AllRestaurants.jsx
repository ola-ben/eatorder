import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FiArrowLeft, FiSearch, FiSliders, FiClock } from "react-icons/fi";
import { TbMotorbike } from "react-icons/tb";
import BottomNav from "../components/BottomNav";

const restaurantImages = [
  "https://images.unsplash.com/photo-1552566624-52f8b3ae5fd5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=600&fit=crop",
];

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
    imageIndex: 0,
    promo: "Free drink on first order",
    isOpen: true,
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
    imageIndex: 8,
    promo: "Free soup with every order",
    isOpen: true,
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
    imageIndex: 9,
    promo: "Buy 2 get 1 free",
    isOpen: false,
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
    imageIndex: 10,
    promo: "Free drink with pastry",
    isOpen: true,
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
    imageIndex: 11,
    promo: "20% off on combos",
    isOpen: true,
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
    imageIndex: 12,
    promo: "Free plantain",
    isOpen: true,
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
    imageIndex: 14,
    promo: "Buy 1 fish get 1 drink free",
    isOpen: true,
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
    imageIndex: 15,
    promo: "Free extra pepper",
    isOpen: true,
  },
];

const sortOptions = [
  { id: "rating", label: "Top rated" },
  { id: "deliveryTime", label: "Fastest" },
  { id: "distance", label: "Nearest" },
];

export default function AllRestaurants() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const restaurants = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let list = q
      ? allRestaurants.filter(
          (r) =>
            r.name.toLowerCase().includes(q) ||
            r.cuisine.toLowerCase().includes(q),
        )
      : [...allRestaurants];

    list.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "deliveryTime")
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      if (sortBy === "distance") return a.distance - b.distance;
      return 0;
    });
    return list;
  }, [searchQuery, sortBy]);

  return (
    <main className="min-h-screen bg-canvas pb-safe-nav">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
          <div className="px-4 pt-4 pb-3 flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ink"
            >
              <FiArrowLeft />
            </button>
            <h1 className="text-lg font-bold text-ink">Browse restaurants</h1>
          </div>

          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-3 h-11">
              <FiSearch className="text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants or cuisines"
                className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Sort chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-3">
            <button className="flex items-center gap-1.5 px-3 h-9 rounded-full bg-white border border-gray-200 text-sm text-ink font-medium whitespace-nowrap">
              <FiSliders className="text-base" /> Filters
            </button>
            {sortOptions.map((o) => {
              const active = sortBy === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => setSortBy(o.id)}
                  className={`px-3 h-9 rounded-full text-sm font-medium whitespace-nowrap border ${
                    active
                      ? "bg-ink text-white border-ink"
                      : "bg-white text-ink border-gray-200"
                  }`}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs text-ink-soft">
            {restaurants.length}{" "}
            {restaurants.length === 1 ? "restaurant" : "restaurants"} found
          </p>
        </div>

        {/* List */}
        <div className="px-4 pb-8 space-y-4">
          {restaurants.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-2">🔍</div>
              <p className="font-semibold text-ink">No restaurants found</p>
              <p className="text-sm text-ink-soft">
                Try a different search term
              </p>
            </div>
          ) : (
            restaurants.map((r, i) => (
              <RestaurantRow
                key={r.id}
                restaurant={r}
                index={i}
                onClick={() => navigate(`/restaurant/${r.id}`)}
              />
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

function RestaurantRow({ restaurant, index, onClick }) {
  const img =
    restaurantImages[restaurant.imageIndex % restaurantImages.length];
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-card relative"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={img}
          alt={restaurant.name}
          className={`w-full h-full object-cover ${
            !restaurant.isOpen ? "grayscale opacity-70" : ""
          }`}
        />
        <div className="absolute top-3 left-3 bg-white text-[11px] font-semibold text-brand px-2 py-1 rounded-full shadow-sm">
          {restaurant.promo}
        </div>
        {!restaurant.isOpen && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Currently closed
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-ink text-base line-clamp-1">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 bg-ink/5 px-2 py-0.5 rounded-full text-xs">
            <FaStar className="text-yellow-500 text-[11px]" />
            <span className="font-semibold text-ink">{restaurant.rating}</span>
            <span className="text-ink-soft">({restaurant.ratingCount})</span>
          </div>
        </div>
        <p className="text-[13px] text-ink-soft line-clamp-1 mt-0.5">
          {restaurant.cuisine}
        </p>
        <div className="mt-2 flex items-center gap-3 text-[12px] text-ink-soft">
          <span className="flex items-center gap-1">
            <FiClock className="text-gray-400" /> {restaurant.deliveryTime} min
          </span>
          <span className="flex items-center gap-1">
            <TbMotorbike className="text-gray-400" /> ₦{restaurant.deliveryFee}
          </span>
          <span>· {restaurant.distance} km</span>
        </div>
      </div>
    </motion.button>
  );
}
