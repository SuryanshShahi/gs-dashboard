import PageHeader from "@/shared/heading/PageHeader";
import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import UploadFile from "@/shared/input/UploadFile";

const Page = () => {
  const inputFields = [
    {
      label: "First Name",
      name: "firstName",
      placeholder: "Enter First Name",
      required: true,
      half: true,
      type: "text",
    },
    {
      label: "Middle Name",
      name: "middleName",
      placeholder: "Enter Middle Name",
      required: true,
      half: true,
      type: "text",
    },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter Last Name",
      required: true,
      half: true,
      type: "text",
    },
    {
      label: "Admin Email",
      name: "adminEmail",
      placeholder: "Enter Email",
      required: true,
      half: true,
      type: "email",
    },
    {
      label: "Admin Phone Number",
      name: "adminPhoneNumber",
      placeholder: "Enter Phone Number",
      required: true,
      half: true,
      type: "number",
    },
    {
      label: "Designation",
      name: "designation",
      placeholder: "Enter Designation",
      required: true,
      half: true,
      type: "text",
    },
    {
      label: "Select RM",
      name: "selectRm",
      placeholder: "Select RM",
      required: true,
      half: true,
      type: "select",
      options: [
        { label: "RM 1", value: "rm1" },
        { label: "RM 2", value: "rm2" },
        { label: "RM 3", value: "rm3" },
        { label: "RM 4", value: "rm4" },
        { label: "RM 5", value: "rm5" },
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
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 mt-8">
        {inputFields.map(({ half, ...item }) => (
          <div key={item.name} className={half ? "col-span-1" : "col-span-2"}>
            {item.type === "select" ? (
              <Dropdown className="w-full" {...item} />
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
