/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { ColumnWithStrictAccessor } from "react-table";
import { CustomerBirthdaysAccessors } from "./types";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import es from "dayjs/locale/es";
import { memo } from "react";
import { FaBirthdayCake, FaRegEye } from "react-icons/fa";

dayjs.locale(es.name);

const columnsCustomerBirthdays: Array<
  ColumnWithStrictAccessor<CustomerBirthdaysAccessors>
> = [
  {
    Header: "Cliente",
    accessor: "customer",
    Cell: memo(
      ({ value }) => (
        <span className="flex gap-x-2">
          <FaBirthdayCake className="text-primary-100" />
          {value}
        </span>
      ),
      ({ value: oldValue }, { value: newValue }) => oldValue === newValue
    ),
  },
  {
    Header: "Fecha",
    accessor: "date",
    Cell: memo(
      ({ value }) => (
        <p className="capitalize">{dayjs(value).format("MMMM DD")}</p>
      ),
      ({ value: oldValue }, { value: newValue }) => oldValue === newValue
    ),
  },
  {
    Header: "",
    accessor: "customerId",
    Cell: memo(
      ({ value }) => (
        <div className="flex items-center">
          <NavLink to={`/customers/${value}`}>
            <FaRegEye className="h-5 w-5 text-primary-100 hover:text-primary-200 cursor-pointer" />
          </NavLink>
        </div>
      ),
      ({ value: oldValue }, { value: newValue }) => oldValue === newValue
    ),
  },
];

const getRequestRowId = (
  row: CustomerBirthdaysAccessors,
  relativeIndex: number
): string => row.customerId?.toString() ?? relativeIndex.toString();

export { columnsCustomerBirthdays, getRequestRowId };
