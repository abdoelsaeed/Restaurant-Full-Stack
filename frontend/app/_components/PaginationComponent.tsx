"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
type metaProps = {
  meta: { total: number; page: number; limit?: number; pages: number };
};
export function PaginationComponent({ meta }: metaProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/menu?${params.toString()}`);
  }
  return (
    <Pagination className="mt-section ">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (currentPage <= 1) return; // ⛔ أول صفحة
              goToPage(currentPage - 1);
            }}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
        {Array.from({ length: meta.pages }).map((_, i) => {
          const page = i + 1;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`?page=${page}`}
                className={`${page === currentPage?'bg-primary text-pureWhite':""}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (currentPage === meta.pages) return;
              goToPage(currentPage + 1);
            }}
            className={
              currentPage === meta.pages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
