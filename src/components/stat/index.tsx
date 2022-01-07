import React from "react";

type StatProps = {
  description: string;
  label: string;
  value: string;
  color?:
    | "bg-primary-200"
    | "bg-secondary"
    | "bg-gray-800"
    | "bg-purple-900"
    | "bg-purple-400"
    | "bg-red-400";
};

const Stat = ({
  description,
  label,
  value,
  color = "bg-primary-200",
}: StatProps): React.ReactElement => {
  return (
    <div className="container mx-auto">
      <div className="w-full bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
        <div className={`${color} h-10 flex items-center justify-between`}>
          <p className="mr-0 text-white text-lg pl-5 uppercase">
            {description}
          </p>
        </div>
        <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
          <p className="uppercase">{label}</p>
        </div>
        <p className="py-4 text-3xl ml-5">{value}</p>
      </div>
    </div>
  );
};

export { Stat };
