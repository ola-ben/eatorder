import { BrowserRouter, Routes, Route } from "react-router";
import Loginformpage from "./pages/Loginformpage";
import Homepage from "./pages/Homepage";
import Cartpage from "./pages/Cartpage";
import Checkoutpage from "./pages/Checkoutpage";

export default function App() {
  return (
    <section className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="cartpage" element={<Cartpage />} />
          <Route path="checkoutpage" element={<Checkoutpage />} />
          <Route path="logiformpage" element={<Loginformpage />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}
