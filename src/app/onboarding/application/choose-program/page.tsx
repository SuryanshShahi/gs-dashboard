"use client";

import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import Dropdown from "@/shared/input/Dropdown";
import clsx from "clsx";
import useHook from "./useHook";

const Page = () => {
  const {
    handleSubmit,
    destinationSelects,
    institutionSelects,
    studySelects,
    applicationNotes,
  } = useHook();

  return (
    <form
      id="application-choose-program-form"
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
          children: "Step 2: Choose Program",
          size: "lg",
          variant: "tertiary",
          className: "text-center",
        }}
      />

      <div className="space-y-8 mt-8">
        <div className="space-y-4">
          <Text variant="brand" type="semibold" size="sm">
            Destination
          </Text>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {destinationSelects.map((item) => (
              <Dropdown key={item.name} className="w-full" {...item} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Text variant="brand" type="semibold" size="sm">
            Institution
          </Text>
          <div className="grid grid-cols-1 gap-y-5">
            {institutionSelects.map((item) => (
              <Dropdown key={item.name} className="w-full" {...item} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Text variant="brand" type="semibold" size="sm">
            Study Details
          </Text>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {studySelects.map((item) => (
              <Dropdown key={item.name} className="w-full" {...item} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Text variant="brand" type="semibold" size="sm">
            Additional Info
          </Text>
          <div className="flex flex-col gap-y-1">
            <label className="text-sm" htmlFor="applicationNotes">
              {applicationNotes.label}
            </label>
            <textarea
              id="applicationNotes"
              name={applicationNotes.name}
              value={applicationNotes.value}
              onChange={applicationNotes.onChange}
              onBlur={applicationNotes.onBlur}
              placeholder="Any specific notes about this application..."
              rows={4}
              className={clsx(
                "min-h-[100px] w-full rounded-lg border px-3 py-2 text-sm outline-none resize-y",
                applicationNotes.errorMessage
                  ? "border-red-500"
                  : "border-gray-100",
              )}
            />
            {applicationNotes.errorMessage ? (
              <span className="text-xs text-red-600">
                {applicationNotes.errorMessage}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Page;
