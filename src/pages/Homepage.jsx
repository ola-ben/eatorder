import { useEffect } from "react";
import HomeHero from "../components/HomeHero";
import { FeaturedRestaurants } from "../components/FeaturedRestaurants";
import BottomNav from "../components/BottomNav";

export default function Homepage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-canvas pb-safe-nav">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <HomeHero />
        <FeaturedRestaurants />
      </div>
      <BottomNav />
    </main>
  );
}
