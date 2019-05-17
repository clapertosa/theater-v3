import React, { useState, useEffect } from "react";
import { ApolloConsumer } from "react-apollo";
import debounce from "lodash.debounce";
import styled from "styled-components";
import Results from "./Results/Results";

const Container = styled.div`
  position: relative;
  border-radius: 10px;
  width: 100%;
  max-width: 22rem;
`;

const Input = styled.input`
  color: black;
  background-color: ${({ theme: { colors } }) => colors.white};
  border-style: none;
  border-radius: 50px;
  height: 2rem;
  width: inherit;
  text-indent: 30px;
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }
`;

const MagnifyingGlass = styled.i`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: black;
`;

const Searchbar = ({ apolloQuery }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    document.addEventListener("click", closeResults);
    return () => {
      document.removeEventListener("click", closeResults);
    };
  });

  const closeResults = () => {
    const element = document.activeElement.classList[0];
    if (element !== "search-input" && element !== "results-container") {
      setShowResults(false);
    }
  };

  const onChangeHandler = debounce(async (query, client) => {
    setQuery(query);

    if (query.trim().length <= 0) {
      return;
    }

    setLoading(true);
    const res = await client.query({
      query: apolloQuery,
      variables: { query }
    });

    setResults(res.data[Object.keys(res.data)[0]].results);
    setShowResults(true);
    setLoading(false);
  }, 1500);

  return (
    <ApolloConsumer>
      {client => {
        return (
          <Container>
            <MagnifyingGlass className="icon-search" />
            <Input
              className="search-input"
              autoComplete="off"
              type="text"
              placeholder="Search"
              onFocus={() => setShowResults(true)}
              onChange={e => {
                onChangeHandler(e.target.value, client);
              }}
            />
            <Results
              query={query}
              loading={loading}
              showResults={showResults}
              closeResults={closeResults}
              results={results}
            />
          </Container>
        );
      }}
    </ApolloConsumer>
  );
};

export default Searchbar;
