"use client";

import {
  Calendar,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { Order } from "../types/order";
import { useTheme } from "next-themes";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const { resolvedTheme } = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return resolvedTheme === 'dark'
          ? "text-green-400 bg-green-900/20"
          : "text-green-600 bg-green-100";
      case "pending":
        return resolvedTheme === 'dark'
          ? "text-yellow-400 bg-yellow-900/20"
          : "text-yellow-600 bg-yellow-100";
      case "cancelled":
        return resolvedTheme === 'dark'
          ? "text-red-400 bg-red-900/20"
          : "text-red-600 bg-red-100";
      default:
        return resolvedTheme === 'dark'
          ? "text-gray-400 bg-gray-700"
          : "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "pending":
        return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "cancelled":
        return <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      default:
        return <Package className="w-3 h-3 sm:w-4 sm:h-4" />;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md dark:hover:shadow-lg transition-shadow`}>
      {/* Order Header */}
      <div className={`bg-gray-50 dark:bg-dark-bg px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 dark:border-gray-600`}>
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                Order #{order._id.slice(-8).toUpperCase()}
              </span>
            </div>
            <div
              className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start sm:self-center ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusIcon(order.status)}
              <span className="capitalize">{order.status}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-primary">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>{formatPrice(order.amount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg`}
            >
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-white dark:bg-gray-600 flex-shrink-0">
                <Image
                  src={item.image || "/placeholder-food.png"}
                  alt={item.productName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 48px, 64px"
                />
              </div>

              <div className="flex-1 min-w-0 w-full sm:w-auto">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                  {item.productName}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="text-right self-end sm:self-center">
                <p className="font-semibold text-primary text-sm sm:text-base">
                  {formatPrice(item.price)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">per item</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Total */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
              Total Amount:
            </span>
            <span className="text-lg sm:text-xl font-bold text-primary">
              {formatPrice(order.amount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}