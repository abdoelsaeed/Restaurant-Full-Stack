"use client";

import { LoginForm } from "@/components/login-form";
import { toast } from "sonner";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// ✅ Component منفصل لـ search params logic
function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reset = searchParams.get("reset");

  useEffect(() => {
    if (reset === "done") {
      toast.success("Password changed successfully🎉");
      router.replace("/auth/login");
    }
  }, [reset, router]);

  return <LoginForm />;
}

// Loading fallback للـ Suspense
function LoginFallback() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<LoginFallback />}>
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}
