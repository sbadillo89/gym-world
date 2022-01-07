import { ButtonProps } from "./button";
import { appearances, iconButtonSizes } from "./common";
import { cloneElement, forwardRef } from "react";

type IconButtonProps = {
  "aria-label": string;
  icon: React.VFC<{ className?: string }> | React.ReactElement;
} & Omit<ButtonProps, "children" | "width">;

const IconButton = forwardRef(
  (
    {
      onClick,
      icon: Icon,
      "aria-label": ariaLabel,
      appearance = "default",
      status = "default",
      type = "submit",
      rounded = false,
      size = "md",
    }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ): React.ReactElement => (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={status === "default" ? false : true}
      className={`${rounded ? "rounded-full" : "rounded-md"} ${
        iconButtonSizes[size]
      } ${appearances[appearance][0]} ${
        appearances[appearance][1][status]
      } transition-colors inline-flex items-center justify-center border font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100`}
    >
      {status != "loading" &&
        cloneElement(typeof Icon === "function" ? <Icon /> : Icon, {
          className: size === "md" ? "h-6 w-6" : "h-5 w-5",
        })}
    </button>
  )
);
if (process.env.NODE_ENV === "development") {
  IconButton.displayName = "IconButton";
}

export { IconButton };
export type { IconButtonProps };
