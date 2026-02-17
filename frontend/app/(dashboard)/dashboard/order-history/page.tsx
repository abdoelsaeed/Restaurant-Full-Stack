/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginationComponent } from "@/app/_components/PaginationComponent";
import { getAllOrders } from "@/app/services/order/order.server";
import Filter from "../_components/Filter";
import NotFound from "../_components/NotFound";

interface PageProps {
  searchParams: Promise<{
    status?: string;
    page?: string;
  }>;
}
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = params.status ?? "";

  const page = Number(params.page) || 1;
  const { data, meta } = await getAllOrders(status, page);
  if (!data || data.length === 0) { return <NotFound/>; }

  return (
        <div className="px-5 mt-section">
            <Filter goToPage="dashboard/order-history"/>
            <table className="w-full mt-section text-sm">
            <thead className="border-b border-[#414448]/60">
                <tr className="text-neutral-400">
                <th className="pb-4 text-left font-medium tracking-wide">#</th>
                <th className="pb-4 text-left font-medium tracking-wide">Customer Email</th>
                <th className="pb-4 text-left font-medium tracking-wide">Total</th>
                <th className="pb-4 text-left font-medium tracking-wide">Date</th>
                <th className="pb-4 text-center font-medium tracking-wide">Status</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-[#2a2d31]">
                {data?.map((item: any, i: number) => (
                <tr
                    key={item._id}
                    className="hover:bg-[#1f2125] transition-colors duration-200"
                >
                    {/* Index */}
                    <td className="py-4 text-neutral-400">
                    {i + 1}
                    </td>

                    {/* Email */}
                    <td className="py-4 font-medium text-white">
                    {item.email}
                    </td>

                    {/* Amount */}
                    <td className="py-4 font-semibold text-white">
                    ${item.amount.toLocaleString()}
                    </td>

                    {/* Date */}
                    <td className="py-4 text-neutral-400">
                    {new Date(item.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                    </td>

                    {/* Status */}
                    <td className="py-4 text-center">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide
                        ${
                            item.status === "paid"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-yellow-500/15 text-yellow-400"
                        }`}
                    >
                        {item.status.toUpperCase()}
                    </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

            {meta && (
            <PaginationComponent
                meta={meta}
                pageName="dashboard/order-history"
                activeClassName="bg-[#212429] text-pureWhite"
            />
            )}

        </div>
  )
};
