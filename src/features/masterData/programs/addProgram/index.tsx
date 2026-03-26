"use client";

import Dropdown from "@/shared/input/Dropdown";
import InputField from "@/shared/input/InputField";
import { ModalTemplate } from "@/shared/modal/ModalTemplate";
import { LuBookOpen } from "react-icons/lu";
import useHook from "./useHook";

export default function AddProgramModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const { inputFields, handleSubmit, isSubmitDisabled, resetForm, isPending } =
    useHook({
      close,
    });

  const onClose = () => {
    resetForm();
    close();
  };

  return (
    <ModalTemplate
      modalProps={{ isOpen, close: onClose }}
      headerDetails={{
        title: "Add Program",
        subtitle: "Add a new academic program.",
        icon: <LuBookOpen size={24} className="text-white" />,
      }}
      btnProps={{
        leftBtnName: "Cancel",
        rightBtnName: "Add Program",
        leftOnClick: onClose,
        rightOnClick: handleSubmit,
        disabled: isSubmitDisabled,
        isRightBtnLoading: isPending,
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
