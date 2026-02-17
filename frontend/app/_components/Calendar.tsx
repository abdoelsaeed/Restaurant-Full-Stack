"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";

export function CalendarComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  function updateQueryParams(range: DateRange | undefined) {
    if (!range?.from || !range?.to) return;

    const queryParams = new URLSearchParams(searchParams.toString());

    queryParams.set("from", format(range.from, "yyyy-MM-dd"));
    queryParams.set("to", format(range.to, "yyyy-MM-dd"));

    setDateRange(range);

    router.push(`?${queryParams.toString()}`, { scroll: false });
  }

  const label = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
      : format(dateRange.from, "MMM dd, yyyy")
    : "Select date range";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 min-w-67.5 justify-start gap-2 border-white/10 bg-[#42474A] px-3 text-left font-medium text-[#E1E1E1] shadow-sm hover:bg-[#4b5054] hover:text-white"
        >
          <CalendarIcon className="h-4 w-4 text-[#C4C4C4]" />
          <span className="truncate">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-auto border-white/10 bg-linear-to-b from-[#2e3238] via-[#383f47] to-[#2e3238] p-2 text-[#E1E1E1] shadow-xl shadow-black/40"
      >
        <Calendar
          mode="range"
          captionLayout="dropdown"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={updateQueryParams}
          numberOfMonths={2}
          disabled={(date: Date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          className="rounded-xl border border-white/10 bg-transparent p-1 [&_button[data-range-end=true]]:bg-[#fa960f]! [&_button[data-range-end=true]]:text-white! [&_button[data-range-middle=true]]:bg-[#fa960f]/20! [&_button[data-range-middle=true]]:text-[#F3F4F6]! [&_button[data-range-start=true]]:bg-[#f5440b]! [&_button[data-range-start=true]]:text-white! [&_button[data-selected-single=true]]:bg-[#f5440b]! [&_button[data-selected-single=true]]:text-white! [&_td_button]:text-[#E5E7EB] [&_td_button]:hover:bg-white/10"
        />
      </PopoverContent>
    </Popover>
  );
}
