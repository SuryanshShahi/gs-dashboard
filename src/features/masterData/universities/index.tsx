"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import DataTable from "@/shared/table/DataTable";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { FiPlus, FiRefreshCw, FiSearch } from "react-icons/fi";
import { LuBookOpen, LuCloudUpload, LuFilter, LuGlobe } from "react-icons/lu";
import AddUniversityModal from "./addUniversity";
import { universityColumns } from "./columns";
import useHook from "./useHook";
import Loader from "@/shared/Loader";
import EmptyState from "@/shared/EmptyState";

const iconBox =
  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0";

const Universities = () => {
  const {
    tableRows,
    stats,
    isLoading,
    isError,
    error,
    updateUniversityMutation,
    pendingUpdateUniversityId,
    selectedUniversity,
    setSelectedUniversity,
    removeUniversityMutation,
    pendingRemoveUniversityId,
  } = useHook();
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const baseCountryOptions = useMemo(() => {
    const names = Array.from(
      new Set(tableRows.map((r) => r.countryName)),
    ).sort();
    return names.map((name) => ({ label: name, value: name }));
  }, [tableRows]);
  const countryOptions = useMemo(
    () => [{ label: "All Countries", value: "" }, ...baseCountryOptions],
    [baseCountryOptions],
  );

  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();
    let rows = tableRows;
    if (countryFilter) {
      rows = rows.filter((r) => r.countryName === countryFilter);
    }
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.countryName.toLowerCase().includes(q),
    );
  }, [tableRows, search, countryFilter]);

  return (
    <EmptyState
      pageData={isLoading ? null : filteredData}
      loaderVariant="full-screen"
      data={{
        title: "No universities found",
        subtitle: "When you add universities, they will appear here.",
      }}
    >
      <div className="flex flex-col gap-6 h-full">
        <PageHeader
          titleProps={{
            children: "Universities",
          }}
          descriptionProps={{
            children: "Manage partner universities and their programs.",
          }}
        />

        {isError && (
          <p className="text-sm text-red-600" role="alert">
            {error instanceof Error
              ? error.message
              : "Failed to load universities."}
          </p>
        )}
        {isLoading && (
          <p className="text-sm text-gray-500">Loading universities…</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            {
              label: "Total Universities",
              value: stats.total,
              icon: <LuGlobe className="w-5 h-5" />,
              color: "bg-blue-50 text-blue-600",
            },
            {
              label: "Active",
              value: stats.active,
              icon: <FiRefreshCw className="w-5 h-5" />,
              color: "bg-green-50 text-green-600",
            },
            {
              label: "Countries Covered",
              value: stats.countriesCovered,
              icon: <LuGlobe className="w-5 h-5" />,
              color: "bg-gray-100 text-gray-600",
            },
            {
              label: "Total Programs",
              value: stats.totalPrograms.toLocaleString(),
              icon: <LuBookOpen className="w-5 h-5" />,
              color: "bg-brand-50 text-brand-600",
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

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <InputField
              type="text"
              placeholder="Search universities..."
              value={search}
              icon={<FiSearch className="text-gray-400" size={16} />}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-[200px]"
            />
            <Dropdown
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              options={countryOptions}
              className="min-w-[180px] text-gray-900"
            />
            <Button
              variant="secondary"
              size="sm"
              btnName="Filter"
              icon={<LuFilter className="w-4 h-4" />}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              btnName="Bulk Import"
              icon={<LuCloudUpload className="w-4 h-4" />}
            />
            <Button
              variant="primary"
              size="sm"
              btnName="Add University"
              icon={<FiPlus className="w-4 h-4" />}
              onClick={() => setIsAddModalOpen(true)}
            />
          </div>
        </div>

        <DataTable
          columns={universityColumns({
            updateUniversityMutation,
            pendingUpdateUniversityId,
            setSelectedUniversity,
            removeUniversityMutation,
            pendingRemoveUniversityId,
          })}
          data={isLoading ? [] : filteredData}
          enableSelection
          totalResults={filteredData.length}
          className="flex-1 min-h-0"
        />

        <AddUniversityModal
          isOpen={isAddModalOpen || Boolean(selectedUniversity)}
          selectedUniversity={selectedUniversity}
          close={() => {
            setIsAddModalOpen(false);
            setSelectedUniversity(null);
          }}
        />
      </div>
    </EmptyState>
  );
};

export default Universities;
