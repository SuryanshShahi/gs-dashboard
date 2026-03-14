"use client";
import Button from "@/shared/buttons/Button";
import PageHeader from "@/shared/heading/PageHeader";
import InputField from "@/shared/input/InputField";
import DataTable from "@/shared/table/DataTable";
import TabBar from "@/shared/tabs";
import { useState } from "react";
import { BsGrid, BsTable } from "react-icons/bs";
import { FiPlus, FiSearch } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
import { partnerColumns } from "./columns";
import { partnersData } from "./mockData";
import { useRouter } from "next/navigation";


const Partners = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const filteredData = partnersData.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6 h-full">
      <PageHeader
        titleProps={{
          children: "Partners",
        }}
        descriptionProps={{
          children: "Track tasks efficiently and collaborate with your team.",
        }}
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
            onClick={() => router.push("/onboarding/overview")}
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
