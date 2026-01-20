/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/app/_components/CartIcon.tsx

"use client";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import cartAnimation from "@/public/animations/cart.json";
import { forwardRef, Ref } from "react";

interface CartIconProps {
  onComplete?: () => void;
}

// استخدم Ref<LottieRefCurrentProps> بدلاً من LottieRefCurrentProps مباشرة
const CartIcon = forwardRef<LottieRefCurrentProps, CartIconProps>(
  ({ onComplete }, ref) => {
    return (
      <Lottie
        // استخدم type assertion أو null check
        lottieRef={ref as any}
        animationData={cartAnimation}
        autoplay={false}
        loop={false}
        onComplete={onComplete}
        style={{ width: 24, height: 24 }}
      />
    );
  }
);

CartIcon.displayName = "CartIcon";

export default CartIcon;
