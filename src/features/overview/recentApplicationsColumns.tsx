"use client";

import Chip from "@/shared/Chip";
import { ColumnDef } from "@tanstack/react-table";
import type { RecentApplicationRow, RecentApplicationStage } from "./mockData";
import InfoCluster from "@/shared/InfoCluster";
import Text from "@/shared/heading/Text";

function recentStageChipVariant(
  stage: RecentApplicationStage,
): "gray" | "blue" | "warning" {
  switch (stage) {
    case "Draft":
      return "gray";
    case "Pending GS":
      return "blue";
    case "Partner Review":
      return "warning";
    default:
      return "gray";
  }
}

export const recentApplicationsColumns: ColumnDef<
  RecentApplicationRow,
  unknown
>[] = [
  {
    id: "student",
    header: "Student",
    size: 220,
    enableSorting: false,
    cell: ({ row }) => (
      <InfoCluster
        titleProps={{ children: row.original.studentName, size: "sm" }}
        descriptionProps={{ children: row.original.agency }}
        textWrapperClass="!space-y-0"
        showInitials
        initialsClassName="!h-9 !w-9"
      />
    ),
  },
  {
    id: "university",
    header: "University",
    size: 240,
    enableSorting: false,
    cell: ({ row }) => (
      <InfoCluster
        titleProps={{ children: row.original.university, size: "sm" }}
        descriptionProps={{ children: row.original.intake }}
        textWrapperClass="!space-y-0"
      />
    ),
  },
  {
    accessorKey: "stage",
    header: "Stage",
    size: 140,
    enableSorting: false,
    cell: ({ getValue }) => {
      const stage = getValue<RecentApplicationStage>();
      return (
        <Chip
          title={stage}
          variant={recentStageChipVariant(stage)}
          size="xs"
          type="tag"
        />
      );
    },
  },
  {
    accessorKey: "updatedLabel",
    header: "Updated",
    size: 120,
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text as="p" size="sm" type="medium" variant="tertiary">
        {getValue<string>()}
      </Text>
    ),
  },
];
