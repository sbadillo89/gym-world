/* eslint-disable react/display-name, react/no-multi-comp, react/prop-types
  --
  All Cell components inherit their name from the property they are assigned to
  and we declare them inline to enable automatic typechecking.
  */
import { ColumnWithStrictAccessor } from "react-table";
// import { CustomerModalEdit } from "../customer-modal-edit";
import { DimensionAccessors } from "./types";
import dayjs from "dayjs";
import { memo } from "react";

const dimensionsColumns: Array<ColumnWithStrictAccessor<DimensionAccessors>> = [
  {
    Header: "Altura",
    accessor: "height",
  },
  {
    Header: "Peso",
    accessor: "weight",
  },
  {
    Header: "Fecha",
    accessor: "createdDate",
    Cell: memo(
      ({ value }) => <p>{dayjs(value).format("YYYY-MM-DD")}</p>,
      ({ value: oldValue }, { value: newValue }) => oldValue === newValue
    ),
  },
];

const getRequestRowId = (
  row: DimensionAccessors,
  relativeIndex: number
): string => row.id.toString() ?? relativeIndex.toString();

export { getRequestRowId, dimensionsColumns };
