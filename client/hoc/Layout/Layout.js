import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Navbar from "../../components/Header/Navbar/Navbar";
import Footer from "../../components/Footer";
import "../../static/styles/main.css";

const theme = {
  colors: {
    gunMetal: "#2b2d42",
    gray: "#8d99ae",
    white: "#edf2f4",
    red: "#ef233c",
    candy: "#d90429"
  },
  navbarHeight: "4rem",
  mediaQueryMinWidth: "55rem",
  zIndex: {
    navbar: 10,
    footer: 10,
    sideDrawer: 9,
    backdrop: 7,
    filter: 6,
    carouselArrows: 8
  }
};

const GlobalStyle = createGlobalStyle`
    html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 100%;
    color: ${theme.colors.white};
    background-color: ${theme.colors.gunMetal};
    /* background-image: url('/static/images/background.gif'); */

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
    height: 100%;
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
