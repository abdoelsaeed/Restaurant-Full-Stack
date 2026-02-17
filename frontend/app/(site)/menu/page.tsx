import Card from "@/app/_components/Card";
import { PaginationComponent } from "@/app/_components/PaginationComponent";
import Search from "@/app/_components/Search";
import { getMe } from "@/app/services/auth/auth.server";
import { getMenu } from "@/app/services/food/food.server";
interface PageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}
export default async function Page({ searchParams }: PageProps) {
  const user = await getMe();
  const params = await searchParams;
  const q = params.q ?? "";

  const page = Number(params.page) || 1;
  const { data, meta } = await getMenu(q, page);
  if(!data) return 
  return (
    <div className="mt-6 sm:mt-10 lg:mt-section px-4 sm:px-6 lg:px-8">
      <Search defaultValue={q ?? ""} />
      <div>
        <div className=" mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <Card key={item._id} item={item} user={user} />
          ))}
        </div>
        {meta && (
          <PaginationComponent
            meta={meta}
            pageName="menu"
            activeClassName="bg-primary text-pureWhite"
          />
        )}
      </div>
    </div>
  );
}
