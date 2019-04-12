import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: auto;
  width: 95%;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    width: 80%;
  }
`;

const Wrapper = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Wrapper;
