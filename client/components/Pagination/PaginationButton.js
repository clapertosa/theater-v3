import React from "react";
import styled from "styled-components";

const Container = styled.button`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ theme: { colors } }) => colors.white};
  background-color: ${({ theme: { colors }, highlighted }) =>
    highlighted ? colors.candy : colors.gunMetal};
  border: ${({ theme: { colors } }) => `2px solid ${colors.gray}`};
  margin: auto 2px;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme: { colors }, disabled }) =>
      disabled ? colors.gunMetal : colors.red};
  }
`;

const PaginationButton = ({
  clicked,
  highlighted,
  disabled,
  currentPage,
  value,
  children
}) => {
  return (
    <Container
      type="button"
      highlighted={highlighted}
      disabled={disabled}
      onClick={() => {
        currentPage !== value ? clicked(value) : null;
      }}
    >
      {children || value}
    </Container>
  );
};

export default PaginationButton;
