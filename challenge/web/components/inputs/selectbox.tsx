import { ChangeEvent } from "react";
import * as React from "react";
import { clsx } from "clsx";

type Option = {
  label: string;
  value?: string;
};

type SelectProps = {
  id: string;
  options: Option[];
  className?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
} & React.InputHTMLAttributes<HTMLSelectElement>;

export const SelectBox: React.FC<SelectProps> = (props) => {
  const { id, options, className, onChange, ...rest } = props;
  return (
    <div className={clsx(className)}>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        id={id}
        onChange={onChange} // This is to handle selection change
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                       focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                       dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value || option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectBox.displayName = "SelectBox";
export default SelectBox;
