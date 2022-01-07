/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { AttendedButton } from "./attended-button";
import { Badge } from "@components/badge";
import { ColumnWithStrictAccessor } from "react-table";
import { SessionsAccessors } from "./types";
import dayjs from "dayjs";
import { memo } from "react";

const columnsSessions: Array<ColumnWithStrictAccessor<SessionsAccessors>> = [
  {
    Header: "Cliente",
    accessor: "customer",
  },
  {
    Header: "Fecha",
    accessor: "date",
    Cell: memo(
      ({ value }) => (
        <p className="capitalize">{dayjs(value).format("DD-MM-YYYY")}</p>
      ),
      ({ value: oldValue }, { value: newValue }) => oldValue === newValue
    ),
  },
  {
    Header: "Estado",
    accessor: "attended",
    Cell: memo(
      ({ value }) => (
        <div className="flex items-center">
          <Badge rounded color={value ? "primary" : "gray"}>
            {value ? "Asistió" : "Pendiente"}
          </Badge>
        </div>
      ),
      ({ value: oldValue }, { value: newValue }) => oldValue === newValue
    ),
  },
  {
    Header: "",
    accessor: "options",
    Cell: memo(
      ({ value }) => (
        <div className="flex items-center">
          {!value.attended && (
            <AttendedButton sessionId={value?.membershiSessionpId} />
          )}
        </div>
      ),
      ({ value: oldValue }, { value: newValue }) => oldValue === newValue
    ),
  },
];

const getSessionRowId = (
  row: SessionsAccessors,
  relativeIndex: number
): string => relativeIndex.toString();

export { columnsSessions, getSessionRowId };
