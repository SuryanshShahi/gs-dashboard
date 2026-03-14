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
import CardWrapper from "@/shared/cards/CardWrapper";
import InfoCluster from "@/shared/InfoCluster";
import Text from "@/shared/heading/Text";
import Chip from "@/shared/Chip";

const Partners = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const filteredData = partnersData.filter(
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
          data={filteredData}
          enableSelection
          totalResults={100}
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
          {Array(10)
            .fill(null)
            .map((_, idx) => (
              <CardWrapper
                key={idx}
                className="!px-[10px] !py-2 rounded-xl space-y-2"
              >
                <InfoCluster
                  showInitials
                  children={
                    <Chip
                      title="24 Pending"
                      variant="orange"
                      size="xs"
                      className="order-last !rounded-full ml-auto -mt-[18px]"
                    />
                  }
                  textWrapperClass="!space-y-0"
                  titleProps={{ children: "EduNext" }}
                  descriptionProps={{
                    children: "New Delhi, India",
                    size: "xs",
                  }}
                />
                <Text variant="tertiary" size="xxs">
                  9999 Counsellors • 9999 Active Students • 9999 Active Courses
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
