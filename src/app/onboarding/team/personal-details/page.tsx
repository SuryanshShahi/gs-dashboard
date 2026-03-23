"use client";
import BtnGroup from "@/shared/buttons/BtnGroup";
import PageHeader from "@/shared/heading/PageHeader";
import { FaMars, FaVenus } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import Text from "@/shared/heading/Text";
import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import MultiSelect from "@/shared/input/MultiSelect";
import UploadFile from "@/shared/input/UploadFile";
import { useState } from "react";

const partnerOptions = [
  { label: "Crimson Consulting", value: "crimson" },
  { label: "Grow Next", value: "grow_next" },
  { label: "Fateh", value: "fateh" },
  { label: "IDP", value: "idp" },
  { label: "EduNext", value: "edunext" },
  { label: "StudyPro", value: "studypro" },
  { label: "Edurizon", value: "edurizon" },
  { label: "Hello Study Global", value: "hello_study" },
];

const Page = () => {
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [assignedPartners, setAssignedPartners] = useState<string[]>([]);
  const showAssignedPartners = role === "relationship_manager";
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
          label: "Photo",
          name: "photo",
          subText:
            "Format: JPEG or PNG • Max Size: 10MB • Min Res: 500px X 500px",
          className: "col-span-6",
          type: "file",
          variant: "image" as const,
        },
        {
          label: "Employment Start Date",
          name: "employmentStartDate",
          placeholder: "Select date of birth",
          required: true,
          className: "col-span-3",
          type: "date",
        },
        {
          label: "Employee ID",
          name: "employeeId",
          placeholder: "Enter employee ID",
          required: true,
          className: "col-span-3",
          type: "text",
        },
      ],
    },
    {
      label: "Role & Access",
      cols: 2,
      fields: [
        {
          label: "Role",
          name: "role",
          placeholder: "Select Role",
          required: true,
          className: "col-span-1",
          type: "select",
          options: [
            { label: "Admin", value: "admin" },
            { label: "Manager", value: "manager" },
            { label: "Relationship Manager", value: "relationship_manager" },
            { label: "Counsellor", value: "counsellor" },
            { label: "Viewer", value: "viewer" },
          ],
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
                        { label: "Male", value: "male", icon: <FaMars className="w-4 h-4" /> },
                        { label: "Female", value: "female", icon: <FaVenus className="w-4 h-4" /> },
                        { label: "Other", value: "other", icon: <LuUser className="w-4 h-4" /> },
                      ]}
                      onClick={(btn) => setGender(btn.value)}
                      selected={gender}
                    />
                  ) : item.type === "select" ? (
                    section.label === "Role & Access" &&
                    item.name === "role" ? (
                      <Dropdown
                        className="w-full"
                        {...item}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    ) : (
                      <Dropdown className="w-full" {...item} />
                    )
                  ) : item.type === "file" ? (
                    <UploadFile
                      label={item.label}
                      subText={"subText" in item ? item.subText : undefined}
                      variant={
                        "variant" in item ? item.variant : "mixed"
                      }
                    />
                  ) : (
                    <InputField className="w-full" {...item} />
                  )}
                </div>
              ))}
              {section.label === "Role & Access" && showAssignedPartners && (
                <div className="col-span-2">
                  <MultiSelect
                    label="Assigned Partners"
                    options={partnerOptions}
                    value={assignedPartners}
                    onChange={setAssignedPartners}
                    placeholder="Search partners..."
                    required
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
