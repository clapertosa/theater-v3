import React from "react";
import styled from "styled-components";
import { Mutation, Query } from "react-apollo";
import {
  ADD_TO_FAVORITES_MUTATION,
  REMOVE_FROM_FAVORITES_MUTATION
} from "../../../../../apollo/mutations";
import {
  GET_FAVORITES_MOVIES_QUERY,
  GET_FAVORITES_SERIES_QUERY,
  IS_FAVORITE_QUERY,
  CURRENT_USER_QUERY
} from "../../../../../apollo/queries";
import Link from "next/link";
import Spinner from "../../../../Spinner/Spinner";

const Container = styled.div`
  cursor: pointer;
  grid-area: favorite;
  margin: auto;

  a {
    display: grid;
    grid-template-areas: "icon text";
    grid-template-columns: auto 1fr;
    grid-column-gap: 5px;
    margin: auto;
    color: ${({ theme: { colors } }) => colors.white};
  }

  i {
    grid-area: icon;
    text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff,
      1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
    color: red;
    font-size: 4rem;
    &::before {
      margin-right: 0;
      text-align: left;
    }
  }

  span {
    grid-area: text;
    margin: auto 0 auto 0;
    text-shadow: 3px 3px 3px black;
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    margin: auto 0;
  }
`;

const FavoriteArea = styled.div`
  display: grid;
  grid-template-areas: "icon text";
  grid-template-columns: auto 1fr;
  grid-column-gap: 5px;
`;

const Favorite = ({ id, mediaType, title, posterPath }) => {
  return (
    <Container>
      <Mutation
        mutation={ADD_TO_FAVORITES_MUTATION}
        refetchQueries={[
          { query: GET_FAVORITES_MOVIES_QUERY },
          { query: GET_FAVORITES_SERIES_QUERY },
          { query: IS_FAVORITE_QUERY, variables: { media_id: id } }
        ]}
        awaitRefetchQueries
      >
        {(addToFavorites, { loading }) => (
          <Query query={CURRENT_USER_QUERY}>
            {({ data: { currentUser } }) =>
              currentUser ? (
                <Query query={IS_FAVORITE_QUERY} variables={{ media_id: id }}>
                  {({ data: { isFavorite } }) => {
                    if (isFavorite) {
                      return (
                        <Mutation
                          mutation={REMOVE_FROM_FAVORITES_MUTATION}
                          refetchQueries={[
                            {
                              query: GET_FAVORITES_MOVIES_QUERY
                            },
                            {
                              query: GET_FAVORITES_SERIES_QUERY
                            },
                            {
                              query: IS_FAVORITE_QUERY,
                              variables: { media_id: id }
                            }
                          ]}
                          awaitRefetchQueries
                        >
                          {(removeFromFavorites, { loading }) => (
                            <FavoriteArea
                              onClick={async () =>
                                await removeFromFavorites({
                                  variables: {
                                    media_id: id
                                  }
                                })
                              }
                            >
                              {loading ? (
                                <Spinner minHeight="0" />
                              ) : (
                                <>
                                  <i className="icon-heart-broken" />
                                  <span>Remove</span>
                                </>
                              )}
                            </FavoriteArea>
                          )}
                        </Mutation>
                      );
                    } else {
                      return (
                        <FavoriteArea
                          onClick={async () =>
                            await addToFavorites({
                              variables: {
                                media_id: id,
                                media_type: mediaType,
                                title,
                                poster_path: posterPath
                              }
                            })
                          }
                        >
                          {loading ? (
                            <Spinner minHeight="0" />
                          ) : (
                            <>
                              <i className="icon-heart-filled" />
                              <span>Add to Favorites</span>
                            </>
                          )}
                        </FavoriteArea>
                      );
                    }
                  }}
                </Query>
              ) : (
                <Link href="/user/signin">
                  <a title="You must sign in to add to favorites">
                    <i className="icon-heart-filled" />
                    <span>Add to Favorites</span>
                  </a>
                </Link>
              )
            }
          </Query>
        )}
      </Mutation>
    </Container>
  );
};

export default Favorite;
