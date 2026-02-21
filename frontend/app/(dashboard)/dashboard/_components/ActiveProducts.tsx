"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ActiveProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const active = searchParams.get("active") || "all";
  const [activeFilter, setActiveFilter] = useState<string>(active || 'all');

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("active");
    } else if (value === "active") {
      params.set("active", "true");
    } else if (value === "notActive") {
      params.set("active", "false");
    }

    setActiveFilter(value);

    const query = params.toString();
    console.log(query);
    router.push(`/dashboard/product-management${query ? `?${query}` : ""}`);
  }

  const baseBtn =
    "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300";

  const activeStyle =
    "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20";

  const inactiveStyle = "text-gray-200 hover:text-white hover:bg-white/5";

  return (
    <div className="flex items-center gap-2 bg-[#2a2d33] border border-white/5 rounded-full p-2 backdrop-blur-md w-fit">
      <button
        onClick={() => handleClick("all")}
        className={`${baseBtn} ${
          activeFilter === "all" ? activeStyle : inactiveStyle
        }`}
      >
        All
      </button>

      <button
        onClick={() => handleClick("active")}
        className={`${baseBtn} ${
          activeFilter === "active" ? activeStyle : inactiveStyle
        }`}
      >
        Active
      </button>

      <button
        onClick={() => handleClick("notActive")}
        className={`${baseBtn} ${
          activeFilter === "notActive" ? activeStyle : inactiveStyle
        }`}
      >
        Not Active
      </button>
    </div>
  );
}
