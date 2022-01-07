import { ButtonBaseProps, appearances, buttonSizes } from "./common";
import React, { forwardRef } from "react";

type ButtonProps = {
  to?: undefined;
  type?: "submit" | "button" | "reset";
  status?: keyof typeof appearances["default"][1];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  innerRef?: React.Ref<HTMLButtonElement>;
} & ButtonBaseProps;

/**
 * @param {string} width TailwindCSS width utility class
 */
const Button = forwardRef(
  (
    {
      children,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      appearance = "default",
      width = "w-auto",
      rounded = false,
      size = "md",
      status = "default",
      type = "submit",
      onClick,
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ): React.ReactElement => (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      disabled={status === "default" ? false : true}
      className={`${width} ${rounded ? "rounded-full" : "rounded-sm"} ${
        buttonSizes[size][0]
      } ${appearances[appearance][0]} ${
        appearances[appearance][1][status]
      } transition-colors inline-flex items-center justify-center border font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100`}
    >
      {LeftIcon ? (
        <LeftIcon className={buttonSizes[size][1]["leftIcon"]} />
      ) : null}
      {children}
      {RightIcon ? (
        <RightIcon className={buttonSizes[size][1]["rightIcon"]} />
      ) : null}
    </button>
  )
);
if (process.env.NODE_ENV === "development") {
  Button.displayName = "Button";
}

export { Button };
export type { ButtonProps };
