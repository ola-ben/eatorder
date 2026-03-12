import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
import OrdersPage from "./pages/OrdersPage"; // Import OrdersPage
// import Loginbtn from "./components/Loginbtn";

import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* <Loginbtn /> */}

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#333",
              borderRadius: "10px",
              padding: "10px 14px",
              fontSize: "14px",
            },
          }}
        />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cartpage" element={<Cartpage />} />
          <Route path="/checkoutpage" element={<Checkoutpage />} />
          <Route path="/logiformpage" element={<Loginformpage />} />
          <Route path="/successpage" element={<Successpage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/details" element={<ProfileDetails />} />
          <Route path="/profile/login-details" element={<LoginDetails />} />
          <Route path="/profile/referrals" element={<Referrals />} />
          <Route path="/profile/addresses" element={<Addresses />} />
          <Route path="/profile/faqs" element={<FAQs />} />
          <Route path="/orders" element={<OrdersPage />} />{" "}
          {/* Add OrdersPage route */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
