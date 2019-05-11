import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { REMOVE_FROM_FAVORITES_MUTATION } from "../../../../../apollo/mutations";
import {
  GET_FAVORITES_MOVIES_QUERY,
  GET_FAVORITES_SERIES_QUERY
} from "../../../../../apollo/queries";
import Link from "next/link";
import getPlaceholder from "../../../../../utils/components/imagePlaceholder";

const Container = styled.div`
  position: relative;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  max-width: 200px;
  max-height: 302px;
  width: 150px;
  min-height: 210px;
  margin: auto;
  border: 1px solid black;
  box-shadow: 3px 3px 3px black;
  overflow: hidden;

  &:hover {
    div {
      transform: translateY(0);
    }
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  padding: 5px;
  width: 100%;
  padding: 5px;
  background-color: #000000b3;
  color: ${({ theme: { colors } }) => colors.white};
  text-decoration: none;
  transform: translateY(200%);
  transition: transform 0.3s ease-out;
`;

const Title = styled.h3`
  grid-area: title;
  margin: 0;
  font-size: 1rem;
  text-align: center;
  color: ${({ theme: { colors } }) => colors.white};
`;

const BrokenHeart = styled.i`
  cursor: ${({ loading }) => (loading ? "disabled" : "pointer")};
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2.5rem;
  color: ${({ theme: { colors } }) => colors.candy};
  transition: color 0.3s;
  z-index: ${({ theme: { zIndex } }) => zIndex.carouselArrows + 1};

  animation: ${({ loading }) => (loading ? "rotate 1s linear infinite" : null)};

  @keyframes rotate {
    100% {
      transform: rotateY(360deg);
    }
  }

  &:hover {
    color: ${({ theme: { colors } }) => colors.red};
  }
`;

const MediaItem = ({ mediaId, mediaType, title, posterPath }) => {
  const imagePath = posterPath
    ? `https://image.tmdb.org/t/p/w185${posterPath}`
    : getPlaceholder(185, 278, "No Poster");

  return (
    <Mutation
      mutation={REMOVE_FROM_FAVORITES_MUTATION}
      refetchQueries={[
        { query: GET_FAVORITES_MOVIES_QUERY },
        { query: GET_FAVORITES_SERIES_QUERY }
      ]}
      awaitRefetchQueries
    >
      {(removeFromFavorites, { loading }) => (
        <Container>
          <BrokenHeart
            loading={loading}
            className="icon-heart-broken"
            onClick={async () =>
              await removeFromFavorites({ variables: { media_id: mediaId } })
            }
          />
          <Link
            href={`/${
              mediaType === "movie" ? "movies" : "series"
            }?id=${mediaId}`}
          >
            <a>
              <img src={imagePath} />
              <Info>
                <Title>{title}</Title>
              </Info>
            </a>
          </Link>
        </Container>
      )}
    </Mutation>
  );
};

export default MediaItem;
