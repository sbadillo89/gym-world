import { ErrorMessage } from "@hookform/error-message";
import { MdArrowDropDown } from "react-icons/md";
import {
  RegisterOptions,
  UseFormReturn,
  useFormContext,
} from "react-hook-form";

type SelectProps = {
  name: string;
  label: React.ReactNode;
  defaultValue?: string;
  placeholder?: string;
  rules?: RegisterOptions | ((formContext: UseFormReturn) => RegisterOptions);
  srLabel?: boolean;
  options?: Array<string>;
};

export const Select = ({
  name,
  label,
  rules,
  options,
  placeholder,
  defaultValue = "",
  srLabel = false,
}: SelectProps): React.ReactElement => {
  const context = useFormContext();
  const {
    register,
    formState: { errors },
  } = context;
  const isError = errors[name] ? true : false;

  return (
    <div>
      <label
        htmlFor={name}
        className={srLabel ? "sr-only" : "flex items-center text:md sm:text-lg"}
      >
        {label}
      </label>
      <div className={`${isError ? "text-red" : "text-primary"} relative`}>
        <select
          id={name}
          defaultValue={defaultValue}
          className={`shadow appearance-none border rounded w-full py-2 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline ${
            isError
              ? "border-red text-red text-opacity-70 focus:border-red focus:ring-red"
              : "placeholder-gray-400 focus:border-secondary focus:ring-secondary"
          } transition block w-full pl-3 pr-10 py-2 text-sm rounded-lg bg-none`}
          {...register(
            name,
            typeof rules === "function" ? rules(context) : rules
          )}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option className="text-gray-500" key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 pr-2 flex items-center justify-center">
          <MdArrowDropDown className="transition-colors w-6 h-6" />
        </div>
      </div>
      <ErrorMessage
        name={name}
        as={
          <p
            role="alert"
            className="mt-2 ml-1 text-xs text-red text-opacity-70 text-left whitespace-pre-line"
          />
        }
      />
    </div>
  );
};
