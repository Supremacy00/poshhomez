import React from "react";
import Pagination from "@mui/material/Pagination";

interface AppPaginationProp {
  totalCount: number;
  currentPage: number;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
}

const AppPagination: React.FC<AppPaginationProp> = ({
  totalCount,
  currentPage,
  fetchPreviousPage,
  fetchNextPage,
}) => {
  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    if (newPage > currentPage) {
      fetchNextPage();
    } else if (newPage < currentPage) {
      fetchPreviousPage();
    }
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <Pagination
        count={totalCount}
        page={currentPage}
        onChange={handleChange}
        size="large"
      />
    </div>
  );
};

export default AppPagination;
