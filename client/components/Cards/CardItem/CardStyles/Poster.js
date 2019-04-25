import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: poster;
  max-width: 185px;
  max-height: 278px;
  width: auto;
  height: 100%;
  margin: auto;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    transition: transform 0.3s ease-out;
  }
`;

const Poster = ({ posterPath, title }) => {
  const URL = "https://image.tmdb.org/t/p/w185";

  return (
    <Container>
      <img src={URL + posterPath} alt={`${title} poster`} />
    </Container>
  );
};

export default Poster;
