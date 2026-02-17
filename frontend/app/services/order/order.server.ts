/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { OrdersResponse } from "../../types/order";
import { ApiResponse } from "../../types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getMyOrders(): Promise<OrdersResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token.value}`;
  }

  const res = await fetch(`${BASE_URL}/orders/my-orders`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch orders");
  }

  const json: ApiResponse<OrdersResponse> = await res.json();
  return json.data;
}
export async function getMyStatistics() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token.value}`;
  }
  const res = await fetch(`${BASE_URL}/orders/statistics`, {
    method: "GET",
    headers,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch orders");
  }
  
  return res.json();
}
export async function getAllOrders(
  status?: string,
  page = 1,
  limit = 20,
): Promise<{
  data: any;
  meta: ApiResponse<any>["meta"];
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token.value}`;
  }
  const params = new URLSearchParams();
  if (status) params.set("status", status.toString());
  params.set("page", String(page));
  params.set("limit", String(limit));
  const query = params.toString();
  const res = await fetch(`${BASE_URL}/orders/all?${query}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch orders");
  }

  return res.json();
}
