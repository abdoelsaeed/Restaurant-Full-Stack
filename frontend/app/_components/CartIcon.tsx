"use client";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import cartAnimation from "@/public/animations/cart.json";
import { forwardRef } from "react";

interface CartIconProps {
  onComplete?: () => void;
}

const CartIcon = forwardRef<LottieRefCurrentProps, CartIconProps>(
  ({ onComplete }, ref) => {
    return (
      <Lottie
        lottieRef={ref}
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
