"use client";
import PageHeader from "@/shared/heading/PageHeader";
import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import useHook from "./useHook";

const Page = () => {
  const { inputFields, handleSubmit } = useHook();
  return (
    <form
      id="partner-bank-details-form"
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
          children: "Step-3: Bank Details",
          size: "lg",
          variant: "tertiary",
          className: "text-center",
        }}
      />
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 mt-8">
        {inputFields.map(({ className, ...item }) => (
          <div key={item.name} className={className}>
            {item.type === "select" ? (
              <Dropdown className="w-full" {...item} />
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
