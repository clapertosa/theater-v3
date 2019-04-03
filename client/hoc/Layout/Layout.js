import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Navbar from "../../components/Header/Navbar/Navbar";

const theme = {
  colors: {
    gunMetal: "#2b2d42",
    gray: "#8d99ae",
    white: "#edf2f4",
    red: "#ef233c",
    candy: "#d90429"
  },
  navbarHeight: "4rem",
  mediaQueryMinWidth: "40rem"
};

const GlobalStyle = createGlobalStyle`
  @import url('/static/fonts/fontello/css/fontello.css');

  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit
  }

`;

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "header" "main" "footer";
`;

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Navbar />
          {children}
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default Layout;
