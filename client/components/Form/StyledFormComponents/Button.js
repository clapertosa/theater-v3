import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  padding: 15px 20px;
  border: ${({ theme: { colors } }) => `3px solid ${colors.green}`};
  border-radius: 10px;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  color: ${({ theme: { colors } }) => colors.white};
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 3px 3px 3px black;
  box-shadow: 3px 3px 3px black;

  &:active {
    background: #141429;
    box-shadow: inset 0px 0px 5px black;
  }
`;

const Button = ({ children, type, disabled }) => {
  return (
    <StyledButton type={type || "button"} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
