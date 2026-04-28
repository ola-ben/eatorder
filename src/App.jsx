import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Loginformpage from "./pages/Loginformpage";
import Homepage from "./pages/Homepage";
import Cartpage from "./pages/Cartpage";
import Checkoutpage from "./pages/Checkoutpage";
import Successpage from "./pages/Successpage";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import LoginDetails from "./pages/LoginDetails";
import Referrals from "./pages/Referrals";
import Addresses from "./pages/Addresses";
import FAQs from "./pages/FAQs";
import OrdersPage from "./pages/OrdersPage";
import AllRestaurants from "./pages/AllRestaurants";
import Favourites from "./pages/Favourites";
import { RestaurantMenu } from "./components/RestaurantMenu";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import AnimatedToaster from "./components/AnimatedToaster";
import Chatbot from "./components/Chatbot";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <AnimatedToaster />
            <AnimatedRoutes />
            <Chatbot />
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Homepage />} />
          <Route path="/cartpage" element={<Cartpage />} />
          <Route path="/checkoutpage" element={<Checkoutpage />} />
          <Route path="/logiformpage" element={<Loginformpage />} />
          <Route path="/successpage" element={<Successpage />} />

          <Route path="/restaurants" element={<AllRestaurants />} />
          <Route
            path="/restaurant/:restaurantId"
            element={<RestaurantMenu />}
          />

          <Route path="/favourites" element={<Favourites />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/details" element={<ProfileDetails />} />
          <Route path="/profile/login-details" element={<LoginDetails />} />
          <Route path="/profile/referrals" element={<Referrals />} />
          <Route path="/profile/addresses" element={<Addresses />} />
          <Route path="/profile/faqs" element={<FAQs />} />

          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
