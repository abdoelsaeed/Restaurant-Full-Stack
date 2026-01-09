import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getMe() {
  // قراءة التوكن من الكوكيز
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return null;
  }

  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token.value}`, // ✅ أرسل التوكن في الهيدر
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data.data;
}
export async function forgotPasswordServices(email: string) {
  const res = await fetch(`${BASE_URL}/auth/forgetpassword`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Signup failed");
  }
  return;
}

export async function resetPasswordServices(
  email: string,
  newPassword: string,
  verification_Code: string
) {
  const res = await fetch(`${BASE_URL}/auth/resetpassword`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword, verification_Code }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || " failed");
  }
  return;
}
