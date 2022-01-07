import {
  DownshiftCombobox,
  DownshiftComboboxProps,
} from "./downshift-combobox";
import {
  RegisterOptions,
  UseFormReturn,
  useController,
  useFormContext,
} from "react-hook-form";

type AutocompleteProps = {
  defaultValue?: string;
  rules?: RegisterOptions | ((formContext: UseFormReturn) => RegisterOptions);
} & Omit<
  DownshiftComboboxProps,
  "onSelectedItemChange" | "selectedItem" | "error"
>;

export const Autocomplete = ({
  name,
  rules,
  defaultValue = "",
  ...downshiftComboboxProps
}: AutocompleteProps): React.ReactElement => {
  const context = useFormContext();
  const {
    formState: { errors },
  } = context;
  const isError = errors[name] ? true : false;

  const {
    field: { value, onChange, ...fieldProps },
  } = useController<Record<string, string>>({
    name,
    rules: typeof rules === "function" ? rules(context) : rules,
    defaultValue: defaultValue,
  });

  return (
    <DownshiftCombobox
      selectedItem={value}
      onSelectedItemChange={({ selectedItem }) => onChange(selectedItem ?? "")}
      error={isError}
      {...fieldProps}
      {...downshiftComboboxProps}
    />
  );
};
