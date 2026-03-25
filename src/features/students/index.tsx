"use client";
import Button from "@/shared/buttons/Button";
import PageHeader from "@/shared/heading/PageHeader";
import InputField from "@/shared/input/InputField";
import DataTable from "@/shared/table/DataTable";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { FiDownload, FiPlus, FiSearch } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
import { studentColumns } from "./sections/columns";
import StudentDetailDrawer from "./sections/StudentDetailDrawer";
import type { IStudent, StudentTableRow } from "./types";
import useHook from "./useHook";

const Students = () => {
  const { students, tableRows, isLoading, isError, error } = useHook();
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const handleRowClick = useCallback(
    (row: StudentTableRow) => {
      const full = students?.data?.find((s) => s.id === row.id) ?? null;
      setSelectedStudent(full);
      setIsDrawerOpen(true);
    },
    [students],
  );

  const filteredData = tableRows.filter(
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

      {isError && (
        <p className="text-sm text-red-600" role="alert">
          {error instanceof Error ? error.message : "Failed to load students."}
        </p>
      )}
      {isLoading && (
        <p className="text-sm text-gray-500">Loading students…</p>
      )}

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
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            btnName="Export"
            icon={<FiDownload className="w-4 h-4" />}
          />
          <Button
            variant="primary"
            size="sm"
            btnName="New Student"
            icon={<FiPlus className="w-4 h-4" />}
            onClick={() => router.push("/onboarding/student/personal-details")}
          />
        </div>
      </div>

      <DataTable
        columns={studentColumns}
        data={isLoading ? [] : filteredData}
        enableSelection
        totalResults={filteredData.length}
        onRowClick={handleRowClick}
        className="flex-1 min-h-0"
      />

      <StudentDetailDrawer
        student={selectedStudent}
        isOpen={isDrawerOpen}
        close={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default Students;
