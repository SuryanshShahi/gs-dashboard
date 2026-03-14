import clsx from "clsx";
import { FaSave } from "react-icons/fa";
import {
  FaCircle,
  FaTrash
} from "react-icons/fa6";
import { GoCheckCircle } from "react-icons/go";
import Button from "../buttons/Button";
import { ModalTemplate } from "./ModalTemplate";

const ConfirmationModal = ({
  close,
  isOpen,
  leftBtnName = "Cancel",
  rightBtnName,
  onSubmit,
  title,
  description,
  type,
  size = "md",
  styleHeader,
  isLoading,
}: {
  isOpen: boolean;
  close: () => void;
  onSubmit: () => void;
  leftBtnName?: string;
  rightBtnName: string;
  title: string;
  description: string;
  type: "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  styleHeader?: string;
  isLoading?: boolean;
}) => {
  return (
    <ModalTemplate
      className="p-6 space-y-4"
      modalProps={{ close, isOpen, size }}
    >
      <div className={clsx("space-y-4", styleHeader)}>
        <div className="flex w-max justify-center items-center self-start relative">
          <FaCircle
            size={48}
            className={clsx({
              "text-success-solid": type === "success",
              "text-warning-solid": type === "warning",
              "text-error-solid": type === "danger",
            })}
          />
          <div
            className={clsx(
              "h-8 w-8 rounded-full absolute flex justify-center items-center",
              {
                "bg-success-solid": type === "success",
                "bg-warning-solid": type === "warning",
                "bg-error-solid": type === "danger",
              },
            )}
          >
            {type === "success" ? (
              <GoCheckCircle size={20} className="text-white" />
            ) : type === "warning" ? (
              <FaSave size={20} className="text-white" />
            ) : (
              <FaTrash size={20} className="text-white" />
            )}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-lg font-semibold text-primary">{title}</div>
          <div className="text-sm text-tertiary">{description}</div>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col items-start sm:items-center gap-3 !mt-8">
        <div
          className={clsx(
            "flex sm:flex-row flex-col justify-end gap-3 w-full ml-auto",
            { "sm:w-max": size === "lg" || size === "md" },
          )}
        >
          <Button
            btnName={leftBtnName}
            onClick={close}
            variant="secondary"
            fullWidth
          />
          <Button
            btnName={rightBtnName}
            onClick={onSubmit}
            variant={type === "danger" ? "error" : "primary"}
            fullWidth
            isLoading={isLoading}
          />
        </div>
      </div>
    </ModalTemplate>
  );
};

export default ConfirmationModal;
