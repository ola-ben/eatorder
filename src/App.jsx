// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Loginformpage from "./pages/Loginformpage";
import Homepage from "./pages/Homepage";
import Cartpage from "./pages/Cartpage";
import Checkoutpage from "./pages/Checkoutpage";
import Successpage from "./pages/Successpage";
import Profile from "./pages/Profile";

import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* Toast container (must be here once) */}
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
          <Route path="cartpage" element={<Cartpage />} />
          <Route path="checkoutpage" element={<Checkoutpage />} />
          <Route path="logiformpage" element={<Loginformpage />} />
          <Route path="successpage" element={<Successpage />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
