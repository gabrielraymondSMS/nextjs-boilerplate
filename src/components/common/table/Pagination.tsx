import React from "react";
import MyIcon from "../icon/MyIcon";

interface PaginationProps {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  setPagination?: (prev: any) => void; // Make setPagination optional
  isLoading?: boolean; // Add isLoading prop
}

const Pagination = ({
  pagination = {
    page: 1, // Default page
    limit: 10, // Default limit
    total: 0, // Default total
    totalPages: 1, // Default totalPages
  },
  setPagination,
  isLoading = false,
}: PaginationProps) => {
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (setPagination && newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    if (setPagination) {
      setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 })); // Reset to page 1 when limit changes
    }
  };

  // Generate page numbers
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = []; // Explicitly define the type of the array
    const { page, totalPages } = pagination;

    if (totalPages <= 3) {
      // If there are 3 or fewer pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 2) {
        // If the current page is 1 or 2, show "1, 2, 3, ..., totalPages"
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 1) {
        // If the current page is the last or second-to-last, show "1, ..., totalPages-2, totalPages-1, totalPages"
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Otherwise, show "1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages"
        pages.push(
          1,
          "...",
          page - 1,
          page,
          Number(page) + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  // Skeleton loading for pagination
  if (isLoading) {
    return (
      <div className="flex justify-between items-center mb-3 my-2">
        <div className="flex items-center gap-2">
          <div className="h-8 bg-gray-200 rounded w-24"></div>{" "}
          {/* Entries per page skeleton */}
          <div className="h-8 bg-gray-200 rounded w-40"></div>{" "}
          {/* Entries info skeleton */}
        </div>
        <div className="flex items-center gap-4">
          <div className="h-8 bg-gray-200 rounded w-24"></div>{" "}
          {/* Page info skeleton */}
          <div className="flex border rounded-lg">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-8 bg-gray-200 rounded w-8 border-r"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center ">
      <div>
        Entries per page
        <select
          className="bg-white min-w-[40px] h-[40px] border mx-2"
          value={pagination.limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          disabled={!setPagination} // Disable if setPagination is undefined
        >
          <option value={1}>1</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={100}>100</option>
        </select>
        {`${(pagination.page - 1) * pagination.limit + 1}-${Math.min(
          pagination.page * pagination.limit,
          pagination.total
        )} of ${pagination.total} entries`}
      </div>

      <div className="flex items-center gap-4">
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <div className="flex border rounded-lg">
          <button
            className="flex justify-center items-center border-r w-[40px] h-[40px] text-center"
            onClick={() => handlePageChange(1)}
            disabled={pagination.page === 1 || !setPagination} // Disable if setPagination is undefined
          >
            <MyIcon
              src="/assets/icons/ic-chevrons-left.svg"
              width={20}
              height={20}
            />
          </button>
          <button
            className="flex justify-center items-center border-r w-[40px] h-[40px] text-center"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1 || !setPagination} // Disable if setPagination is undefined
          >
            <MyIcon
              src="/assets/icons/ic-chevron_down.svg"
              width={20}
              height={20}
              className="text-[#414651] rotate-90"
            />
          </button>
          {generatePageNumbers().map((page, index) => (
            <button
              key={index}
              className={`flex justify-center items-center border-r w-[40px] h-[40px] text-center ${
                page.toString() === pagination.page.toString()
                  ? "bg-[#267D39] text-white"
                  : ""
              }`}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              disabled={page === "..." || !setPagination} // Disable if setPagination is undefined
            >
              {page}
            </button>
          ))}
          <button
            className="flex justify-center items-center border-r w-[40px] h-[40px] text-center"
            onClick={() => handlePageChange(Number(pagination.page) + 1)}
            disabled={
              pagination.page === pagination.totalPages || !setPagination
            } // Disable if setPagination is undefined
          >
            <MyIcon
              src="/assets/icons/ic-chevron_down.svg"
              width={20}
              height={20}
              className="text-[#414651] -rotate-90"
            />
          </button>
          <button
            className="flex justify-center items-center w-[40px] h-[40px] text-center"
            onClick={() => handlePageChange(pagination.totalPages)}
            disabled={
              pagination.page === pagination.totalPages || !setPagination
            } // Disable if setPagination is undefined
          >
            <MyIcon
              src="/assets/icons/ic-chevrons-left.svg"
              width={20}
              height={20}
              className="rotate-180"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
