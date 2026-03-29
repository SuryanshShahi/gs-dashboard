"use client";

import Button from "@/shared/buttons/Button";
import Chip from "@/shared/Chip";
import Text from "@/shared/heading/Text";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { useLayoutEffect, useRef, type ChangeEventHandler } from "react";
import Switcher from "@/shared/input/Switcher";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { CountryTableRow } from "./types";

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

export const countryColumns: ColumnDef<CountryTableRow, unknown>[] = [
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
    id: "country",
    header: "Country",
    size: 220,
    accessorFn: (row) => row.name,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-0">
        <Text as="span" size="base" variant="primary">
          {row.original.flagEmoji}
        </Text>
        <Text as="span" size="sm" variant="primary">
          {row.original.name}
        </Text>
      </div>
    ),
  },
  {
    accessorKey: "isoCode",
    header: "ISO Code",
    size: 90,
    cell: ({ getValue }) => (
      <Text as="span" size="sm" variant="primary">
        {getValue<string>()}
      </Text>
    ),
  },
  {
    accessorKey: "continent",
    header: "Continent",
    size: 140,
    cell: ({ getValue }) => (
      <Text as="span" size="sm" variant="primary">
        {getValue<string>()}
      </Text>
    ),
  },
  {
    accessorKey: "universities",
    header: "Universities",
    size: 140,
    cell: ({ getValue }) => (
      <Text as="span" size="sm" variant="primary">
        {getValue<number>()}{" "}
        <Text as="span" size="sm" variant="secondary">
          universities
        </Text>
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
    header: () => <div className="flex justify-end w-full">Action</div>,
    size: 120,
    enableSorting: false,
    cell: ({ row }) => (
      <div
        className="flex items-center justify-end gap-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="tertiary"
          size="xs"
          className={clsx("!p-2 !rounded-md", "hover:!bg-gray-100")}
          icon={<FiEdit2 className="text-gray-500" />}
        />
        <div className="flex items-center px-0.5" onClick={(e) => e.stopPropagation()}>
          <Switcher
            size="xs"
            checked={row.original.status === "ACTIVE"}
            onChange={() => {}}
            disabled
          />
        </div>
        <Button
          variant="tertiary"
          size="xs"
          className={clsx("!p-2 !rounded-md", "hover:!bg-red-50")}
          icon={<FiTrash2 className="text-red-500" />}
        />
      </div>
    ),
  },
];
