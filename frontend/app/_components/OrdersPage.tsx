/* eslint-disable react/no-unescaped-entities */
// frontend/app/order/page.tsx

import { FileText, Calendar, DollarSign, Package } from "lucide-react";
import { getMyOrders } from "../services/order/order.server";
import OrderCard from "../_components/OrderCard";
import { getMe } from "../services/auth/auth.server";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const user = await getMe();

  if (!user) {
    redirect("/auth/login");
  }

  try {
    const ordersResponse = await getMyOrders();
    const orders = ordersResponse?.data || [];

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="flex justify-center items-center gap-3 text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-4 rounded-2xl shadow-lg mx-auto max-w-md mb-4">
              <FileText size={40} className="text-white" />
              <span>My Orders</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Track your order history and status
            </p>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-24 h-24 mx-auto text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-500 mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-400 mb-6">
                You haven't placed any orders yet. Start exploring our menu!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Orders
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {orders.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Paid Orders
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          orders.filter((order) => order.status === "paid")
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Calendar className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Pending
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
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
              <div className="space-y-4">
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto text-red-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            Failed to Load Orders
          </h2>
          <p className="text-gray-500">
            There was an error loading your orders. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
