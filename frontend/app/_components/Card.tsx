/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Food } from "../types/food";
import { addToWishList } from "../services/food/food.client";
import { useRef, useState } from "react";
import { User } from "../types/user";
import { useRouter } from "next/navigation";
import { addToCartServices } from "../services/cart/cart.client";
import CartIcon from "./CartIcon";
import { addToGuestCart } from "../utils/cartStorage";
import { useCart } from "../context/cartContext";

export default function Card({ item, user }: { item: Food; user: User }) {
  const {
    name,
    price,
    discount,
    finalPrice,
    image,
    _id,
    isWishlisted = false,
  } = item;
  const { cartCount, refreshCartCount, setCartCount } = useCart();
  const [isWishlist, setIsWishlist] = useState<boolean>(isWishlisted);
  const cartIconRef = useRef<any>(null);

  const ingredientsText = item.ingredients.join(", ");
  const router = useRouter();

  async function handleAddToCart() {
    try {
      // 🎬 شغّل أنيميشن السلة
      cartIconRef.current?.play();
      if (!user) {
        // 👤 Guest user → localStorage
        setCartCount((prev) => prev + 1); // Update UI فوراً

        addToGuestCart(item);
        refreshCartCount(user); // ✅ Load initial count
        return;
      }
      setCartCount((prev) => prev + 1); // Update UI فوراً

      await addToCartServices(_id);
      refreshCartCount(user); // ✅ Load initial count
    } catch (error) {
      console.error("Error in handleAddToCart:", error);
    }
  }

  async function handelWatched() {
    try {
      if (!user) {
        router.push("/login");
        return;
      }
      setIsWishlist((prev) => !prev);
      await addToWishList(_id);
    } catch (error) {
      console.error("Error in handelWatched:", error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl border border-secondary/20 bg-white shadow-sm hover:shadow-md transition-all duration-300 h-full">
      {/* Image */}
      <div className="relative w-full md:w-[120px] h-[160px] md:h-[120px] rounded-2xl overflow-hidden border border-secondary/10 flex-shrink-0">
        <Image
          src={image}
          fill
          alt={name}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 120px"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h1 className="text-secondary font-semibold text-base md:text-lg">
            {name}
          </h1>
          <p className="text-sm text-secondary/70 line-clamp-2 mt-1">
            {ingredientsText}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Price */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-secondary font-medium">From</span>
            {(discount ?? 0) > 0 ? (
              <>
                <span className="line-through text-sm text-secondary/50">
                  ${price}
                </span>
                <span className="text-primary font-semibold text-lg">
                  ${finalPrice}
                </span>
              </>
            ) : (
              <span className="text-primary font-semibold text-lg">
                ${finalPrice}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* 🔴 زرار Add to cart القديم */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleAddToCart}
              className="bg-primary text-pureWhite hover:text-pure hover:bg-primary/90 py-4.5 flex items-center gap-2
              "
            >
              <CartIcon ref={cartIconRef} />
              Add to cart
            </Button>

            {/* ❤️ Wishlist */}
            <Button
              variant="outline"
              size="icon"
              aria-label="wishlist"
              onClick={handelWatched}
              className={`
                shrink-0 transition-colors
                ${
                  isWishlist
                    ? "bg-primary text-white border-primary hover:bg-primary"
                    : ""
                }
              `}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
