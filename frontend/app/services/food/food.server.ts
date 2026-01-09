"use server"
import { cookies } from "next/headers";
import { ApiResponse } from "../../types/api";
import { Food, HomeData } from "../../types/food";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getHome(): Promise<HomeData> {
  const res = await fetch(
    `${BASE_URL}/food/home`,
    { cache: "no-store" } // أو revalidate
  );

  if (!res.ok) {
    throw new Error("Failed to fetch home data");
  }

  const json: ApiResponse<HomeData> = await res.json();

  return json.data;
}

export async function getMenu(
  q?: string,
  page = 1
): Promise<{
  data: Food[];
  meta: ApiResponse<Food[]>["meta"];
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const params = new URLSearchParams();
  if (q) params.set("q", q);
  params.set("page", page.toString());

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token.value}`;
  }

  const res = await fetch(
    `${BASE_URL}/food/menu?${params.toString()}&limit=12`,
    { headers, cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch menu data");
  }
  const json: ApiResponse<Food[]> = await res.json();

  return { data: json.data, meta: json.meta };
}
