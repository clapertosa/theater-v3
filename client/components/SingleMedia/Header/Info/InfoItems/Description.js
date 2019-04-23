import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: description;
  display: ${({ show }) => (show ? "grid" : "none")};
  grid-template-areas: "title" "overview";
  grid-template-rows: auto 1fr;
  text-shadow: 3px 3px 3px black;
`;

const Title = styled.h3`
  grid-area: title;
  margin: 0;
`;

const Overview = styled.div`
  grid-area: overview;

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

const Description = ({ overview }) => {
  return (
    <Container show={overview.length > 0}>
      <Title>Description</Title>
      <Overview>
        <p>{overview}</p>
      </Overview>
    </Container>
  );
};

export default Description;
