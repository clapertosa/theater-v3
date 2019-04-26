import React from "react";
import styled from "styled-components";
import ResultsItem from "./ResultsItem";
import Spinner from "../../Spinner/Spinner";
import * as data from "../../../utils/components/searchbar_data";

const Container = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  max-height: 60vh;
  width: inherit;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  overflow: ${({ loading }) => (loading ? "hidden" : "auto")};
  box-shadow: 3px 3px 3px black;
`;

const Message = styled.p`
  margin: 5px 0;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
`;

const Results = ({ showResults, closeResults, query, loading, results }) => {
  return (
    <Container
      className="results-container"
      loading={loading}
      show={showResults}
      onBlur={() => closeResults()}
    >
      {loading ? (
        <Spinner />
      ) : results.length <= 0 && !loading && query.length > 0 ? (
        <Message>😅 Sorry, nothing was found!</Message>
      ) : (
        results.map((result, index) => (
          <ResultsItem
            key={index}
            index={index}
            title={data.getTitle(result)}
            year={data.getYear(result)}
            image={data.getImageUrl(result)}
            url={data.getUrl(result)}
          />
        ))
      )}
    </Container>
  );
};

export default Results;
