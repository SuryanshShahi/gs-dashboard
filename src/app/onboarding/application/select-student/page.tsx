"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import Chip from "@/shared/Chip";
import DividerWithText from "@/shared/divider/DividerWithText";
import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import InfoCluster from "@/shared/InfoCluster";
import InputField from "@/shared/input/InputField";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FiPlus, FiSearch } from "react-icons/fi";
import useHook from "./useHook";

const Page = () => {
  const { students, values, setFieldValue, handleSubmit, submitError } =
    useHook();
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
            className="w-full"
            value={values.search}
            icon={<FiSearch className="text-gray-400" size={16} />}
            onChange={(e) => setFieldValue("search", e.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {students?.map((s) => (
              <CardWrapper
                key={s.studentId}
                onClick={() => setFieldValue("selectedStudent", s)}
                className={clsx(
                  "cursor-pointer transition-shadow space-y-2",
                  values.selectedStudent.studentId === s.studentId &&
                    "!border-brand-500 !bg-brand-50",
                )}
              >
                <InfoCluster
                  titleProps={{
                    children: s.studentName,
                    type: "semibold",
                    size: "sm",
                  }}
                  initialsClassName="!bg-brand-100"
                  textWrapperClass="!space-y-[2px]"
                  showInitials
                  descriptionProps={{ children: s.studentEmail }}
                />
                <div className="flex items-center gap-x-2">
                  <Chip
                    title={s.countryLabel}
                    variant="gray"
                    className="!rounded-md"
                    size="xs"
                  />
                  <Text as="p" size="xs" variant="secondary">
                    {s.studentId.slice(0, 6)}
                  </Text>
                </div>
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
            size="sm"
            btnName="Add New Student"
            icon={<FiPlus className="w-4 h-4" />}
            onClick={() => router.push("/onboarding/student/personal-details")}
          />
        </div>
      </div>
    </form>
  );
};

export default Page;
