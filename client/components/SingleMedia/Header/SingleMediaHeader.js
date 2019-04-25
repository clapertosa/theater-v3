import React from "react";
import styled from "styled-components";
import BackdropImage from "../../BackdropImage/BackdropImage";
import Poster from "../../Poster/Poster";
import Info from "./Info/Info";

const Container = styled.div`
  width: 95%;
  margin: 10px auto auto auto;
  grid-area: header;
  display: grid;
  grid-template-areas: "poster" "info";
  grid-row-gap: 20px;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    width: 70%;
    height: ${({ theme: { backdropPosterHeight } }) => backdropPosterHeight};
    grid-template-areas: "poster info";
    grid-template-columns: auto auto;
    grid-column-gap: 20px;
  }

  @media (min-width: 55rem) and (max-width: 80rem) {
    width: 95%;
    height: ${({ theme: { backdropPosterHeight } }) => backdropPosterHeight};
  }
`;

const SingleMediaHeader = ({
  backdropPath,
  title,
  posterPath,
  overview,
  releaseDate,
  runtime,
  genres,
  director,
  voteAverage,
  voteCount,
  homepage,
  externalIds
}) => {
  return (
    <Container>
      <BackdropImage imagePath={backdropPath} title={title} />
      <Poster title={title} posterPath={posterPath} />
      <Info
        title={title}
        overview={overview}
        releaseDate={releaseDate}
        runtime={runtime}
        genres={genres}
        director={director}
        voteAverage={voteAverage}
        voteCount={voteCount}
        homepage={homepage}
        externalIds={externalIds}
      />
    </Container>
  );
};

export default SingleMediaHeader;
