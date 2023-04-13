import React, { useEffect, useState } from "react";

import "./Pagination.scss";
const Pagination = ({
  postPerPage,
  data,
  setCurrentPage,
  currentPage,
  isLoading,
}) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / postPerPage); i++) {
    pages.push(i);
  }
  const handleStep = (id) => {
    if (id === "prev") {
      setCurrentPage((prePage) => prePage - 1);
    } else {
      setCurrentPage((prePage) => prePage + 1);
    }
  };
  return (
    <div className="pagination">
      {!isLoading && (
        <a
          href="#products-section"
          onClick={(e) => {
            handleStep("prev");
          }}
          className={currentPage === pages[0] ? "disabled" : ""}
        >
          Prev
        </a>
      )}

      {pages &&
        pages.length > 0 &&
        pages.map((page, index) => {
          return (
            <a
              className={page === currentPage ? "active" : ""}
              key={index}
              onClick={() => setCurrentPage(page)}
              href="#products-section"
            >
              {page}
            </a>
          );
        })}
      {!isLoading && (
        <a
          href="#products-section"
          onClick={() => {
            handleStep("next");
          }}
          className={currentPage === pages.pop() ? "disabled" : ""}
        >
          Next
        </a>
      )}
    </div>
  );
};

export default Pagination;
