import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  grid-area: label;
  display: flex;
  align-items: center;
  pointer-events: none; /* To be clickable even if it's on top of an input */
  color: ${({ theme: { colors } }) => colors.green};
  text-shadow: 2px 2px 2px black;
  font-size: 1.3rem;
  font-weight: bold;

  i {
    font-size: 1.5rem;
  }
`;

const Label = ({ icon, name }) => {
  return (
    <StyledLabel>
      <i className={`icon-${icon}`} /> {name}
    </StyledLabel>
  );
};

export default Label;
