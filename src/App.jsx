import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import AnimatedToaster from "./components/AnimatedToaster";
import Chatbot from "./components/Chatbot";
import PageLoader from "./components/PageLoader";

// Eager: the most-visited route. Loads with the initial bundle so users
// landing on "/" see the home page without a Suspense flash.
import Homepage from "./pages/Homepage";

// Lazy-loaded routes — each becomes its own JS chunk fetched on demand.
const AllRestaurants = lazy(() => import("./pages/AllRestaurants"));
const RestaurantMenu = lazy(() =>
  import("./components/RestaurantMenu").then((m) => ({
    default: m.RestaurantMenu,
  })),
);
const Cartpage = lazy(() => import("./pages/Cartpage"));
const Checkoutpage = lazy(() => import("./pages/Checkoutpage"));
const Successpage = lazy(() => import("./pages/Successpage"));
const Loginformpage = lazy(() => import("./pages/Loginformpage"));
const Favourites = lazy(() => import("./pages/Favourites"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const Bookings = lazy(() => import("./pages/Bookings"));

// Profile cluster — all loaded together when the user enters /profile/*
const Profile = lazy(() => import("./pages/Profile"));
const ProfileDetails = lazy(() => import("./pages/ProfileDetails"));
const LoginDetails = lazy(() => import("./pages/LoginDetails"));
const Referrals = lazy(() => import("./pages/Referrals"));
const Addresses = lazy(() => import("./pages/Addresses"));
const FAQs = lazy(() => import("./pages/FAQs"));

// Admin cluster — never downloaded for non-admin users
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminRestaurants = lazy(() => import("./pages/admin/AdminRestaurants"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminReservations = lazy(() => import("./pages/admin/AdminReservations"));
const RequireAdmin = lazy(() => import("./pages/admin/RequireAdmin"));

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
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/bookings" element={<Bookings />} />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="reservations" element={<AdminReservations />} />
              <Route path="restaurants" element={<AdminRestaurants />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}
