/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
// app/context/cartContext.tsx

"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { countMyCart } from "../services/cart/cart.client";
import { getGuestCart } from "../utils/cartStorage";

type CartContextType = {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  refreshCartCount: (user: any) => void; // ✅ أضف ده
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const [cartCount, setCartCount] = useState(0);

  // ✅ Function عشان تحديث الـ count
  const refreshCartCount = async (currentUser: any) => {
    if (currentUser) {
      // Authenticated user
      const data = await countMyCart();
      setCartCount(data.count);
    } else {
      // Guest user
      const guestCart = getGuestCart();
      setCartCount(guestCart.length);
    }
  };

  // ✅ Load initial count
  useEffect(() => {
    refreshCartCount(user);
  }, [user]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
