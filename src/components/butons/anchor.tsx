import { ButtonBaseProps, appearances, buttonSizes } from "./common";
import { Link, LinkProps } from "react-router-dom";
import React, { forwardRef } from "react";

type AnchorProps = Pick<LinkProps, "to" | "onClick"> & ButtonBaseProps;

/**
 * @param {string} width TailwindCSS width utility class
 */
const Anchor = forwardRef(
  (
    {
      to,
      children,
      onClick,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      appearance = "default",
      width = "w-auto",
      rounded = false,
      size = "md",
    }: AnchorProps,
    ref: React.Ref<HTMLAnchorElement>
  ) => (
    <Link
      to={to}
      ref={ref}
      onClick={onClick}
      className={`${width} ${rounded ? "rounded-full" : "rounded-sm"} ${
        buttonSizes[size][0]
      } ${appearances[appearance][0]} ${
        appearances[appearance][1]["default"]
      } transition-colors inline-flex items-center justify-center border font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100`}
    >
      {LeftIcon ? (
        <LeftIcon className={buttonSizes[size][1]["leftIcon"]} />
      ) : null}
      {children}
      {RightIcon ? (
        <RightIcon className={buttonSizes[size][1]["rightIcon"]} />
      ) : null}
    </Link>
  )
);
if (process.env.NODE_ENV === "development") {
  Anchor.displayName = "Anchor";
}

export { Anchor };
export type { AnchorProps };
