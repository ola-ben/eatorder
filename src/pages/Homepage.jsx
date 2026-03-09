import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import Loginbtn from "../components/Loginbtn";
import Cartbtn from "../components/Cartbtn";


export default function Homepage() {
  return (
    <section>
      <Loginbtn />
      <Header />
      <Menu />
      <Cartbtn />
    </section>
  );
}
