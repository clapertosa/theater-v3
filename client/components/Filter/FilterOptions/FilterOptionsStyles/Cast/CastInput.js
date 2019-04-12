import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ApolloConsumer } from "react-apollo";
import { SEARCH_CAST_QUERY } from "../../../../../apollo/queries";
import debounce from "lodash.debounce";
import CastResults from "./CastResults";

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
  grid-area: input;
  background-color: #edf2f4;
  border-style: none;
  border-radius: 3px;
  font-size: 1rem;
  padding: 10px;
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
