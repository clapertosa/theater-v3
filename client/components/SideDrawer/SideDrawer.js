import React, { useContext } from "react";
import styled from "styled-components";
import DrawerContext from "../../contexts/DrawerContext";
import Backdrop from "../Backdrop/Backdrop";
import SideDrawerItems from "./SideDrawerItems/SideDrawerItems";

const Container = styled.div`
  position: fixed;
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

  @media (min-width: 35rem) {
    width: 45%;
  }
`;

const SideDrawer = () => {
  const { showSideDrawer, closeSideDrawer } = useContext(DrawerContext);
  let touchStart, touchEnd;

  return (
    <>
      <Backdrop show={showSideDrawer} clicked={closeSideDrawer} />
      <Container
        show={showSideDrawer}
        onTouchStart={e => (touchStart = e.touches[0].clientX)}
        onTouchMove={e => (touchEnd = e.touches[0].clientX)}
        onTouchEnd={() => (touchEnd < touchStart ? closeSideDrawer() : null)}
      >
        <SideDrawerItems />
      </Container>
    </>
  );
};

export default SideDrawer;
