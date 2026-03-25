"use client";

import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import UploadFile from "@/shared/input/UploadFile";
import { FiInfo } from "react-icons/fi";
import useHook from "./useHook";

const Page = () => {
  const { handleSubmit, infoBanner, requiredDocs, optionalDocs } = useHook();

  return (
    <form
      id="application-upload-documents-form"
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
          children: "Step 3: Upload Documents",
          size: "lg",
          variant: "tertiary",
          className: "text-center",
        }}
      />

      <div className="mt-3 flex gap-3 rounded-lg border border-blue-100 bg-blue-50/80 px-4 py-3 text-sm text-blue-900">
        <FiInfo className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" />
        <p>{infoBanner}</p>
      </div>

      <div className="space-y-8 mt-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline gap-2">
            <Text variant="brand" type="semibold" size="sm">
              Required Documents
            </Text>
            <span className="text-xs text-red-500">* All fields are required</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {requiredDocs.map((f) => (
              <UploadFile key={f.name} variant="document" {...f} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Text variant="brand" type="semibold" size="sm">
            Optional Documents
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {optionalDocs.map((f) => (
              <UploadFile key={f.name} variant="document" {...f} />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Page;
