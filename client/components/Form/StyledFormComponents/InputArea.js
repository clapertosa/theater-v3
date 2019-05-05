import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: input-area;
  display: flex;
  flex-flow: column;
`;

const InputArea = ({ children }) => {
  return <Container>{children}</Container>;
};

export default InputArea;
