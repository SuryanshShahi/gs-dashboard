"use client";
import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import Button from "@/shared/buttons/Button";
import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import UploadFile from "@/shared/input/UploadFile";
import { FiInfo, FiUpload } from "react-icons/fi";
import InputWithUpload from "@/shared/input/InputWithUpload";

const Page = () => {
  const inputFields = [
    {
      label: "Documents",
      fields: [
        {
          label: "Aadhaar",
          name: "aadhaar",
          placeholder: "Enter Aadhaar number",
          className: "col-span-1",
          type: "inputWithUpload",
        },
        {
          label: "PAN Card",
          name: "panCard",
          placeholder: "Enter PAN number",
          className: "col-span-1",
          type: "inputWithUpload",
        },
        {
          label: "Appointment Letter",
          name: "appointmentLetter",
          subText: "Format: PDF • Max Size: 10MB",
          className: "col-span-2",
          type: "file",
        },
      ],
    },
    {
      label: "Emergency Contact",
      fields: [
        {
          label: "Name",
          name: "emergencyContactName",
          placeholder: "Enter Name",
          required: true,
          className: "col-span-1",
          type: "text",
        },
        {
          label: "Relationship",
          name: "emergencyRelationship",
          placeholder: "Select Relationship",
          required: true,
          className: "col-span-1",
          type: "select",
          options: [
            { label: "Spouse", value: "spouse" },
            { label: "Parent", value: "parent" },
            { label: "Sibling", value: "sibling" },
            { label: "Friend", value: "friend" },
            { label: "Other", value: "other" },
          ],
        },
        {
          label: "Phone Number",
          name: "emergencyPhone",
          placeholder: "Enter Phone",
          className: "col-span-1",
          type: "tel",
        },
        {
          label: "Email",
          name: "emergencyEmail",
          placeholder: "Enter email address",
          required: true,
          className: "col-span-1",
          type: "email",
        },
      ],
    },
  ];

  return (
    <div className="max-w-[700px] mx-auto">
      <PageHeader
        titleProps={{
          children: "Onboard New Team Member",
          type: "semibold",
          className: "text-center",
        }}
        descriptionProps={{
          children: "Step-2: Emergency Contact",
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
              {section.fields.map(({ className, type, ...item }) => (
                <div key={item.name} className={className}>
                  {type === "inputWithUpload" ? (
                    <InputWithUpload
                      inputProps={{ ...item, label: undefined }}
                    />
                  ) : type === "select" ? (
                    <Dropdown className="w-full" {...item} />
                  ) : type === "file" ? (
                    <UploadFile
                      label={item.label}
                      subText={"subText" in item ? item.subText : undefined}
                      required={"required" in item ? item.required : false}
                    />
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
