import { Header } from "../../../Header";
import { Menu } from "../../../menu";
import Loginbtn from "../../../Loginbtn";
import Cartbtn from "../../../Cartbtn";

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
