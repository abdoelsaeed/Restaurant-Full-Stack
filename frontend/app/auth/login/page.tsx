"use client";

import { LoginForm } from "@/components/login-form";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reset = searchParams.get("reset");

  useEffect(() => {
    if (reset === "done") {
      toast.success("Password changed successfully🎉");

      router.replace("/auth/login");
    }
  }, [reset, router]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
