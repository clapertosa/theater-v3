import React from "react";
import styled from "styled-components";

const StyledError = styled.span`
  grid-area: ${({ gridArea }) => (gridArea ? gridArea : "error")};
  color: ${({ theme: { colors } }) => colors.candy};
  font-weight: bold;
  max-height: ${({ smoothHeight }) => (smoothHeight ? "100px" : "0")};

  transition: max-height 0.3s;
`;

const Error = ({ children, gridArea }) => {
  return (
    <StyledError smoothHeight={children} gridArea={gridArea}>
      {children}
    </StyledError>
  );
};

export default Error;
