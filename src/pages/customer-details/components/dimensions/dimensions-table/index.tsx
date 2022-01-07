import { DimensionAccessors } from "./types";
import { DimensionAttr } from "@services/customers";
import { Skeleton } from "@components/skeleton";
import { Table } from "@components/table/table";
import { useMemo } from "react";
import { dimensionsColumns, getRequestRowId } from "./table-utils";

type DimensionsTableProps = {
  data: Array<DimensionAttr>;
};

const DimensionsTable = ({
  data,
}: DimensionsTableProps): React.ReactElement => {
  const tableColumns = useMemo(
    () =>
      !data
        ? dimensionsColumns.map((column) => ({
            ...column,
            Cell: <Skeleton />,
          }))
        : dimensionsColumns,
    [data]
  );

  const tableData = useMemo(
    () =>
      !data
        ? (new Array(10).fill({}) as Array<DimensionAccessors>)
        : data.map(({ height, weight, createdDate, id }) => ({
            height,
            weight,
            createdDate,
            id,
          })),
    [data]
  );

  return (
    <div>
      <Table
        data={tableData}
        columns={tableColumns}
        getRowId={getRequestRowId}
      />
    </div>
  );
};

export { DimensionsTable };
