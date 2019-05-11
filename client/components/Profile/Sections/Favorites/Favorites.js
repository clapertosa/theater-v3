import React from "react";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Query } from "react-apollo";
import {
  GET_FAVORITES_MOVIES_QUERY,
  GET_FAVORITES_SERIES_QUERY
} from "../../../../apollo/queries";
import MediaList from "./MediaList/MediaList";
import Link from "next/link";
import Spinner from "../../../Spinner/Spinner";

const Container = styled.div`
  display: grid;
  grid-template-areas: "movies-list" "series-list";
  width: 95%;
  margin: 20px auto;
  min-width: 0;

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
    <Query query={GET_FAVORITES_MOVIES_QUERY}>
      {({ data: { getFavoritesMovies = [] }, loading: moviesLoading }) => (
        <Query query={GET_FAVORITES_SERIES_QUERY}>
          {({ data: { getFavoritesSeries = [] }, loading: seriesLoading }) =>
            moviesLoading && seriesLoading ? (
              <Spinner />
            ) : getFavoritesMovies.length <= 0 &&
              getFavoritesSeries.length <= 0 ? (
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
                <TransitionGroup component={null}>
                  {getFavoritesMovies.length > 0 ? (
                    <CSSTransition classNames="fade" timeout={300}>
                      <MediaList
                        loading={moviesLoading}
                        initialData={getFavoritesMovies}
                        gridArea="movies-list"
                        title="Movies"
                        mediaType="movie"
                      />
                    </CSSTransition>
                  ) : null}
                  {getFavoritesSeries.length > 0 ? (
                    <CSSTransition classNames="fade" timeout={300}>
                      <MediaList
                        loading={seriesLoading}
                        initialData={getFavoritesSeries}
                        gridArea="series-list"
                        title="Series"
                        mediaType="series"
                      />
                    </CSSTransition>
                  ) : null}
                </TransitionGroup>
              </Container>
            )
          }
        </Query>
      )}
    </Query>
  );
};

export default Favorites;
