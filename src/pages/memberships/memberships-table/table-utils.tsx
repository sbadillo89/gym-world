/* eslint-disable react/display-name, react/no-multi-comp, react/prop-types
  --
  All Cell components inherit their name from the property they are assigned to
  and we declare them inline to enable automatic typechecking.
  */
import { Badge } from "@components/badge";
import { BuyMembershipModal } from "../buy-membership-modal";
import { ColumnWithStrictAccessor } from "react-table";
import Dinero from "dinero.js";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MembershipAccessors } from "./types";
import dayjs from "dayjs";
import { memo } from "react";

const membershipColumns: Array<ColumnWithStrictAccessor<MembershipAccessors>> =
  [
    {
      Header: "Descripción",
      accessor: "description",
    },
    {
      Header: "Validez (días)",
      accessor: "validityDays",
    },
    {
      Header: "Precio",
      accessor: "price",
      Cell: memo(
        ({ value }) => (
          <p>{Dinero({ amount: value * 100 }).toFormat("$0,0")}</p>
        ),
        ({ value: oldValue }, { value: newValue }) => oldValue === newValue
      ),
    },
    {
      Header: "Descuento",
      accessor: "discount",
      Cell: memo(
        ({ value }) => (
          <p>{Dinero({ amount: value * 100 }).toFormat("$0,0")}</p>
        ),
        ({ value: oldValue }, { value: newValue }) => oldValue === newValue
      ),
    },
    {
      Header: "Fecha",
      accessor: "createdDate",
      Cell: memo(
        ({ value }) => <p>{dayjs(value).format("YYYY-MM-DD")}</p>,
        ({ value: oldValue }, { value: newValue }) => oldValue === newValue
      ),
    },
    {
      Header: "Estado",
      accessor: "active",
      Cell: memo(
        ({ value }) => (
          <Badge color={value ? "primary" : "gray"} rounded>
            {value ? "Activa" : "Inactiva"}
          </Badge>
        ),
        ({ value: oldValue }, { value: newValue }) => oldValue === newValue
      ),
    },
    {
      Header: "",
      accessor: "id",
      Cell: memo(
        ({ value }) => (
          <div className="flex gap-4">
            <Link to={`/memberships/${value}`}>
              <FaPencilAlt className="h-5 w-5 cursor-pointer inline hover:text-primary-100" />
            </Link>
            <BuyMembershipModal membershipId={value} />
          </div>
        ),
        ({ value: oldValue }, { value: newValue }) => oldValue === newValue
      ),
    },
  ];

const getRequestRowId = (
  row: MembershipAccessors,
  relativeIndex: number
): string => row.id?.toString() ?? relativeIndex.toString();

export { getRequestRowId, membershipColumns };
