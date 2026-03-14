import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import UploadFile from "@/shared/input/UploadFile";

const Page = () => {
  const inputFields = [
    {
      label: "Partner Admin",
      fields: [
        {
          label: "First Name",
          name: "firstName",
          placeholder: "Enter First Name",
          required: true,
          className: "col-span-1",
          type: "text",
        },
        {
          label: "Middle Name",
          name: "middleName",
          placeholder: "Enter Middle Name",
          required: true,
          className: "col-span-1",
          type: "text",
        },
        {
          label: "Last Name",
          name: "lastName",
          placeholder: "Enter Last Name",
          required: true,
          className: "col-span-1",
          type: "text",
        },
        {
          label: "Admin Email",
          name: "adminEmail",
          placeholder: "Enter Email",
          required: true,
          className: "col-span-1",
          type: "email",
        },
        {
          label: "Admin Phone Number",
          name: "adminPhoneNumber",
          placeholder: "Enter Phone Number",
          required: true,
          className: "col-span-1",
          type: "number",
        },
        {
          label: "Designation",
          name: "designation",
          placeholder: "Enter Designation",
          required: true,
          className: "col-span-1",
          type: "text",
        },
      ],
    },
    {
      label: "Global Scholar Relationship Manager",
      fields: [
        {
          label: "Select RM",
          name: "selectRm",
          placeholder: "Select RM",
          required: true,
          className: "col-span-1",
          type: "select",
          options: [
            { label: "RM 1", value: "rm1" },
            { label: "RM 2", value: "rm2" },
            { label: "RM 3", value: "rm3" },
            { label: "RM 4", value: "rm4" },
            { label: "RM 5", value: "rm5" },
          ],
        },
      ],
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
      <div className="space-y-8 mt-8">
        {inputFields.map((field) => (
          <div className="space-y-4">
            <Text variant="brand" type="semibold" size="sm">
              {field.label}
            </Text>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              {field.fields.map(({ className, ...item }) => (
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
    </div>
  );
};

export default Page;
