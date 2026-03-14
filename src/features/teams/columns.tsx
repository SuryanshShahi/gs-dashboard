"use client";
import Chip from "@/shared/Chip";
import InfoCluster from "@/shared/InfoCluster";
import { ColumnDef } from "@tanstack/react-table";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MemberStatus, TeamMember } from "./mockData";

const CheckboxCell = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    className="w-4 h-4 rounded border-gray-300 accent-brand-600 cursor-pointer"
  />
);

const statusConfig: Record<
  MemberStatus,
  { label: string; variant: "success" | "orange" | "gray" | "error" }
> = {
  active: { label: "Active", variant: "success" },
  invited: { label: "Invited", variant: "orange" },
  inactive: { label: "Inactive", variant: "gray" },
  terminated: { label: "Terminated", variant: "error" },
};

export const teamColumns: ColumnDef<TeamMember, any>[] = [
  {
    id: "select",
    size: 40,
    enableSorting: false,
    header: ({ table }) => (
      <CheckboxCell
        checked={table.getIsAllPageRowsSelected()}
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
    header: "Employee ID",
    size: 120,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-600">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Member Name",
    size: 280,
    cell: ({ row }) => (
      <InfoCluster
        showInitials
        titleProps={{
          children: row.original.name,
        }}
        descriptionProps={{
          children: row.original.email,
          size: "xs",
        }}
      />
    ),
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
    cell: ({ row }) => {
      const isNever = row.original.lastActive === "Never Logged In";
      return (
        <span
          className={
            isNever
              ? "text-sm text-orange-500 italic"
              : "text-sm text-gray-700"
          }
        >
          {row.original.lastActive}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => {
      const config = statusConfig[row.original.status];
      return <Chip title={config.label} variant={config.variant} size="xs" />;
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
