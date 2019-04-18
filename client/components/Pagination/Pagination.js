import React from "react";
import styled from "styled-components";
import PaginationButton from "./PaginationButton";
import { getNumbers } from "../../utils/components/pagination";

const Container = styled.div`
  display: ${({ loading }) => (loading ? "none" : "flex")};
  flex-wrap: wrap;
  margin: 10px auto;
`;

const Pagination = ({
  loading,
  pageChanged,
  currentPage = 1,
  totalPages = 1
}) => {
  return (
    <Container loading={loading}>
      <PaginationButton
        clicked={pageChanged}
        value={1}
        disabled={currentPage <= 1}
      >
        <i className="icon-angle-double-left" />
      </PaginationButton>
      <PaginationButton
        clicked={pageChanged}
        value={currentPage - 1}
        disabled={currentPage <= 1}
      >
        <i className="icon-angle-left" />
      </PaginationButton>
      {getNumbers(currentPage, totalPages).map(number => (
        <PaginationButton
          key={number}
          clicked={pageChanged}
          currentPage={currentPage}
          value={number}
          highlighted={currentPage === number}
        />
      ))}
      <PaginationButton
        clicked={pageChanged}
        value={currentPage + 1}
        disabled={currentPage >= totalPages}
      >
        <i className="icon-angle-right" />
      </PaginationButton>
      <PaginationButton
        clicked={pageChanged}
        value={totalPages}
        disabled={currentPage >= totalPages}
      >
        <i className="icon-angle-double-right" />
      </PaginationButton>
    </Container>
  );
};

export default Pagination;
