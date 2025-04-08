import { useState, useEffect, useMemo, useCallback } from "react";
import MyIcon from "../icon/MyIcon";
import { Column } from "@/types/ColumnType";
import Pagination from "./Pagination";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T; // Unique key for each row (e.g., "id")
  onSelectionChange?: (selectedData: T[]) => void; // Callback function
  pagination?: any;
  setPagination?: (prev: any) => void;
  isLoading: boolean;
  minWidth?: string;
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
  rowKey,
  onSelectionChange,
  pagination,
  setPagination,
  isLoading,
  minWidth = "",
}: TableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<T[keyof T]>>(new Set());

  // Sorting logic
  const handleSort = useCallback(
    (key: keyof T) => {
      if (sortColumn === key) {
        setSortOrder((prev) =>
          prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
        );
      } else {
        setSortColumn(key);
        setSortOrder("asc");
      }
    },
    [sortColumn]
  );

  const sortedData = useMemo(() => {
    if (!sortOrder || !sortColumn) return data;
  
    return [...data].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];
  
      // Convert boolean to number for correct sorting
      const normalizedA =
        typeof valA === "boolean" ? Number(valA) : typeof valA === "string" ? valA.toLowerCase() : valA;
      const normalizedB =
        typeof valB === "boolean" ? Number(valB) : typeof valB === "string" ? valB.toLowerCase() : valB;
  
      if (normalizedA === normalizedB) return 0;
      return sortOrder === "asc" ? (normalizedA > normalizedB ? 1 : -1) : (normalizedA < normalizedB ? 1 : -1);
    });
  }, [data, sortColumn, sortOrder]);

  // Selection logic
  const isAllSelected = selectedRows.size === data?.length;

  const toggleSelectAll = useCallback(() => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.size === data?.length) return new Set();
      return new Set(data?.map((row) => row[rowKey]));
    });
  }, [data, rowKey]);

  const toggleSelectRow = useCallback((id: T[keyof T]) => {
    setSelectedRows((prev) => {
      const newSelected = new Set(prev);
      newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
      return newSelected;
    });
  }, []);

  // Send selected data to parent
  useEffect(() => {
    if (onSelectionChange) {
      const selectedData = data?.filter((row) => selectedRows.has(row[rowKey]));
      onSelectionChange(selectedData);
    }
  }, [selectedRows, onSelectionChange, data, rowKey]);

  const skeletonRows = useMemo(() => {
    return Array.from({ length: 5 }).map((_, index) => (
      <tr key={index} className="border-t hover:bg-gray-50">
        <td className="p-3 text-sm">
          <div className="h-4 bg-gray-200 rounded w-4"></div>
        </td>
        {columns.map((col) => (
          <td
            key={String(col.key)}
            className={`p-3 text-sm ${
              col.fixed
                ? `sticky ${
                    col.fixed === "left" ? "left-0" : "right-0"
                  } bg-white z-10`
                : ""
            }`}
          >
            <div className="h-4 bg-gray-200 rounded"></div>
          </td>
        ))}
      </tr>
    ));
  }, [columns]);

  return (
    <div className="overflow-x-auto border rounded-lg">
      {/* <div className="min-w-[1000px]"> */}
      <table className={`w-full text-left border-collapse ${minWidth}`}>
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 text-sm font-semibold sticky left-0 z-10 bg-gray-100">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
                className="cursor-pointer"
              />
            </th>
            {columns?.map((col) => (
              <th
                key={String(col.key)}
                className={`p-3 text-sm font-semibold ${
                  col.fixed
                    ? `sticky ${
                        col.fixed === "left" ? "left-[41.5px]" : "right-0"
                      } bg-gray-100 z-10`
                    : ""
                }`}
                // style={{ width: col.width || "auto" }}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  {col.label}
                  {sortOrder && col.sortable && sortColumn === col.key && (
                    <MyIcon
                      src="/assets/icons/ic-arrow-down.svg"
                      width={14}
                      height={14}
                      className={sortOrder === "asc" ? "rotate-180" : ""}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {isLoading
            ? skeletonRows
            : sortedData?.map((row) => {
                const rowId = row[rowKey];
                return (
                  <tr key={rowId} className="border-t hover:bg-gray-50">
                    <td className="p-3 text-sm sticky left-0 bg-white z-10">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(rowId)}
                        onChange={() => toggleSelectRow(rowId)}
                        className="cursor-pointer"
                      />
                    </td>
                    {columns?.map((col) => (
                      <td
                        key={String(col.key)}
                        // style={{ width: col.width || "auto" }}
                        className={`p-3 text-sm ${
                          col.fixed
                            ? `sticky border-t ${
                                col.fixed === "left"
                                  ? "left-[41.5px]"
                                  : "right-0 "
                              } bg-white z-10`
                            : ""
                        }`}
                      >
                        {col.render
                          ? col.render(row[col.key], row)
                          : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })}
        </tbody>
      </table>
      {/* <div className="px-3 border-t">
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          isLoading={isLoading}
        />
      </div> */}
      {/* </div> */}
    </div>
  );
};

export default Table;
