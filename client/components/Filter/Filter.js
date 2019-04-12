import React, { useState } from "react";
import styled from "styled-components";
import Year from "./FilterOptions/Year";
import SortBy from "./FilterOptions/SortBy";
import Genre from "./FilterOptions/Genre";
import Cast from "./FilterOptions/Cast";

const Container = styled.div`
  grid-area: filter;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    display: grid;
    grid-template-areas: "year sort genres cast";
    grid-template-columns: auto auto auto 1fr;
    grid-column-gap: 20px;
    margin: 20px auto;
  }
`;

const Section = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "300px")};
`;

const Filter = ({ mediaType }) => {
  const [values, setValues] = useState({
    year: new Date().getFullYear() - 1,
    sortedBy: "Popularity Desc",
    genres: [],
    cast: {}
  });

  const onValueChange = newValue => {
    setValues(values => {
      return { ...values, ...newValue };
    });
  };

  return (
    <Container>
      <Section gridArea="year" maxWidth="100px">
        <Year onValueChange={onValueChange} />
      </Section>
      <Section gridArea="sort" maxWidth="200px">
        <SortBy mediaType={mediaType} onValueChange={onValueChange} />
      </Section>
      <Section gridArea="genres" maxWidth="300px">
        <Genre mediaType={mediaType} onValueChange={onValueChange} />
      </Section>
      <Section gridArea="cast" maxWidth="300px">
        <Cast onValueChange={onValueChange} />
      </Section>
    </Container>
  );
};

export default Filter;
