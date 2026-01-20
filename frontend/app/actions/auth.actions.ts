/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import {
  forgotPasswordServices,
  resetPasswordServices,
} from "../services/auth/auth.server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";
export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    throw new Error("Email is required");
  }

  await forgotPasswordServices(email);

  redirect(`/auth/verify-reset?email=${email}`);
}

export async function resetPasswordAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("newPassword");
  const verification_Code = formData.get("verification_Code");

  if (!email || typeof email !== "string") {
    return { error: "Email is required" };
  }

  if (!password || typeof password !== "string") {
    return { error: "Password is required" };
  }

  if (!verification_Code || typeof verification_Code !== "string") {
    return { error: "Verification code is required" };
  }

  try {
    await resetPasswordServices(email, password, verification_Code);
  } catch (err: any) {
    return {
      error: err.message || "Invalid verification code",
    };
  }
  redirect("/auth/login?reset=done");
}

export async function updateProfileAction(formData: {
  name: string;
  email: string;
  phone_number: string;
  age: string;
  address: string;
}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return { error: "Unauthorized" };
    }

    const response = await fetch(`${BASE_URL}/auth/update-profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Failed to update profile" };
    }

    // Revalidate the profile page to show updated data
    revalidatePath("/profile");

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Profile update error:", error);
    return { error: "Failed to update profile" };
  }
}
