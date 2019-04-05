import React from "react";
import styled from "styled-components";
import ResultsItem from "./ResultsItem";
import Spinner from "../../Spinner/Spinner";

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
  const setImageUrl = (posterPath, profilePath) => {
    const POSTER_URL = "http://image.tmdb.org/t/p/w92";
    const PROFILE_URL = "http://image.tmdb.org/t/p/w185";

    if (posterPath) return POSTER_URL + posterPath;
    else if (profilePath) return PROFILE_URL + profilePath;
    else return "https://via.placeholder.com/50x75/fff?text=No%20Image";
  };

  const setUrl = (id, mediaType) => {
    if (mediaType === "movie") return `movie?id=${id}`;
    else if (mediaType === "tv") return `series?id=${id}`;
    else if (mediaType === "person") return `person?id=${id}`;
  };

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
            title={
              result.name ||
              result.original_name ||
              result.title ||
              result.original_title
            }
            image={setImageUrl(result.poster_path, result.profile_path)}
            url={setUrl(result.id, result.media_type)}
          />
        ))}
      </Container>
    );
  }
};

export default Results;
