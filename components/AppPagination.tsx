import React from "react";
import Pagination from "@mui/material/Pagination";

interface AppPaginationProp {
  totalCount: number;
  currentPage: number;
  fetchPage: (page: number) => void;
}

const AppPagination: React.FC<AppPaginationProp> = ({
  totalCount,
  currentPage,
  fetchPage,
}) => {
  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    fetchPage(newPage);
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
