import { SessionsAccessors } from "./types";
import { Skeleton } from "@components/skeleton";
import { Table } from "@components/table/table";
import { useCustomerSessions } from "@services/sessions";
import { useMemo } from "react";
import { columnsSessions, getSessionRowId } from "./table-utils";

const Sessions = (): React.ReactElement => {
  const { data, isLoading } = useCustomerSessions();
  const totalPages = data ? data.pages[0].totalPages : 1;

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columnsSessions.map((column) => ({
            ...column,
            Cell: <Skeleton />,
          }))
        : columnsSessions,
    [isLoading]
  );

  const tableData = useMemo(
    () =>
      isLoading || !data
        ? (new Array(10).fill({}) as Array<SessionsAccessors>)
        : data.pages.flatMap((p) =>
            p.data.map(
              ({
                customerMembershipId,
                customerId,
                customer,
                date,
                attended,
                membershiSessionpId,
              }) => ({
                customerMembershipId,
                customerId,
                customer,
                date,
                attended,
                options: {
                  attended,
                  customerMembershipId,
                  membershiSessionpId,
                },
              })
            )
          ),
    [data, isLoading]
  );

  return (
    <div className="h-64">
      {tableData.length > 0 ? (
        <Table
          data={tableData}
          columns={tableColumns}
          getRowId={getSessionRowId}
          totalPages={totalPages}
        />
      ) : (
        <p className="flex justify-center items-center h-full">
          [No hay información disponible]
        </p>
      )}
    </div>
  );
};

export { Sessions };
