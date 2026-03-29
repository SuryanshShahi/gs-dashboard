"use client";

import Chip from "@/shared/Chip";
import { ColumnDef } from "@tanstack/react-table";
import { useLayoutEffect, useRef, type ChangeEventHandler } from "react";
import Switcher from "@/shared/input/Switcher";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type {
  IUniversity,
  IUpdateUniversity,
  UniversityTableRow,
} from "./types";
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

export const universityColumns = ({
  updateUniversityMutation,
  pendingUpdateUniversityId,
  setSelectedUniversity,
  removeUniversityMutation,
  pendingRemoveUniversityId,
}: {
  updateUniversityMutation: ({
    universityId,
    payload,
  }: {
    universityId: string;
    payload: IUpdateUniversity;
  }) => void;
  pendingUpdateUniversityId: string | null;
  setSelectedUniversity: (university: UniversityTableRow) => void;
  removeUniversityMutation: ({
    universityId,
  }: {
    universityId: string;
  }) => void;
  pendingRemoveUniversityId: string | null;
}): ColumnDef<UniversityTableRow, unknown>[] => [
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
          onClick={() => setSelectedUniversity(row.original)}
        />
        <div className="flex items-center px-0.5" onClick={(e) => e.stopPropagation()}>
          <Switcher
            size="xs"
            checked={row.original.isActive}
            onChange={(next) => {
              if (next !== row.original.isActive) {
                updateUniversityMutation({
                  universityId: row.original.id,
                  payload: { isActive: next },
                });
              }
            }}
            disabled={pendingUpdateUniversityId === row.original.id}
          />
        </div>
        <Button
          variant="tertiary"
          size="xs"
          className={clsx("!p-2 !rounded-md", "hover:!bg-red-50")}
          icon={<FiTrash2 className="text-red-500" />}
          isLoading={pendingRemoveUniversityId === row.original.id}
          onClick={() =>
            removeUniversityMutation({
              universityId: row.original.id,
            })
          }
        />
      </div>
    ),
  },
];
