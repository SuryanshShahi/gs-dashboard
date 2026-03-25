"use client";

import Chip from "@/shared/Chip";
import { ColumnDef } from "@tanstack/react-table";
import { useLayoutEffect, useRef, type ChangeEventHandler } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { LuToggleLeft } from "react-icons/lu";
import type { UniversityTableRow } from "./types";
import Text from "@/shared/heading/Text";
import Button from "@/shared/buttons/Button";
import clsx from "clsx";

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

export const universityColumns: ColumnDef<UniversityTableRow, unknown>[] = [
  {
    id: "select",
    size: 40,
    enableSorting: false,
    header: ({ table }) => (
      <CheckboxCell
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
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
    id: "universityName",
    header: "University Name",
    size: 260,
    accessorFn: (row) => row.name,
    cell: ({ row }) => (
      <div className="min-w-0 max-w-[280px]">
        <Text as="p" size="sm" variant="primary" type="medium">
          {row.original.name}
        </Text>
        <Text as="p" size="xs" variant="tertiary">
          {row.original.city}
        </Text>
      </div>
    ),
  },
  {
    id: "country",
    header: "Country",
    size: 200,
    accessorFn: (row) => row.countryName,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-0">
        <Text as="span" size="base">
          {row.original.flagEmoji}
        </Text>
        <Text as="p" size="sm" variant="primary">
          {row.original.countryName}
        </Text>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 100,
    cell: ({ getValue }) => (
      <Chip title={getValue<string>()} variant="blue" size="xs" />
    ),
  },
  {
    accessorKey: "qsRanking",
    header: "QS Ranking",
    size: 110,
    cell: ({ getValue }) => (
      <Text as="span" size="sm">
        #{getValue<number>()}
      </Text>
    ),
  },
  {
    accessorKey: "programs",
    header: "Programs",
    size: 130,
    cell: ({ getValue }) => (
      <Text as="span" size="sm">
        {getValue<number>()}
      </Text>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    cell: ({ getValue }) => {
      const status = getValue<string>();
      const active = status === "ACTIVE";
      return (
        <Chip
          title={active ? "Active" : "Inactive"}
          variant={active ? "success" : "gray"}
          size="xs"
          type="tag"
        />
      );
    },
  },
  {
    id: "action",
    header: () => <div className="flex justify-end w-full">Actions</div>,
    size: 120,
    enableSorting: false,
    cell: () => (
      <div
        className="flex items-center justify-end"
        onClick={(e) => e.stopPropagation()}
      >
        {[
          {
            icon: <FiEdit2 className="text-gray-500" />,
            className: "hover:!bg-gray-100",
          },
          {
            icon: <LuToggleLeft className="text-blue-500" />,
            className: "hover:!bg-blue-50",
          },
          {
            icon: <FiTrash2 className="text-red-500" />,
            className: "hover:!bg-red-50",
          },
        ].map((item, idx) => (
          <Button
            key={idx}
            variant="tertiary"
            size="xs"
            className={clsx("!p-2 !rounded-md", item.className)}
            icon={item.icon}
          />
        ))}
      </div>
    ),
  },
];
