import { Food } from "@/app/types/food";
import { addToCartServices } from "../services/cart/cart.client";

const CART_KEY = "guest_cart";

export interface GuestCartItem extends Food {
  quantity: number;
}

/* =============================
   Get Guest Cart
============================= */
export function getGuestCart(): GuestCartItem[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(CART_KEY);
  if (!data) return [];

  try {
    return JSON.parse(data) as GuestCartItem[];
  } catch {
    return [];
  }
}

/* =============================
   ADD (زي ما كانت 👌)
============================= */
export function addToGuestCart(item: Food) {
  const cart = getGuestCart();

  const existing = cart.find((p) => p._id === item._id);

  if (existing) {
    existing.quantity += 1; // لو موجود زوّد
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* =============================
   UPDATE QUANTITY (جديدة ✅)
============================= */
export function updateGuestCartQuantity(foodId: string, quantity: number) {
  if (quantity < 1) return;

  const cart = getGuestCart();

  const item = cart.find((p) => p._id === foodId);
  if (!item) return;

  item.quantity = quantity;

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* =============================
   REMOVE ITEM
============================= */
export function removeFromGuestCart(foodId: string) {
  const cart = getGuestCart().filter((item) => item._id !== foodId);

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* =============================
   CLEAR CART
============================= */
export function clearGuestCart() {
  localStorage.removeItem(CART_KEY);
}

export async function mergeGuestCart() {
  if (typeof window === "undefined") return;

  const data = localStorage.getItem(CART_KEY);

  // 👇 مفيش كارت؟ خلاص
  if (!data) return;

  const guestCart = getGuestCart();

  // 👇 موجود بس فاضي
  if (guestCart.length === 0) {
    clearGuestCart();
    return;
  }

  for (const item of guestCart) {
    await addToCartServices(item._id, item.quantity);
  }

  clearGuestCart();
}
