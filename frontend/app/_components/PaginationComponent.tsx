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
  pageName: string;
  activeClassName?: string;
};
export function PaginationComponent({ meta, pageName, activeClassName }: metaProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    const query = params.toString();
    router.push(`/${pageName}${query ? `?${query}` : ""}`);
  }

  function getPageHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    const query = params.toString();
    return `/${pageName}${query ? `?${query}` : ""}`;
  }

  const totalPages = meta.pages || 1;
  const activeClasses = activeClassName ?? "bg-neutral-900 text-white";
  return (
    <Pagination className="mt-10 mb-5 w-fit">
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
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const showEllipsis =
            totalPages > 7 &&
            page !== 1 &&
            page !== totalPages &&
            Math.abs(page - currentPage) > 1;

          if (showEllipsis) {
            if (page === 2 || page === totalPages - 1) {
              return (
                <PaginationItem key={`ellipsis-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={getPageHref(page)}
                onClick={(event) => {
                  event.preventDefault();
                  goToPage(page);
                }}
                className={page === currentPage ? activeClasses : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (currentPage === totalPages) return;
              goToPage(currentPage + 1);
            }}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
