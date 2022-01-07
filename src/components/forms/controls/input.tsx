import { ErrorMessage } from "@hookform/error-message";
import {
  RegisterOptions,
  UseFormReturn,
  useFormContext,
} from "react-hook-form";

type BaseInputProps = {
  name: string;
  label: React.ReactNode;
  type?: "text" | "password" | "date" | "time" | "number" | "datetime-local";
  srLabel?: boolean;
  placeholder?: string;
  autoComplete?: string;
  leadingIcon?: React.VFC<{ className: string }>;
};
type InputProps = {
  defaultValue?: string;
  rules?: RegisterOptions | ((formContext: UseFormReturn) => RegisterOptions);
  value?: never;
  onChange?: never;
} & BaseInputProps;

type ControlledInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: never;
} & Omit<
  React.ComponentPropsWithoutRef<"input">,
  "autoComplete" | "type" | "id" | "placeHolder" | "name"
> &
  BaseInputProps;

const Input = ({
  defaultValue,
  autoComplete,
  name,
  label,
  placeholder,
  rules,
  leadingIcon: LeadingIcon,
  type = "text",
  srLabel = false,
  value,
  onChange,
  ...controlledInputProps
}: InputProps | ControlledInputProps): React.ReactElement => {
  const context = useFormContext();
  const {
    register,
    formState: { errors },
  } = context;
  const isError = errors[name] ? true : false;

  const isControlled = value !== undefined;
  const inputProps = isControlled
    ? {
        name,
        value,
        onChange,
        ...controlledInputProps,
      }
    : register(name, typeof rules === "function" ? rules(context) : rules);

  return (
    <div>
      <label
        htmlFor={name}
        className={srLabel ? "sr-only" : "flex items-center text:md sm:text-lg"}
      >
        {label}
      </label>
      <div className="relative">
        {LeadingIcon ? (
          <div className="absolute inset-y-0 left-0 ml-3 flex items-center pointer-events-none">
            <LeadingIcon className="h-5 w-5 text-gray-600" />
          </div>
        ) : null}
        <input
          type={type}
          className={`shadow appearance-none border rounded w-full py-2 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline ${
            LeadingIcon ? "pl-10" : "px-3"
          } ${
            isError
              ? "border-red-600 placeholder-red-600 placeholder-opacity-70 text-red-600 focus:ring-red-600"
              : "placeholder-gray-400 focus:border-secondary focus:ring-secondary"
          } transition block w-full`}
          id={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={isError}
          defaultValue={defaultValue}
          {...inputProps}
        />
      </div>
      {!isControlled ? (
        <ErrorMessage
          name={name}
          as={
            <p
              role="alert"
              className="mt-2 ml-1 text-sm text-red-600 text-opacity-70 text-left whitespace-pre-line"
            >
              {errors[name]}
            </p>
          }
        />
      ) : null}
    </div>
  );
};
export { Input };
export type { InputProps };
