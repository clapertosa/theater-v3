import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: calc(4rem + 0.5rem);
  right: 0;
  max-width: 500px;
  font-size: 1rem;
  background-color: #2b2d42;
  color: #edf2f4;
  border: ${({ error, theme: { colors } }) =>
    error ? `1px solid ${colors.red}` : `1px solid ${colors.green}`};
  border-radius: 3px;
  padding: 20px;
  text-align: center;
  font-weight: bold;
  margin: 0 10px;
  text-shadow: 3px 3px 3px black;
  box-shadow: 3px 3px 3px black;
  animation: bounce-in-right 1.1s both;
  z-index: ${({ theme: { zIndex } }) => `calc(${zIndex.navbar} + 1)`};

  @keyframes bounce-in-right {
    0% {
      transform: translateX(600px);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    38% {
      transform: translateX(0);
      animation-timing-function: ease-out;
      opacity: 1;
    }
    55% {
      transform: translateX(68px);
      animation-timing-function: ease-in;
    }
    72% {
      transform: translateX(0);
      animation-timing-function: ease-out;
    }
    81% {
      transform: translateX(32px);
      animation-timing-function: ease-in;
    }
    90% {
      transform: translateX(0);
      animation-timing-function: ease-out;
    }
    95% {
      transform: translateX(8px);
      animation-timing-function: ease-in;
    }
    100% {
      transform: translateX(0);
      animation-timing-function: ease-out;
    }
  }
`;

const FloatingMessage = ({ children, show, error }) => {
  return (
    <Container show={show} error={error}>
      <span>{children}</span>
    </Container>
  );
};

export default FloatingMessage;
