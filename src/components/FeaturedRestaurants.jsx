import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { TbMotorbike } from "react-icons/tb";
import FavoriteHeart from "./FavoriteHeart";

const placeholderImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1552566624-52f8b3ae5fd5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
];

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
  const featured = featuredRestaurants.filter((r) => r.isFeatured && r.isOpen);
  const top = featured.slice(0, 4);
  const popular = featured.slice(4);

  return (
    <section className="px-4 lg:px-0 pb-8 lg:pb-12 pt-2 lg:pt-10">
      {/* Top picks */}
      <SectionHeader
        title="Top picks for you"
        action="See all"
        onAction={() => navigate("/restaurants")}
      />
      {/* Mobile: horizontal scroll. Desktop: 4-col grid */}
      <div className="-mx-4 px-4 lg:mx-0 lg:px-0 flex gap-3 lg:gap-5 overflow-x-auto no-scrollbar pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible">
        {top.map((r) => (
          <FeaturedCard
            key={r.id}
            restaurant={r}
            onClick={() => navigate(`/restaurant/${r.id}`)}
          />
        ))}
      </div>

      {/* Popular near you */}
      <div className="mt-8 lg:mt-12">
        <SectionHeader
          title="Popular near you"
          action="See all"
          onAction={() => navigate("/restaurants")}
        />
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-5">
          {popular.map((r) => (
            <RestaurantRow
              key={r.id}
              restaurant={r}
              onClick={() => navigate(`/restaurant/${r.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="flex items-end justify-between mb-3 lg:mb-5">
      <h2 className="text-lg lg:text-2xl font-bold text-ink">{title}</h2>
      {action && (
        <button
          onClick={onAction}
          className="text-sm font-semibold text-brand hover:underline"
        >
          {action}
        </button>
      )}
    </div>
  );
}

function FeaturedCard({ restaurant, onClick }) {
  const img =
    placeholderImages[restaurant.imageIndex % placeholderImages.length];
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="text-left flex-none w-[260px] lg:w-auto bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-pop transition-shadow"
    >
      <div className="relative h-36 lg:h-44 w-full overflow-hidden">
        <img
          src={img}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-[11px] font-semibold text-ink px-2 py-1 rounded-full shadow-sm">
          {restaurant.promo}
        </div>
        <div className="absolute top-2 right-2">
          <FavoriteHeart restaurant={restaurant} size="sm" />
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/65 text-white text-[11px] font-semibold px-2 py-1 rounded-full">
          <FaStar className="text-yellow-400 text-[10px]" />
          {restaurant.rating}
        </div>
      </div>
      <div className="p-3 lg:p-4">
        <h3 className="font-semibold text-ink text-sm lg:text-base line-clamp-1">
          {restaurant.name}
        </h3>
        <p className="text-[12px] lg:text-sm text-ink-soft line-clamp-1 mt-0.5">
          {restaurant.cuisine}
        </p>
        <div className="mt-2 flex items-center gap-3 text-[12px] text-ink-soft">
          <span className="flex items-center gap-1">
            <FiClock className="text-gray-400" /> {restaurant.deliveryTime} min
          </span>
          <span className="flex items-center gap-1">
            <TbMotorbike className="text-gray-400" /> ₦{restaurant.deliveryFee}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function RestaurantRow({ restaurant, onClick }) {
  const img =
    placeholderImages[restaurant.imageIndex % placeholderImages.length];
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-pop transition-shadow"
    >
      <div className="relative h-40 lg:h-48 w-full overflow-hidden">
        <img
          src={img}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white text-[11px] font-semibold text-brand px-2 py-1 rounded-full shadow-sm">
          {restaurant.promo}
        </div>
        <div className="absolute top-3 right-3">
          <FavoriteHeart restaurant={restaurant} />
        </div>
      </div>
      <div className="p-3 lg:p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-ink text-base lg:text-lg line-clamp-1">
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
