import React, { useContext } from "react";
import styled from "styled-components";
import DrawerContext from "../../contexts/DrawerContext";
import Backdrop from "../Backdrop/Backdrop";
import SideDrawerItems from "./SideDrawerItems/SideDrawerItems";

const Container = styled.div`
  position: absolute;
  top: ${({ theme: { navbarHeight } }) => navbarHeight};
  left: 0;
  height: ${({ theme: { navbarHeight } }) => `calc(100% - ${navbarHeight})`};
  width: 70%;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  border-right: ${({ theme: { colors } }) => `2px solid ${colors.candy}`};
  overflow: auto;
  z-index: ${({ theme: { zIndex } }) => zIndex.sideDrawer};
  transition: all 0.3s;
  transform: ${({ show }) => (show ? "translateX(0)" : "translateX(-200%)")};

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    display: none;
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      `calc(${mediaQueryMinWidth} - 20rem)`}) {
    width: 45%;
  }
`;

const SideDrawer = () => {
  const { showSideDrawer, closeSideDrawer } = useContext(DrawerContext);

  return (
    <>
      <Backdrop show={showSideDrawer} clicked={closeSideDrawer} />
      <Container show={showSideDrawer}>
        <SideDrawerItems />
      </Container>
    </>
  );
};

export default SideDrawer;
