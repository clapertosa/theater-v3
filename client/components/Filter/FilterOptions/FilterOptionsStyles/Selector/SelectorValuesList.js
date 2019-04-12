import React from "react";
import styled from "styled-components";

const ValuesList = styled.ul`
  grid-area: value-list;
  position: absolute;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  width: 100%;
  max-height: ${({ show }) => (show ? "200px" : "0")};
  scrollbar-color: ${({ theme: { colors } }) => `${colors.gunMetal} silver`};
  scrollbar-width: auto;
  z-index: ${({ theme: { zIndex } }) => zIndex.filter};
  transition: max-height 0.3s ease-out;
`;

const ValuesListItem = styled.li`
  list-style: none;
  cursor: pointer;
  padding: 10px;
  color: ${({ theme: { colors } }) => colors.gunMetal};
  background-color: ${({ theme: { colors } }) => colors.white};
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.gray};
  }
`;

const SelectorValuesList = ({ show, values, clicked }) => {
  return (
    <ValuesList show={show}>
      {values.map((value, index) => (
        <ValuesListItem
          tabIndex={index}
          className="values-list-item"
          key={value}
          onClick={clicked}
        >
          {value}
        </ValuesListItem>
      ))}
    </ValuesList>
  );
};

export default SelectorValuesList;
