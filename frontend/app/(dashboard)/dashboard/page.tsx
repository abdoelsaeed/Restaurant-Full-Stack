/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderList from "./_components/OrderList";
import { getAllOrders } from "@/app/services/order/order.server";
import CardOrder from "./_components/CardOrder";
import { PaginationComponent } from "@/app/_components/PaginationComponent";
import NotFound from "./_components/NotFound";

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
    <div className="px-5 py-3">
      <div>
        <OrderList/>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))]">
          {data.map((order:any,i:number) => (
            <CardOrder
            key={order._id}
            amount={order.amount}
            status={order.status}
            items={order.items}
            email={order.email}
            updatedAt={order.updatedAt}
            i={i}
            />
          ))}
        </div>
      </div>
      {meta && (
        <PaginationComponent
          meta={meta}
          pageName="dashboard"
          activeClassName="bg-[#212429] text-pureWhite"
        />
      )}
  </div>
  )
}
