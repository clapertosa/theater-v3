import React from "react";
import styled from "styled-components";

const Container = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  height: 100%;
  width: ${({ width }) => width};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
`;

const Item = ({ width, marginLeft, marginRight, children }) => {
  return (
    <Container width={width} marginLeft={marginLeft} marginRight={marginRight}>
      {children}
    </Container>
  );
};

export default Item;
