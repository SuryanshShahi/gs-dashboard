import clsx from "clsx";
import { ReactNode, SelectHTMLAttributes } from "react";
import { FiAlertCircle, FiChevronDown } from "react-icons/fi";

export interface IDropdown extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  wrapperClass?: string;
  icon?: ReactNode;
  errorMessage?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
}

const Dropdown = ({
  label,
  className,
  wrapperClass,
  errorMessage,
  icon,
  required = false,
  options = [],
  placeholder,
  value,
  defaultValue,
  ...rest
}: IDropdown) => {
  const looksEmpty =
    value !== undefined ? !value : !(defaultValue ?? "");

  return (
    <div className={clsx("flex flex-col gap-y-1", wrapperClass)}>
      {label && (
        <label className="text-sm">
          {label}
          {required && <span className="text-red-500">&nbsp;*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3 top-[14px]">{icon}</div>}
        <select
          className={clsx(
            "h-11 rounded-lg border px-3 text-sm outline-none appearance-none pr-9",
            icon && "pl-9",
            errorMessage ? "border-red-500" : "border-gray-100",
            looksEmpty && "text-gray-400",
            className,
          )}
          {...rest}
          {...(value !== undefined
            ? { value }
            : { defaultValue: defaultValue ?? "" })}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errorMessage ? (
          <FiAlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-[14px] pointer-events-none" />
        ) : (
          <FiChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-[14px] pointer-events-none" />
        )}
      </div>
      {errorMessage && (
        <div className="text-xs text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};

export default Dropdown;
