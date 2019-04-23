import React, { Component } from "react";
import styled from "styled-components";
import Year from "./FilterOptions/Year";
import SortBy from "./FilterOptions/SortBy";
import Genres from "./FilterOptions/Genres";
import WithoutGenres from "./FilterOptions/WithoutGenres";
import Cast from "./FilterOptions/Cast";

const Container = styled.div`
  grid-area: filter;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    display: grid;
    grid-template-areas: ${({ mediaType }) =>
      mediaType === "movie"
        ? "'year sort genres cast'"
        : "'year sort genres without-genres'"};
    grid-template-columns: auto auto auto 1fr;
    grid-column-gap: 20px;
    margin: 20px auto;
  }
`;

const Section = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "300px")};
`;

class Filter extends Component {
  state = {
    year: (new Date().getFullYear() - 1).toString(),
    sortBy: "popularity.desc",
    genres: "",
    withoutGenres: "",
    cast: ""
  };

  onValueChange = newValue => {
    this.setState(
      values => {
        return { ...values, ...newValue };
      },
      () => {
        this.props.updated(this.state);
      }
    );
  };

  render() {
    return (
      <Container mediaType={this.props.mediaType}>
        <Section gridArea="year" maxWidth="100px">
          <Year onValueChange={this.onValueChange} />
        </Section>
        <Section gridArea="sort" maxWidth="200px">
          <SortBy
            mediaType={this.props.mediaType}
            onValueChange={this.onValueChange}
          />
        </Section>
        <Section gridArea="genres" maxWidth="300px">
          <Genres
            mediaType={this.props.mediaType}
            onValueChange={this.onValueChange}
          />
        </Section>
        {this.props.mediaType === "movie" ? (
          <Section gridArea="cast" maxWidth="300px">
            <Cast onValueChange={this.onValueChange} />
          </Section>
        ) : (
          <Section gridArea="without-genres" maxWidth="300px">
            <WithoutGenres onValueChange={this.onValueChange} />
          </Section>
        )}
      </Container>
    );
  }
}

export default Filter;
