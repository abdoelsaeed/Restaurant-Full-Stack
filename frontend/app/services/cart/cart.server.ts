import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getMyCartServices() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token.value}`;
    }
    const res = await fetch(`${BASE_URL}/cart`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch {
    return null;
  }
}
