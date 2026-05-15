"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    //dashboard/allSupply?page=2
    router.push(`/dashboard/allSupply?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-12 pb-10">
      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        return (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`w-12 h-12 rounded-2xl font-black transition-all active:scale-90 ${
              currentPage === pageNum
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {pageNum}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
