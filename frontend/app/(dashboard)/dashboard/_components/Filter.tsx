/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type StatusFilter = "all" | "pending" | "paid";

export default function Filter({goToPage}:{goToPage?:string}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStatus = (searchParams.get("status") as StatusFilter) || "all";
  const [status, setStatus] = useState<StatusFilter>(initialStatus);
  function handleClick(status: StatusFilter) {
    setStatus(status);
    const params = new URLSearchParams(searchParams.toString());
    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status.toString());
    }
    const query = params.toString();
    router.push(`/${goToPage ? goToPage : "dashboard"}${query ? `?${query}` : ""}`);
  }
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-300">
          Filter by status
        </p>
        <p className="text-sm text-neutral-400">
          Choose which orders appear in the list
        </p>
      </div>
      <div
        role="tablist"
        aria-label="Order status filter"
        className="flex items-center rounded-full border border-neutral-200 bg-neutral-50 p-1 shadow-sm"
      >
        <button
          type="button"
          role="tab"
          onClick={() => handleClick("all")}
          aria-selected={status === "all"}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 ${
            status === "all"
              ? "bg-white text-slate-700 shadow"
              : "text-neutral-600 hover:text-neutral-800 hover:text-slate-700"
          }`}
        >
          All
        </button>
        <button
          type="button"
          role="tab"
          onClick={() => handleClick("pending")}
          aria-selected={status === "pending"}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 ${
            status === "pending"
              ? "bg-white text-yellow-700 shadow"
              : "text-neutral-600 hover:text-neutral-800 hover:text-yellow-700"
          }`}
        >
          Pending
        </button>
        <button
          type="button"
          role="tab"
          onClick={() => handleClick('paid')}
          aria-selected={status === "paid"}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
            status === "paid"
              ? "bg-white text-emerald-700 shadow"
              : "text-neutral-600 hover:text-neutral-800 hover:text-emerald-700"
          }`}
        >
          Paid
        </button>
      </div>
    </div>
  );
}
