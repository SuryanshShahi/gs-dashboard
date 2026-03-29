"use client";

import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import { ModalTemplate } from "@/shared/modal/ModalTemplate";
import { LuBuilding2 } from "react-icons/lu";
import useHook from "./useHook";
import type { UniversityTableRow } from "../types";

export default function AddUniversityModal({
  isOpen,
  close,
  selectedUniversity,
}: {
  isOpen: boolean;
  close: () => void;
  selectedUniversity: UniversityTableRow | null;
}) {
  const {
    inputFields,
    handleSubmit,
    isSubmitDisabled,
    resetForm,
    isPending,
    isUpdateUniversityPending,
  } = useHook({
    close,
    selectedUniversity,
  });

  const onClose = () => {
    resetForm();
    close();
  };

  return (
    <ModalTemplate
      modalProps={{ isOpen, close: onClose }}
      headerDetails={{
        title: selectedUniversity ? "Edit University" : "Add University",
        subtitle: selectedUniversity
          ? "Edit the university details."
          : "Add a new university to your list.",
        icon: <LuBuilding2 size={24} className="text-white" />,
      }}
      btnProps={{
        leftBtnName: "Cancel",
        rightBtnName: selectedUniversity
          ? "Update University"
          : "Add University",
        leftOnClick: onClose,
        rightOnClick: () => handleSubmit(),
        disabled: isSubmitDisabled,
        isRightBtnLoading: isPending || isUpdateUniversityPending,
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
        {inputFields.map(({ className, ...item }) => {
          return (
            <div key={item.name} className={className}>
              {item.type === "select" ? (
                <Dropdown className="w-full" {...item} />
              ) : (
                <InputField className="w-full" {...item} />
              )}
            </div>
          );
        })}
      </div>
    </ModalTemplate>
  );
}
