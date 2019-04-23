import React from "react";
import styled from "styled-components";
import CardItem from "./CardItem/CardItem";
import Spinner from "../Spinner/Spinner";

const Container = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 10px auto;
`;

const Cards = ({ loading, gridArea, medias, mediaType }) => {
  return (
    <Container gridArea={gridArea}>
      {loading ? (
        <Spinner />
      ) : (
        medias.map(media => (
          <CardItem
            key={media.id}
            id={media.id}
            mediaType={mediaType}
            posterPath={media.poster_path}
            title={
              media.title ||
              media.original_title ||
              media.name ||
              media.original_name
            }
            vote={media.vote_average}
            releaseDate={media.release_date || media.first_air_date}
            overview={media.overview}
          />
        ))
      )}
    </Container>
  );
};

export default Cards;
