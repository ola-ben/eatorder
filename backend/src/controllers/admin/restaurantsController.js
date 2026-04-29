// TODO: replace with Supabase `restaurants` table queries.
// import { supabaseAdmin } from "../../db/supabase.js";

const mockRestaurants = [
  { id: "item-7-go-iwo-road", name: "Item 7 Go Iwo Road", rating: 4.5, isOpen: true },
  { id: "shrider-store", name: "Shrider Store", rating: 5.0, isOpen: true },
  { id: "taste-of-lagos", name: "Taste of Lagos", rating: 4.8, isOpen: true },
  { id: "buka-joint", name: "Buka Joint", rating: 4.3, isOpen: true },
  { id: "spice-route", name: "Spice Route", rating: 4.7, isOpen: true },
  { id: "chicken-republic", name: "Chicken Republic", rating: 4.4, isOpen: true },
  { id: "dominos-pizza", name: "Domino's Pizza", rating: 4.6, isOpen: true },
  { id: "kfc", name: "KFC", rating: 4.3, isOpen: true },
];

export async function listRestaurants(req, res) {
  res.json({ restaurants: mockRestaurants, total: mockRestaurants.length });
}

export async function toggleRestaurantOpen(req, res) {
  const r = mockRestaurants.find((x) => x.id === req.params.id);
  if (!r) return res.status(404).json({ error: "Restaurant not found" });
  r.isOpen = !r.isOpen;
  res.json({ restaurant: r });
}
