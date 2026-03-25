"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import DividerWithText from "@/shared/divider/DividerWithText";
import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import InputField from "@/shared/input/InputField";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FiPlus, FiSearch } from "react-icons/fi";
import useHook from "./useHook";
import InfoCluster from "@/shared/InfoCluster";

const Page = () => {
  const {
    search,
    setSearch,
    filteredStudents,
    selectedId,
    selectStudent,
    handleSubmit,
    submitError,
  } = useHook();
  const router = useRouter();

  return (
    <form
      id="application-select-student-form"
      className="max-w-[700px] mx-auto"
      onSubmit={handleSubmit}
    >
      <PageHeader
        titleProps={{
          children: "Create New Application",
          type: "semibold",
          className: "text-center",
        }}
        descriptionProps={{
          children: "Step 1: Select Student",
          size: "lg",
          variant: "tertiary",
          className: "text-center",
        }}
      />

      <div className="space-y-6 mt-8">
        <div className="space-y-4">
          <Text variant="brand" type="semibold" size="sm">
            Search Existing Student
          </Text>
          <InputField
            type="text"
            placeholder="Search by name, email or student ID..."
            value={search}
            icon={<FiSearch className="text-gray-400" size={16} />}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredStudents.map((s) => (
              <CardWrapper
                key={s.id}
                onClick={() => selectStudent(s.id)}
                className={clsx(
                  "cursor-pointer transition-shadow",
                  selectedId === s.id &&
                    "ring-2 ring-brand-600 border-brand-200 shadow-sm",
                )}
              >
                <InfoCluster
                  titleProps={{
                    children: s.name,
                    type: "semibold",
                    size: "sm",
                  }}
                  textWrapperClass="!space-y-[2px]"
                  showInitials
                  descriptionProps={{ children: s.email }}
                  secondChild={
                    <Text as="p" size="xs" variant="secondary">
                      {s.country} · {s.id}
                    </Text>
                  }
                />
              </CardWrapper>
            ))}
          </div>
          {submitError && <p className="text-xs text-red-600">{submitError}</p>}
        </div>

        <DividerWithText text="OR" />

        <div className="space-y-4">
          <Text variant="brand" type="semibold" size="sm">
            Add a New Student Instead
          </Text>
          <Text as="p" size="sm" variant="secondary">
            If the student is not in the system yet, you can create a new
            student profile first.
          </Text>
          <Button
            type="button"
            variant="secondary"
            size="md"
            btnName="Add New Student"
            icon={<FiPlus className="w-4 h-4" />}
            className="w-full sm:w-auto border-brand-600 text-brand-600"
            onClick={() => router.push("/onboarding/student/personal-details")}
          />
        </div>
      </div>
    </form>
  );
};

export default Page;
