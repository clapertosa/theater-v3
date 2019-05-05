import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  grid-area: title;
  text-align: center;
  margin: 0;
  padding: 10px 0 10px 0;
  border-bottom: ${({ theme: { colors } }) => `1px solid ${colors.green}`};
  text-shadow: 3px 3px 3px black;
`;

const Title = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default Title;
