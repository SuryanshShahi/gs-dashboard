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
import { useRouter } from "next/navigation";
import CardWrapper from "@/shared/cards/CardWrapper";
import InfoCluster from "@/shared/InfoCluster";
import Text from "@/shared/heading/Text";
import Chip from "@/shared/Chip";
import useHook from "./useHook";

const Partners = () => {
  const { tableRows, isLoading, isError, error } = useHook();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const filteredData = tableRows.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()),
  );

  const tabData = [
    {
      name: "Table View",
      count: filteredData.length,
      reactIcon: <BsTable className="w-4 h-4" />,
      component: (
        <DataTable
          columns={partnerColumns}
          data={isLoading ? [] : filteredData}
          enableSelection
          totalResults={filteredData.length}
          className="flex-1 min-h-0"
        />
      ),
    },
    {
      name: "Grid View",
      count: filteredData.length,
      reactIcon: <BsGrid className="w-4 h-4" />,
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(isLoading ? [] : filteredData).map((p) => (
            <CardWrapper
              key={p.id}
              className="!px-[10px] !py-2 rounded-xl space-y-2"
            >
              <InfoCluster
                showInitials
                children={
                  p.pendingApplications != null ? (
                    <Chip
                      title={`${p.pendingApplications} Pending`}
                      variant="orange"
                      size="xs"
                      className="order-last !rounded-full ml-auto -mt-[18px]"
                    />
                  ) : undefined
                }
                textWrapperClass="!space-y-0"
                titleProps={{ children: p.name }}
                descriptionProps={{
                  children: p.location,
                  size: "xs",
                }}
              />
              <Text variant="tertiary" size="xxs">
                {p.relationshipManager
                  ? `${p.relationshipManager.name} • `
                  : "Unassigned • "}
                {p.activeStudents} Active Students
              </Text>
            </CardWrapper>
          ))}
        </div>
      ),
    },
  ];
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

      {isError && (
        <p className="text-sm text-red-600" role="alert">
          {error instanceof Error ? error.message : "Failed to load partners."}
        </p>
      )}
      {isLoading && <p className="text-sm text-gray-500">Loading partners…</p>}

      <div className="relative flex-1 min-h-0 flex flex-col">
        <TabBar tabs={tabData} className="flex-1 min-h-0" />
        <div className="flex items-center gap-3 absolute right-0 top-0">
          <InputField
            type="text"
            placeholder="Search"
            value={search}
            icon={<FiSearch className="text-gray-400" size={16} />}
            onChange={(e) => setSearch(e.target.value)}
          />
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
            onClick={() => router.push("/onboarding/partner/overview")}
            btnName="Onboard New Partner"
            icon={<FiPlus className="w-4 h-4" />}
            iconFirst
          />
        </div>
      </div>
    </div>
  );
};

export default Partners;
