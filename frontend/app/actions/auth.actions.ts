/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import {
  forgotPasswordServices,
  resetPasswordServices,
} from "../services/auth/auth.server";

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    throw new Error("Email is required");
  }

  await forgotPasswordServices(email);

  redirect(`/auth/verify-reset?email=${email}`);
}

export async function resetPasswordAction(
  prevState: any,
  formData: FormData
) {
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
