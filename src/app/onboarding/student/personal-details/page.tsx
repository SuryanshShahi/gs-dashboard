"use client";

import BtnGroup from "@/shared/buttons/BtnGroup";
import PageHeader from "@/shared/heading/PageHeader";
import Text from "@/shared/heading/Text";
import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import UploadFile from "@/shared/input/UploadFile";
import { FaMars, FaVenus } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import useHook from "./useHook";

const Page = () => {
  const { inputFields, handleSubmit, gender, genderError, setGender } = useHook();

  return (
    <form
      id="student-personal-details-form"
      className="max-w-[700px] mx-auto"
      onSubmit={handleSubmit}
    >
      <PageHeader
        titleProps={{
          children: "Add New Student",
          type: "semibold",
          className: "text-center",
        }}
        descriptionProps={{
          children: "Step-1: Personal Details",
          size: "lg",
          variant: "tertiary",
          className: "text-center",
        }}
      />

      <div className="space-y-8 mt-8">
        <div className="space-y-4">
          <Text variant="brand" type="semibold" size="sm">
            Personal Details
          </Text>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {inputFields.map((item) => {
              if (item.type === "gender") {
                return (
                  <div key="gender" className={item.className}>
                    <div className="flex flex-col gap-y-1">
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
                      {genderError ? (
                        <span className="text-xs text-red-500">
                          {genderError}
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              }
              if (item.type === "select") {
                const { className: cellClass, type: _t, ...rest } = item;
                return (
                  <div key={item.name} className={cellClass}>
                    <Dropdown className="w-full" {...rest} />
                  </div>
                );
              }
              if (item.type === "file") {
                const { className: cellClass, type: _t, ...rest } = item;
                return (
                  <div key={item.name} className={cellClass}>
                    <UploadFile {...rest} />
                  </div>
                );
              }
              const { className: cellClass, type, ...rest } = item;
              return (
                <div key={item.name} className={cellClass}>
                  <InputField className="w-full" type={type} {...rest} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Page;
