import React from "react";
import styled from "styled-components";
import getPlaceholder from "../../utils/components/imagePlaceholder";

const Container = styled.div`
  grid-area: poster;
  margin: 0 auto;
  width: 100%;
  height: auto;
  max-width: 300px;
  z-index: ${({ theme: { zIndex } }) => zIndex.poster};

  img {
    height: auto;
    width: 100%;
    box-shadow: 3px 3px 3px black;
  }
`;

const Poster = ({ posterPath, title }) => {
  const URL = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";

  return (
    <Container>
      <img
        src={
          posterPath ? URL + posterPath : getPlaceholder(300, 450, "No Poster")
        }
        alt={`${title} poster`}
      />
    </Container>
  );
};

export default Poster;
