import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: description;
  display: ${({ show }) => (show ? "grid" : "none")};
  grid-template-areas: "title" "biography";
  grid-template-rows: auto 1fr;
  text-shadow: 3px 3px 3px black;
`;

const Title = styled.h3`
  grid-area: title;
  margin: 0;
`;

const Biography = styled.div`
  grid-area: biography;

  p {
    overflow: auto;
    margin: 5px 0 0 0;
    padding: 5px;
    background-color: transparent;
    border-radius: 10px;
    font-weight: normal;

    @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
        mediaQueryMinWidth}) {
      max-height: 250px;
    }
  }
`;

const Description = ({ biography }) => {
  return (
    <Container show={biography && biography.length > 0}>
      <Title>Biography</Title>
      <Biography>
        <p>{biography}</p>
      </Biography>
    </Container>
  );
};

export default Description;
