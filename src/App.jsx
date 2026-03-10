// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginformpage from "./pages/Loginformpage";
import Homepage from "./pages/Homepage";
import Cartpage from "./pages/Cartpage";
import Checkoutpage from "./pages/Checkoutpage";
import Successpage from "./pages/Successpage"; // Your success page
import { CartProvider } from "./context/CartContext"; // Cart context provider

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
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
