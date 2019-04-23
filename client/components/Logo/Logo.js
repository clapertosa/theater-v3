import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  height: ${({ theme: { navbarHeight } }) => `calc(${navbarHeight} - 0.7rem)`};

  img {
    height: 100%;
    width: auto;
  }
`;

const Logo = ({ gridArea }) => {
  return (
    <Container gridArea={gridArea}>
      <Link href="/">
        <a>
          <img src="/static/images/logo.svg" alt="Popcorn with 3D glasses" />
        </a>
      </Link>
    </Container>
  );
};

export default Logo;
