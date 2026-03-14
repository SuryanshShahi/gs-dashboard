import PageHeader from "@/shared/heading/PageHeader";
import InputField from "@/shared/input/InputField";
import UploadFile from "@/shared/input/UploadFile";

const Page = () => {
  const inputFields = [
    {
      label: "Country",
      name: "country",
      placeholder: "Select Country",
      required: true,
      className: "col-span-1",
      type: "select",
      options: [
        { label: "United States", value: "united_states" },
        { label: "Canada", value: "canada" },
        { label: "United Kingdom", value: "united_kingdom" },
        { label: "Australia", value: "australia" },
        { label: "New Zealand", value: "new_zealand" },
        { label: "Other", value: "other" },
      ],
    },
    {
      label: "Bank Name",
      name: "bankName",
      placeholder: "Enter Bank Name",
      required: true,
      className: "col-span-1",
      type: "text",
    },
    {
      label: "Account Number",
      name: "accountNumber",
      placeholder: "Enter Account Number",
      required: true,
      className: "col-span-1",
      type: "number",
    },
    {
      label: "IFSC Code",
      name: "ifscCode",
      placeholder: "Enter IFSC Code",
      required: true,
      className: "col-span-1",
      type: "text",
    },
    {
      label: "SWIFT / BIC Code",
      name: "swiftBicCode",
      placeholder: "Enter SWIFT/BIC Code",
      required: true,
      className: "col-span-1",
      type: "text",
    },
    {
      label: "Sort Code",
      name: "sortCode",
      placeholder: "Enter Sort Code",
      required: true,
      className: "col-span-1",
      type: "number",
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
          children: "Step-3: Bank Details",
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
