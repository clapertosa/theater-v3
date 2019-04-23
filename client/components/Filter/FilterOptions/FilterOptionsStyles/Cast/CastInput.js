import React from "react";
import styled from "styled-components";

const Input = styled.input`
  grid-area: input;
  background-color: #edf2f4;
  border-style: none;
  border-radius: 3px;
  font-size: 1rem;
  padding: 10px;
  min-height: 43px;
  width: 100%;
`;

const CastInput = ({ clicked, changed }) => {
  return (
    <Input
      id="cast-input"
      autoComplete="off"
      placeholder="Filter by person"
      onClick={clicked}
      onChange={changed}
    />
  );
};

export default CastInput;
