const appearances = {
  default: [
    "border-transparent text-gray-700 bg-gray-100",
    {
      default: "hover:bg-gray-200",
      loading: "opacity-60 cursor-default",
      disabled: "opacity-40 cursor-not-allowed",
    },
  ],
  primary: [
    "border-transparent text-white bg-primary-100",
    {
      default: "hover:bg-primary-200",
      loading: "opacity-70 cursor-default",
      disabled: "opacity-50 cursor-not-allowed",
    },
  ],
  secondary: [
    "border-primary-100 text-primary-100 bg-primary-100 bg-opacity-0",
    {
      default: "hover:bg-opacity-5",
      loading: "opacity-70 cursor-default",
      disabled: "opacity-50 cursor-not-allowed",
    },
  ],
  ghost: [
    "border-transparent text-gray-400",
    {
      default: "hover:text-gray-500 hover:bg-gray-100",
      loading: "opacity-70 cursor-default",
      disabled: "opacity-50 cursor-not-allowed",
    },
  ],
  link: [
    "border-transparent text-primary-100",
    {
      default: "hover:text-opacity-80",
      loading: "opacity-70 cursor-default",
      disabled: "opacity-50 cursor-not-allowed",
    },
  ],
  green: [
    "border-transparent text-white bg-green-100 bg-opacity-90",
    {
      default: "hover:bg-opacity-100",
      loading: "opacity-70 cursor-default",
      disabled: "opacity-50 cursor-not-allowed",
    },
  ],
  red: [
    "border-transparent text-white bg-red bg-opacity-90",
    {
      default: "hover:bg-opacity-100",
      loading: "opacity-70 cursor-default",
      disabled: "opacity-50 cursor-not-allowed",
    },
  ],
} as const;

const buttonSizes = {
  xs: [
    "text-xs px-2.5 py-1.5",
    {
      leftIcon: "-ml-0.5 mr-2 h-4 w-4",
      rightIcon: "ml-2 -mr-0.5 h-4 w-4",
    },
  ],
  sm: [
    "text-sm leading-4 px-3 py-2",
    {
      leftIcon: "-ml-0.5 mr-2 h-4 w-4",
      rightIcon: "ml-2 -mr-0.5 h-4 w-4",
    },
  ],
  md: [
    "text-base px-4 py-2",
    {
      leftIcon: "-ml-1 mr-3 h-5 w-5",
      rightIcon: "ml-3 -mr-1 h-5 w-5",
    },
  ],
} as const;

const iconButtonSizes = {
  xs: "p-1",
  sm: "p-1.5",
  md: "p-2",
};

type ButtonBaseProps = {
  children?: React.ReactNode;
  width?: string;
  rounded?: boolean;
  rightIcon?: React.VFC<{ className: string }>;
  leftIcon?: React.VFC<{ className: string }>;
  size?: keyof typeof buttonSizes;
  appearance?: keyof typeof appearances;
};

export { appearances, buttonSizes, iconButtonSizes };
export type { ButtonBaseProps };
