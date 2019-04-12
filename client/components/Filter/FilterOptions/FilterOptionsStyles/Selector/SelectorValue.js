import React from "react";
import styled from "styled-components";

const Value = styled.div`
  grid-area: value;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  color: ${({ theme: { colors } }) => colors.gunMetal};
  background-color: ${({ valuesListOpened, theme: { colors } }) =>
    valuesListOpened ? colors.gray : colors.white};
  border-radius: 3px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.gray};
  }
`;

const Icon = styled.i`
  transition: transform 0.3s;
  transform: ${({ valuesListOpened }) =>
    valuesListOpened ? "rotate(-180deg)" : "rotate(0)"};
`;

const SelectorValue = ({ children, clicked, blurred, valuesListOpened }) => {
  return (
    <Value
      valuesListOpened={valuesListOpened}
      tabIndex="0"
      className="value"
      onClick={clicked}
      onBlur={blurred}
    >
      {children}{" "}
      <Icon valuesListOpened={valuesListOpened} className="icon-down-dir" />
    </Value>
  );
};

export default SelectorValue;
