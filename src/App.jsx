import { BrowserRouter, Routes, Route } from "react-router";
import Loginformpage from "./assets/pages/Loginformpage";
import Homepage from "./assets/pages/Homepage";
import Cartpage from "./assets/pages/Cartpage";
import Checkoutpage from "./assets/pages/Checkoutpage";

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
