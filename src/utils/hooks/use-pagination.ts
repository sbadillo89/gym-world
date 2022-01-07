import { useState } from "react";

export const UsePagination = (): {
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageNumber: number;
      pageSize: number;
    }>
  >;
  pageNumber: number;
  pageSize: number;
  handleFirstPage: () => void;
  //handleLastPage: () => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handlePageSize: (pageSize: number) => void;
  handleLastPage: (totalPages: number) => void;
} => {
  const [pagination, setPagination] = useState<{
    pageNumber: number;
    pageSize: number;
  }>({ pageNumber: 1, pageSize: 10 });

  const { pageNumber, pageSize } = pagination;

  const handleNextPage = (): void => {
    setPagination({ ...pagination, pageNumber: pageNumber + 1 });
  };
  const handlePreviousPage = (): void => {
    setPagination({ ...pagination, pageNumber: pageNumber - 1 });
  };

  const handleFirstPage = (): void => {
    setPagination({ ...pagination, pageNumber: 1 });
  };

  const handlePageSize = (size: number): void => {
    setPagination({ pageNumber: 1, pageSize: size });
  };
  const handleLastPage = (totalPages: number): void => {
    setPagination({ ...pagination, pageNumber: totalPages });
  };

  return {
    setPagination,
    pageNumber,
    pageSize,
    handleFirstPage,
    handleNextPage,
    handlePreviousPage,
    handlePageSize,
    handleLastPage,
  };
};
