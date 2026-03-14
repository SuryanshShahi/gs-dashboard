import PageHeader from "@/shared/heading/PageHeader";
import InputField from "@/shared/input/InputField";
import UploadFile from "@/shared/input/UploadFile";

const Page = () => {
  const inputFields = [
    {
      label: "GSTIN",
      name: "gstin",
      placeholder: "Enter GSTIN",
      required: true,
      className: "col-span-1",
      type: "text",
    },
    {
      label: "PAN",
      name: "pan",
      placeholder: "Enter PAN",
      required: true,
      className: "col-span-1",
      type: "text",
    },
    {
      label: "Service Agreement",
      name: "serviceAgreement",
      required: true,
      className: "col-span-2",
      type: "file",
    },
    {
      label: "Non-Disclosure Agreement",
      name: "nonDisclosureAgreement",
      subText: "Format: PDF • Max Size: 10MB",
      required: true,
      className: "col-span-2",
      type: "file",
    },
    {
      label: "Commission Structure",
      name: "commissionStructure",
      subText: "Format: PDF • Max Size: 10MB",
      required: true,
      className: "col-span-2",
      type: "file",
    },
  ];
  return (
    <div className="max-w-[600px] mx-auto">
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
    </div>
  );
};

export default Page;
