import clsx from "clsx";
import { InputHTMLAttributes, ReactNode } from "react";
import { FiAlertCircle } from "react-icons/fi";
interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  wrapperClass?: string;
  icon?: ReactNode;
  errorMessage?: string;
}
const InputField = ({
  label,
  className,
  wrapperClass,
  errorMessage,
  icon,
  ...rest
}: IInputField) => {
  return (
    <div className={clsx("flex flex-col gap-y-1", wrapperClass)}>
      {label && <label className="text-secondary text-sm">{label}</label>}
      <div className="relative">
        <input
          className={clsx(
            "h-11 rounded-lg border p-3 outline-none",
            icon && "pr-10",
            errorMessage ? "border-red-500" : "border-gray-100",
            className,
          )}
          {...rest}
        />
        <div className="absolute right-3 top-3">{icon}</div>
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
