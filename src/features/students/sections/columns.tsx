"use client";
import Img from "@/shared/Img";
import { ColumnDef } from "@tanstack/react-table";
import { useLayoutEffect, useRef, type ChangeEventHandler } from "react";
import { FiEye, FiFileText, FiUserX } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import type { StudentTableRow } from "../types";

const CheckboxCell = ({
  checked,
  onChange,
  indeterminate,
}: {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  indeterminate?: boolean;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      onClick={(e) => e.stopPropagation()}
      className="w-4 h-4 rounded border-gray-300 accent-brand-600 cursor-pointer"
    />
  );
};

export const studentColumns: ColumnDef<StudentTableRow, any>[] = [
  {
    id: "select",
    size: 40,
    enableSorting: false,
    header: ({ table }) => (
      <CheckboxCell
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() &&
          !table.getIsAllPageRowsSelected()
        }
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <CheckboxCell
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Student ID",
    size: 120,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-600">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Student Name",
    size: 220,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
          {row.original.avatar ? (
            <Img
              src={row.original.avatar}
              alt={row.original.name}
              width={40}
              height={40}
              isLocal
            />
          ) : (
            <span className="text-xs font-semibold text-gray-500">
              {row.original.name.charAt(0)}
            </span>
          )}
        </div>
        <span className="text-sm text-gray-700">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Student Email",
    size: 200,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "contact",
    header: "Student Contact",
    size: 140,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "counsellor",
    header: "Counsellor",
    size: 180,
    enableSorting: false,
    cell: ({ row }) => {
      const c = row.original.counsellor;
      if (!c) {
        return (
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <IoWarningOutline className="w-4 h-4" />
            Unassigned
          </div>
        );
      }
      return (
        <div className="flex flex-col">
          <span className="text-sm text-gray-700">{c.name}</span>
          <span className="text-xs text-gray-500">{c.affiliation}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "applications",
    header: "Applications",
    size: 100,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700">{getValue<number>()}</span>
    ),
  },
  {
    id: "action",
    header: () => (
      <div className="flex justify-end w-full">Action</div>
    ),
    size: 120,
    enableSorting: false,
    cell: () => (
      <div className="flex items-center justify-end gap-2">
        <button
          className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"
          aria-label="View"
        >
          <FiEye className="w-4 h-4 text-gray-500" />
        </button>
        <button
          className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"
          aria-label="Details"
        >
          <FiFileText className="w-4 h-4 text-gray-500" />
        </button>
        <button
          className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"
          aria-label="Remove"
        >
          <FiUserX className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    ),
  },
];
