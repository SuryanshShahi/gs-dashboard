"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import Chip from "@/shared/Chip";
import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import SelectionControl from "@/shared/input/SelectionControl";
import { useRouter } from "next/navigation";
import { FiAlertTriangle, FiEdit2 } from "react-icons/fi";
import useHook from "./useHook";

const Page = () => {
  const router = useRouter();
  const {
    handleSubmit,
    student,
    chooseProgram,
    programSummary,
    docRows,
    getDocUploadStatus,
    confirmed,
    confirmedError,
    onChangeConfirmed,
  } = useHook();

  return (
    <form
      id="application-review-submit-form"
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
          children: "Step 4: Review & Submit",
          size: "lg",
          variant: "tertiary",
          className: "text-center",
        }}
      />

      <div className="space-y-5 mt-8">
        <CardWrapper className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Text type="semibold" size="sm">
              Student Details
            </Text>
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              btnName="Edit"
              icon={<FiEdit2 className="w-4 h-4 text-brand-600" />}
              className="text-brand-600!"
              onClick={() =>
                router.push("/onboarding/application/select-student")
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name" value={student?.studentName ?? "—"} />
            <Field label="Email" value={student?.studentEmail ?? "—"} />
            <Field label="Student ID" value={student?.studentId ?? "—"} />
            <Field label="Nationality" value={student?.countryLabel ?? "—"} />
          </div>
        </CardWrapper>

        <CardWrapper className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Text type="semibold" size="sm">
              Program Details
            </Text>
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              btnName="Edit"
              icon={<FiEdit2 className="w-4 h-4 text-brand-600" />}
              className="text-brand-600!"
              onClick={() =>
                router.push("/onboarding/application/choose-program")
              }
            />
          </div>
          {programSummary ? (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Country" value={programSummary.country} />
              <Field label="University" value={programSummary.university} />
              <Field label="Program" value={programSummary.program} />
              <Field label="Intake" value={programSummary.intake} />
              <Field label="Level of Study" value={programSummary.level} />
              <Field label="Study Mode" value={programSummary.mode} />
              {chooseProgram?.applicationNotes ? (
                <div className="col-span-2">
                  <Field
                    label="Application Notes"
                    value={chooseProgram.applicationNotes}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <Text size="sm" variant="secondary">
              No program details saved.
            </Text>
          )}
        </CardWrapper>

        <CardWrapper className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Text type="semibold" size="sm">
              Documents
            </Text>
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              btnName="Edit"
              icon={<FiEdit2 className="w-4 h-4 text-brand-600" />}
              className="text-brand-600!"
              onClick={() =>
                router.push("/onboarding/application/upload-documents")
              }
            />
          </div>
          <div className="space-y-3">
            {docRows.map((row) => {
              const status = getDocUploadStatus(row.key);
              return (
                <div
                  key={row.key}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-gray-700">{row.label}</span>
                  <Chip
                    title={status}
                    type="tag"
                    size="sm"
                    variant={status === "Uploaded" ? "success" : "warning"}
                  />
                </div>
              );
            })}
          </div>
        </CardWrapper>

        <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <FiAlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
          <p>
            Once submitted, this application will be sent to your Partner Admin
            for review. You will not be able to edit it after submission.
          </p>
        </div>

        <div className="space-y-1">
          <SelectionControl
            type="checkbox"
            name="confirmed"
            label="I confirm that all the information provided is accurate and complete."
            checked={confirmed}
            onChange={onChangeConfirmed}
          />
          {confirmedError ? (
            <p className="text-xs text-red-600">{confirmedError}</p>
          ) : null}
        </div>
      </div>
    </form>
  );
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

export default Page;
