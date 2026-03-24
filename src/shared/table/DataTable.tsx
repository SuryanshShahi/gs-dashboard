"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";
import { useState } from "react";
import clsx from "clsx";
import {
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuChevronsUpDown,
} from "react-icons/lu";
import Button from "../buttons/Button";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  pageSize?: number;
  enableSelection?: boolean;
  totalResults?: number;
  className?: string;
  onRowClick?: (row: TData) => void;
}

export default function DataTable<TData>({
  columns,
  data,
  pageSize = 10,
  enableSelection = false,
  totalResults,
  className,
  onRowClick,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection, pagination },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: enableSelection,
  });

  const total = totalResults ?? data.length;
  const from = pagination.pageIndex * pagination.pageSize + 1;
  const to = Math.min(from + pagination.pageSize - 1, total);

  return (
    <div className={clsx("flex flex-col min-h-0", className)}>
      <div className="border border-gray-200 rounded-xl flex-1 min-h-0 overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-gray-200 bg-gray-50"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={clsx(
                      "px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap",
                      header.column.getCanSort() &&
                        "cursor-pointer select-none",
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      width:
                        header.getSize() !== 150
                          ? header.getSize()
                          : undefined,
                    }}
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {header.column.getCanSort() && (
                        <LuChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={clsx(
                  "border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors",
                  row.getIsSelected() && "bg-brand-50/30",
                  onRowClick && "cursor-pointer",
                )}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 shrink-0">
        <span>
          Showing {from} to {to} of {total} results
        </span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Rows per Page</span>
            <div className="relative">
              <select
                value={pagination.pageSize}
                onChange={(e) =>
                  setPagination((p) => ({
                    ...p,
                    pageSize: Number(e.target.value),
                    pageIndex: 0,
                  }))
                }
                className="appearance-none border border-gray-200 rounded-lg px-3 py-1 pr-7 text-sm bg-white cursor-pointer outline-none"
              >
                {[10, 20, 30, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <LuChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="xs"
              className="!px-1.5 !py-1.5"
              icon={<LuChevronLeft className="w-4 h-4" />}
              iconFirst
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            />
            <span className="min-w-[50px] text-center">
              {pagination.pageIndex + 1} / {table.getPageCount()}
            </span>
            <Button
              variant="secondary"
              size="xs"
              className="!px-1.5 !py-1.5"
              icon={<LuChevronRight className="w-4 h-4" />}
              iconFirst
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
