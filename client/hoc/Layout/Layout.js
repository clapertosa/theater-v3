import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import "../../static/styles/main.css";
import Navbar from "../../components/Header/Navbar/Navbar";
import Footer from "../../components/Footer";

export const theme = {
  colors: {
    gunMetal: "#2b2d42",
    gray: "#8d99ae",
    white: "#edf2f4",
    red: "#ef233c",
    candy: "#d90429",
    green: "#1ab188"
  },
  navbarHeight: "4rem",
  mediaQueryMinWidth: "55rem",
  backdropPosterHeight: "650px",
  zIndex: {
    player: 11,
    navbar: 10,
    footer: 10,
    sideDrawer: 9,
    backdrop: 7,
    filter: 6,
    poster: 6,
    info: 6,
    backdropPoster: 5,
    carouselArrows: 8
  }
};

const GlobalStyle = createGlobalStyle`
    html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${theme.colors.white};
    background-color: ${theme.colors.gunMetal};

    body {
      min-height: 100vh;
    }

    a {
      text-decoration: none;
    }
  }

  *, *:before, *:after {
    box-sizing: inherit
  }

  .slick-slider,
  .slick-list,
  .slick-track,
  .slick-slide,
  .slick-slide > div {
    height: 100%;
  }

  #__next {
    height: inherit;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "header" "main" "footer";
  grid-template-rows: auto 1fr auto;
  height: 100%;
`;

const Main = styled.div`
  grid-area: main;
  min-height: ${({ theme: { navbarHeight } }) =>
    `calc(100vh - ${navbarHeight} * 2)`};
`;

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Navbar />
          <Main>{children}</Main>
          <Footer />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default Layout;
