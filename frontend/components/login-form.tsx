/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/app/_components/SubmitButton";
import { loginService } from "@/app/services/auth/auth.client";
import { toast } from "sonner";
import { useState } from "react";
import { mergeGuestCart } from "@/app/utils/cartStorage";
import { Button } from "./ui/button";
import Link from "next/link";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginService(email, password);
      const role = res?.data?.role;

      await new Promise((r) => setTimeout(r, 300));
      await mergeGuestCart();
      if (role === "Admin") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/?login=success";
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Field>
              <SubmitButton text={loading ? "Logging in..." : "Login"} />
            </Field>
            <div className="flex ">
              <Link href="/auth/forgot-password">
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Button>
              </Link>
            </div>{" "}
            <FieldDescription className="text-center">
              Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
