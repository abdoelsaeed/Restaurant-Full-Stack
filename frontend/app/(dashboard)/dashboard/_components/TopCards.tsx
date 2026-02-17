import TopCard from "./TopCard";

type TopCardsProps = {
  summary: { revenue: number; orders: number; aov: number };
  ordersByStatus: { status: string; count: number }[];
};

export default function TopCards({ summary, ordersByStatus }: TopCardsProps) {
  const paidOrders =
    ordersByStatus?.find((item) => item.status === "paid")?.count ?? 0;
  const pendingOrders =
    ordersByStatus?.find((item) => item.status === "pending")?.count ?? 0;

  const formatCurrency = (value?: number) =>
    value == null
      ? "$0"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(value);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      <div className="min-h-22 flex ">
        <TopCard
          p="Total Gross Revenue"
          h1={formatCurrency(summary?.revenue)}
        />
      </div>
      <div className="min-h-22 flex ">
        <TopCard p="AOV" h1={formatCurrency(summary?.aov)} />
      </div>
      <div className="min-h-22 flex">
        <TopCard p="Total Orders" h1={`${summary?.orders ?? 0}`} />
      </div>
      <div className="min-h-22 flex ">
        <TopCard p="Paid Orders" h1={`${paidOrders}`} />
      </div>
      <div className="min-h-22 flex">
        <TopCard p="Pending Orders" h1={`${pendingOrders}`} />
      </div>
    </div>
  );
}
