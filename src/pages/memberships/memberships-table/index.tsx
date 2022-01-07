import { MembershipAccessors } from "./types";
import { Skeleton } from "@components/skeleton";
import { Table } from "@components/table/table";
import { UsePagination } from "@utils/hooks/use-pagination";
import { useMemberships } from "@services/memberships";
import { useMemo } from "react";
import { getRequestRowId, membershipColumns } from "./table-utils";

const MembershipsTable = (): React.ReactElement => {
  const {
    pageNumber,
    pageSize,
    handleNextPage,
    handlePreviousPage,
    handlePageSize,
    handleLastPage,
  } = UsePagination();

  const { data, isLoading } = useMemberships(pageNumber, pageSize);
  const totalPages = data ? data.pages[0].totalPages : 1;

  const tableColumns = useMemo(
    () =>
      isLoading
        ? membershipColumns.map((column) => ({
            ...column,
            Cell: <Skeleton />,
          }))
        : membershipColumns,
    [isLoading]
  );

  const tableData = useMemo(
    () =>
      isLoading || !data
        ? (new Array(10).fill({}) as Array<MembershipAccessors>)
        : data.pages.flatMap((p) =>
            p.data.map(
              ({
                id,
                description,
                discount,
                price,
                active,
                createdDate,
                validityDays,
              }) => ({
                id,
                description,
                discount,
                price,
                active,
                createdDate,
                validityDays,
              })
            )
          ),
    [data, isLoading]
  );

  return (
    <div>
      <Table
        columns={tableColumns}
        data={tableData}
        getRowId={getRequestRowId}
        IsPaginable={totalPages > 1}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageSize={handlePageSize}
        handleLastPage={() => handleLastPage(totalPages)}
      />
    </div>
  );
};

export { MembershipsTable };
