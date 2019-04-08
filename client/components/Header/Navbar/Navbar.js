import React, { useState } from "react";
import styled from "styled-components";
import NavbarItems from "./NavbarItems/NavbarItems";
import Item from "./NavbarItems/Item";
import Logo from "../../Logo/Logo";
import DrawerToggle from "../../SideDrawer/DrawerToggle";
import DrawerContext from "../../../contexts/DrawerContext";
import SideDrawer from "../../SideDrawer/SideDrawer";

const Header = styled.header`
  grid-area: header;
  position: sticky;
  top: 0;
  height: ${({ theme: { navbarHeight } }) => navbarHeight};
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  border-bottom: ${({ theme: { colors } }) => `1px solid ${colors.candy}`};
  z-index: ${({ theme: { zIndex } }) => zIndex.navbar};
`;

const Nav = styled.nav`
  display: grid;
  grid-template-areas: "logo navbar-items drawer-toggle";
  grid-template-columns: auto 1fr auto;
  padding: 0 20px;
  height: inherit;
  width: inherit;
`;

const Navbar = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const toggleSideDrawer = () => {
    setShowSideDrawer(showSideDrawer => !showSideDrawer);
  };

  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  };

  return (
    <Header>
      <DrawerContext.Provider
        value={{ showSideDrawer, toggleSideDrawer, closeSideDrawer }}
      >
        <Nav>
          <Item marginRight="30px">
            <Logo gridArea="logo" />
          </Item>
          <NavbarItems />
          <DrawerToggle />
        </Nav>
        <SideDrawer />
      </DrawerContext.Provider>
    </Header>
  );
};

export default Navbar;
