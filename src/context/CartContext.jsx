// CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotalPrice(total);
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.name === item.name);
      if (existing) {
        return prev.map((p) =>
          p.name === item.name ? { ...p, quantity: p.quantity + 1 } : p,
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (name) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, totalPrice, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
