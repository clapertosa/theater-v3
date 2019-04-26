import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  grid-area: links;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  a {
    margin-right: 20px;
  }

  img {
    height: 30px;
    width: auto;
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    justify-content: flex-start;
  }
`;

const Links = ({
  homepage,
  externalIds: { imdb_id, facebook_id, twitter_id, instagram_id }
}) => {
  return (
    <Container>
      {homepage ? (
        <Link href={homepage}>
          <a target="_blank">
            <img src="/static/images/globe.svg" alt="A light blue globe" />
          </a>
        </Link>
      ) : null}
      {imdb_id ? (
        <Link href={`https://www.imdb.com/name/${imdb_id}`}>
          <a target="_blank">
            <img src="/static/images/IMDB.svg" alt="IMDB vectorial logo" />
          </a>
        </Link>
      ) : null}
      {facebook_id ? (
        <Link href={`https://www.facebook.com/${facebook_id}`}>
          <a target="_blank">
            <img
              src="/static/images/facebook.svg"
              alt="Facebook vectorial logo"
            />
          </a>
        </Link>
      ) : null}
      {twitter_id ? (
        <Link href={`https://www.twitter.com/${twitter_id}`}>
          <a target="_blank">
            <img
              src="/static/images/twitter.svg"
              alt="twitter vectorial logo"
            />
          </a>
        </Link>
      ) : null}
      {instagram_id ? (
        <Link href={`https://www.instagram.com/${instagram_id}`}>
          <a target="_blank">
            <img
              src="/static/images/instagram.svg"
              alt="Instagram vectorial logo"
            />
          </a>
        </Link>
      ) : null}
    </Container>
  );
};

export default Links;
