import React from "react";
import styled from "styled-components";
import ResultsItem from "./ResultsItem";
import Spinner from "../../Spinner/Spinner";
import * as data from "../../../../utils/searchbar_data";

const Container = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  max-height: 60vh;
  width: inherit;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  /* border: ${({ theme: { colors } }) => `1px solid ${colors.red}`}; */
  overflow: auto;
  box-shadow: 3px 3px 3px black;
`;

const Message = styled.p`
  margin: 5px 0;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
`;

const Results = ({ showResults, closeResults, query, loading, results }) => {
  if (loading) {
    return (
      <Container
        className="results-container"
        show={showResults}
        onBlur={() => closeResults()}
      >
        <Spinner />
      </Container>
    );
  } else if (results.length <= 0 && !loading && query.length > 0) {
    return (
      <Container
        className="results-container"
        show={showResults}
        onBlur={() => closeResults()}
      >
        <Message>😅 Sorry, nothing was found!</Message>
      </Container>
    );
  } else {
    return (
      <Container
        className="results-container"
        show={showResults}
        onBlur={() => closeResults()}
      >
        {results.map((result, index) => (
          <ResultsItem
            key={index}
            index={index}
            title={data.getTitle(result)}
            image={data.getImageUrl(result)}
            url={data.getUrl(result)}
          />
        ))}
      </Container>
    );
  }
};

export default Results;
