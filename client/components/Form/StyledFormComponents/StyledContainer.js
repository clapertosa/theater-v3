import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-areas: "title" "form";
  width: 90%;
  max-width: 28rem;
  margin: 30px auto;
  border: ${({ theme: { colors } }) => `1px solid ${colors.green}`};
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  box-shadow: 3px 3px 3px black;
  filter: ${({ blur }) => (blur ? "blur(5px)" : null)};

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    width: 70%;
  }
`;

const StyledContainer = ({ blur, children }) => {
  return <Container blur={blur}>{children}</Container>;
};

export default StyledContainer;
