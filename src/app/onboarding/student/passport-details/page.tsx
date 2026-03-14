"use client";
import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import { FiCloud, FiRefreshCw } from "react-icons/fi";
import { useState } from "react";

const countryOptions = [
  { label: "India", value: "india" },
  { label: "United States", value: "united_states" },
  { label: "United Kingdom", value: "united_kingdom" },
  { label: "Canada", value: "canada" },
  { label: "Australia", value: "australia" },
  { label: "Other", value: "other" },
];

const rmOptions = [
  { label: "Aman Shahi", value: "aman_shahi" },
  { label: "Priya Sharma", value: "priya_sharma" },
  { label: "Rahul Verma", value: "rahul_verma" },
  { label: "Sneha Patel", value: "sneha_patel" },
];

const Page = () => {
  const [countryOfCitizenship, setCountryOfCitizenship] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [selectRm, setSelectRm] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <div className="max-w-[700px] mx-auto">
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

      <div className="mt-8 space-y-8">
        <div>
          <Text variant="brand" type="semibold" size="sm" className="mb-4">
            Passport Details
          </Text>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <Dropdown
              label="Country of Citizenship"
              required
              options={countryOptions}
              placeholder="Select country"
              value={countryOfCitizenship}
              onChange={(e) => setCountryOfCitizenship(e.target.value)}
              className="w-full"
            />
            <div className="flex flex-col gap-y-1">
              <label className="text-sm">Passport Details</label>
              <div className="flex items-center gap-2">
                <InputField
                  placeholder="Enter passport number"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  className="flex-1 min-w-0"
                />
                <input
                  type="file"
                  id="passport-upload"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setIsUploaded(true);
                  }}
                />
                {isUploaded ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      <FiCloud className="w-3.5 h-3.5" />
                      Uploaded
                    </span>
                    <button
                      type="button"
                      className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                      aria-label="Refresh"
                    >
                      <FiRefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="passport-upload"
                    className="shrink-0 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    Upload
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Text variant="brand" type="semibold" size="sm" className="mb-4">
            Counsellor
          </Text>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div className="col-span-2">
              <Dropdown
                label="Select RM"
                required
                options={rmOptions}
                placeholder="Select relationship manager"
                value={selectRm}
                onChange={(e) => setSelectRm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
