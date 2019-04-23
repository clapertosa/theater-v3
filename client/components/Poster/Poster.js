import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: poster;
  margin: 0 auto;
  width: 100%;
  height: auto;
  max-width: 300px;

  img {
    height: auto;
    width: 100%;
    box-shadow: 3px 3px 3px black;
  }
`;

const Poster = ({ posterPath, title }) => {
  return (
    <Container>
      <img src={posterPath} alt={`${title} poster`} />
    </Container>
  );
};

export default Poster;
