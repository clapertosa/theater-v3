import React from "react";
import styled from "styled-components";

const Input = styled.input`
  grid-area: value;
  background-color: ${({ theme: { colors } }) => colors.white};
  border-style: none;
  border-radius: 3px;
  font-size: 1rem;
  padding: 10px;
  min-height: 43px;
  width: 100%;
`;

const GenresInput = ({ clicked, changed }) => {
  return (
    <Input
      id="without-genres-input"
      autoComplete="off"
      type="text"
      onClick={clicked}
      onChange={changed}
      placeholder="Filter by genre"
    />
  );
};

export default GenresInput;
