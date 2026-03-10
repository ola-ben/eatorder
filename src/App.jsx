// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginformpage from "./pages/Loginformpage";
import Homepage from "./pages/Homepage";
import Cartpage from "./pages/Cartpage";
import Checkoutpage from "./pages/Checkoutpage";
import Successpage from "./pages/Successpage";
import Profile from "./pages/Profile"; // Profile page import
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="cartpage" element={<Cartpage />} />
          <Route path="checkoutpage" element={<Checkoutpage />} />
          <Route path="logiformpage" element={<Loginformpage />} />
          <Route path="successpage" element={<Successpage />} />
          <Route path="profile" element={<Profile />} /> {/* Profile route */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
