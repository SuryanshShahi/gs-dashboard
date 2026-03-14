"use client";
import Button from "@/shared/buttons/Button";
import PageHeader from "@/shared/heading/PageHeader";
import InputField from "@/shared/input/InputField";
import DataTable from "@/shared/table/DataTable";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiDownload, FiPlus, FiSearch } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
import { studentColumns } from "./columns";
import { studentsData } from "./mockData";

const Students = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredData = studentsData.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6 h-full">
      <PageHeader
        titleProps={{
          children: "Student",
        }}
        descriptionProps={{
          children:
            "Track tasks efficiently and collaborate with your team.",
        }}
      />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <InputField
            type="text"
            placeholder="Search by name or ID"
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
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            btnName="Export"
            icon={<FiDownload className="w-4 h-4" />}
            iconFirst
          />
          <Button
            variant="primary"
            size="sm"
            btnName="New Student"
            icon={<FiPlus className="w-4 h-4" />}
            iconFirst
            onClick={() => router.push("/onboarding/student/personal-details")}
          />
        </div>
      </div>

      <DataTable
        columns={studentColumns}
        data={filteredData}
        enableSelection
        totalResults={100}
        className="flex-1 min-h-0"
      />
    </div>
  );
};

export default Students;
