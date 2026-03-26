"use client";

import Button from "@/shared/buttons/Button";
import Chip from "@/shared/Chip";
import Text from "@/shared/heading/Text";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { useLayoutEffect, useRef, type ChangeEventHandler } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { LuToggleLeft } from "react-icons/lu";
import type { ProgramTableRow } from "./types";

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

export function categoryLabel(cat: string): string {
  switch (cat) {
    case "UNDERGRADUATE":
      return "Undergraduate";
    case "POSTGRADUATE":
      return "Postgraduate";
    case "PHD":
      return "PhD";
    case "DIPLOMA":
      return "Diploma";
    default:
      return cat;
  }
}

const IntakesCell = ({ intakes }: { intakes: string[] }) => {
  const visible = intakes.slice(0, 2);
  const rest = intakes.length - visible.length;
  return (
    <div className="flex flex-col gap-1.5 min-w-[75px]">
      {visible.map((d) => (
        <Chip
          key={d}
          title={d}
          variant="gray"
          size="xs"
          className="text-[11px]"
        />
      ))}
      {rest > 0 && (
        <Button
          variant="tertiary-color-link"
          btnName={`+${rest} more`}
          size="xs"
          className="text-xs hover:underline"
          onClick={() => {}}
        />
      )}
    </div>
  );
};

export const programColumns: ColumnDef<ProgramTableRow, unknown>[] = [
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
    id: "programName",
    header: "Program Name",
    size: 240,
    accessorFn: (row) => row.name,
    cell: ({ row }) => {
      const cat = row.original.category;
      return (
        <div className="min-w-0 max-w-[280px]">
          <Text as="p" size="sm" type="medium">
            {row.original.name}
          </Text>
          <Text as="p" size="xs" variant="tertiary">
            {categoryLabel(cat)}
          </Text>
        </div>
      );
    },
  },
  {
    id: "university",
    header: "University",
    size: 220,
    accessorFn: (row) => row.universityName,
    cell: ({ row }) => (
      <div className="min-w-0 max-w-[240px]">
        <Text as="p" size="sm" type="medium">
          {row.original.universityName}
        </Text>
        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
          <Text as="span" size="sm">
            {row.original.flagEmoji}
          </Text>
          <Text as="span" size="xs" variant="tertiary">
            {row.original.countryName}
          </Text>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    size: 100,
    cell: ({ getValue }) => (
      <Text as="span" size="sm" variant="tertiary">
        {getValue<string>()}
      </Text>
    ),
  },
  {
    accessorKey: "studyMode",
    header: "Study Mode",
    size: 110,
    cell: ({ getValue }) => (
      <Chip title={getValue<string>()} variant="blue" size="xs" />
    ),
  },
  {
    id: "intakes",
    header: "Intakes",
    size: 130,
    enableSorting: false,
    cell: ({ row }) => <IntakesCell intakes={row.original.intakes} />,
  },
  {
    id: "tuition",
    header: "Tuition/Yr",
    size: 120,
    accessorFn: (row) => row.tuitionPerYear,
    cell: ({ row }) => (
      <Text as="span" size="sm">
        {row.original.tuitionPerYear}
      </Text>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 110,
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
