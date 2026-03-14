import PageHeader from "@/shared/heading/PageHeader";
import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import UploadFile from "@/shared/input/UploadFile";

const Page = () => {
  const inputFields = [
    {
      label: "Company Name",
      name: "companyName",
      placeholder: "Enter the partner company name",
      required: true,
      type: "text",
    },
    {
      label: "Registered Company Name",
      name: "registeredCompanyName",
      placeholder: "Enter the company's registered name",
      type: "text",
      required: true,
    },
    {
      label: "Company Type",
      name: "companyType",
      placeholder: "Select Type",
      half: true,
      type: "select",
      options: [
        { label: "Company", value: "company" },
        { label: "Individual", value: "individual" },
      ],
    },
    {
      label: "Website",
      name: "website",
      placeholder: "Enter website URL",
      half: true,
      type: "text",
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      placeholder: "Enter phone",
      required: true,
      half: true,
      type: "tel",
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter email address",
      type: "email",
      required: true,
      half: true,
    },
    {
      label: "Company Address",
      name: "companyAddress",
      placeholder: "Search address",
      required: true,
      type: "text",
    },
    {
      label: "Country",
      name: "country",
      placeholder: "Select country",
      required: true,
      half: true,
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
      label: "State",
      name: "state",
      placeholder: "Enter state",
      required: true,
      half: true,
      type: "select",
      options: [
        { label: "California", value: "california" },
        { label: "New York", value: "new_york" },
        { label: "Texas", value: "texas" },
        { label: "Other", value: "other" },
      ],
    },
    {
      label: "City",
      name: "city",
      placeholder: "Enter city",
      required: true,
      half: true,
      type: "select",
      options: [
        { label: "New York", value: "new_york" },
        { label: "Texas", value: "texas" },
        { label: "Other", value: "other" },
      ],
    },
    {
      label: "Pincode",
      name: "pincode",
      placeholder: "Enter pincode",
      required: true,
      half: true,
      type: "number",
    },
    {
      label: "Company Logo",
      subText: "Format: JPEG or PNG • Max Size: 10MB • Min Res: 500px X 500px",
      name: "companyLogo",
      required: true,
      type: "file",
    },
    {
      label: "Company Logo Square / Favicon",
      subText: "Format: JPEG or PNG • Max Size: 10MB • Min Res: 500px X 500px",
      name: "companyLogoSquare",
      required: true,
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
          children: "Step-1: Overview",
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
            ) : item.type === "file" ? (
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
