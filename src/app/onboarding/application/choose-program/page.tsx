"use client";

import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import Dropdown from "@/shared/input/Dropdown";
import clsx from "clsx";
import useHook from "./useHook";

const Page = () => {
  const { handleSubmit, inputFields } = useHook();

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
        {inputFields.map((section) => (
          <div key={section.label} className="space-y-4">
            <Text variant="brand" type="semibold" size="sm">
              {section.label}
            </Text>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              {section.fields.map((field) => {
                const { className, type, ...item } = field as typeof field & {
                  className?: string;
                };
                return (
                  <div key={item.name} className={className}>
                    {type === "select" ? (
                      <Dropdown className="w-full" {...item} />
                    ) : (
                      <textarea
                        className={clsx(
                          "min-h-[100px] w-full rounded-lg border px-3 py-2 text-sm outline-none resize-y",
                          item.errorMessage
                            ? "border-red-500"
                            : "border-gray-100",
                        )}
                        {...item}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};

export default Page;
