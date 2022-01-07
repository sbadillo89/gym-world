import {
  RegisterOptions,
  UseFormReturn,
  useFormContext,
} from "react-hook-form";

type BaseCheckboxProps = {
  name: string;
  label: React.ReactNode;
  height?: string;
  width?: string;
};

type CheckboxProps = {
  rules?: RegisterOptions | ((formContext: UseFormReturn) => RegisterOptions);
  checked?: never;
  onChange?: never;
  defaultChecked?: boolean;
} & BaseCheckboxProps;

type ControlledCheckboxProps = {
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: never;
  defaultChecked?: never;
} & BaseCheckboxProps;

export const Checkbox = ({
  name,
  label,
  rules,
  defaultChecked = false,
  checked,
  height,
  width,
  onChange,
  ...controlledCheckboxProps
}: CheckboxProps | ControlledCheckboxProps): React.ReactElement => {
  const context = useFormContext();
  const { register } = useFormContext();

  const isControlled = checked !== undefined;
  const inputProps = isControlled
    ? {
        name,
        checked,
        onChange,
        ...controlledCheckboxProps,
      }
    : register(name, typeof rules === "function" ? rules(context) : rules);

  return (
    <div className="flex items-center">
      <input
        id={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className={`text-primary-100 focus:ring-1 focus:ring-offset-2 focus:ring-primary-100 ${
          height ?? ""
        } ${width ?? ""}`}
        {...inputProps}
      />
      <label htmlFor={name} className="ml-2 block text-sm sm:text-lg">
        {label}
      </label>
    </div>
  );
};
