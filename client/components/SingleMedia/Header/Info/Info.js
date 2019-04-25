import React from "react";
import styled from "styled-components";
import Score from "./InfoItems/Score";
import Favorite from "./InfoItems/Favorite";
import Title from "./InfoItems/Title";
import Links from "./InfoItems/Links";
import Description from "./InfoItems/Description";
import TechnicalInfo from "./InfoItems/TechnicalInfo";

const Container = styled.div`
  grid-area: info;
  margin: auto;
  max-width: 700px;
  display: grid;
  grid-template-areas: "title title" "technical-info technical-info" "score favorite" "links links" "description description";
  grid-template-rows: auto auto auto auto 1fr;
  grid-row-gap: 20px;
  font-weight: bold;
  z-index: ${({ theme: { zIndex } }) => zIndex.info};

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    margin: 0;
  }
`;

const Info = ({
  title,
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
      <Title>{title}</Title>
      <TechnicalInfo
        releaseDate={releaseDate}
        runtime={runtime}
        genres={genres}
        director={director}
      />
      <Score voteAverage={voteAverage} voteCount={voteCount} />
      <Favorite />
      <Links homepage={homepage} externalIds={externalIds} />
      <Description overview={overview} />
    </Container>
  );
};

export default Info;
