import { ErrorMessage } from "@hookform/error-message";
import { HiX } from "react-icons/hi";
import { MdArrowDropDown } from "react-icons/md";
import { UseComboboxProps, useCombobox } from "downshift";
import { forwardRef, useState } from "react";

type DownshiftComboboxProps = {
  name: string;
  error: boolean;
  label: React.ReactNode;
  srLabel?: boolean;
  options?: Array<string>;
  placeholder?: string;
  leadingIcon?: React.VFC<{ className: string }>;
} & Pick<UseComboboxProps<string>, "onSelectedItemChange" | "selectedItem">;

const DownshiftCombobox = forwardRef(
  (
    {
      name,
      label,
      placeholder,
      onSelectedItemChange,
      error,
      selectedItem,
      leadingIcon: LeadingIcon,
      options = [],
      srLabel = false,
    }: DownshiftComboboxProps,
    ref: React.Ref<HTMLInputElement>
  ): React.ReactElement => {
    const [inputItems, setInputItems] = useState(options);

    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
      selectItem,
    } = useCombobox({
      items: inputItems,
      selectedItem,
      onSelectedItemChange,
      onInputValueChange: ({ inputValue }) => {
        if (!inputValue) {
          inputValue === "" && selectItem("");

          return setInputItems(options);
        }

        return setInputItems(
          options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        );
      },
    });

    return (
      <div className="relative">
        <label
          {...getLabelProps({
            className: srLabel
              ? "sr-only"
              : "flex items-center font-bold text-sm mb-3",
          })}
        >
          {label}
        </label>
        <div
          {...getComboboxProps({
            className: "relative rounded-md",
          })}
        >
          {LeadingIcon ? (
            <div className="absolute inset-y-0 left-0 ml-3 flex items-center pointer-events-none">
              <LeadingIcon className="h-5 w-5 text-gray-700" />
            </div>
          ) : null}
          <input
            {...getInputProps({
              type: "text",
              name,
              placeholder,
              ref,
              className: `${LeadingIcon ? "pl-10" : "pl-2"} ${
                error
                  ? "border-red placeholder-red placeholder-opacity-70 text-red focus:ring-red"
                  : "border-gray-400 placeholder-gray-500 focus:border-primary-100 focus:ring-primary-100"
              } transition block pr-14 w-full text-sm sm:text-md rounded-lg border h-8`,
            })}
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
            {selectedItem ? (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => {
                  selectItem("");
                }}
                aria-label="Clear selection"
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-100"
              >
                <HiX className="w-4 h-4" />
              </button>
            ) : null}
            <button
              {...getToggleButtonProps({
                type: "button",
                "aria-label": "toggle menu",
                className: `${
                  error ? "text-red" : "text-primary-100"
                } focus:outline-none`,
              })}
            >
              <MdArrowDropDown className="h-6 w-6" />
            </button>
          </div>
        </div>
        <ul
          {...getMenuProps({
            className: "absolute z-50 min-w-min w-full max-w-xs",
          })}
        >
          {isOpen ? (
            <div className="bg-white w-full max-h-60 mt-2 py-1 text-sm rounded-md shadow-xl ring-1 ring-black ring-opacity-5 overflow-y-auto">
              {inputItems.length === 0 ? (
                <li className=" text-gray-900 relative py-2 pl-3 pr-9 truncate">
                  No options
                </li>
              ) : (
                inputItems.map((item, index) => (
                  <li
                    key={`${item}${index}`}
                    {...getItemProps({
                      item,
                      index,
                      className: `${
                        highlightedIndex === index ? "bg-gray-100" : ""
                      } text-gray-900 relative py-2 pl-3 pr-9 truncate`,
                    })}
                  >
                    {item}
                  </li>
                ))
              )}
            </div>
          ) : null}
        </ul>
        <ErrorMessage
          name={name}
          as={
            <p
              role="alert"
              className="mt-2 text-xs text-opacity-70 text-red whitespace-pre-line"
            />
          }
        />
      </div>
    );
  }
);
if (process.env.NODE_ENV === "development") {
  DownshiftCombobox.displayName = "DownshiftCombobox";
}

export { DownshiftCombobox };
export type { DownshiftComboboxProps };
