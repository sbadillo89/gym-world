import { Fragment, memo } from "react";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { TableOptions, useRowSelect, useTable } from "react-table";

// eslint-disable-next-line @typescript-eslint/ban-types
type TableProps<TData extends Record<string, unknown>> = {
  IsPaginable?: boolean;
  handleNextPage?: () => void;
  handlePreviousPage?: () => void;
  handleFirstPage?: () => void;
  handleLastPage?: () => void;
  handlePageSize?: (pageSize: number) => void;
  pageNumber?: number;
  totalPages?: number;
} & Required<Pick<TableOptions<TData>, "columns" | "data" | "getRowId">>;

const classIcons = "h-2 w-2 sm:h-4 sm:w-4 m-1 hover:text-primary";

const UnmemoizedTable = <TData extends Record<string, unknown>>({
  columns,
  data,
  getRowId,
  IsPaginable = false,
  handleNextPage,
  handlePreviousPage,
  handleFirstPage,
  handleLastPage,
  handlePageSize,
  pageNumber = 1,
  totalPages = 1,
}: TableProps<TData>): React.ReactElement => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageSize },
  } = useTable<TData>(
    {
      columns,
      data,
      getRowId,
    },
    useRowSelect
  );

  const canPreviousPage = pageNumber > 1;
  const canNextPage = pageNumber < totalPages;

  return (
    <div className="overflow-x-auto overflow-y-hidden border border-gray-300 rounded text-sm">
      <table {...getTableProps()} className="divide-y divide-gray-200 w-full">
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => {
            const { key, ...headerGroupProps } =
              headerGroup.getHeaderGroupProps();

            return (
              <tr {...headerGroupProps} key={key}>
                {headerGroup.headers.map((column) => {
                  const { key, ...headerProps } = column.getHeaderProps();

                  return (
                    <th
                      key={key}
                      {...headerProps}
                      className="px-1 sm:px-3 py-4 text-left font-bold truncate"
                    >
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();

            return (
              <Fragment key={key}>
                <tr {...rowProps} className="hover:bg-gray-50">
                  {row.cells.map((cell) => {
                    const { key, ...cellProps } = cell.getCellProps();

                    return (
                      <td
                        key={key}
                        className="px-1 sm:px-3 py-2 whitespace-nowrap font-medium"
                        {...cellProps}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>

      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      {IsPaginable && (
        <div
          id="pagination"
          className="bg-white px-4 py-1 flex items-center justify-between border-t border-gray-200 sm:px-6"
        >
          <div className="text-md inline-block">
            <button
              onClick={handleFirstPage}
              disabled={!canPreviousPage}
              className={`relative inline-flex items-center px-2 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                !canPreviousPage ? "bg-gray-200 pointer-events-none" : ""
              }`}
            >
              <HiChevronDoubleLeft className={classIcons} />
            </button>
            <button
              onClick={handlePreviousPage}
              disabled={!canPreviousPage}
              className={`relative inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                !canPreviousPage ? "bg-gray-200 pointer-events-none" : ""
              }`}
            >
              <HiChevronLeft className={classIcons} />
            </button>
            <button
              onClick={handleNextPage}
              disabled={!canNextPage}
              className={`relative inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
                         ${
                           !canNextPage ? "bg-gray-200 pointer-events-none" : ""
                         }`}
            >
              <HiChevronRight className={classIcons} />
            </button>
            <button
              onClick={handleLastPage}
              disabled={!canNextPage}
              className={`relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                !canNextPage ? "bg-gray-200 pointer-events-none" : ""
              }`}
            >
              <HiChevronDoubleRight className={classIcons} />
            </button>
          </div>
          <div className="-mt-1 text-md inline-block">
            <span>
              Página
              <strong>
                {pageNumber} de {totalPages}
              </strong>
            </span>

            {handlePageSize && (
              <select
                className="border rounded-md p-1 ml-1"
                value={pageSize}
                onBlur={(e: React.FocusEvent<HTMLSelectElement>) =>
                  handlePageSize(Number.parseFloat(e.target.value))
                }
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Mostrar {pageSize}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
if (process.env.NODE_ENV === "development") {
  UnmemoizedTable.displayName = "Table";
}

/**
 * All props passed to the `Table` component must be memoized, this means:
 * 1. Objects wrapped by useMemo.
 * 2. Functions wrapped by useCallback.
 */
export const Table = memo(UnmemoizedTable) as typeof UnmemoizedTable;
export type { TableProps };
