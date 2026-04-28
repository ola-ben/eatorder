import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => favorites.some((r) => r.id === id);

  const toggleFavorite = (restaurant) => {
    setFavorites((prev) => {
      const exists = prev.some((r) => r.id === restaurant.id);
      if (exists) return prev.filter((r) => r.id !== restaurant.id);
      return [
        { ...restaurant, savedAt: new Date().toISOString() },
        ...prev,
      ];
    });
    return !isFavorite(restaurant.id);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((r) => r.id !== id));
  };

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
        count: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside <FavoritesProvider>");
  }
  return ctx;
}
