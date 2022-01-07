import { CustomerBirthdaysAccessors } from "./types";
import { Skeleton } from "@components/skeleton";
import { Table } from "@components/table/table";
import { useCustomerBirthdays } from "@services/customers";
import { useMemo } from "react";
import { columnsCustomerBirthdays, getRequestRowId } from "./table-utils";

const Birthays = (): React.ReactElement => {
  const { data, isLoading } = useCustomerBirthdays();

  const totalPages = data ? data.pages[0].totalPages : 1;

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columnsCustomerBirthdays.map((column) => ({
            ...column,
            Cell: <Skeleton />,
          }))
        : columnsCustomerBirthdays,
    [isLoading]
  );

  const tableData = useMemo(
    () =>
      isLoading || !data
        ? (new Array(10).fill({}) as Array<CustomerBirthdaysAccessors>)
        : data.pages.flatMap((p) =>
            p.data.map(({ id, firstName, lastName, dateOfBirth }) => ({
              customerId: id,
              customer: firstName + " " + lastName,
              date: dateOfBirth,
            }))
          ),
    [data, isLoading]
  );

  return (
    <div className="h-64">
      {tableData.length > 0 ? (
        <Table
          columns={tableColumns}
          data={tableData}
          totalPages={totalPages}
          getRowId={getRequestRowId}
        />
      ) : (
        <p className="flex justify-center items-center h-full">
          [No hay información disponible]
        </p>
      )}
    </div>
  );
};

export { Birthays };
