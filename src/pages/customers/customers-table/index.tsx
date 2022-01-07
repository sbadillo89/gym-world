import { CustomersAccessors } from "./types";
import { Skeleton } from "@components/skeleton";
import { Table } from "@components/table/table";
import { UsePagination } from "@utils/hooks/use-pagination";
import { useCustomers } from "@services/customers";
import { useMemo } from "react";
import { customerstColumns, getRequestRowId } from "./table-utils";

const CustomersTable = (): React.ReactElement => {
  const {
    pageNumber,
    pageSize,
    handleFirstPage,
    handleNextPage,
    handlePreviousPage,
    handlePageSize,
    handleLastPage,
  } = UsePagination();

  const { data, isLoading } = useCustomers(pageNumber, pageSize);

  const totalPages = data ? data.pages[0].totalPages : 1;

  const tableColumns = useMemo(
    () =>
      isLoading
        ? customerstColumns.map((column) => ({
            ...column,
            Cell: <Skeleton />,
          }))
        : customerstColumns,
    [isLoading]
  );

  const tableData = useMemo(
    () =>
      isLoading || !data
        ? (new Array(10).fill({}) as Array<CustomersAccessors>)
        : data.pages.flatMap((p) =>
            p.data.map(
              ({
                id,
                firstName,
                lastName,
                age,
                gender,
                dateOfBirth,
                phone,
                address,
              }) => ({
                id,
                firstName,
                lastName,
                address,
                age,
                gender,
                phone,
                birthday: dateOfBirth,
                options: id,
              })
            )
          ),
    [data, isLoading]
  );

  return (
    <Table
      columns={tableColumns}
      data={tableData}
      getRowId={getRequestRowId}
      IsPaginable={totalPages > 1}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      handleFirstPage={handleFirstPage}
      handleLastPage={() => handleLastPage(totalPages)}
      handlePageSize={handlePageSize}
      pageNumber={pageNumber}
      totalPages={totalPages}
    />
  );
};

export { CustomersTable };
