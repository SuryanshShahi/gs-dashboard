"use client";
import Chip from "@/shared/Chip";
import { ColumnDef } from "@tanstack/react-table";
import { useLayoutEffect, useRef, type ChangeEventHandler } from "react";
import { FiEye, FiFileText } from "react-icons/fi";
import type { ApplicationRecord, ApplicationStage } from "./types";

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

function stageChipVariant(
  stage: ApplicationStage,
):
  | "success"
  | "orange"
  | "blue"
  | "purple"
  | "warning"
  | "gray"
  | "error" {
  switch (stage) {
    case "Enrolled":
    case "Offer Received":
      return "success";
    case "Sent To University":
      return "orange";
    case "GS Approved":
    case "Pending GS":
      return "blue";
    case "RM Review":
      return "purple";
    case "Partner Review":
      return "warning";
    case "Draft":
      return "gray";
    case "Rejected":
      return "error";
    default:
      return "gray";
  }
}

function formatSubmitted(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const applicationColumns: ColumnDef<ApplicationRecord, unknown>[] = [
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
    header: "App ID",
    size: 100,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-600 font-medium">
        {getValue<string>()}
      </span>
    ),
  },
  {
    id: "student",
    header: "Student",
    size: 240,
    accessorFn: (row) => row.studentName,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
          <span className="text-xs font-semibold text-gray-500">
            {row.original.studentName.charAt(0)}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {row.original.studentName}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {row.original.studentEmail}
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "partner",
    header: "Partner / Counsellor",
    size: 200,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {row.original.partnerName}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {row.original.counsellorName}
        </p>
      </div>
    ),
  },
  {
    id: "university",
    header: "University / Program",
    size: 240,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {row.original.university}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {row.original.program}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "intake",
    header: "Intake",
    size: 100,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "stage",
    header: "Stage",
    size: 140,
    cell: ({ getValue }) => {
      const stage = getValue<ApplicationStage>();
      return (
        <Chip
          title={stage}
          variant={stageChipVariant(stage)}
          size="xs"
          className="normal-case!"
        />
      );
    },
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted",
    size: 120,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700">
        {formatSubmitted(getValue<string>())}
      </span>
    ),
  },
  {
    id: "action",
    header: () => <div className="flex justify-end w-full">Action</div>,
    size: 88,
    enableSorting: false,
    cell: () => (
      <div
        className="flex items-center justify-end gap-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"
          aria-label="View"
        >
          <FiEye className="w-4 h-4 text-gray-500" />
        </button>
        <button
          type="button"
          className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"
          aria-label="Details"
        >
          <FiFileText className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    ),
  },
];
