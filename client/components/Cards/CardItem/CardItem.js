import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Poster from "./CardStyles/Poster";
import Info from "./CardStyles/Info";
import Overview from "./CardStyles/Overview";

const Anchor = styled.a`
  margin: 10px;
  min-width: 300px;
  min-height: 522px;
  color: ${({ theme: { colors } }) => colors.white};

  &:hover {
    img {
      transform: scale(1.2);
    }
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    margin: 20px;
    min-width: 483px;
    min-height: 298px;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-areas: "poster" "info" "overview";
  grid-column-gap: 10px;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  box-shadow: 3px 3px 3px 3px black;
  max-width: 300px;
  width: 100%;
  padding: 10px;
  overflow: hidden;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    grid-template-areas: "poster info" "poster overview" "poster overview";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr 1fr;
    max-width: 483px;
    height: 298px;
    width: 100%;
  }
`;

const CardItem = ({
  id,
  mediaType,
  posterPath,
  title,
  vote,
  releaseDate,
  overview
}) => {
  return (
    <Link
      href={mediaType === "movie" ? `/movies?id=${id}` : `/series?id=${id}`}
      passHref
    >
      <Anchor>
        <Container>
          <Poster posterPath={posterPath} title={title} />
          <Info title={title} vote={vote} releaseDate={releaseDate} />
          <Overview overview={overview} />
        </Container>
      </Anchor>
    </Link>
  );
};

export default CardItem;
