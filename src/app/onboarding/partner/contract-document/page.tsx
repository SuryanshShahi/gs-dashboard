"use client";
import PageHeader from "@/shared/heading/PageHeader";
import InputField from "@/shared/input/InputField";
import UploadFile from "@/shared/input/UploadFile";
import useHook from "./useHook";

const Page = () => {
  const { inputFields, handleSubmit } = useHook();
  return (
    <form
      id="partner-contract-document-form"
      className="max-w-[600px] mx-auto"
      onSubmit={handleSubmit}
    >
      <PageHeader
        titleProps={{
          children: "Onboard New Partner",
          type: "semibold",
          className: "text-center",
        }}
        descriptionProps={{
          children: "Step-2: Contracts & Documents",
          size: "lg",
          variant: "tertiary",
          className: "text-center",
        }}
      />
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 mt-8">
        {inputFields.map(({ className, ...item }) => (
          <div key={item.name} className={className}>
            {item.type === "file" ? (
              <UploadFile {...item} />
            ) : (
              <InputField className="w-full" {...item} />
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default Page;
