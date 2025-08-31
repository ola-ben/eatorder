import { Header } from "../Header";
import { Menu } from "../menu";
import Loginsignup from "../Loginsignup";
import Loginbtn from "../Loginbtn";
import Cartbtn from "../Cartbtn";
import Cartpage from "./assets/pages/Cartpage";
import Checkoutpage from "./assets/pages/Checkoutpage";

export default function App() {
  return (
    <section className="">
      <Loginbtn />
      <Loginsignup />
      <Header />
      <Menu />
      <Cartbtn />
      <Cartpage />
      <Checkoutpage />
    </section>
  );
}
