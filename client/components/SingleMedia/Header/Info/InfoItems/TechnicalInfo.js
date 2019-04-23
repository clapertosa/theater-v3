import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-area: technical-info;
  margin: auto;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    margin: 0;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-areas: "label value";
  grid-template-columns: auto 1fr;
  grid-column-gap: 5px;
  margin: 5px 0;
  text-shadow: 3px 3px 3px black;
`;

const Label = styled.span`
  grid-area: label;
`;

const Value = styled.span`
  grid-area: value;
  font-weight: normal;
`;

const TechnicalInfo = ({ releaseDate, runtime, genres, director }) => {
  return (
    <Wrapper>
      <Container>
        <Label>Release Date:</Label>
        <Value>{releaseDate}</Value>
      </Container>
      {runtime.length > 0 ? (
        <Container>
          <Label>Runtime:</Label>
          <Value>{runtime}</Value>
        </Container>
      ) : null}
      {genres.length > 0 ? (
        <Container>
          <Label>Genres:</Label>
          <Value>{genres}</Value>
        </Container>
      ) : null}
      {director.length > 0 ? (
        <Container>
          <Label>Director:</Label>
          <Value>{director}</Value>
        </Container>
      ) : null}
    </Wrapper>
  );
};

export default TechnicalInfo;
