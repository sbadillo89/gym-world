import React, { forwardRef } from "react";

const colors = {
  green: "bg-green",
  gray: "bg-gray-500",
  primary: "bg-primary-100",
  secondary: "bg-secondary",
  red: "bg-red",
};

type BadgeProps = {
  children?: string;
  small?: boolean;
  rounded?: boolean;
  color?: keyof typeof colors;
  block?: boolean;
};

const Badge = forwardRef(
  (
    {
      children,
      color = "gray",
      small = false,
      rounded = false,
      block = false,
    }: BadgeProps,
    ref: React.Ref<HTMLSpanElement>
  ): React.ReactElement => (
    <span
      ref={ref}
      className={`${small ? "px-2.5 py-0.5 text-xs" : "px-3 py-0.5 text-sm"} ${
        rounded ? "rounded-full" : "rounded"
      } ${colors[color]} ${
        block ? "block" : ""
      } text-center font-medium text-white`}
    >
      {children}
    </span>
  )
);

if (process.env.NODE_ENV === "development") {
  Badge.displayName = "Badge";
}

export { Badge };
