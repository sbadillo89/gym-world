/* eslint-disable react/no-multi-comp
  --
  Splitting this two components is just too overwhelming.
*/

type SkeletonProps = {
  height?: string;
  width?: string;
};

/**
 * @param {string} height TailwindCSS height utility class
 * @param {string} width TailwindCSS width utility class
 */
const Skeleton = ({
  height = "h-4",
  width = "w-full",
}: SkeletonProps): React.ReactElement => (
  <div className={`${height} ${width} animate-pulse bg-gray-200 rounded`}></div>
);

type SkeletonCircleProps = SkeletonProps;

/**
 * @param {string} height TailwindCSS height utility class
 * @param {string} width TailwindCSS width utility class
 */
const SkeletonCircle = ({
  height = "h-4",
  width = "w-4",
}: SkeletonCircleProps): React.ReactElement => (
  <div
    className={`${height} ${width} animate-pulse bg-gray-200 rounded-full`}
  ></div>
);

const detailsSkeletonEl = (
  <div className="h-full grid grid-cols-3 grid-rows-3 gap-x-12">
    {new Array(9).fill(null).map((_, index) => (
      <div key={index} className="space-y-3">
        <Skeleton />
        <Skeleton width="w-3/4" />
      </div>
    ))}
  </div>
);

const chartSkeletonEl = (
  <div className="h-full flex justify-between items-end gap-x-2">
    {[
      "h-32",
      "h-32",
      "h-56",
      "h-28",
      "h-56",
      "h-64",
      "h-56",
      "h-64",
      "h-44",
      "h-64",
      "h-32",
      "h-56",
      "h-32",
      "h-32",
      "h-28",
      "h-56",
      "h-64",
      "h-56",
      "h-64",
      "h-44",
      "h-64",
      "h-32",
      "h-32",
      "h-32",
      "h-24",
    ].map((width, index) => (
      <Skeleton key={`${width}-${index}`} width={width} height="w-5" />
    ))}
  </div>
);

export { Skeleton, SkeletonCircle, detailsSkeletonEl, chartSkeletonEl };
