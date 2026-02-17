"use client";
import { ApiResponse } from "./../../types/api";
import { Cart } from "../../types/cart";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
export async function addToCartServices(
  foodId: string,
  quantity?: number
): Promise<Cart> {
  const res = await fetch(`/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ foodId, quantity }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => {});
    throw new Error(error.message || "Failed to add to cart");
  }
  const json: ApiResponse<Cart> = await res.json();
  return json.data;
}

export async function updateCartQuantity(
  foodId: string,
  quantity: number
): Promise<Cart> {
  const res = await fetch(`/api/cart/item/${foodId}`, {
    // ✅ foodId
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ quantity }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => {});
    throw new Error(error.message || "Failed to update quantity");
  }

  const json: ApiResponse<Cart> = await res.json();
  return json.data;
}

export async function countMyCart(): Promise<{
  count: number;
  hasItems: boolean;
}> {
  const res = await fetch(`/api/cart/count`, {
    credentials: "include",
  });

  if (!res.ok) {
    return { count: 0, hasItems: false };
  }

  const json: ApiResponse<{ count: number; hasItems: boolean }> =
    await res.json();
  return json.data;
}

export async function deleteCartItem(itemId: string): Promise<Cart | null> {
  const res = await fetch(`/api/cart/item/${itemId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => {});
    throw new Error(error.message || "Failed to delete item");
  }

  const json: ApiResponse<Cart> = await res.json();
  return json.data;
}

export async function createCheckoutSession() {
  const res = await fetch(`/api/orders`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => {});
    throw new Error(error.message || "Failed to delete item");
  }
  return res.json();
}
