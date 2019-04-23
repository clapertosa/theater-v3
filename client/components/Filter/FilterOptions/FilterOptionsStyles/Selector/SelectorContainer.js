import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-areas: "title" "value" "value-list";
  position: relative;
`;

const SelectorContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SelectorContainer;
