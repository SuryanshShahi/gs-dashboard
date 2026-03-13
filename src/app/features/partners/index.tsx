"use client";
import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
import { BsGrid, BsTable } from "react-icons/bs";
import clsx from "clsx";
import PageHeader from "@/app/shared/heading/PageHeader";
import Button from "@/app/shared/buttons/Button";
import DataTable from "@/app/shared/table/DataTable";
import { partnerColumns } from "./columns";
import { partnersData } from "./mockData";
import TabBar from "@/app/shared/tabs";
import InputField from "@/app/shared/input/InputField";

type ViewMode = "table" | "grid";

const Partners = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [search, setSearch] = useState("");

  const filteredData = partnersData.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6 h-full">
      <PageHeader
        title="Partners"
        description="Track tasks efficiently and collaborate with your team."
      />

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <TabBar
          tabs={[
            {
              name: "Table View",
              count: filteredData.length,
              reactIcon: <BsTable className="w-4 h-4" />,
            },
            {
              name: "Grid View",
              count: filteredData.length,
              reactIcon: <BsGrid className="w-4 h-4" />,
            },
          ]}
        />
        <div className="flex items-center gap-3">
          <div className="relative">
            <InputField
              type="text"
              placeholder="Search"
              value={search}
              icon={<FiSearch className="text-gray-400" size={16} />}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            btnName="Filter"
            icon={<LuFilter className="w-4 h-4" />}
            iconFirst
          />
          <Button
            variant="primary"
            size="sm"
            btnName="Onboard New Partner"
            icon={<FiPlus className="w-4 h-4" />}
            iconFirst
          />
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={partnerColumns}
        data={filteredData}
        enableSelection
        totalResults={100}
        className="flex-1 min-h-0"
      />
    </div>
  );
};

export default Partners;
