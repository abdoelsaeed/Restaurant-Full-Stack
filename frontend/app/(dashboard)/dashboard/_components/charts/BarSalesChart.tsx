"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import SalesGroupBySelector from "../SalesGroupBySelector";

type DailyPeriod = string;
type MonthlyPeriod = string;
type WeeklyPeriod = { year: number; week: number };

type SalesItem = {
  revenue: number;
  period: DailyPeriod | MonthlyPeriod | WeeklyPeriod;
};

export function BarSalesChart({
  salesOverTime,
}: {
  salesOverTime: SalesItem[];
}) {
  const searchParams = useSearchParams();
  const groupBy = searchParams.get("groupBy") || "daily";

  const formattedData = React.useMemo(() => {
    return salesOverTime.map((item) => {
      // DAILY
      if (groupBy === "daily" && typeof item.period === "string") {
        const date = new Date(item.period);

        return {
          label: date.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          }),
          revenue: item.revenue,
        };
      }

      // MONTHLY
      if (groupBy === "monthly" && typeof item.period === "string") {
        const [year, month] = item.period.split("-");
        const date = new Date(Number(year), Number(month) - 1);

        return {
          label: date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
          revenue: item.revenue,
        };
      }

      // WEEKLY
      if (groupBy === "weekly" && typeof item.period === "object") {
        return {
          label: `Week ${item.period.week} (${item.period.year})`,
          revenue: item.revenue,
        };
      }

      return {
        label: "",
        revenue: item.revenue,
      };
    });
  }, [salesOverTime, groupBy]);

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="bg-linear-to-b from-[#25262a] via-[#383d45] to-[#32343a] text-white">
      <CardHeader className="flex justify-between ">
        <div>
          <CardTitle>
            {groupBy === "daily" && "Daily Revenue"}
            {groupBy === "weekly" && "Weekly Revenue"}
            {groupBy === "monthly" && "Monthly Revenue"}
          </CardTitle>
          <CardDescription>Sales over selected period</CardDescription>
        </div>
        <div><SalesGroupBySelector/></div>
      </CardHeader>

      <CardContent className="h-112.5">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
            >
              <CartesianGrid vertical={false} strokeOpacity={0.1} />

              <XAxis
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />

              <YAxis
                width={60}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => {
                  if (value >= 1_000_000)
                    return `$${(value / 1_000_000).toFixed(1)}M`;
                  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
                  return `$${value}`;
                }}
              />

              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              <Bar
                dataKey="revenue"
                fill="var(--color-revenue)"
                radius={[6, 6, 0, 0]}
                barSize={55}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
