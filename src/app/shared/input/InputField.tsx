import clsx from "clsx";
import { InputHTMLAttributes, ReactNode } from "react";
import { FiAlertCircle } from "react-icons/fi";
export interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  wrapperClass?: string;
  icon?: ReactNode;
  errorMessage?: string;
  secondaryIcon?: ReactNode;
}
const InputField = ({
  label,
  className,
  wrapperClass,
  errorMessage,
  icon,
  secondaryIcon,
  ...rest
}: IInputField) => {
  return (
    <div className={clsx("flex flex-col gap-y-1", wrapperClass)}>
      {label && <label className="text-secondary text-sm">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-[14px]">{icon}</div>}
        <input
          className={clsx(
            "h-11 rounded-lg border p-3 outline-none",
            icon && "pl-9",
            secondaryIcon && "pr-9",
            errorMessage ? "border-red-500" : "border-gray-100",
            className,
          )}
          {...rest}
        />
        {secondaryIcon && (
          <div className="absolute right-3 top-[14px]">{secondaryIcon}</div>
        )}
        {errorMessage && (
          <FiAlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-[14px]" />
        )}
      </div>
      {errorMessage && (
        <div className="text-xs text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};

export default InputField;
