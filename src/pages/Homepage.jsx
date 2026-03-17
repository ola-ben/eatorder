import Header from "../components/Header";
import Loginbtn from "../components/Loginbtn";
import Cartbtn from "../components/Cartbtn";
import { FeaturedRestaurants } from "../components/FeaturedRestaurants";

export default function Homepage() {
  return (
    <section className="relative">
      <Loginbtn />
      <Header />
      <FeaturedRestaurants />
      <Cartbtn />
    </section>
  );
}
