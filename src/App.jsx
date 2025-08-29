import { Header } from "../Header";
import { Menu } from "../menu";
import Loginsignup from "../Loginsignup";
import Loginbtn from "../Loginbtn";

export default function App() {
  return (
    <section className="">
      <Loginbtn />
      <Loginsignup />
      <Header />
      <Menu />
    </section>
  );
}
