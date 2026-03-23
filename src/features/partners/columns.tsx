"use client";
import InfoCluster from "@/shared/InfoCluster";
import { ColumnDef } from "@tanstack/react-table";
import { useLayoutEffect, useRef, type ChangeEventHandler } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { Partner } from "./mockData";

/** Passes the native change event through — required for TanStack row/table selection handlers. */
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

export const partnerColumns: ColumnDef<Partner, any>[] = [
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
    header: "Partner ID",
    size: 110,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-600">#{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Partner Name",
    size: 250,
    cell: ({ row }) => (
      <InfoCluster
        titleProps={{
          children: row.original.name,
          className: "!text-[14px] leading-snug",
          as: "div",
        }}
        showInitials
        descriptionProps={{
          children: row.original.location,
        }}
      />
    ),
  },
  {
    accessorKey: "activeStudents",
    header: "Active Students",
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700">{getValue<number>()}</span>
    ),
  },
  {
    accessorKey: "applications",
    header: "Applications",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">
          {row.original.applications}
        </span>
        {row.original.pendingApplications && (
          <span className="text-xs font-medium text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-2 py-0.5">
            {row.original.pendingApplications} Pending
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "relationshipManager",
    header: "Relationship Manager",
    enableSorting: false,
    cell: ({ row }) => {
      const rm = row.original.relationshipManager;
      if (!rm) {
        return (
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <IoWarningOutline className="w-4 h-4" />
            Unassigned
          </div>
        );
      }
      return (
        <InfoCluster
          titleProps={{
            children: rm.name,
            className: "!text-[14px] leading-snug",
            as: "div",
          }}
          showInitials
          initialsClassName="!h-8 !w-8"
        />
      );
    },
  },
  {
    id: "action",
    header: "Action",
    size: 60,
    enableSorting: false,
    cell: () => (
      <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
        <BsThreeDotsVertical className="w-4 h-4 text-gray-400" />
      </button>
    ),
  },
];
