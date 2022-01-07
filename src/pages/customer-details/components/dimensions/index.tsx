import { DimensionAttr } from "@services/customers";
import { DimensionsTable } from "./dimensions-table";
import { Fragment } from "react";

type DimensionsProps = {
  dimensions: Array<DimensionAttr>;
};
const Dimensions = ({ dimensions }: DimensionsProps): React.ReactElement => {
  return (
    <Fragment>
      <h1 className="text-lg text-center pb-1">Historial</h1>
      <DimensionsTable data={dimensions} />
    </Fragment>
  );
};

export { Dimensions };
