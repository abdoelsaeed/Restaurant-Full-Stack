
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;



export async function addToWishList(id: string) {
  const res = await fetch(`/api/wishlist/${id}`, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to add to wishlist");
  }

  return res.json();
}
