import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  height: ${({ theme: { navbarHeight } }) => `calc(100% - ${navbarHeight})`};
  width: 100%;
  top: ${({ theme: { navbarHeight } }) => navbarHeight};
  left: 0;
  background-color: #00000080;
  z-index: ${({ theme: { zIndex } }) => zIndex.backdrop};
`;

const Backdrop = ({ show, clicked }) => {
  return <Container show={show} onClick={clicked} />;
};

export default Backdrop;
