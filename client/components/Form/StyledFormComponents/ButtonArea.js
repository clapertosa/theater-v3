import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: button-area;
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

const ButtonArea = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ButtonArea;
