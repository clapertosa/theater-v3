import React from "react";
import styled from "styled-components";

const Container = styled.h1`
  grid-area: title;
  margin: auto;
  text-shadow: 3px 3px 3px black;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    margin: 0;
  }
`;

const Title = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Title;
