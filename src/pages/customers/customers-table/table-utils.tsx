/* eslint-disable react/display-name, react/no-multi-comp, react/prop-types
  --
  All Cell components inherit their name from the property they are assigned to
  and we declare them inline to enable automatic typechecking.
  */
import { ColumnWithStrictAccessor } from "react-table";
import { CustomersAccessors } from "./types";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { memo } from "react";

const customerstColumns: Array<ColumnWithStrictAccessor<CustomersAccessors>> = [
  {
    Header: "Nombre(s)",
    accessor: "firstName",
  },
  {
    Header: "Apellido(s)",
    accessor: "lastName",
  },
  {
    Header: "Edad",
    accessor: "age",
  },
  {
    Header: "Dirección",
    accessor: "address",
  },
  {
    Header: "Género",
    accessor: "gender",
  },
  {
    Header: "Télefono",
    accessor: "phone",
  },
  {
    Header: "Fecha Nacimiento",
    accessor: "birthday",
    Cell: memo(
      ({ value }) => <p>{dayjs(value).format("YYYY-MM-DD")}</p>,
      ({ value: oldValue }, { value: newValue }) => oldValue === newValue
    ),
  },
  {
    Header: "",
    accessor: "id",
    Cell: memo(
      ({ value }) => (
        <Link to={`/customers/${value}`}>
          <FaPencilAlt className="h-5 w-5 cursor-pointer inline" />
        </Link>
      ),
      // <CustomerModalEdit id={value} />,

      ({ value: oldValue }, { value: newValue }) => oldValue === newValue
    ),
  },
];

const getRequestRowId = (
  row: CustomersAccessors,
  relativeIndex: number
): string => row.id?.toString() ?? relativeIndex.toString();

export { getRequestRowId, customerstColumns };
