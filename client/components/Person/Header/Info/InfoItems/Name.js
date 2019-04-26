import React from "react";
import styled from "styled-components";

const Container = styled.h1`
  grid-area: name;
  margin: auto;
  text-shadow: 3px 3px 3px black;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    margin: 0;
  }
`;

const Name = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Name;