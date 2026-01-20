/* eslint-disable react/no-unescaped-entities */

import { FileText, Calendar, DollarSign, Package } from "lucide-react";
import { getMyOrders } from "../services/order/order.server";
import OrderCard from "../_components/OrderCard";
import { getMe } from "../services/auth/auth.server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getMe();

  if (!user) {
    redirect("/auth/login");
  }

  try {
    const ordersResponse = await getMyOrders();
    const orders = ordersResponse?.data || ordersResponse || [];

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h1 className="flex justify-center items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg mx-auto max-w-xs sm:max-w-sm md:max-w-md mb-3 sm:mb-4">
              <FileText size={32} className="sm:w-10 sm:h-10" />
              <span>My Orders</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg px-2">
              Track your order history and status
            </p>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <Package className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-400 dark:text-gray-500 text-sm sm:text-base px-4 max-w-md mx-auto">
                You haven't placed any orders yet. Start exploring our menu!
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 truncate">
                        Total Orders
                      </p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                        {orders.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 truncate">
                        Paid Orders
                      </p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                        {
                          orders.filter((order) => order.status === "paid")
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-700 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 truncate">
                        Pending
                      </p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                        {
                          orders.filter((order) => order.status === "pending")
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orders */}
              <div className="space-y-3 sm:space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center max-w-sm mx-auto">
          <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-red-400 dark:text-red-500 mb-3 sm:mb-4" />
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Failed to Load Orders
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            There was an error loading your orders. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}