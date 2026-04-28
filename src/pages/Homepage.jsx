import { useEffect } from "react";
import HomeHero from "../components/HomeHero";
import { FeaturedRestaurants } from "../components/FeaturedRestaurants";
import BottomNav from "../components/BottomNav";
import TopNav from "../components/TopNav";

export default function Homepage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-canvas pb-safe-nav lg:pb-0">
      <TopNav />
      <div className="bg-white lg:bg-transparent lg:max-w-7xl lg:mx-auto lg:px-6 lg:py-6 max-w-md mx-auto min-h-screen lg:min-h-0">
        <HomeHero />
        <FeaturedRestaurants />
      </div>
      <BottomNav />
    </main>
  );
}
