"use client";

import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import useHook from "./useHook";

const Page = () => {
  const { inputFields, handleSubmit } = useHook();

  return (
    <form
      id="student-passport-details-form"
      className="max-w-[700px] mx-auto"
      onSubmit={handleSubmit}
    >
      <PageHeader
        titleProps={{
          children: "Add New Student",
          type: "semibold",
          className: "text-center",
        }}
        descriptionProps={{
          children: "Step-2: Passport Details & Counsellor",
          size: "lg",
          variant: "tertiary",
          className: "text-center",
        }}
      />

      <div className="space-y-8 mt-8">
        {inputFields.map((section) => (
          <div className="space-y-4" key={section.label}>
            <Text variant="brand" type="semibold" size="sm">
              {section.label}
            </Text>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              {section.fields.map(({ className, ...item }) => (
                <div key={item.name} className={className}>
                  {item.type === "select" ? (
                    <Dropdown className="w-full" {...item} />
                  ) : (
                    <InputField className="w-full" {...item} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};

export default Page;
