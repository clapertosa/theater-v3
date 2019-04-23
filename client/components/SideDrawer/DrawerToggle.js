import React, { useContext } from "react";
import styled from "styled-components";
import DrawerContext from "../../contexts/DrawerContext";

const Container = styled.div`
  cursor: pointer;
  grid-area: drawer-toggle;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 2rem;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    display: none;
  }
`;

const DrawerToggle = () => {
  const { toggleSideDrawer } = useContext(DrawerContext);

  return (
    <Container onClick={toggleSideDrawer}>
      <i className="icon-menu" />
    </Container>
  );
};

export default DrawerToggle;
