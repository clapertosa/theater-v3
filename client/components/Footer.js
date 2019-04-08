import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  grid-area: footer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: ${({ theme: { colors } }) => `1px solid ${colors.candy}`};
  width: 100%;
  height: ${({ theme: { navbarHeight } }) => navbarHeight};
  background-color: ${({ theme: { colors } }) => colors.gunMetal};

  a {
    display: inline-block;
    margin: auto 20px;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    max-width: 130px;
    filter: grayscale(100%);
    vertical-align: middle;
    transition: filter 0.5s;

    &:hover {
      filter: grayscale(0);
    }
  }
`;

const Footer = () => {
  return (
    <Container>
      <Link href="https://www.themoviedb.org/">
        <a target="_blank">
          <img
            src="/static/images/TMDB_logo.svg"
            alt="TMDB attribution green logo"
          />
        </a>
      </Link>
    </Container>
  );
};

export default Footer;
