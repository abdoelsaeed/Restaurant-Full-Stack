"use client";

import { ReactNode } from "react";
import { CartProvider } from "./context/cartContext";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster
        position="top-center"
        offset={150}
        richColors
        closeButton
      />
    </CartProvider>
  );
}
