import React from "react";
import styled from "styled-components";
import NavbarItems from "./NavbarItems/NavbarItems";

const Header = styled.header`
  grid-area: header;
  height: ${({ theme: { navbarHeight } }) => navbarHeight};
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
`;

const Nav = styled.nav`
  height: inherit;
  width: inherit;
`;

const Navbar = () => {
  return (
    <Header>
      <Nav>
        <NavbarItems />
      </Nav>
    </Header>
  );
};

export default Navbar;
