"use client";
import { SignUpForm } from "../../types/user";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function loginService(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error("Invalid email or password");
  }

  return res.json();
}

export async function signupService(data: SignUpForm) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Signup failed");
  }
  return res.json();
}

export async function logoutService() {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Some thing wrong");
  }
  return res.json();
}
