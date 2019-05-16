import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: menu;
  position: sticky;
  top: ${({ theme: { navbarHeight } }) => navbarHeight};
  z-index: ${({ theme: { zIndex } }) => zIndex.navbar - 1};
`;

const Items = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  border-bottom: ${({ theme: { colors } }) => `1px solid ${colors.candy}`};
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
`;

const Item = styled.li`
  list-style: none;
  transform: skew(-20deg);
  border: ${({ theme: { colors } }) => `1px solid ${colors.candy}`};
  margin: 5px 10px;
  transition: background-color 0.3s;
  color: ${({ theme: { colors } }) => colors.white};
  background-color: ${({ active, theme: { colors } }) =>
    active ? colors.gray : "transparent"};

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.gray};
  }

  span {
    cursor: pointer;
    display: block;
    padding: 5px 20px;
    font-weight: bold;
    transform: skew(20deg);
    text-shadow: 3px 3px 3px black;
  }

  @media (min-width: 30rem) {
    margin: 0;
  }
`;

const Menu = ({ clicked, activeSection }) => {
  return (
    <Container>
      <Items>
        <Item
          active={activeSection === "favorites"}
          onClick={() => clicked("favorites")}
        >
          <span>Favorites</span>
        </Item>
        <Item
          active={activeSection === "settings"}
          onClick={() => clicked("settings")}
        >
          <span>Settings</span>
        </Item>
      </Items>
    </Container>
  );
};

export default Menu;
