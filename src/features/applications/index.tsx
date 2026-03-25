"use client";
import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import PageHeader from "@/shared/heading/PageHeader";
import InputField from "@/shared/input/InputField";
import DataTable from "@/shared/table/DataTable";
import TabBar from "@/shared/tabs";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { FiDownload, FiPlus, FiSearch } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
import ApplicationDetailDrawer from "./ApplicationDetailDrawer";
import { applicationColumns } from "./columns";
import type { ApplicationRecord, ApplicationTabFilter } from "./types";
import useHook, { applicationMatchesTab } from "./useHook";
import clsx from "clsx";
import Text from "@/shared/heading/Text";

const STATUS_TABS: { id: ApplicationTabFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "draft", label: "Draft" },
  { id: "under-review", label: "Under Review" },
  { id: "approved", label: "Approved" },
  { id: "enrolled", label: "Enrolled" },
  { id: "rejected", label: "Rejected" },
];

function filteredApplications(
  applications: ApplicationRecord[],
  search: string,
  tab: ApplicationTabFilter,
): ApplicationRecord[] {
  const q = search.toLowerCase().trim();
  return applications.filter((a) => {
    if (!applicationMatchesTab(a, tab)) return false;
    if (!q) return true;
    return (
      a.id.toLowerCase().includes(q) ||
      a.studentName.toLowerCase().includes(q) ||
      a.studentEmail.toLowerCase().includes(q) ||
      a.partnerName.toLowerCase().includes(q) ||
      a.counsellorName.toLowerCase().includes(q)
    );
  });
}

const Applications = () => {
  const router = useRouter();
  const { applications, stats, isLoading, isError, error } = useHook();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ApplicationRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRowClick = useCallback((row: ApplicationRecord) => {
    setSelected(row);
    setDrawerOpen(true);
  }, []);

  const tabData = useMemo(
    () =>
      STATUS_TABS.map((t) => {
        const rows = filteredApplications(applications, search, t.id);
        return {
          name: t.label,
          component: (
            <DataTable
              key={t.id}
              columns={applicationColumns}
              data={isLoading ? [] : rows}
              enableSelection
              totalResults={rows.length}
              onRowClick={handleRowClick}
              className="flex-1 min-h-0"
            />
          ),
        };
      }),
    [applications, search, isLoading, handleRowClick],
  );

  return (
    <div className="flex flex-col gap-6 h-full">
      <PageHeader
        titleProps={{
          children: "Applications",
        }}
        descriptionProps={{
          children:
            "Manage and track all student applications across the pipeline.",
        }}
      />

      {isError && (
        <p className="text-sm text-red-600" role="alert">
          {error instanceof Error
            ? error.message
            : "Failed to load applications."}
        </p>
      )}
      {isLoading && (
        <p className="text-sm text-gray-500">Loading applications…</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Total Applications",
            value: stats.total,
            percentage: "↑ 12% this month",
            variant: "text-green-600",
          },
          {
            label: "Pending Review",
            value: stats.pendingReview,
            percentage: "Awaiting action",
            variant: "text-orange-600",
          },
          {
            label: "GS Approved",
            value: stats.gsApproved,
            percentage: "Ready to forward",
            variant: "text-blue-600",
          },
          {
            label: "Enrolled",
            value: stats.enrolled,
            percentage: "↑ 8% vs last quarter",
            variant: "text-green-600",
          },
        ].map((item) => (
          <CardWrapper className="space-y-1" key={item.label}>
            <Text as="p" size="sm" variant="secondary">
              {item.label}
            </Text>
            <Text as="p" size="2xl" type="semibold">
              {item.value}
            </Text>
            <Text as="p" size="xs" className={item.variant}>
              {item.percentage}
            </Text>
          </CardWrapper>
        ))}
      </div>

      <div className="relative flex-1 min-h-0 flex flex-col">
        <TabBar
          tabs={tabData}
          className="flex-1 min-h-0"
          tabContainerClassName="max-w-[400px]"
        />
        <div className="flex flex-wrap items-center gap-3 absolute right-0 top-0">
          <InputField
            type="text"
            placeholder="Search by name, ID, partner"
            value={search}
            icon={<FiSearch className="text-gray-400" size={16} />}
            onChange={(e) => setSearch(e.target.value)}
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
            btnName="Export"
            icon={<FiDownload className="w-4 h-4" />}
          />
          <Button
            variant="primary"
            size="sm"
            btnName="New Application"
            icon={<FiPlus className="w-4 h-4" />}
            onClick={() =>
              router.push("/onboarding/application/select-student")
            }
          />
        </div>
      </div>

      <ApplicationDetailDrawer
        application={selected}
        isOpen={drawerOpen}
        close={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default Applications;
