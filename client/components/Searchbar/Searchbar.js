import React, { useState, useEffect } from "react";
import { ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";
import debounce from "lodash.debounce";
import styled from "styled-components";
import Results from "./Results/Results";

// Apollo Query
const SEARCH_QUERY = gql`
  query SEARCH_QUERY($query: String) {
    search(query: $query) {
      results {
        id
        name
        original_name
        title
        original_title
        media_type
        poster_path
        profile_path
      }
    }
  }
`;

// Styles
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
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    window.addEventListener("click", closeResults);
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
      query: SEARCH_QUERY,
      variables: { query }
    });

    setResults(res.data.search.results);
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
