"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import InputField from "@/shared/input/InputField";
import DataTable from "@/shared/table/DataTable";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { FiPlus, FiRefreshCw, FiSearch } from "react-icons/fi";
import { LuCloudUpload, LuFilter, LuGlobe } from "react-icons/lu";
import { countryColumns } from "./columns";
import useHook from "./useHook";
import Loader from "@/shared/Loader";
import EmptyState from "@/shared/EmptyState";

const iconBox =
  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0";

const Countries = () => {
  const { tableRows, stats, isLoading, isError, error } = useHook();
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return tableRows;
    return tableRows.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.isoCode.toLowerCase().includes(q) ||
        c.continent.toLowerCase().includes(q),
    );
  }, [tableRows, search]);

  return (
    <EmptyState
      pageData={isLoading ? null : filteredData}
      loaderVariant="full-screen"
      data={{
        title: "No countries found",
        subtitle: "When you add countries, they will appear here.",
      }}
    >
      <div className="flex flex-col gap-6 h-full">
        <PageHeader
          titleProps={{
            children: "Countries",
          }}
          descriptionProps={{
            children:
              "Manage destination countries available for student applications.",
          }}
        />

        {isError && (
          <p className="text-sm text-red-600" role="alert">
            {error instanceof Error
              ? error.message
              : "Failed to load countries."}
          </p>
        )}
        {isLoading && (
          <p className="text-sm text-gray-500">Loading countries…</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Total Countries",
              value: stats.total,
              icon: <LuGlobe className="w-5 h-5" />,
              color: "bg-blue-50 text-blue-600",
            },
            {
              label: "Active Countries",
              value: stats.active,
              icon: <FiRefreshCw className="w-5 h-5" />,
              color: "bg-green-50 text-green-600",
            },
            {
              label: "Inactive Countries",
              value: stats.inactive,
              icon: <LuGlobe className="w-5 h-5" />,
              color: "bg-red-50 text-red-600",
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
          <div className="flex items-center gap-3">
            <InputField
              type="text"
              placeholder="Search by country name"
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
          </div>
          <Button
            variant="secondary"
            size="sm"
            btnName="Bulk Import"
            icon={<LuCloudUpload className="w-4 h-4" />}
          />
        </div>

        <DataTable
          columns={countryColumns}
          data={filteredData}
          enableSelection
          totalResults={filteredData.length}
          className="flex-1 min-h-0"
        />
      </div>
    </EmptyState>
  );
};

export default Countries;
