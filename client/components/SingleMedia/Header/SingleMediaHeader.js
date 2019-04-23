import React from "react";
import styled from "styled-components";
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
    grid-template-columns: auto 1fr;
    grid-column-gap: 20px;
  }

  @media (min-width: 55rem) and (max-width: 80rem) {
    width: 95%;
    height: ${({ theme: { backdropPosterHeight } }) => backdropPosterHeight};
  }
`;

const BackdropImage = styled.div`
  position: absolute;
  height: ${({ theme: { backdropPosterHeight } }) => backdropPosterHeight};
  width: 100%;
  top: 0;
  left: 0;
  filter: blur(2px) brightness(0.3);
  z-index: -1;

  img {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
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
      <BackdropImage>
        <img src={backdropPath} alt={`${title} backdrop`} />
      </BackdropImage>
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
