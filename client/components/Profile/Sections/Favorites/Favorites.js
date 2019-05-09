import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { GET_FAVORITES_QUERY } from "../../../../apollo/queries";
import MediaList from "./MediaList/MediaList";
import Link from "next/link";

const Container = styled.div`
  display: grid;
  grid-template-areas: "movies-list" "series-list";
  width: 95%;
  margin: 20px auto;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    width: 80%;
  }
`;

const EmptyMessage = styled.div`
  h1 {
    text-align: center;
    color: ${({ theme: { colors } }) => colors.white};
  }

  a {
    text-decoration: underline;
    color: ${({ theme: { colors } }) => colors.candy};
  }
`;

const Favorites = () => {
  return (
    <Query query={GET_FAVORITES_QUERY}>
      {({ data: { getFavorites } }) => {
        const movies = getFavorites
          ? getFavorites.filter(favorite => favorite.media_type === "movie")
          : [];
        const series = getFavorites
          ? getFavorites.filter(favorite => favorite.media_type === "series")
          : [];
        return getFavorites && getFavorites.length <= 0 ? (
          <EmptyMessage>
            <h1>
              Wow, such empty! 😱 Start discovering{" "}
              <Link href="/discover/movies">
                <a>Movies</a>
              </Link>{" "}
              and{" "}
              <Link href="/discover/series">
                <a>Series</a>
              </Link>
              !
            </h1>
          </EmptyMessage>
        ) : (
          <Container>
            <MediaList
              data={movies}
              gridArea="movies-list"
              title="Movies"
              mediaType="movie"
            />
            <MediaList
              data={series}
              gridArea="series-list"
              title="Series"
              mediaType="series"
            />
          </Container>
        );
      }}
    </Query>
  );
};

export default Favorites;
