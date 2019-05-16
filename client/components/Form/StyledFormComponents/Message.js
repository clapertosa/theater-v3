import React from "react";
import styled from "styled-components";

const StyledError = styled.span`
  grid-area: ${({ gridArea }) => (gridArea ? gridArea : "message")};
  color: ${({ error, theme: { colors } }) =>
    error ? colors.candy : colors.green};
  font-weight: bold;
  max-height: ${({ smoothHeight }) => (smoothHeight ? "100px" : "0")};

  transition: max-height 0.3s;
`;

const Message = ({ children, gridArea, error }) => {
  return (
    <StyledError smoothHeight={children} gridArea={gridArea} error={error}>
      {children}
    </StyledError>
  );
};

export default Message;
