// app/checkout/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "../services/cart/cart.client";
import { User } from "../types/user";

export default function CheckoutPage({user}:{user:User}) {
  // Handle Stripe checkout here

  const handleStripeCheckout = async () => {
    if(!user ) window.location.href='/auth/login'
    const { url } = await createCheckoutSession();
    window.location.href = url;
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <Button onClick={handleStripeCheckout} className="w-full">
        Pay with Stripe
      </Button>
    </div>
  );
}
