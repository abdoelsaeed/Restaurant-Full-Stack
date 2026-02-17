import { getStatisticsPage } from "@/app/services/dashboard/dashboard.server";
import TopCards from "../_components/TopCards";
import { OrdersPieChart } from "../_components/charts/OrdersPieChart";
import ListTop from "../_components/ListTop";
import HeaderStatistics from "../_components/HeaderStatistics";
import { BarSalesChart } from "../_components/charts/BarSalesChart";
interface PageProps {
  searchParams: {
    from?: string;
    to?: string;
    groupBy?: string;
  };
}
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const from = params.from;
  const to = params.to;
  const groupBy = params.groupBy ?? "daily";

  const { summary, salesOverTime, ordersByStatus, topProducts, peakDays } =
    await getStatisticsPage({ from, to, groupBy });

  return (
    <div className="px-5 py-3 ">
      <HeaderStatistics />
      <TopCards summary={summary} ordersByStatus={ordersByStatus} />
      <div className="flex mt-10 gap-5 items-stretch">
        <div className="flex-3">
          <div className="h-full  rounded-2xl p-5">
            <OrdersPieChart peakDays={peakDays} />
          </div>
        </div>

        <div className="flex-1">
          <div className="h-full  rounded-2xl p-5 overflow-auto">
            <ListTop topProducts={topProducts} />
          </div>
        </div>
      </div>
      <BarSalesChart salesOverTime={salesOverTime} />
    </div>
  );
}
