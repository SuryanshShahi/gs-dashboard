"use client";

import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import { ModalTemplate } from "@/shared/modal/ModalTemplate";
import { LuBookOpen } from "react-icons/lu";
import type { ProgramTableRow } from "../types";
import useHook from "./useHook";

export default function AddProgramModal({
  isOpen,
  close,
  selectedProgram,
}: {
  isOpen: boolean;
  close: () => void;
  selectedProgram: ProgramTableRow | null;
}) {
  const {
    inputFields,
    handleSubmit,
    isSubmitDisabled,
    resetForm,
    isPending,
    isUpdateProgramPending,
  } = useHook({
    close,
    selectedProgram,
  });

  const onClose = () => {
    resetForm();
    close();
  };

  return (
    <ModalTemplate
      modalProps={{ isOpen, close: onClose }}
      headerDetails={{
        title: selectedProgram ? "Edit Program" : "Add Program",
        subtitle: selectedProgram
          ? "Update this academic program."
          : "Add a new academic program.",
        icon: <LuBookOpen size={24} className="text-white" />,
      }}
      btnProps={{
        leftBtnName: "Cancel",
        rightBtnName: selectedProgram ? "Update Program" : "Add Program",
        leftOnClick: onClose,
        rightOnClick: () => void handleSubmit(),
        disabled: isSubmitDisabled,
        isRightBtnLoading: isPending || isUpdateProgramPending,
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
