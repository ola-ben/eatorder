import Header from "../components/Header";
import { Menu } from "../components/Menu";
import Loginbtn from "../components/Loginbtn"; // Add Loginbtn back
import Cartbtn from "../components/Cartbtn";

export default function Homepage() {
  return (
    <section>
      <Loginbtn /> {/* This will now only show on homepage */}
      <Header />
      <Menu />
      <Cartbtn />
    </section>
  );
}
