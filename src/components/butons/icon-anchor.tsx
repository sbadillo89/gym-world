import { AnchorProps } from "./anchor";
import { Link } from "react-router-dom";
import { appearances, iconButtonSizes } from "./common";
import { cloneElement, forwardRef } from "react";

type IconAnchorProps = {
  "aria-label": string;
  icon: React.VFC<{ className?: string }> | React.ReactElement;
} & Omit<AnchorProps, "children" | "width">;

const IconAnchor = forwardRef(
  (
    {
      to,
      onClick,
      icon: Icon,
      "aria-label": ariaLabel,
      appearance = "default",
      rounded = false,
      size = "md",
    }: IconAnchorProps,
    ref: React.Ref<HTMLAnchorElement>
  ): React.ReactElement => (
    <Link
      to={to}
      ref={ref}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${rounded ? "rounded-full" : "rounded-md"} ${
        iconButtonSizes[size]
      } ${appearances[appearance][0]} ${
        appearances[appearance][1]["default"]
      } transition-colors inline-flex items-center justify-center border font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100`}
    >
      {cloneElement(typeof Icon === "function" ? <Icon /> : Icon, {
        className: size === "md" ? "h-6 w-6" : "h-5 w-5",
      })}
    </Link>
  )
);
if (process.env.NODE_ENV === "development") {
  IconAnchor.displayName = "IconAnchor";
}

export { IconAnchor };
export type { IconAnchorProps };
