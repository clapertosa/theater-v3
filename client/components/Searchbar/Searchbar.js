import React, { useState } from "react";
import styled from "styled-components";
import Results from "./Results/Results";

const Container = styled.div`
  position: relative;
  border-radius: 10px;
  width: 100%;
`;

const Input = styled.input`
  height: 2rem;
  width: inherit;
  text-indent: 30px;
  font-size: 1.2rem;
`;

const MagnifyingGlass = styled.i`
  position: absolute;
  font-size: 1.5rem;
  color: black;
`;

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  const onChangeHandler = e => {
    setQuery(e.target.value);
  };

  return (
    <Container>
      <MagnifyingGlass className="icon-search" />
      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={onChangeHandler}
      />
      <Results showResults={showResults} results={results} />
    </Container>
  );
};

export default Searchbar;
