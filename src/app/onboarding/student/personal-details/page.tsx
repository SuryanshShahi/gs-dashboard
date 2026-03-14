"use client";
import BtnGroup from "@/shared/buttons/BtnGroup";
import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import UploadFile from "@/shared/input/UploadFile";
import { FaMars, FaVenus } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { useState } from "react";

const Page = () => {
  const [gender, setGender] = useState("");
  const inputFields = [
    {
      label: "Personal Details",
      cols: 3,
      fields: [
        {
          label: "First Name",
          name: "firstName",
          placeholder: "Enter first name",
          required: true,
          className: "col-span-2",
          type: "text",
        },
        {
          label: "Middle Name",
          name: "middleName",
          placeholder: "Enter middle name",
          className: "col-span-2",
          type: "text",
        },
        {
          label: "Last Name",
          name: "lastName",
          placeholder: "Enter last name",
          required: true,
          className: "col-span-2",
          type: "text",
        },
        {
          label: "Email",
          name: "email",
          placeholder: "Enter email address",
          required: true,
          className: "col-span-3",
          type: "email",
        },
        {
          label: "Phone Number",
          name: "phoneNumber",
          placeholder: "Enter phone",
          required: true,
          className: "col-span-3",
          type: "tel",
        },
        {
          label: "Select Gender",
          name: "gender",
          required: true,
          className: "col-span-3",
          type: "gender",
        },
        {
          label: "Date of Birth",
          name: "dateOfBirth",
          placeholder: "Select date of birth",
          required: true,
          className: "col-span-3",
          type: "date",
        },
        {
          label: "Address",
          name: "address",
          placeholder: "Enter address",
          required: true,
          className: "col-span-6",
          type: "text",
        },
        {
          label: "Country",
          name: "country",
          placeholder: "Select country",
          required: true,
          className: "col-span-3",
          type: "select",
          options: [
            { label: "India", value: "india" },
            { label: "United States", value: "united_states" },
            { label: "United Kingdom", value: "united_kingdom" },
            { label: "Canada", value: "canada" },
            { label: "Australia", value: "australia" },
            { label: "Other", value: "other" },
          ],
        },
        {
          label: "State",
          name: "state",
          placeholder: "Enter state",
          required: true,
          className: "col-span-3",
          type: "text",
        },
        {
          label: "City",
          name: "city",
          placeholder: "Enter city",
          required: true,
          className: "col-span-3",
          type: "text",
        },
        {
          label: "Pincode",
          name: "pincode",
          placeholder: "Enter pincode",
          required: true,
          className: "col-span-3",
          type: "text",
        },
        {
          label: "Photo",
          name: "photo",
          subText:
            "Format: JPEG or PNG • Max Size: 10MB • Min Res: 500px X 500px",
          className: "col-span-6",
          type: "file",
        },
      ],
    },
  ];

  return (
    <div className="max-w-[700px] mx-auto">
      <PageHeader
        titleProps={{
          children: "Add New Student",
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
      <div className="space-y-8 mt-8">
        {inputFields.map((section) => (
          <div key={section.label} className="space-y-4">
            <Text variant="brand" type="semibold" size="sm">
              {section.label}
            </Text>
            <div
              className={`grid gap-x-4 gap-y-5 ${section.cols === 3 ? "grid-cols-6" : "grid-cols-2"}`}
            >
              {section.fields.map(({ className, ...item }) => (
                <div key={item.name} className={className}>
                  {item.type === "gender" ? (
                    <BtnGroup
                      label={item.label}
                      required={item.required}
                      buttons={[
                        {
                          label: "Male",
                          value: "male",
                          icon: <FaMars className="w-4 h-4" />,
                        },
                        {
                          label: "Female",
                          value: "female",
                          icon: <FaVenus className="w-4 h-4" />,
                        },
                        {
                          label: "Other",
                          value: "other",
                          icon: <LuUser className="w-4 h-4" />,
                        },
                      ]}
                      onClick={(btn) => setGender(btn.value)}
                      selected={gender}
                    />
                  ) : item.type === "select" ? (
                    <Dropdown className="w-full" {...item} />
                  ) : item.type === "file" ? (
                    <UploadFile
                      label={item.label}
                      subText={"subText" in item ? item.subText : undefined}
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
