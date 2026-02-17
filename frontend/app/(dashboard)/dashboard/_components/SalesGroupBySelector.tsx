"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const options = ["Daily", "Weekly", "Monthly"];

export default function SalesGroupBySelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupBy = searchParams.get("groupBy") || "daily";
  const [selected, setSelected] = useState(groupBy);
  function handleClick(option: string) {
    setSelected(option);
    const params = new URLSearchParams(searchParams.toString());
    params.set("groupBy", option.toLowerCase());
    router.push(`?${params.toString()}`,{scroll:false});
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#42474a] hover:bg-[#495054] hover:text-white text-white flex items-center gap-2"
        >
          <CalendarDays size={16} />
          {selected}
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="bg-[#42474a] text-white w-40 p-2 hover:text-white">
        <div className="flex flex-col gap-1 hover:text-white">
          {options.map((option) => (
            <Button
              key={option}
              variant="ghost"
              onClick={() => handleClick(option)}
              className={`justify-start text-white hover:text-white hover:bg-[#495054] ${
                selected === option && "bg-[#495054] "
              }`}
            >
              {option}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
