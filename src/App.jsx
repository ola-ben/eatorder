import { Header } from "../Header";
import { Menu } from "../menu";
import Loginsignup from "../Loginsignup";
import Loginbtn from "../Loginbtn";
import Cartbtn from "../Cartbtn";

export default function App() {
  return (
    <section className="">
      <Loginbtn />
      <Loginsignup />
      <Header />
      <Menu />
      <Cartbtn />
    </section>
  );
}
