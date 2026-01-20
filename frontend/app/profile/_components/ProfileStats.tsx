"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingCart,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "next-themes";

type ProfileStatsProps = {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  totalSpent: number;
  reviewsGiven: number;
};

export default function ProfileStats({
  totalOrders,
  completedOrders,
  pendingOrders,
  reviewsGiven,
  totalSpent,
}: ProfileStatsProps) {
  const { resolvedTheme } = useTheme();

  const statItems = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      color: "text-primary",
      bgColor: resolvedTheme === 'dark' ? "bg-primary/20" : "bg-primary/10",
      textColor: resolvedTheme === 'dark' ? "text-gray-300" : "text-gray-600",
    },
    {
      label: "Completed",
      value: completedOrders,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: resolvedTheme === 'dark' ? "bg-green-900/20" : "bg-green-50",
      textColor: resolvedTheme === 'dark' ? "text-gray-300" : "text-gray-600",
    },
    {
      label: "Pending",
      value: pendingOrders,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: resolvedTheme === 'dark' ? "bg-yellow-900/20" : "bg-yellow-50",
      textColor: resolvedTheme === 'dark' ? "text-gray-300" : "text-gray-600",
    },
    {
      label: "Reviews",
      value: reviewsGiven,
      icon: Star,
      color: "text-orange-600",
      bgColor: resolvedTheme === 'dark' ? "bg-orange-900/20" : "bg-orange-50",
      textColor: resolvedTheme === 'dark' ? "text-gray-300" : "text-gray-600",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Account Statistics
        </CardTitle>
        <CardDescription>
          Your activity summary and achievements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-4 rounded-lg transition-all duration-200 hover:shadow-md ${stat.bgColor}`}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className={`text-sm font-medium ${stat.textColor}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Total Spent */}
        <div className={`mt-6 p-4 rounded-lg border ${
          resolvedTheme === 'dark' 
            ? 'bg-gradient-to-r from-primary/10 to-primary/20 border-primary/30' 
            : 'bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-semibold ${
                resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Total Spent
              </h4>
              <p className={`text-sm ${
                resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Lifetime expenditure
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                ${totalSpent?.toFixed(2)}
              </p>
              <p className={`text-xs ${
                resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                USD
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}