"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import InputField from "@/shared/input/InputField";
import DataTable from "@/shared/table/DataTable";
import TabBar from "@/shared/tabs";
import clsx from "clsx";
import { useCallback, useMemo, useState } from "react";
import { FiCheck, FiPlus, FiSearch } from "react-icons/fi";
import {
  LuBookOpen,
  LuBuilding2,
  LuCloudUpload,
  LuFilter,
  LuGlobe,
} from "react-icons/lu";
import { programColumns } from "./columns";
import ProgramDetailDrawer from "./ProgramDetailDrawer";
import type { ProgramCategory, ProgramTableRow } from "./types";
import useHook from "./useHook";

const iconBox =
  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0";

const LEVEL_TABS: { id: "all" | ProgramCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "UNDERGRADUATE", label: "Undergraduate" },
  { id: "POSTGRADUATE", label: "Postgraduate" },
  { id: "PHD", label: "PhD" },
  { id: "DIPLOMA", label: "Diploma" },
];

function matchesLevelTab(
  row: ProgramTableRow,
  tab: "all" | ProgramCategory,
): boolean {
  if (tab === "all") return true;
  return row.category === tab;
}

function filteredPrograms(
  rows: ProgramTableRow[],
  search: string,
  tab: "all" | ProgramCategory,
): ProgramTableRow[] {
  const q = search.toLowerCase().trim();
  return rows.filter((r) => {
    if (!matchesLevelTab(r, tab)) return false;
    if (!q) return true;
    return (
      r.name.toLowerCase().includes(q) ||
      r.universityName.toLowerCase().includes(q) ||
      r.countryName.toLowerCase().includes(q)
    );
  });
}

const Programs = () => {
  const { tableRows, stats, isLoading, isError, error } = useHook();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ProgramTableRow | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRowClick = useCallback((row: ProgramTableRow) => {
    setSelected(row);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setSelected(null);
  }, []);

  const tabData = useMemo(
    () =>
      LEVEL_TABS.map((t) => {
        const rows = filteredPrograms(tableRows, search, t.id);
        return {
          name: t.label,
          component: (
            <DataTable
              key={t.id}
              columns={programColumns}
              data={isLoading ? [] : rows}
              enableSelection
              totalResults={rows.length}
              onRowClick={handleRowClick}
              className="flex-1 min-h-0"
            />
          ),
        };
      }),
    [tableRows, search, isLoading, handleRowClick],
  );

  return (
    <div className="flex flex-col gap-6 h-full">
      <PageHeader
        titleProps={{
          children: "Programs",
        }}
        descriptionProps={{
          children:
            "Manage academic programs offered by partner universities.",
        }}
      />

      {isError && (
        <p className="text-sm text-red-600" role="alert">
          {error instanceof Error ? error.message : "Failed to load programs."}
        </p>
      )}
      {isLoading && (
        <p className="text-sm text-gray-500">Loading programs…</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Total Programs",
            value: stats.total,
            icon: <LuBookOpen className="w-5 h-5" />,
            color: "bg-blue-50 text-blue-600",
          },
          {
            label: "Active",
            value: stats.active,
            icon: <FiCheck className="w-5 h-5" />,
            color: "bg-green-50 text-green-600",
          },
          {
            label: "Universities Covered",
            value: stats.universitiesCovered,
            icon: <LuBuilding2 className="w-5 h-5" />,
            color: "bg-purple-50 text-purple-600",
          },
          {
            label: "Countries",
            value: stats.countries,
            icon: <LuGlobe className="w-5 h-5" />,
            color: "bg-orange-50 text-orange-600",
          },
        ].map((item) => (
          <CardWrapper className="flex gap-4 items-start" key={item.label}>
            <div className={clsx(iconBox, item.color)}>{item.icon}</div>
            <div className="space-y-1 min-w-0">
              <Text as="p" size="sm" variant="secondary">
                {item.label}
              </Text>
              <Text as="p" size="2xl" type="semibold" variant="primary">
                {item.value}
              </Text>
            </div>
          </CardWrapper>
        ))}
      </div>

      <div className="relative flex-1 min-h-0 flex flex-col">
        <TabBar
          tabs={tabData}
          className="flex-1 min-h-0"
          tabContainerClassName="max-w-[min(100%,640px)]"
        />
        <div className="flex flex-wrap items-center gap-3 absolute right-0 top-0">
          <InputField
            type="text"
            placeholder="Search programs..."
            value={search}
            icon={<FiSearch className="text-gray-400" size={16} />}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[180px]"
          />
          <Button
            variant="secondary"
            size="sm"
            btnName="Filter"
            icon={<LuFilter className="w-4 h-4" />}
          />
          <Button
            variant="secondary"
            size="sm"
            btnName="Bulk Import"
            icon={<LuCloudUpload className="w-4 h-4" />}
          />
          <Button
            variant="primary"
            size="sm"
            btnName="Add Program"
            icon={<FiPlus className="w-4 h-4" />}
          />
        </div>
      </div>

      <ProgramDetailDrawer
        program={selected}
        isOpen={drawerOpen}
        close={closeDrawer}
      />
    </div>
  );
};

export default Programs;
